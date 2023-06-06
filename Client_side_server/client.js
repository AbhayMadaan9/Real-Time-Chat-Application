
const socket = io('http://localhost:8000', {
    cors: {
        "Access-Control-Request-Origin": ["http://127.0.0.1:8000"]
    }

    // "Access-Control-Request-Methods": ["POST", "GET"],
    // withCredentials: true,
    // "Content-type": "text/javascript"
})
const totalMessages = document.querySelector('.container')
const messageContainer_send = document.querySelector('div.send')
const messageContainer_receive = document.querySelector('div.receive')
const messageContainer_enter = document.querySelector('div.enter')
const messageContainer_leave = document.querySelector('div.leave')
const data = document.getElementById("send")
const messagesend = document.getElementById('message')
var sound = new Audio('ting.mp3')
function append(message, user_name, message_type) {

    if (message_type == 'text-send') {
        //creation
        const messageEle = document.createElement('div');
        messageEle.classList.add('text');
        messageEle.classList.add('send');        
        const para = document.createElement('p')
        const text = document.createTextNode(message)
        //appending
        para.appendChild(text)
        messageEle.append(para);
        totalMessages.append(messageEle);
    }
    if (message_type == 'text-receive') {
        //creation
        const messageEle = document.createElement('div');
        messageEle.classList.add('text');
        messageEle.classList.add('receive');        
        const para = document.createElement('p')
        const text = document.createTextNode(user_name +":"+ message)
        //appending
        para.appendChild(text)
        messageEle.append(para);
        totalMessages.append(messageEle);

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
const namee = prompt("Enter your Name: ")

data.addEventListener('submit', (e)=>{
    e.preventDefault() //this prevents from reloading the page
    
    const message = messagesend.value;
    append(message, namee, 'text-send') //To know what we have send
    socket.emit('send', message) //To send the message to others
    messagesend.value = ''
})



//socket.emit will send messaage to server
socket.emit('new-user', namee) //this is custom event made and emmited which is listened on app.js (calling of event and on server it will receive and then call to client which is below received)

//socket.on will listen incoming data. 
socket.on('user-joined', name => {
    append(`${name} joined the chat`, '', 'enter')
})
socket.on('receive', (obj)=>{ //an object containing message and users are received from server
    console.log(obj.message+ 'this is text message send');
    append(obj.message, obj.name, 'text-receive')
})
socket.on('leave', name=>{
    append(`${name} left the chat`, "" + 'leave')
})



