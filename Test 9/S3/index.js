(function() {
	var num = {
		"A": "",
		"B": "",
		"C": "",
		"D": "",
		"E": ""
	}

	var game = {
		"status": false,
		"AIrunning": false
	}

	$(function() {
		$(".mid.button").click(function() {
			game.status = true;
			midButtonClick(this);
		});
		$("#info-bar").click(function(event) {
			if (canSum() || 0) sumNum();
		});
		$("#button").mouseleave(function(event) {
			reset();
		});
		$(".apb").click(function() {
			if (game.AIrunning === false) {
				reset();
				game.AIrunning = true;
				game.status = true;
				AIclick();
			}
		});
	})

	function midButtonClick(button, callback) {
		if (!($(button).hasClass('grayButton'))) {
			if ($('#' + button.id + " span").length === 0) createSpan(button);
			setSiblings(button);
			getRanNum(button, callback);
		}
	}

	function AIclick() {
		var midButtons = $(".mid.button");
		var button;
		for (var i = 0; i < 5; i++) {
			button = midButtons[i]
			if ($('#' + button.id + " span").length === 0) {
				console.log(button);
				createSpan(button);
			}
			$(".mid.button").addClass('grayButton');
			getRanNum(button, 1);
		}
	}

	function reset() {
		$(".grayButton").removeClass('grayButton');
		for (var key in num) {
			num[key] = "";
			$("#" + key).text(key);
		}
		$(".ranNum").remove();
		$("#result").text("");
		game.status = false;
		game.AIrunning = false;
	}

	function canSum() {
		for (var key in num) {
			if (num[key] == "") return false;
		};
		return true;
	}

	function sumNum() {
		var sum = 0;
		for (var key in num) {
			sum += num[key];
		};
		$("#result").text(sum);
	}

	function createSpan(midButton) {
		var ranNum = document.createElement('span');
		ranNum.className = "ranNum";
		ranNum.innerHTML = "..."
		$(midButton).append(ranNum);
	}

	function setSiblings(midButton) {
		$(midButton).siblings().addClass('grayButton');
	}

	function resetSiblings(midButton) {
		$(midButton).siblings().removeClass('grayButton');
	}

	function setAllMidButtons() {
		for (var key in num) {
			$("#" + key + " span").text(num[key]);
		};
	}

	function getRanNum(midButton, callback) {
		var xmlhttp;
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && game.status === true) {
				var temp = xmlhttp.responseText;
				num[midButton.id] = parseInt(temp);
				console.log(num);
				if (!!callback) {
					$("#" + midButton.id + " span").text(temp)
					if (canSum()) {
						setAllMidButtons();
						sumNum();
						game.AIrunning = false;
					}
				} else {
					$("#" + midButton.id + " span").text(temp);
					resetSiblings(midButton);
				}
			} else {
				console.log(midButton.id + " " + xmlhttp.readyState);
				$("#" + midButton.id + " span").text("...");
			}
		}
		xmlhttp.open("POST", "/", true);
		xmlhttp.send();
	}
})()