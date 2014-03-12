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
    isbn = isbn.replace(/-/, ''); //remove dashes.
    if(isbn.length !== 10 || isbn.length !== 13){
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
