/* javascript 数据类型 操作 */
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




