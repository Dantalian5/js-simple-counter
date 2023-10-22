const hamburguerMenu = document.getElementById("js-hamburguerMenu");

hamburguerMenu.addEventListener("click", (event) => {
	hamburguerMenu.classList.toggle("active");
});

// ! make menu disapear wen user click outside
