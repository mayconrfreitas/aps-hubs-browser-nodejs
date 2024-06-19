import { appendMessage } from '../helpers/chatWindowHelper.js';
import { addSystemMessageToHistory } from '../controllers/openaiController.js';

export function executeMessageCode(code) {
	try {
		eval(code);
	} catch (error) {
		console.error(error);
		alert('Failed to execute code. See console for more details.');
	}
}