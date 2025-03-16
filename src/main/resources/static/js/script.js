let loadingMessage = "";

function createMessageElement(text, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("p-2", "rounded-lg", "mb-2", "max-w-xs", "break-words");

    if (sender === "user") {
        messageElement.classList.add("bg-blue-200", "self-end");
        messageElement.innerText = "🔊 " + text;
    } else if (sender === "ia") {
        messageElement.classList.add("bg-gray-200", "self-start");
        messageElement.innerText = "🤖: " + text;
    } else if (sender === "alert") {
        messageElement.classList.add("bg-red-200", "self-center", "text-red-800", "font-bold");
        messageElement.innerText = "⚠️ " + text;
    }

    return messageElement;
}

document.getElementById("btnSend")?.addEventListener("click", async () => {
    const inputElement = document.getElementById("inptChat");
    const chatBox = document.getElementById("chatBox");
    const choosen = document.getElementById("choosen").value;
    const language = document.documentElement.lang || "pt"; 
    let msg = inputElement.value.trim();

    if (msg === "") {
        const alertMessageElement = createMessageElement(texts[language].alertMessage, "alert");
        chatBox.appendChild(alertMessageElement);
        chatBox.scrollTop = chatBox.scrollHeight;

        setTimeout(() => {
            alertMessageElement.remove();
        }, 3000);
        return;
    }

    const userMessage = createMessageElement(msg, "user");
    chatBox.appendChild(userMessage);

    const loadingMessageElement = createMessageElement(loadingMessage, "ia");
    chatBox.appendChild(loadingMessageElement);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        if (choosen === "resumir_texto") {
            msg = texts[language].optionSummarizeText + " " + msg;
        } else if (choosen === "correcao_ortografica") {
            msg = texts[language].optionSpellCheck + " " + msg;
        } else if (choosen === "gerar_titulo") {
            msg = texts[language].optionGenerateTitle + " " + msg;
        } else if (choosen === "gerar_descricao") {
            msg = texts[language].optionGenerateDescription + " " + msg;
        }

        const response = await jsonSend(msg);
        loadingMessageElement.innerText = "🤖: " + response;

    } catch (error) {
        loadingMessageElement.innerText = texts[language].errorMessage;
        console.error(error);
    }

    inputElement.value = "";
    chatBox.scrollTop = chatBox.scrollHeight;
});

document.getElementById("btnClearRes")?.addEventListener("click", () => {
    document.getElementById("chatBox").innerHTML = "";
});

document.getElementById("btnClearReq")?.addEventListener("click", () => {
    document.getElementById("inptChat").value = "";
});

async function jsonSend(msg) {
    try {
        const template = {
            contents: [
                {
                    parts: [
                        {
                            text: msg,
                        },
                    ],
                },
            ],
        };

        const response = await fetch("http://localhost:8080/api/chat/msg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(template),
        });

        if (response.ok) {
            const data = await response.json();
            return data.candidates[0]?.content?.parts[0]?.text || "⚠️ Resposta não encontrada.";
        } else {
            console.error("Erro ao enviar mensagem:", response.status);
            return texts[document.documentElement.lang].errorMessage;
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        return texts[document.documentElement.lang].errorMessage;
    }
}

const texts = {
    pt: {
        chatbotTitle: "CHATBOT",
        optionsTitle: "Opções",
        chooseOption: "Escolha uma opção",
        btnClearChat: "Limpar Chat",
        btnClearInput: "Limpar Input",
        btnSend: "Enviar request",
        alertMessage: "Por favor, digite alguma coisa!",
        loadingMessage: "Escrevendo...",
        errorMessage: "❌ Erro ao enviar mensagem.",
        optionNormalConversation: "Conversa normal",
        optionSummarizeText: "Resumir texto",
        optionSpellCheck: "Correção ortográfica",
        optionGenerateTitle: "Gerar título para YouTube",
        optionGenerateDescription: "Gerar descrição para YouTube",
    },
    en: {
        chatbotTitle: "CHATBOT",
        optionsTitle: "Options",
        chooseOption: "Choose an option",
        btnClearChat: "Clear Chat",
        btnClearInput: "Clear Input",
        btnSend: "Send request",
        alertMessage: "Please type something!",
        loadingMessage: "Writing...",
        errorMessage: "❌ Error sending message.",
        optionNormalConversation: "Normal conversation",
        optionSummarizeText: "Summarize text",
        optionSpellCheck: "Spell correction",
        optionGenerateTitle: "Generate title for YouTube",
        optionGenerateDescription: "Generate description for YouTube",
    },
};


function changeLanguage(language) {
    const elements = {
        chatbotTitle: document.getElementById("chatbotTitle"),
        optionsTitle: document.getElementById("optionsTitle"),
        btnClearRes: document.getElementById("btnClearRes"),
        btnClearReq: document.getElementById("btnClearReq"),
        btnSend: document.getElementById("btnSend"),
        choosen: document.getElementById("choosen"),
    };

    elements.chatbotTitle.innerText = texts[language].chatbotTitle;
    elements.optionsTitle.innerText = texts[language].optionsTitle;
    elements.btnClearRes.innerText = texts[language].btnClearChat;
    elements.btnClearReq.innerText = texts[language].btnClearInput;
    elements.btnSend.innerText = texts[language].btnSend;

    document.getElementById("inptChat").placeholder = language === "pt" ? "Digite aqui..." : "Type here...";
    
    document.querySelector('label[for="choosen"]').innerText = texts[language].chooseOption;

    elements.choosen.innerHTML = `
        <option selected value="conversa_normal">${texts[language].optionNormalConversation}</option>
        <option value="resumir_texto">${texts[language].optionSummarizeText}</option>
        <option value="correcao_ortografica">${texts[language].optionSpellCheck}</option>
        <option value="gerar_titulo">${texts[language].optionGenerateTitle}</option>
        <option value="gerar_descricao">${texts[language].optionGenerateDescription}</option>
    `;

    loadingMessage = texts[language].loadingMessage;
    alertMessage = texts[language].alertMessage;
    errorMessage = texts[language].errorMessage;
}
