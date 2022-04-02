let messagesWrapper = document.getElementById("messages-wrapper");

const socket = new WebSocket("ws://localhost:5196/ws");

let i = 0;
socket.addEventListener('open', (event) => {
    socket.send('Connection Open');

    setInterval(() => {
        socket.send(`data ${i++}`)
    }, 2000);
});

socket.addEventListener('message', (event) => {
    let message = document.createElement("p");
    let text = document.createTextNode(event.data);
    message.appendChild(text);

    messagesWrapper.appendChild(message);
});