let messagesWrapper = document.getElementById("messages-wrapper");

let source = new EventSource('/sse');

source.onmessage = (event) => {
    let message = document.createElement("p");
    let text = document.createTextNode(event.data);
    message.appendChild(text);

    messagesWrapper.appendChild(message);
};
source.onopen = (event) => console.log('Connection started');
source.onerror = (event => console.log(event));

source.addEventListener('custom', (e) => console.log('custom', e.data));
let message = document.createElement("p");
let text = document.createTextNode(event.data);
message.appendChild(text);

messagesWrapper.appendChild(message);