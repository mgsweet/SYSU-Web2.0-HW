(function() {
	var num = {
		"A": "",
		"B": "",
		"C": "",
		"D": "",
		"E": ""
	}

	var game = {
		"status": false
	}

	$(function() {
		$(".mid.button").click(function() {
			game.status = true;
			if (!($(this).hasClass('grayButton'))) {
				if ($('#' + this.id + " span").length === 0) createSpan(this);
				setSiblings(this);
				getRanNum(this);
			}
		});
		$("#info-bar").click(function(event) {
			if (canSum() || 0) sumNum();
		});
		$("#button").mouseleave(function(event) {
			reset();
		});
	})

	function reset() {
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

	function getRanNum(midButton) {
		var xmlhttp;
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		} else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function() {
			console.log(num);
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200 && game.status === true) {
				var temp = xmlhttp.responseText;
				num[midButton.id] = parseInt(temp);
				console.log(num);
				$("#" + midButton.id + " span").text(temp);
				resetSiblings(midButton);
			} else {
				$("#" + midButton.id + " span").text("...");
			}
		}
		xmlhttp.open("GET", "/", true);
		xmlhttp.send();
	}
})()