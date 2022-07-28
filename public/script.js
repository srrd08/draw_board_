let optionCont = document.querySelector(".option-cont");
let toolCont = document.querySelector(".tool-cont");
let pencilCont = document.querySelector(".pencil-option-cont");
let eraserCont = document.querySelector(".eraser-option-cont");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser i");
let upload = document.querySelector(".upload");
let download = document.querySelector(".download i");
let noteTool = document.querySelector(".note");

let optionContFlag = true;
let pencilContFlag = false;
let eraserContFlag = false;

optionCont.addEventListener("click", (e) => {
	optionContFlag = !optionContFlag;
	if (optionContFlag) {
		showTools();
	} else {
		hideTools();
	}
});

function showTools() {
	let optionIcon = optionCont.children[0];
	optionIcon.classList.remove("fa-bars");
	optionIcon.classList.add("fa-xmark");
	toolCont.style.display = "flex";
}

function hideTools() {
	let optionIcon = optionCont.children[0];
	optionIcon.classList.add("fa-bars");
	optionIcon.classList.remove("fa-xmark");
	toolCont.style.display = "none";
	pencilContFlag = false;
	eraserContFlag = false;
	hideEraserOptionCont();
	hidePencilOptionCont();
}

pencil.addEventListener("click", (e) => {
	pencilContFlag = !pencilContFlag;
	if (pencilContFlag) {
		showPencilOptionCont();
	} else {
		hidePencilOptionCont();
	}
});

eraser.addEventListener("click", (e) => {
	eraserContFlag = !eraserContFlag;
	if (eraserContFlag) {
		showEraserOptionCont();
	} else {
		hideEraserOptionCont();
	}
});

function showPencilOptionCont() {
	pencilCont.style.display = "flex";
}

function hidePencilOptionCont() {
	pencilCont.style.display = "none";
}

function showEraserOptionCont() {
	eraserCont.style.display = "flex";
}

function hideEraserOptionCont() {
	eraserCont.style.display = "none";
}

noteTool.addEventListener("click", (e) => {
	let noteCont = document.createElement("div");
	noteCont.setAttribute("class", "note-cont");
	noteCont.innerHTML = `
	<div class="note-header">
	<div class="button minimize"></div>
	<div class="button close"></div>
</div>
<div class="note-body">
	<textarea spellcheck="none" style="resize: none"></textarea>
</div>`;

	document.body.appendChild(noteCont);

	let noteMinimize = noteCont.querySelector(".minimize");
	let noteClose = noteCont.querySelector(".close");
	// console.log(noteClose);
	noteActions(noteMinimize, noteClose, noteCont);

	noteCont.onmousedown = function (event) {
		dragAndDrop(noteCont, event);
	};

	noteCont.ondragstart = function () {
		return false;
	};
});

// noteMinimize.addEventListener("click", (e) => {});
function dragAndDrop(element, event) {
	let shiftX = event.clientX - element.getBoundingClientRect().left;
	let shiftY = event.clientY - element.getBoundingClientRect().top;

	element.style.position = "absolute";
	element.style.zIndex = 1000;

	moveAt(event.pageX, event.pageY);

	// moves the ball at (pageX, pageY) coordinates
	// taking initial shifts into account
	function moveAt(pageX, pageY) {
		element.style.left = pageX - shiftX + "px";
		element.style.top = pageY - shiftY + "px";
	}

	function onMouseMove(event) {
		moveAt(event.pageX, event.pageY);
	}

	// move the ball on mousemove
	document.addEventListener("mousemove", onMouseMove);

	// drop the ball, remove unneeded handlers
	element.onmouseup = function () {
		document.removeEventListener("mousemove", onMouseMove);
		element.onmouseup = null;
	};
}

function noteActions(minimize, remove, stickyCont) {
	remove.addEventListener("click", (e) => {
		stickyCont.remove();
	});
	minimize.addEventListener("click", (e) => {
		let noteCont = stickyCont.querySelector(".note-body");
		let display = getComputedStyle(noteCont).getPropertyValue("display");
		if (display === "none") noteCont.style.display = "flex";
		else noteCont.style.display = "none";
	});
}

upload.addEventListener("click", (e) => {
	// Open file explorer
	let input = document.createElement("input");
	input.setAttribute("type", "file");
	input.click();

	input.addEventListener("change", (e) => {
		let file = input.files[0];
		let url = URL.createObjectURL(file);

		let stickyCont = document.createElement("div");
		stickyCont.setAttribute("class", "note-cont");
		stickyCont.innerHTML = `
		<div class="note-header">
			<div class="button minimize"></div>
			<div class="button close"></div>
		</div>
		<div class="note-body">
			<img src="${url}"/>
		</div>`;

		document.body.appendChild(stickyCont);

		let minimize = stickyCont.querySelector(".minimize");
		let remove = stickyCont.querySelector(".close");
		noteActions(minimize, remove, stickyCont);

		stickyCont.onmousedown = function (e) {
			dragAndDrop(stickyCont, e);
		};

		stickyCont.ondragstart = function () {
			return false;
		};
	});
});


