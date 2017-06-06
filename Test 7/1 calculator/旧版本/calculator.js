//最新版的js
//简化了下代码，不过运算符那还是决定一个个来写，因为我的乘号除号显示的不是计算机能计算的
//author： Aaron Qiu

window.onload = function() {
	//  display: show the humanize input of users
    //  formula: is the actual input of users
    //  弄多一个formula只是为了把乘号✖除号÷显示出来
    //  result: the output;
    var display = "";
    var formula = "";
    var result = "";

    //  当前如果有result 直接输入数字,左右括号，小数点，会启动clear
    function NumInputNeedClear() {
        display = "";
        formula = "";
        result = "";
        document.getElementById("result").value = display;
        document.getElementById("display").value = display;
    }

    //  click num button
    function addNum(button) {
    	button.onclick = function() {
    		if (result != "") {
            NumInputNeedClear();
        	}
        	display += button.value;
        	formula += button.value;
        	document.getElementById("display").value = display;
    	}
    }

	var object = document.getElementsByClassName("cal_button");
	for (var i = 0; i < object.length; i++) {
        //  spot function
        //  can only appear once
		if (object[i].id == "spot") {
			object[i].onclick = function() {
				if (result != "") {
            		NumInputNeedClear();
        		}
        		//  在符号后或一开始直接按“.”号会自动补“0”；
        		//  不能连续输入两个.
        		if (formula.charAt(formula.length - 1) != "\.") {
            	if (display == "" || formula.charAt(formula.length - 1) == "+"
            	|| formula.charAt(formula.length - 1) == "-"
            	|| formula.charAt(formula.length - 1) == "*"
            	|| formula.charAt(formula.length - 1) == "/") {
                	display += "0";
                	formula += "0";
            	}
            	display += ".";
            	formula += ".";
            	document.getElementById("display").value = display;
        		}
			}
		} else if (object[i].id == "delete") {
            object[i].onclick = function() {
                display = display.substring(0, display.length - 1);
                document.getElementById("display").value = display;
            }
        } else {
			addNum(object[i]);
		}
	}

    //  运算符
    //  如果result还有的情况直接按运算符，会把rusult用上
    function resultNeedUse() {
        display = result;
        formula = result;
        result = "";
        document.getElementById("result").value = "";
    }

    document.getElementById("add").onclick = function() {
        if (result != "") {
            resultNeedUse()
        }
        display += "+";
        formula += "+";
        document.getElementById("display").value = display;
    }

    document.getElementById("subtract").onclick = function() {
        if (result != "") {
            resultNeedUse();
        }
        display += "-";
        formula += "-";
        document.getElementById("display").value = display;
    }

    document.getElementById("mutiply").onclick = function() {
        if (result != "") {
            resultNeedUse();
        }
        display += "×";
        formula += "*";
        document.getElementById("display").value = display;
    }
    document.getElementById("divide").onclick = function() {
        if (result != "") {
            resultNeedUse;
        }
        display += "÷";
        formula += "/";
        document.getElementById("display").value = display;
    }
    
    document.getElementById("leftBracket").onclick = function() {
        if (result != "") {
            NumInputNeedClear();
        }
        display += "(";
        formula += "(";
        document.getElementById("display").value = display;
    }
    document.getElementById("rightBracket").onclick = function() {
        if (result != "") {
            NumInputNeedClear();
        }
        display += ")";
        formula += ")";
        document.getElementById("display").value = display;
    }

    //实现结果长度增长结果显示字体变小的功能
    function changeResultSize() {
        var str = "";
        str += result;
        var size = "";
        if (str.length > 6) {
            var count = 35 - (str.length - 6) * 2;
        } else {
            var count = 35;
        }
        size = count + "pt";
        document.getElementById("result").style.fontSize = size;
    }

    document.getElementById("equal").onclick = function() {
        try {
            result = parseFloat(eval(formula).toFixed(15));
        }
        catch(exception) {
            alert("输入错误" + "\n" + "ERROT: " + exception);
            NumInputNeedClear();
        }
        changeResultSize();
        document.getElementById("result").value = result;
    }

    document.getElementById("close").onclick = function() {
        document.getElementById("calculator").style.opacity = 0;
    }

    document.getElementById("clear").onclick = function() {
        NumInputNeedClear();
    }
}
