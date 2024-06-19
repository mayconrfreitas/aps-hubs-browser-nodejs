const express = require('express');
const openaiService = require('../services/openai');
const apsService = require('../services/aps');

const router = express.Router();

router.post('/api/chat', async (req, res) => {

	const { message } = req.body;

	console.log('Received message:', message);
	if (!message) {
		return res.status(400).json({ error: 'Mensagem não informada.' });
	}

	try {
		const response = await openaiService.generateResponse(message);
		res.json({ response });
	} catch (error) {
		console.error(error);
		res.status(500).send('Erro ao processar a solicitação.');
	}
});

router.post('/api/addUserMessageToHistory', async (req, res) => {
	const { message } = req.body;

	console.log('Received message:', message);
	if (!message) {
		return res.status(400).json({ error: 'Mensagem não informada.' });
	}

	try {
		openaiService.addUserMessageToHistory(message);
		res.json({ message });
	} catch (error) {
		console.error(error);
		res.status(500).send('Erro ao processar a solicitação.');
	}
});

router.post('/api/addSystemMessageToHistory', async (req, res) => {
	const { message } = req.body;

	console.log('Received message:', message);
	if (!message) {
		return res.status(400).json({ error: 'Mensagem não informada.' });
	}

	try {
		openaiService.addSystemMessageToHistory(message);
		res.json({ message });
	} catch (error) {
		console.error(error);
		res.status(500).send('Erro ao processar a solicitação.');
	}
});

router.get('/api/clearHistory', async (req, res) => {
	try {
		openaiService.clearHistory();
		res.json({ message: 'Histórico apagado com sucesso.' });
	} catch (error) {
		console.error(error);
		res.status(500).send('Erro ao processar a solicitação.');
	}
});

module.exports = router;