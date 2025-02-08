addEventListener('keydown', (event)=>{	
	switch (event.code){
		case 'KeyW':
			socket.emit('keydown', 'KeyW'); 
			break;
		case 'KeyS':
			socket.emit('keydown', 'KeyS'); 
			break;
		case 'KeyA':
			socket.emit('keydown', 'KeyA');
			break;
		case 'KeyD':
			socket.emit('keydown', 'KeyD'); 
			break;
	}	
})