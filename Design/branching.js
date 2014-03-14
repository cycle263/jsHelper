MyNamespace.Singleton = (function(){
	var objectA = {
		attribute: true,
		method: function(){
			
		}	
	};
	
	var objectB = {
		attribute: false,
		method: function(){
			
		}	
	};
	
	return (someCondition) ? objectA : objectB;
})();

/////////////////////// SimpleXHRFactory singleton ///////////////////////////
var simpleXHRFactory = (function(){
	//The three branches
	var standard = {
		createXHRObject: function(){
			return new XMLHttpRequest();
		}	
	};
	
	var activeXNew = {
		createXHRObject: function(){
			return new ActiveXObject('Msxml2.XMLHTTP');
		}
	};
	
	var activeXOld = {
		createXHRObject: function(){
			return new ActiveXObject('Microsoft.XMLHTTP');
		}
	};
	
	var testObject;
	try{
		testObject = standard.createXHRObject();
		return standard; //return this if no error was thrown
	}catch(e){
		try{
			testObject = activeXNew.createXHRObject();
			return activeXNew; //Return this if no error was thrown
		}catch(e){
			try{
				testObject = activeXOld.createXHRObject();
				return activeXOld; //Return this if no error was thrown
			}catch(e){
				throw new Error("No XHR object found in this environment.");
			}
		}
	}
})();
