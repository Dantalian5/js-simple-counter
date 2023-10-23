const hamburguerMenu = document.getElementById("js-hamburguerMenu");

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

const watchOuterCircle = document.getElementById("js-watchNumbers");
