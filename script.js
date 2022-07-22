let optionCont = document.querySelector(".option-cont");
let toolCont = document.querySelector(".tool-cont");
let pencilCont = document.querySelector(".pencil-option-cont");
let eraserCont = document.querySelector(".eraser-option-cont");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");

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
