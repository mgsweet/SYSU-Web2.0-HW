(function() {
	
	var check = [0, 0, 0, 0];

	$(function() {
		$("#reset").click(reset);
		$("input").blur(function() {
			var current = $(this);
			checkContent(current);
		});
	});

	checkContent = function(dom) {
		var str = dom.attr('name');
		switch (str) {
			case 'name':
				checkUsername(dom);
				break;
			case 'id':
				checkid(dom);
				break;
			case 'phone':
				checkPhone(dom);
				break;
			case 'email':
				checkEmail(dom);
				break;
			default:
				break;
		}
	};

	checkUsername = function(dom) {
		if (!(/^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test(dom.val()))) {
			if (check[0] != -1) {
				var temp = document.createElement("p");
				temp.className = "errorHint";
				temp.id = "nameError";
				temp.innerHTML = "名字必须符合：6-18位英文字母、数字或下划线，必须以英文字母开头";
				$("#name").after(temp);
				check[0] = -1;
			}
		} else {
			if (check[0] == -1) {
				$("#nameError").remove();
			}
			check[0] = 1;
		}
	};

	checkid = function(dom) {
		if (!(/^[1-9][0-9]{7}$/.test(dom.val()))) {
			if (check[1] != -1) {
				var temp = document.createElement("p");
				temp.className = "errorHint";
				temp.id = "idError";
				temp.innerHTML = "学号必须符合：8位数字，不能以0开头";
				$("#id").after(temp);
				check[1] = -1;
			}
		} else {
			if (check[1] == -1) {
				$("#idError").remove();
			}
			check[1] = 1;
		}
	};

	checkPhone = function(dom) {
		if (!(/^[1-9][0-9]{10}$/.test(dom.val()))) {
			if (check[2] != -1) {
				var temp = document.createElement("p");
				temp.className = "errorHint";
				temp.id = "phoneError";
				temp.innerHTML = "手机必须符合：11位数字，不能以0开头";
				$("#phone").after(temp);
				check[2] = -1;
			}
		} else {
			if (check[2] == -1) {
				$("#phoneError").remove();
			}
			check[2] = 1;
		}
	};

	checkEmail = function(dom) {
		if (!(/^[a-zA-Z_\-]+@(([a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/.test(dom.val()))) {
			if (check[3] != -1) {
				var temp = document.createElement("p");
				temp.className = "errorHint";
				temp.id = "emailError";
				temp.innerHTML = "邮箱格式不正确";
				$("#email").after(temp);
				check[3] = -1;
			}
		} else {
			if (check[3] == -1) {
				$("#emailError").remove();
			}
			check[3] = 1;
		}
	};

	var reset = function() {
		$("#name").val("");
		$("#id").val("");
		$("#email").val("");
		$("#phone").val("");
		check = [0, 0, 0, 0];
		$(".errorHint").remove();
	}

})()