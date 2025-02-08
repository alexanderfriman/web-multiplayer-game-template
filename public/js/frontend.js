const socket = io();

const canvas = document.querySelector("canvas");
const context = canvas.getContext('2d');
canvas.width = innerWidth
canvas.height = innerHeight

const frontEndPlayers = {}

socket.on('updatePlayers', (players)=>{
	console.log(players);	
	context.clearRect(0,0, canvas.width, canvas.height);
	for (let id in players){
		const player = players[id];
		context.fillRect(player.x, player.y, 30, 30);
	}
})

