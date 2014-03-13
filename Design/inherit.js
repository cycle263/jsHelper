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
