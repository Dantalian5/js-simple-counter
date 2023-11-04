"use strict";
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
const buttonResetData = document.getElementById("js-resetData");
const cycleCheck = document.getElementById("js-cycleCheck");
const pauseCheck = document.getElementById("js-pauseCheck");
const dataCycles = document.getElementById("js-cycleTime");
const dataWork = document.getElementById("js-workTime");
const dataPause = document.getElementById("js-pauseTime");
// Variables for Script manipulation;
let valueCounter = 0; // value of the counter input
let valueCounterOldValue = 0; // value of the counter input after a cycle
let playTime; // variable for setInterval function
let pauseTime;
let segundero = 60; // variable for 60 second manipulation
let timerActive = false; // where the timer is active or no
let timerCycles = 0;
let timerWorkTime = 0;
let timerPauseTime = 0;

// hamburguer menu function;
hamburguerMenu.addEventListener("click", (event) => {
	hamburguerMenu.classList.toggle("active");
});
document.addEventListener("click", (event) => {
	if (
		event.target.closest("#js-hamburguerMenu") === null &&
		event.target.closest("#js-menuItems") === null
	) {
		hamburguerMenu.classList.remove("active");
	}
});

function timerPlay() {
	timerActive = true;
	clearInterval(pauseTime);
	playTime = setInterval(function () {
		--segundero;
		switch (true) {
			case valueCounter == 0:
				if (cycleCheck.checked) {
					valueCounterUpdate(0, true);
					DataUpdate(1, 1, 0);
				} else {
					timerReset();
					timerAlarm();
				}
				break;
			case segundero == 0:
				segundero = 60;
				valueCounterUpdate(-1);
		}
		//setMarkers(watchSegundero, segundero);
		WatchUpdate("-", segundero);
	}, 1000);
}
function timerPause() {
	timerActive = false;
	clearInterval(playTime);
	if (pauseCheck.checked) {
		pauseTime = setInterval(function () {
			DataUpdate(0, 0, 1);
		}, 60000);
	}
}
function timerReset() {
	timerActive = false;
	clearInterval(playTime);
	clearInterval(pauseTime);
	segundero = 60;
	valueCounterUpdate(0, true);
	WatchUpdate("-", 60);
}
function timerAlarm() {
	document.getElementById("tone").play();
	alert("Time Over!");
}

function WatchUpdate(minutes, seconds) {
	if (minutes != "-") {
		watchMinutero.setAttribute("style", "--i:" + minutes);
	}
	if (seconds != "-") {
		watchSegundero.setAttribute("style", "--i:" + seconds);
	}
}
function DataUpdate(cycle, work, pause, reset = false) {
	timerCycles = +timerCycles + cycle;
	timerWorkTime = +timerWorkTime + work;
	timerPauseTime = +timerPauseTime + pause;

	console.log(timerPauseTime);
	dataCycles.innerText = valueValidator(+timerCycles);
	dataWork.innerText =
		valueValidator(Math.floor(+timerWorkTime / 60)) +
		":" +
		valueValidator(+timerWorkTime % 60);
	dataPause.innerText =
		valueValidator(Math.floor(+timerPauseTime / 60)) +
		":" +
		valueValidator(+timerPauseTime % 60);
}

// function for updating input value on DOM & internal value using -1, 0, +1 as step values;
function valueCounterUpdate(val = 0, oldValue = false) {
	let cont;
	if (oldValue) {
		cont = valueCounterOldValue;
	} else {
		cont = +inputCounter.value + val;
	}
	inputCounter.value = valueValidator(cont, 60);
	valueCounter = +inputCounter.value;
	WatchUpdate(valueCounter, "-");
}
function valueValidator(value, max = 99) {
	switch (true) {
		case value < 0 || value == "":
			value = 0;
		case value < 10:
			value = "0" + value;
			break;
		case value > max:
			value = max;
			break;
	}
	return value;
}

// timer function;

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
		timerPlay();
	}
});
buttonPause.addEventListener("click", (event) => {
	if (timerActive) {
		timerPause();
	}
});
buttonReset.addEventListener("click", (event) => {
	timerReset();
});
buttonResetData.addEventListener("click", (event) => {
	timerCycles = 0;
	timerWorkTime = 0;
	timerPauseTime = 0;
	dataCycles.innerText = "--";
	dataWork.innerText = "--:--";
	dataPause.innerText = "--:--";
});

//todo: minimize script, collapse internal function and create more readable structure
//todo: add theme feacture
//todo: add help to the page
//todo: fix opengraph, (help on vercel)
