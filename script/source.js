const mario = document.querySelector(".mario");
const pipe = document.querySelector(".pipe");
const btnUp = document.querySelector(".btnUp");

let jumping = false;
let btnPressed = false;

const jump = (e) => {
	let pressedW = e.key === "ArrowUp" || e.key === "w" || e.key === "W";

	if ((pressedW && !jumping) || (btnPressed && !jumping)) {
		mario.classList.add("jump");
		jumping = true;

		setTimeout((_) => {
			mario.classList.remove("jump");
			jumping = false;
			btnPressed = false;
		}, 600);
	}
};

var contador = 0;
var lastPipePosition = 0; // Vai armazenar a posição anterior do cano

const loop = setInterval((_) => {

	let pipePosition = pipe.offsetLeft; // Vai armazenar a posição atual do cano
	let puloPosition = +window.getComputedStyle(mario).bottom.replace("px", "");

	if (pipePosition <= 80 && pipePosition > 0 && puloPosition < 60) {
		pipe.style.animation = "none";
		pipe.style.left = `${pipePosition}px`;

		mario.style.animation = "none";
		mario.style.bottom = `${puloPosition}px`;

		mario.src = "./img/game-over.png";
		mario.style.width = "50px";
		mario.style.marginLeft = "35px";

		document.querySelector(".game-over").style.display = "block";

		clearInterval(loop);
	} else if (
		pipePosition <= 80 && // Cano passou pela posição do Mario
		lastPipePosition > 80 // E se o cano não estava na posição do Mario anteriormente
	) {
		contador++;
		console.log("Pontos: " + contador);
	}

	lastPipePosition = pipePosition; //A posição atual vai ser a ultima na proxima execução.


}, 10);

document.addEventListener("keydown", jump);
btnUp.addEventListener("click", (event) => {
	btnPressed = true;
	jump(event);
});
