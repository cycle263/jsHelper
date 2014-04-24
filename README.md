Javascript
==========
Unit helper function

This is my project for javascript.

例如 - 数组去重函数
##### Examples

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

#### Include Features

主要包括：

* javascript功能函数

* 部分常用的javascript功能实现

* javascript动画功能

* m$微型框架实现

* base64、GUID等功能模块

* javascript的对象模型

* 浏览器的兼容及其属性


#### What makes a good front end engineer

	A good front end engineer needs to be able to communicate effectively due to the parties involved with the job. At any given time, a front end engineer answers to at least four customers:

	* Product Managers – these are the folks responsible for the direction of the application. They have a vision of what the application should offer to users and (hopefully) how to make money off of that model. Oftentimes, they will be pushing for more features.
 	* User Interface Designers – these are the people responsible for the visual design and interaction model of the application. Their concern is what will make sense to the user, consistency of interaction, and overall usability. They are most of asking for slicker user interfaces that can be challenging to create.
 	* Engineering Management – the group that actually builds and maintains the application. In engineering, the primary concerns are uptime (keeping the application available), performance, and deadlines. The push from engineering is usually to try to keep things as simple as possible and not introduce failure points while making changes.
	* End Users – the primary consumer of the application. Though there’s often not direct interaction with end users, their feedback is crucial; an application is worthless without people who want to use it. End users typically ask for things that would help them personally as well as things that are available from competitors.

Other
==========
###### Google HTML/CSS Style Guide: 

http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml

###### Markdown语法说明

http://wowubuntu.com/markdown


###### Sublime3破解版下载链接

http://517down.com/html/soft/8.html
http://www.7edown.com/soft/down/soft_19917.html

### Contribution

We'd love you to get involved in making the javascript.js library. If you'd like to contribute please get in touch, fork/clone the repo and have a dig around. Make pull requests on the dev branch.
