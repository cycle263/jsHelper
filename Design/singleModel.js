////////////////////////   自定义表单提交单体   ////////////////////////
NeweggCorp.RegPage = {
  //Constants
  FORM_ID: 'reg-form',
  OUTPUT_ID: 'reg-results',
  
  //Form handling methods
  handleSubmit: function(e){
    e.preventDefault(); //Stop the normal form submission
    var data = {},
      inputs = NeweggCorp.RegPage.formEl.getElementsByTagName('input');
    
    //Collect the values of the input fields in the form
    for(var i = 0, l = inputs.length; i < l; i++){
      data[inputs[i].name] = inputs[i].value;
    }
    
    //Send the form values back to the server
    NeweggCorp.RegPage.sendRegistration(data);
  },
  
  sendRegistration: function(data){
    // Make an XHR request and call displayResult() when the response is received.
  },
  
  displayResult: function(res){
    NeweggCorp.RegPage.outputEl.innerHTML = res;
  },
  
  //Initialization method
  init: function(){
    //get the form and output elements
    NeweggCorp.RegPage.formEl = $(NeweggCorp.RegPage.FORM_ID);
    NeweggCorp.RegPage.outputEl = $(NeweggCorp.RegPage.OUTPUT_ID);
    
    addEvent(NeweggCorp.RegPage.formEl, 'submit', NeweggCorp.RegPage.handleSubmit);
  }
};

addLoadEvent(NeweggCorp.RegPage.init);

//方式一
NeweggCorp.DataParser = {
  //Private method
  _stripWhitespace: function(str){
    return str.replace(/\s+/, '');
  },
  _stringSplit: function(str, delimiter){
    return str.split(delimiter);
  },
  
  //Public method
  stringToArray: function(str, delimiter, stripWS){
    if(stripWS){
      str = this._stripWhitespace(str);
    }
    var outputArray = this._stringSplit(str, delimiter);
    return outputArray;
  }
};

//方式二
NeweggCorp.DataParser = (function(){
	//Private attributes
	var whitespaceRegex = /\s+/;
	
	//Private methods
	function stripWhitespace(str){
		return str.replace(whitespaceRegex, '');
	}
	
	function stringSplit(str, delimiter){
		return str.split(delimiter);
	}
	
	//Everything returned in the object literal is public, but can access the members in the closure created above.
	return {
		//Public method
		stringToArray: function(str, delimiter, stripWS){
			if(stripWS){
				str = stripWhitespace(str);
			}
			var outputArray = stringSplit(str, delimiter);
			return outputArray;
		}
	};
})(); //Invoke the function and assign the returned object literal to NeweggCorp.DataParser

//惰性加载方式三
MyNamespace.Singleton = (function(){
	var uniqueInstance; //Private attribute that holds the single instance
	
	function constructor(){ //All of the normal singleton code goes here
		var privateAttribute = false;
		
		function privateMethod(){
			//...
		}
		
		return {
			publicAttribute: true,
			publicMethod: function(){}
		};
	}
	
	return {
		getInstance: function(){
			if(!uniqueInstance){ //Instantiate only if the instance doesn't exist
				uniqueInstance = constructor();
			}
			return uniqueInstance;
		}	
	};
})();
