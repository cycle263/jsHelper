Javascript
==========
Unit helper function

This is my project for javascript.

例如 - 数组去重函数
```
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

```

主要包括：

1、javascript功能函数

2、部分常用的javascript功能实现

3、javascript动画功能

4、m$微型框架实现

5、base64、GUID等功能模块

6、javascript的对象模型

7、浏览器的兼容及其属性


Google HTML/CSS Style Guide: http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml
