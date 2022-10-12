const socket = io('http://localhost:8000',{
    cors :{
        "Access-Control-Request-Origin": ["http://127.0.0.1:8000"]
    }
    
    // "Access-Control-Request-Methods": ["POST", "GET"],
    // withCredentials: true,
    // "Content-type": "text/javascript"
})

const append_message = (message, message_type) => {

    const messageinput = document.getElementsByClassName(`${message_type}`)
    const form = document.getElementById('sending_container')
    const messagecontainer = document.querySelector('container')

    //creation
    const message_element = messagecontainer.createElement('div')
    const para = messagecontainer.createElement('p')
    const user_para = para.createTextNode(message)
    //insertion
    const new_message = para.appendChild(user_para)
    message_element.appendChild(para);

    if (message_type == "text-send") {
        message_element.style.margin('20px 20px 10px 10px;')
        message_element.style.marginLeft('auto')
        message_element.style.padding('5px')
        message_element.style.borderRadius('25px')
        message_element.style.backgroundColor('#61ea69')
        new_message.style.textalign("end;")
        new_message.style.marginright('20px')
    }
    else {
        message_element.style.margin('20px 20px 10px 10px;')
        message_element.style.padding('5px')
        message_element.style.borderRadius('25px')
        message_element.style.backgroundColor('#61ea69')
        new_message.style.textalign("start;")
        new_message.style.marginLeft('20px')
    }

}
    const username = prompt("Enter your Name: ")
    //socket.emit will send messaage to server
    socket.emit('new-user-joined', username) //this is coustome event made and emmited which is listened on app.js (calling of event and on server it will receive and then call to client which is below received)

    //socket.on will listen incoming data. 
    socket.on('User-Joined', username=>{
        append_message(`${username} Joined the Chat`, "text-send")
    })
