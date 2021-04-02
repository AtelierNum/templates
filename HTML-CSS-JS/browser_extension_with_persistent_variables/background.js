getStorage("isActive").then(setIcon);

async function toggleActivation() {	
	const isActive = await getStorage("isActive");
	browser.storage.local.set({isActive: !isActive});
	setIcon(!isActive);
}

browser.browserAction.onClicked.addListener(toggleActivation);


//because the browser always gives you back your data wrapped in an object
async function getStorage(key = null){
	return key 
	? (await browser.storage.local.get(key))[key] 
	: (await browser.storage.local.get())
}

function setIcon(isActive){
	if (isActive) {
		browser.browserAction.setIcon({
			path: "/icons/icon.png",
		});
	} else {
		browser.browserAction.setIcon({
			path: "/icons/icon_disabled.png",
		});
	}
}