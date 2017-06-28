/**
 * Created by zhou on 2014/5/4.
 * user.ts 依据数据库文档定义用户表结构与字段
 */
var Schema = require('jugglingdb').Schema;
var user = function (schema) {
    var user = schema.define('user', {
        username: {type: String, length: 30},
        password: {type: String, length: 50},
        realname: {type: String, length: 30},
        mobile: {type: String, length: 20},
        userclass: {type: Number, length: 11},//角色类别 1：管理员 2：店长 3：前台
//        userclass: String,
        rolestr: {type: String, length: 50}//角色分类
//        roles: { type:Number,length:11},//0管理员，1店长，2服务顾问，3维修班组
//        photo:{type:String,length:255},//员工照片
//        outletid:{type:Number,length:11},//门店id
//        openid: {type: String,length: 50},
//        serviceintro:Schema.Text,//服务简介
//        workyears:{type:Number,length:11},
//        usercode: {type: String, length: 20,default: 0}
//        usercode:{ type: Number, dataType: 'decimal', precision: 8, scale: 5, "default": 0.00000 }
    });
    return user;
};

module.exports = user;