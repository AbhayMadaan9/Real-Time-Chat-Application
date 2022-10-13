//This is node server js file it will handle all the connections

//The main idea behind Socket.IO is that you can send and receive any events you want, with any data you want.
//Any objects that can be encoded as JSON will do, and binary data is supported too.`
// import { io } from "socket.io-client"
const http = require("http").createServer();
const io = require('socket.io')(8000,{
  cors :{
    "Access-Control-Allow-Origin": ['http://127.0.0.1:5500/'],
    origin: "*"
  }
    // "Access-Control-Allow-Origin": "*", //accepting the client request from all the origins
    // "Access-Control-Allow-Methods": ["POST", "GET"],
    // "Content-type": "text/javascript"
}) //This server(io) is the instance of socket.io, it will listen all the events which are emmited 
const users = {}
//when the connection is made all the coustom events are listened in it 
io.on('connection', socket=>{ //io.on will handle all the events(new connections i.e. new user, new message by the user)  here it means when connection comes arrow func. runs having socket as parameter

  //New connection is made 
  socket.on('new-user', name=>{ //socket will handle all coustomized events in clinet.js
    console.log('user name: ' + name)
    users[socket.id] = name; 
    socket.broadcast.emit('user-joined', name)  //This will broadcast the message to all the connected users
  })
  //Receving message from another user
  socket.on('send', message=>{ //this send is according to that user
    socket.broadcast.emit('receive', {message:message, name:users[socket.id]}) //this will broadcast the message send by users to all the others connected users 
  })

})



