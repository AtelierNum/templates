# Extension executing scripts on selected pages

**Level** : ![](https://img.shields.io/badge/Level-Beginner-brightgreen) 

## What does it do ? ✨
This extension will run a script whenever we are on a page with an URL matching a pattern we specified. 

In this exact case our script will remove the comments from all the pages on YouTube.

## Software dependencies 🌈 📂
You'll need a web browser to load your extension in.

Ideally one of the following : Firefox, Brave, Chrom(e/ium), Edge

## How to run ? 🚀

To load an extension in dev mode you'll need to follow steps depending on your browser

Firefox : Paste "about:debugging" in your address bar and hit enter, click "This Firefox" (in newer versions of Firefox), click "Load Temporary Add-on", then select any file in your extension's directory.
<hr/>

Brave : Go to brave://extensions/ and enable Developer mode at the top right.

You will then have the option load unpacked.

Click load unpacked (i.e. "development") and select the extension directory.
<hr/>

Chrom(e/ium) : 

1. Open the Extension Management page by navigating to chrome://extensions.
    - Alternatively, open this page by clicking on the Extensions menu button and selecting Manage Extensions at the bottom of the menu.
    - Alternatively, open this page by clicking on the Chrome menu, hovering over More Tools then selecting Extensions
2. Enable Developer Mode by clicking the toggle switch next to Developer mode.
3. Click the Load unpacked button and select the extension directory.
<hr/>

Edge  [Sideload an extension](https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading)



## How to modify ? 🔩 🔨

There is only one key file
- manifest.json 
    - The role of the manifest is to describe to the browser what the extension will do, which file are going to be used, in which way, and what are the special permissions required by your extension (like storing data, making requests, looking at the cookies etc ...)
    - The "content_scripts" part list the scrpits to execute automatically. If the URL in the "match" section corresponds to the current URL then the scripts in the "js" field are going to be executed. Note that a star `*` replace 0 or any number of characters which is why "*://*.youtube.com/*" matches all the pages on youtube. To triggers the scripts on any URL you have to use the special value "<all_urls>".

## Be careful ⚠️

Some URLs like addons.mozilla.org will forbid the execution of your user scripts.

## Additional resources 📄 📗
[MDN: Your first web extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension)

[MDN: About manifest.json](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)

[MDN: Matching URLs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns)

[MDN: What Content Scripts can do](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Content_scripts)