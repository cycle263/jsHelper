//The implements function, which checks to see if an object declares that it 
//implements the required interfaces
function implements(object){
  for(var i = 1, l = arguments.length; i < l; i++){
    var interfaceName = arguments[i],
      interfaceFound = false;
    for(var j = 0, len = object.implementsInterfaces.lenght; j < len; j++){
      if(object.implementsInterfaces[j] === interfaceName){
        interfaceFound = true;
        break;
      }
    }
    if(!interfaceFound) return false; //An interface was not found.
  }
  return true; //All interfaces was found.
}


//Constructor
var Interface = function(name, methods){
  if(arguments.length != 2){
    throw new Error("Interface constructor called with " + arguments.length + " arguments, but expected exactly 2.")
  }
  
  this.name = name;
  this.methods = [];
  for(var i = 0, l = methods.length; i < l; i++){
    if(typeof methods[i] !== 'string'){
      throw new Error("Interface constructor expects method names to be passed in as a string.");
    }
    this.methods.push(methods[i]);
  }
};

//Static class method.
Interface.ensureImplements = function(object){
  if(arguments.length < 2){
    throw new Error("Function Interface.ensureImplements called with " + arguments.length + " arguments, but expected at least 2.");
  }
  
  for(var i = 1, len = arguments.length; i < len; i++){
    var interface = arguments[i];
    if(interface.constructor !== Interface){
      throw new Error("Function Interface.ensureImplements expects arguments two and above to be instances of Interface.");
    }
    
    for(var j = 0, l = interface.methods.length; j < l; j++){
      var method = interface.methods[j];
      if(!object[method] || typeof object[method] !== 'function'){
        throw new Error("Function Interface.ensureImplements: object does not implement the " + interface.name + " interface. Method " + method + " was not found.");
      }
    }
  }
};
