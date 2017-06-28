/**
 * Created by Administrator on 2014/6/15.
 */

///<reference path='../../ts/bull/bull.d.ts' />
import Bull = require('bull');

var settings={
    redis:{
        host:'127.0.0.1'
        ,port:6379
        ,options:{
            no_ready_check:true
        }
    }
};

var queue={};
var bullKue={
    process:(name:string,cb:Function)=>{
        if (!queue[name]){
            queue[name]=Bull(name,settings.redis.port,settings.redis.host,settings.redis.options);
        }
        queue[name].process(cb);
        return queue[name];
    }
    ,create:(name,msg)=>{
        if (!queue[name]){
            queue[name]=Bull(name,settings.redis.port,settings.redis.host,settings.redis.options);
        }
        queue[name].add(msg);
        return queue[name];
    }
    ,save:()=>{
        console.log(arguments);
        return bullKue;
    }
};
export function createQueue(opts){
    settings=opts||settings;
    return bullKue;
}