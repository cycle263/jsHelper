/*  AjaxHandler interface  */
var AjaxHandler = new Interface('AjaxHandler', ['request', 'createXHRObject']);

/*  SimpleHandler class  */
var SimpleHandler = function(){};  //implements AjaxHandler
SimplerHandler.prototype = {
    request: function(method, url, callback, postVars){
        var xhr = this.createXHRObject();
        xhr.onreadystatechange = function(){
            if(xhr.readyState !== 4) return;
            (xhr.status === 200) ? callback.success(xhr.responseText, xhr.responseXML) :
                callback.failure(xhr.status);
        };
        xhr.open(method, url, true);
    }
}
