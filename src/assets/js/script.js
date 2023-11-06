"use strict";
// Variables for DOM manipulation;
const hamburguerMenu = document.getElementById("js-hamburguerMenu");
const buttonTheme = document.querySelectorAll(".js-themeButton");
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
const soundCheck = document.getElementById("js-soundCheck");
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

//-DOM manipulation: eventListeners if controls buttons;-
buttonPlus.addEventListener("click", (event) => {
	valueCounterUpdate(+1);
	valueCounterOldValue = !timerActive ? valueCounter : valueCounterOldValue;
});
buttonMinus.addEventListener("click", (event) => {
	valueCounterUpdate(-1);
	valueCounterOldValue = !timerActive ? valueCounter : valueCounterOldValue;
});
inputCounter.addEventListener("input", (event) => {
	valueCounterUpdate(0);
	valueCounterOldValue = !timerActive ? valueCounter : valueCounterOldValue;
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
//-Hamburger Menu EventListeners-
hamburguerMenu.addEventListener("click", (event) => {
	//open and close the menu
	hamburguerMenu.classList.toggle("active");
});
document.addEventListener("click", (event) => {
	// if clicked outside the menu, close the menu
	if (
		event.target.closest("#js-hamburguerMenu") === null &&
		event.target.closest("#js-menuItems") === null
	) {
		hamburguerMenu.classList.remove("active");
	}
});
//-Theme manipulation EventListeners & Functions-
buttonTheme.forEach((item) => {
	item.addEventListener("click", (event) => {
		setTheme(item.getAttribute("data-theme"));
	});
});
function setTheme(theme) {
	document.body.className = theme;
	localStorage.setItem("theme", theme);
}
// the next function start on load to use the preview selected theme
(function () {
	let theme = localStorage.getItem("theme");
	if (theme != "theme-ocean" && theme != "theme-sunset") {
		theme = "theme-desert";
	}
	setTheme(theme);
})();
//-Functions-
//--Watch Manipulation Functions--
function valueCounterUpdate(val = 0, oldValue = false) {
	// function for updating input value on DOM & internal value using -1, 0, +1 as step values;
	// if oldValue=true, then take that value;
	let cont = oldValue ? valueCounterOldValue : +inputCounter.value + val;
	inputCounter.value = valueValidator(cont, 60);
	valueCounter = +inputCounter.value;
	WatchUpdate(valueCounter, "-");
}
function WatchUpdate(minutes, seconds) {
	// function to update the states of the minutes and seconds dial;
	if (minutes != "-") {
		watchMinutero.setAttribute("style", "--i:" + minutes);
	}
	if (seconds != "-") {
		watchSegundero.setAttribute("style", "--i:" + seconds);
	}
}
//--Time Manipulation Functions--
function timerPlay() {
	// This function is responsible for running the timer
	timerActive = true;
	clearInterval(pauseTime);
	playTime = setInterval(function () {
		// Decrease the countdown timer by 1 second
		--segundero;
		switch (true) {
			case valueCounter == 0:
				if (cycleCheck.checked) {
					// Update the value counter and data
					valueCounterUpdate(0, true);
					DataUpdate(1, 1, 0);
				} else {
					timerReset();
					timerAlarm();
				}
				break;
			case segundero == 0:
				// Reset the countdown timer to 60 seconds and update the value counter
				segundero = 60;
				valueCounterUpdate(-1);
		}
		// Update the displayed time
		WatchUpdate("-", segundero);
	}, 1000);
}
function timerPause() {
	// this is the pause function, that pause the timer, and, counts the paused time
	timerActive = false;
	clearInterval(playTime);
	if (pauseCheck.checked) {
		pauseTime = setInterval(function () {
			DataUpdate(0, 0, 1);
		}, 60000);
	}
}
function timerReset() {
	// this de reset function that reset all status to their default, except de old value
	timerActive = false;
	clearInterval(playTime);
	clearInterval(pauseTime);
	segundero = 60;
	valueCounterUpdate(0, true);
	WatchUpdate("-", 60);
}
//--Data manipulation functions--
function DataUpdate(cycle, work, pause) {
	// this function update all possibles data input from the watch
	timerCycles = +timerCycles + cycle;
	timerWorkTime = +timerWorkTime + work;
	timerPauseTime = +timerPauseTime + pause;
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
//--Functionalities Functions--
function valueValidator(value, max = 99) {
	// Check if the value is an empty string or not a number
	if (value < 0 || value == "") {
		value = "00"; // Set the value to 0 if it's an empty string or not a number
	} else if (value < 10) {
		value = "0" + value; // Add a leading zero if it's less than 10
	} else if (value > max) {
		value = max; // Limit the value to 'max' if it's greater than this limit
	}
	return value;
}
function timerAlarm() {
	// Deploy an alert when timer is zero, and use a sound if requested
	if (soundCheck.checked) {
		var audioElement = document.getElementById("tone");
		audioElement.play();
		audioElement.onended = function () {
			alert("Time Over!");
		};
	} else {
		alert("Time Over!");
	}
}
