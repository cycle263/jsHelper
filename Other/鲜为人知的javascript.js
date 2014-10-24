/* 获取伪元素属性 */
// Get the color value of .element:before
var color = window.getComputedStyle(
	document.querySelector('.element'), ':before'
).getPropertyValue('color');

// Get the content value of .element:before
var content = window.getComputedStyle(
	document.querySelector('.element'), ':before'
).getPropertyValue('content');

/* 原生javascript修改样式class类 */
myDiv.classList.add('myCssClass'); // Adds a class
myDiv.classList.remove('myCssClass'); // Removes a class
myDiv.classList.toggle('myCssClass'); // Toggles a class

/* 添加样式规则 */
function addCSSRule(sheet, selector, rules, index) {
	if(sheet.insertRule) {
		sheet.insertRule(selector + "{" + rules + "}", index);
	}
	else {
		sheet.addRule(selector, rules, index);
	}
}

// Use it!
addCSSRule(document.styleSheets[0], "header", "float: left");

