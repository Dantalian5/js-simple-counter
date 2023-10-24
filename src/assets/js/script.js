const hamburguerMenu = document.getElementById("js-hamburguerMenu");
const inputCounter = document.getElementById("js-inputCounter");

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
inputCounter.addEventListener("change", (event) => {
	let value = inputCounter.value;
	if (value < 0 || value == "") {
		inputCounter.value = "00";
	} else if (value > 60) {
		inputCounter.value = 60;
	} else if (value < 10) {
		inputCounter.value = "0" + (+inputCounter.value).toString();
	}
});
