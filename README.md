# About Real Time Chat Application
 This node js application is used to make real time chatting using wss(web socket secure) protocol inseted of https which provide one way connection betwee client and server whereas web sockets forms two way connection means it always keep server and client updated insted of sending request and receiving response from/to server 


# What does "xhr-polling" config do in socket.io?

xhr-polling means that your server will be waiting for 10 seconds on any GET of POST received that it does not have an answer before answering instead of sending back an empty response. So, if your server has no information to give back after 10 seconds, it will answer back with an empty response. You can read more here : Long polling(With long polling, the client requests information from the server exactly as in normal polling, but with the expectation the server may not respond immediately. If the server has no new information for the client when the poll is received, instead of sending an empty response, the server holds the request open and waits for response information to become available. Once it does have new information, the server immediately sends an HTTP/S response to the client, completing the open HTTP/S Request. Upon receipt of the server response, the client often immediately issues another server request. In this way the usual response latency (the time between when the information first becomes available at the next client request) otherwise associated with polling clients is eliminated)

There is no new connection that is created on every new polling, it is just a way that only one GET or POST is sent to the server every 10 seconds, instead of having to poll the server every .5 seconds to have a "real-time" application. If the server answer in less than 10 seconds, there will be another poll sent to prepare the next answer.

#    OVERALL WORKING OF WEBSOCKET.IO SERVER
A Socket is the fundamental class for interacting with the client. It inherits all the methods of the Node.js EventEmitter, like emit, on, once or removeListener.


                                    SERVER                                CLIENT

                            socket.emit("event-a") ---------------->     socket.on("event-a", ()=>{

                                                                                               })

                            socket.on("event-b", ()=>{  <------------    socket.emit("event-b")

                            })