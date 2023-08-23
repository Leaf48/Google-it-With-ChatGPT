document.getElementById("submit").addEventListener("click", () => {
	const textValue = document.getElementById("textbox").value;
	chrome.storage.local.set({ token: textValue }, () => {
		console.log("Value is set to: ", textValue);
		document.getElementById("current-token").innerHTML = textValue;
	});
});

document.getElementById("toggle-switch").addEventListener("change", () => {
	const checkbox = document.getElementById("toggle-switch").checked;
	if (checkbox) {
		chrome.storage.local.set({ enable: true }, () => {
			console.log("Enabled!");
		});
	} else {
		chrome.storage.local.set({ enable: false }, () => {
			console.log("Disabled!");
		});
	}
});

window.addEventListener("load", () => {
	chrome.storage.local.get("token", (result) => {
		document.getElementById("current-token").innerHTML = result.token;
	});
	chrome.storage.local.get("enable", (result) => {
		document.getElementById("toggle-switch").checked = result.enable;
	});
});
