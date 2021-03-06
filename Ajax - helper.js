/*---------------------------------------------------------------------*/
/*                         Start  【AJAX模块】                         */
/*---------------------------------------------------------------------*/

//设计模式版本AJAX请求
var SimpleHandler = function(){};
SimpleHandler.prototype = {
  request: function(type, url, callback, postVars){
		var xhr = this.createXhrObject();
		xhr.onreadystatechange = function(){
			if(xhr.readyState !== 4){return;}
			(xhr.status === 200 || xhr.status === 304) ? callback.success(xhr.responseText, xhr.responseXML) : 
				callback.failure(xhr.status);
		};
		xhr.open(type, url, true);
		if(type !== 'POST'){postVars = null;}
		xhr.send(postVars);
	},
	createXhrObject: function(){
		var methods = {
			function(){return new XMLHttpRequest();},
			function(){return new ActiveXObject('MSXML2.XMLHTTP.6.0')},
			function(){return new ActiveXObject('MSXML2.XMLHTTP.3.0')},
			function(){return new ActiveXObject('MSXML2.XMLHTTP')}
		};
		for(var i = 0, len = methods.length; i <  len; i++){
			try{
				methods[i]();
			}catch(e){
				continue;
			}
			this.createXhrObject = methods[i]();
			return methods[i]();
		}
		throw new Error('SimpleHandler: Could not create an XHR object.');
	}
};
var simpleAjax = new SimpleHandler();
var resHandler = {
	success: function(text, xml){
		var content = xml ? xml : text;
		//...
	},
	failure: function(status){
		throw new Error("Request failure: " + status);
	}
}
simpleAjax.request('GET', url, resHandler, null);

/* #############################  表单序列化函数  ############################ */

function getText(url, type, isAsy, callback){
	var req = new XMLHttpRequest();//省略...
	res.open(type, url, isAsy);
	req.onreadystatechange = function(){
		if(req.readyState === 4 && (req.status === 200 || req.status === 304)){
			var conType = req.getResponseHeader("Content-Type");
			if(conType.match(/^text/)){		//确保响应是文本
				callback(req.responseText);		//传给回调函数
			}
		}
	};
	req.send(null);
}

/******************************* Ajax模拟超时设置 *********************************/
var xhr = createXMLHttpRequest();
xhr.open("GET", url, true); // Server stuck in a loop.
var requestTimer = setTimeout(function() {
 	xhr.abort();     	
}, MAXIMUM_WAITING_TIME);

xhr.onreadystatechange = function() {
    if (xhr.readyState != 4)  { return; }
    clearTimeout(requestTimer);
    if (xhr.status != 200)  {	       
       	return;
	}
	var serverResponse = xhr.responseText;     
};
/**************************************************************************************/

//并发数控制

function startAjax(type, url, isAsy, id, callback){
	var xhr = new XMLHttpRequest(),
		MAX_NUM = 6,	//最大并发定义
		count = 0,		//并发数统计
		queue = [];		//等待队列
	xhr.Id = id;

	if(count > MAX_NUM){
		queue.push(xhr;
	}else{			
		sendRequest();	
	}

	function sendRequest(q){
		count++;	
		xhr = q ? q : xhr;	
		xhr.open(type, url, isAsy);
		xhr.onreadystatechange = bindcallback;		
		xhr.send(null);
	}

	function bindcallback(){
		if(xhr.readyState === 4){
			if(xhr.status === 200){
				callback(xhr);
				count--;
				if(queue.length){
					sendRequest(queue[0]);
					queue.shift();
				}
			}
		}
	}
}

/********************************* 可控并发Ajax方式 ************************************/
var XMLHttp = {
	_objPool: [],
	_getInstance: function() {
		for (var i = 0; i < this._objPool.length; i++) {
			if (this._objPool[i].readyState == 0 || this._objPool[i].readyState == 4) {
				return this._objPool[i];
			}
		}
		// IE5中不支持push方法
		this._objPool[this._objPool.length] = this._createObj();
		return this._objPool[this._objPool.length - 1];
	},
	_createObj: function() {
		if (window.XMLHttpRequest) {
			var objXMLHttp = new XMLHttpRequest();
		} else {
			var MSXML = ['MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP', 'Microsoft.XMLHTTP'];
			for (var n = 0; n < MSXML.length; n++) {
				try {
					var objXMLHttp = new ActiveXObject(MSXML[n]);
					break;
				} catch (e) {}
			}
		}
		// mozilla某些版本没有readyState属性
		if (objXMLHttp.readyState == null) {
			objXMLHttp.readyState = 0;
			objXMLHttp.addEventListener("load", function() {
				objXMLHttp.readyState = 4;
				if (typeof objXMLHttp.onreadystatechange == "function") {
					objXMLHttp.onreadystatechange();
				}
			}, false);
		}
		return objXMLHttp;
	},
	// 发送请求(方法[post,get], 地址, 数据, 回调函数)
	sendReq: function(method, url, data, callback) {
		var objXMLHttp = this._getInstance();
		with(objXMLHttp) {
			try {
				// 加随机数防止缓存
				if (url.indexOf("?") > 0) {
					url += "&randnum=" + Math.random();
				} else {
					url += "?randnum=" + Math.random();
				}
				open(method, url, true);
				// 设定请求编码方式
				setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
				send(data);
				onreadystatechange = function() {
					if (objXMLHttp.readyState == 4 && (objXMLHttp.status == 200 || objXMLHttp.status == 304)) {
						callback(objXMLHttp);
					}
				}
			} catch (e) {
				alert(e);
			}
		}
	}
};

//序列化表单
function formSerialize(form){
	var parts = new Array();
	var field = null;

	for(var i = 0, len = form.elements.length; i < len; ++i){
		field = form.elements[i];
		switch(field.type){
			case "select-one":
			case "select-multiple":
				for(var j = 0, optLen = field.options.length; j < optLen; ++j){
					var option = field.options[j];
					if(option.selected){
						var optValue = "";
						option.hasAttribute ? (optValue = (option.hasAttribute("value") ? option.value : option.text)) :   		//功能检测hasAttribute
											  (optValue = (option.attributes("value").specified ? option.value : option.text));
						parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));	//编码
					}
				}
				break;
			case undefined:
			case "file":
			case "submit":
			case "reset":
			case "button":
			case "fieldset": 		//IE中fieldset的type为undefined
				break;
			case "radio":
			case "checkbox":
				if(!field.checked){
					break;
				}
			default:
				parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
		}
	}
	return parts.join("&");
}

/* #############################  给URL添加编码后的查询字符串  ############################ */
function addQueryStringArg(url, name, value){
	url.indexOf("?") == -1 ? (url += "?") : (url +="&");
	url += encodeURIComponent(name) + "=" + encodeURIComponent(value);		//确保编码避免URL格式不对引发通信错误
	return url;
}

//序列化body ——> formEncoded
function paramForms(obj){
            var result = '';
            for(var i in obj){
                result += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]) + "&";
            }
            return result.substr(0,result.length-1).replace(/%20/g, '+');
        }

/* #############################  记录错误日志，以URL查询字符串方式，用image对象的src属性传递  ############################ */
function logError(sev, msg){
	var img = new Image();
	img.src = "log.pho?sev=" + encodeURIComponent(sev) + "&msg=" + encodeURIComponent(msg);
}

//IE 创建xml Dom对象 函数
function createDocument() {
    if (typeof arguments.callee.activeXString != "string") {
        var versions = ["MSXML2.DOMDocument.6.0", "MSXML2.DOMDocument.3.0", "MSXML2.DOMDocument"],
            i, len;
        for (i = 0, len = versions.length; i < len; i++) {
            try {
                var xmldom = new ActiveXObject(versions[i]);
                arguments.callee.activeXString = versions[i];
                return xmldom;
            } catch (ex) {
                //跳过
            }
        }
    }
    return new ActiveXObject(arguments.callee.activeXString);
}

//解析xml文档 —— 兼容版
function parserXml(xml){
	var xmldom = null
	if(typeof DOMParser != "undefined"){
		xmldom = (new DOMParser()).parseFromString(xml, "text/xml");
		var errors = xmldom.getElementsByTagName("parsererror");
		if(errors.length != 0){
			throw new Error("XML parsing error: " + errors[0].textContent);
		}
	}else if(document.implementation.hasFeature("LS", "3.0")){
		var implementation = document.implementation;
		var parser = implementation.createLSParser(implementation.MODE_SYNCHRONOUS, null);
		var input = implementation.createLSInput();
		input.stringData = xml;
		xmldom = parser.parse(input);
	}else if(typeof ActiveXObject != "undefined"){
		xmldom = createDocument();
		xmldom.loadXML(xml);
		if(xmldom.parseError != 0){
				throw new Error("XML parsing error: " + xmldom.parseError);
		}else{
			throw new Error("No XML parser available");
		}					
	}
	return xmldom;
}

var xmldom = null;
try{
	xmldom = parserXml("<node><child/></node>");
}catch(error){
	alert(error.message);
}
alert(xmldom.documentElement.firstChild.tagName);

//*********************   序列化xml —— 兼容版    **********************************/
function serializeXML(xmldom){
	if(typeof XMLSerializer != "undefined"){
		return (new XMLSerializer()).serializeToString(xmldom);
	}else if(document.implementation.hasFeature("LS", "3.0")){
		var imple = document.implementation;
		var serializer = imple.createLSSerializer();
		return serialize.writeToString(xmldom);
	}else if(typeof xmldom.xml != "undefined"){
		return xmldom.xml;
	}else{
		throw new Error("Could not serialize XML DOM.");
	}
}

var xml = serializeXML(xmldom);
alert(xml);

/* #############################  创建XHR兼容版包含IE6  ############################ */
function createXHR(){
	if(typeof XMLHttpRequest != "undefined"){
		createXHR = function(){
			return new XMLHttpRequest();
		};		
	}else if(typeof ActiveXObject != "undefined"){		
		var vers = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
		for(var i = 0, len = vers.length; i < len; i++){
			try{
				var xhr = new ActiveXObject(vers[i]);				
				return xhr;
			}catch (ex){
				//...
			}
		}		
	}else{
		throw new Error("No XHR object available.");
	}
}

var xhr = createXHR();
xhr.onreadystatechange = readyStateHandler;
xhr.open("get", "example.txt", false);
xhr.setRequestHeader("MyHeader", "MyValue");
xhr.send(null);
function readyStateHandler(){		//请求/响应过程的当前活动阶段
	if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
		alert(xhr.statusText);
	}else{
		alert("Request was unsuccessful: " + xhr.status);
	}
}

/* #############################  URL中添加查询字符串的标准方法  ############################ */
function addURLParam(url, name, value){
	url += (url.indexOf("?") == -1 ? "?" : " & ");
	url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
	return url;
}

/* #############################  提交表单数据——表单数据序列化  ############################ */
function submitData(){
	var xhr = createXHR();
	xhr.onreadystatechange = readyStateHandler;
	function readyStateHandler(){		//请求/响应过程的当前活动阶段
		try{
			if(xhr.readyState == 4){
				if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
					alert(xhr.statusText);
				}else{
					alert("Request was unsuccessful: " + xhr.status);
				}
			}
		}catch(ex){
			//...
		}
	}

	xhr.open("post", "postexample.php", true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencode");
	var form = document.getElementById("form");
	xhr.send(serialize(form));
}

//    响应进度 目前只有firefox支持
var xhr = createXHR();
xhr.onload = function(event){
	if((xhr.status >= 200 && xhr.status <300) || xhr.status == 304){
		alert(xhr.responseText);
	}else{
		alert("Request was unsuccessful: " + xhr.status);
	}
};
xhr.onprogress = function(event){
	var divStatus = document.getElementById("status");
	divStatus.innerHTML = "Received " + event.position + " of " + event.totalSize + " bytes";
};
xhr.open("get", "altevents.php", true);
xhr.send(null);


//跨浏览器JSON序列化stringify
// implement JSON.stringify serialization
JSON.stringify = JSON.stringify || function (obj) {
	var t = typeof (obj);
	if (t != "object" || obj === null) {
		// simple data type
		if (t == "string") obj = '"'+obj+'"';
		return String(obj);
	}
	else {
		// recurse array or object
		var n, v, json = [], arr = (obj && obj.constructor == Array);
		for (n in obj) {
			v = obj[n]; t = typeof(v);
			if (t == "string") v = '"'+v+'"';
			else if (t == "object" && v !== null) v = JSON.stringify(v);
			json.push((arr ? "" : '"' + n + '":') + String(v));
		}
		return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
	}
};


/*########################## PPK版的Ajax ###########################*/
function sendRequest(url,callback,postData) {
	var req = createXMLHTTPObject();
	if (!req) return;
	var method = (postData) ? "POST" : "GET";
	req.open(method,url,true);
	req.setRequestHeader('User-Agent','XMLHTTP/1.0');
	req.page = url;
	if (postData)
		req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	req.onreadystatechange = function () {
		if (req.readyState != 4) return;
		if (req.status != 200 && req.status != 304) {
		//	alert('HTTP error ' + req.status);
			return;
		}
		callback(req);
	}
	if (req.readyState == 4) return;
	req.send(postData);
}

function XMLHttpFactories() {
	return [
		function () {return new XMLHttpRequest()},
		function () {return new ActiveXObject("Msxml6.XMLHTTP")},
		function () {return new ActiveXObject("Msxml3.XMLHTTP")},
		function () {return new ActiveXObject("Microsoft.XMLHTTP")}
	];
}

function createXMLHTTPObject() {
	var xmlhttp = false;
	var factories = XMLHttpFactories();
	for (var i=0;i<factories.length;i++) {
		try {
			xmlhttp = factories[i]();
		}
		catch (e) {
			continue;
		}
		break;
	}
	return xmlhttp;
}


/*---------------------------------------------------------------------*/
/*                         End  【AJAX模块】                           */
/*---------------------------------------------------------------------*/
