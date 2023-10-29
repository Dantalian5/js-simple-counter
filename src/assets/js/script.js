// Variables for DOM manipulation;
const hamburguerMenu = document.getElementById("js-hamburguerMenu");
const inputCounter = document.getElementById("js-inputCounter");
const watchMinutero = document.getElementById("js-watchMinutero");
const watchSegundero = document.getElementById("js-watchSegundero");
const buttonPlus = document.getElementById("js-buttonPlus");
const buttonMinus = document.getElementById("js-buttonMinus");
const buttonPlay = document.getElementById("js-buttonPlay");
const buttonPause = document.getElementById("js-buttonPause");
const buttonReset = document.getElementById("js-buttonReset");
// Variables for Script manipulation;
let valueCounter = 0; // value of the counter input
let valueCounterOldValue = 0; // value of the counter input after a cycle
let playTime; // variable for setInterval function
let segundero = 60; // variable for 60 second manipulation
let timerActive = false; // where the timer is active or no

// hamburguer menu function;
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

// function for updating input value on DOM & internal value using -1, 0, +1 as step values;
function valueCounterUpdate(val = 0, oldValue = false) {
	let cont;
	if (oldValue) {
		cont = valueCounterOldValue;
	} else {
		cont = +inputCounter.value + val;
	}
	inputCounter.value = valueValidator(cont);
	valueCounter = +inputCounter.value;
	setMarkers(watchMinutero, valueCounter);
}
function valueValidator(value) {
	switch (true) {
		case value < 0 || value == "":
			value = 0;
		case value < 10:
			value = "0" + value;
			break;
		case value > 60:
			value = 60;
			break;
	}
	return value;
}
//function for seting markers on position
function setMarkers(object, value) {
	object.setAttribute("style", "--i:" + value);
}

// timer function;
function timer() {
	--segundero;
	switch (true) {
		case valueCounter == 0:
			timerAlert();
			timerReset();
			break;
		case segundero == 0:
			segundero = 60;
			valueCounterUpdate(-1);
	}

	setMarkers(watchSegundero, segundero);
}
// timer manipulation;
function timerPause() {
	clearInterval(playTime);
	timerActive = false;
}
function timerReset() {
	timerPause();
	segundero = 60;
	valueCounterUpdate(0, true);
}
function timerAlert() {
	document.getElementById("tone").play();
	alert("Time Over!");
}

// DOM manipulation: eventListeners if controls buttons;
inputCounter.addEventListener("input", (event) => {
	valueCounterUpdate(0);
	if (!timerActive) {
		valueCounterOldValue = valueCounter;
	}
});

buttonPlus.addEventListener("click", (event) => {
	valueCounterUpdate(+1);
	if (!timerActive) {
		valueCounterOldValue = valueCounter;
	}
});
buttonMinus.addEventListener("click", (event) => {
	valueCounterUpdate(-1);
	if (!timerActive) {
		valueCounterOldValue = valueCounter;
	}
});

buttonPlay.addEventListener("click", (event) => {
	if (!timerActive && valueCounter != 0) {
		playTime = setInterval(timer, 1000);
		timerActive = true;
	}
});
buttonPause.addEventListener("click", (event) => {
	if (timerActive) {
		timerPause();
	}
});
buttonReset.addEventListener("click", (event) => {
	timerReset();
	setMarkers(watchSegundero, segundero);
});
