const express = require('express');
const router = express.Router();
const openaiService = require('../services/openaiService');
const apsService = require('../services/aps');

router.post('/chat', async (req, res) => {
	const { message } = req.body;

	try {
		const aiResponse = await openaiService.generateResponse(message);

		// Execute o código gerado pela IA
		let result;
		try {
			result = eval(aiResponse);  // Executa o código gerado pela IA
		} catch (error) {
			return res.status(500).json({ error: 'Erro ao executar o código gerado pela IA.', details: error.message });
		}

		res.json({ aiResponse, result });
	} catch (error) {
		console.error(error);
		res.status(500).send('Erro ao processar a solicitação.');
	}
});

module.exports = router;
