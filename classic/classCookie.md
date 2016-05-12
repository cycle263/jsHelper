```
////////////////////////  Cookies  /////////////////////////
var CookieUtil = {
	get: function(name){
		var cookieName = encodeURIComponent(name) + "=",
			cookieStart = document.cookie.indexOf(cookieName),
			cookieValue = null;
		if(cookieValue > -1){
			var cookieEnd = document.cookie.indexOf(";", cookieStart);
			if(cookieEnd == -1){
				cookieEnd = document.cookie.length;				
			}
			cookieValue = decodeURIComponent(document.cookie.substring(cookieStart +
						cookieName.length, cookieEnd));
		}
		return cookieValue;
	},
	set: function(name, value, expires, path, domain, secure){
		var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
		
		(expires instanceof Date) && (cookieText += "; expires=" + expires.toGMTString());
		path && (cookieText += "; path=" + path);
		domain && (cookieText += "; domain=" + domain);
		secure && (cookieText += "; secure");

		document.cookie = cookieText;
	}
	unset: function(name, path, domain, secure){
		this.set(name, "", new Date(0), path, domain, secure);
	}
};

//MS 版本
var docCookies = {
    getItem: function(sKey) {
        return unescape(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function(sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:  //兼容性较好，IE下面兼容
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = escape(sKey) + "=" + escape(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function(sKey, sPath) {
        if (!sKey || !this.hasItem(sKey)) { return false; }
        document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function(sKey) {
        return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: /* optional method: you can safely remove it! */function() {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = unescape(aKeys[nIdx]); }
        return aKeys;
    }
};


//PPK版本
var Cookies = {
	init: function () {
		var allCookies = document.cookie.split('; ');
		for (var i = 0, len = allCookies.length; i < len; i++) {
			var cookiePair = allCookies[i].split('=');
			this[cookiePair[0]] = cookiePair[1];
		}
	},
	create: function (name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days*24*60*60*1000));
			var expires = "; expires=" + date.toGMTString();
		}
		else var expires = "";
		document.cookie = name + "=" + value + expires + "; path=/";
		this[name] = value;
	},
	erase: function (name) {
		this.create(name,'',-1);
		this[name] = undefined;
	}
};
Cookies.init();
```
