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
                methods[i]();
            }catch(e){
                continue;
            }
            //If we reach this point, method[i] worked
            this.createXHRObject = methods[i]; //Memorize the method
            return methods[i];
        }
        
        //If we reach this point, none of the methods worked
        throw new Error('SimpleHandler: Could not create an XHR object');
    } //Factory method
};


/* QueuedHandler class */
var QueuedHandler = function(){
    this.queue = [];
    this.reqInProgress = false;
    this.retryDelay = 5;
    this.retryTimes = 0;
};
extend(QueuedHandler, SimpleHandler);
QueuedHandler.prototype.request = function(method, url, callback, postVars, override){
    if(this.reqInProgress && !override){
        this.queue.push({
           method: method,
           url: url,
           callback: callback,
           postVars: postVars
        });
    }else{
        this.reqInProgress = true;
        var xhr = this.createXHRObject();
        var that = this;
        xhr.onreadystatechange = function(){
            if(xhr.readyState !== 4) return;
            if(xhr.status === 200){
                callback.success(xhr.responseText, xhr.responseXML);
                that.advanceQueue();
            }else{
                callback.failure(xhr.status);
                if(that.retryTimes <=3){
                    setTimeout(function(){
                        that.request(method, url, callback, postVars, true);
                        that.retryTimes++;
                    }, that.retryDelay * 1000);
                }else{
                    that.retryTimes = 0;
                }
            }
        };
        xhr.open(method, url, true);
        if(method !== 'POST') postVars = null;
        xhr.send(postVars);
    }
};
QueuedHandler.prototype.advanceQueue = function(){
    if(this.queue.length === 0){
        this.reqInProgress = false;
        return;
    }  
    var req = this.queue.shift();
    this.request(req.method, req.url, req.callback, req.postVars, true);
};

/* OfflineHandler class */
var OfflineHandler = function(){
    this.storedRequests = [];  
};
extend(OfflineHandler, SimpleHandler);
OfflineHandler.prototype.request = function(method, url, callback, postVars){
    if(XHRManager.ifOffline()){  //Store the requests until we are online
        this.storeRequests.push({
            method: method,
            url: url,
            callback: callback,
            postVars: postVars
        });
    }else{
        this.flushStoreRequests();
        OfflineHandler.super.request(method, url, callback, postVars);
    }
};
OfflineHandler.prototype.flushStoreRequests = function(){
    for(var i = 0, l = this.storedRequests.length; i < l; i++){
        var req = this.storedRequests[i];
        OfflineHandler.super.request(req.method, req.url, req.callback, req.postVars);
    }
};

/* XHRManager singleton */
var XHRManager = {
    createXHRHandler: function(){
        var xhr;
        if(this.isOffline()){
            xhr = new OfflineHandler();
        }else if(this.isHighLatency()){
            xhr = new QueuedHandler();
        }else{
            xhr = new SimpleHandler();
        }
        
        Interface.ensureImplements(xhr, AjaxHandler);
        return xhr;
    },
    isOffline: function(){
        //Do a quick request with SimpleHandler and see if it succeeds
    },
    isHighLatency: function(){
        //Do a series of requests with SimpleHandler and time the responses. Best done once, as a branching function
    }
};

var myHandler = XHRManager.createXHRHandler();
var callback = {
    success: function(resText){
        console.log('Success: ' + resText);
    },
    failure: function(statusCode){
        console.log('Failure: ' + statusCode);
    }
};
myHandler.request('GET', 'script.php', callback);
