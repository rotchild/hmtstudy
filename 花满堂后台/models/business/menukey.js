/**
 * Created by lg on 2015/9/14.
 */
var menukey = function (schema) {
    var menukey = schema.define('menukey', {
        menuclassid: {type: Number, length: 11},
        menuid: {type: Number, length: 11},
        menusequence: {type: Number, length: 11},//排序
//        address: {type: String, length: 255},//地址
//        mobile: {type: String, length: 255},//联系电话
        createtime: {type: String, length: 200}//创建时间
    });
    return menukey;
};

module.exports = menukey;