//setup konekcije
let connection = new signalR.HubConnectionBuilder()
    .withUrl("/custom")
    .build();

//startanje konekcje
//ServerHook => ime metode/hooka kojeg pozivamo sa server
connection.start().then(() => {
    displayMessage('Init signalR', 'Connection established');
    connection.send('ServerHook', { id: 1, message: "We've connected" });
});

// poziva se sa servera iz selfPing/allPing
const connect = () =>  connection.on("ClientHook", data => 
    displayMessage('ClientHook', data)
);
const deconnect = () => connection.off('ClientHook');

connect();

// after triggerFetch - called from api controller
connection.on("client_function_name", data => displayMessage('client_function_name', data));

// call signalR hub function from client
const pingAll = () => connection.send('PingAll')

// call signalR hub function from client
const pingSelf = () => connection.send('PingSelf')

// trigger hub from controller
const triggerFetch = () => fetch('/send')

// call signalR hub function from client
// RAZLIKA! 1. INVOKE (ovdje)      => promise resolve tek kada dobijemo data-u u responseu sa bekenda
//          2. SEND (u hookovima ) => promise resolvea kada uspjesno posaljemo data-u/message
const directInvocation = async () => {
    const response = await connection.invoke('direct_invocation');
    displayMessage('Direct invocation response', response);
};


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

const deconnectButton = document.getElementById("deconnect-btn");
deconnectButton.onclick = () => deconnect();

const reconnectButton = document.getElementById("reconnect-btn");
reconnectButton.onclick = () => connect();
