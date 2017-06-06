(function() {
	var http = require("http");
	var url = require("url");
	var fs = require("fs");
	var queryString = require("querystring");

	var originData = [];

	var mimetype = {
		'txt': 'text/plain',
		'html': 'text/html',
		'css': 'text/css',
		'js': 'text/javascript'
	}

	function start() {
		loadData();
		http.createServer(onRequest).listen(8000);
		console.log("Server is running at http://localhost:8000/");
	}

	function creatWeb(res, pathname) {
		var filePath = pathname.substr(1, pathname.length);
		if (filePath == "") {
			filePath = "signin.html"
		}
		//console.log(filePath + "2");
		fs.readFile(filePath, function(err, data) {
			if (err) {
				console.log(err);
				res.writeHead(404, {
					"Content-Type": "text/html"
				});
			} else {
				// console.log(pathname);
				res.writeHead(200, {"Content-Type": mimetype[filePath.split('.').pop()] || 'text/plain'});
				res.write(data.toString());
				res.end();
			}
		})
	}

	function onRequest(req, res) {
		var pathname = url.parse(req.url).pathname;
		var search = url.parse(req.url).search;
		var query = queryString.parse(url.parse(req.url).query);
		var postData = "";
		req.on('data', function(data) {
			postData += data;
		})
		req.on('end', function() {
			if (pathname == "/logIn") {
				infoHandling(req, res, postData);
				postData = "";
			} else if (search == null) {
				creatWeb(res, pathname);
			} else if (search != null) {
				console.log(query);
				var isFound = 0;
				for (var i = 0; i < originData.length; i++) {
					if (query.username == originData[i]['name']) {
						console.log("1");
						isFound = 1;
						showInfo(res, originData[i]);
						break;
					}
				}
				if (isFound == 0) {
					// res.writeHead(200, {"Content-Type":"text/plain;charset=utf-8"});
					// res.write("不存在这样的用户");
					// response.end();
					creatWeb(res, "/");
				}
			}
		})
	}

	function infoHandling(req, res, postData) {
		var signinInfo = queryString.parse(postData);
		var judgeArr = InfoUsedStatus(signinInfo);
		if (judgeArr.length == 0) {
			var judgeStr = judgeFormat(signinInfo);
			if (judgeStr.length == 3) {
				console.log("1");
				uploadInfo(signinInfo);
				showInfo1(res, signinInfo);
				// res.writeHead(301, {
				// 	Location: "?username=" + signinInfo.name
				// });
				res.end();
			} else {
				res.writeHead(200, {
					"Content-Type": "text/plain;charset=utf-8"
				});
				res.write("您的输入信息错误，错误如下:\n");
				res.write(judgeStr);
				res.end();
			}
		} else {
			res.writeHead(200, {
				"Content-Type": "text/plain;charset=utf-8"
			});
			res.write("用户信息已存在, 信息如下\n");
			for (var i = 0; i < judgeArr.length; i++) {
				res.write(judgeArr[i] + ": " + signinInfo[judgeArr[i]] + " 已注册\n");
			}
			res.end();
		}
	}

	// function showInfo(res, signinInfo) {
	// 	res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});


	// 	var str = "姓名：" + signinInfo.name + "\n学号：" + signinInfo.id + "\n邮箱："
	// 	+ signinInfo.email + "\n手机：" + signinInfo.phone;
	// 	res.write(str);
	// 	res.end(); 
	// }

	function showInfo(res, user) {
		res.writeHead(200, {
			"Content-Type": "text/html; charset=utf-8"
		});
		res.write("<!DOCTYPE html>");
		res.write("<html>");
		res.write("<head>");
		res.write("<title>Detail</title>");
		res.write("<meta charset=utf-8>");
		res.write("<link rel='stylesheet' type='text/css' href='./signin.css'>");
		res.write("</head>");
		res.write("<body>");
		res.write("<div id=\"signin\">");
		res.write("<div id=\"signinArea\">");
		res.write("<fieldset>");
		res.write("<legend>用户信息</legend>");
		res.write("<div>姓名:" + user["name"] + "</div><br />");
		res.write("<div>学号:" + user["id"] + "</div><br />");
		res.write("<div>电话:" + user["phone"] + "</div><br />");
		res.write("<div>邮箱:" + user["email"] + "</div>");
		res.write("</fieldset>");
		res.write("</div>");
		res.write("</div>");
		res.write("</body>");
		res.write("</html>");
		res.end();
	}

	function judgeFormat(infoObj) {
		var str = "原因：";
		if (infoObj["name"] == "") {
			str += "名字不能为空\n"
		} else if (!(/^[a-zA-Z][a-zA-Z0-9_]{5,17}$/.test(infoObj.name))) {
			str += "名字格式错误 必须符合：6-18位英文字母、数字或下划线，必须以英文字母开头\n";
		}
		if (infoObj["phone"] == "") {
			str += "手机或电话号码不能为空\n"
		} else if (!(/^[1-9](\d{10})$/).test(infoObj.phone)) {
			console.log(infoObj.phone);
			str += "手机格式错误 必须符合：11位数字，不能以0开头\n"
		}
		if (infoObj["id"] == "") {
			str += "id不能为空\n"
		} else if (!(/^[1-9][0-9]{7}$/.test(infoObj.id))) {
			console.log(infoObj.id);
			str += "ID格式错误 必须符合：8位数字，不能以0开头\n"
		}
		if (infoObj["email"] == "") {
			str += "email不能为空\n"
		} else if (!(/^[a-zA-Z0-9_\-]+@([a-zA-Z0-9_\-]+\.)+[a-zA-Z]{2,4}$/.test(infoObj.email))) {
			console.log(infoObj.email);
			str += "email格式错误\n"
		}
		return str;
	}

	function InfoUsedStatus(data) {
		var judgeArr = [];
		var count = 0;
		//console.log(originData);
		for (var i = 0; i < originData.length; i++) {
			if (originData[i].name == data.name) judgeArr[count++] = "name";
			if (originData[i].id == data.id) judgeArr[count++] = "id";
			if (originData[i].email == data.email) judgeArr[count++] = "email";
			if (originData[i].phone == data.phone) judgeArr[count++] = "phone";
		}
		return judgeArr;
	}

	function loadData() {
		fs.readFile('./dataBase.txt', 'utf-8', function(err, data) {
			if (err) {
				console.error(err);
			} else {
				var temp = data.toString().split('\r\n');
				for (var i = 0; i < temp.length - 1; i++) {
					var temp2 = temp[i].split(',');
					originData[i] = {};
					originData[i]["name"] = temp2[0];
					originData[i]["id"] = temp2[1];
					originData[i]["email"] = temp2[2];
					originData[i]["phone"] = temp2[3];
				}
			}
		})
	}

	function uploadInfo(userInfo) {
		var data = userInfo.name + "," + userInfo.id + "," + userInfo.email + "," + userInfo.phone + '\r\n';
		fs.appendFile("./dataBase.txt", data, "utf8", function(err) {
			if (err) return console.log(err);
		})
		originData[originData.length] = [];
		originData[originData.length - 1]['name'] = userInfo.name;
		originData[originData.length - 1]['id'] = userInfo.id;
		originData[originData.length - 1]['email'] = userInfo.email;
		originData[originData.length - 1]['phone'] = userInfo.phone;
	}

	start();
})()