import './extensions/LoggerExtension.js';
import './extensions/SummaryExtension.js';
import './extensions/HistogramExtension.js';
import './extensions/DataGridExtension.js';

async function getAccessToken(callback) {
    try {
        const resp = await fetch('/api/auth/token');
        if (!resp.ok)
            throw new Error(await resp.text());
        const { access_token, expires_in } = await resp.json();
        window.access_token = access_token;
        callback(access_token, expires_in);
    } catch (err) {
        alert('Could not obtain access token. See the console for more details.');
        console.error(err);
    }
}

export function initViewer(container) {
    return new Promise(function (resolve, reject) {
        Autodesk.Viewing.Initializer({ env: 'AutodeskProduction', getAccessToken }, function () {
            const config = {
                extensions: [
                    'Autodesk.DocumentBrowser',
                    // 'LoggerExtension',
                    // 'SummaryExtension',
                    // 'HistogramExtension',
                    // 'DataGridExtension',
                ]
            };
            window.viewer = new Autodesk.Viewing.GuiViewer3D(container, config);
            window.viewer.start();
            window.viewer.setTheme('light-theme');
            resolve(window.viewer);
        });
    });
}

export function loadModel(urn) {
    function onDocumentLoadSuccess(doc) {
        window.viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry());
    }
    function onDocumentLoadFailure(code, message) {
        alert('Could not load model. See console for more details.');
        console.error(message);
    }
    Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
}
