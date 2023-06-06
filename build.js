/**
 * TODOs:
 * - there is no pruning in the bucket for the removed templates
 *
 * /dist
 *    /zips -> hosted on R2
 *    /pages -> hosted on pages
 *      .state.json
 */

import fs from "fs-extra";
import { promisify } from "node:util";
import { readFileSync, writeFileSync } from "fs";
import {
  join,
  sep as pathSeparator,
  resolve as pathResolve,
  dirname,
  basename,
} from "path";
import { hashElement } from "folder-hash";
import frontMatter from "front-matter";
import AdmZip from "adm-zip";
import { marked } from "marked";
import { exec } from "child_process";
import fetch from "node-fetch";
const execAsync = promisify(exec);

marked.use({ mangle: false, headerIds: false }); //suppress the deprecation warnings from marked^5.0

const PAGES_URL = "https://ateliernum-templates.pages.dev";
const BUCKET_NAME = "ateliernum-templates";
const BUCKET_URL = "https://pub-77e61effd34b4f69a4542167c964e338.r2.dev";
const IGNORED_FOLDERS = ["node_modules"];
const URL_PATH_SEPARATOR = "/";
const SUPPORTED_LANGUAGES = ["fr", "en"];
const CONTRIB_THRESHOLD_FOR_AUTHORS = 0.3; // 0.3 = 30% of commits

const isDir = (path) => !path.includes(".");

const isTemplate = (readmeContent) =>
  frontMatter(readmeContent).attributes.template;

const isIgnoredDirectory = (path) =>
  IGNORED_FOLDERS.includes(path.split(pathSeparator).pop());

const fsPathToStatePath = (path) =>
  pathSeparator === "/" ? path : path.replaceAll(pathSeparator, "/");

const isURL = (str) =>
  str.match(
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/i
  );

const htmlBaseTemplate = readFileSync("remoteReadmeTemplate.html").toString();

//prettier-ignore
await Promise.all([
  tryMkdir("./dist/zips"),
  tryMkdir("./dist/pages")
])

const netResponse = await fetch(`${PAGES_URL}/state.json`);
let state = netResponse.status == 404 ? {} : await netResponse.json();

await traverse("./");
writeFileSync("./dist/pages/state.json", JSON.stringify(state, null, 2));
console.log("DONE");

async function traverse(path) {
  if (isIgnoredDirectory(path)) {
    return;
  }

  const pathContent = await fs.readdir(path);
  const readmeFileName = pathContent.find(
    (el) => el.toLowerCase() === "readme.md"
  );

  if (
    !readmeFileName ||
    !isTemplate((await fs.readFile(join(path, readmeFileName))).toString())
  ) {
    const traversableDirs = pathContent.filter((p) => isDir(p));
    await Promise.all(traversableDirs.map((dir) => traverse(join(path, dir))));
  } else {
    if (!state[fsPathToStatePath(path)]) {
      state[fsPathToStatePath(path)] = {};
    }

    const readmePath = join(path, readmeFileName);
    await Promise.all([generateMetadata(readmePath), zip(path)]);

    await renderReadme(readmePath, join("dist/pages", path));
  }
}

async function zip(path) {
  const currentFolderHash = (await hashElement(path)).hash;

  const statePath = fsPathToStatePath(path);

  if (state[statePath] && state[statePath].hash == currentFolderHash) {
    console.log("abort zipping due to lack of changes for " + path);
    return;
  } else {
    state[statePath] = {
      ...state[statePath],
      hash: currentFolderHash,
      zipUrl: `${BUCKET_URL}/${statePath}.zip`,
    };
  }

  await tryMkdir(join("dist", "zips", dirname(path)));

  const templateName = basename(path);
  let zip = new AdmZip();
  // zip.addFile(templateName + "/"); // from the doc "Allows you to programmatically create a entry (file or directory) in the zip file."
  await zip.addLocalFolderPromise(path, templateName + "/");
  await zip.writeZipPromise(
    join("dist", "zips", dirname(path), templateName + ".zip")
  );
  await execAsync(
    `wrangler r2 object put ${BUCKET_NAME}/${statePath}.zip --file ${[
      ".",
      "dist",
      "zips",
      statePath,
    ].join("/")}.zip`
  );

  console.log("successfully zipped " + path);
}

async function generateMetadata(readmePath) {
  const templatePath = dirname(readmePath);
  const stateKey = fsPathToStatePath(templatePath);
  const metadata = state[stateKey];
  const readmeFrontMatter = frontMatter(
    (await fs.readFile(readmePath)).toString()
  ).attributes;

  if (readmeFrontMatter.title) {
    metadata.title = readmeFrontMatter.title;
  } else {
    const templateDirname = templatePath.split(pathSeparator).pop();
    metadata.title = templateDirname;
  }

  if (readmeFrontMatter.description && readmeFrontMatter.description.trim()) {
    metadata.description = readmeFrontMatter.description;
  } else {
    metadata.description = "";
  }

  if (readmeFrontMatter.tags && readmeFrontMatter.tags.length > 1) {
    metadata.tags = readmeFrontMatter.tags.map((tag) => tag.toLowerCase());
  } else {
    metadata.tags = [];
  }

  if (
    readmeFrontMatter.language &&
    SUPPORTED_LANGUAGES.includes(
      readmeFrontMatter.language.trim().toLocaleLowerCase()
    )
  ) {
    metadata.language = readmeFrontMatter.language.trim().toLowerCase();
  } else {
    metadata.language = "en";
  }

  const authors = await getAuthors(templatePath);
  metadata.authors = authors;

  state[stateKey] = { ...state[stateKey], ...metadata };
}

async function getAuthors(path) {
  const { stdout, stderr } = await execAsync(
    `git shortlog --email --summary --numbered --all --no-merges -- ${path}`
  );
  const formatedOutput = stdout.split("\n").map((l) => l.trim().split(/\s/i));
  formatedOutput.pop(); //remove the trailing entry which is just \n

  const totalCommitCount = formatedOutput.reduce((acc, line) => {
    return acc + parseInt(line.slice(0, 1));
  }, 0);

  const authors = formatedOutput.reduce((acc, lineEntries) => {
    const commitCount = parseInt(lineEntries.slice(0, 1));
    const name = lineEntries.slice(1, lineEntries.length - 1).join(" ");
    const email = lineEntries[lineEntries.length - 1]
      .match(/<(.+)>/i)
      .pop()
      .toLocaleLowerCase();

    if (email.match(/@users.noreply.github.com$/i)) {
      return acc; // just web browser based tweaks, usuall not commits we want to count
    }

    if (!acc[email]) {
      acc[email] = {
        name: name.toLocaleLowerCase(),
        count: commitCount,
      };
    } else {
      acc[email].count += commitCount;
    }

    if (acc[email].name.length < name) {
      acc[email].name = name;
    }

    return acc;
  }, {});

  let returnNames = [];

  if (totalCommitCount < 5) {
    const sortedAuthorsDescending = Object.values(authors).sort(
      (a, b) => a.count < b.count
    );
    const mostContribAuthor = sortedAuthorsDescending.shift();
    returnNames.push(mostContribAuthor.name);
  } else {
    const contributedEnough = Object.values(authors)
      .filter((a) => a.count > totalCommitCount * CONTRIB_THRESHOLD_FOR_AUTHORS)
      .map((a) => a.name);
    returnNames.push(...contributedEnough);
  }

  return returnNames;
}

async function renderReadme(readmePath, htmlPath) {
  const readmeContent = (await fs.readFile(readmePath)).toString();
  const fmatterObj = frontMatter(readmeContent);
  const readmeFrontMatter = fmatterObj.attributes;
  const readmeBody = fmatterObj.body;
  const statePath = fsPathToStatePath(dirname(readmePath));

  if (!readmeFrontMatter.thumbnail) {
    state[statePath].thumbnail = "";
  } else {
    const destination = join(htmlPath, dirname(readmeFrontMatter.thumbnail));
    await tryMkdir(destination);
    await fs.copyFile(
      pathResolve(dirname(readmePath), readmeFrontMatter.thumbnail),
      join(destination, basename(readmeFrontMatter.thumbnail))
    );
    state[
      statePath
    ].thumbnail = `${PAGES_URL}/${statePath}/${readmeFrontMatter.thumbnail}`;
  }

  const imagePathsIterator = readmeBody.matchAll(/\!\[.*\]\((.+)\)/gim);
  const imageUrlPaths = Array.from(imagePathsIterator)
    .map((match) => match[1])
    .filter((match) => !isURL(match));

  await fs.mkdir(htmlPath, { recursive: true });

  const copyAllImagesPromises = imageUrlPaths.map(async (up) => {
    await tryMkdir(join(htmlPath, dirname(up)));

    return fs.copyFile(
      pathResolve(join(dirname(readmePath), up)),
      pathResolve(join(htmlPath, up.split(URL_PATH_SEPARATOR).pop()))
    );
  });

  const title = basename(htmlPath);
  const html = await marked.parse(readmeBody, { async: true });
  const finalDocument = htmlBaseTemplate
    .replace("<!-- readme content -->", html)
    .replace("<!-- readme title -->", title)
    .replace("<!-- zip url -->", state[statePath].zipUrl);

  await Promise.all([
    copyAllImagesPromises,
    fs.writeFile(htmlPath + pathSeparator + "index.html", finalDocument),
  ]);

  state[statePath] = {
    ...state[statePath],
    url: `${PAGES_URL}/${statePath}/index.html`,
  };
}

async function tryMkdir(path) {
  await fs.mkdir(path, { recursive: true }).catch((err) => {
    if (err.code != "EEXIST") throw err;
  });
}
