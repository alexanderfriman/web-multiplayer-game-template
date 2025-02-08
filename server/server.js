const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { debug } = require('node:util');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, { pingInterval: 2000, pingTimeout: 5000});

app.use(express.static('public'))

app.get('/', (req, res) => {
 res.sendFile(join(__dirname, 'index.html'));
});

const players = {};

io.on('connection', (socket) => {
 console.log('a user connected');
 
 players[socket.id] = {
	x: 100,
	y: 100,
 }
 io.emit('updatePlayers', players);
 console.log(players);
 
 socket.on('disconnect', (reason) => {
	console.log(reason);
	delete players[socket.id];
	io.emit('updatePlayers', players);
	console.log(players);
 });
 
 socket.on('keydown', (keycode) => {
	switch (keycode){
		case 'KeyW':
			players[socket.id].y -= 50;			
			break;
		case 'KeyS':
			players[socket.id].y += 50;
			break;
		case 'KeyA':
			players[socket.id].x -= 50;
			break;
		case 'KeyD':
			players[socket.id].x += 50;
			break;
	}
	console.log(players);
})
});



server.listen(3000, () => {
 console.log('server running at http://localhost:3000');
});

const fps = 30;
setInterval(()=>{
	io.emit('updatePlayers', players);
},1000/fps);