///////////// 类式继承 /////////////
/** Extend function **/
function extend(sub, super){
  var F = function(){};  //避免创建super实例（过大）
  F.prototype = super.prototype;
  sub.prototype = new F();
  sub.prototype.constructor = sub;
  
  sub.super = super.prototype;
  if(super.prototype.constructor === Object.prototype.constructor){
    super.prototype.constructor = super;
  }
}

/*  Class Person  */
function Person(name){
  this.name = name;
}
Person.prototype.getName = function(){
  return this.name;
}

/*  Class Author  */
function Author(name, books){
  Author.super.constructor.call(this, name);
  this.books = books;
}
extend(Author, Person);
Author.prototype.getBooks = function(){
  return this.books;
}


//////////////  原型式继承  //////////////
function clone(object){
  function F(){}
  F.prototype = object;
  return new F; //相当于new F()
}

var Person = {};
Person.name = 'default';
Person.getInfos = function(){   //避免继承影响到原对象值
  return {
    age: 28,
    job: software engineer
  };
};

Person.infos = Person.getInfos();

var Author = clone(Person);
Author.infos = Person.getInfos();
Author.infos.age = 29;


/////////////////  掺类继承  //////////////////
function augment(receiving, giving){
  if(arguments[2]){ //Only give certain methods
    for(var i = 2, l = arguments.lenght; i < l; i++){
      receiving.prototype[arguments[i]] = giving.prototype[arguments[i]];
    }
  }else{
    for(method in giving.prototype){ //Give all methods
      if(!receiving.prototype[method]){ //避免覆盖原有的方法或者重复复制
        receiving.prototype[method] = giving.prototype[method];
      }
    }
  }
}

var Mixin = function(){};
Mixin.prototype = {
  serialize: function(){
    var out = [];
    for(method in this){
      out.push(method + ": " + this[method]);
    }
    return out.join(', ');
  }
};
