(function() {
    var errors;
    errors = {
        WrongPermissionUser:{
            name:'WrongPermissionUser',
            message:'用户权限错误'
        },
        IllegalArgument:{
            name: 'IllegalArgument',
            message: '参数非法'
        },
        MissParams: {
            name: 'MissParams',
            message: '参数缺失'
        },
        NoLogin: {
            name: 'NoLogin',
            message: '未登录用户'
        },
        NoInterface: {
            name: 'NoInterface',
            message: '不存在的接口'
        },
        WrongLogin: {
            name: 'WrongLogin',
            message: '用户名或密码有误'
        },
        WrongVcode: {
            name: 'WrongVcode',
            message: '验证码错误'
        },
        DuplicateUser: {
            name: 'DuplicateUser',
            message: '用户名重复'
        },
        DuplicateOpenId: {
            name: 'DuplicateOpenId',
            message: '此OpenId已绑定'
        },
        DuplicateTelephone: {
            name: 'DuplicateTelephone',
            message: '此手机号已被绑定'
        },
        WrongUser: {
            name: 'WrongUser',
            message: '用户名密码不正确'
        },
        NoUser: {
            name: 'NoUser',
            message: '没有这个用户'
        },
        SystemError: {
            name: 'SystemError',
            message: '系统错误'
        },
        LackMoney: {
            name: 'LackMoney',
            message: '余额不足'
        },
        InvalidTrade: {
            name: 'InvalidTrade',
            message: '无效交易'
        },
        NoCase: {
            name: 'NoCase',
            message: '无对应案件'
        },
        CustomError: {
            name: 'CustomError',
            message: ''
        },
        NoSchedulerTime: {
            name: 'NoSchedulerTime',
            message: '无调度录入时间'
        },
        InvalidFileName:{
            name:'InvalidFileName',
            message:'文件名不合法'
        },
        FileNameLength:{
            name:'FileNameLength',
            message:'文件名长度不正确'
        },
        DuplicateArea:{
            name:'DuplicateArea',
            message:'机构代码重复'
        },
        DuplicateUserArea:{
            name:'DuplicateUserArea',
            message:'[用户名]或[机构]重复'
        }
    };

    module.exports = errors;

}).call(this);
