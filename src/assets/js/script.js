const hamburguerMenu = document.getElementById("js-hamburguerMenu");
const inputCounter = document.getElementById("js-inputCounter");
const watchMinutero = document.getElementById("js-watchMinutero");
const watchSegundero = document.getElementById("js-watchSegundero");
const buttonPlus = document.getElementById("js-buttonPlus");
const buttonMinus = document.getElementById("js-buttonMinus");
const buttonPlay = document.getElementById("js-buttonPlay");
const buttonPause = document.getElementById("js-buttonPause");
const buttonReset = document.getElementById("js-buttonReset");

let valueCounter = 0;
let valueCounterOldValue = 0;
let playTime;
let segundero = 60;

hamburguerMenu.addEventListener("click", (event) => {
	hamburguerMenu.classList.toggle("active");
});
document.addEventListener("click", (event) => {
	if (
		event.target.closest("#js-hamburguerMenu") === null &&
		event.target.closest("#js-menuItems")
	) {
		hamburguerMenu.classList.remove("active");
	}
});

function valueCounterUpdate(val) {
	let cont = +inputCounter.value + val;
	if (cont < 0 || cont == "") {
		cont = 0;
	} else if (cont > 60) {
		cont = 60;
	}
	if (cont < 10) {
		inputCounter.value = "0" + cont;
	} else {
		inputCounter.value = cont;
	}
	valueCounter = cont;
	setMarkers(watchMinutero, cont);
}
function setMarkers(object, value) {
	object.setAttribute("style", "--i:" + value);
}

function timer() {
	--segundero;
	if (valueCounter == 0) {
		clearTimeout(playTime);
		segundero = 60;
	}
	if (segundero <= 0) {
		segundero = 60;
		valueCounterUpdate(-1);
	}
	setMarkers(watchSegundero, segundero);
}

inputCounter.addEventListener("input", (event) => {
	valueCounterUpdate(0);
});

buttonPlus.addEventListener("click", (event) => {
	valueCounterUpdate(+1);
});
buttonMinus.addEventListener("click", (event) => {
	valueCounterUpdate(-1);
});

buttonPlay.addEventListener("click", (event) => {
	playTime = setInterval(timer, 1000);
});
buttonPause.addEventListener("click", (event) => {
	clearTimeout(playTime);
});
buttonReset.addEventListener("click", (event) => {
	clearTimeout(playTime);
	segundero = 60;
	setMarkers(watchSegundero, segundero);
	inputCounter.value = 0;
	valueCounterUpdate(0);
});
