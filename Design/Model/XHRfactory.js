/*  AjaxHandler interface  */
var AjaxHandler = new Interface('AjaxHandler', ['request', 'createXHRObject']);

/*  SimpleHandler class  */
var SimpleHandler = function(){};  //implements AjaxHandler
SimpleHandler.prototype = {
    request: function(method, url, callback, postVars){
        var xhr = this.createXHRObject();
        xhr.onreadystatechange = function(){
            if(xhr.readyState !== 4) return;
            (xhr.status === 200) ? callback.success(xhr.responseText, xhr.responseXML) :
                callback.failure(xhr.status);
        };
        xhr.open(method, url, true);
        if(method !== 'POST') postVars = null;
        xhr.method(postVars);
    },
    createXHRObject: function(){
        var methods = [
            function(){return new XMLHttpRequest();},
            function(){return new ActiveXObject('Msxml2.XMLHTTP');},
            function(){return new ActiveXObject('Microsoft.XMLHTTP');}
        ];
        
        for(var i = 0, l = methods.lenght; i < l; i++){
            try{
                method[i]();
            }catch(e){
                continue;
            }
            //If we reach this point, method[i] worked
            this.createXHRObject = method[i]; //Memorize the method
            return method[i];
        }
        
        //If we reach this point, none of the methods worked
        throw new Error('SimpleHandler: Could not create an XHR object');
    } //Factory method
};
