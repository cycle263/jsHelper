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
