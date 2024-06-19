export async function sendMessage(message) {
	const response = await fetch('/api/chat', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ message })
	});

	if (!response.ok) {
		throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
	}

	const responseJson = await response.json();
	//console.log(responseJson);
	const aiMessageAndCode = responseJson.response;

	let aiMessage = aiMessageAndCode.split('```javascript')[0];
	let code = aiMessageAndCode.split('```javascript')[1] || '';
	code = code.split('```')[0] || '';

	//eval(code);

	return { message: aiMessage, code: code };
}

export async function addUserMessageToHistory(message) {
	const response = await fetch('/api/addUserMessageToHistory', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ message })
	});

	if (!response.ok) {
		throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
	}

	const responseJson = await response.json();
	return responseJson.message;
}

export async function addSystemMessageToHistory(message) {
	const response = await fetch('/api/addSystemMessageToHistory', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ message })
	});

	if (!response.ok) {
		throw new Error(`Failed to send message: ${response.status} ${response.statusText}`);
	}

	const responseJson = await response.json();
	return responseJson.message;
}

export async function clearHistory() {
	const response = await fetch('/api/clearHistory');

	if (!response.ok) {
		throw new Error(`Failed to clear history: ${response.status} ${response.statusText}`);
	}

	const responseJson = await response.json();
	return responseJson.message;
}

// window.testChatGPT = (message) => sendMessage(message).then(data => {
// 	console.log(data.response);
// 	let code = data.response.split('```javascript')[1];
// 	code = code.split('```')[0];

// 	eval(code);

// })
// 	.catch(err => console.error(err));