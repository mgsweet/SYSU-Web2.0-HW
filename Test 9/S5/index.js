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

	var num2char = ['A', 'B', 'C', 'D', 'E'];

	function randomOrder() {
		var order = [0, 1, 2, 3, 4];
		order.sort(function() {return 0.5 - Math.random()})
		return order;
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
				AIclick(midButtonClick);
			}
		});
	})

	function midButtonClick(button, n, order, callback) {
		if (!($(button).hasClass('grayButton'))) {
			if ($('#' + button.id + " span").length === 0) createSpan(button);
			setSiblings(button);
			getRanNum(button, n, order, callback);
		}
	}

	function AIclick(callback) {
		var order = randomOrder();
		showOrder(order);
		midButtonClick($('#' + num2char[order[0]])[0], 0, order, callback);
	}

	function showOrder(order) {
		var display = "";
		for (var i in order) {
			display = display + num2char[order[i]] + ' ';
		}
		$("#order").text(display);
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
		$("#order").text("");
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

	function getRanNum(midButton, n, order, callback) {
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
					if (n !== 4) {
						callback($('#' + num2char[order[n + 1]])[0], n + 1, order, callback);
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