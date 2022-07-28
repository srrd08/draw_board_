const express = require("express");
const socket = require("socket.io");

const app = express();

app.use(express.static("public"));

let port = process.env.PORT || 3000;
let server = app.listen(port, () => {
	console.log("Listening " + port);
});

let io = socket(server);

io.on("connection", (socket) => {
	console.log("Connection made");

	// Data Received
	socket.on("beginPath", (data) => {
		// Transfering to all Devices connected to Server
		io.sockets.emit("beginPath", data);
	});

	socket.on("drawStroke", (data) => {
		io.sockets.emit("drawStroke", data);
	});

	socket.on("redoUndo", (data) => {
		io.sockets.emit("redoUndo", data);
	});
});
