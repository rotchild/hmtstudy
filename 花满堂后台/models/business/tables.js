/**
 * Created by lg on 2015/6/29.
 */
var tables = function (schema) {
    var tables = schema.define('tables', {
        type:{type:Number,length:11},//4，6,8,10人坐	座位类型
        availablenumber:{type:Number,length:11},//可提供订座数量
        factnumber:{type:Number,length:11},//实际座位数量
        starttime: {type: String, length: 255},//可订座起始时间
        endtime: {type: String, length: 255},//可订座结束时间
        Spandays:{type:Number,length:11}//跨度时间
    });
    return tables;
};

module.exports = tables;