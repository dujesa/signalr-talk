//ui handling
const messagesWrapper = document.getElementById("messages-wrapper");
const displayMessage = (event, content) => {
    let message = document.createElement("p");
    let text = document.createTextNode(`${event}: ${content?.id} - ${content?.payload} - ${content?.takenPositions}`);
    message.appendChild(text);

    messagesWrapper.appendChild(message);
};

const deconnectButton = document.getElementById("deconnect-btn");
deconnectButton.onclick = () => deconnect();

const reconnectButton = document.getElementById("reconnect-btn");
reconnectButton.onclick = () => connect();
