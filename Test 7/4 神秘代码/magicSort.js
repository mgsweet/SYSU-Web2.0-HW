(function() {
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = "http://www.kryogenix.org/code/browser/sorttable/sorttable.js";
	$("table").addClass("sortable");
	var h = document.getElementsByTagName('head').item(0);
	h.appendChild(s);
})();