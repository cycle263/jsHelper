/* ######################  检测浏览器引擎和版本、平台、移动  ###################### */
var client = function(){
  //@@@@@@  定义相关对象  @@@@@@
	var engine = {  //浏览器引擎
		trident: 0,
		gecko: 0,
		webkit: 0,
		khtml: 0,
		opera: 0,  //引擎：presto
		ver: null  //完整的版本号
	};
	var browser = { //浏览器
		ie: 0,
		firefox: 0,
		konq: 0,
		opera: 0,
		chrome: 0,
		safari: 0,
		ver: null
	};
	var system = {
		win: false,
		mac: false,
		x11: false,
		//移动设备
		iphone: false,
		nokiaN: false,
		winMobile: false,
		macMoblie: false,
		//游戏系统
		wii: false,
		ps: false,
	};

	var ua = navigator.userAgent.toLowerCase();
	if(window.opera){	
		engine.ver = browser.ver = window.opera.version();
		engine.opera = browser.opera = parseFloat(engine.ver);
	}else if(/applewebkit\/([\d.]+)/.test(ua)){  //引擎webkit
		engine.ver = RegExp["$1"];
		engine.webkit = parseFloat(engine.ver);

		//确实是Chrome还是Safari
		if(/chrome\/([\d.]+)/.test(ua)){
			browser.ver = RegExp["$1"];
			browser.chrome = parseFloat(browser.ver);
		}else if(/version\/([\d.]+)/.test(ua)){
			browser.ver = RegExp["$1"];
			browser.safari = parseFloat(browser.ver);
		}else{
			//近似地确定版本号
			var safariVersion = 1;
			if(engine.webkit < 100){
				safariVersion = 1;
			}else if(engine.webkit <312){
				safariVersion = 1.2;
			}else if(engine.webkit < 412){
				safariVersion = 1.3;
			}else{
				safariVersion = 2;
			}
			browser.safari = browser.ver = safariVersion;
		}
	}else if(/khtml\/([\d.]+)/.test(ua) || /konqueror\/([^;]+)/.test(ua)){  //引擎KHTML
		engine.ver = browser.ver = RegExp("$1");
		engine.khtml =browser.konq = parseFloat(engine.ver);
	}else if(/rv:([^\)]+)\) gecko\/(\d{8})/.test(ua)){  //引擎gecko
		engine.ver = RegExp["$2"];
		engine.gecko = parseFloat(engine.ver);
		if(/firefox\/([\d.]+)/.test(ua)){
			browser.ver = RegExp["$1"];
			browser.firefox = parseFloat(browser.ver);
		}
	}else if(/msie ([\d.]+)/.test(ua)){   
		engine.ver = browser.ver = RegExp["$1"];
		engine.trident = browser.ie = parseFloat(browser.ver);
	}

	browser.ie = engine.trident;
	browser.opera = browser.opera;

	//@@@@@@  检查平台  @@@@@@	
	var p;
	if(browser.firefox != 0){
		p = navigator.oscpu.toLowerCase();
	}else{
		p = navigator.platform.toLowerCase();
	}
	system.win = p.indexOf("win") == 0;  //确定此字符串开头
	system.mac = p.indexOf("mac") == 0;
	system.x11 = (p.indexOf("linux") == 0) || (p.indexOf("x11") == 0);

	if(system.win){
		if(/win(?:dows)?\s?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
			if(RegExp["$1"] == "nt"){
				switch(RegExp["$2"]){
					case "5.0":
						system.win = "Windows 2000";
						break;
					case "5.1":
						system.win = "Windows XP";
						break;
					case "6.0":
						system.win = "Windows Vista";
						break;
					default:
						system.win = "Windows NT";
						break;
				}
			}else if(RegExp["$1"] == "9x"){
				system.win = "Windows ME";
			}else{
				system.win = RegExp["$1"];
			}
		}
	}

	//@@@@@@  移动设备  @@@@@@
	system.iphone = ua.indexOf("iphone") > -1;
	system.ipod = ua.indexOf("ipod") > -1;
	system.nokiaN = ua.indexOf("nokian") > -1;
	system.winMobile = (system.win == "ce");
	system.macMoblie = (system.iphone || system.ipod);
	//游戏系统
	system.wii = ua.indexOf("wii") > -1;
	system.ps = /playstation/i.test(ua);

	return{
		engine: engine,
		browser: browser,
		system: system
	};
}();


/* ######################  兼容浏览器的事件相关属性和方法  ###################### */
var eventUtil = {
	//@@@@@@  对象属性  @@@@@@
	addHandler: function(element, eventType, eventHandler){ 		//兼容版添加事件处理程序
		/*------------  更加简洁高效写法  ------------*/
		element.addEventListener ? element.addEventListener(eventType, eventHandler, false) :
		element.attachEvent ? element.attachEvent(("on" + eventType), eventHandler) : (element["on" + eventType] = eventHandler);
	},
	removeHandler: function(element, eventType, eventHandler){			//兼容版移除事件处理程序函数
		//易于阅读的写法
		if(element.removeEventListener){
			element.removeEventListener(eventType, eventHandler, false);
		}else if(element.detachEvent){	
			element.detachEvent(("on" + eventType), eventHandler);
		}else{			
			element["on" + eventType] = null;
		}
	},
	getEvent: function(event){				//兼容版获取事件对象
		return event ? event : window.event;
	},
	getTarget: function(event){				//兼容版获取事件目标对象
		return event.target || event.srcElement;
	},	
	getRelatedTarget: function(event){		//获取关联目标节点
		return event.relatedTarget ? event.relatedTarget : 
		event.fromElement ? event.fromElement : 
		event.toElement ? event.toElement : null;
	},
	getButton: function(event){
		if(document.implementation.hasFeature("MouseEvents", "2.0")){
			return event.button;
		}else{
			switch(event.button){
				case 0:
				case 1:
				case 3:
				case 5:
				case 7:
					return 0;
				case 2:
				case 6:
					return 2;
				case 4:
					return 1;
			}
		}
	},
	getCharCode: function(event){			//charCode字符按键的encode编码，keyCode非字符encode编码
		return typeof event.charCode == "number" ? event.charCode : event.keyCode;
	},
	getWheelDelta: function(event){		//滚轮
		return event.wheelDelta ? (client.engine.opera && client.browser.opera < 9.5 ? -event.wheelDelta :
			event.wheelDelta) : -event.detail * 40;
	},

	//@@@@@@  对象方法  @@@@@@
	preventDefault: function(event){		//兼容版阻止事件发生默认动作
		event.preventDefault ? event.preventDefault() : (event.returnValue = false);
	},
	stopPropagation: function(event){		//兼容版阻止事件发生捕获或冒泡的传播
		event.stopPropagation ? event.stopPropagation() : (event.returnValue = false);
	},
	getClipboardText: function(event){
		var clipboardData = event.clipboardData || window.clipboardData;
		return clipboardData.getData("text") || clipboardData.getData("text/plain");
	},
	setClipboardText: function(event, value){	//设置剪贴板数据
		 return event.clipboardData ? event.clipboardData.setData("text/plain", value) :
		window.clipboardData ? window.clipboardData.setData("text", value) : null;
	}
};
