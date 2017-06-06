(function() {
	$(function() {
		listenTableHeadClick();
	});

	var golbal = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0]
	]

	listenTableHeadClick = function() {
		$("#todo th").click(function() {
			sortTable(event, "todo");
		});
		$("#staff th").click(function() {
			sortTable(event, "staff");
		});
	}

	sortTable = function(event, id) {
		var rows = document.getElementById(id).rows;
		for (var i = 0; i < rows[0].cells.length; i++) {
			if (rows[0].cells[i].innerHTML == event.target.innerHTML) {
				var judge = checkStatus(i, id);
				changeStyle(rows[0], id);
				sort(i, rows, judge);
			}
		}
	}

	changeStyle = function(topRow, id) {
		var idNum;
		if (id == "todo") idNum = 0;
		else idNum = 1;
		for (var i = 0; i < 2; i++) {
			for (var j = 0; j < 3; j++) {
				if (golbal[idNum][j] == 1) topRow.cells[j].className = "up arrow";
				else if (golbal[idNum][j] == -1) topRow.cells[j].className = "down arrow";
				else topRow.cells[j].className = "";
			}
		}
	}

	// 正向排序返回1， 否则返回-1
	checkStatus = function(col, id) {
		var idNum;
		if (id == "todo") idNum = 0;
		else idNum = 1;
		if (golbal[idNum][col] != 0) {
			golbal[idNum][col] = -golbal[idNum][col];
		} else {
			for (var i = 0; i < golbal[idNum].length; i++) golbal[idNum][i] = 0;
			golbal[idNum][col] = 1;
		}
		return golbal[idNum][col];
	}

	sort = function(col, rows, sortMode) {
		for (var i = 1; i < rows.length; i++) {
			for (var j = i + 1; j < rows.length; j++) {
				if (sortMode == 1) {
					if (rows[i].cells[col].innerHTML > rows[j].cells[col].innerHTML) swap(rows[i], rows[j]);
				} else {
					if (rows[i].cells[col].innerHTML < rows[j].cells[col].innerHTML) swap(rows[i], rows[j]);
				}
			}
		}
	}

	swap = function(rows1, rows2) {
		var temp = rows1.innerHTML;
		rows1.innerHTML = rows2.innerHTML;
		rows2.innerHTML = temp;
	}



})()