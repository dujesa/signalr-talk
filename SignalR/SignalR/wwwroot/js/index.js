let connection = new signalR.HubConnectionBuilder()
    .withUrl("/custom")
    .build();

// after selfPing/allPing
connection.on("ClientHook", data => 
    displayMessage('ClientHook', data)
);

// after triggerFetch
connection.on("client_function_name", data => displayMessage('client_function_name', data));

connection.start().then(() => {
    displayMessage('Init signalR', 'Connection established');
    connection.send('ServerHook', { id: 1, message: "We've connected" });
});

// call signalR hub function from client
const pingSelf = () => connection.send('PingSelf')

// call signalR hub function from client
const pingAll = () => connection.send('PingAll')

// trigger hub from controller
const triggerFetch = () => fetch('/send')

// call signalR hub function from client
const directInvocation = () => connection.invoke('direct_invocation')
    .then(data => displayMessage('Direct invocation response', data))

//ui handling
const messagesWrapper = document.getElementById("messages-wrapper");
const displayMessage = (event, { id, payload }) => {
    let message = document.createElement("p");
    let text = document.createTextNode(`${event}: ${id} - ${payload}`);
    message.appendChild(text);

    messagesWrapper.appendChild(message);
};

const pingSelfButton = document.getElementById("ping-self-btn");
pingSelfButton.onclick = () => pingSelf();

const pingAllButton = document.getElementById("ping-all-btn");
pingAllButton.onclick = () => pingAll();

const triggerFetchButton = document.getElementById("trigger-fetch-btn");
triggerFetchButton.onclick = () => triggerFetch();

const directInvokeButton = document.getElementById("direct-invoke-btn");
directInvokeButton.onclick = () => directInvocation();
