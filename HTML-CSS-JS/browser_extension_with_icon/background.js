//this variable will represent whether or not we consider our extension to be active
let isActive = true;

function toggleActivation() {
	isActive = !isActive;//isActive becomes its opposite, if it was true it's now folse and vice-versa

	if (isActive) {
		//this will change the icon of our extension to specified image
		browser.browserAction.setIcon({
			path: "/icons/icon.png",
		});
	} else {
		browser.browserAction.setIcon({
			path: "/icons/icon_disabled.png",
		});
	}
}

//this line links the clicking of your extension button to the function toggleActivation
browser.browserAction.onClicked.addListener(toggleActivation);