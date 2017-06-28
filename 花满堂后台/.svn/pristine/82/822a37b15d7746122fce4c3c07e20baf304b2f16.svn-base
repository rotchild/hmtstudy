/**
 * Created by lg on 2015/3/31.
 */
var Schema = require('jugglingdb').Schema;
var evaluation = function (schema) {
    var evaluation = schema.define('evaluation', {
        openid: {type: String, length: 255},
        taskid: {type: Number, length: 11},
        menuid: {type: Number, length: 11},
        code: {type: Number, length: 11},//评分
        detail: {type: String, length: 255},//评论
        enclosure: Schema.Text//text     接送范围
        , photourl: Schema.Text//text     自拍图片url
        , createtime: {type: String, length: 255}
        , dishurl: {type: String, length: 255}
        , menucount: {type: Number, length: 11}
        , dishname: {type: String, length: 255}
        , presentprice: {type: Number, dataType: 'decimal', precision: 11, scale: 4, "default": 0.0000}//现价

    });
    return evaluation;
};

module.exports = evaluation;