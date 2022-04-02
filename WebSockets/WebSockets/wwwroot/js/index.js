let messagesWrapper = document.getElementById("messages-wrapper");

const socket = new WebSocket("ws://localhost:5196/ws");
//spomeni Sec-WebSocket-Key => da po njemu stvori konekciju putem obicnog http GET-a sa jedinom razlikom od par headera (i 101 switching protocol)
//Upgrade: websocket


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