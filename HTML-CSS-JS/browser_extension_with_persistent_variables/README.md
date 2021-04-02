# Extension with persistent variables

**Level** : ![](https://img.shields.io/badge/Level-Intermediate-yellow)

## What does it do ? ✨
This extension will keep some data in between being closed and re-opened. 

To showcase this we will activate/deactivate the extension by clicking on it and the icon will change to reflect this state but the most important is that this state will be saved to not reset when you close your browser.

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
- The "background" part list the scrpits to start your extension.
- The role of the manifest is to describe to the browser what the extension will do, which file are going to be used, in which way, and what are the special permissions required by your extension (like storing data, making requests, looking at the cookies etc ...)
- We need to specify the "storage" value in "permissions" to indicate that our extension will store information.



## Additional resources 📄 📗
[MDN: Your first web extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_first_WebExtension)

[MDN: About manifest.json](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json)

[MDN: How to use an icon in the extension bar](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Add_a_button_to_the_toolbar)

[MDN: How to change the icon of your extension through code](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/browserAction/setIcon)

[MDN: Information about the browser storage for extensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/storage)

[MDN: Your second web extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Your_second_WebExtension)
