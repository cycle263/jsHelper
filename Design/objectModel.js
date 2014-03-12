//创建对象的三种模式
//门户大开模式
var Book = function(isbn, title, author){
  if(!this.checkIsbn(isbn)) throw new Error("Book: Invalid ISBN.");
  this.isbn = isbn;
  this.title = title || "No title specified";
  this.author = author || "No author specified";
};

Book.prototype = {
  checkIsbn: function(isbn){
    if(isbn === undefined || typeof isbn !== 'string'){
      return false;
    }
    isbn = isbn.replace(/-/g, ''); //remove dashes.
    if(isbn.length !== 10 && isbn.length !== 13){
      return false;
    }
    
    var sum = 0;
    if(isbn.length === 10){
      if(!isbn.match(/^\d{9}/)) return false;
      for(var i = 0; i < 9; i++)
        sum += isbn.charAt(i) * (10 - i);
      var checksum = sum % 11;
      if(checksum === 10) checksum = 'X';
      if(isbn.charAt(9) !== checksum) return false;
    }else{
      if(!isbn.match(/^\d{12}/)) return false;
      for(var j = 0; j < 12; j++)
        sum += isbn.charAt(i) * ((i%2 === 0) ? 1 : 3);
      var checksum = sum % 10;
      if(isbn.charAt(12) !== checksum) return false;
    }
    return true;
  }
};

//私有变量模型1
var Book = function(isbn, title, author){
  if(!this.checkIsbn(isbn)) throw new Error("Book: Invalid ISBN.");
  this._isbn = isbn;
  this._title = title || "No title specified";
  this._author = author || "No author specified";
};

Book.prototype = {/*...*/};

//私有变量模型2 --- 规范化
var Book = function(isbn, title, author){
  this.setIsbn(isbn);
  this.setTitle(title);
  this.setAuthor(author);
};

Book.prototype = {
  _checkIsbn: function(isbn){/*...*/},
  getIsbn: function(){
    return this._isbn;
  },
  setIsbn: function(isbn){
    if(!this._checkIsbn(isbn)) throw new Error("Book: Invalid ISBN.");
    this._isbn = isbn;
  },
  getTitle: function(){
    return this._title;
  },
  setTitle: function(){
    this._title = title || "No author specified";
  },
  getAuthor: function(){
    return this._author;
  },
  setAuthor: function(){
    this._author = author || "No author specified"
  },
  display: function(){}
};

//闭包私有模型
var Book = function(newIsbn, newTitle, newAuthor){ //implements publication
  //private attributes
  var _isbn, _title, _author
  
  //private method
  function _checkIsbn(isbn){/*..*/}
  
  //privileged method
  this.getIsbn = function(){
    return _isbn;
  };
  
  this.setIsbn = function(newIsbn){
    if(!_checkIsbn(newIsbn)) throw new Error("Book: Invalid ISBN.");
    _isbn = newIsbn;
  };
  
  //...
  this.setIsbn(newIsbn);
};

Book.prototype.display = function(){
  //...
};
