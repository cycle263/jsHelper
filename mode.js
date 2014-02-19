/////////////////////// 单体模式的分支 //////////////////////////
/*创建XHR单体模式*/
var simpleXHRFactory = (function(){
	var standard = {
		createXHRObjec: function(){
			return new XMLHttpRequest();
		}
	};
	var activeXNew = {
		createXHRObjec: function(){
			return new ActiveXObject('Msxml2.XMLHTTP');
		}
	};
	var activeXOld = {
		createXHRObjec: function(){
			return new ActiveXObject('Msxml2.XMLHttp');
		}
	};

	var testObject;
	try{
		testObject = standard.createXHRObjec();
		return standard;
	}catch(ex){
		try{
			testObject = activeXNew.createXHRObjec();
			return activeXNew;
		}catch(ex){
			try{
				testObject = activeXOld.createXHRObjec();
				return activeXOld;
			}catch(ex){
				throw new Error('No XHR object found in this environment.');
			}
		}
	}
})();

//******************  继承  ******************//
function Person(name){
	this.name = name;
}
Person.prototype.getName = function(){
	return this.name;
}

function Author(name, book){
	Person.call(this, name);
	this.book = book;
}
Author.prototype = new Person();
Author.prototype.constructor = Person;
Author.prototype.getBook = function(){
	return this.book;
}

//继承函数
function Extend(sup, sub){
	var F = function(){};	//创建新函数对象，避免调用sup构造函数，特别是sup庞大的情况下
	F.prototype = sup.prototype;
	sub.prototype = new F();
	sub.prototype.constructor = sub;
}

//扩展版
function ExtendUpdated(){sup, sub}{
	var F = function(){};
	F.prototype = sup.prototype;
	sub.prototype = new F();
	sub.prototype.constructor = sub;

	sub.sup = sup.prototype;
	if(sup.prototype.constructor == Object.prototype.constructor){
		sup.prototype.constructor = sup;
	}
}

//对象字面量方式
var Person = {
	name: "default name",
	info: {
		age: 27,
		job: 'programer'
	},
	getName: function(){
		return this.name;
	}
};

//寄生组合式继承
function inheritPrototype(sub, sup){
	var prototype = Object(sup.prototype);
	prototype.constructor = sub;
	sub.prototype = prototype;
}

function Person(name, age){
	EventTarget.call(this);
	this.name = name;
	this.age = age;
}

inheritPrototype(Person, EventTarget);
Person.prototype.say = function(message){
	this.fire({type:"message", message: "this is a message"});
};


//////////////////////   通过继承来创建新对象   ////////////////////////
function inherit(parent){
	parent == null && throw TypeError();
	if(Object.create){return Object.create(parent);}

	var t = typeof parent;
	if(t !== "object" && t !== "function"){throw TypeError();}
	function f(){};
	f.prototype = parent;
	return new f();
}

//////////////////////   用来枚举对象属性的工具函数  ///////////////////////
function extend(o, p){			//将p属性全部复制到o中，同名覆盖
	for(prop in p){
		o[prop] = p[prop];
	}
	return o;
}

function merge(o, p){
	for(prop in p){
		if(o.hasOwnProperty[prop]){continue;}	//跳过o中已经存在的属性
		o[prop] = p[prop];
	}
	return o;
}

function restrict(o, p){
	for(prop in o){
		if(!(prop in p)){delete o[prop];}		//删除p中不存在的o中存在的属性
	}
	return o;
}

function subtract(o, p){
	for(prop in p){
		delete o[prop];				//删除o中同名的所有属性
	}
	return o;
}

function union(o, p){			//并集中相交部分使用P属性
	return extend(extend({}, o), p);
}

function intersection(o, p){			//交集,使用o属性
	return restrict(extend({}, o), p);
}

function keys(o){			//返回o中所有可枚举属性名字
	if(typeof o !== "object"){throw TypeError();}
	var result = [];
	for(var prop in o){
		if(o.hasOwnProperty(prop)){
			result.push(prop);
		}		
	}
	return result;
}
