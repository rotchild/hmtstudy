/**
 * Created by Administrator on 2014/5/26.
 * javascript常用工具类,封装常用的函数
 */

///<reference path='../../ts/eventproxy/eventproxy.d.ts' />
///<reference path='../../ts/node/node.d.ts' />
"use strict";
import EventProxy=require('eventproxy');
import util = require('util');

export function formatDate(date:Date,fmt:any)
{ //author: meizz
    var o = {
        "M+" : date.getMonth()+1,                 //月份
        "d+" : date.getDate(),                    //日
        "h+" : date.getHours(),                   //小时
        "m+" : date.getMinutes(),                 //分
        "s+" : date.getSeconds(),                 //秒
        "q+" : Math.floor((date.getMonth()+3)/3), //季度
        "S"  : date.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}

/**
 * groupQueue 组排队,组件串行，组内并发
 * @param str
 * @returns {boolean}
 */
export function groupQueue(groupSize:number,queue:any[],itemCb:(result:any,cb:Function)=>any,doneCb:Function){
    var fail=[]
        ,succ=[];
    var ep=new EventProxy();
    function doGroup(){
        var group=[]
        var doCount=Math.min(groupSize,queue.length)
        var i;
        for (i=0;i<doCount;i++){
            group.push(queue.shift());
        }
        group.forEach((item)=>{
            itemCb(item,(err,result)=>{
                if (!err){
                    fail.push({item:item,err:err});
                }else{
                    succ.push({item:item,result:result});
                }
                ep.emit('itemDone');
            });
        });
        ep.after('itemDone',doCount,()=>{
            ep.emit('groupDone')
        });
    }
    doGroup();
    ep.on('groupDone',()=>{
        if (queue.length==0){
            return(doneCb({
                fail:fail
                ,succ:succ
            }));
        }else{
            doGroup();
        }
    })
}
/**
 * isEmptyStr 判断字符串是否为空字符串
 * @param str
 * @returns {boolean}
 */
export function isEmptyStr(str:string){
    return !str || /^\s*$/.test(str);
}

/**
 * escapeRiskChar 判断字符串是否符合文件名格式
 * @param str
 * @returns {*}
 */
export function escapeRiskChar(str:string){
    if (str.length < 0 || str.length > 255) {
        return null;
    } else {
        return str.match(/^[^\\\/:\*\?\|"<>]+$/);
    }
}

/**
 * concatParams http 拼接get请求参数
 * @param keys
 * @param values
 * @returns {string}
 */
export function concatParams(keys:string[],values:string[]): string {
    var param = "";
    for(var i = 0; i< keys.length; i++){
        if(i===0){
            param+= util.format("?%s=%s",keys[i],values[i]);
        }
        else{
            param+= util.format("&%s=%s",keys[i],values[i]);
        }
    }
    return param;
}

export function verifyFormat(str:string){
    var splitarr = str.split(/[|,，。.?？:：]/);
    if(splitarr.length === 3){
        var carnum = splitarr[0].trim();
        var c_result = carnum.match(/^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[a-zA-Z_0-9]{4}[a-zA-Z_0-9_\u4e00-\u9fa5]$/);
        var telephone = splitarr[1].trim();
        var t_result = telephone.match(/^0?(13[0-9]|15[012356789]|18[0-9]|14[57])[0-9]{8}/);
        if((c_result && t_result) !== null){
            return splitarr;
        }
        else{
            return null;
        }
    }
    else{
        return null;
    }
}


