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
    document.getElementById("num7").onclick = function() {
        if (result != "") {
            NumInputNeedClear();
        }
        display += "7";
        formula += "7";
        document.getElementById("display").value = display;
    }
    document.getElementById("num8").onclick = function() {
        if (result != "") {
            NumInputNeedClear();
        }
        display += "8";
        formula += "8";
        document.getElementById("display").value = display;
    }
    document.getElementById("num9").onclick = function() {
        if (result != "") {
            NumInputNeedClear();
        }
        display += "9";
        formula += "9";
        document.getElementById("display").value = display;
    }
    document.getElementById("num6").onclick = function() {
        if (result != "") {
            NumInputNeedClear();
        }
        display += "6";
        formula += "6";
        document.getElementById("display").value = display;
    }
    document.getElementById("num5").onclick = function() {
        if (result != "") {
            NumInputNeedClear();
        }
        display += "5";
        formula += "5";
        document.getElementById("display").value = display;
    }
    document.getElementById("num4").onclick = function() {
        if (result != "") {
            NumInputNeedClear();
        }
        display += "4";
        formula += "4";
        document.getElementById("display").value = display;
    }
    document.getElementById("num3").onclick = function() {
        if (result != "") {
            NumInputNeedClear();
        }
        display += "3";
        formula += "3";
        document.getElementById("display").value = display;
    }
    document.getElementById("num2").onclick = function() {
        if (result != "") {
            NumInputNeedClear();
        }
        display += "2";
        formula += "2";
        document.getElementById("display").value = display;
    }
    document.getElementById("num1").onclick = function() {
        if (result != "") {
            NumInputNeedClear();
        }
        display += "1";
        formula += "1";
        document.getElementById("display").value = display;
    }
    document.getElementById("num0").onclick = function() {
        if (result != "") {
            NumInputNeedClear();
        }
        display += "0";
        formula += "0";
        document.getElementById("display").value = display;
    }

    //  click function button

    //  spot function
    //  can only appear once
    document.getElementById("spot").onclick = function() {
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

    document.getElementById("delete").onclick = function() {
        display = display.substring(0, display.length - 1);
        document.getElementById("display").value = display;
    }

    document.getElementById("clear").onclick = function() {
        NumInputNeedClear();
    }

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
}















