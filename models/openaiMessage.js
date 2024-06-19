const OpenAIMessage = class OpenAIMessage {
	constructor(role, message) {
		this.role = role;
		this.content = [{
			type: 'text',
			text: message
		}];
	}
}

module.exports = OpenAIMessage;