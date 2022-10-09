//This is node server js file it will handle all the connections

//The main idea behind Socket.IO is that you can send and receive any events you want, with any data you want.
//Any objects that can be encoded as JSON will do, and binary data is supported too.`
const httpServer = require("http").createServer();
const io = require('socket.io')(8000,httpServer,{
  cors: {
    origin: 'http://localhost:5500',
    method: ['GET', 'POST']
  }
}) //This server(io) is the instance of socket.io, it will listen all the events which are emmited 
const users = {}
//when the connection is made all the coustom events are listened in it 
io.on('connection', socket=>{ //io.on will handle all the events(new connections i.e. new user, new message by the user)  here it means when connection comes arrow func. runs having socket as parameter

  //New connection is made 
  socket.on('new-user-joined', name=>{ //socket will handle all coustomized events in clinet.js
    console.log('user name: ' + name)
    users[socket.id] = name; 
    socket.broadcast.emit('User-Joined', name)  //This will broadcast the message
  })
  //Message handling
  // socket.on('send', message=>{
  //   socket.broadcast.emit('receive', {message:message, name:users[socket.id]}) //this will broadcast the object having name, message
  // })

})

io.on('send', message=>{ //io will handle all the events
    socket.broadcast.emit('receive', {message:message, name: users[socket.id]})  //This will broadcast the  coustomized message
})



