/**
 * Created by Administrator on 2014/4/23.
 * publicUser.ts 公众用户模型类
 */
var publicUser = function (schema) {
    var publicUser = schema.define('publicUser', {
        openid: {type: String, index: {kind: 'UNIQUE'}, default: ''},
        realname: {type: String, default: ''},
        telephone: {type: String, length: 20, default: ''},
        vcode: String,
        vcodeTime: Number,
        orgizationId: {type: String, default: '370100'},
        jobNo: String,
        jobState: String,
        carmark: {type: String, length: 200, default: ""},
        HPZL: String,
        CLSBDH: String,
        bindState: {type: Number, default: 0},
        JSZH: String,
        DABH: String,
        YXQZ: String,
        LJJF: String,
        driverImage: {type: String, default: ''},
        driverStatus: {type: Number, default: -1},
        points: {type: Number, dataType: 'int', default: 0},
        IdCard: {type: String, length: 20, default: ''},
        pointdate: {type: Number, length: 11, default: 0},//积分有效期
//        policyno:{ type: String, length: 255},//保单号
//        policynoDate: {type: Number, length: 11},//保单生效时间
//        premium:{ type: Number, length: 11},//保费
//        accidentTimes:{type: Number},//出现次数
        areacode: {type: String, length: 255},//所属机构
        birthDate: {type: String, length: 255}//生日时间
        , binddate: {type: Number, length: 11}//绑定日期
        ,address:String
    });

    schema.define('publicCar', {
        openid: {type: String, default: ''},
        licenseno: { type: String, index: { kind: 'UNIQUE' }, default: '' },
        carbrand:{type:String,default: ''},
        cartype:{type:String,default: ''},
//        insuredname: { type: String, default: '' },
//        mobile: { type: String, length: 20, default: '' },
//        identifynumber: { type: String, length: 20 },
//        HPZL: String,
//        CLSBDH: String,
        bindState:{type:Number,length:11,default:-1}//-1,初始状态，0审核中，1绑定，2审核不通过
    });

    return publicUser;
};

module.exports = publicUser;
//# sourceMappingURL=publicUser.js.map
