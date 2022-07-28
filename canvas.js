let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor = document.querySelectorAll(".color");
let pencilWidthElem = document.querySelector(".pencil-width input");
let eraserWidthElem = document.querySelector(".eraser-width input");
let redo = document.querySelector(".redo i");
let undo = document.querySelector(".undo i");

let penColor = "red";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;

let undoRedoTracker = []; // Data
let track = -1; // Data index

let mouseDown = false;

// API
let tool = canvas.getContext("2d");
// tool.globalCompositeOperation = "destination-over";
tool.fillStyle = "white";
tool.fillRect(0, 0, canvas.width, canvas.height);
tool.strokeStyle = penColor;
tool.lineWidth = penWidth;
undoRedoTracker[++track] = canvas.toDataURL();

// mousedown = start new path , mousemove = fill path
canvas.addEventListener("mousedown", (e) => {
	mouseDown = true;
	beginPath({
		x: e.clientX,
		y: e.clientY,
	});
});

canvas.addEventListener("mousemove", (e) => {
	if (mouseDown)
		drawStroke({
			x: e.clientX,
			y: e.clientY,
			color: eraserContFlag ? eraserContFlag : penColor,
			width: eraserContFlag ? eraserWidth : penWidth,
		});
});

canvas.addEventListener("mouseup", (e) => {
	mouseDown = false;

	// Set UndoRedo
	let url = canvas.toDataURL();
	undoRedoTracker[++track] = url;
	// track = undoRedoTracker.length - 1;
	// track++;
});

undo.addEventListener("click", (e) => {
	if (track > 0) {
		track--;
		let trackObj = {
			trackVal: track,
			undoRedoTracker,
		};
		undoRedoCanvas(trackObj);
	}
});

redo.addEventListener("click", (e) => {
	if (track < undoRedoTracker.length - 1) {
		track++;
		let trackObj = {
			trackVal: track,
			undoRedoTracker,
		};
		undoRedoCanvas(trackObj);
	}
});

function undoRedoCanvas(trackObj) {
	track = trackObj.trackVal;
	undoRedoTracker = trackObj.undoRedoTracker;

	let img = new Image();
	img.src = undoRedoTracker[track];
	img.onload = (e) => {
		tool.drawImage(img, 0, 0, canvas.width, canvas.height);
	};
}

function beginPath(strokeObj) {
	tool.beginPath();
	tool.moveTo(strokeObj.x, strokeObj.y);
}

function drawStroke(strokeObj) {
	tool.strokeStyle = strokeObj.color;
	tool.lineWidth = strokeObj.width;
	tool.lineTo(strokeObj.x, strokeObj.y);
	tool.stroke();
}

pencilColor.forEach((colorElem) => {
	colorElem.addEventListener("click", (e) => {
		let color = colorElem.classList[1];
		penColor = color;
		tool.strokeStyle = penColor;
	});
});

pencilWidthElem.addEventListener("change", (e) => {
	penWidth = pencilWidthElem.value;
	tool.lineWidth = penWidth;
});

eraserWidthElem.addEventListener("change", (e) => {
	eraserWidth = eraserWidthElem.value;
	tool.lineWidth = eraserWidth;
});

eraser.addEventListener("click", (e) => {
	if (eraserContFlag) {
		tool.strokeStyle = eraserColor;
		tool.lineWidth = eraserWidth;
	} else {
		// tool.strokeStyle = penColor;
		// tool.lineWidth = penWidth;
	}
});

download.addEventListener("click", (e) => {
	let url = canvas.toDataURL("image/png");
	let a = document.createElement("a");
	a.href = url;
	a.target = "_blank";
	a.download = "img.jpg";
	a.click();
	a.remove();
});