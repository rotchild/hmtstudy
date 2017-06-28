/**
 * Created by lg on 2015/3/31.
 */
var Schema = require('jugglingdb').Schema;
var order = function (schema) {
    var order = schema.define('order', {
        uid: {type: Number, length: 255},
        uopenid: {type: String, length: 255},
        bid: {type: Number, length: 255},
//        bopenid: { type: String, length: 255 },
        bname: {type: String, length: 255},
        jobno: {type: String, length: 50},
        pid: {type: Number, length: 11},
        pname: {type: String, length: 255},
        points: {type: Number, length: 11},
        date: {type: Number, length: 11},
        type: {type: Number, length: 11},
        reason: {type: String, length: 255},
        remark: {type: String, length: 255},
        urealname: {type: String, length: 255},
        ucarmark: {type: String, length: 255},
        utelephone: {type: String, length: 20},
        areacode: {type: String, length: 255},//所属机构
        areaid: {type: Number, length: 11},
        settlestate: {type: Number, length: 11},//结算标识 -1表示已结算
        rmpoints: {type: Number, length: 11},
        policyno: {type: String, length: 255},//保单号
        premium: {type: Number, length: 11}//保费

        , xfzscore: {type: Number, length: 11}//消费者评分
        , xfzappraisal: Schema.Text//消费者评价
        , sjscore: {type: Number, length: 11}//商家评分
        , sjappraisal: Schema.Text//商家评价
    });
    return order;
};

module.exports = order;