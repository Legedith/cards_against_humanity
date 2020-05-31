const app = require('http').createServer(handler)
const io = require('socket.io')(app);
const fs = require('fs');

app.listen(80);
let connectors = [];

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

// io.on('connection', (socket) => {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', (data) => {
//     console.log(data);
//   });
// });
// const io = require('socket.io')(80);

// io.on('connection', function(socket){
//   socket.join('Local_room');
//   io.to.emit('Joined Local Room');
// });


var clients = 0;
var blackCount = 0;
io.on('connection', function(socket) {
   clients++;
   if (clients===1)
   {
    socket.emit('colorInfo',{ 'color':'black', 'noc':clients});
    console.log('sending black');
   }
   else{
     socket.emit('colorInfo',{ 'color':'white'});
   }
   connectors.push(socket);
   console.log("connected");
  //  socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
   socket.on('disconnect', function () {
      clients--;
      console.log("disconnected "+clients);
      // socket.broadcast.emit('newclientconnect',{ description: clients + ' clients connected!'})
   });
   socket.on("SetChange", (data)=>{
    //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
    console.log(data + "is the new set we are dealing with");
   socket.broadcast.emit("NewSet", data);
});
socket.on("BlackUpdate", (data)=>{
  //Here we broadcast it out to all other sockets EXCLUDING the socket which sent us the data
  console.log(data + " is the new black card we are dealing with");
  blackCount++;
  if(blackCount===1){
    socket.broadcast.emit("BlackUpdated", data);
  }
 
});
});

io.on('message', (msg) => {
    console.log(msg);
});