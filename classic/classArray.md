```
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


//交换值方法, 不建议批量使用，批量使用交换函数
var a = 9, b = 8;
a = [b, b = a][0];

//数组交换值函数
function arrSwap(arr, x, y){
	if(arguments.length < 3) throw new TypeError('Illegal parameters');
	arr[x] = arr.splice(y, 1, arr[x])[0];
	return arr;
}

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

//copy array
var convertArray = function(list){
	return Array.prototype.slice.call(list);
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
```
