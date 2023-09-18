const OUTDIR = "dist";
const DISCLAIMER = `<!-- ##################################################### -->
<!-- this is a generated file don't touch it. Modify the .hbs file instead! -->
<!-- ##################################################### -->
`;

const data = {
  _unused: true,
};

const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");

try {
  fs.mkdirSync("dist");
} catch (err) {
  if (err.code !== "EEXIST") {
    throw err;
  }
}

fs.readdirSync("partials").forEach((partial) => {
  loadPartial(path.join("partials", partial));
});

chokidar.watch(["partials/*"]).on("add", loadPartial);
chokidar.watch(["partials/*"]).on("change", (filePath) => {
  loadPartial(filePath);
  generateAll(OUTDIR);
});

chokidar.watch(["pages/*", "index.hbs"]).on("add", generate);
chokidar.watch(["pages/*", "index.hbs"]).on("change", generate);

chokidar.watch(["pages/*", "index.hbs"]).on("unlink", (filePath) => {
  const filename = path.basename(filePath, ".hbs");
  fs.unlinkSync(path.join(OUTDIR, filename + ".html"));
});

function generate(src) {
  if (src === path.join("pages", "index.hbs")) {
    throw "the index.hbs goes to the root of your project not in the pages folder.";
  }

  const outdir = src.toLocaleLowerCase() === "index.hbs" ? "." : OUTDIR;
  const filename = path.basename(src, ".hbs");

  console.log("generating " + src);
  const source = fs.readFileSync(src).toString();
  const template = Handlebars.compile(source);
  const result = DISCLAIMER + template(data);
  fs.writeFileSync(path.join(outdir, filename + ".html"), result);
}

function generateAll(dest) {
  fs.readdirSync("pages").forEach((page) => {
    generate(path.join("pages", page), dest);
  });
  generate("index.hbs");
}

function loadPartial(filePath) {
  const content = fs.readFileSync(filePath).toString();
  Handlebars.registerPartial(path.basename(filePath, ".hbs"), content);
}
