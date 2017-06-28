/**
 * Created by lg on 2015/1/28.
 */
var dict = function (schema) {
    return schema.define('dict', {
        openid: {type: String, length: 200},
        licenseno: {type: String, length: 200},
        owner: {type: String, length: 200},
        mobile: {type: String, length: 200},
        identifytype: {type: Number, length: 11},  //证件类型 / 服务类型
        identifynumber: {type: String, length: 200},//证件号码
        tasktype: {type: Number, length: 11},//任务类型
        taskstatus: {type: Number, length: 11},//任务状态
        eventdate: {type: Number, length: 11},//出险时间
        visitdate: {type: Number, length: 11},//回访时间（联系时间）...工作日，非工作日，
        policyno: {type: String, length: 200},//撤销案件号，

        title: {type: String, length: 200},//建议主题 意见主题 投诉主题
        remark: {type: String, length: 500}, //留言，原因，建议内容，意见内容，投诉内容 预约留言
        frontremark: {type: String, length: 500},
        backremark: {type: String, length: 500}
    });
};

module.exports = dict;