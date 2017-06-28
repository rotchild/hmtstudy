/**
 * Created by lg on 2015/6/1.
 */
var vippoints = function (schema) {
    var vippoints = schema.define('vippoints', {
        openid: { type: String },
        insuredname: { type: String},
        mobile: { type: String, length: 20, default: '' },
        licenseno: { type: String, length: 200, default: "" },
        frameno: String,//车架号
        identifynumber: { type: String, length: 20 },
        policyno:{ type: String, length: 255},//保单号
        startdate: {type: Number, length: 11},//保单生效时间
        enddate: {type: Number, length: 11,default:0},//保单到期时间
        sumpremium:{ type: Number, length: 11},//保费
        lastdamagedbi:{type: Number},//出现次数
        areacode:{type: String, length: 255},//所属机构
        policynotype:{type:Number},//保单类型 0: 交强险 1:商业险 2：充值 3: 绑定送积分 4 生日送积分 5前两百名送积分
        addtype:{type:Number},//保单追加情况（追加还是首次）单独一类为活动送积分;0表示首次，1表示追加，2表示活动
        pointsType:{type:Number,default: 0},//充值状态：0表示未充，1表示已充；
        fillPoints: { type: Number, dataType: 'int' },//充的积分
        remainPoints: { type: Number, dataType: 'int' },//所剩积分
        userid: { type: Number, dataType: 'int' },//充值人的id
        reason: { type: String, length: 255 },//充值原因
        remark:{type: String, length: 255},//备注
        createtime :{type: Number, length: 11}//充值时间
    });

    return vippoints;
};

module.exports = vippoints;
//# sourceMappingURL=publicUser.js.map