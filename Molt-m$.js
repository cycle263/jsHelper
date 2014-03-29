/*---------------------------------------------------------------------*/
/* ---------------------   Start   【Molt框架原型】 -----------------  */
/* ---------------------   Time	   【2012.12】      -----------------  */
/* ---------------------   Author  【Cycle】        -----------------  */
/*---------------------------------------------------------------------*/

/*** 链式写法 ***/

(function(){
	function _m$(els){
		this.elements = [];
		for(var i = 0, len = els.length; i < len; ++i){
			var element = els[i];
			if(Object.prototype.toString.call(element).slice(8, -1) === 'String'){
				if(element.indexOf('#') > -1){
					element = document.getElementById(element);
				}else if(element.indexOf('.') > -1){
					if(document.getElementsByClassName != undefined){
						this.elements = document.getElementsByClassName(element);
						return;
					}
				}else{
					this.elements = document.getElementsByTagName(element);
					return;
				}
			}
			this.elements.push(element);		//可以传入window对象
		}
	}
	
	//增加javascript原生方法
	//1、增加函数方法method   2、扩展extend   3、4、5、
	Function.prototype.method = function(name, fn){
  		this.prototype[name] = fn;
		return this;
	};
		
	//公共方法
	//1、each		2、
	_m$.method('each', function(fn){
			for(var i = 0, len = this.elements.length; i < len; ++i){
				fn.call(this, this.elements[i]);
			}
			return this;
		});

	//CSS操作
	//1、设置样式		2、隐藏			3、块化			4、获取样式
	_m$.method('setStyle', function(prop, val){
			this.each(function(el){
				el.style[prop] = val;
			});
			return this;
		}).method('hidden', function(){
			var that = this;
			this.each(function(el){
				that.setStyle('display', 'none');
			});
			return this;
		}).method('show', function(){
			var that = this;
			this.each(function(el){
				that.setStyle('display', 'block');
			});
			return this;
		}).method('getStyle', function(prop, callback){		//不用回调函数
			this.each(function(el){
				if(window.getComputedStyle){
					callback(window.getComputedStyle(prop));
				}else if(el.currentStyle){
					callback(el.currentStyle[prop]);
				}
			});	
			return this;		
		});

	//事件操作
	//1、添加事件		2、移除事件
	_m$.method('addEvent', function(type, fn){
			var add = function(el){
				if(window.addEventListener){
					el.addEventListener(type, fn, false);
				}else if(window.attachEvent){
					el.attachEvent('on' + type, fn);
				}else{
					el['on' + type] = fn;
				}
			};
			this.each(function(el){
				add(el);
			});
			return this;
		}).method('removeEvent', function(type, fn){
			var remove = function(el){
				if(window.removeEventListener){
					el.removeEventListener(type, fn, false);
				}else if(window.detachEvent){
					el.detachEvent('on' + type, fn);
				}else{
					el['on' + type] = null;
				}
			};
			this.each(function(el){
				remove(el);
			});
			return this;
		})；
	//DOM操作
	//1、添加class	 	2、移除class		3、替换class		4、是否有class
	_m$.method('addClass', function(class){
		this.each(function(el){
			var n = el.className;
			el.className = n ? n + ' ' + class : class;
		});	
		return this;
	}).method('removeClass', function(class){
		this.each(function(el){
			var arr = el.className.split(' ');
			for(var i = 0, len = arr.length; i < len; i++){
				if(arr[i] == class){arr.splice(i, 1);}
			}
			el.className = arr.join(' ');
		});	
		return this;
	}).method('replaceClass', function(class, newClass){
		this.each(function(el){
			var arr = el.className.split(' ');
			for(var i = 0, len = arr.length; i < len; i++){
				if(arr[i] == class){arr.splice(i, 1, newClass);}
			}
			el.className = arr.join(' ');
		});
		return this;
	}).method('hasClass', function(class){				//有返回值，用回调函数
		this.each(function(el, callback){
			var arr = el.className.split(' ');
			for(var i = 0, len = arr.length; i < len; i++){
				if(arr[i] == class){callback.call(this, true);}
			}
			callback.call(this, false);			
		});
		return this;
	}).method('toggleClass', function(class){
		this.each(function(el){
			var arr = el.className.split(' '), has = false;
			for(var i = 0, len = arr.length; i < len; i++){
				if(arr[i] == class){has = true;}
			}
			if(has){
				arr.splice(i, 1);
				el.className = arr.join(' ');
			}else{
				var n = el.className;
				el.className = n ? n + ' ' + class : class;
			} 			
		});
	});
	
	//元素属性操作
	//1、添加属性   2、3、4、

	//缓存操作
	//1、Cookie   2、Session   3、4、

	//ajax操作
	//1、	2、3、


	window.installHelper = function(scope, interface){
		scope[interface] = function(){
			return new _m$(arguments);
		};
	};




	/********************** 非链式写法 ***********************/
	_m$.prototype = {
		each: function(fn){
			for(var i = 0, len = this.elements.length; i < len; ++i){
				fn.call(this, this.elements[i]);
			}
			return this;
		},
		setStyle: function(prop, val){
			this.each(function(el){
				el.style[prop] = val;
			});
			return this;
		},
		show: function(){
			var that = this;
			this.each(function(el){
				that.setStyle('display', 'block');
			});
			return this;
		},
		addEvent: function(type, fn){
			var add = function(el){
				if(window.addEventListener){
					el.addEventListener(type, fn, false);
				}else if(window.attachEvent){
					el.attachEvent('on' + type, fn);
				}
			};
			this.each(function(el){
				add(el);
			});
			return this;
		}
	};

	window.m$ = function(){
		return new _m$(arguments);
	};
})();

/*---------------------------------------------------------------------*/
/*                         End  【Molt框架原型】                       */
/*---------------------------------------------------------------------*/


/*************************** $m精简版 **********************/
function _m$(el) {
	this.ele = document.getElementById(el);
}
_m$.prototype = {
	addClass: function(class1) {
		var n = this.ele.className;
		this.ele.className = n ? n + ' ' + class1 : class1;
		return this;
	},
	replaceClass: function(class1, newClass) {
		var arr = this.ele.className.split(' ');
		for (var i = 0, len = arr.length; i < len; i++) {
			arr[i] == class1 && arr.splice(i, 1, newClass);
		}
		this.ele.className = arr.join(' ');
		return this;
	},
	removeClass: function(class1) {
		var arr = this.ele.className.split(' ');
		for (var i = 0, len = arr.length; i < len; i++) {
			arr[i] == class1 && arr.splice(i, 1);
		}
		this.ele.className = arr.join(' ');
		return this;
	},
	toggleClass: function(class1){
		var arr = this.el.className.split(' '), has = false;
		for (var i = 0, len = arr.length; i < len; i++) {
			if (arr[i] == class1) {
				has = true;
			}
		}
		if (has) {
			arr.splice(i, 1);
			this.el.className = arr.join(' ');
		} else {
			var n = this.el.className;
			this.el.className = n ? n + ' ' + class1 : class1;
		}
		return this;
	},
	addEvent: function(type, fn) {
		if (window.addEventListener) {
			this.ele.addEventListener(type, fn, false);
		} else if (window.attachEvent) {
			this.ele.attachEvent('on' + type, fn);
		}
		return this;
	}
};

window.m$ = function() {
	return new _m$(arguments[0]);
};
