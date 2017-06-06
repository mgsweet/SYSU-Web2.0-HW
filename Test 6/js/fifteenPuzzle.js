var start = 0;
//end:0  gaming:1  win:2  cheat:3

//AI Global variables

var game = {
	timer: null,
	imgType: 0,
	isCheating: false,
	size: 16,
	path: [],
	pathIndex: 0,
	desNode: new NPuzzleNode([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0], 4, 4),
	curNode: new NPuzzleNode([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0], 4, 4)
}

function matrixToCurNode(matrix) {
	var arr = [];
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			arr[4 * i + j] = matrix[i][j] + 1;
			if (arr[4 * i + j] == 16) {
				arr[4 * i + j] = 0;
			}
		}
	}
	game.curNode = new NPuzzleNode(arr, 4, 4);
}

function cheat(matrix) {
	if (start != 1) return; 
	// Searching
	start = 3;
	game.isCheating = true;
	matrixToCurNode(matrix);
	console.log("Searching...");
	var puzzle = new NPuzzle(game.curNode, game.desNode);
	puzzle.run();
	console.log("Searching finished.");
	console.log("Searched nodes: " + puzzle.searchedCnt);
	console.log("Path length: " + puzzle.pathDirec.length);
	// Recover the puzzle
	game.path = puzzle.pathDirec;
	game.pathIndex = 0;
	game.timer = setInterval(function() {
		if (game.pathIndex == game.path.length) {
			clearInterval(game.timer);
			game.isCheating = false;
			game.path = [];
			if (isWin()) {
				showWin();
			}
		} else {
			step.addOneStep();
			move(game.path[game.pathIndex++]);
		}
	}, 100);
}

function isWin() {
	return game.curNode.equals(game.desNode);
}

function move(direc) {
	game.curNode.move(direc);
	setPuzzleWithNode(game.curNode);
}

function setPuzzleWithNode(node) {
	var curId;
	var ele;
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			curId = node.val[4 * i + j] - 1;
			if (curId == -1) {
				curId = 15;
				ele = document.getElementById("blank");
				ele.className = "blank row" + i + " col" + j;
			} else {
				ele = document.getElementById("pic" + curId);
				ele.className = "pic row" + i + " col" + j;
			}
		}
	}
}

//AI part end


function addPic(matrix) {
	//0-14是pic, 15是空白
	var gameblock = document.createDocumentFragment();
	var pic;
	var i, j;
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			 if (!(i == 3 && j == 3)) {
			 	matrix[i][j] = 4 * i + j;
			 	pic = document.createElement('div');
			 	pic.id = "pic" + (4 * i + j);
			 	pic.className = "pic row" + i + " col" + j;
			 	pic.addEventListener('click', function() {
			 		picMove(matrix);
			 	});
			 	gameblock.appendChild(pic);
			 };
		};
	};
	pic = document.createElement('div');
	pic.id = "blank";
	pic.addEventListener('click', function() {
			 		picMove(matrix);
			 	});
	pic.className = "blank row" + 3 + " col" + 3;
	matrix[3][3] = 15;
	gameblock.appendChild(pic);
	document.getElementById("gameBody").appendChild(gameblock);
};

function startGame(matrix) {
	if (start == 2) {
		var win = document.getElementById("win");
		document.body.removeChild(win);
	};
	start = 1;
	refresh(matrix);
};

function refreshMatrix(matrix) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			matrix[i][j] = 4 * i + j;
		}
	}
};

function refresh(matrix) {
	time.reset();
	time.begin();
	step.reset();
	document.getElementById("step").value = 0;
	
	var random, temp;
	//blank's num: 15
	refreshMatrix(matrix);
	for (var i = 14; i >= 0; i--) {
		random = Math.floor(Math.random() * i);
		temp = matrix[Math.floor(i / 4)][i % 4];
		matrix[Math.floor(i/4)][i%4] = matrix[Math.floor(random/4)][random%4];
		matrix[Math.floor(random/4)][random%4] = temp;
	};
	//调换一次逆序奇变偶
	if (!isPlayable(matrix)) {
		temp = matrix[1][1];
		matrix[1][1] = matrix[2][2];
		matrix[2][2] = temp;
	}
	var pic = document.getElementsByClassName("pic");
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (!(i == 3 && j == 3)) {
				pic[4 * i + j].className = "pic row"+i+" col"+j;
				pic[4 * i + j].id = "pic"+matrix[i][j];
			}
		}
	}
	var blank = document.getElementById("blank");
	blank.className = "blank row3 col3";
	start = 1;
};

function isPlayable(matrix) {
	//	check  if puzzle is playable
	var count = 0;	//figure out the inverse sequence
	for (var i = 0; i < 15; i++) {
		for (var j = i + 1; j < 15; j++) {
			if (matrix[Math.floor(i / 4)][i%4] > matrix[Math.floor(j / 4)][j%4]) {
				count++;
			}
		}
	};
	return (count % 2 == 0);
};

function picMove(matrix) {
	if (event.target.id == "blank" || start != 1) return;
	var posX, posY;
	var i, j;
	var blankX, blankY;
	var isVaild = 0;
	for (i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			if ("pic"+ matrix[i][j] == event.target.id) {
				posX = i;
				posY = j;
			}
			if (matrix[i][j] == 15) {
				blankX = i;
				blankY = j;
			}
		}
	}
	if (blankX == posX) {
		if (Math.abs(blankY - posY) == 1) {
			isVaild = 1;
		};
	}
	else if (blankY == posY) {
		if (Math.abs(blankX - posX) == 1) {
			isVaild = 1;
		};
	};
	if (isVaild == 1) {
		matrix[blankX][blankY] = matrix[posX][posY];
		matrix[posX][posY] = 15;
		var blank = document.getElementById("blank");
		event.target.className = "pic row"+ blankX +" col"+ blankY ;
		blank.className = "blank row"+ posX +" col"+ posY;
		step.addOneStep();
	};
	check(matrix);
};

function check(matrix) {
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (matrix[i][j] != 4 * i + j) return;
		}
	}
	showWin();
};

function showWin() {
	var win = document.createElement("div");
	win.id = "win";
	win.textContent = "YOU WIN!";
	document.body.appendChild(win);
	start = 2;
	time.stop();
}

var time = function() {
	var timeCounter = 0;
	var clock;
	time = function() {
		return timeCounter;
	}
	time.begin = function() {
		clock = window.setInterval(function() {
			timeCounter++;
			document.getElementById("time").value = timeCounter + " s";
		}, 1000);
	};
	time.stop = function() {
		clearInterval(clock);
	}
	time.reset = function() {
		timeCounter = 0;
		document.getElementById("time").value = "";
		clearInterval(clock);
	};
	return time;
}();

var step = function() {
	var stepCounter = 0;
	step = function() {}
	step.addOneStep = function() {
		stepCounter++;
		document.getElementById("step").value = stepCounter;
	}
	step.reset = function() {
		stepCounter = 0;
	}
	return step;
}();

window.onload = function() {
	var matrix = [[0], [0], [0], [0]];
	var isHint = 0;
	addPic(matrix);
	document.getElementById("startButton").onclick = function() {
		startGame(matrix);
	}
	document.getElementById("cheat").onclick = function() {
		cheat(matrix);
	}
	document.getElementById("hintButton").onclick = function() {
		var hintPic;
		if (isHint == 0) {
			// <img src="imges/STARWAR.jpg" id="hintImg" alt="hint img" />
			hintPic = document.createElement('img');
			hintPic.id = "hintImg";
			hintPic.src = "imges/STARWAR.jpg";
			hintPic.alt = "hint img";
			document.body.appendChild(hintPic);
			isHint = 1;
		} else {
			isHint = 0;
			hintPic = document.getElementById("hintImg");
			document.body.removeChild(hintPic);
		}
	}
};

















