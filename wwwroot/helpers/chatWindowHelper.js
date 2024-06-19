export function appendMessage(sender, text) {
	const messageDiv = document.createElement("div");
	messageDiv.classList.add("message", sender);
	const textDiv = document.createElement("div");
	textDiv.classList.add("text");
	textDiv.textContent = text;
	messageDiv.appendChild(textDiv);
	const messagesContainer = document.getElementById("messages");
	messagesContainer.appendChild(messageDiv);
	messagesContainer.scrollTop = messagesContainer.scrollHeight;
}