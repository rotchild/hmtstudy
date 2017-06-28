/**
 * Created by zhou on 2014/5/4.
 * 武汉人保服务器平台错误描述类
 * @example 如何在项目中使用错误信息
 * 返回参数非法错误信息 errors.IllegalArgument
 */
var errors = {
    LackArgument : {
        name: 'LackArgument',
        message: '参数缺失'
    },
    submitRepeat: {
        name: 'submitRepeat',
        message: '您已经提交过评论，不能重复提交'
    },
    submitNull: {
        name: 'submitNull',
        message: '参数缺失'
    },
    existCar: {
        name: 'existCar',
        message: '请先解绑车辆再注销'
    },
    notexistMenu: {
        name: 'notexistMenu',
        message: '您未选择菜单，无法下单'
    },
    notexistTask: {
        name: 'notexistTask',
        message: '抱歉，该订单不存在，无法进行评价'
    },
    NoLogin: {
        name: 'NoLogin',
        message: '未登录用户'
    },
    NoInterface: {
        name: 'NoInterface',
        message: '不存在的接口'
    },
    DuplicateUser: {
        name: 'DuplicateUser',
        message: '用户名重复'
    },
    WrongLogin: {
        name: 'WrongLogin',
        message: '用户名或密码有误'
    },
    WrongPassWord: {
        name: 'WrongPassWord',
        message: '用户原始密码错误'
    },
    DuplicateMenuClassName: {
        name: 'DuplicateMenuClassName',
        message: '分类名称重复，请重新输入'
    },
    DuplicateDishName: {
        name: 'DuplicateDishName',
        message: '该分类下菜品名称重复，请重新输入'
    },
    NoTask: {
        name: 'NoTask',
        message: '此订单不是已下单的状态'
    },
    NoTask02: {
        name: 'NoTask02',
        message: '此订单不是正在出单的状态'
    },
    NoTask03: {
        name: 'NoTask03',
        message: '此订单不是派送中的状态'
    },
    NoTaskPayment: {
        name: 'NoTaskPayment',
        message: '此订单不是已下单且未支付状态'
    },
    NoPaymentTaskDetail: {
        name: 'NoPaymentTaskDetail',
        message: '此订单已经支付过'
    }
};
module.exports = errors;
//# sourceMappingURL=errors.js.map