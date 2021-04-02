# Extension with an UI

**Level** : ![](https://img.shields.io/badge/Level-Intermediate-yellow)

## What does it do ? ✨
This extension will display a popup containing a UI when you click on it. 

In this exact case our script will show a number and two button to make the number go up or down.

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

The key file is the manifest.json
- The HTML document which will be in your popup is the on specified in browseraction.default_popup
- The role of the manifest is to describe to the browser what the extension will do, which file are going to be used, in which way, and what are the special permissions required by your extension (like storing data, making requests, looking at the cookies etc ...)

## Be Careful ⚠️

For security reason you can only execute JS from the js files linked. This means that inline script like `<button onclick="console.log('I got clicked')"/>` doesn't work.

## Additional resources 📄 📗
[MDN: About manifest.json](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)

[MDN: About popups](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Popups)

[MDN: Your second extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension)
