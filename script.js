let optionCont = document.querySelector(".option-cont");
let toolCont = document.querySelector(".tool-cont");

let optionContFlag = true;

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
}
{
	/* <i class="fa-solid fa-xmark"></i> */
}
