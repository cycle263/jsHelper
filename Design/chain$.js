/*  链式写法  */
function $(){
    var elements = [];
    for(var i = 0, l = arguments.length; i < l; i++){
        var ele = arguments[i];
        if(typeof ele === 'string'){
            ele = document.getElementById(ele)
        }
        if(l === 1) return ele;
        elements.push(ele);
    }
    return elements;
}

//私有方法写法
(function(){
    function _$(eles){
        this.elements = [];
        for(var i = 0, l = eles.length; i < l; i++){
            var ele = eles[i];
            if(typeof ele === 'string'){
                ele = document.getElementById(ele);
            }
            this.elements.push(ele);
        }
    }
    
    _$.prototype = {
        each: function(fn){
            for(var i = 0, l = this.elements.length; i < l; i++){
                fn.call(this, this.elements[i]);
            }  
            return this;
        },
        getSytle: function(prop){
            this.each(function(ele, fn){
                fn.call(this, ele.style[prop]);
            });
            return this;
        },
        setStyle: function(prop, val){
            this.each(function(ele){
                ele.style[prop] = val; 
            });
            return this;
        },
        show: function(){
            var that = this;
            this.each(function(ele){
                that.setStyle('display', 'block'); 
            });
            return this;
        },
        addEvent: function(type, fn){
            var add = function(ele){
                if(window.addEventListener){
                    ele.addEventListener(type, fn, false);
                }else if(window.attachEvent){
                    ele.attachEvent('on'+type, fn);
                }
            };
            this.each(function(ele){
                add(ele);
            });
            return this;
        }
    };
    
    //The public interface remains the same
    window.$ = function(){
        return new _$(arguments);  
    };
})();
