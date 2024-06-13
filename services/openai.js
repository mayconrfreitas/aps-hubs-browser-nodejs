const { Configuration, OpenAIApi } = require('openai');
const { OPENAI_ORGANIZATION_ID, OPENAI_PROJECT_ID, OPENAI_API_KEY } = require('../config.js');
const { OpenAIMessage } = require('../models/openAiMessage.js');

const Roles = {
    USER: 'user',
    SYSTEM: 'system'
};

const configuration = new Configuration({
    organization: OPENAI_ORGANIZATION_ID,
    project: OPENAI_PROJECT_ID,
    apiKey: OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);
const service = module.exports = {};


service.generateResponse = async (prompt) => {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [],
        temperature: 0,
        max_tokens: 4095,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    return response.data.choices[0].message.content;

};