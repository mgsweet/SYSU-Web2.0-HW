(function() {
	// Global variables
	var game = {
		display: "",
		formula: "",
		result: ""
	}

	function reset() {
		game.display = "";
		game.formula = "";
		game.result = "";
		$("#result").val(game.result);
		$("#display").val(game.display);
	}

	// include 0~9, right and left bracket
	function generalButtonClick(button) {
		if (game.result != "") reset();
		if ((button.id != "leftBracket" && button.id != "rightBracket") || canBracketAdd(button)) {
			game.display += button.value;
			game.formula += button.value;
			$("#display").val(game.display);
		}
	}

	function isNum(char) {
		var numArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
		for (x in numArr) {
			if (x == char) return true;
		}
		return false;
	}

	function isFunc(char) {
		var funcArr = ['+', '-', '*','/'];
		for (x in funcArr) {
			if (x == char) return true;
 		}
 		return false;
	}

	function canBracketAdd(button) {
		var lastChar = game.formula.charAt(game.formula.length - 1);
		if (button.id == "leftBracket" && (game.formula.length == 0 || isFunc(lastChar))) return true;
		if (isNum(lastChar)) return true;
		return false;
	}

	function deleteClick() {
		game.display = game.display.substring(0, game.display.length - 1);
		$("#display").val(game.display);
	}

	function spotClick() {
		if (game.result != "") reset();
		if (game.formula.charAt(game.formula.length - 1) != "\.") {
			if (game.display == "" || game.formula.charAt(formula.length - 1) == "+" || game.formula.charAt(formula.length - 1) == "-" || game.formula.charAt(formula.length - 1) == "*" || game.formula.charAt(formula.length - 1) == "/") {
				game.display += "0";
				game.formula += "0";
			}
			game.display += ".";
			game.formula += ".";
			$("#display").val(game.display);
		}
	}

	function FuncButtonClick(button) {
		if (button.id == "equal") equalClick();
		else {
			if (game.result != "") resultNeedUse();
			game.formula += button.value;
			if (button.id == "divide") game.display += "÷";
			else if (button.id == "mutiply") game.display += "×";
			else game.display += button.value;
			$("#display").val(game.display);
		}
	}

	function resultNeedUse() {
		game.display = game.result;
		game.formula = game.result;
		game.result = "";
		$("#result").val(game.result);
	}

	//for longer result display
	function changeResultBylength() {
		str = game.result + "";
		var size = "";
		if (str.length > 6) {
			var count = 35 - (str.length - 6) * 2;
		} else {
			var count = 35;
		}
		size = count + "pt";
		$("#result").css("font-size", size);
	}

	function equalClick() {
		try {
			game.result = parseFloat(eval(game.formula).toFixed(15));
		} catch (exception) {
			alert("输入错误" + "\n" + "ERROT: " + exception);
			reset();
		}
		changeResultBylength();
		$("#result").val(game.result);
	}

	function buttonJudgeAndDo(button) {;
		if (button.className == "cal generalButton" || button.id == "leftBracket" || button.id == "rightBracket") {
			if (button.id == "spot") spotClick();
			if (button.id == "delete") deleteClick();
			else generalButtonClick(button);
		} else if (button.className == "cal FunButton") FuncButtonClick(button);
		else if (button.id == "clear") reset();
	}

	$(function() {
		$("button").click(function() {
			buttonJudgeAndDo(event.target);
		});
	})
})();