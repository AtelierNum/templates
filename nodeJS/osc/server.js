var app       =     require("express")();
var express = require("express");
var http      =     require('http').Server(app);
var io        =     require("socket.io")(http);
var osc       =     require('node-osc');
var oscServer = new osc.Server(12000, '127.0.0.1'); // we split here the server connected to external inputs and the one connected to Wekinator
var wekinatorServer = new osc.Server(12001, '127.0.0.1'); // to avoid overloading because oscHook timing should be set at 50ms
const client = new osc.Client('127.0.0.1', 6448); // port listened by Wekinator
const path = '/wek/outputs';


// ========== Pages ========== //
// Allows acess to all files inside 'public' folder.
app.use(express.static(__dirname + "/public"));

// ========== OSCSERVER ========== //
/* Executed when a new message arrives */
oscServer.on("message",function(msg, rinfo){
  // msg[0] should correspond to pattern name, msg[1 +] to values

  if(msg[0] == '/rotation_vector/r2'){
    console.log("Message:");
    console.log(msg[0] + ": " + msg[1]);

    // send message with "/r2" pattern and <msg[1]> value
    client.send('/r2', msg[1])
  }
});

wekinatorServer.on('message', function(msg, info){
  // here I get an array where msg[0] == "/wek/outputs", and others are confidence value of each model
  // We expect the following structure :
  // msg[1] => throwing gesture
  // msg[2] => getting gesture
  // msg[3] => range sharing gesture
  // msg[4] => empty model
  console.log('---------------------------')
  console.log(msg)
  console.log('---------------------------')

  // we send data over socket server and get them in our app
  if(msg.length > 1){
    // means that we got mapped values for each models, but none of them is actually trigerred
    io.emit('gestures-values', {
      data: msg
    })
  } else {
    // means we have one gesture model trigerred
    io.emit('gesture-detected', {
      data: msg[0]
    })
  }
})

// ========== SOCKET.IO ========== //
/*  This is auto initiated event when Client connects to the server  */
io.on('connection',function(socket){  
    console.log("A user is connected");
});

// Hosts the page on port 3000
http.listen(3000,function(){
    console.log("Listening on 3000");
});
