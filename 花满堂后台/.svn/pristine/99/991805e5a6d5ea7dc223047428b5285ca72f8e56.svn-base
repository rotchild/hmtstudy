/**
 * Created by zhou on 2014/5/4.
 * task.ts 依据数据库文档定义任务表,每个案件对应多个任务(调度、查勘等)
 */

var Schema = require('jugglingdb').Schema;
var task = function (schema) {
    return schema.define('task', {
        openid: {type: String, length: 200},
        realname: {type: String, length: 200},
        address: {type: String, length: 200},
        mobile: {type: String, length: 200, default: ''},
        ordertime: {type: String, length: 200},//订餐时间
        diningtime: {type: String, length: 200},//就餐时间
        ordertabletime: {type: String, length: 200},//订位时间
        sumoney: {type: Number, dataType: 'decimal', precision: 11, scale: 4, "default": 0.0000},
        taskstatus: {type: Number, length: 11},//1已下单，2正在出单，3派送中，4订单完成，5结账
        tasktype: {type: Number, length: 11},////1：堂食，2外卖，3杂食,4订位，5订位堂食点餐
        dishids: Schema.Text,//菜单总类  [{"id":1,"menuname":"炒饭","count":2,"dishurl":""},{"id":2,"menuname":"蛋炒饭","count":2,"dishurl":""}]
        peoplecount: {type: Number, length: 11},//就餐人数
        isprint: {type: Number, length: 11},//是否打印过
        sex: {type: Number, length: 11},//性别
//        checkresult:Schema.Text,
        paymethod: {type: Number, length: 11, default: 0},//0代表未支付，1代表微信支付，2代表现金支付
        points: {type: Number, dataType: 'decimal', precision: 11, scale: 4, "default": 0.0000}//外卖价格
        , tableid: {type: String, length: 200},//桌号
        out_trade_no: {type: String, length: 200}//对应商户交易编号
        , cashpayment: {type: Number, dataType: 'decimal', precision: 11, scale: 4, "default": 0.0000}//现金支付
        ,remark: {type: String, length: 255}//备注
        ,reservationid:{type:String,length:30}//订位和订餐关联标识
    });
};
module.exports = task;

