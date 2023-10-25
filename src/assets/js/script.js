const hamburguerMenu = document.getElementById("js-hamburguerMenu");
const inputCounter = document.getElementById("js-inputCounter");
const watchMinutero = document.getElementById("js-watchMinutero");
const watchSegundero = document.getElementById("js-watchSegundero");
const buttonPlus = document.getElementById("js-buttonPlus");
const buttonMinus = document.getElementById("js-buttonMinus");
const buttonPlay = document.getElementById("js-buttonPlay");
const buttonPause = document.getElementById("js-buttonPause");

let valueCounter = 0;
let time;
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

function valueCounterUpdate() {
	valueCounter = +inputCounter.value;
	if (valueCounter < 0 || valueCounter == "") {
		valueCounter = 0;
	} else if (valueCounter > 60) {
		valueCounter = 60;
	}
	if (valueCounter < 10) {
		inputCounter.value = "0" + valueCounter;
	} else {
		inputCounter.value = valueCounter;
	}
	let temp = "--i:" + valueCounter;
	watchMinutero.setAttribute("style", temp);
}

inputCounter.addEventListener("input", (event) => {
	valueCounterUpdate();
	console.log(valueCounter);
});

buttonPlus.addEventListener("click", (event) => {
	inputCounter.value = +inputCounter.value + 1;
	valueCounterUpdate();
});
buttonMinus.addEventListener("click", (event) => {
	inputCounter.value = +inputCounter.value - 1;
	valueCounterUpdate();
});

buttonPlay.addEventListener("click", (event) => {
	time = setInterval(function () {
		--segundero;
		if (valueCounter == 0) {
			clearTimeout(time);
			segundero = 60;
		}
		if (segundero == 0) {
			segundero = 60;
			inputCounter.value = +inputCounter.value - 1;
			valueCounterUpdate();
		}
		let temp = "--i:" + segundero;
		watchSegundero.setAttribute("style", temp);
	}, 1000);
});
buttonPause.addEventListener("click", (event) => {
	clearTimeout(time);
});
