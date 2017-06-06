var start = 0;
var terminal = 0;

function Listen() {
	// wall listener
	var wall = document.getElementsByClassName("wall");
	var path = document.getElementsByClassName("path");
	for (var i = wall.length - 1; i >= 0; i--) {
		wall[i].addEventListener('mouseover', hitWall);
		wall[i].addEventListener('mouseout', reset);
	};
	for (var i = path.length - 1; i >= 0; i--) {
		path[i].addEventListener('mouseover', setMouse);
	};
	document.getElementById("terminal").addEventListener('mouseover', setMouse);
	document.getElementById("end").addEventListener('mouseover', setMouse);
	document.getElementById("terminal").addEventListener('mouseover', reachTerminal);
}

function setMouse(event) {
	if (start == 1) {
		event.target.style.cursor = "pointer";
	} else {
		event.target.style.cursor = "default";
	}
}

function reachTerminal() {
	if (start == 1) {
		terminal = 1;
	};
}


function reset(event) {
	event.target.style.backgroundColor = "#EEEEEE";
	terminal = 0;
	start = 0;
}

function hitWall(event) {
	if (start == 1) {
		event.target.style.backgroundColor = "red";
		document.getElementById("remain").textContent = "You lose";
	};
}

window.onload = function() {
	Listen();
	document.getElementById("start").onmouseover = function() {
		if (start == 0) {
			start = 1;
			document.getElementById("remain").textContent = "Gaming";

		};
	}
	document.getElementById("end").onmouseover = function() {
		if (start == 1) {
			if (terminal == 1 ) {
				document.getElementById("remain").textContent = "You Win";
			} else {
				document.getElementById("remain").textContent = "Don't cheat!, you should start from the 'S' and move to the 'E' inside the maze!";
			};
		};
		start = 0;
		terminal = 0;
	}
}










