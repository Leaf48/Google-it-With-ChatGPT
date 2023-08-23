async function test() {
	const isEnabled = (await chrome.storage.local.get("enable")).enable;
	if (!isEnabled) {
		return console.log("ChatGPT Search is disabled");
	}

	var barElement = document.getElementById("appbar");
	var parentElement = barElement.parentNode;
	var newElement = document.createElement("div");
	newElement.innerHTML = "hello";
	parentElement.insertBefore(newElement, barElement.nextSibling);
	newElement.style.wordBreak = "break-all";
	newElement.style.fontSize = "1rem";
	newElement.style.maxWidth = "50rem";
	newElement.style.textAlign = "center";
	newElement.style.margin = "0 5rem 0 5rem";

	var searchTextbox = document.querySelector(
		'textarea[name="q"][type="search"]'
	);
	var searchValue = searchTextbox.value;

	if (searchValue === "") {
		return console.log("Query is empty!");
	}

	var token = await chrome.storage.local.get("token");
	token = token.token;

	if (token === "") {
		return (newElement.innerHTML = "Token is empty!");
	}

	var headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	};

	var apiUrl = "https://api.openai.com/v1/chat/completions";

	var body = JSON.stringify({
		model: "gpt-3.5-turbo",
		max_tokens: 400,
		messages: [
			{ role: "user", content: searchValue },
			{
				role: "system",
				content:
					"Please keep it as short and concise as possible. Please answer in Japanese when Japanese is the majority language.",
			},
		],
		temperature: 0.7,
	});

	fetch(apiUrl, { method: "POST", headers: headers, body: body })
		.then((res) => res.json())
		.then((data) => {
			var textContext = data.choices[0].message.content;
			var replaced = textContext.replace(/\n/g, "<br>");

			newElement.innerHTML = replaced;
		})
		.catch((err) => {
			newElement.innerHTML = "Token is unavailable!";
			console.error("API Request error: ", err);
		});
}

window.addEventListener("load", test);
