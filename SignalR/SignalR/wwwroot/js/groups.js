//setup konekcije
connection = new signalR.HubConnectionBuilder()
    .withUrl("/group")
    .build();

const connectToGroup = async () => await connection.start();
connectToGroup();

connection.on("GroupHook", ({ id, payload, availablePositions, takenPositions }) => {
    displayEvent(`${payload}`);
    displayAvailablePositions(availablePositions);

    console.log(payload);
});

const join = () => connection.send('Join');
const leave = () => connection.send('Leave');
const message = () => connection.send('GroupMessage', getSelectedPosition());

const joinButton = document.getElementById("join-btn");
joinButton.onclick = () => join();

const leaveButton = document.getElementById("leave-btn");
leaveButton.onclick = () => leave();

const messageButton = document.getElementById("message-btn");
messageButton.onclick = () => message();

const displayAvailablePositions = (availablePositions) => {
    let message = document.getElementById("positions-picker");
    message.innerHTML = '';
    console.log(availablePositions);

    availablePositions.forEach((position) => {
        message.innerHTML += `<li><input name="place-option" type="checkbox" value="${position}">${position}</li>`;
    });

    message.appendChild(text);
    messagesWrapper.appendChild(message);
};

const getSelectedPosition = () => {
    let checkboxes = document.getElementsByName("place-option");
    let selected = Array.prototype.slice.call(checkboxes).filter(ch => ch.checked == true)[0].value;
    let input = document.getElementById("company-name").value;

    return { company: input, place: selected };
};

const displayEvent = (event) => {
    let message = document.createElement("p");
    let text = document.createTextNode(`${event}`);
    message.appendChild(text);

    messagesWrapper.appendChild(message);
};