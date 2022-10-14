const socket = io('http://localhost:8000', {
    cors: {
        "Access-Control-Request-Origin": ["http://127.0.0.1:8000"]
    }

    // "Access-Control-Request-Methods": ["POST", "GET"],
    // withCredentials: true,
    // "Content-type": "text/javascript"
})
const messageContainer_send = document.querySelector('div.text-send')
const messageContainer_receive = document.querySelector('div.text-receive')
const messageContainer_enter = document.querySelector('div.enter')
const messageContainer_leave = document.querySelector('div.leave')
const data = document.getElementById("send")
const messagesend = document.getElementById('message')
var sound = new Audio('ting.mp3')
function append(message, message_type) {

    if (message_type == 'text-send') {
        //creation
        const para = document.createElement('p')
        const text = document.createTextNode(message)
        //appending
        para.appendChild(text)
        messageContainer_send.appendChild(para);
    }
    if (message_type == 'text-receive') {
        //creation

        const para = document.createElement('p')
        const text = document.createTextNode(message)
        //appending
        para.appendChild(text)
        messageContainer_receive.appendChild(para);
        sound.play()
    }
    if (message_type == 'enter') {
        //creation
        const para = document.createElement('p')
        const text = document.createTextNode(message)
        //appending
        para.appendChild(text)
        messageContainer_enter.appendChild(para);
    }
    if (message_type == 'leave') {
        //creation
        const para = document.createElement('p')
        const text = document.createTextNode(message)
        //appending
        para.appendChild(text)
        messageContainer_leave.appendChild(para);
    }

}

data.addEventListener('submit', (e)=>{
    e.preventDefault() //this prevents from reloading the page
    const message = messagesend.value;
    append(message, 'text-send') //To know what we have send
    socket.emit('send', message) //To send the message to others
    messagesend.value = ''
})

const name = prompt("Enter your Name: ")

//socket.emit will send messaage to server
socket.emit('new-user', name) //this is custom event made and emmited which is listened on app.js (calling of event and on server it will receive and then call to client which is below received)

//socket.on will listen incoming data. 
socket.on('user-joined', name => {
    console.log("hello is there anyone")
    append(`${name} joined the chat`, 'enter')
})
socket.on('reveive', (obj)=>{ //an object containing message and users are received from server
    append(obj.message, 'text-receive')
})
socket.on('leave', name=>{
    append(`${name} left the chat`, 'leave')
})



