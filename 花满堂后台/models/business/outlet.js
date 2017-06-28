/**
 * Created by lg on 2015/2/9.
 */
var Schema = require('jugglingdb').Schema;
var outlet = function (schema) {
    var outlet = schema.define('outlet', {
        name: {type: String, length: 50},//名称
        cartype: {type: String, length: 50},//车辆类型
        address: {type: String, length: 255},//地址
        telephone: {type: String, length: 255},//联系电话
        dottype: {type: Number, length: 50},//分类标志
        postalcode: {type: String, length: 255}//邮编
        ,imgUrl: {type: String, length: 255}//图片地址
//        ,code: {type: String, length: 20,default: 0}
        ,code: { type: Number, dataType: 'decimal', precision: 8, scale: 5, "default": 0.00000 }
        ,latitude:{type:String,length:50}
        ,longitude:{type:String,length:50}
        ,enclosure: Schema.Text//text     接送范围
    });
    return outlet;
};

module.exports = outlet;