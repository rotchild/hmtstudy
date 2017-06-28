/**
 * Created by Administrator on 2014/6/24.
 * notify.js Google desktop notification class
 * v32.0之前使用window.webkitNotifications对象 chrome v35.0版本后直接使用Notification对象
 */

var Notify = Notify || function(){};

var notification = ("Notification" in window) ? Notification : window.webkitNotifications;
var noop = function(){};

var options = {};

var defaults = {
    onclick:(notification!==undefined)?notification.onclick:noop,
    onshow:(notification!==undefined)?notification.onshow:noop,
    onerror:(notification!==undefined)?notification.onerror:noop,
    onclose:(notification!==undefined)?notification.onclose:noop
};

function Notify(userOptions){
    setOptions(userOptions);
}

var setOptions = function (userOptions) {
    if (!userOptions) {
        options = defaults;
    }
    else {
        for (var key in defaults) {
            if (userOptions[key]) {
                options[key] = userOptions[key];
            } else {
                options[key] = defaults[key];
            }
        }
    }
};

Notify.prototype.isSupport = function(){
    if("Notification" in window){
        return !!("Notification" in window);
    }
    else if("webkitNotifications" in window){
        return !!window.webkitNotifications;
    }
    else{
        return false;
    }
};

Notify.prototype.getPermission = function(callback){
    notification.requestPermission(function(status){
        if (notification.permission !== status){
            notification.permission = status;
        }
        if (status === "granted"){
            callback(null,true);
        }
        else{
            callback(null,false);
        }
    });
};

Notify.prototype.checkPermission = function(){
    if("Notification" in window){
        return (notification.permission === 'granted');
    }
    else if("webkitNotifications" in window){
        return (notification.checkPermission() === 0);
    }
    else{
        return false;
    }
};

var notification_old;//老式浏览器兼容

Notify.prototype.show = function(icon, title, body, replaceId){
    if("Notification" in window){
        var _nofity = new notification(title,{icon:icon,body:body,tag:replaceId});
    }
    else if("webkitNotifications" in window){
        var _notify = notification.createNotification(icon, title, body);
        _notify.replaceId = replaceId;
        _notify.show();
    } else {
        //老式浏览器兼容
        try {
            notification_old.cancel()
        } catch (e) {
        }
        notification_old = window.webkitNotifications.createNotification(icon, title, body);
        notification_old.onclick = function () {
            this.cancel();
        };
        notification_old.show();
    }
};

Notify.prototype.onerror = function(){
    return options.onerror;
};




