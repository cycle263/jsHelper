/* javascript 数据类型 操作 */
//string unique —— regexp
function strUnique(str){    //example: '111222333334555777888' -- 有序
	var arr = str.match(/(\w)\1*/g), len = 0, char = '';
	for(var i = 0, l = arr.length; i < l; i++){
		var leng = arr[i].length;
		if(len < leng) {
			len = leng;
			char = arr[i][0];
		}
	}
	return {length: len, char: char};
}

//无序的字符串去重
function unsortedStrUnique(str){
    var l = str.length,
        result = {};
    for(var i = 0; i < l; i++){
        var type = typeof str[i];
        result[type+'Val'+str[i]] = str[i];
        result[type+'Val'+str[i]+'Length'] = result[type+'Val'+str[i]+'Length'] !== undefined ? result[type+'Val'+str[i]+'Length'] - 0 + 1 : 1; 
    }
    return result;
}

/***************** 对象操作函数 *****************/

//extend，将P中的可枚举的属性复制到O中，返回源对象
function extend(o, p){
	for(var prop in p){
		o[prop] = o[prop];
	}
	return o;
}

//merge，合并属性，并集，返回源对象
function merge(o, p){
	for(var prop in p){
		if(o.hasOwnProperty[prop]) continue;
		o[prop] = p[prop];
	}
	return o;
}

//restrict，交集，返回源对象
function restrict(o, p){
	for(var prop in o){
		if(!(prop in p)) delete o[prop];
	}
	return o;
}

//substract，去重，返回源对象
function substract(o, p){
	for(var prop in p){
		delete o[prop];
	}
	return o;
}

//union, 并集，返回新对象
function union(o, p){
	return extend(extend({}, o), p);
}

//intersection, 交集，返回新对象
function intersection(o, p){
	return restrict(extend({}, o), p);
}

//对象转换成数组类型
function keys(o){
	if(typeof o !== "object") throw TypeError();
	var result = [];
	for(var prop in o){
		if(o.hasOwnProperty(prop))
			result.push(prop);
	}
	return result;
}

//对象类型判断
function classof(o){
	if(o===null) return "Null";
	if(o===undefined) return "Undefined";
	return Object.prototype.toString.call(o).slice(8, -1);
}

//小数转换成百分数
function tranPercent(num, digit){
	var v = Math.pow(10, parseInt(digit));
	return Math.floor(num * (100 * v))/v;   //多加一个小括号（100 * v），避免精度丢失
}

//用0补全位数，并返回字符串
function prefixInteger(num, length) {
    try{
        if (num.toFixed().toString().length > length) {  //数值位数不能少于要求总位数
            throw 'illegal number!';
        }
        return (num / Math.pow(10, length)).toFixed(length).substr(2);
    }catch(err){
        console.log(err);
    }
}

//获取URL查询字符串query string
function queryStr(url, name){
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//构建字符串最佳方式
var arr = ['item 1', 'item 2', 'item 3', ...];  
var list = '<ul><li>' + arr.join('</li><li>') + '</li></ul>';


//生成随机码, 转换成2-36进制，然后截取8位
Math.random().toString(36).substring(2, 10);

//修改Function原型，运行时间，绑定上下文
Function.prototype.runtime = function(){
	var t1 = +new Date(),
		run = this(),
		t2 = +new Date();
	return t2 - t1;  //单位是毫秒
};

/*  柯里化 和 反柯里化  */
//绑定特定的上下文，并返回此函数
Function.prototype.bind = function(obj){
	var fn = this,
		slice = Array.prototype.slice,
		args = slice.call(arguments, 1);
	return function(){
		return fn.apply(obj, args.concat(slice.apply(arguments)));
	};
};

//柯里化函数
var currying = function(fn){
	var _args = [];
	return function(){
		if(arguments.length === 0){
			return fn.apply(this, _args);
		}
		[].push.apply(_args, arguments);
		return arguments.callee;
	}
};

//反柯里化函数
Function.prototype.uncurrying(){
	var _this = this;
	return function(){
		return Function.prototype.call.apply(_this, arguments);
	};
}

//Array forEach函数
if (!Array.prototype.forEach)
{
  Array.prototype.forEach = function(fun /*, thisArg */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== "function")
      throw new TypeError();

    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++)
    {
      if (i in t)
        fun.call(thisArg, t[i], i, t);
    }
  };
}

//数组去重 --- 性能较好，能区分hash值
function unique(arr){
	var newArr = [],
	    hash = {};
	for(var i = 0, l = arr.length; i < l; i++){
		var item = arr[i],
		    key = Object.prototype.toString.call(item).slice(8, -1) + JSON.stringify(item);
	    if(hash[key] !== 1){
	    	newArr.push(item);
	    	hash[key] = 1;
	    }
	}
	return newArr;
}

/*随机颜色函数
 *Method 1
 *易于理解
 */
function getRandomColor(){
	var strArr = '0123456789ABCDEF'.split(''), resultStr = '#';
	for(var i = 0; i < 6; i++){
		resultStr += strArr[Math.floor(Math.random()*16)];	
	}
	return resultStr;
}
/*随机颜色函数
 *Method 2
 *简单实用
 */
'#'+((255*255*255)*Math.random()|0).toString(16);
'#'+(0xFFFFFF*Math.random()|0).toString(16);

//交换值方法, 不建议批量使用，批量使用交换函数
var a = 9, b = 8;
a = [b, b = a][0];

//数组交换值函数
function arrSwap(arr, x, y){
	if(arguments.length < 3) throw new TypeError('Illegal parameters');
	arr[x] = arr.splice(y, 1, arr[x])[0];
	return arr;
}

//是否是素数函数
function isPrime(num) {
    var start = 2;
    while (start <= Math.sqrt(num)) {
        if (num % start++ < 1) return false;
    }
    return (num > 1);
}

/************************************************/

//下载文件
var downloadURL = function(url) {
    var hiddenIFrameID = 'hiddenDownloader',
        iframe = document.getElementById(hiddenIFrameID);
    if (iframe === null) {
        iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }
    iframe.src = url;
};

//收藏网页
function AddFavorite(sURL, sTitle) { 
    try { 
        window.external.addFavorite(sURL, sTitle) 
    } catch(e) { 
        try { 
            window.sidebar.addPanel(sTitle, sURL, "") 
        } catch(e) { 
            alert("加入收藏失败，请使用Ctrl+D进行添加") 
        } 
    } 
} 

//设置为主页
function setHomepage() { 
    if (document.all) { 
        document.body.style.behavior = 'url(#default#homepage)'; 
        document.body.setHomePage('http://www.jq-school.com') 
    } else if (window.sidebar) { 
        if (window.netscape) { 
            try { 
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect") 
            } catch(e) { 
                alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true") 
            } 
        } 
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch); 
        prefs.setCharPref('browser.startup.homepage', 'http://www.jq-school.com') 
    } 
} 

//添加input元素
function addInputEle(){
	var mainForm = document.forms[0];
	var newInput = document.createElement('input');
	newInput.type = 'hidden';
	newInput.value = '';
	newInput.name = '';
	mainForm.appendChild(newInput);
}

//添加select元素
function addSelectEle(divEle){
	var select = document.createElement('input');
	var option = new Option('text', 'value');  //兼容性好于createElement
	select.options[0] = option;  //兼容性好于options.add()
	divEle.appendChild(select);
}

//转换日期格式（自定义）
function dateString(date, str){
    var year = date.getFullYear(),
        month = date.getMonth() + 1,
        fillMonth = month < 10 ? '0' + month : month,
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        monthName = months[month-1],
        day = date.getDate(),
        fillDay = day < 10 ? '0' + day : day,
        weekDay = date.getDay(),
        weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        weekName = weeks[weekDay];
    
    str = str.replace(/%Y/g, year);
    str = str.replace(/%y/g, year.toString().slice(-2));
    str = str.replace(/%M/g, monthName);
    str = str.replace(/%m/g, monthName.slice(0, 3));
    str = str.replace(/%N/g, fillMonth);
    str = str.replace(/%W/g, weekName);
    str = str.replace(/%w/g, weekName.slice(0, 3));
    str = str.replace(/%D/g, fillDay);
    str = str.replace(/%d/g, day);
    return str;
}

dateString(new Date(), '%Y/%N/%D %W');


/* ######################  function output object遍历对象内容  ###################### */
var print = function(obj){
  var str = "";
	for(var item in obj){
		if(typeof obj[item] != "object"){
			str += item + ": " + obj[item] + "; <br />";
		}else{
			str += item + ": { <br />" + arguments.callee(obj[item]) + "}";
		}
	}
	return str;
};

//getElementsByClassName compatibility  兼容IE6以上
function getElementsByClassName(node, name){
	var array = [];
	var reg = new RegExp('(\s|^)' + name + '(\s|$)');
	var all = node.getElementsByTagName('*');
	for(var i = 0, l = all.length; i < l; i++){
		if(reg.test(all[i].className))
			array.push(all[i]);
	}
	return array;
}

//计算对象的长度
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

//判断对象是否存在于数组之中
function deepArrayCompare(arr, obj){
        var result = false;
        var o = JSON.stringify(obj);

        for(var i = 0, l = arr.length; i < l; i++){
            var o1 = JSON.stringify(arr[i]);
            if(o == o1){
                result = true;
            }
        }
        return result;
    };

/***************** 比对外链样式表名称 *******************/
function compareStyleName(styleName){
    if(!document.styleSheets){return;}
    var sheets = document.styleSheets, hasResult = false;
    
    for(var i = 0, l = sheets.length; i < l; i++){
        var name = sheets[i].href.substring(sheets[i].href.lastIndexOf('/') + 1);
        if(styleName == name){
            hasResult = true;	//存在此style，返回true
        }
    }
    return hasResult;
}

//日期格式转换
var transformDateFormat = function(date) {
    var m = (date.getMonth() + 1).toString(),
        d = date.getDate().toString();

    date = date.getFullYear() + '-' + (m[1] ? m : '0' + m) + '-' + (d[1] ? d : '0' + d);
    return date;
}

/*********************** 阻止键盘默认事件 ***********************/
app.directive('verifyinput', function(){
    return function(scope, ele, attrs) {
        ele.bind('keypress', function(event) {
            var charCode = typeof event.charCode == 'number' ? event.charCode : event.keyCode;            
            if (!/[\w]/.test(String.fromCharCode(charCode)) && event.keyCode != 8 && event.keyCode != 32 && event.keyCode != 45 && !(event.shiftKey && event.keyCode >= 65 && event.keyCode <= 90) || (event.shiftKey && event.keyCode == 95)) {
                event.preventDefault ? event.preventDefault() : (event.returnValue = false);
            }
        });
    };
});
//组合键中keyCode值与单独的keyCode有一定出入


/*******知数组中某个对象的属性值，删除数组中的该对象******/
function delObjArr(arrs,k,v，o){     //o为是否进行删除的开关
    o ? o : false;
    for(var i = 0, l = arrs.length; i < l; i++){
        if(arrs[i][k] == v){
            console.log('index: ' + i + ', value: ' + arrs[i][k]);
            o && arrs.splice(i, 1);
            return i；
        }
    }
}

//计算某字段属性在数组中的index
    function IndexOfObject(arr, filed, value) {
        var i = 0,
            l = arr ? arr.length : 0;

        if(l == 0){return -1;}
        for (; i < l; i++) {
            if (arr[i][filed] == value) {
                return i;
            }            
        }
        return -1;
    }

/******************* 转换日期格式 ********************/
function transformDateFormat(date){
        var m = (date.getMonth() + 1).toString(),
        d = date.getDate().toString();

        date = date.getFullYear() + '-' + (m[1] ? m : '0' + m) + '-' + (d[1] ? d : '0' + d);
	return date;
}


/* ######################  string与DOM tree之间的相互转换  ###################### */
var convertDOM = {
	object: undefined,
	init: function(){
		this.object = document.createElement('div');
	},
	DOMToString: function(DOM){
		this.object.innerHTML = '';
		this.object.appendChild(DOM.cloneNode(true));
		return this.object.innerHTML;
	},
	StringToDOM: function(str){
		this.object.innerHTML = str;
		var container = document.createDocumentFragment();
		var children = this.object.childNodes;
		for(var i = 0, len = children.length; i < len; i++){
			container.appendChild(children[i].cloneNode(true));
		}
		return container;
	}
};
convertDOM.init();

/* ######################  Nodelist、HTMLCollection转换成数组  ###################### */
var convertArray = function(list){
	return Array.prototype.slice.call(list);
};


/*************** JSON转换CSV及example **************/
    function jsonToCSV(json, isFirst, isLast) {
        var result = '';
        if(isFirst){
            for(var item in json){
                result += '"' + item + '",';
            }
            result = result.substring(0, result.lastIndexOf(',')) + '\n';
        }
        for (var item in json) {
            result += '"' + json[item] + '",';            
        }
        result = result.substring(0, result.lastIndexOf(','));
        return isLast ? result : result + '\n';
    }
var obj = {name:'cycle',job:'dev',dep:'GSDT',region:'CD'}, str = '';
var arr = [{name:'cycle',job:'dev',dep:'GSDT',region:'CD'},{name:'cycle',job:'dev',dep:'GSDT',region:'CD'},{name:'cycle',job:'dev',dep:'GSDT',region:'CD'},{name:'cycle',job:'dev',dep:'GSDT',region:'CD'}];
for(var i = 0, l = arr.length;i < l;i++){
    str += jsonToCSV(arr[i], i==0, i==arr.length - 1); 
}


/* ######################  重写Array原生对象prototype方法remove  ###################### */
Array.prototype.remove = function(from, to){
	var temps = this.slice(parseInt(to || from) + 1 || this.length);  //截取删除后的后半部分
	this.length = from > 0 ? this.length + from : from;  //数组只保留删除后的前半部分
	return this.push.apply(this, temps);  //将后半部分推入数组
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

Array.prototype.remove = function(){
    var a = arguments, l = a.length, i;
    if(!l){
	for(var j = 0; j < l; j ++){
	    i = this.indexOf(a[j]);
	    this.splice(i, 1);
	}
    }    	
};

/* ######################  兼容IE5写原生方法push和shift  ###################### */
function Array_push() {
	var A_p = 0;
	for (A_p = 0; A_p < arguments.length; A_p++) {
		this[this.length] = arguments[A_p];
	}
	return this.length;
}

if (typeof Array.prototype.push == "undefined") {
	Array.prototype.push = Array_push;
}

function Array_shift() {
	var A_s = 0;
	var response = this[0];
	for (A_s = 0; A_s < this.length-1; A_s++) {
		this[A_s] = this[A_s + 1];
	}
	this.length--;
	return response;
}

if (typeof Array.prototype.shift == "undefined") {
	Array.prototype.shift = Array_shift;
}


////////////////////////  Cookies  /////////////////////////
var CookieUtil = {
	get: function(name){
		var cookieName = encodeURIComponent(name) + "=",
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null;
		if(cookieValue > -1){
			var cookieEnd = document.cookie.indexOf(";", cookieStart);
			if(cookieEnd == -1){
				cookieEnd = document.cookie.length;				
			}
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart +
						cookieName.length, cookieEnd));
		}
		return cookieValue;
	},
	set: function(name, value, expires, path, domain, secure){
		var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
		
		(expires instanceof Date) && (cookieText += "; expires=" + expires.toGMTString());
		path && (cookieText += "; path=" + path);
		domain && (cookieText += "; domain=" + domain);
		secure && (cookieText += "; secure");

		document.cookie = cookieText;
	}
	unset: function(name, path, domain, secure){
		this.set(name, "", new Date(0), path, domain, secure);
	}
};

//MS 版本
var docCookies = {
    getItem: function(sKey) {
        return unescape(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:  //兼容性较好，IE下面兼容
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function(sKey, sPath) {
        if (!sKey || !this.hasItem(sKey)) { return false; }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function(sKey) {
        return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */function() {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = unescape(aKeys[nIdx]); }
        return aKeys;
    }
};


//PPK版本
var Cookies = {
	init: function () {
		var allCookies = document.cookie.split('; ');
		for (var i = 0, len = allCookies.length; i < len; i++) {
			var cookiePair = allCookies[i].split('=');
			this[cookiePair[0]] = cookiePair[1];
		}
	},
	create: function (name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			var expires = "; expires=" + date.toGMTString();
		}
		else var expires = "";
		document.cookie = name + "=" + value + expires + "; path=/";
		this[name] = value;
	},
	erase: function (name) {
		this.create(name,'',-1);
		this[name] = undefined;
	}
};
Cookies.init();


/*###################### 创建目录及隐藏 ######################*/
function createTOC() {
	var y = document.createElement('div');
	y.id = 'innertoc';
	var a = y.appendChild(document.createElement('span'));
	a.onclick = showhideTOC;
	a.id = 'contentheader';
	a.innerHTML = 'show page contents';
	var z = y.appendChild(document.createElement('div'));
	z.onclick = showhideTOC;
	var toBeTOCced = getElementsByTagNames('h2,h3,h4,h5');
	if (toBeTOCced.length < 2) return false;

	for (var i=0;i<toBeTOCced.length;i++) {
		var tmp = document.createElement('a');
		tmp.innerHTML = toBeTOCced[i].innerHTML;
		tmp.className = 'page';
		z.appendChild(tmp);
		if (toBeTOCced[i].nodeName == 'H4')
			tmp.className += ' indent';
		if (toBeTOCced[i].nodeName == 'H5')
			tmp.className += ' extraindent';
		var headerId = toBeTOCced[i].id || 'link' + i;
		tmp.href = '#' + headerId;
		toBeTOCced[i].id = headerId;
		if (toBeTOCced[i].nodeName == 'H2') {
			tmp.innerHTML = 'Top';
			tmp.href = '#top';
			toBeTOCced[i].id = 'top';
		}
	}
	return y;
}

var TOCstate = 'none';

function showhideTOC() {
	TOCstate = (TOCstate == 'none') ? 'block' : 'none';
	var newText = (TOCstate == 'none') ? 'show page contents' : 'hide page contents';
	document.getElementById('contentheader').innerHTML = newText;
	document.getElementById('innertoc').lastChild.style.display = TOCstate;
}





/* #############################  跨域访问  ############################ */
(function(){
	var isIE8 = window.XDomainRequest ? true : false,
		invocation = createCrossDomainRequest(),
		url = "http://www.phobos7.co.uk/research/xss/simple.p";

	function createCrossDomainRequest(url, handler){
		var request;
		request = isIE8 ? new window.XDomainRequest() : new XMLHttpRequest(); 
		return request;
	}
	function callOtherDomain(){
		if(invocation){
			if(isIE8){
				invocation.onload = outputResult;
				invocation.open("GET", url, true);
				invocation.send();
			}else{
				invocation.open("GET", url, true);
				invocation.onreadystatechange = handler;
				invocation.send();
			}
		}else{
			var text = "No invocation TookPlace At All",
				textNode = document.createTextNode(text),
				textDiv = document.getElementById("textDiv");
				textDiv.appendChild(textNode);
		}
	}
	function handler(evtXHR){
		invocation.readyState == 4 && invocation.status == 200 ? outputResult() : alert("invocation Errors Occured");
	}
	function outputResult(){
		document.getElementById("textDiv").innerHTML += invocation.responseText;
	}
})();


///////////////    作用域安全的构造函数   //////////////////
function Person(name, age){
	if(this instanceof Person){
		this.name = name;
		this.age = age;
	}else{
		return new Person(name, age);
	}
}


/////////////////////////////////////      斐波那契算法      /////////////////////////
function calculateFibonacci(num){	////算法主体，学习算法的朋友可以自己画画，fibonacci在自然规律中无处不在
	return (num === 0 || num === 1) ? num : (arguments.callee(num - 1) + arguments.callee(num - 2));
}

function doStuff(num, successCallback, errorCallback){
	try{
		var results = [];
		for(var i = 0; i < num - 1; i++){
			var result = calculateFibonacci(i);
			results.push(result);
			console.log(result);
		}
		console.log("Calculate finished!");
		if(typeof successCallback === "function"){
			successCallback(results.join(", "));
		}
	}catch(ex){
		typeof errorCallback === "function" && errorCallback(ex.message);
	}
}

doStuff(5, function(result){
	console.log("this is result: " + result);
}, function(error){
	console.log("Something bad happened: " + error);
});


///////////////////  函数绑定  //////////////////////
function bind(fn, context){
	return function(){
		return fn.apply(context, arguments);
	};
}

//柯里化函数
function curry(fn){
	var args = Array.prototype.slice.call(arguments, 1);
	return function(){
		var innerArgs = Array.prototype.slice.call(arguments);
		var finalArgs = args.concat(innerArgs);
		return fn.apply(null, finalArgs);
	};
}

//柯里化的函数绑定
function bind(fn, context){
	var args = Array.prototype.slice.call(arguments, 2);
	return function(){
		var innerArgs = Array.prototype.slice.call(arguments);
		var finalArgs = args.concat(innerArgs);
		return fn.apply(context, finalArgs);
	};
}



////////////////////////////////////     JSON解析和序列化方法    ////////////////////////////////////////
if(!window.JSON){
	window.JSON = {
		parse: function(sJson){return eval("(" + sJson + ")");},
		stringify: function(vContent){
			if(vContent instanceof Object){
				var sOutput = "";
				if(vContent.constructor === Array){
					for(var i = 0, len = vContent.length; i < len; sOutput += this.stringify(vContent[i]) + ",", i++);
					return "[" + sOutput.substr(0, sOutput.length - 1) + "]";
				}
				if(vContent.toString !== Object.prototype.toString){
					return "\"" + vContent.toString().replace(/"/g, "\\$&") + "\"";
				}
				for(var sProp in vContent){
					sOutput += "\"" + sProp.replace(/"/g, "\\$&") + "\":" + this.stringify(vContent[sProp]) + ","; 
				}
				return "{" + sOutput.substr(0, sOutput.length - 1) + "}";
			}
			return typeof vContent === "string" ? "\"" + vContent.replace(/"/g, "\\$&") + "\"" : String(vContent);
		}
	};
}

/////////////////////////////////////////////////////////////////////////

/************************************************************************/

//实现数组分块，需要运行长时间的处理进行分块，队列执行
function chunk(array, process, context){
	setTimeout(function(){
		var item = array.shift();	//移出首位元素并返回
		process.call(context, item);

		if(array.length > 0){
			setTimeout(arguments.callee, 100);
		}
	}, 100);
}

/// 函数节流思路，非函数实现
var processor = {
	timeoutId: null,
	performProcessing: function(){
		//实际执行的代码
	},

	//初始处理调用的方法
	process: function(){
		clearTimeout(this.timeoutId);
		var that = this;
		this.timeoutId = setTimeout(function(){
			that.performProcessing();
		}, 100);
	}
};
processor.process();	//开始运行

///尝试实现
function throttle(method, context, arg1){
	clearTimeout(method.tId);
	method.tId = setTimeout(function(){
		method.call(context, age1);
	}, 100);
}


/************************************************************************/

						   /*   自定义事件   */

/************************************************************************/
function EventTarget(){
	this.handlers = {};
}

EventTarget.prototype = {
	constructor: EventTarget,
	addHandler: function(type, handler){
		typeof this.handlers[type] == "undefined" && (this.handlers[type] = []);
		console.log("Before push, the array value: " + this.handlers[type]);
		this.handlers[type].push(handler);
		console.log("After push, the array value: " + this.handlers[type]);
	},
	fire: function(event){
		event.target || (event.target = this);
		if(this.handlers[event.type] instanceof Array){
			var handlers = this.handlers[event.type];
			for(var i = 0, len = handlers.length; i < len; i++){
				handlers[i](event);
			}
		}
	},
	removeHandler: function(type, handler){
		if(this.handlers[type] instanceof Array){
			var handlers = this.handlers[type];
			for(var i = 0, len = handlers.length; i < len; i++){
				if(handlers[i] === handler){
					break;
				}
			}
			handlers.splice(i, 1);
			console.log("After remove, the array value: " + (this.handlers[type] && "null"));
		}
	}
};

//usage
function messageHandler(event){
	console.log("You want to output info: " + event.message);
}

var target = new EventTarget();
target.addHandler("message", messageHandler);
target.fire({"type":"message", "message": "event message - very fine!"});

target.removeHandler("message", messageHandler);
target.fire({"type":"message", "message": "event message - very fine!"});



/*****************   克隆函数   ****************/
function clone(object){
	function F(){}
	F.prototype = object;
	return new F;
}
function clone(obj){
	var target = {};
	for(var i in obj){
		obj.hasOwnProperty(i) && (target[i] = obj[i]);
	}
	return target;
}
var cloneObje = Object.clone(oldObj);
var cloneObj = JSON.parse(JSON.stringify(oldObj));

//jQuery clone function
var jQcloneObj = function(){
	var target = arguments[0] || {}, i = 1, len = arguments.length, 
		deep = false, options, name, src, copy,
		toString = Object.prototype.toString;

	if(typeof target === 'boolean'){
		deep = target;
		target = arguments[1] || {};
		i = 2;
	}

	//Object.prototype.toString.call(target).slice(8, -1) !== 'Function'
	if(typeof target !== 'object' && toString.call(target) !== '[object Function]'){
		target = {};
	}

	// Handle case when target is a string or something (possible in deep copy)
	if(len === i){
		target = this;
		--i;
	}

	for(; i < len; i++){
		// Only deal with non-null/undefined values
		if((options = arguments[i]) != null){
			for(name in options){
				src = target[name];
				copy = options[name];

				// Prevent never-ending loop
				if(target === copy){continue;}

				// Recurse if we're merging object literal values or arrays
				if(deep && copy && (toString.call(copy) !== 'Object' || toString.call(copy) !== 'Array')){
					var clone = src && (toString.call(src) !== 'Object' || toString.call(src) !== 'Array') ? src :
							(toString.call(copy) !== 'Array'	? [] : {});

					// Never move original objects, clone them
					target[name] = jQcloneObj(deep, clone, copy);
				}else if(copy !== undefined){
					target[name] = copy;
				}
			}
		}
	}
	return target;
};

///简易的克隆对象
function cloneSimapleObject(obj){
	var temp = JSON.stringify(obj);
	return JSON.parse(temp);
}

//////////////////   序列化对象   ///////////////////
function serialize(obj){
    var output = [], toString = Object.prototype.toString;

    for(var key in obj){
        if(toString.call(obj[key]).slice(8, -1) === 'Object' || toString.call(obj[key]).slice(8, -1) === 'Array'){
            output.push(serialize(obj[key]));
        }else{
        	if(toString.call(obj[key]).slice(8, -1) === 'Function'){
        		obj.hasOwnProperty(key) && output.push(key + ': ' + obj[key]);
        	}else{
        		obj.hasOwnProperty(key) && output.push(key + '": "' + obj[key]);
        	}            
        }                    
    }

    return output.join('", "');
}

function augment(receivingClass, givingClass){
	if(arguments[2]){
		for(var i = 2, len = arguments.length; i++){
			receivingClass.prototype[arguments[i]] || (receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]]);
		}
	}else{
		for(methodName in givingClass.prototype){
			receivingClass.prototype[methodName] || (receivingClass.prototype[methodName] = givingClass.prototype[methodName]);
		}
	}
}

///////////////  正则表达式案例  ///////////////
验证数字：^[0-9]*$
验证n位的数字：^\d{n}$
验证至少n位数字：^\d{n,}$
验证m-n位的数字：^\d{m,n}$
验证数字和小数点:^[0-9]+([.]{0}|[.]{1}[0-9]+)$
验证零和非零开头的数字：^(0|[1-9][0-9]*)$
验证有两位小数的正实数：^[0-9]+(.[0-9]{2})?$
验证有1-3位小数的正实数：^[0-9]+(.[0-9]{1,3})?$
验证非零的正整数：^\+?[1-9][0-9]*$
验证非零的负整数：^\-[1-9][0-9]*$
验证非负整数（正整数 + 0）  ^\d+$
验证非正整数（负整数 + 0）  ^((-\d+)|(0+))$
验证长度为3的字符：^.{3}$
验证由26个英文字母组成的字符串：^[A-Za-z]+$
验证由26个大写英文字母组成的字符串：^[A-Z]+$
验证由26个小写英文字母组成的字符串：^[a-z]+$
验证由数字和26个英文字母组成的字符串：^[A-Za-z0-9]+$
验证由数字、26个英文字母或者下划线组成的字符串：^\w+$
验证用户密码:^[a-zA-Z]\w{5,17}$ 正确格式为：以字母开头，长度在6-18之间，只能包含字符、数字和下划线。
验证是否含有 ^%&',;=?$\" 等字符：[^%&',;=?$\x22]+
验证汉字：^[\u4e00-\u9fa5],{0,}$
验证Email地址：^\w+[-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
验证InternetURL：^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$ ；^[a-zA-z]+://(w+(-w+)*)(.(w+(-w+)*))*(?S*)?$
验证电话号码：^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$：--正确格式为：XXXX-XXXXXXX，XXXX-XXXXXXXX，XXX-XXXXXXX，XXX-XXXXXXXX，XXXXXXX，XXXXXXXX。
验证电话号码及手机:（\d{3}-\d{8}|\d{4}-\d{7}）｜（^((\(\d{3}\))|(\d{3}\-))?13\d{9}|15[89]\d{8}$） 
验证身份证号（15位或18位数字）：^\d{15}|\d{}18$
验证一年的12个月：^(0?[1-9]|1[0-2])$ 正确格式为：“01”-“09”和“1”“12”
验证一个月的31天：^((0?[1-9])|((1|2)[0-9])|30|31)$    正确格式为：01、09和1、31。
整数：^-?\d+$
非负浮点数（正浮点数 + 0）：^\d+(\.\d+)?$
正浮点数   ^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$
非正浮点数（负浮点数 + 0） ^((-\d+(\.\d+)?)|(0+(\.0+)?))$
负浮点数  ^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$
浮点数  ^(-?\d+)(\.\d+)?$

///////////////////////  就地编辑域  //////////////////////////
function EditInPlaceField(id, parent, value){
	this.id = id;
	this.parentElement = parent;
	this.value = value || 'default';

	this.createElements(this.id);
	this.attachEvents();
}

EditInPlaceField.prototype = {
	createElements: function(id){
		var create = function(ele){
			return document.createElement(ele);
		};
		this.containerElement = create('div');
		this.parentElement.appendChild(this.containerElement);

		var c = this.containerElement;
		this.staticElement = create('span');
		c.appendChild(this.staticElement);
		this.staticElement.innerHTML = this.value;

		this.fieldEle = create('input');
		this.fieldEle.type = 'text';
		this.fieldEle.value = this.value;
		c.appendChild(this.fieldEle);

		this.saveBtn = create('input');
		this.saveBtn.type = 'button';
		this.saveBtn.value = 'Save';
		c.appendChild(this.saveBtn);

		this.cancelBtn = create('input');
		this.cancelBtn.type = 'button';
		this.cancelBtn.text = 'Cancel';
		c.appendChild(this.cancelBtn);

		this.convertToText();
	},

	attachEvents: function(){
		var self = this;
		addEvent(this.staticElement, 'click', function(){
			self.convertToEditable();
		});
		addEvent(this.saveBtn, 'click', function(){
			self.save();
		});
		addEvent(this.cancelBtn, 'click', function(){
			self.cancel();
		});
	},

	convertToEditable: function(){
		this.staticElement.style.display = 'none';
		this.fieldEle.style.display = 'inline';
		this.saveBtn.style.display = 'inline';
		this.cancel.style.display = 'inline';

		this.setValue(this.value);
	},

	save: function(){
		this.value = this.getValue();
		var self = this;
		var callback = {
			success: function(){self.convertToText();},
			failure: function(){alert('Error saving value.');}
		};
		ajaxRequest('GET', 'save.php?id=' + encodeURIComponent(this.id) + '&value=' + encodeURIComponent(this.value), callback);
	},

	cancel: function(){
		this.convertToText();
	},

	convertToText: function(){
		this.fieldEle.style.display = 'none';
		this.saveBtn.style.display = 'none';
		this.cancel.style.display = 'none';
		this.staticElement.style.display = 'inline';

		this.setValue(this.value);
	},

	setValue: function(value){
		this.fieldEle.value = value;
		this.staticElement.innerHTML = value;
	},

	getValue: function(){
		return this.fieldEle.value;
	}
};




