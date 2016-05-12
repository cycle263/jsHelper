```
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

//计算对象的长度
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

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
```
