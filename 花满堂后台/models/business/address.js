/**
 * Created by lg on 2015/2/9.
 */
var Schema = require('jugglingdb').Schema;
var address = function (schema) {
    var address = schema.define('address', {
        openid: {type: String, length: 200},
        realname: {type: String, length: 255},//姓名
        address: {type: String, length: 255},//地址
        mobile: {type: String, length: 255},//联系电话
        createtime: {type: String, length: 200},//创建时间
        enclosure: Schema.Text//text     接送范围
    });
    return address;
};

module.exports = address;