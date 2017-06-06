# 计算器

旧代码行数：164

新代码行数：99

增加新功能后行数：125

心得：之前为了不显得有那么多全局变量，将全部函数都扔进window.onload里，这就好像所有东西都在main里编写一样，导致重构花了很多时间,然后是关于ready和onload的区别也了解了下，样式控制放在onload里加载，ready则是在文档结构完成后加载的。然后其实代码是简化了好多的，新功能主要是填了下之前TA点评说做得不好的地方。

新功能：1、左右括号输入判定；2、输出结果字体会根据长度变化



# 拼图

旧代码行数：304

新代码行数：304

主要改动的代码是fifteenpuzzle里面的代码，因为之前写自动化写了很多行然后前后结构也没注意，导致留下一个深坑，介于学业和比赛实在太忙没有改动关于自动拼图的部分，

行数没有变化也是尴尬，但其实是变少了的，因为我的函数变多了，每个函数间都有空格。然后觉得jquery里的添加删除获取设置都是极好用的。



# 神秘代码

用的别人的库，具体看magicSort.js

理论上可排序任何网站的任何table

已测试：

http://soj.sysu.edu.cn/courses.php

http://www.smartoj.com/p/

http://nba.stats.qq.com/player/list.htm

http://soccer.hupu.com/scorers/1



(function() {var s = document.createElement("script");s.type = "text/javascript";s.src = "http://www.kryogenix.org/code/browser/sorttable/sorttable.js";$("table").addClass("sortable");var h = document.getElementsByTagName('head').item(0);h.appendChild(s);})();

