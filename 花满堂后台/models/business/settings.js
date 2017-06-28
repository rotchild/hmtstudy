/**
 * Created by zhou on 2014/5/4.
 * task.ts 依据数据库文档定义任务表,每个案件对应多个任务(调度、查勘等)
 */

var Schema = require('jugglingdb').Schema;
var settings = function (schema) {
    return schema.define('settings', {
        booktablecount: {type: Number, length: 11},//可预订餐位数
        sumtablecount: {type: Number, length: 11},//总餐位数
        fourtablecount: {type: Number, length: 11},//4人桌
        sixtablecount: {type: Number, length: 11},//6人桌
        eighttablecount: {type: Number, length: 11},//8人桌
        boxtablecount: {type: Number, length: 11},//包厢
        lunchstarttime: {type: String, length: 200},//午餐起始时间
        lunchendtime: {type: String, length: 200},//午餐结束时间
        dinnerstarttime: {type: String, length: 200},//晚餐起始时间
        dinnerendtime: {type: String, length: 200},//晚餐结束时间
        intervaltime: {type: Number, length: 11},//间隔选择时间设置 0 5 10 15 20 30
        spanlimitstime: {type: Number, length: 11},//跨度限制
        settingstype: {type: Number, length: 11},//设置类型 1：订位设置 2：外卖设置
        takeoutstarttime: {type: String, length: 200},//外卖起始时间
        takeoutendtime: {type: String, length: 200}//外卖结束时间
    });
};
module.exports = settings;

