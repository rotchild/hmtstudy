/**
* @module api/business
* @author hustfyb 公众服务接口类
*/
///<reference path='../../ts/request/request.d.ts'/>
///<reference path='../../ts/underscore/underscore.d.ts'/>
///<reference path='../../ts/socket.io/socket.io.d.ts' />
///<reference path='../../ts/node/node.d.ts' />
///<reference path='../../ts/express/express.d.ts' />
///<reference path='../../ts/underscore/underscore.d.ts' />
///<reference path='../../ts/eventproxy/eventproxy.d.ts' />
///<reference path='../../ts/soap/soap.d.ts'/>
///<reference path='../../ts/xml2js/xml2js.d.ts'/>
var settings = require('../../settings');
var request = require('request');
var _ = require('underscore');
var errors = require('../libs/errors');
var models = require('../../models/business/index');
var businessmodels = require('../../models/business/index');
var redismodels = require('../../models/survey/index');
var EventProxy = require('eventproxy');
var path = require('path');
var hcUti = require('../libs/hcUti');
var geocoder = require('../libs/geocoder');
var router = require('./route');
var db = require('../libs/db');
var noop = function () {
};
var fs = require('fs');
var kue = require('../libs/bullLikeKue');
var jobs = kue.createQueue(settings);
var util = require('util');
//var WXPay = require('weixin-pay');
var message = require('./message');
var moduleName = "publicService";
//var wxpay = WXPay({
//    appid: 'wxd961ab01b07030dc',
//    mch_id: '10024480',
//    partner_key: '86B94F630AE281F840DA6211BEBC9424'
////    pfx: fs.readFileSync('./wxpay_cert.p12'),
//});
//var wxpay = WXPay({
//    appid: 'wxc693c3da755e4ecb',
//    mch_id: '1238059702',
//    partner_key: 'xdhasdfghjkloiuyteh781290ophbwer'
////    pfx: fs.readFileSync('./wxpay_cert.p12'),
//});
//var wxpay = WXPay({
//    appid: 'wxc693c3da755e4ecb',
//    mch_id: '1239039602',
//    partner_key: 'xdhqijdlophujidfuewanb234oi98ddd'
////    pfx: fs.readFileSync('./wxpay_cert.p12'),
//});
//统一下单
function getBrandWCPayRequest(args,callback){
    console.log('args:',args);
    var ep=new EventProxy();
    var otn = '20140703'+Math.random().toString().substr(2, 10);
    var out_trade_no=hcUti.formatDate(new Date(),'yyyyMMdd')+args.taskid+Math.random().toString().substr(6, 10);
    var cbresult='';
    console.log(out_trade_no);
    models.task.findOne({where:{id:args.taskid}},ep.done('confirmPay'));
    ep.once('confirmPay',function(result){
        if(result){
		console.log('1:',result);
            if(result.paymethod==0){
                settings.wxpay.getBrandWCPayRequestParams({
				openid: 'oQMKotxs3uH3eSMevIWEskT8yYO0',
//        openid:'oBJ6MuOlVFnapElSfOxJmVCNdk9w',
                    //openid: args.openid,
                    body: '公众号支付',
                    detail: '公众号支付',
//        out_trade_no: '20150801'+Math.random().toString().substr(2, 10),
                    out_trade_no:out_trade_no,
                    total_fee: 1,
//        total_fee: args.total_fee*100,
                    spbill_create_ip: '27.17.41.242',
                    notify_url: settings.publicAddr+'/wxpay/notify'
                }, function(err, result){
                    console.log('result:',result);
                    cbresult=result;
                    models.task.update({where:{id:args.taskid},update:{out_trade_no:out_trade_no}},ep.done('saveOut_trade'));
//                    callback(err,result);
                    // in express
//    res.render('wxpay/jsapi', { payargs:result })
                });
            }else{
                callback('已经支付过');
            }
        }
    });
    ep.once('saveOut_trade',function(result){
        callback(null,cbresult);
    })
    ep.fail(function (err) {
        console.log('[下单失败]', err);
        callback(err);
    });

}
exports.getBrandWCPayRequest=getBrandWCPayRequest;
function orderNotify1(args,cb){
    var ep=new EventProxy();
    var createtime=new Date().getTime().toString().substring(0,10);
    console.log('orderNotify:',args);
    if(!args){
        cb('systemerror',false);
    }
    else if (!args.out_trade_no||!args.transaction_id) {
        cb('systemerror',false);
    }else {
        var tradeid=args.out_trade_no.substring(8,15);
        findOrCreateTradeOrder(args.out_trade_no, ep.done('findOrder'));
        ep.once('findOrder', function (order) {
            if (order.result_code == 'SUCCESS') {
                console.log('此订单通知已经成功收到');
//                cb('systemerror', false);
                cb(null, true);
            } else {
                models.tradeorder.update({where: {out_trade_no: args.out_trade_no}, update: {
                    openid: args.openid,
                    transaction_id: args.transaction_id,
                    result_code: args.result_code,
                    return_code: args.return_code,
                    time_end: args.time_end,
                    total_fee: args.total_fee,
                    createTime: createtime
                }},ep.done('createTradeOrder'));
            }
        });
        ep.once('createTradeOrder',function(result){
            if(result){
                models.task.update({where:{id:tradeid},update:{out_trade_no:args.out_trade_no,paymethod:1}}, function (err, user) {
                    if (err) {
                        console.log('err:', err);
                        cb('systemerror', false);
                    } else {
                        console.log('此订单通知已经成功收到且状态更新到已支付');
//                        cb('systemerror', false);
                        cb(null, true);
                    }
                });
            }
        });
        ep.fail(function (err) {
            console.log('[订单支付通知]', err);
            cb('systemerror', false);
        });
//    cb(null,true);
    }
}
exports.orderNotify1=orderNotify1;
function findOrCreateTradeOrder(out_trade_no, cb) {
    console.log('out_trade_no;',out_trade_no);
    models.tradeorder.findOne({ where: { out_trade_no:out_trade_no } }, function (err, order) {
        if (err || order)
            return cb(err, order);
        models.tradeorder.create({ out_trade_no:out_trade_no }, cb);
    });
}
/**
* 模块初始化
*/
function init(app) {
    router(app);
//    orderquery();
    taskCancelByTime();
}
exports.init = init;

var needQueryArr=[];//paythmeod为3的所有数组
var orderIndex=0;//
var orderLength=0;
function orderquery(){
    console.log('init orderquery');
    needQueryArr=[];
    orderIndex=0;
    orderLength=0;
    var ep=new EventProxy();
    var sql_forOrderQuery='SELECT * FROM `task` where paymethod=3 and out_trade_no is NOT NULL;'
    db.query(sql_forOrderQuery,[],ep.done('getPayTask'));//查询已付款但是后台没有收到支付通知的订单
    ep.once('getPayTask',function(result){
        console.log('getPayTask',result.length);
        if(result.length>0){
            needQueryArr=result;
            orderLength=needQueryArr.length;//记录查询已支付但是未到账的订单；
            weixinOrderQuery();
        }
         setTimeout(function(){orderquery();},30*1000);    //3分钟再次调用
    })
};
var s=0;
function weixinOrderQuery(){
    console.log('orderIndex:',orderIndex,'orderLength:',orderLength);
    settings.wxpay.queryOrder({ out_trade_no:needQueryArr[orderIndex].out_trade_no}, function(err, result){
        if(result.trade_state=='SUCCESS'){
            models.task.update({where:{id:needQueryArr[orderIndex].id},update:{paymethod:1}},function(err,_result){
                orderIndex++;
                s++;
                console.log('s:',s);
                if(orderIndex<orderLength){
                    weixinOrderQuery();
                }
            });
        }else{
            console.log('订单未支付或订单无效:',needQueryArr[orderIndex].out_trade_no);
            orderIndex++;
            if(orderIndex<orderLength){
                weixinOrderQuery();
            }
        }

    });
}
var dealTask=[];
var dealTaskIndex=0;
function taskCancelByTime(){
    var ep=new EventProxy();
    dealTask=[];
    dealTaskIndex=0;
    var timeNow=parseInt(new Date().getTime()/1000);
    var TimingStamp=timeNow-30*60;
//    var sql_getTask="select * from task where UNIX_TIMESTAMP(ordertime)<"+TimingStamp+" and paymethod = 0 and taskstatus <> -1 and tasktype in (1);";
    var sql_getTask="select * from task where UNIX_TIMESTAMP(ordertime)<"+TimingStamp+" and paymethod = 0 and taskstatus = 1 and tasktype in (1,2,3);";
    console.log('sql_getTask',sql_getTask);
    db.query(sql_getTask,[],function(_err,_result){
        if(_err){
            console.log('taskCancelByTime_err:',_err);
        }else{
            if(_result.length>0){
                dealTask=[];
                for(var i=0;i<_result.length;i++){
                    if(_result[i].tasktype==1&&_result[i].reservationid){
                        if(_result[i].taskstatus==1&&_result[i].paymethod==0){
                            dealTask[dealTask.length]=_result[i];
                        }
                    }else if(_result[i].tasktype==2||_result[i].tasktype==3){
                        dealTask[dealTask.length]=_result[i];
                    }
                }
                console.log('dealTask:',dealTask.length);
                dealTME(0,dealTask,function(err,result){
                    console.log('err,result:',err,result);
                    setTimeout(function(){taskCancelByTime();},2*60*1000);
                });//取消订单并还原库存的事务；
            }else{
                console.log('规定时间内没有订单需要处理并还原库存,两分钟后再次轮询'+new Date());
                setTimeout(function(){taskCancelByTime();},2*60*1000);
            }
        }

    });

};
function dealTME(_index,_dealTask,cb){
    console.log('_index:',_index);

    var dishids=[];
    var Arr=_dealTask;
    var Arr_index=_index;
    if(Arr_index>=Arr.length){
        return cb(null,'over');
    }
    console.log('taskid:',_dealTask[_index].id);
    try{
        dishids=JSON.parse(Arr[Arr_index].dishids);
    }catch(_error){
        console.log('dealTME_ERROR:',_error);
        dishids=[];
    }
    if(dishids.length==0){
        console.log('订单异常：taskid：'+Arr[Arr_index].id);
        Arr_index++;
        dealTME(Arr_index,Arr,cb);
    }else{
        var sqlCmd='';
        var sqlCmd1="update task set taskstatus=-1 where id="+Arr[Arr_index].id+" and taskstatus=1 and paymethod=0;";
        if(Arr[Arr_index].reservationid&&Arr[Arr_index].tasktype==1){
            var dw_id=Arr[Arr_index].reservationid.toString().split('_')[0];
            sqlCmd+="update task set taskstatus=-1 where id="+dw_id+";";
        }
//        sqlCmd="update task set taskstatus=-1 where id="+Arr[Arr_index].id+";";
        sqlCmd+="update evaluation set code = -1 where taskid ="+Arr[Arr_index].id+";";
        for(var i=0;i<dishids.length;i++){
            sqlCmd += "update menu set dishcount = dishcount + " + dishids[i].menucount + ", sellcount = sellcount - " + dishids[i].menucount + " where id = " + dishids[i].menuid + ";";
        }
        console.log("sqlCmd语句为：", sqlCmd);
        db.query(sqlCmd1,[],function(err,result){
            if(err){
                console.log('dealTME_query_err:',err);
                Arr_index++;
                dealTME(Arr_index,Arr,cb);
            }
            else{
                if(result.changedRows==0){
                    console.log('订单取消失败，可能是系统已自动取消过！');
                    Arr_index++;
                    dealTME(Arr_index,Arr,cb);
                }else{
                    db.query(sqlCmd,[],function(err,result){
                        if(err){
                            console.log('dealTME_query_err:',err);
                            Arr_index++;
                            dealTME(Arr_index,Arr,cb);
                        }else{
                            Arr_index++;
                            dealTME(Arr_index,Arr,cb);
                        }
                    });
                }
            }
        });
    }

}


function findOrCreatePublicUser(openid, cb) {
    models.publicUser.findOne({ where: { openid: openid } }, function (err, user) {
        if (err || user)
            return cb(err, user);
        models.publicUser.create({ openid: openid }, cb);
    });
}
/*
* 模板消息的基本格式，生成模板消息需要开通模板消息的公众服务号进行测试
**/
function updateChannel(args,callback){//为人工服务的案件点击后update publicclient的channel为当前订阅的channel
    console.log("updateChannel:", args);
    redismodels.publicclient.update({where:{openId:args.openid},update:{channel:args.channel}},function (err, users) {
        if (err) {
            return callback(errors.SystemError);
        } else {
            return callback(null, users);
        }
    })
}
exports.updateChannel = updateChannel;
function mqttWebTopic(args,callback){
    var tasktype=args.tasktype.toString();
    jobs.create('mqttMessagePub', { topic: 'customer', message: JSON.stringify({ openid:args.openid, tasktype: args.tasktype }) });
    switch (tasktype){
        case "1":
            jobs.create('message', _.extend({touser:args.openid},message.commitOrderSuccess));
            break;
        case "2":
            var messageStr="尊敬的客户：您好！您的订单："+args.id+"已确认。订单信息如下：\n预约服务项目："+args.orderSet+"元保养套餐\n"+
                "预约服务方式："+args.isvisited+"\n预约时间："+args.ordertimelot+"\n预约地址："+args.address+"\n预约服务车型信息："+
                args.cartype+"\n您也可以通过信达鸿微信公众号查询订单信息。如有疑问，请拨打24小时服务热线：400-027-8499。 祝您生活愉快！"
            var messageStr1={
                msgtype:'text',
                text:{
                    content:messageStr
                }
            }
            jobs.create('message', _.extend({touser:args.openid},messageStr1));
            break;
        case "5":
            var messageStr="您好！您的爱车已开始保养。您可以点击视频直播，观看您的爱车保养状况。谢谢您的关注，祝您生活愉快!";
            var messageStr1={
                msgtype:'text',
                text:{
                    content:messageStr
                }
            }
            jobs.create('message', _.extend({touser:args.openid},messageStr1));
            break;
        case "6":
            var messageStr="您好！您的爱车已保养完毕，检测报告正在发送中，请您注意查看，以便给您爱车更好的养护。祝您生活愉快！";
            var messageStr1={
                msgtype:'text',
                text:{
                    content:messageStr
                }
            }
            jobs.create('message', _.extend({touser:args.openid},messageStr1));
            break;
        case "0":
            var messageStr=util.format(message.chean1Message.text.content,args.licenseno,args.eventdate);
            var messageStr1={
                msgtype:'text',
                text:{
                    content:messageStr
                }
            }
            jobs.create('message', _.extend({touser:args.openid},messageStr1));
            break;

        default:
            jobs.create('message', _.extend({touser:args.openid},message.RGtaskMessage));
            break
    }

    callback(null,true);
}
exports.mqttWebTopic=mqttWebTopic;
function getEndTaskMessageResponse(args,callback){
    console.log("getEndTaskMessageResponse:", args);
    var ep=new EventProxy();
    if (!(args.openid )||!(args.tasktype)) {
        return callback(errors.LackArgument);
    }
    var tasktype=args.tasktype.toString();
    switch (tasktype){
        case "0":
            jobs.create('message', _.extend({ touser: args.openid }, message.getEndTaskMessage0));
            break;
        case "2":
            var messageStrTokehu="尊敬的客户：您好！您的订单："+args.id+"已确认。订单信息如下：\n预约服务项目："+args.orderSet+"元保养套餐\n"+
                "预约服务方式："+args.isvisited+"\n预约时间："+args.ordertime+"\n预约地址："+args.address+"\n预约服务车型信息："+
                args.cartype+"\n您也可以通过信达鸿微信公众号查询订单信息。如有疑问，请拨打24小时服务热线：400-027-8499。 祝您生活愉快！"
            var messageStrTokehu1={
                msgtype:'text',
                text:{
                    content:messageStrTokehu
                }
            }
            jobs.create('message', _.extend({touser:args.openid},messageStrTokehu1));
            break;
        case "1":
            if(settings.platform=='hc'){
                message.yuyueSuccessTemplate.template_id='mZ8ZAVgI_Jefc8uRi3M5tjM7QKkEHWsQftD1qyZClfM';
            }else if(settings.platform=='xdh'){
                message.yuyueSuccessTemplate.template_id='v3Mr-076i3kOzODQ9wkWRXlwhAiJmItLdSjoihgICRY';
            }
            message.yuyueSuccessTemplate.url=settings.publicAddr+'/mobile/page_service/wodedingdan.html?action=wodedingdan';
            console.log(message.yuyueSuccessTemplate.url);
            var filledData = null;
            filledData = _.pick(message.yuyueSuccessTemplate.data,'first','keyword1','keyword2','keyword3','keyword4', 'keyword5');
            filledData['first']['value'] = "尊敬的客户：您好！您的订单："+args.id+"已确认。订单信息如下：";
            filledData['keyword1']['value'] = args.orderSet+"元保养套餐";
            filledData['keyword2']['value'] = args.isvisited;
            filledData['keyword3']['value'] = args.ordertime;
            filledData['keyword4']['value'] = args.address;
            filledData['keyword5']['value'] = args.cartype;
            var basicData = _.pick(message.yuyueSuccessTemplate.data,'remark');
            message.yuyueSuccessTemplate.data = _.extend(basicData, filledData);
//            console.log('yuyueSuccessTemplate:',yuyueSuccessTemplate);
            var messageStrToguwen={
                msgtype:'text',
                text:{
                    content:'你有新任务啦！订单编号:'+args.id
                }
            }
            jobs.create('message', _.extend({ touser: args.openid }, message.yuyueSuccessTemplate));
            if(args.gopenid){
                jobs.create('message', _.extend({touser:args.gopenid},messageStrToguwen));
            }
            if(args.bopenid){
                jobs.create('message', _.extend({touser:args.bopenid},messageStrToguwen));
            }
            break;
        default:
            jobs.create('message', _.extend({ touser: args.openid }, message.getEndTaskMessage));
            break;
    }
//    jobs.create('getUserControl', { module: '', openid:args.openid, tag: '' });
    callback(null,true);
}
exports.getEndTaskMessageResponse = getEndTaskMessageResponse;
function verifyCarPass(args,callback){
    console.log("verifyCarPass:");
    var ep=new EventProxy();
    if (!(args.openid )||!(args.tasktype)) {
        return callback(errors.LackArgument);
    }
    var tasktype=args.tasktype.toString();
    switch(tasktype){
        case "16":
            jobs.create('message', _.extend({ touser: args.openid }, message.getcarPass));
            break;
        default:
            jobs.create('message', _.extend({ touser: args.openid }, message.getcarPass));
            break;
    }
    callback(null,true);
}
exports.verifyCarPass = verifyCarPass;
function verifyCarFail(args,callback){
    console.log("verifyCarFail:");
    var ep=new EventProxy();
    if (!(args.openid )||!(args.tasktype)||!(args.message)) {
        return callback(errors.LackArgument);
    }
    var tasktype=args.tasktype.toString();
//    var messageStr=
    var verifyCarFailMessage={
      msgtype:'text',
        text:{
            content:'尊敬的客户：您好！您的车辆审核不通过原因为：'+args.message
        }
    };
    switch(tasktype){
        case "16":
            jobs.create('message', _.extend({ touser: args.openid }, verifyCarFailMessage));
            break;
        default:
//            jobs.create('message', _.extend({ touser: args.openid }, message.getcarPass));
            break;
    }
    callback(null,true);
}
exports.verifyCarFail = verifyCarFail;
function getTaskMessageResponse(args,callback){
    console.log("getTaskMessageResponse:", args);
    var ep=new EventProxy();
    if (!(args.openid )||!(args.tasktype)) {
        return callback(errors.LackArgument);
    }
    var tasktype=args.tasktype.toString();
    switch (tasktype){
        case "0":
            jobs.create('message', _.extend({ touser: args.openid }, message.getTaskMessage0));
            break;
        case "3":
            jobs.create('message', _.extend({ touser: args.openid }, message.getTaskMessage3));
            break;
        case "6":
            jobs.create('message', _.extend({ touser: args.openid }, message.getTaskMessage6));
            break;
        case "12":
            jobs.create('message', _.extend({ touser: args.openid }, message.getTaskMessage12));
            break;
        case "14":
            console.log("14:",args.casestypes);
            if(args.casestypes==0){
                jobs.create('message', _.extend({ touser: args.openid }, message.getTaskMessage14_1));
            }else{
                jobs.create('message', _.extend({ touser: args.openid }, message.getTaskMessage14_2));
            }
            break;
        case "15":
            jobs.create('message', _.extend({ touser: args.openid }, message.getTaskMessage15));
            break;
        case "17":
            jobs.create('message', _.extend({ touser: args.openid }, message.getTaskMessage17));
            break;
        case "18":
            jobs.create('message', _.extend({ touser: args.openid }, message.getTaskMessage17));
            break;
        case "19":
            jobs.create('message', _.extend({ touser: args.openid }, message.getTaskMessage17));
            break;
        case "20":
            jobs.create('message', _.extend({ touser: args.openid }, message.getTaskMessage17));
            break;
        case "21":
            jobs.create('message', _.extend({ touser: args.openid }, message.getTaskMessage3));
            break;
        default:
            jobs.create('message', _.extend({ touser: args.openid }, message.getTaskMessage));
            break;
    }
    jobs.create('getUserControl', { module: 'publicbusiness', openid:args.openid, tag: '' });
    callback(null,true);
}
exports.getTaskMessageResponse = getTaskMessageResponse;

/**
 * historyMessage 获取历史消息接口
 * @param args express请求对象
 * @param callback 回调结果(err,result)
 */
function historyMessage(args, callback) {
    console.log("publicService:his",args);
//    var tasktype = (args.channel.split('/'))[1] ? (args.channel.split('/'))[1] : '';
    var result = [];
    redismodels.publicmessage.all({ where: { channel: args.channel } }, function (err, data) {
//        console.log("返回的数据1：",err);
//        console.log("返回的数据2：",data);
        if (!err && data.length > 0) {
            data.forEach(function (msg) {
                if (msg.channel) {
                    result.push(msg);
                }
            });
            callback(null, result);
        } else {
            callback(err, null);
        }
    });
}
exports.historyMessage = historyMessage;

/**
 * 获取进入报案/查勘模块所有用户列表,用于mqttClient进行订阅
 * @param args
 * @param callback
 */
function getUserList(args, callback) {
    console.log("request getUserList");
    redismodels.publicclient.all(function (err, users) {
        if (err)
            return callback(errors.SystemError);
        callback(null, users);
    });
}
exports.getUserList = getUserList;
function getMessageResponse(args, callback) {
    console.log("进入getMessageResponse:", args);
    if (!(args.content !== null)) {
        return callback(errors.LackArgument);
    }
    try  {
        var data = JSON.parse(args.content);
    } catch (Error) {
        console.log("Error:" + Error.message);
        callback(Error, false);
    }
    var filledData = null;
    if (data.choice.toString() === '0') {
        filledData = _.pick(message.auditFailTemplate.data, 'keyword1', 'keyword2', 'keyword3', 'keyword4');
        filledData['keyword1']['value'] = data.carmark;
        filledData['keyword2']['value'] = data.JSZH;
        filledData['keyword3']['value'] = data.YXQZ;
        filledData['keyword4']['value'] = data.message;
        var basicData = _.pick(message.auditFailTemplate.data, 'first', 'remark');
        message.auditFailTemplate.data = _.extend(basicData, filledData);
        jobs.create('message', _.extend({ touser: data.openid }, message.auditFailTemplate));
    } else if (data.choice.toString() === '1') {
        filledData = _.pick(message.auditSuccessTemplate.data, 'keyword1', 'keyword2', 'keyword3');
        filledData['keyword1']['value'] = data.carmark;
        filledData['keyword2']['value'] = data.JSZH;
        filledData['keyword3']['value'] = data.YXQZ;
        var basicData = _.pick(message.auditSuccessTemplate.data, 'first', 'remark');
        message.auditSuccessTemplate.data = _.extend(basicData, filledData);
        jobs.create('message', _.extend({ touser: data.openid }, message.auditSuccessTemplate));
    }
    jobs.create('mqttMessagePub', { topic: 'verifyMiss', message: JSON.stringify({ openid: data.openid }) });
    callback(null, true);
}
exports.getMessageResponse = getMessageResponse;
function wechat(req,res){
    console.log("进入微信");

    console.log(req.query.key);
    console.log(decodeURI(req.query.key));
}
exports.wechat = wechat;
function route(req, res) {
    //校验用户身份
    console.log("进入route");
    var userPath = 'PinPoint';
    var code = req.query.code;
    var action = req.params.action;
    var ep = new EventProxy();
    var openid;
    var url = settings.weChatServer + "/weChat/getOpenID?code=" + code;
    request.get({ url: url, json: true }, ep.done('getUser'));
    ep.once('getUser', function (response, body) {
        if (body && body.data) {
            openid = body.data;
			console.log("getOpenid",openid);
            findOrCreatePublicUser(openid, ep.done('routePage'));
        } else {
            ep.emit('error', errors.NoUser);
        }
    });
    ep.once('routePage', function (user) {
        if (user) {
            switch (action) {
                case "firstpage":
//                    url = "/mobile/index.html?openid=" + openid;
                    url = "/hmtweb/mobile/sessioncheck.html?openid="+openid+"&dir=/hmtweb/mobile/NewestPage/index.html?action="+action;
                    break;
                case "vipxingxi":
//                    url = "/mobile/page_huiyuan/vipxingxi.html?openid=" + openid;
                    url = "/hmtweb/mobile/sessioncheck.html?openid="+openid+"&dir=/hmtweb/mobile/NewestPage/vip/Vip.html?action="+action;
                    break;
                /*
                * 兴达鸿
                * */
                case "test":
//                    if(user.bindState){
//                        url="mobile/page_service/yuyueService.html?openid="+openid;
//                    }else{
//                        url= "/mobile/page_vip/register.html?openid=" + openid+"&bt=1";
//                    }
                    url = "/mobile/sessioncheck.html?openid="+openid+"&dir=/mobile/test.html&action="+action;
                    break;
                case "yuyuefuwu":
                    url = "/mobile/sessioncheck.html?openid="+openid+"&dir=/mobile/page_service/serviceDetail.html&action="+action;
//                    if(user.bindState){
//                        url = "/mobile/sessioncheck.html?openid="+openid+"&dir=/mobile/page_service/serviceDetail.html&action="+action;
////                        url = "/mobile/sessioncheck.html?openid="+openid+"&dir=/mobile/page_service/yuyueService.html&action="+action;
////                        url="mobile/page_service/yuyueService.html?openid="+openid;
//                    }else{
////                        url= "/mobile/page_vip/register.html?openid=" + openid+"&bt=1";
//                        url = "/mobile/sessioncheck.html?openid="+openid+"&dir=/mobile/page_vip/register.html&action="+action;
//                    }

                    break;
                case "mendiandaohang":
                    url="mobile/page_mendian/mendiandaohang.html?openid="+openid;
                    break;
                case "onlineService":
                    url="http://www.baidu.com?openid="+openid;
                    break;
                case "yingjijiuyuan":
                    url="mobile/page_mendian/yingjijiuyuan.html?openid="+openid;
                    break;
                case "baoxianzhitongche":
                    url="http://www.baidu.com?openid="+openid;
                    break;
                case "wodezhiliao":
                    if(user.bindState){
                        url = "/mobile/sessioncheck.html?openid="+openid+"&dir=/mobile/page_vip/vipInformation.html&action="+action;
//                        url= "/mobile/page_vip/vipInformation.html?openid=" + openid+"&bt=1";
                    }else{
                        url = "/mobile/sessioncheck.html?openid="+openid+"&dir=/mobile/page_vip/register.html&action="+action;
//                        url= "/mobile/page_vip/register.html?openid=" + openid+"&bt=1";
                    }
                    break;
                case "baoxianzhitongche":
                    url="http://www.baidu.com?openid="+openid;
                    break;
                case "wodedingdan":
                    url = "/mobile/sessioncheck.html?openid="+openid+"&dir=/mobile/page_service/wodedingdan.html&action="+action;
//                    url="/mobile/page_service/wodedingdan.html?openid="+openid;
                    break;
                case "workentry":
//                    url = "/mobile/sessioncheck.html?openid="+openid+"&dir=/mobile/page_houtai/login.html&action="+action;
//                    url="/mobile/page_service/wodedingdan.html?openid="+openid;
                    models.user.findOne({where:{openid:openid,roles:{inq:[2,3]}}},ep.done('findWorker'));
                    ep.once('findWorker',function(result){
                        if(result){
                            console.log("result",result.roles);
                            if(result.roles==2){
//                                callback(null,result.roles);
                                console.log('2222');
                                url='/mobile/page_houtai/guwenTask.html?openid='+openid+'&id='+result.id+'&outletid='+result.outletid+'&username='+result.username;
//                        res.redirect('/mobile/page_houtai/guwenTask.html?openid='+openid);
                            }
                            else if(result.roles==3){
                                console.log('33333');
//                                callback(null,result.roles);
                                url='/mobile/page_houtai/banzuTask.html?openid='+openid+'&id='+result.id+'&outletid='+result.outletid+'&username='+result.username;
//                        res.redirect('/mobile/page_houtai/banzuTask.html?openid='+openid);
                            }else{
                                console.log('4444');
                                url='/mobile/page_houtai/login.html?openid='+openid;
                            }
                        }else{
                            url='/mobile/page_houtai/login.html?openid='+openid;
                        }
                        console.log("url:" + url);
                        res.redirect(url);
                    })
                    break;




                case "firstPage":
                    url = "/mobile/index.html?openid=" + openid;
                    break;
                case "vip":
                    if(user.bindState){
                        url= "/mobile/zuizhongban/huiyuan/huiyuan.html?openid=" + openid+"&bt=1";
                    }else{
                        url= "/mobile/zuizhongban/huiyuan/zhuce.html?openid=" + openid+"&bt=1";
                    }
//                    url= "/mobile/zuizhongban/huiyuanzhuanqu.html?openid=" + openid+"&bt=1";

                    break;
				case "zhuanshufuwu":
                    url= "/mobile/zuizhongban/zhuanshufuwu.html?openid=" + openid+"&bt=1";
                    break;				
                case "sh_jf_consume":
                    models.bsrelated.all({where:{openid:openid}},ep.done('getBsBind'));
                    ep.once('getBsBind',function(bsuser){
                       if(bsuser){
                           console.log('getBsBind:',bsuser);
                           if(bsuser.length==0){
                               url='/mobile/page_ZiLiaoBind/CommercialBinding.html?openid='+openid;
                           }else if(bsuser.length==1){
                               url='mobile/sh_jf_consume.html?openid='+openid+'&bid='+bsuser[0].bid;
                           }else if(bsuser.length>=2){
                               console.log("2");
                               url="mobile/ShopEntrance.html?openid="+openid;
                           }else{
                               url="http://www.hao123.com";
                           }
                       }
                        console.log("url:" + url);
                        res.redirect(url);
                    });
//                    if (user.bindState) {
//                        url='mobile/sh_jf_consume.html?openid='+openid;
//                    }else{
//                        url='mobile/page_ZiLiaoBind/DataBind.html?openid='+openid;
//                    }
                    break;
                case "jf_consume":
                    if (user.bindState) {
//                        url='http://42.96.199.56:7091/mobile/jf_consume.html?openid='+openid;
                        url='mobile/jf_consume.html?openid='+openid;
                    }else{
                        url='mobile/page_ZiLiaoBind/DataBind.html?openid='+openid;
                    }
                    break;
                case "myOrder":
                    url='mobile/page_MyPrivilege/MyOrder.html?oi='+openid+"&bt=1";
                    break;
                case "weizhangchaxun":
                    url='mobile/page_LiPeiService/WeiZhangChaXun.html?oi='+openid+"&bt=1";
                    break;
                case "nianjian":
                    console.log("nianjian:",openid);
                    url='mobile/Developing1.html?oi='+openid+"&bt=1";
                    break;
                case "xichebaoyang":
                    url='mobile/page_ServiceWangDian/CarNetworkCooperation.html?oi='+openid+"&bt=1";
                    break;
                case "jiuhoudaijia":
                    url='mobile/DaiJia.html?oi='+openid+"&bt=1";
                    break;
                case "rengongzixun":
                        url='mobile/zaixianzixun.html?oi='+openid+"&bt=1";
                    break;
                case "zhifuzhongxin":
                    if(user.bindState==1){
                        url = "mobile/page_MyPrivilege/zhifuzhongxin.html?oi="+openid+"&bt=1";
                    }else{
                        url = "mobile/page_ZiLiaoBind/DataBind.html?oi="+openid+"&bt=1";
                    }
                    break;
                case "ziliaobangding":
                    if (user.bindState == 1) {
                        url = "mobile/page_ZiLiaoBind/MyInfo.html?oi="+openid+"&bt=1";
                    } else {
                        url = "mobile/page_ZiLiaoBind/DataBind.html?oi="+openid+"&bt=1";
                    }
                    break;
                case "personalCenter":
                    url="mobile/page_MyPrivilege/MyPrivilege02.html?openid="+openid;
                    break;
                case "Developing2":
                    console.log("Developing2");
                    url = "/mobile/Developing2.html?openid=" + openid+"&bt=1";
                    break;
                case "myshuqiu":
                    console.log("myshuqiu");
                    url = "/mobile/page_WoDeAppeal/WoDeAppeal.html?openid=" + openid;
                    break;
                case "page_searchInfo":
                    url = "http://60.216.89.238:808/fcmm/Checkinform/checkinform.jsp";
                    if (user.bindState) {
                        url += hcUti.concatParams(['plate_number', 'frame_number'], [user.carmark, user.CLSBDH]);
                    }
                    break;
                case "page_checklpinform":
                    url = "http://60.216.89.238:808/fcmm/Checkinform/checklpinform.jsp";
                    if (user.bindState) {
                        url += hcUti.concatParams(['plate_number', 'frame_number'], [user.carmark, user.CLSBDH]);
                    }
                    break;
                case 'page_userManage':
                    if (user.bindState) {
                        url = "/mobile/userManage.html#page_userInfo?openid=" + openid + "&env=" + process.env.wechat;
                    } else {
                        url = "/mobile/userManage.html#page_userBind?openid=" + openid;
                    }
                    break;
                case "page_pinPoint":
                    if (user.bindState === 0) {
                        url = "/mobile/userManage.html#page_userBind?openid=" + openid;
                        console.log("进入未绑定页面:");
                    } else if (user.bindState === 1 && !user.JSZH) {
                        url = "/mobile/userManage.html#page_userInfo?openid=" + openid + "&userPath=" + userPath + "&env=" + process.env.wechat;
                    } else if (user.bindState && user.driverStatus === 2 && user.JSZH) {
                        url = "/mobile/lawQuery.html#page_removeResult";
                        url += hcUti.concatParams(['openid', 'carMark', 'carOwner', 'HPZL', 'CLSBDH', 'userPath', 'env'], [openid, user.carmark, user.realname, user.HPZL, user.CLSBDH, userPath, process.env.wechat]);
                        console.log("直接进入销分url:");
                    } else if (user.bindState && user.driverStatus === 3) {
                        url = "/mobile/userManage.html#page_userInfo?openid=" + openid + "&userPath=" + userPath + "&env=" + process.env.wechat;
                    } else {
                        url = "/mobile/userManage.html#page_userInfo?openid=" + openid + "&userPath=" + userPath + "&env=" + process.env.wechat;
                    }
                    break;
                case 'page_carManage':
                    console.log("page_carManage");
                    url="http://www.baidu.com";
//                    url = "/mobile/userManage.html#page_userBind?openid=" + openid;
//                    if (!user.bindState) {
//                        url = "/mobile/userManage.html#page_userBind?openid=" + openid;
//                    } else {
//                        url = "/mobile/lawQuery.html#" + action + "?openid=" + openid;
//                    }
                    break;
                default:
                    console.log("default");
//                    url = "/mobile/lawQuery.html#" + action + "?openid=" + openid;
                    break;
            }
            console.log("url:" + url);
            res.redirect(url);
        } else {
            ep.emit('error', errors.NoUser);
        }
    });
    ep.fail(function (err) {
        console.log('[publicService:route]', err);
        res.redirect("/mobile/Tips.html");
    });
}
exports.route = route;

/** 违章记录查询
* @param {object} args http请求输入参数
* @param {string} args.carMark 车牌号
* @param {string} args.HPZL 号牌类型
* @param {string} args.CLSBDH 车架号
* 交管局数据返回接口格式
* {
"WFXW": "10390",   违章代号
"WFSJ": "2013-05-21 15:56:52",  违章时间
"FKJE_MIN": "100",    罚款金额
"CLBJ": "0",
"FKJE_MAX": "100",    罚款最高金额
"HPZL": "02",       号牌种类
"WFBH": "",
"WFMS": "\u4e0d\u6309\u89c4\u5b9a\u505c\u8f66",   违章行为
"HPHM": "\u9c81AKY003",    车牌号
"WFDZ": "\u5386\u5c71\u8def",  违章地点
"CLSJ": "",
"WFJFS": "0",    违章记分
"IN_DATE": "2014-09-09"
}
*/
function lawQuery(args, cb) {
    var ep = new EventProxy();
    if (args.carMark && args.HPZL && args.CLSBDH) {
        console.log(settings.lawQuery.car + '&HPHM=' + args.carMark + '&HPZL=' + args.HPZL + '&CLSBDH=' + args.CLSBDH);
        request.get({
            url: settings.lawQuery.car + '&HPHM=' + args.carMark + '&HPZL=' + args.HPZL + '&CLSBDH=' + args.CLSBDH
        }, ep.done('verifyCar'));
        ep.once('verifyCar', function (status, body) {
            try  {
                console.log("body:", body);
                var result = JSON.parse(body);
                console.log("result:", result);
            } catch (Error) {
                console.log("Error:" + Error.message);
                ep.emit('error', Error);
            }
            process.on('uncaughtException', function (err) {
                console.log(err);
            });
            if (result.status == '0') {
                ep.emit('done', result);
            } else {
                var err = errors.CustomError;
                switch (result.status) {
                    case '1001':
                        err.message = '号牌号码错误';
                        break;
                    case '1002':
                        err.message = '号牌种类错误';
                        break;
                    case '1003':
                        err.message = '车辆识别代码错误';
                        break;
                    case '1004':
                        err.message = '车辆验证失败';
                        break;
                    case '1009':
                        err.message = '查询过于频繁';
                        break;
                    default:
                        console.log(result.status);
                        err.message = '系统错误';
                        break;
                }
                ep.emit('error', err);
            }
        });
        ep.once('done', function (result) {
            var desc = result.desc;
            if (args.flag === "PinPoint" && desc[0].WFJFS) {
                ep.after('lawStatus', desc.length, function (result) {
                    var finalResult = [];
                    for (var i = 0; i < result.length; i++) {
                        if ((_.isNull(result[i]))) {
                            desc[i]["paymentStatus"] = 0;
                        } else {
                            desc[i]["paymentStatus"] = result[i].paymentStatus;
                        }
                    }
                    console.log("desc:" + JSON.stringify(desc));
                    cb(null, desc);
                });
                for (var i = 0; i < desc.length; i++) {
                    businessmodels.law.findOne({ where: { WFSJ: new Date(desc[i].WFSJ).getTime(), paymentStatus: [-1, 1, 2] } }, ep.group('lawStatus'));
                }
            } else {
                _.each(desc, function (item) {
                    item["paymentStatus"] = 0;
                });
                cb(null, desc);
            }
        });
        ep.fail(cb);
    } else {
        cb(errors.LackArgument);
    }
}
exports.lawQuery = lawQuery;

/**
* lawPayStatus 查询该违章记录是否在山东太保系统中付款成功
* @param args
* @param callback
*/
function lawPayStatus(args, callback) {
    var ep = new EventProxy();
    if (args.data) {
        var data = JSON.parse(args.data);
        console.log("data:" + data);
        ep.after('lawStatus', data.length, function (result) {
            var finalResult = [];
            for (var i = 0; i < result.length; i++) {
                if (!(_.isNull(result[i]))) {
                    console.log(result[i]);
                    finalResult.push(result[i]);
                }
            }
            ep.emit('done', finalResult);
        });
        for (var i = 0; i < data.length; i++) {
            businessmodels.law.findOne({ where: { WFSJ: new Date(data[i].WFSJ).getTime(), paymentStatus: 1 } }, ep.group('lawStatus'));
        }
        ep.once('done', function (result) {
            callback(null, result);
        });
        ep.fail(function (error) {
            callback(error, null);
        });
    } else {
        callback(errors.LackArgument);
    }
}
exports.lawPayStatus = lawPayStatus;

/** 发送验证码
* @param {object} args http请求输入参数
* @param {string} args.telephone 手机号
* @param {string} args.openid 用户id
*/
var gb2312 = require('../libs/gb2312');
function sendVcode(args, cb) {
    var ep = new EventProxy();
    var vcode = '';
    if (args.telephone && args.openid) {
        models.publicUser.findOne({
            where: {
                openid: args.openid
            }
        }, ep.done('updateVcode'));
        ep.once('updateVcode', function (user) {
            console.log(Math.round(Date.now() / 1000));
            if (user) {
                vcode = Math.round(Math.random() * 899999 + 100000).toString();
                user.updateAttributes({
                    vcode: vcode,
                    vcodeTime: Math.round(Date.now() / 1000),
                    telephone: args.telephone
                }, ep.done('sendVcode'));
            } else {
                ep.emit('error', errors.NoUser);
            }
        });

        //        http://10.37.0.41:8080/Message/message.jsp?number_list=13971369767&message_contents=您的验证码为620227,在30分钟输入有效
        ep.once('sendVcode', function () {
            var str = '您的验证码为' + vcode + ',在30分钟输入有效。';
            request.get('http://10.37.0.41:8080/Message/message.jsp?number_list=' + args.telephone + '&message_contents=' + gb2312.URLEncode(str), ep.done('done'));
        });
    } else {
        ep.emit('error', errors.LackArgument);
    }
    ep.once('done', function () {
        cb(null);
    });
    ep.fail(function (err) {
        console.log('[sendVcode]', err);
        cb(err);
    });
}
exports.sendVcode = sendVcode;

/** 用户绑定
* @param {object} args http请求输入参数
* @param {string} args.openid 用户id
* @param {string} args.realname 姓名
* @param {string} args.vcode 验证码
* @param {string} args.drivingLicense 驾照
*/
function bindUser(args, cb) {
    var ep = new EventProxy();
    var wechatUser;
    args.carmark = args.carmark.toUpperCase();
    if (process.env.wechat === 'product') {
        models.publicUser.findOne({ where: { carmark: args.carmark } }, ep.done('verifyBindCar'));
        ep.once('verifyBindCar', function (car) {
            console.log("car:", car);
            if (car) {
                ep.emit('error', errors.CarAlreadyBind);
            } else {
                models.publicUser.findOne({ where: { openid: args.openid } }, ep.done('verfiyUser'));
            }
        });
    } else {
        models.publicUser.findOne({ where: { openid: args.openid } }, ep.done('verfiyUser'));
    }
    ep.once('verfiyUser', function (user) {
        if (!user) {
            ep.emit('error', errors.SystemError);
        } else if (user.bindState != null && user.bindState !== 0) {
            ep.emit('error', errors.UserAlreadyBind);
        } else if (Date.now() / 1000 - user.vcodeTime > 30 * 60) {
            ep.emit('error', errors.ExpireVcode);
        } else if (user.vcode !== args.vcode) {
            ep.emit('error', errors.WrongVcode);
        } else {
            wechatUser = user;
            request.get({ url: settings.lawQuery.car + '&HPHM=' + args.carmark + '&HPZL=' + args.bind_HPZL + '&CLSBDH=' + args.CLSBDH }, ep.done('verifyCar'));
        }
    });
    ep.once('verifyCar', function (res, body) {
        try  {
            var result = JSON.parse(body);
        } catch (Error) {
            console.log("Error:" + Error);
            ep.emit('error', Error);
        }
        process.on('uncaughtException', function (err) {
            console.log(err);
        });
        console.log(result); //JSON.parse解析body时可能出错
        if (result.status == '0') {
            models.publicCar.create({
                openid: args.openid,
                carMark: args.carmark,
                HPZL: args.bind_HPZL,
                CLSBDH: args.CLSBDH
            }, ep.done('bindUser'));
        } else {
            var err = errors.CustomError;
            switch (result.status) {
                case '1001':
                    err.message = '号牌号码错误';
                    break;
                case '1002':
                    err.message = '号牌种类错误';
                    break;
                case '1003':
                    err.message = '车辆识别代码错误';
                    break;
                case '1004':
                    err.message = '车辆验证失败';
                    break;
                case '1009':
                    err.message = '查询过于频繁';
                    break;
                default:
                    err.message = '系统错误';
                    break;
            }
            ep.emit('error', err);
        }
    });
    ep.once('bindUser', function () {
        wechatUser.updateAttributes({
            realname: args.realname,
            carmark: args.carmark,
            CLSBDH: args.CLSBDH,
            HPZL: args.bind_HPZL,
            bindState: 1
        }, ep.done('done'));
    });
    ep.once('done', function (user) {
        cb(null, user);
    });
    ep.fail(function (err) {
        console.log('[bindUser]', err);
        cb(err);
    });
}
exports.bindUser = bindUser;

/** 绑定驾照信息
* @param {object} args http请求输入参数
* @param {string} args.bind_JSZH 驾驶证
* @param {string} args.bind_DABH 档案号
* @param {string} args.openid 姓名
* @param {string} args.vcode 验证码
* @param {string} args.drivingLicense 驾照
*/
function bindJSZ(args, cb) {
    var ep = new EventProxy();
    var wechatUser;
    console.log(args);
    models.publicUser.findOne({
        where: { openid: args.openid }
    }, ep.done('verfiyUser'));
    ep.once('verfiyUser', function (user) {
        if (!user) {
            ep.emit('error', errors.SystemError);
        } else {
            wechatUser = user;
            console.log(settings.lawQuery.driver + '&JSZH=' + args.bind_JSZH + '&DABH=' + args.bind_DABH);
            request.get({ url: settings.lawQuery.driver + '&JSZH=' + args.bind_JSZH + '&DABH=' + args.bind_DABH }, ep.done('verifyDriver'));
        }
    });
    ep.once('verifyDriver', function (res, body) {
        try  {
            var result = JSON.parse(body);
        } catch (Error) {
            console.log("Error:" + Error);
            ep.emit('error', Error);
        }
        console.log(result); //JSON.parse解析body时可能出错
        if (result.status == '0') {
            var jsz = result.jsz[0];
            wechatUser.updateAttributes({
                JSZH: jsz.JSZH,
                DABH: jsz.DABH,
                YXQZ: jsz.YXQZ,
                LJJF: jsz.LJJF
            }, ep.done('done'));
        } else {
            var err = errors.CustomError;
            switch (result.status) {
                case '2001':
                    err.message = '驾驶证号错误';
                    break;
                case '2002':
                    err.message = '档案号格式错误';
                    break;
                case '2003':
                    err.message = '档案号验证错误';
                    break;
                case '2004':
                    err.message = '驾驶证验证失败';
                    break;
                default:
                    err.message = '系统错误';
                    break;
            }
            ep.emit('error', err);
        }
    });
    ep.once('done', function (user) {
        var messageStr = util.format(message.PinPointUploadImage.text.content, settings.publicAddr + "/detail/index.html#UpPhoto");
        var PinPointUploadImageMsg = {
            msgtype: 'text',
            text: {
                content: messageStr
            }
        };
        jobs.create('message', _.extend({ touser: user.openid }, PinPointUploadImageMsg));
        jobs.create('getUserControl', { title: 'getUserControl', module: moduleName, openid: user.openid, tag: "uploadPinPoint" });
        cb(null, user);
    });
    ep.fail(function (err) {
        console.log('[bindJSZ]', err);
        cb(err);
    });
}
exports.bindJSZ = bindJSZ;

/** 用户信息
* @param {object} args http请求输入参数
* @param {string} args.openid 用户id
*/
function userInfo(args, cb) {
    var ep = new EventProxy();
    if (args.openid) {
        models.publicUser.findOne({
            where: { openid: args.openid }
        }, ep.done('createUser'));
        ep.once('createUser', function (user) {
            if (user) {
                cb(null, user);
            } else
                models.publicUser.create({
                    openid: args.openid
                }, ep.done('sendUser'));
        });
        ep.once('sendUser', function (user) {
            cb(null, user);
        });
    } else {
        cb(errors.LackArgument);
    }
}
exports.userInfo = userInfo;
function deleteCar(args, cb) {
    console.log("args:", args);
    var ep = new EventProxy();
    models.publicCar.findOne({
        where: { openid: args.openid, carMark: args.carMark }
    }, ep.done('findPublicCar'));
    ep.once('findPublicCar', function (car) {
        if (car) {
            console.log("car存在");
            car.destroy();
            ep.emit('destroyCar');
        } else {
            cb(errors.NoCar, false);
        }
    });
    ep.once('destroyCar', function (result) {
        if (result) {
            console.log("result:", JSON.stringify(result));
            cb(null, true);
        } else {
            console.log("result:", result);
            cb(null, false);
        }
    });
    ep.fail(function (err) {
        console.log('[错误原因]', err);
        cb(err, false);
    });
}
exports.deleteCar = deleteCar;

/** 添加关注车辆
* @param {object} args http请求输入参数
* @param {string} args.openid 用户id
* @param {string} args.carMark 号牌
* @param {string} args.HPZL 号牌类型
*/
function addCar(args, cb) {
    args.carMark = args.carMark.toUpperCase();
    var ep = new EventProxy();
    var wechatUser;
    models.publicUser.findOne({
        where: { openid: args.openid }
    }, ep.done('verfiyUser'));
    ep.once('verfiyUser', function (user) {
        if (!user) {
            ep.emit('error', errors.SystemError);
        } else if (user.bindState !== 1) {
            var err = errors.CustomError;
            err.message = '请先绑定用户';
            ep.emit('error', err);
        } else if (user.carmark == args.carMark && user.bindState == 1) {
            var err = errors.CustomError;
            err.message = '该车辆已被绑定';
            ep.emit('error', err);
        } else {
            wechatUser = user;
            request.get({
                url: settings.lawQuery.car + '&HPHM=' + args.carMark + '&HPZL=' + args.HPZL + '&CLSBDH=' + args.CLSBDH
            }, ep.done('verifyCar'));
        }
    });
    ep.once('verifyCar', function (status, body) {
        console.log(body);
        try  {
            var result = JSON.parse(body);
        } catch (Error) {
            console.log("Error:" + Error.message);
            ep.emit('error', Error);
        }
        process.on('uncaughtException', function (err) {
            console.log(err);
        });
        console.log(result); //JSON.parse解析body时可能出错
        if (result.status == '0') {
            models.publicCar.all({ where: { openid: args.openid } }, ep.done('verifyCarExist'));
            ep.once('verifyCarExist', function (cars) {
                console.log('cars:', cars);
                if (!cars) {
                    ep.emit('error', errors.SystemError);
                } else if (cars.length < 2) {
                    models.publicCar.create({
                        openid: args.openid,
                        carMark: args.carMark,
                        HPZL: args.HPZL,
                        CLSBDH: args.CLSBDH
                    }, ep.done('done'));
                } else {
                    cb(errors.CarMore, false);
                }
            });
        } else {
            var err = errors.CustomError;
            switch (result.status) {
                case '1001':
                    err.message = '号牌号码错误';
                    break;
                case '1002':
                    err.message = '号牌种类错误';
                    break;
                case '1003':
                    err.message = '车辆识别代码错误';
                    break;
                case '1004':
                    err.message = '车辆验证失败';
                    break;
                case '1009':
                    err.message = '查询过于频繁';
                    break;
                default:
                    err.message = '系统错误';
                    break;
            }
            ep.emit('error', err);
        }
    });
    ep.once('done', function (user) {
        cb(null, user);
    });
    ep.fail(function (err) {
        console.log('[addCar]', err);
        cb(err);
    });
}
exports.addCar = addCar;

/** 车辆信息
* @param {object} args http请求输入参数
* @param {string} args.openid 用户id
*/
function carInfo(args, cb) {
    var ep = new EventProxy();
    if (args.openid) {
        models.publicCar.all({
            where: { openid: args.openid }
        }, ep.done('sendCar'));
        ep.once('sendCar', function (cars) {
            cb(null, cars);
        });
    } else {
        cb(errors.LackArgument);
    }
}
exports.carInfo = carInfo;

/**
* checkUnbind 解绑前添加检查接口，如在审核和销分任务进行中的用户将不能进行解绑
* @param args
* @param cb
*/
function checkUnbind(args, callback) {
    if (!(args.openid !== null)) {
        return callback(errors.LackArgument, 'fail');
    } else {
        businessmodels.task.all({ where: { frontoperator: args.openid, frontstate: 1, tasktype: ['审核', '销分'] } }, function (err, tasks) {
            if (err) {
                callback(err, 'fail');
            } else {
                if (tasks && tasks.length === 0) {
                    callback(null, 'success');
                } else {
                    callback(errors.noAllowUnbind, 'fail');
                }
            }
        });
    }
}
exports.checkUnbind = checkUnbind;

/**
* unbind 用户解绑 解绑时需清除该openid下正在进行的销分和审核任务
* @param {string} args.openid 用户id
* @param {string} args.vcode 验证码
*/
function unbind(args, cb) {
    var ep = new EventProxy();
    var wechatUser;
    models.publicUser.findOne({
        where: { openid: args.openid }
    }, ep.done('verfiyUser'));
    ep.once('verfiyUser', function (user) {
        if (!user) {
            ep.emit('error', errors.SystemError);
        } else if (Date.now() / 1000 - user.vcodeTime > 30 * 60) {
            ep.emit('error', errors.ExpireVcode);
        } else if (user.vcode !== args.vcode) {
            ep.emit('error', errors.WrongVcode);
        } else {
            wechatUser = user;
            db.query('delete from publicCar where openid=?', [wechatUser.openid], ep.done('updateUser'));
        }
    });
    ep.once('updateUser', function () {
        wechatUser.updateAttributes({
            DABH: '',
            YXQZ: '',
            LJJF: '',
            driverStatus: -1,
            JSZH: '',
            carMark: '',
            HPZL: '',
            CLSBDH: '',
            bindState: 0
        }, ep.done('done'));
    });
    ep.once('done', function (user) {
        cb(null, user);
    });
    ep.fail(function (err) {
        console.log('[unbind:]', err);
        cb(err);
    });
}
exports.unbind = unbind;

/**
* createOrder 创建商户系统中订单信息,用户确认时生成该订单号下订单，在当前页面时重复支付采用同一订单号。
* order中含有多种支付方式(payment) order->payment->laws->notify
* @param args
* @param callback
*/
function createOrder(args, callback) {
    var checked = args.checked;
    var c_order = _.omit(args, 'checked', 'tempOrderNo', 'partner');
    c_order.carOwner = decodeURI(c_order.carOwner);
    var tempOrder = null, tempPaymentNo = '';
    var ep = new EventProxy();
    businessmodels.order.findOne({ where: { orderNo: args.orderNo } }, ep.done('readOrder'));
    ep.once('readOrder', function (order) {
        if (order) {
            tempPaymentNo = order.orderNo;
            businessmodels.payment.count({ orderId: order.id, paymentMethod: args.paymentMethod, paymentStatus: 0 }, ep.done('countPayments')); //检查相同支付方式下是否只产生一笔支付记录
            ep.once('countPayments', function (result) {
                if (result > 0) {
                    businessmodels.law.count({ orderId: order.id }, ep.done('countLaws'));
                } else {
                    ep.emit('createOrder', order);
                }
            });
            ep.once('countLaws', function (result) {
                if (result > 0) {
                    ep.emit('payRequest');
                } else {
                    ep.emit('recordLaws', order);
                }
            });
        } else {
            businessmodels.order.create(c_order, ep.done('createOrder'));
        }
    });
    ep.once('createOrder', function (order) {
        if (order) {
            tempOrder = order;
            var payment = { paymentNo: order.orderNo, paymentMethod: args.paymentMethod, createTime: args.createTime };
            order.payments.create(payment, ep.done('createPayment'));
        } else {
            ep.emit("error", errors.createOrderError);
        }
    });
    ep.once('createPayment', function (payment) {
        if (payment) {
            tempPaymentNo = payment.paymentNo;
            ep.emit('recordLaws', tempOrder);
        } else {
            ep.emit('error', errors.createPaymentError);
        }
    });
    ep.once('recordLaws', function (order) {
        try  {
            var laws = JSON.parse(checked);
        } catch (error) {
            ep.emit("error", error);
        }
        ep.after('createLaws', laws.length, function (result) {
            if (result) {
                ep.emit('payRequest'); //发送支付请求要求
            } else {
                ep.emit("error", errors.createLawsError);
            }
        });
        for (var i = 0; i < laws.length; i++) {
            var lawRecord = _.omit(laws[i], ['IN_DATE', 'FKJE_MAX', 'WFXW', 'CLBJ', 'CLSJ']);
            lawRecord.WFSJ = (new Date(lawRecord.WFSJ)).getTime();
            console.log(lawRecord);
            order.laws.create(lawRecord, ep.group('createLaws'));
        }
    });
    ep.once('payRequest', function () {
        callback(null, true); //改由前台生成微信交易包
    });
    ep.fail(function (err) {
        console.log('[payPackage]', err);
        callback(err, false);
    });
}
exports.createOrder = createOrder;

function updateOrder(args, callback) {
    var ep = new EventProxy();
    businessmodels.order.findOne({ where: { orderNo: args.orderNo } }, ep.done('readOrder'));
    ep.once('readOrder', function (order) {
        if (order) {
            order.updateAttributes({ orderStatus: args.orderStatus }, ep.done('updateOrder'));
        } else {
            ep.emit("error", errors.readOrderError);
        }
    });
    ep.once('updateOrder', function (result) {
        if (result) {
            ep.emit('createNotify');
        } else {
            ep.emit("error", errors.updateOrderError);
        }
    });
    ep.once('createNotify', function () {
        var record = { orderNo: args.orderNo, notifyType: 0 };
        businessmodels.notify.create(record, ep.done('callbackResult'));
    });
    ep.once('callbackResult', function (notify) {
        if (notify) {
            callback(null, true);
        } else {
            ep.emit('error', errors.createNotifyError);
        }
    });
    ep.fail(function (err) {
        console.log('[updateOrder]', err);
        callback(err, false);
    });
}
exports.updateOrder = updateOrder;

function deleteOrder(orderNo, callback) {
    if (!(orderNo !== null)) {
        return callback(errors.LackArgument, 'fail');
    } else {
        var ep = new EventProxy();
        businessmodels.order.findOne({ where: { orderNo: orderNo } }, ep.done('readOrder'));
        ep.once('readOrder', function (order) {
            if (order) {
                order.destroy(noop);
                order.laws.destroyAll(noop);
                order.payments.destroyAll(noop);
                businessmodels.notify.findOne({ where: { orderNo: orderNo } }, ep.done('readNotify'));
            } else {
                ep.emit("error", errors.readOrderError);
            }
        });
        ep.once('readNotify', function (notify) {
            if (notify) {
                notify.destroy(noop);
                callback(null, 'success');
            } else {
                ep.emit("error", errors.readNotifyError);
            }
        });
        ep.fail(function (err) {
            console.log('[deleteOrder]', err);
            callback(err, 'fail');
        });
    }
}
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=publicService.js.map
//武汉人保调用接口
//通过openid获取publicUser信息
function getPublicUser(args, callback) {
    console.log("getPublicUser:", args);
    if (!args.openid) {
        return callback(errors.LackArgument, 'fail');
    }
    models.publicUser.findOne({
        where: { openid: args.openid }
    }, function (err, user) {
        if (err) {
            callback('error', errors.SystemError);
        } else {
            var today=new Date();
//            _.extend(result,{upoints:parseInt(user.points)-parseInt(products.points)});
            var todayLast=today.getFullYear()+'/'+(today.getMonth()+1) + '/' +today.getDate() + ' 23:59:59';
            var todayLastStamp=new Date(todayLast).getTime().toString().substr(0,10);
            _.extend(user,{todayLastStamp:todayLastStamp});
//            console.log(user);
            callback(null, user);
        }
    });
}
exports.getPublicUser = getPublicUser;
//扫描成功后
/*解析base64，获取商品id，商家id
1.通过openid，查询用户信息，主要是所余积分 user
2.通过商品id，查询消费所需积分 product
3.通过商户id，查询对应商户信息 business
4.如果user.points<product.points,返回“您的积分不足”，else进行消费相关操作
4.1 扣除用户积分update(points:parseInt(user.points)-parseInt(product.points));
4.2 增加对应商户积分update(points:parseInt(business.points)+parseInt(product.points));
4.3 生成订单，order.create({
uid:user.id,
uopenid:user.openid,
bid:business.id,
bopenid:business.openid,//二期修改，business去掉openid，新建表商户openid绑定商户
jobno:'',
pid:product.id,
pname:product.name,
points:product.points,
date:parseInt(new Date().getTime()/1000),
type:1,
reason:'',
remark:''
})
* */
function JFconsume(args, callback) {
    console.log("积分消费", args);
    var ep,user,products,business;
    if (!args.openid) {
        return callback(errors.LackArgument, 'fail');
    }
    var data = eval('(' + utf8to16(base64decode(args.data)) + ')');
    console.log("data:",data);
    ep=new EventProxy();
    models.publicUser.findOne({where:{openid:args.openid}},ep.done('getUser'));
    models.products.findOne({where:{id:data.pid}},ep.done('getProducts'));
    models.business.findOne({where:{id:data.bid}},ep.done('getBusiness'));
    ep.all('getUser','getProducts','getBusiness',function(getUser,getProducts,getBusiness){
        console.log("1",getUser);
        console.log("2",getProducts);
        console.log("3",getBusiness);
        if(hcUti.isEmptyStr(getUser)){
            return callback(errors.WrongUsers);
        }else if(hcUti.isEmptyStr(getProducts)){
            return callback(errors.WrongProducts);
        }else if(hcUti.isEmptyStr(getBusiness)){
            return callback(errors.WrongBusiness);
        }else {
            user=getUser;
            products=getProducts;
            business=getBusiness;
            console.log(user.points,products.points);
            if(user.points<products.points){
                return callback(errors.LackJF);
            }else{
                models.publicUser.update({where:{openid:args.openid},update:{points:parseInt(user.points)-parseInt(products.points)}},ep.done('updateUser'));
            }
        }
    });
    ep.once('updateUser',function(result){
        if(result){
            models.business.update({where:{id:data.bid},update:{points:parseInt(business.points)+parseInt(products.points)}},ep.done('updateBusiness'));
        }else{
            ep.emit("error",errors.updateJFfail);
//            ep.emit("error", errors.updateNotifyError);
        }
    });
    ep.once('updateBusiness',function(result){
        if(result){
            models.order.create({
                uid:user.id,
                uopenid:user.openid,
                bid:business.id,
//                bopenid:business.openid,
                bname:business.name,
                jobno:'',
                pid:products.id,
                pname:products.name,
                points:products.points,
                date:parseInt(new Date().getTime()/1000),
                type:1,
                reason:'',
                remark:'',
                urealname:user.realname,
                ucarmark:user.carmark,
                utelephone:user.telephone
                ,areaid:user.areaid
                ,settlestate:user.settlestate
                ,rmpoints:parseInt(user.points)-parseInt(products.points)
                ,policyno:user.policyno
                ,premium:user.premium
            },ep.done('createOrder'));
        }else{
            models.publicUser.update({where:{openid:args.openid},update:{points:parseInt(user.points)+parseInt(products.points)}},ep.done('updateUser1'));
        }
    });
    ep.once('updateUser1',function(result){
        if(result){
            return callback(errors.updateUserFail)
        }
    });
    ep.once('createOrder',function(result){
        if(result){
            console.log("createOrder",result);
            _.extend(result,{upoints:parseInt(user.points)-parseInt(products.points)});
            return callback(null,result);
        }else{
            ep.emit("error",errors.createOrderfail);
        }
    });
    ep.fail(function (err) {
        console.log('[JFconsumeError]', err);
        callback(err, 'fail');
    });
}
exports.JFconsume = JFconsume;
function JFconsume1(args, callback) {
    console.log("积分消费", args);
    var ep,user,products,business;
    if (!args.openid) {
        return callback(errors.LackArgument, 'fail');
    }
    try{
        var data = eval('(' + utf8to16(base64decode(args.data)) + ')');
    }catch(err){
        return callback(errors.LackArgument,'fail');
    }
    console.log("data:",data);
    ep=new EventProxy();
    var policynos=[];
    var nowDate=parseInt(new Date().getTime()/1000);
    models.publicUser.findOne({where:{openid:args.openid}},ep.done('getUser'));
    models.products.findOne({where:{id:data.pid}},ep.done('getProducts'));
    models.business.findOne({where:{id:data.bid}},ep.done('getBusiness'));
    models.policyno.all({where:{openid:args.openid},order: 'enddate asc'},ep.done('getPolicyno'));
    models.vippoints.all({where:{openid:args.openid},order: 'enddate asc'},ep.done('getvippoints'));
    ep.all('getUser','getProducts','getBusiness','getPolicyno','getvippoints',function(getUser,getProducts,getBusiness,getPolicyno,getvippoints){
//        console.log("1",getUser);
//        console.log("2",getProducts);
//        console.log("3",getBusiness);
//        console.log("4",getPolicyno);
        if(hcUti.isEmptyStr(getUser)){
            return callback(errors.WrongUsers);
        }else if(hcUti.isEmptyStr(getProducts)){
            return callback(errors.WrongProducts);
        }else if(hcUti.isEmptyStr(getBusiness)){
            return callback(errors.WrongBusiness);
        }else {
            user=getUser;
            products=getProducts;
            business=getBusiness;
            policynos=getPolicyno;
            vippoints=getvippoints;
            console.log(user.points,products.points);
            if(parseInt(user.pointdate)<nowDate){
                console.log("1");
                return callback(errors.JFoutTime);
            }
            if(user.points<products.points){
                console.log("2");
                return callback(errors.LackJF);
            }else{
//                return callback(null,policynos);
                var sqlCmd1="update publicUser set points=points-"+products.points+" where openid='"+args.openid+"';";
                var sqlCmd2="update business set points=points+"+products.points+" where id="+data.bid+";";
                var sqlCmd3="insert `order` (uid,uopenid,bid,bname,pid,pname,points,date,type,"+
                    "urealname,ucarmark,utelephone,areacode"+
                    ") values ("+user.id+",'"+user.openid+"',"+business.id+","+
                    "'"+business.name+"',"+products.id+",'"+products.name+"',"+products.points+","+
                    ""+nowDate+","+1+",'"+user.realname+"','"+user.carmark+"',"+user.telephone+","+
                    "'"+policynos[0].areacode+"')";
//                var sqlCmd4="update policyno set remainPoints "
                var callbackData={
                    uid:user.id,
                    uopenid:user.openid,
                    bid:business.id,
//                bopenid:business.openid,
                    bname:business.name,
                    jobno:'',
                    pid:products.id,
                    pname:products.name,
                    points:products.points,
                    date:parseInt(new Date().getTime()/1000),
                    type:1,
                    reason:'',
                    remark:'',
                    urealname:user.realname,
                    ucarmark:user.carmark,
                    utelephone:user.telephone
                    ,areacode:user.areacode
                    ,upoints:parseInt(user.points)-parseInt(products.points)
//                    ,settlestate:user.settlestate
//                    ,rmpoints:parseInt(user.points)-parseInt(products.points)
//                    ,policyno:user.policyno
//                    ,premium:user.premium
                };
                var vpoints=[],vupdates=[];
                var cost=products.points;
                vpoints=vippoints;
                if(vpoints.length>0){
                    console.log("vpoints.length:",vpoints.length);
                    for(var i=0;i<vpoints.length;i++){
//                        console.log('cost:',cost);
                        if((cost-vpoints[i].remainPoints)>0){//如果当前会员不够扣分
                            cost=cost-vpoints[i].remainPoints;//更新还需要扣多少分
                            vpoints[i].remainPoints=0;//更新需要更新的保单
                            vupdates[vupdates.length]=vpoints[i];//记录需要更新的保单
                        }else{
                            vpoints[i].remainPoints=vpoints[i].remainPoints-cost;
                            vupdates[vupdates.length]=vpoints[i];
                            cost=0;
                            break;
                        }
                    }
                }
                var sqlCmd5="";
                for(var m=0;m<vupdates.length;m++){
                    sqlCmd5+= "update vippoints set remainPoints = "+vupdates[m].remainPoints+" where id = "+vupdates[m].id+ ";";
                }




                var baodans=[],updates=[];
//                var cost=products.points;
                baodans=policynos;
                var sqlCmd4="";
                console.log('经过一轮会员扣分后还需要扣：',cost);
                if(cost>0){
                    for(var i= 0;i<baodans.length;i++){
                        if((cost-baodans[i].remainPoints)>0){//如果当前保单不够扣分
                            cost=cost-baodans[i].remainPoints;//更新还需要扣多少分
                            baodans[i].remainPoints=0;//更新需要更新的保单
                            updates[updates.length]=baodans[i];//记录需要更新的保单
                        }else{
                            baodans[i].remainPoints=baodans[i].remainPoints-cost;
                            updates[updates.length]=baodans[i];
                            break;
                        }
                    }
                    for(var j=0;j<updates.length;j++){
                        sqlCmd4+= "update policyno set remainPoints = "+updates[j].remainPoints+" where id = "+updates[j].id+ ";";
                    }
                }
                console.log("sqlCmd1:",sqlCmd1);
                console.log("sqlCmd2:",sqlCmd2);
                console.log("sqlCmd3:",sqlCmd3);
                console.log("sqlCmd4:",sqlCmd4);
                var sqlCmd4_5="";
                sqlCmd4_5=sqlCmd5+sqlCmd4;
                console.log("sqlCmd4_5:",sqlCmd4_5);
                var mysql = require('mysql');
                var config = require('../../settings');
                var pool = mysql.createPool(config.mysql);
                pool.getConnection(function (err, connection) {
                    if (err) {
                        console.error('mysql 连接失败');
                        return callback(err, null);
                    }

                    //开始事务
                    connection.beginTransaction(function (_err) {
                        if (_err) {
                            throw _err;
                            return callback(_err, null);
                        }
                        connection.query(sqlCmd1,[], function (__err, result1) {
                            console.log("进入sqlCmd1");
                            if (__err) {
                                connection.rollback(function () {
                                    throw __err;
                                });
                                return callback(__err, null);
                            }
                            connection.query(sqlCmd2,[], function (___err, result2) {
                                console.log("进入sqlCmd2");
                                if (___err) {
                                    connection.rollback(function () {
                                        throw ___err;
                                    });
                                    return callback(___err, null);
                                }
                                connection.query(sqlCmd3,[], function (___err, result3) {
                                    console.log("进入sqlCmd3");
                                    if (___err) {
                                        connection.rollback(function () {
                                            throw ___err;
                                        });
                                        return callback(___err, null);
                                    }
                                    connection.query(sqlCmd4_5,[], function (___err, result4) {
                                        console.log("进入sqlCmd4");
                                        if (___err) {
                                            connection.rollback(function () {
                                                throw ___err;
                                            });
                                            return callback(___err, null);
                                        }
                                        connection.commit(function (____err) {
                                            console.log("进入commit");
                                            if (____err) {
                                                connection.rollback(function () {
                                                    throw ____err;
                                                });
                                                return callback(____err, null);
                                            }
                                            console.log("success!");
//                                            console.log("result1：", result1);
//                                            console.log("result1：", result2);
//                                            console.log("result1：", result3);
//                                            console.log("result1：", result4);
                                            return callback(null, callbackData);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }
        }
    });
    ep.fail(function (err) {
        console.log('[JFconsumeError]', err);
        callback(err, 'fail');
    });
}
exports.JFconsume1 = JFconsume1;
//获取对应商户订单
function getOrders(args, callback) {
    console.log("args:", args);
    if (!args.openid) {
        return callback(errors.LackArgument, 'fail');
    }
    models.order.all({
        where: { bopenid: args.openid,type:1 },order:'date desc'
    }, function (err, order) {
        if (err) {
            callback('error', errors.SystemError);
        } else {
            callback(null, order);
        }
    });
}
exports.getOrders = getOrders;
//获取对应商品信息
function getProducts(args, callback) {
    console.log("getProducts:", args);
    if (!args.pid) {
        return callback(errors.LackArgument, 'fail');
    }
    models.products.findOne({
        where: { id:args.pid }}, function (err, product) {
        if (err) {
            console.log("err:",err);
            callback('error',err);
        } else {
            console.log('error',product);
            callback(null, product);
        }
    });
}
exports.getProducts = getProducts;
//获取商家信息
function getBusiness(args, callback) {
    console.log("getBusiness:", args);
    if (!args.openid) {
        return callback(errors.LackArgument, 'fail');
    }
    models.business.findOne({where: { openid: args.openid }}, function (err, business) {
        if (err) {
            callback('error', errors.SystemError);
        } else {
            callback(null, business);
        }
    });
}
exports.getBusiness = getBusiness;
function getPicUrl(args,callback){
    request.get({url:'http://file.api.weixin.qq.com/cgi-bin/media/get?access_token=e7e-Ws6CM8rI4CLt8OjXH5-c22PlTJDzHVz4WMPnJPyr_yIMGqVXJZLhzDnNNiz3qYrcZ14LxvAEChgh0p5RFukkPaRUTQqUiFGGnzVS-x0&media_id=TKMwy6NEqgRuJ3_C42IB2hf7wBAQ-NwRRKDa4bpZtNJgsq0N-wrx4AIf-HVYqtes',json:true},function(response,body){
        console.log('result:',response);
        console.log('result:',body);
        callback(null,true);
    })
}
exports.getPicUrl = getPicUrl;
//获取商帮用户信息
function getBSrelated(args, callback) {
    console.log("getBSrelated:", args);
    if (!args.openid) {
        return callback(errors.LackArgument, 'fail');
    }
    models.bsrelated.all({where: { openid: args.openid }}, function (err, user) {
        if (err) {
            callback('error', errors.SystemError);
        } else {
            if(user){
                console.log('getBsBind1:',user.length);
                if(user.length==0){
                    console.log("0");
                    url='/mobile/page_ZiLiaoBind/CommercialBinding.html?openid='+args.openid;
                }else if(user.length==1){
                    console.log("1");
                    url='mobile/sh_jf_consume.html?openid='+args.openid;
                }else if(user.length==2){
                    console.log("2");
                    url="http://www.baidu.com";
                }else{
                    console.log("0000");
                    url="http://www.hao123.com";
                }
            }
            callback(null, user);
        }
    });
}
exports.getBSrelated = getBSrelated;
//微信jssdk签名算法
function js_signature(args, callback) {
    console.log("js_signature", args.url);
    if (!(args.url !== null)) {
        return callback(errors.LackArgument, 'fail');
    } else {
        var ep = new EventProxy();
        var url = settings.weChatServer + "/weChat/js_signature1?url=" + args.url;
        console.log(url);
        request.get({ url: url, json: true }, ep.done('getSignature'));
        ep.once('getSignature', function (response, body) {
            if (body && body.data) {
                var ret = body.data;
                callback(null, ret);
            } else {
                ep.emit('error', errors.getSignatureFail);
            }
        });
        ep.fail(function (err) {
            console.log('[getSigntureFail]', err);
            callback(err, 'fail');
        });
    }
}
exports.js_signature = js_signature;
//调用百度纠偏接口
function jiupian(args, callback) {
    console.log("纠偏：", args);
    var ep = new EventProxy();
    if (!args.lng) {
        return callback(errors.LackArgument, 'fail');
    } else {
        var URL = "http://api.map.baidu.com/ag/coord/convert?from=0&to=4&x=" + args.lng + "&y=" + args.lat;
        var addr = args.lat + "," + args.lng;
        var url = geocoder.reverseUrl(geocoder.coordtype, geocoder.ak, addr, 0);
        request.get({ url: url, json: true }, ep.done('reverseLocation'))
        ep.once("reverseLocation", function (res, body) {
//            console.log("body:",body);
            if (res.statusCode === 200 && body) {
                if (body.indexOf("renderReverse&&renderReverse") > -1) {
                    var reverse = body.replace("renderReverse&&renderReverse", "").replace("(", "").replace(")", "");
                    try  {
                        var addrresult = JSON.parse(reverse);
                        var ss=addrresult.status;
                    } catch (Error) {
                        console.log("Error:" + Error.message);
                        ep.emit('error',Error.message);
                    }
                    process.on('uncaughtException', function (err) {
                        console.log(err);
                        ep.emit('error',err);
                    });
                    var addr = {};
                    console.log(addrresult);
                    if (addrresult.status=== 0 && addrresult.result.hasOwnProperty("formatted_address")) {
                        addr = {
                            address:addrresult.result.formatted_address,
                            district:addrresult.result.addressComponent,
                            detail:addrresult.result.sematic_description,
                            location:addrresult.result.location
                        }
                    } else {
                        addr = "服务器返回地址错误，未获取到准确地址信息";
                    }
                    callback(null,addr);
//                    redismodels.publicclient.update({ where: { openId: data.FromUserName }, update: { addr: addr, stateupdatetime: date.getTime() } }, ep.done('updateAddr'));
                } else {
                    ep.emit("error", errors.CustomError);
                }
            } else {
                ep.emit("error", errors.CustomError);
            }
        });
        ep.fail(function (err) {
            console.log("err:" + err);
            callback(err,'fail');
        });
//        request.get({ url: URL, json: true }, function (err, data) {
//            if (err) {
//                console.log(err);
//                return callback(errors.SystemError);
//            } else {
//                //                console.log("data:",data.body);
//                //                console.log("data:",data.body.x);
//                //                return callback(null,data.body);
//                var lng = utf8to16(base64decode(data.body.x));
//                var lat = utf8to16(base64decode(data.body.y));
//                var result = {
//                    lng: lng,
//                    lat: lat
//                };
//                return callback(null, result);
//            }
//        });
    }
}
exports.jiupian = jiupian;
function getMessageResponse11(args, callback) {
    console.log("进入getMessageResponse11:", args);
    if (!(args.content !== null)) {
        return callback(errors.LackArgument);
    }
    try  {
        var data = JSON.parse(args.content);
    } catch (Error) {
        console.log("Error:" + Error.message);
        callback(Error, false);
    }
    var filledData = null;
    if (data.choice.toString() === '0') {
        filledData = _.pick(message.auditFailTemplate.data, 'keyword1', 'keyword2', 'keyword3', 'keyword4');
        filledData['keyword1']['value'] = data.carmark;
        filledData['keyword2']['value'] = data.jobNo;
        filledData['keyword3']['value'] = data.YXQZ;
        filledData['keyword4']['value'] = data.message;
        var basicData = _.pick(message.auditFailTemplate.data, 'first', 'remark');
        message.auditFailTemplate.data = _.extend(basicData, filledData);
        jobs.create('message', _.extend({ touser: data.openid }, message.auditFailTemplate));
    } else if (data.choice.toString() === '2') {
        filledData = _.pick(message.auditSuccessTemplate.data, 'keyword1', 'keyword2', 'keyword3','remark');
        filledData['keyword1']['value'] = data.carmark;
        filledData['keyword2']['value'] = data.jobNo;
        filledData['keyword3']['value'] = data.realname;
        if(data.points){
            filledData['remark']['value'] = "由于您绑定成功，且为武汉人保续保用户，赠送送您"+data.points+"积分，您可在“人保生活--积分消费”享受积分消费";
        }else{
            filledData['remark']['value'] = "由于您绑定成功，送您20积分，您可在“人保生活--积分消费”享受积分消费";
        }
        var basicData = _.pick(message.auditSuccessTemplate.data, 'first');
        message.auditSuccessTemplate.data = _.extend(basicData, filledData);
//        jobs.create('message', _.extend({ touser: data.openid }, message.auditSuccessTemplate));
    }else if(data.choice.toString()==='1'){
        var points=0;
        if(data.points){
            points=data.points;
        }else{
            points=20;
        }
        var messageStr = util.format(message.idcardBindSuccessMessage.text.content, data.carmark, data.jobNo, data.realname,points);
        var idcardBindSuccessMessage = {
            msgtype: 'text',
            text: {
                content: messageStr
            }
        };
        console.log("idcardBindSuccessMessage:", idcardBindSuccessMessage);
        jobs.create('message', _.extend({ touser: data.openid }, idcardBindSuccessMessage));
    }
//    console.log('verifyMiss:',_.extend({ touser: data.openid }, message.auditSuccessTemplate));
//    jobs.create('mqttMessagePub', { topic: 'verifyMiss', message: JSON.stringify({ openid: data.openid }) });
    callback(null, true);
}
exports.getMessageResponse11 = getMessageResponse11;
function downloadImages(args,callback){
    if(args.mediaId){
        console.log("mediaId:",args.mediaId);
        var mediaId= [ 'i-Arsc3FuBFcN5mD2NFwU1ApXX9Tc2XNPOU41k55L6GPnmkpiMTc00HLsVQSzLje' ];
        var url="https://api.weixin.qq.com/cgi-bin/media/get?access_token=LkkvYbvty_dNAoL5SnaoWt_CGkJ2v4q8qNXPAUBbMMaSda1X_QbkrUGUz8Xr3pktysxpt3MT9R6qJCZF5heFdMjLOmGUs77D9QFG5_jq3XY&media_id=vFe7JVBsqA5ywGyu0i8bXkO-hKoU6qxnMmYKeYQtVc_ZFSwvRLF_slUxmwlD0yn2"
        request.get({url:url},function(err,result){
            console.log(err);
            console.log(result);
            callback(null,true);
        })
//        callback(null,true);







    }else{
        return callback(errors.LackArgument);
    }

}
exports.downloadImages=downloadImages;



function test(args,callback){
    console.log(args.openid);
    var result=[ { frameno: 'LHGCR2658E8019721',
        insuredname: '李青',
        startdate: '2015-02-13 00:00:00',
        operatedate: '2015-01-19 00:00:00',
        comcode: '42010500',
        sumpremium: 3935.87,
        licenseno: '鄂AD8Q13',
        identifynumber: '420112198805141827',
        enddate: '2016-02-12 00:00:00',
        lastdamagedbi: 1,
        policyno: 'PDAT20154201T000011741',
        lastdamagedci: 0,
        mobile: '18272090112' },
        { frameno: 'LHGCR2658E8019721',
            insuredname: '李青',
            startdate: '2015-02-13 00:00:00',
            operatedate: '2015-01-19 00:00:00',
            comcode: '42010500',
            sumpremium: 855,
            licenseno: '鄂AD8Q13',
            identifynumber: '420112198805141827',
            enddate: '2016-02-12 00:00:00',
            lastdamagedbi: 0,
            policyno: 'PDZA20154201T000011498',
            lastdamagedci: 0,
            mobile: '18272090112' } ];
    var ss=[ { id: 23,
        openid: 'oxcW5s_pg27SmrrqRm1zSEuInHMw',
        policyno: 'SDBDCZ20150512221413',
        areacode: '42010500',
        policynotype: 3,
        addtype: null,
        pointsType: 1,
        fillPoints: 20,
        remainPoints: 20,
        insuredname: '李青',
        licenseno: '鄂AD8Q13',
        frameno: '019721',
        identifynumber: '420112198805141827',
        startdate: 1431440053,
        enddate: 1455206400,
        sumpremium: 0,
        lastdamagedbi: 0,
        userid: null,
        reason: null,
        remark: null },
        { id: 22,
            openid: 'oxcW5s_pg27SmrrqRm1zSEuInHMw',
            policyno: 'PDZA20154201T000011494',
            areacode: '42010500',
            policynotype: 0,
            addtype: null,
            pointsType: 0,
            fillPoints: 0,
            remainPoints: 0,
            insuredname: '李青',
            licenseno: '鄂AD8Q13',
            frameno: 'LHGCR2658E8019721',
            identifynumber: '420112198805141827',
            startdate: 1423756800,
            enddate: 1455206400,
            sumpremium: 855,
            lastdamagedbi: 0,
            userid: null,
            reason: null,
            remark: null },
        { id: 21,
            openid: 'oxcW5s_pg27SmrrqRm1zSEuInHMw',
            policyno: 'PDAT20154201T000011742',
            areacode: '42010500',
            policynotype: 1,
            addtype: null,
            pointsType: 0,
            fillPoints: 0,
            remainPoints: 0,
            insuredname: '李青',
            licenseno: '鄂AD8Q13',
            frameno: 'LHGCR2658E8019721',
            identifynumber: '420112198805141826',
            startdate: 1423756800,
            enddate: 1455206400,
            sumpremium: 3936,
            lastdamagedbi: 1,
            userid: null,
            reason: null,
            remark: null },
        { id: 21,
            openid: 'oxcW5s_pg27SmrrqRm1zSEuInHMw',
            policyno: 'PDAT20154201T000011741',
            areacode: '42010500',
            policynotype: 1,
            addtype: null,
            pointsType: 0,
            fillPoints: 0,
            remainPoints: 0,
            insuredname: '李青',
            licenseno: '鄂AD8Q13',
            frameno: 'LHGCR2658E8019721',
            identifynumber: '420112198805141827',
            startdate: 1423756800,
            enddate: 1455206400,
            sumpremium: 3936,
            lastdamagedbi: 1,
            userid: null,
            reason: null,
            remark: null } ];
    var lastDate=[];
    var insertDate=[];

    for(var i=0;i<result.length;i++){
        var frame1=0;
        var frame2=0;
        for(var j=0;j<ss.length;j++){
            debugger;
            if(ss[j].policyno==result[i].policyno){
                frame2=1;
            }
            if(ss[j].policyno==result[i].policyno&&ss[j].pointsType==1){
                debugger;
                frame1=1;
                break;
            }
        }
        if(frame1==0){
            debugger;
            lastDate[lastDate.length]=result[i]
        }
        if(frame2==0){
            insertDate[insertDate.length]=result[i];
        }
    }
    console.log("lastDate:",lastDate);
    console.log("insertDate:",insertDate);
    callback(null,true);
//    models.policyno.all({where:{licenseno:'鄂AD8Q13'},order: 'policyno desc,enddate asc'},function(err,result){
//        console.log(result);
//        callback(null,result);
//    });
}
exports.test=test;
function test1(args,callback){
//var url='http://42.96.199.56/testrb/wechat/CreateReportTask';
//    request.post({ url: url, body:JSON.stringify({a:1,b:2})}, function (err, response, body) {
//        console.log('response:',body);
//        if (!err && response.statusCode == 200) {
//            console.log('send OK:' + body);
//        } else {
//            console.log('[sendMessage]', err);
//        }
//    });
    var querystring = require('querystring');


    var post_data =querystring.stringify({caseno:'T50714101409070'});
    var options = {
        host: '42.96.199.56',
        port: 80,
        path: '/testrb/wechat/CreateReportTask',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    var http = require('http');
    var req = http.request(options, function(res) {
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');

        var tChunk = "";
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            tChunk += chunk;
        });
        res.on('end',function(){
            console.log(tChunk);
        });
    });

    req.write(post_data);
    req.end();
}
exports.test1=test1;
function utf8to16(str) {
    var out, i, len, c;
    var char2, char3;
    out = "";
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                // 0xxxxxxx
                out += str.charAt(i - 1);
                break;
            case 12:
            case 13:
                // 110x xxxx   10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
                break;
            case 14:
                // 1110 xxxx  10xx xxxx  10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0));
                break;
        }
    }
    debugger;
    return out;
}

function base64decode(str) {
    var base64decodechars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while (i < len) {
        do {
            c1 = base64decodechars[str.charCodeAt(i++) & 0xff];
        } while(i < len && c1 == -1);
        if (c1 == -1)
            break;

        do {
            c2 = base64decodechars[str.charCodeAt(i++) & 0xff];
        } while(i < len && c2 == -1);
        if (c2 == -1)
            break;
        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

        do {
            c3 = str.charCodeAt(i++) & 0xff;
            if (c3 == 61)
                return out;
            c3 = base64decodechars[c3];
        } while(i < len && c3 == -1);
        if (c3 == -1)
            break;
        out += String.fromCharCode(((c2 & 0xf) << 4) | ((c3 & 0x3c) >> 2));

        do {
            c4 = str.charCodeAt(i++) & 0xff;
            if (c4 == 61)
                return out;
            c4 = base64decodechars[c4];
        } while(i < len && c4 == -1);
        if (c4 == -1)
            break;
        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
}