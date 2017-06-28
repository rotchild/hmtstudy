/**
 * Created by lg on 2015/3/31.
 */
var Schema = require('jugglingdb').Schema;
var menu = function (schema) {
    var menu = schema.define('menu', {
        dishname: {type: String, length: 255}
        , standardprice: {type: Number, dataType: 'decimal', precision: 11, scale: 4, "default": 0.0000}//标准价格
        , presentprice: {type: Number, dataType: 'decimal', precision: 11, scale: 4, "default": 0.0000}//现价
        , outsprice: {type: Number, dataType: 'decimal', precision: 11, scale: 4, "default": 0.0000}//外卖价格
        , code: {type: Number, dataType: 'decimal', precision: 11, scale: 4, "default": 0.0000}
        , dishcount: {type: Number, length: 11},//上架数量
        isgrounding: {type: Number, length: 11},//是否上架 0否，1是
        iseat: {type: Number, length: 11},//是否堂食
        isout: {type: Number, length: 11},//是否外卖
        isrecommend: {type: Number, length: 11}//是否推荐
        , dishdetail: Schema.Text//text     菜单详情
        , dishurl: {type: String, length: 255}//菜单url
        , sellcount: {type: Number, length: 11, default: 0}//出售的数量
        , dishtype: {type: Number, length: 11}//菜类 1堂食 2外卖 3杂食
        , changetime: {type: String, length: 200}//创建时间
        , groundtime: {type: String, length: 200}//上架时间
        , notgroundtime: {type: String, length: 200}//下架时间
        , codecount: {type: Number, length: 11}//评价数量
        , menutab: {type: String, length: 200}//A:推荐，B:新品 "ABC"
        , completetime: {type: Number, length: 11}//出品时间
        , dishdescription: Schema.Text//text     菜单备注
        , menudetailurl: {type: String, length: 200}//菜品详情外链
        , menuformat: {type: String, length: 200}//规格
    });
    return menu;
};

module.exports = menu;