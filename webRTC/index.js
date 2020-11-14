const express = require("express");
const app = express();
const http = require("http").createServer(app)
const io = require('socket.io')(http);
const {join} = require("path");

let activeSockets = [];

app.use(express.static(join(__dirname,'public')));

http.listen(3000, () => {
	console.log("app started on 3000");
});

io.on("connection", socket => {
	const existingSocket = activeSockets.find(
		existingSocket => existingSocket === socket.id
	);

	if (!existingSocket) {
		activeSockets.push(socket.id);

		socket.emit("update-user-list", {
			users: activeSockets.filter(
				existingSocket => existingSocket !== socket.id
			)
		});

		socket.broadcast.emit("update-user-list", {
			users: [socket.id]
		});
	}

	socket.on('disconnect',() => {
		console.log("bye bye 👋");
		activeSockets = activeSockets.filter(existingSocket => existingSocket !== socket.id);
		socket.broadcast.emit("remove-user",{
			socketId: socket.id
		});
	})

	socket.on("call-user", data => {
		socket.to(data.to).emit("call-made", {
			offer: data.offer,
			socket: socket.id
		});
	});

	socket.on("make-answer", data => {
		socket.to(data.to).emit("answer-made", {
			socket: socket.id,
			answer: data.answer
		});
	});

	socket.on("reject-call", data => {
		socket.to(data.from).emit("call-rejected", {
			socket: socket.id
		});
	});

	console.log("connection estblished by: "+socket.id);
	console.log(activeSockets);
})