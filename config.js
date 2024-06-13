require('dotenv').config();

let { APS_CLIENT_ID, APS_CLIENT_SECRET, APS_CALLBACK_URL, SERVER_SESSION_SECRET, PORT } = process.env;
if (!APS_CLIENT_ID || !APS_CLIENT_SECRET || !APS_CALLBACK_URL || !SERVER_SESSION_SECRET) {
    console.warn('Missing some of the environment variables.');
    process.exit(1);
}
const INTERNAL_TOKEN_SCOPES = ['data:read'];
const PUBLIC_TOKEN_SCOPES = ['viewables:read'];
PORT = PORT || 8080;

OPENAI_ORGANIZATION_ID = process.env.OPENAI_ORGANIZATION_ID
OPENAI_PROJECT_ID = process.env.OPENAI_PROJECT_ID
OPENAI_API_KEY = process.env.OPENAI_API_KEY

module.exports = {
    APS_CLIENT_ID,
    APS_CLIENT_SECRET,
    APS_CALLBACK_URL,
    SERVER_SESSION_SECRET,
    INTERNAL_TOKEN_SCOPES,
    PUBLIC_TOKEN_SCOPES,
    PORT,
    OPENAI_ORGANIZATION_ID,
    OPENAI_PROJECT_ID,
    OPENAI_API_KEY
};
