(function() {
	$(function() {
		creatTiles();
		listenTilesClick();
		listenButtonClick();
	})

	var game = {
		isHint: 0,
		matrix: [[],[],[],[]],
		start: 0,
		path: [],
		pathIndex: 0,
		desNode: new NPuzzleNode([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0], 4, 4),
		curNode: new NPuzzleNode([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0], 4, 4)
	}

	var creatTiles = function() {
		var gameblock = document.createDocumentFragment();
		for (var i = 0; i < 15; i++) {
			gameblock.appendChild(creatPic(i));
		}
		gameblock.appendChild(creatBlank());
		$("#gameBody").append(gameblock);
	}

	var listenTilesClick = function() {
		$(".pic").click(function() {
			var PosOfPicAndBlankArr = getPosAndBlank(event);
			if (canMove(event, PosOfPicAndBlankArr)) {
				movePic(PosOfPicAndBlankArr);
				check();
			}
		})
	}

	var listenButtonClick = function() {
		$("#startButton").click(startGame);
		$("#cheat").click(cheat);
		$("#hintButton").click(hint);
	}

	var hint = function() {
		if (game.isHint == 0) {
			creatHintPic();
			game.isHint = 1;
		} else {
			deleteHintPic();
			game.isHint = 0;
		}
	}

	var creatHintPic = function() {
		var hintPic = document.createElement('img');
		hintPic.id = "hintImg";
		hintPic.src = "imges/STARWAR.jpg";
		hintPic.alt = "hint img";
		document.body.appendChild(hintPic);
	}

	var deleteHintPic = function() {
		var hintPic = document.getElementById("hintImg");
		document.body.removeChild(hintPic);
	}

	var creatPic = function(i) {
		var pic;
		pic = document.createElement('div');
		pic.id = "pic" + i;
		pic.className = "pic row" + Math.floor(i / 4) + " col" + i % 4;
		game.matrix[Math.floor(i / 4)][i % 4] = i;
		return pic;
	}

	var creatBlank = function() {
		var blank;
		blank = document.createElement('div');
		blank.id = "blank";
		blank.className = "blank row" + 3 + " col" + 3;
		game.matrix[3][3] = 15;
		return blank
	}

	var getPosAndBlank = function(event) {
		var posX, posY, blankX, blankY;
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if ("pic" + game.matrix[i][j] == event.target.id) {
					posX = i;
					posY = j;
				}
				if (game.matrix[i][j] == 15) {
					blankX = i;
					blankY = j;
				}
			}
		}
		return [posX, posY, blankX, blankY]
	}

	var canMove = function(event, PosAndBlankArr) {
		if (game.start != 1) return false;
		var isVaild = 0;
		if (PosAndBlankArr[2] == PosAndBlankArr[0] && Math.abs(PosAndBlankArr[3] - PosAndBlankArr[1]) == 1) return true;
		if (PosAndBlankArr[3] == PosAndBlankArr[1] && Math.abs(PosAndBlankArr[2] - PosAndBlankArr[0]) == 1) return true;
	}

	var movePic = function(PosOfPicAndBlankArr) {
		game.matrix[PosOfPicAndBlankArr[2]][PosOfPicAndBlankArr[3]] = game.matrix[PosOfPicAndBlankArr[0]][PosOfPicAndBlankArr[1]];
		game.matrix[PosOfPicAndBlankArr[0]][PosOfPicAndBlankArr[1]] = 15;
		var blank = $("#blank");
		event.target.className = "pic row" + PosOfPicAndBlankArr[2] + " col" + PosOfPicAndBlankArr[3];
		blank.className = "blank row" + PosOfPicAndBlankArr[0] + " col" + PosOfPicAndBlankArr[1];
		step.addOneStep();
	}

	var check = function() {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (game.matrix[i][j] != 4 * i + j) return;
			}
		}
		showWin();
	};

	var showWin = function() {
		var win = document.createElement("div");
		win.id = "win";
		win.textContent = "YOU WIN!";
		document.body.appendChild(win);
		game.start = 2;
		time.stop();
	}

	var startGame = function() {
		if (game.start == 2) {
			$("#win").remove();
		};
		game.start = 1;
		refresh();
	};

	function refreshMatrix() {
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				game.matrix[i][j] = 4 * i + j;
			}
		}
	};

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

	var shuffle = function() {
		for (var i = 14; i >= 0; i--) {
			random = Math.floor(Math.random() * i);
			temp = game.matrix[Math.floor(i / 4)][i % 4];
			game.matrix[Math.floor(i / 4)][i % 4] = game.matrix[Math.floor(random / 4)][random % 4];
			game.matrix[Math.floor(random / 4)][random % 4] = temp;
		};
		if (!isPlayable()) {
			temp = matrix[1][1];
			game.matrix[1][1] = game.matrix[2][2];
			game.matrix[2][2] = temp;
		}
	}

	var refresh = function() {
		time.reset();
		time.begin();
		step.reset();
		$("#step").val(0);
		var random, temp;
		refreshMatrix();
		shuffle();
		setPuzzleByMatrix();
		game.start = 1;
	};

	var setPuzzleByMatrix = function() {
		var pic = $("#gameBody div");
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (game.matrix[i][j] != 15) {
					pic[4 * i + j].className = "pic row" + i + " col" + j;
					pic[4 * i + j].id = "pic" + game.matrix[i][j];
				} else {
					pic[4 * i + j].className = "blank row" + i + " col3" + j;
					pic[4 * i + j].id = "blank";
				}
			}
		}
	}

	function isPlayable() {
		var count = 0;
		for (var i = 0; i < 15; i++) {
			for (var j = i + 1; j < 15; j++) {
				if (game.matrix[Math.floor(i / 4)][i % 4] > game.matrix[Math.floor(j / 4)][j % 4]) count++;
			}
		};
		return (count % 2 == 0);
	};

	//	AI
	function matrixToCurNode() {
		var arr = [];
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				arr[4 * i + j] = game.matrix[i][j] + 1;
				if (arr[4 * i + j] == 16) {
					arr[4 * i + j] = 0;
				}
			}
		}
		game.curNode = new NPuzzleNode(arr, 4, 4);
	}

	function cheat() {
		if (game.start != 1) return;
		// Searching
		game.start = 3;
		game.isCheating = true;
		matrixToCurNode();
		var puzzle = new NPuzzle(game.curNode, game.desNode);
		puzzle.run();
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
})()