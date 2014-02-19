/* #############################  获取元素框的坐标  ############################ */
var coord = {
	getX: function(element){
		var actualLeft = element.offsetLeft;
			var current = element.offsetParent;
			while (current !== null){
				actualLeft += current.offsetLeft;
				current = current.offsetParent;
			}
			return actualLeft;
	},
	getY: function(element){
			var actualTop = element.offsetTop;
			var current = element.offsetParent;
			while (current !== null){
				actualTop += current.offsetTop;
				current = current.offsetParent;
			}
			return actualTop;
	},
};

function getRectCoord(ele){
	var scrollTop = document.documentElement.scrollTop;
	var scrollLeft = document.documentElement.scrollLeft;
	if(ele.getBoundingClientRect){
		if(typeof arguments.callee.offset != "number"){
			var temp = document.createElement("div");
			temp.style.cssText = "positon:absolute;left:0;top:0;";
			document.body.appendChild(temp);
			arguments.callee.offset = -temp.getBoundingClientRect().top - scrollTop;
			document.body.removeChild(temp);
			temp = null;
		}

		var rect = element.getBoundingClientRect();
		var offset = arguments.callee.offset;

		return{
			left: rect.left + offset,
			right: rect.right + offset,
			top: rect.top + offset,
			bottom: rect.bottom + offset
		};
	}else{
		var actualLeft = getElementLeft(ele);
		var actualTop = getElementTop(ele);

		return{
			left: actualLeft - scrollLeft,
			right: actualLeft - scrollLeft + ele.offsetWidth,
			top: actualTop- scrollTop,
			bottom: actualTop - scrollTop + ele.offsetHeigth
		}
	}
}




/*---------------------------------------------------------------------*/
/*                         Start  【Tween公式】                           */
/*---------------------------------------------------------------------*/

//修正版少参数版
var Ease = {
	QuadIn: function(p){
		return Math.pow(p, 2);
	},
	QuadOut: function(p){
		return -(Math.pow((p-1), 2) -1);
	},
	QuadInOut: function(p){
		if ((p/=0.5) < 1) return 0.5*Math.pow(p,2);
		return -0.5 * ((p-=2)*p - 2);
	},
	CubicIn: function(p){
		return Math.pow(p, 3);
	},
	CubicOut: function(p){
		return (Math.pow((p-1), 3) +1);
	},
	CubicInOut: function(p){
		if ((p/=0.5) < 1) return 0.5*Math.pow(p,3);
		return 0.5 * (Math.pow((p-2),3) + 2);
	},
	QuartIn: function(p){
		return Math.pow(p, 4);
	},
	QuartOut: function(p){
		return -(Math.pow((p-1), 4) -1)
	},
	QuartInOut: function(p){
		if ((p/=0.5) < 1) return 0.5*Math.pow(p,4);
		return -0.5 * ((p-=2)*Math.pow(p,3) - 2);
	},
	QuintIn: function(p){
		return Math.pow(p, 5);
	},
	QuintOut: function(p){
		return (Math.pow((p-1), 5) +1);
	},
	QuintInOut: function(p){
		if ((p/=0.5) < 1) return 0.5*Math.pow(p,5);
		return 0.5 * (Math.pow((p-2),5) + 2);
	},
	SineIn: function(p){
		return -Math.cos(p * (Math.PI/2)) + 1;
	},
	SineOut: function(p){
		return Math.sin(p * (Math.PI/2));
	},
	SineInOut: function(p){
		return (-.5 * (Math.cos(Math.PI*p) -1));
	},

	ExpoIn: function(p){
		return (p==0) ? 0 : Math.pow(2, 10 * (p - 1));
	},
	ExpoOut: function(p){
		return (p==1) ? 1 : -Math.pow(2, -10 * p) + 1;
	},
	ExpoInOut: function(p){
		if(p==0) return 0;
		if(p==1) return 1;
		if((p/=0.5) < 1) return 0.5 * Math.pow(2,10 * (p-1));
		return 0.5 * (-Math.pow(2, -10 * --p) + 2);
	},
	CircIn: function(p){
		return -(Math.sqrt(1 - (p*p)) - 1);
	},
	CircOut: function(p){
		return Math.sqrt(1 - Math.pow((p-1), 2))
	},
	CircInOut: function(p){
		if((p/=0.5) < 1) return -0.5 * (Math.sqrt(1 - p*p) - 1);
		return 0.5 * (Math.sqrt(1 - (p-=2)*p) + 1);
	},
	BackIn: function(p) {
		var s = 1.70158;
		return p*p*((s+1)*p - s);
	},
	BackOut: function(p) {
		var s = 1.70158;
		return (p-=1)*p*((s+1)*p + s) + 1;
	},
	BackInOut: function(p) {
		var s = 1.70158;
		return ((p/=0.5) < 1) ? 0.5*(p*p*(((s*=(1.525))+1)*p - s)) : 0.5*((p-=2)*p*(((s*=(1.525))+1)*p + s) + 2);
	},	
	BounceOut: function(p){
		if ((p) < (1/2.75)) {
			return (7.5625*p*p);
		} else if (p < (2/2.75)) {
			return (7.5625*(p-=(1.5/2.75))*p + .75);
		} else if (p < (2.5/2.75)) {
			return (7.5625*(p-=(2.25/2.75))*p + .9375);
		} else {
			return (7.5625*(p-=(2.625/2.75))*p + .984375);
		}
	},
	BouncePast: function(p) {
		if (p < (1/2.75)) {
			return (7.5625*p*p);
		} else if (p < (2/2.75)) {
			return 2 - (7.5625*(p-=(1.5/2.75))*p + .75);
		} else if (p < (2.5/2.75)) {
			return 2 - (7.5625*(p-=(2.25/2.75))*p + .9375);
		} else {
			return 2 - (7.5625*(p-=(2.625/2.75))*p + .984375);
		}
	},
	FromTo: function(p) {
		if ((p/=0.5) < 1) return 0.5*Math.pow(p,4);
		return -0.5 * ((p-=2)*Math.pow(p,3) - 2);
	},
	From: function(p) {
		return Math.pow(p,4);
	},
	To: function(p) {
		return Math.pow(p,0.25);
	},
	Linear:  function(p) {
		return p
	},
	Sinusoidal: function(p) {
		return (-Math.cos(p*Math.PI)/2) + 0.5;
	},
	Reverse: function(p) {
		return 1 - p;
	},
	Mirror: function(p, ts) {
		ts = ts || Tween.Sinusoidal;
		if(p<0.5)
			return ts(p*2);
		else
			return ts(1-(p-0.5)*2);
	},
	Flicker: function(p) {
		var p = p + (Math.random()-0.5)/5;
		return Tween.Sinusoidal(p < 0 ? 0 : p > 1 ? 1 : p);
	},
	Wobble: function(p) {
		return (-Math.cos(p*Math.PI*(9*p))/2) + 0.5;
	},
	Pulse: function(p, pulses) {
		return (-Math.cos((p*((pulses||5)-.5)*2)*Math.PI)/2) + .5;
	},
	Blink: function(p, blinks) {
		return Math.round(p*(blinks||5)) % 2;
	},
	Spring: function(p) {
		return 1 - (Math.cos(p * 4.5 * Math.PI) * Math.exp(-p * 6));
	},
	Elastic: function(p) {
		return -1 * Math.pow(4,-8*p) * Math.sin((p*6-1)*(2*Math.PI)/2) + 1;
	},	
	None: function(p){
		return 0
	},
	Full: function(p){
		return 1
	}
}




//原版多参数
var Tween = {
	  Linear: function(t,b,c,d){ return c*t/d + b; },
	  //平方
	  QuadIn: function(t,b,c,d){
		return c*(t/=d)*t + b;
	  },
	  QuadOut: function(t,b,c,d){
		return -c *(t/=d)*(t-2) + b;
	  },
	  QuadInOut: function(t,b,c,d){
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	  },
	  //立方
	  CubicIn: function(t,b,c,d){
		return c*(t/=d)*t*t + b;
	  },
	  CubicOut: function(t,b,c,d){
		return c*((t=t/d-1)*t*t + 1) + b;
	  },
	  CubicInOut: function(t,b,c,d){
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	  },
	  //四次方
	  QuartIn: function(t,b,c,d){
		return c*(t/=d)*t*t*t + b;
	  },
	  QuartOut: function(t,b,c,d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	  },
	  QuartInOut: function(t,b,c,d){
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	  },
	  //五次方
	  QuintIn: function(t,b,c,d){
		return c*(t/=d)*t*t*t*t + b;
	  },
	  QuintOut: function(t,b,c,d){
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	  },
	  QuintInOut: function(t,b,c,d){
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	  },
	  //sin
	  SineIn: function(t,b,c,d){
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	  },
	  SineOut: function(t,b,c,d){
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	  },
	  SineInOut: function(t,b,c,d){
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	  },
	  ExpoIn: function(t,b,c,d){
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	  },
	  ExpoOut: function(t,b,c,d){
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	  },
	  ExpoInOut: function(t,b,c,d){
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	  },
	  CircIn: function(t,b,c,d){
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	  },
	  CircOut: function(t,b,c,d){
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	  },
	  CircInOut: function(t,b,c,d){
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	  },
	//橡皮筋
	  ElasticIn: function(t,b,c,d,a,p){
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	  },
	  ElasticOut: function(t,b,c,d,a,p){
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
	  },
	  ElasticInOut: function(t,b,c,d,a,p){
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	  },
	
	  BackIn: function(t,b,c,d,s){
		s = 1.70158 || s;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	  },
	  BackOut: function(t,b,c,d,s){
		s = 1.70158 || s;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	  },
	  BackInOut: function(t,b,c,d,s){
		s = 1.70158 || s;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	  },
	//反弹
	  BounceIn: function(t,b,c,d){
		return c - Ease.BounceOut(d-t, 0, c, d) + b;
	  },
	  BounceOut: function(t,b,c,d){
		if ((t/=d) < (1/2.75)) {
		  return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
		  return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
		  return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
		  return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	  },
	  BounceInOut: function(t,b,c,d){
		if (t < d/2) return Ease.BounceIn(t*2, 0, c, d) * .5 + b;
		else return Ease.BounceOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
	  },
}


/*---------------------------------------------------------------------*/
/*                         End  【Tween公式】                           */
/*---------------------------------------------------------------------*/



/*************************************************************************************/
/*************************************************************************************/
/*************************************************************************************/
/*************************************************************************************/

/////////////////////////////  js淡入淡出  ////////////////////////////////////
function bind(fn, context){
	var args = Array.prototype.slice.call(arguments, 2);
	return function(){
		var innerArgs = Array.prototype.slice.call(arguments);
		var finalArgs = args.concat(innerArgs);
		return fn.apply(context, finalArgs);
	};
}
var addEvent = function(ele, event, fn){
	ele.addEventListener ? ele.addEventListener(event, fn, false) :
	ele.attachEvent ? ele.attachEvent("on" + event, fn) : (ele["on" + event] = fn);
};
var animation = {
	config: {
		interval: 17,
		show: true,
		distance: 0,
		distanceW: 0				
	},
	calculate: function(strSpeed, height, width){
		var speed = this.speedFn(strSpeed),
			i = this.config.interval;
		return typeof height === "undefined" && typeof width === "undefined" ?
		{
			frames: (speed - 0) / i,
			step: i / (speed - 0)
		} : {
			frames: (speed - 0) / i,
			step: i * height / (speed - 0),
			stepw: i * width / (speed - 0)
		}
	},
	trim: function(str){
		//return str.replace(/^\s*/, '').replace(/\s*$/, '');
		return str.replace(/^\s*|\s*$/, '');
	},
	speedFn: function(strSpeed){
		strSpeed = (this.trim(strSpeed)).toLowerCase();
		switch(strSpeed){
			case "fastest":
				return 400;
			case "faster":
				return 500;
			case "fast":
				return 600;
			case "normal":
				return 700;
			case "slow":
				return 800;
			case "slower":
				return 900;
			case "slowest":
				return 1000;
			case "debug":
				return 2000;
			default:
				return 500;
		}
	},
	fadeOut: function(ele, strSpeed){					
		var count = 0, c = this.config, s = ele.style,
			m$ = this.calculate(strSpeed);
		ele.currentStyle ? (s.filter = "alpha(opacity=100)") : s.opacity = 1;

		try{
			setTimeout(function(){
				count++;
				if(count > m$.frames){							
					ele.currentStyle ? (s.filter = "alpha(opacity=0)") : s.opacity = 0;
				}else{
					if(!ele.currentStyle){
						s.opacity -= m$.step;
					}else{
						var f = parseFloat(ele.currentStyle.filter.match(/\d+/).toString());
						f -= m$.step * 100;
						s.filter = "alpha(opacity=" + f + ")";
					}
					setTimeout(arguments.callee, c.interval);
				}
			}, c.interval); 
		}catch(ex){
			console.log("fadeOut error, " + ex.message);
		}
		c.show = false;
	},
	fadeIn: function(ele, strSpeed){
		var count = 0, c = this.config, s = ele.style,
			m$ = this.calculate(strSpeed);
		ele.currentStyle ? (s.filter = "alpha(opacity=0)") : s.opacity = 0;

		try{
			setTimeout(function(){
				count++;
				if(count > m$.frames){							
					ele.currentStyle ? (s.filter = "alpha(opacity=100)") : s.opacity = 1;
				}else{
					if(ele.currentStyle){
						var f = parseFloat(ele.currentStyle.filter.match(/\d+/).toString());
						f += m$.step * 100;
						s.filter = "alpha(opacity=" + f + ")";
					}else{
						s.opacity = parseFloat(s.opacity) + m$.step;
					}
					setTimeout(arguments.callee, c.interval);
				} 
			}, c.interval); 
		}catch(ex){
			console.log("fadeIn error, " + ex.message);
		}
		c.show = true;
	},
	fadeToggle: function(ele, strSpeed){
		var self = this;
		setTimeout(function(){						
			self.config.show ? self.fadeOut(ele, strSpeed) : self.fadeIn(ele, strSpeed);
		}, 0);
	},
	slideOut: function(ele, strSpeed){
		var count = 0, u = "px", s = ele.style,
			c = this.config, cs = window.getComputedStyle ? window.getComputedStyle(ele) : ele.currentStyle,
			h = s.height = c.distance = parseFloat(cs["height"]),
			w = s.width = c.distanceW = parseFloat(cs["width"]);

		try{
			var	m$ = this.calculate(strSpeed, h, w);
			setTimeout(function(){
				count++;
				if(count > m$.frames || parseFloat(s.width) < m$.stepw || parseFloat(s.height) < m$.step){
					s.height = 0;
					s.width = 0;
				}else{
					s.height = (parseFloat(s.height) - m$.step) + u;
					s.width = (parseFloat(s.width) - m$.stepw) + u;
					setTimeout(arguments.callee, c.interval);
				}
			}, c.interval); 
		}catch(ex)
		{
			console.log("slideOut error, " + ex.message);
		}
		c.show = false;
	},
	slideIn: function(ele, strSpeed){
		var count = 0, u = "px", s = ele.style,
			c = this.config, cs = window.getComputedStyle ? window.getComputedStyle(ele) : ele.currentStyle,
			h = c.distance,
			w = c.distanceW;
		try{
			var	m$ = this.calculate(strSpeed, h, w);
			setTimeout(function(){
				count++;
				if(count > m$.frames || parseFloat(s.width) > c.distanceW || parseFloat(s.height) > c.distance){							
					s.height = c.distance + u;
					s.width = c.distanceW + u;
				}else{
					s.height = (parseFloat(s.height) + m$.step) + u;
					s.width = (parseFloat(s.width) + m$.stepw) + u;
					setTimeout(arguments.callee, c.interval);
				}
			}, c.interval);
		}catch(ex){
			console.log("slideOut error, " + ex.message);
		}
		c.show = true; 
	},
	slideToggle: function(ele, strSpeed){
		this.config.show ? this.slideOut(ele, strSpeed) : this.slideIn(ele, strSpeed);
	}
};

addEvent(btn, "click", bind(animation.fadeToggle, animation, ul, "normal"));


function EventTarget(){			//自定义事件
	this.handlers = {};
}

EventTarget.prototype = {
	constructor: EventTarget,
	addHandler: function(type, handler){		//添加事件处理程序
		typeof this.handlers[type] == "undefined" && (this.handlers[type] = []);
		this.handlers[type].push(handler);
	},
	fire: function(event){						//触发事件
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
		}
	}
};

/*************************************************************************************/
							/*  拖放模块  */
/*************************************************************************************/
(function(){
	var addEvent = function(ele, event, fn){
		ele.addEventListener ? ele.addEventListener(event, fn, false) :
		ele.attachEvent ? ele.attachEvent("on" + event, fn) : (ele["on" + event] = fn);
	};
	var removeEvent = function(e, event, fn){	
		if(e.removeEventListener){
			e.removeEventListener(event, fn, false);
		}else if(e.detachEvent){	
			e.detachEvent(("on" + event), fn);
		}else{			
			e["on" + event] = null;
		}
	};

	var dragDrop = (function(){			//拖放模块
		var dragging = null,
			diffX = 0, diffY = 0;
			ddEvent = new EventTarget();

		function handleEvent(event){
			event = event || window.event;
			var target = event.target || event.srcElement;
			switch(event.type){
				case "mousedown":
					if(target.className.indexOf("draggable") > -1){
						dragging = target;
						diffX = event.clientX - div.offsetLeft;
						diffY = event.clientY - div.offsetTop;
						ddEvent.fire({type: "dragstart", target: dragging, x: div.style.left, y: div.style.top});
					}
					break;
				case "mousemove":
					if(dragging !== null){
						event = event || window.event;
						throttle(dragFn, null, event, diffX, diffY, dragging);
						ddEvent.fire({type: "drag", target: dragging, x: div.style.left, y: div.style.top});
					}
					break;
				case "mouseup":							
					ddEvent.fire({type: "dragend", target: dragging, x: div.style.left, y: div.style.top});
					dragging = null;
					break;
			}
		}
		ddEvent.enable = function(){
				addEvent(document, "mousedown", handleEvent);
				addEvent(document, "mousemove", handleEvent);
				addEvent(document, "mouseup", handleEvent);
		};
		ddEvent.disable = function(){
				removeEvent(document, "mousedown", handleEvent);
				removeEvent(document, "mousemove", handleEvent);
				removeEvent(document, "mouseup", handleEvent);
		};	
		return ddEvent;		
	})();

	dragDrop.enable();

	dragDrop.addHandler("dragstart", function(e){
		status.innerHTML = "Started dragging " + e.target.id;
	});
	dragDrop.addHandler("drag", function(e){
		status.innerHTML = "<br /> Dragged " + e.target.id + " to (" + e.x + ", " + e.y + ")";
	});
	dragDrop.addHandler("dragend", function(e){
		status.innerHTML += "<br /> Dropped " + e.target.id + " at (" + e.x + ", " + e.y + ")";
	});

	function dragFn(e, x, y, ele){
		var w = window, d = document, de = d.documentElement, g = d.getElementsByTagName('body')[0],
			pw = w.innerWidth || de.clientWidth || g.clientWidth, 
			ph = w.innerHeight || de.clientHeight || g.clientHeight,
			ew = w.getComputedStyle ? parseInt(w.getComputedStyle(div).width) : parseInt(ele.currentStyle.width);
			eh = w.getComputedStyle ? parseInt(w.getComputedStyle(div).height) : parseInt(ele.currentStyle.height);

		div.style.left = (e.clientX >= x && e.clientX < (pw - ew + x)) ? ((e.clientX - x) + 'px') :
							e.clientX >= (pw - ew + x) ? pw - ew : 0;
		div.style.top = (e.clientY > y && e.clientY < (ph - eh + y)) ? ((e.clientY - y) + 'px') :
							e.clientY >= (ph - eh + y) ? ph - eh : 0;
		div.innerHTML = "(" + div.style.left + ", " + div.style.top + ")";				
	}			

	function throttle(method, context, arg, x, y, ele){
		clearTimeout(method.tId);
		method.tId = setTimeout(function(){
			method.call(context, arg, x, y, ele);
		}, 0);
	}
})();


/*************************************************************************************/


/*************************************************************************************/
//////////////////      计时器动态修改      //////////////////
var counter = 10;
var myFunction = function(){
    clearInterval(interval);
    counter += 10;
    console.log(counter);
    interval = setInterval(myFunction, counter);
}
var interval = setInterval(myFunction, counter);

/*-------------------------------------------------*/
var setVariableInterval = function(callbackFunc, timing){
	var that = this;
	var variableInterval = {
		interval: timing,
		callback: callbackFunc,
		stopped: false,
		selt: this,
		runLoop: function(){
			if(variableInterval.stopped){return;}
			var result = variableInterval.callback.call(variableInterval);
			if(typeof result == 'number'){
				if(result === 0){return;}
				variableInterval.interval = result;
			}
			variableInterval.loop();
		},
		stop: function(){
			this.stopped = true;
			window.clearTimeout(this.timer);
		},
		start: function(){
			this.stopped = false;
			return this.loop();
		},
		loop: function(){
			this.timer = setTimeout(variableInterval.runLoop, variableInterval.interval);
			return this;
		}
	};
	return variableInterval.start();
};

//Example use
var vi = setVariableInterval(function() {  
	var interval = this.interval;
	console.log(interval);

	if (interval > 4000){this.stop()};
	return interval + 100;
}, 200);  

setTimeout(function() {
  	vi.interval = 350;
}, 1000);

setTimeout(function() {
  	vi.interval = 100;
  	vi.start();
}, 600);

/*-------------------------------------------------------------*/
function setDeceleratingTimeout(callback, factor, times){	//times - 次数    factor减速因子
	var internalCallback = (function(t, counter){
		return function(){
			if(--t > 0){
				setTimeout(internalCallback, ++counter + factor);
				callback();
			}
		};
	})(times, 10);

	setTimeout(internalCallback, factor);
}

setDeceleratingTimeout(function(){
	console.log('hi');
}, 5, 100);
