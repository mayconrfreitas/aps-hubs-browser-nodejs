import { sendMessage, clearHistory } from '../controllers/openaiController.js';
import { executeMessageCode } from '../helpers/openaiHelper.js';
import { appendMessage } from '../helpers/chatWindowHelper.js';

export function createChatGPTModal() {
    // Criar o estilo do modal
    const style = document.createElement('style');
    style.innerHTML = `
        /* Modal Styles */
        .modal {
            display: none;
            position: fixed;
            z-index: 2;
            right: 60px;
            bottom: 90px;
            width: 300px;
            max-width: 80%;
            background-color: transparent;
        }
        .modal-content {
            background-color: #fefefe;
            margin: auto;
            padding: 20px;
            border: 1px solid #888;
            width: 100%;
            border-radius: 10px;
            position: relative;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
            cursor: move;
        }
        .modal-header h2 {
            margin: 0;
        }
        .close {
            color: #aaa;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }
        .close:hover,
        .close:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
        .modal-body {
            padding-top: 10px;
        }
        /* Chat Container Styles */
        .chat-container {
            display: flex;
            flex-direction: column;
            height: 400px;
        }
        .messages {
            flex: 1;
            overflow-y: auto;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
            margin-bottom: 10px;
        }
        .input-container {
            display: flex;
        }
        .input-container input[type="text"] {
            flex: 1;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px 0 0 5px;
            outline: none;
        }
        .input-container button {
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 0 5px 5px 0;
            background-color: #4CAF50;
            color: white;
            cursor: pointer;
            outline: none;
        }
        .input-container button:hover {
            background-color: #45a049;
        }
        /* Chat message styles */
        .message {
            margin-bottom: 10px;
        }
        .message.bot {
            text-align: left;
        }
        .message.user {
            text-align: right;
        }
        .message .text {
            display: inline-block;
            padding: 10px;
            border-radius: 5px;
            max-width: 80%;
        }
        .message.bot .text {
            background-color: #e0e0e0;
        }
        .message.user .text {
            background-color: #4CAF50;
            color: white;
        }
        /* Button Styles */
        #openModalButton {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            outline: none;
            z-index: 1;
        }
        #openModalButton i {
            font-size: 24px;
        }
        #openModalButton:hover {
            background-color: #45a049;
        }
        /* Typing Indicator Styles */
        .typing {
            display: flex;
            align-items: center;
        }
        .typing .dot {
            height: 10px;
            width: 10px;
            margin: 0 3px;
            background-color: #bbb;
            border-radius: 50%;
            display: inline-block;
            animation: typing 1s infinite ease-in-out;
        }
        .typing .dot:nth-child(1) {
            animation-delay: 0s;
        }
        .typing .dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        .typing .dot:nth-child(3) {
            animation-delay: 0.4s;
        }
        @keyframes typing {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
            100% {
                transform: translateY(0);
            }
        }
        /* Clear Chat Button Styles */
        .clear-chat {
            background-color: #FF0000;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px;
            cursor: pointer;
            outline: none;
        }
        .clear-chat:hover {
            background-color: #CC0000;
        }
    `;
    document.head.appendChild(style);

    // Criar a estrutura do modal
    const modal = document.createElement('div');
    modal.id = 'chatgptModal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header" id="modalHeader">
                <span class="close" id="closeModal">&times;</span>
                <h2>ChatBIM</h2>
            </div>
            <div class="modal-body">
                <div class="chat-container">
                    <div class="messages" id="messages"></div>
                    <div class="input-container">
                        <input type="text" id="chatInput" placeholder="Type a message..." />
                        <button id="sendButton">Send</button>
                    </div>
                </div>
            </div>
            <div style="text-align: center; margin-top: 10px;">
                <button class="clear-chat" id="clearChatButton">Clear Chat</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Botão para abrir o modal
    const openModalButton = document.createElement('button');
    openModalButton.id = 'openModalButton';
    //openModalButton.textContent = 'Open ChatGPT';
    openModalButton.innerHTML = '<i class="fas fa-robot"></i>';
    document.body.appendChild(openModalButton);

    // Adicionar funcionalidade ao modal
    const closeModal = document.getElementById("closeModal");
    const sendButton = document.getElementById("sendButton");
    const clearChatButton = document.getElementById("clearChatButton");
    const chatInput = document.getElementById("chatInput");
    const messagesContainer = document.getElementById("messages");

    openModalButton.onclick = function () {
        if (modal.style.display === "none") {
            modal.style.display = "block";
        } else {
            modal.style.display = "none";
        }
        
    }

    closeModal.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    sendButton.onclick = function () {
        sendChatMessage();
    }

    clearChatButton.onclick = function () {
        clearChat();
    }

    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendChatMessage();
        }
    });

    function sendChatMessage() {
        const message = chatInput.value.trim();
        if (message !== "") {
            appendMessage('user', message);
            chatInput.value = "";
            showTypingIndicator();

            sendMessage(message).then(data => {
                hideTypingIndicator();
                appendMessage('bot', data.message);
                console.log(data);
                if (data.code) {
                    setTimeout(() => {
                        executeMessageCode(data.code);
                    }, 1000);
                }

            }).catch(err => console.error(err));
        }
    }

    function clearChat() {
        messagesContainer.innerHTML = '';
        clearHistory().then(() => {
            console.log('Chat history cleared.');
        }).catch(err => console.error(err));
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement("div");
        typingDiv.id = "typingIndicator";
        typingDiv.classList.add("message", "bot");
        typingDiv.innerHTML = `
            <div class="text typing">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function hideTypingIndicator() {
        const typingIndicator = document.getElementById("typingIndicator");
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Drag and Drop functionality
    const modalHeader = document.getElementById('modalHeader');
    let isDragging = false;
    let offsetX, offsetY;
    let maxOffsetX, maxOffsetY;

    modalHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - modal.getBoundingClientRect().left;
        offsetY = e.clientY - modal.getBoundingClientRect().top;
        modal.style.position = 'absolute';
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (isDragging) {
            modal.style.left = `${e.clientX - offsetX}px`;
            modal.style.top = `${e.clientY - offsetY}px`;
        }

    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
}