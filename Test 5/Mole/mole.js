var start = 0;
var time = 30;
var score = 0;
var clock;
var delay;
var mouseClock;
var wrongDelay;

function controlGame() {
	if (start == 0) {
		start = 1;
		refresh();
		document.getElementById("showTime").value = time;
		document.getElementById("showScore").value = score;
		mouseClock = window.setInterval(refresh, 2500);
		clock = window.setInterval(useTime, 1000);
		document.getElementById("remain").value = "Playing";
	} else {
		start = 0;
		reset();
	}
}

function hitCheck(event) {
	if (start == 1) {
		if (event.target.className == "mouse") {
			event.target.id = "mouseDied";
			delay = window.setTimeout(becomeHole, 150);
			score++;
		} else {
			event.target.id = "wrongHole";
			delay = window.setTimeout(cleanWrong, 100);
			score--;
		};
		document.getElementById("showScore").value = score;
	};
}

function cleanWrong() {
	var wrongHole = document.getElementById("wrongHole");
	wrongHole.id = "";
}

function refresh() {
	var Allmouse = document.getElementsByClassName("mouse");

	for (var i = Allmouse.length - 1; i >= 0; i--) {
		Allmouse[i].className = "hole";
	};

	var Allhole = document.getElementsByClassName("hole");

	var ran = Math.round(Math.random()*4 + 2);
	for (var i = 0; i < ran; i++) {
			var mousePos = Math.round(Math.random() * (60 - i));
			if (mousePos == (60 - i)) {
				mousePos = 0;
			};
			Allhole[mousePos].className = "mouse";
		}
}

function becomeHole() {
	var diedMouse = document.getElementById("mouseDied");
	diedMouse.id = "";
	diedMouse.className = "hole";
}

function insertHole() {
	var hole;
	var playBar = document.getElementById("playBar");
	for (var i = 0; i < 60; i++) {
		hole = document.createElement("div");
			hole.className = "hole";
			hole.addEventListener('click', hitCheck);
			playBar.appendChild(hole);
	};
}

function useTime() {
	time--;
	document.getElementById("showTime").value = time;
	if (time == 0) {
		document.getElementById("remain").value = "Game over!";
		var name = prompt("Game Over.\nyour score is: " + score + "\nplease input your name: ", "Input here~");
		var user = document.createElement("div");
		user.className = "rankIFO"
		user.innerHTML = name + ": " + score;
		document.getElementById("rankBody").appendChild(user);
		//rank not finish yet
		reset();
	};
}

function reset() {
	time = 30;
	score = 0;
	start = 0;
	var mouse = document.getElementsByClassName("mouse");
	for (var i = document.getElementsByClassName("mouse").length - 1; i >= 0; i--) {
		mouse[i].className = "hole";
	};
	clearInterval(clock);
	clearInterval(mouseClock);
	clearTimeout(delay);
}

window.onload = function() {
	insertHole();
	document.getElementById("controlGame").onclick = controlGame;
	//改变光标
	document.getElementById("playBar").onmouseover = function() {
		this.className = "focus";
	}
}








