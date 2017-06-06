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
				AIclick($("#A"), midButtonClick);
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

	function AIclick(jqButton, callback) {
		midButtonClick(jqButton[0], midButtonClick);
	}

	function reset() {
		game.AIrunning = false;
		game.status = false;
		$(".grayButton").removeClass('grayButton');
		for (var key in num) {
			num[key] = "";
		}
		$(".ranNum").remove();
		$("#result").text("");
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
		$(midButton).append(ranNum);
	}

	function setSiblings(midButton) {
		$(midButton).siblings().addClass('grayButton');
	}

	function resetSiblings(midButton) {
		$(midButton).siblings().removeClass('grayButton');
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
				$("#" + midButton.id + " span").text(temp);
				resetSiblings(midButton);
				if (!!callback) {
					if ($(midButton).next().length !== 0) {
						callback($(midButton).next()[0], callback);
					} else {
						sumNum();
						game.AIrunning = false;
					}
				}
			} else {
				$("#" + midButton.id + " span").text("...");
			}
		}
		xmlhttp.open("GET", "/", true);
		xmlhttp.send();
	}
})()