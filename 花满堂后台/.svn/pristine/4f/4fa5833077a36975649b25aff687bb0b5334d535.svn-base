/**
 * Created by zhou on 2014/5/21.
 */

var jsaddin = function(){
    if(!String.prototype.trim){
        String.prototype.trim = function(){
          var str = this,
            str = str.replace(/^\s+/, '');
          for (var i = str.length - 1; i >= 0; i--) {
            if (/\S/.test(str.charAt(i))) {
              str = str.substring(0, i + 1);
              break;
            }
          }
          return str;
        };
    }

    if(!Array.prototype.every){
        Array.prototype.every = function(fun /*, thisp*/){
          var len = this.length;
          if (typeof fun != "function")
            throw new TypeError();
          var thisp = arguments[1];
          for (var i = 0; i < len; i++)
          {
            if (i in this && !fun.call(thisp, this[i], i, this))
              return false;
          }
          return true;
        };
    }

    if(!Array.prototype.indexOf){
        Array.prototype.indexOf=function(o, from){
          var len = this.length;
          from = from || 0;
          from += (from < 0) ? len : 0;
          for (; from < len; ++from){
            if(this[from] === o){
              return from;
            }
          }
          return -1;
        }
    }

    if(typeof Object.keys !== "function") {
        (function() {
              Object.keys = Object_keys;
              function Object_keys(obj) {
                    var keys = [], name;
                    for (name in obj) {
                          if (obj.hasOwnProperty(name)) {
                            keys.push(name);
                          }
                    }
                    return keys;
              }
        })();
    }
};

export = jsaddin;

