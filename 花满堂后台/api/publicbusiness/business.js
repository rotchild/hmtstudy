/**
* Created by zhou on 2014/5/4.
* 微信公众业务接口,通过jobs分发消息，与微信服务端WeChat进行交互,处理WeChat中转发至公众业务模块功能
* 入口由bull消息释放weChat+"/publicbusiness
* @example
*   接口地址：
*     http://domion/api/business/接口名?参数1=值1&参数2=值2?token=值
*   返回数据
*   {
*     err:{     //错误标志，null表示没有错误，具体错误信息可以见错误列表文件
*      name: "IllegalArgument",//错误类型
*      message": "参数非法"     //错误中文描述
*     },
*     data:{    //返回数据封装到data中，没有数据时为null
*       key1:data1
*     }
*   }
**/
///<reference path='../../ts/node/node.d.ts' />
///<reference path='../../ts/underscore/underscore.d.ts'/>
///<reference path='../../ts/express/express.d.ts' />
///<reference path='../../ts/eventproxy/eventproxy.d.ts' />
///<reference path='../../ts/request/request.d.ts' />
///<reference path='../libs/File.ts'/>
var BusinessModule = require('./businessModule');
var BusinessWork = require('./businessWork');
var EventProxy = require('eventproxy');
var File = require('../libs/File');
var models = require('../../models/business/index');
var redismodels = require('../../models/survey/index');
var settings = require('../../settings');
var publicbusinessSetting = require('./publicbusinessSetting');

var request = require('request');
var domain = require('domain');
var _ = require('underscore');
var Event = require('./event');
var Util = require('../libs/hcUti');
var State = require('../../models/survey/state');
var errors = require('../libs/errors');

var message = require('./message');
var geocoder = require('../libs/geocoder');
var publicRoute = require('./route');
var util = require('util');
var kue = require('../libs/bullLikeKue');
var path = require('path');
var kueJobs = kue.createQueue(settings);

var responseInfo = publicbusinessSetting.responseInfo.tbresponseInfo;

var e_type = Event('renbao').e_type;
var state = State();
var d = domain.create();
var moduleName = "publicbusiness";
var businessModule = BusinessModule();

var date = new Date();

var noop = function () {
};

d.on('error', function (err) {
    console.error('error', err.stack);
});

function init(app) {
    publicRoute(app);
    BusinessWork.init();
    var processModule = "weChat/" + moduleName;
    kueJobs.process(processModule, doMessage); //总业务模块入口
}
exports.init = init;

/**
* historyMessage 获取历史消息接口
* @param args express请求对象
* @param callback 回调结果(err,result)
*/
function historyMessage(args, callback) {
    var tasktype = (args.channel.split('/'))[1] ? (args.channel.split('/'))[1] : '';
    var result = [];
    redismodels.publicmessage.all({ where: { channel: args.channel } }, function (err, data) {
        if (!err && data.length > 0) {
            data.forEach(function (msg) {
                if ((!Util.isEmptyStr(msg.channel)) && msg.tasktype === tasktype) {
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
* getCarcaseResponse 接取案件后事件逻辑
* @param args 参数
* @param callback
*/
function getCarcaseResponse(args, callback) {
    if (!(args.content !== null)) {
        return callback(errors.LackArgument);
    }
    try  {
        var data = JSON.parse(args.content);
    } catch (Error) {
        console.log("Error:" + Error.message);
        callback(Error, null);
    }
    var msg = {};
    if (data.tasktype === "调度") {
        msg = {
            msgtype: 'text',
            text: {
                content: '尊敬的客户您好!您的报案已受理。\n' + '调度员' + data.realname + '将竭诚为您提供服务。'
            }
        };
    } else if (data.tasktype === "查勘") {
        msg = {
            msgtype: 'text',
            text: {
                content: '尊敬的客户您好!您的查勘已受理。\n' + '定损员' + data.realname + '将竭诚为您提供服务。'
            }
        };
    }
    kueJobs.create("message", _.extend({ touser: data.FromUserName }, msg));
    callback(null, null);
}
exports.getCarcaseResponse = getCarcaseResponse;

/**
* completeCarcaseResponsee 调度平台点击调度按钮后进入微信前台需退出报案状态
* 操作为置state为0,module为wechat,channel为none
* @param args
* @param callback
*/
function completeCarcaseResponse(args, callback) {
    if (!(args.content !== null)) {
        return callback(errors.LackArgument);
    }
    try  {
        var data = JSON.parse(args.content);
    } catch (Error) {
        console.log("Error:" + Error.message);
        callback(Error, null);
    }
    data.forEach(function (user) {
        console.log("identity:" + user.identity);
        var openId = "";
        var messageStr = '';
        var completeMsg = message.completeCarcaseMsg;
        if (user.tasktype === "调度") {
            openId = user.backoperator;
        } else if (user.tasktype === "查勘") {
            openId = user.frontoperator;
        }
        var ep = new EventProxy();
        redismodels.publicclient.findOne({ where: { openId: openId } }, ep.doneLater('_findUserInfo'));
        ep.once('_findUserInfo', function (userinfo) {
            if (userinfo && userinfo.caseId === user.identity) {
                models.carcase.findOne({ where: { id: userinfo.caseId } }, ep.doneLater('findCarcase'));
                ep.once('findCarcase', function (result) {
                    if (result) {
                        if (user.tasktype === "调度") {
                            messageStr = util.format(message.completeScheduler.text.content, result.reporter, result.reporter_tel, result.carmark, user.survey, user.survey_tel);
                        } else if (user.tasktype === "查勘") {
                            messageStr = util.format(message.completeAudit.text.content, result.reporter, result.reporter_tel, result.carmark, user.preprice, user.preresult);
                        }
                        if (Util.isEmptyStr(result.garageId) || result.garageId === -1) {
                            ep.emit("_exitPublicClient");
                        } else {
                            models.garage.findOne({ where: { id: result.garageId } }, ep.doneLater('findGarage'));
                        }
                    } else {
                        kueJobs.create("message", _.extend({ touser: openId }, message.unknownError));
                    }
                });
            }
        });
        ep.once("findGarage", function (garage) {
            if (garage) {
                messageStr += util.format(message.garageTemplate.text.content, garage.fullname, garage.garage_addr, garage.garage_tel);
                ep.emit("_exitPublicClient");
            } else {
                kueJobs.create("message", _.extend({ touser: openId }, message.unknownError));
            }
        });
        ep.on("_exitPublicClient", function () {
            if (user.tasktype === "调度") {
                redismodels.publicclient.update({ where: { openId: openId }, update: { tasktype: "" } }, ep.done('_updateUserinfo'));
            } else if (user.tasktype === "查勘") {
                redismodels.survey.update({ where: { openId: openId }, update: { step: -1, maxstep: -1 } }, ep.done('_updateSurvey'));
            }
        });
        ep.once('_updateUserinfo', function (userinforesult) {
            if (userinforesult) {
                redismodels.publicclient.findOne({ where: { openId: openId } }, ep.done('_findUser'));
            }
        });
        ep.once('_updateSurvey', function (surveyresult) {
            if (surveyresult) {
                redismodels.publicclient.update({ where: { openId: openId }, update: { caseId: -1, tasktype: "" } }, ep.done('_updateUserinfo'));
            }
        });
        ep.once('_findUser', function (result) {
            if (result) {
                redismodels.publicclient.update({ where: { openId: openId }, update: { channel: "none", module: "wechat", submodule: "none", state: state.STATE.NONE } }, ep.done('_updateUser'));
            }
        });
        ep.once('_updateUser', function (result) {
            if (result) {
                kueJobs.create('getUserControl', { title: 'getUserControl', module: "wechat", openid: openId, tag: "" }); //释放用户控制权利
                ep.emit("sendMessage");
            }
        });
        ep.once('sendMessage', function () {
            var completeMsg = {
                msgtype: "text",
                text: {
                    content: messageStr
                }
            };
            kueJobs.create("message", _.extend({ touser: openId }, completeMsg));
            callback(null, null);
        });
        ep.fail(function (err) {
            console.log('err:' + err);
            callback(err, null);
        });
    });
}
exports.completeCarcaseResponse = completeCarcaseResponse;

/**
* reSchedulerResponse 重新调度给调度平台后给前台人员回复
* 尊敬的客户您好,您的案件不符合自助查勘要求，已被重新调度至调度平台
* @param args
* @param callback
*/
function reSchedulerResponse(args, callback) {
    if (!(args.content !== null)) {
        return callback(errors.LackArgument);
    }
    try  {
        var data = JSON.parse(args.content);
    } catch (Error) {
        console.log("Error:" + Error.message);
        callback(Error, null);
    }
}
exports.reSchedulerResponse = reSchedulerResponse;

/**
* cancelCarcaseResponse 取消案件手机前台处理
* @param args
* @param callback
* @returns {any}
*/
function cancelCarcaseResponse(args, callback) {
    if (!(args.content !== null)) {
        return callback(errors.LackArgument);
    }
    try  {
        var data = JSON.parse(args.content);
    } catch (Error) {
        console.log("Error:" + Error.message);
        callback(Error, null);
    }
    var ep = new EventProxy();
    if (data.tasktype === "调度") {
        redismodels.publicclient.update({ where: { openId: data.openId }, update: { tasktype: "" } }, ep.done('_updateUserinfo'));
    } else if (data.tasktype === "查勘") {
        redismodels.survey.update({ where: { openId: data.openId }, update: { step: -1, maxstep: -1 } }, ep.done('_updateSurvey'));
    }
    ep.once('_updateSurvey', function (result) {
        if (result) {
            redismodels.publicclient.update({ where: { openId: data.openId }, update: { caseId: -1, tasktype: "" } }, ep.done('_updateUserinfo'));
        } else {
            callback(errors.RedisClientError, null);
        }
    });
    ep.once('_updateUserinfo', function (result) {
        if (result) {
            redismodels.publicclient.findOne({ where: { openId: data.openId } }, ep.done('_findUser'));
        } else {
            callback(errors.RedisClientError, null);
        }
    });
    ep.once('_findUser', function (result) {
        if (result) {
            redismodels.publicclient.update({ where: { openId: data.openId }, update: { channel: "none", module: "wechat", submodule: "none", state: state.STATE.NONE } }, ep.done('_updateUser'));
        } else {
            callback(errors.RedisClientError, null);
        }
    });
    ep.once('_updateUser', function (result) {
        if (result) {
            kueJobs.create('getUserControl', { title: 'getUserControl', module: "wechat", openid: data.openId, tag: "" }); //释放用户控制权利
            ep.emit("sendMessage");
        } else {
            callback(errors.RedisClientError, null);
        }
    });
    ep.once('sendMessage', function () {
        var msg = { caseId: data.carcaseId, tasktype: data.tasktype };
        kueJobs.create('mqttMessagePub', { topic: 'cancelCarcase', message: JSON.stringify(msg) });
        kueJobs.create("message", _.extend({ touser: data.openId }, message.cancelCarcaseMsg));
        callback(null, null);
    });
    ep.fail(function (err) {
        console.log('err:' + err);
        callback(err, null);
    });
}
exports.cancelCarcaseResponse = cancelCarcaseResponse;

/**
* isActivateCarcase 检查用户状态，用户状态不符合时案件不可进行激活
* @param args
* @param callback
*/
function isActivateCarcase(args, callback) {
    if (!(args.content !== null)) {
        return callback(errors.LackArgument);
    }

    try  {
        var data = JSON.parse(args.content);
    } catch (Error) {
        console.log("Error:" + Error.message);
        callback(Error, false);
    }

    redismodels.publicclient.findOne({ where: { openId: data.openId } }, function (err, user) {
        if (err) {
            callback(err, false);
        }
        if (user && user.module === "wechat") {
            callback(null, true);
        } else {
            callback(null, false);
        }
    });
}
exports.isActivateCarcase = isActivateCarcase;

/**
* activateCarcaseResponse 激活历史案件至当前案件中 需检查前台用户所处的模块
* @param args
* @param callback
*/
function activateCarcaseResponse(args, callback) {
    if (!(args.content !== null)) {
        return callback(errors.LackArgument);
    }
    try  {
        var data = JSON.parse(args.content);
    } catch (Error) {
        console.log("Error:" + Error.message);
        callback(Error, null);
    }
    var ep = new EventProxy();
    var channelName = data.carcaseId + '/' + data.tasktype, submodule = "";
    if (data.tasktype === "调度") {
        submodule = businessModule.MODULE.REPORT;
    } else if (data.tasktype === "查勘") {
        submodule = businessModule.MODULE.SURVEY;
    }
    redismodels.publicclient.findOne({ where: { openId: data.openId } }, ep.done("findUser"));
    ep.once("findUser", function (user) {
        if (user) {
            if (businessModule.MODULE.NONE === user.module) {
                redismodels.publicclient.update({
                    where: { openId: data.openId },
                    update: { module: businessModule.MODULE.BUSINESS, submodule: submodule, channel: channelName, tasktype: data.tasktype, caseId: data.carcaseId, state: state.STATE.REPORTING, stateupdatetime: Date.now() } }, ep.done('updateClient'));
            } else {
                callback(errors.UserStateWrong, null);
                kueJobs.create("message", _.extend({ touser: data.openId }, message.activateCarcaseFailMsg));
            }
        } else {
            callback(errors.NoUser, null);
        }
    });
    ep.once('updateClient', function (result) {
        if (result) {
            kueJobs.create('getUserControl', { title: 'getUserControl', module: businessModule.MODULE.BUSINESS, openid: data.openId, tag: submodule }); //夺取用户控制权
            ep.emit("sendMessage");
        } else {
            callback(errors.RedisClientError, null);
        }
    });
    ep.once('sendMessage', function () {
        var weChatMsg = {
            touser: data.openId,
            msgtype: 'text',
            text: {
                content: message.activateCarcaseMsg.text.content
            }
        };
        weChatMsg.text.content = util.format(weChatMsg.text.content, data.carmark, data.operator);
        kueJobs.create('message', weChatMsg);
        var msg = { caseId: data.carcaseId, tasktype: data.tasktype, carmark: data.carmark };
        kueJobs.create('mqttMessagePub', { topic: 'activateCarcase', message: JSON.stringify(msg) });
        callback(null, null);
    });
    ep.fail(function (err) {
        console.log('err:' + err);
        callback(err, null);
    });
}
exports.activateCarcaseResponse = activateCarcaseResponse;

function isDeactivateCarcase(args, callback) {
    if (!(args.content !== null)) {
        return callback(errors.LackArgument);
    }

    try  {
        var data = JSON.parse(args.content);
    } catch (Error) {
        console.log("Error:" + Error.message);
        callback(Error, false);
    }

    redismodels.publicclient.findOne({ where: { openId: data.openId } }, function (err, user) {
        if (err) {
            callback(err, false);
        }

        if (user && user.module !== "wechat") {
            callback(null, true);
        } else {
            callback(null, false);
        }
    });
}
exports.isDeactivateCarcase = isDeactivateCarcase;

function deactivateCarcaseResponse(args, callback) {
    if (!(args.content !== null)) {
        return callback(errors.LackArgument);
    }
    try  {
        var data = JSON.parse(args.content);
    } catch (Error) {
        console.log("Error:" + Error.message);
        callback(Error, null);
    }
    var ep = new EventProxy();
    redismodels.publicclient.findOne({ where: { openId: data.openId } }, ep.done("findUser"));
    ep.once("findUser", function (user) {
        if (user) {
            if (businessModule.MODULE.BUSINESS === user.module) {
                redismodels.publicclient.update({
                    where: { openId: data.openId },
                    update: { module: businessModule.MODULE.NONE, submodule: "none", channel: "", tasktype: "", caseId: -1, state: state.STATE.NONE, stateupdatetime: Date.now() } }, ep.done('updateClient'));
            } else {
                callback(errors.UserStateWrong, null);
                kueJobs.create("message", _.extend({ touser: data.openId }, message.activateCarcaseFailMsg));
            }
        } else {
            callback(errors.NoUser, null);
        }
    });
    ep.once('updateClient', function (result) {
        if (result) {
            kueJobs.create('getUserControl', { title: 'getUserControl', module: businessModule.MODULE.NONE, openid: data.openId, tag: "" }); //释放用户控制权
            ep.emit("sendMessage");
        } else {
            callback(errors.RedisClientError, null);
        }
    });
    ep.once('sendMessage', function () {
        var weChatMsg = {
            touser: data.openId,
            msgtype: 'text',
            text: {
                content: message.deactivateCarcaseMsg.text.content
            }
        };
        weChatMsg.text.content = util.format(weChatMsg.text.content, data.carmark);
        kueJobs.create('message', weChatMsg);
        var msg = { caseId: data.carcaseId, tasktype: data.tasktype, carmark: data.carmark };
        kueJobs.create('mqttMessagePub', { topic: 'deactivateCarcase', message: JSON.stringify(msg) });
        callback(null, null);
    });
    ep.fail(function (err) {
        console.log('err:' + err);
        callback(err, null);
    });
}
exports.deactivateCarcaseResponse = deactivateCarcaseResponse;

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

/**
* packageFile  包文件接口
* @param args 参数
* @param callback
* @returns {any}
*/
function packageFile(args, callback) {
    if (args.filename === null) {
        return callback(errors.LackArgument);
    }
    var prefix = File.joinfilePath([publicbusinessSetting.imageDir, args.filename]);
    var format = ".zip";
    var images = BusinessWork.getAllFiles(prefix);
    images.forEach(function (value, index) {
        if (value.indexOf(format) > -1) {
            images.splice(index, 1);
        }
    });
    BusinessWork.packageFile(images, args.filename, prefix + "/", format, function (err, result) {
        if (err) {
            return callback(err, result);
        } else {
            return callback(null, result);
        }
    });
}
exports.packageFile = packageFile;

/**
* route 跳转网页地址路由请求函数
* @param req
* @param res
*/
function route(req, res) {
    var ep = new EventProxy();
    var code = req.query.code;
    var action = req.params.action;
    var url = settings.weChatServer + "/weChat/getOpenID?code=" + code;
    var openId = "";
    var data = { user: { channel: "none", openId: "", caseId: -1, lat: 0.00000, lng: 0.00000, state: 0, addr: "" }, userinfo: { caseId: -1 } };
    request.get({ url: url, json: true }, ep.doneLater('getOpenID'));
    ep.once('getOpenID', function (response, body) {
        if (body && body.data) {
            openId = body.data;
            var wechatclienturl = settings.weChatServer + "/weChat/findUser?openid=" + openId;
            request.get({ url: wechatclienturl, json: true }, ep.doneLater('getClientUser'));
        } else {
            res.redirect("/mobile/index.html#page_error");
        }
    });
    ep.once('getClientUser', function (response, body) {
        if (body && body.data) {
            var wechatClient = body.data;
            if ("module" in wechatClient && wechatClient.module === "business") {
                res.redirect("/mobile/publicBusiness.html#page_hint"); //in other module not use publicbusiness
            } else {
                _checkUserExist(openId, ep.doneLater('_checkUserExist'));
            }
        } else {
            res.redirect("/mobile/index.html#page_error");
        }
    });
    ep.once('_checkUserExist', function (user) {
        if (user) {
            data.user = user;
            _checkUserInfo(openId, ep.doneLater('_checkUserInfo'));
        } else {
            res.redirect("/mobile/index.html#page_error");
        }
    });
    ep.once('_checkUserInfo', function (userinfo) {
        data.userinfo = userinfo;
        if (data.user.state === state.STATE.NONE) {
            if (userinfo) {
                res.redirect("/mobile/publicBusiness.html#" + action + "?state=" + data.user.state + "&lat=" + data.user.lat + "&lng=" + data.user.lng + "&current_addr=" + data.user.addr + "&openid=" + data.user.openId + "&carmark=" + userinfo.carmark + "&telephone=" + userinfo.telephone + "&realname=" + userinfo.realname);
            } else {
                res.redirect("/mobile/publicBusiness.html#" + action + "?state=" + data.user.state + "&lat=" + data.user.lat + "&lng=" + data.user.lng + "&current_addr=" + data.user.addr + "&openid=" + data.user.openId);
            }
        } else if (data.user.state === state.STATE.REPORTING) {
            models.carcase.findOne({ where: { id: data.user.caseId } }, ep.doneLater('findCarcase'));
        } else {
            res.redirect("/mobile/index.html#page_error");
        }
    });
    ep.once('findCarcase', function (carcase) {
        if (carcase) {
            var keys = ["openid", "carmark", "carcase_driver", "driver_tel", "reporter", "reporter_tel", "carcase_addr", "current_addr", "accident_time", "accident_character", "lat", "lng", "state"];
            var values = [data.user.openId, carcase.carmark, carcase.carcase_driver, carcase.driver_tel, carcase.reporter, carcase.reporter_tel, carcase.carcase_addr, carcase.current_addr, carcase.accidenttime, carcase.accident_character, carcase.carcase_lat, carcase.carcase_lng, data.user.state];
            res.redirect("/mobile/publicBusiness.html#" + action + Util.concatParams(keys, values));
        } else {
            res.redirect("/mobile/index.html#page_error");
        }
    });
    ep.fail(function (err) {
        console.log("err:" + err);
        res.redirect("/mobile/index.html#page_error");
    });
}
exports.route = route;

/** doCarcase 根据上传车牌号、电话号码与姓名创建案件,如果包含经纬度信息更新经纬度信息,每一个案件对应一个任务(task)
* @option option [Double] lat 报案时用户所在纬度
* @option option [Double] lng 报案时用户所在经度
* @param args [String] carmark 车牌号
[String] realname 真实姓名
[String] telephone 电话号码
[String] openid 由微信公众平台oauth 2.0认证获取用户的openid
* @param callback
* @returns {any}
*/
function doCarcase(args, callback) {
    var checkArgs = ["openid", "carmark", "carcase_driver", "driver_tel", "reporter", "reporter_tel", "carcase_addr", "current_addr", "accident_time", "accident_character"];
    for (var i = 0; i < checkArgs.length; i++) {
        if (Util.isEmptyStr(args[checkArgs[i]])) {
            return callback(errors.LackArgument);
        }
    }
    console.log("doCarcase.args:", args);
    if (Util.isEmptyStr(args.lat)) {
        args.lat = 0.00000;
    }
    if (Util.isEmptyStr(args.lng)) {
        args.lng = 0.00000;
    }
    var ep = new EventProxy();
    var data = { openId: null, caseId: null, carmark: null, tasktype: null };
    data.carmark = args.carmark;
    var id = -1;
    if (!Util.isEmptyStr(args.carcaseId)) {
        id = parseInt(args.carcaseId);
    }
    if (-1 === id) {
        _createCarcase(args, ep.doneLater('_createCarcase'));
        ep.once('_createCarcase', function (carcase) {
            if (carcase) {
                _createTask(args.openid, args.tasktype, carcase.id, ep.doneLater('_createTask'));
            }
        });
    } else {
        models.carcase.findOne({ where: { id: id } }, ep.doneLater("_findCarcase"));
        ep.once('_findCarcase', function (carcase) {
            if (carcase) {
                _createTask(args.openid, args.tasktype, carcase.id, ep.doneLater('_createTask'));
            }
        });
    }
    ep.once("_createTask", function (task) {
        if (task) {
            data.openId = args.openid;
            data.caseId = task.carcaseId;
            data.tasktype = task.tasktype;
            task.memos.create(ep.doneLater('createMemo'));
        }
    });
    ep.once("createMemo", function (memo) {
        if (memo) {
            var channelname = data.caseId + '/' + data.tasktype;
            redismodels.publicclient.update({ where: { openId: data.openId }, update: { state: state.STATE.REPORTING, module: 'publicbusiness', submodule: businessModule.MODULE.REPORT, channel: channelname, stateupdatetime: date.getTime() } }, ep.doneLater('_updateUser'));
        }
    });
    ep.once("_updateUser", function (result) {
        if (result) {
            redismodels.publicclient.update({ where: { openId: data.openId }, update: { caseId: data.caseId, tasktype: data.tasktype } }, ep.doneLater('_updateUserinfo'));
        }
    });
    ep.once("_updateUserinfo", function (result) {
        var tag = businessModule.MODULE.REPORT;
        if (result) {
            kueJobs.create("message", _.extend({ touser: data.openId }, message.willReport));
            kueJobs.create('getUserControl', { title: 'getUserControl', module: moduleName, openid: data.openId, tag: tag });
            kueJobs.create('mqttMessagePub', { topic: 'updateCarcaseState', message: JSON.stringify(data) }); //发送案件创建成功消息
        }
        callback(null, result);
    });
    ep.fail(function (err) {
        console.log("err:" + err);
        callback(errors.SystemError);
    });
}
exports.doCarcase = doCarcase;

function doSurvey(args, callback) {
    var checkArgs = ["openid", "carcaseId", "tasktype"];
    for (var i = 0; i < checkArgs.length; i++) {
        if (Util.isEmptyStr(args[checkArgs[i]])) {
            return callback(errors.LackArgument);
        }
    }
    var ep = new EventProxy();
    var data = { openId: null, caseId: null, tasktype: null, carmark: null };
    var id = -1;
    if (!Util.isEmptyStr(args.carcaseId)) {
        id = parseInt(args.carcaseId);
    }
    if (-1 === id) {
        return callback(errors.SystemError);
    } else {
        models.carcase.findOne({ where: { id: id } }, ep.doneLater("_findCarcase"));
        ep.once('_findCarcase', function (carcase) {
            if (carcase) {
                data.carmark = carcase.carmark;
                _createTask(args.openid, args.tasktype, carcase.id, ep.doneLater('_createTask'));
            }
        });
    }
    ep.once("_createTask", function (task) {
        if (task) {
            data.openId = args.openid;
            data.caseId = task.carcaseId;
            data.tasktype = task.tasktype;
            task.memos.create(ep.doneLater('createMemo'));
        }
    });
    ep.once("createMemo", function (memo) {
        if (memo) {
            var channelname = data.caseId + '/' + data.tasktype;
            redismodels.publicclient.update({ where: { openId: data.openId }, update: { state: state.STATE.REPORTING, module: 'publicbusiness', submodule: businessModule.MODULE.SURVEY, channel: channelname, stateupdatetime: date.getTime() } }, ep.doneLater('_updateUser'));
        }
    });
    ep.once("_updateUser", function (result) {
        if (result) {
            redismodels.publicclient.update({ where: { openId: data.openId }, update: { caseId: data.caseId, tasktype: data.tasktype } }, ep.doneLater('_updateUserinfo'));
        }
    });
    ep.once("_updateUserinfo", function (result) {
        var tag = businessModule.MODULE.SURVEY;
        if (result) {
            kueJobs.create("message", _.extend({ touser: data.openId }, message.willSurvey));
            kueJobs.create('getUserControl', { title: 'getUserControl', module: moduleName, openid: data.openId, tag: tag });
            kueJobs.create('mqttMessagePub', { topic: 'updateCarcaseState', message: JSON.stringify(data) }); //发送案件创建成功消息
        }
        callback(null, result);
    });
    ep.fail(function (err) {
        console.log("err:" + err);
        callback(errors.SystemError);
    });
}
exports.doSurvey = doSurvey;

/**
* _createCarcase 数据库新建案件信息 经纬度坐标默认写入0 set carowner to "" and carowner_tel to ""
* @param args
* @param callback
* @returns {any}
* @private
*/
function _createCarcase(args, callback) {
    var params = _.extend({ casestate: 1 }, { accidenttime: args.accident_time }, { carmark: args.carmark }, { carownertel: "" }, { carowner: "" }, { carcase_driver: args.carcase_driver }, { driver_tel: args.driver_tel }, { reporter: args.reporter }, { reporter_tel: args.reporter_tel }, { carcase_addr: args.carcase_addr }, { current_addr: args.current_addr }, { accident_character: args.accident_character }, { carcase_lat: args.lat }, { carcase_lng: args.lng });
    models.carcase.create(params, function (err, result) {
        if (result) {
            return callback(err, result);
        }
    });
}

/**
* _createTask stateupdatetime 状态更新时间
* @param openId 手机端操作员
* @param tasktype 任务类型
* @param carcaseId 案件编号
* @param callback
* @private
*/
function _createTask(openId, tasktype, carcaseId, callback) {
    var params = null;
    if (tasktype === "调度") {
        params = { carcaseId: carcaseId, tasktype: tasktype, frontstate: state.STATE.NONE, frontoperator: '', backoperator: openId, backstate: state.STATE.REPORTING, stateupdatetime: date.getTime() };
    } else if (tasktype === "查勘") {
        params = { carcaseId: carcaseId, tasktype: tasktype, frontstate: state.STATE.SURVEY, frontoperator: openId, backoperator: '', backstate: state.STATE.NONE, frontprice: 0.0, backprice: 0.0, stateupdatetime: date.getTime() };
    } else {
        params = null;
    }
    models.task.create(params, function (err, task) {
        if (task) {
            return callback(null, task);
        } else {
            return callback(err, null);
        }
    });
}

/**
* doMessage 进入业务模块后处理事件与消息,消息子模块为查勘模块且输入数字正则匹配1-5步骤时进入查勘模块
* @param job
* @param done
*/
function doMessage(job, done) {
    var data = job.data;
    var ep = new EventProxy();
    getUser(_getOpenId(data), ep.done('getUser'));
    console.log("每用户则新建用户：",data);
    ep.once('getUser', function (user) {
        if (user) {
            data.user = user;//绑定user信息
            switch (data.MsgType) {
                case 'text':
                case 'image':
                case 'voice':
                    _doMessage(data);
                    break;
                case 'event':
                    _doEvent(data);
                    break;
                default:
                    break;
            }
        }
    });
    ep.fail(function (err) {
        console.log("err:" + err);
    });
    _doneJob(job, done);
}

/**
* _doMessage 处理接收消息，转发至各模块 先检查用户信息是否存在
* checkUserInfo 方式需要获取mysql中publicuser表的tasktype与caseId ,用户可能没有绑定用户信息
* @param data 用户信息
* @private
*/
function _doMessage(data) {
    console.log('进入business模块:',data);
    var ep = new EventProxy();
//    if (data.user.module === "publicbusiness") {
    if (data.user.module === "wechat") {
        data.caseId = data.user.caseId;
        data.tasktype = data.user.tasktype;
        if (data.MsgType === 'image') {
            if (data.Content === 'image'){
                _dealBySubmodule(data);
            }else{
                var fullpath = File.joinfilePath([publicbusinessSetting.imageDir, data.caseId + '_' + data.tasktype, data.caseId + '_' + data.tasktype + '_' + data.MsgId + '.png']);
                BusinessWork.createDirSync(fullpath);
                BusinessWork.downloadFile(data.PicUrl, fullpath, ep.doneLater('downloadFile'));
                ep.once('downloadFile', function (result) {
                    if (result === true) {
                        console.log('存储图片');
                        console.log('download image success');
                        data.PicUrl = path.join("/surveyImages", data.caseId + '_' + data.tasktype, data.caseId + '_' + data.tasktype + '_' + data.MsgId + '.png'); //修改图片存储地址
                        _dealBySubmodule(data);
                    }
                });
            }

        }
        else {
            _dealBySubmodule(data);//不是图片的从这里进。。。
        }
    } else if (data.user.module === "bindUser") {
        if (data.Content === "0") {
            _exitModule(data);
        } else {
            var messageStr = util.format(message.bindUser.text.content, settings.page.report);
            var bindMsg = {
                msgtype: "text",
                text: {
                    content: messageStr
                }
            };
            kueJobs.create("message", _.extend({ touser: data.FromUserName }, bindMsg));
        }
    } else {
        console.log("unknown user module.");
    }
    ep.fail(function (err) {
        console.log('err:' + err);
    });
}

function _dealBySubmodule(data) {
    console.log('_dealBySubmodule:',data);
    var ep = new EventProxy();
    if (data.user.submodule === "checkAudit") {
        _checkAudit(data);
    } else if (data.user.submodule === "checkScheduler") {
        _checkScheduler(data);
    } else if (data.user.submodule === businessModule.MODULE.SURVEY) {
        if (data.user.state === state.STATE.NONE) {
            _survey(data);
        } else {
            redismodels.survey.findOne({ where: { openId: data.user.openId } }, ep.done('findSurvey'));
            ep.once('findSurvey', function (survey) {
                if (survey) {
                    switch (data.MsgId) {
                        case -1:
                            _saveMessage(data);
                            _responseMessage(data);
                            break;
                        case -2:
                            redismodels.survey.update({ where: { id: survey.id }, update: { step: -2, maxstep: -2 } }, noop);
                            _responseMessage(data);
                            break;
                        case -3:
                            console.log("进入销案模块");
                            break;
                        case -4:
                            if (survey.step === -1) {
                                informSurvey(data);
                            }
                            break;
                        case -7:
                            _goPicture(data);
                            break;
                        case -8:
                            var auditinfo = JSON.parse(data.Content);

                            //前台发送的金额预先写入pre字段中
                            models.task.update({ where: { carcaseId: data.caseId, tasktype: "查勘" }, update: { preaudit_tel: auditinfo.user_tel, preprice: parseFloat(auditinfo.preprice), preresult: auditinfo.preresult } }, noop);
                            redismodels.publicclient.update({ where: { openId: _getOpenId(data) }, update: { submodule: "checkAudit" } }, noop);
                            var weChatMsg = {
                                touser: _getOpenId(data),
                                msgtype: 'text',
                                text: {
                                    content: message.preAuditMsg.text.content
                                }
                            };
                            weChatMsg.text.content = util.format(weChatMsg.text.content, auditinfo.preprice, auditinfo.user_tel, auditinfo.preresult);
                            kueJobs.create('message', weChatMsg);
                            break;
                        default:
                            data.step = survey.step;
                            data.maxstep = survey.maxstep;
                            data.limit = survey.limit;
                            data.isRepic = survey.isRepic;
                            _saveMessage(data);
                            _responseMessage(data);
                            break;
                    }
                } else {
                    kueJobs.create("message", _.extend({ touser: _getOpenId(data) }, message.noSurveyFound));
                }
            });
        }
    } else if (data.user.submodule === businessModule.MODULE.REPORT) {
        switch (data.MsgId) {
            case -9:
                var schedulerinfo = JSON.parse(data.Content);
                models.carcase.update({ where: { id: schedulerinfo.carcaseId }, update: { garageId: schedulerinfo.garageId } }, ep.done("updateGarage"));
                ep.once("updateGarage", function (result) {
                    if (result) {
                        redismodels.publicclient.update({ where: { openId: _getOpenId(data) }, update: { submodule: "checkScheduler" } }, noop);
                        kueJobs.create("message", _.extend({ touser: _getOpenId(data) }, message.askForScheduler));
                    } else {
                        kueJobs.create("message", _.extend({ touser: _getOpenId(data) }, message.unknownError));
                    }
                });
                break;
            default:
                models.task.findOne({ where: { carcaseId: data.caseId, tasktype: data.tasktype } }, ep.doneLater("findTask"));
                ep.once('findTask', function (task) {
                    if (task) {
                        if (task.frontstate === 0 && data.Content === "0") {
                            redismodels.publicclient.update({ where: { openId: _getOpenId(data) }, update: { channel: "none", module: 'wechat', submodule: 'none', state: state.STATE.NONE, stateupdatetime: date.getTime() } }, ep.done('updateClient'));
                            ep.once('updateClient', function (result) {
                                if (result) {
                                    redismodels.publicclient.update({ where: { openId: _getOpenId(data) }, update: { tasktype: '', caseId: -1 } }, ep.done('updateUserinfo'));
                                }
                            });
                            ep.once('updateUserinfo', function (result) {
                                if (result) {
                                    kueJobs.create('getUserControl', { title: 'getUserControl', module: "wechat", openid: _getOpenId(data), tag: "" }); //释放用户控制权利
                                    kueJobs.create("message", _.extend({ touser: data.FromUserName }, message.exitModule));
                                    ep.emit('deleteRecord');
                                }
                            });
                            ep.once("deleteRecord", function () {
                                var tmpcarmark = "";
                                models.carcase.findOne({ where: { id: data.caseId } }, ep.doneLater("findCarcase"));
                                ep.once('findCarcase', function (carcase) {
                                    if (carcase) {
                                        tmpcarmark = carcase.carmark;
                                        models.task.findOne({ where: { carcaseId: data.caseId, tasktype: data.tasktype } }, ep.doneLater("findTask"));
                                    }
                                });
                                ep.once('findTask', function (task) {
                                    if (task) {
                                        var sqlarr = [
                                            "delete from carcase where id=" + data.caseId + ";",
                                            "delete from task where carcaseId =" + data.caseId + " and tasktype='" + data.tasktype + "';",
                                            "delete from memo where taskId =" + task.id + ";"];
                                        ep.after("deleteDone", sqlarr.length, function (result) {
                                            if (result) {
                                                console.log("delete record done.");
                                                var msg = { carmark: tmpcarmark };
                                                kueJobs.create('mqttMessagePub', { topic: 'cancelScheduler', message: JSON.stringify(msg) });
                                            }
                                        });
                                        for (var i = 0; i < sqlarr.length; i++) {
                                            models.getClient().query(sqlarr[i], ep.group("deleteDone"));
                                        }
                                    }
                                });
                            });
                        }
                        else {
                            _saveMessage(data);//目前不需要任何逻辑，从这里直接进
                            _responseMessage(data);
                        }
                    }
                });
                break;
        }
    }
    else {
        _saveMessage(data);
        _responseMessage(data);
    }
    ep.fail(function (err) {
        console.log('err:' + err);
    });
}

/**
* _exitModule 退出模块
* @param data
* @private
*/
function _exitModule(data) {
    kueJobs.create('getUserControl', { title: 'getUserControl', module: "wechat", openid: data.FromUserName, tag: "" });
    kueJobs.create("message", _.extend({ touser: data.FromUserName }, message.exitModule));
}

/**
* _saveMessage 对业务消息先进行一次转发保存业务中需要的信息再进行发送，设置用户频道channel
* @param data 封装用户数据
* @private
*/
function _saveMessage(data) {
    console.log("按频道存储消息",data);
    if ('none' !== data.user.channel) {
        data.channel = data.user.channel;
        redismodels.publicmessage.create(data, noop); //按频道存储消息
        if (data.MsgId === -1) {
            data.openId = data.ToUserName;
        } else {
            data.openId = data.FromUserName;
        }
        kueJobs.create("publishMessage", data);
    }
}

function _responseMessage(data) {
    console.log("_responseMessage:11111111");
    if(data.MsgType=='image'){
        console.log("图片");
        var weChatMsg = {
            msgtype: 'image',
            touser: _getOpenId(data),
            image:{
                "media_id": data.MediaId
            }
        };
    }else{
        var weChatMsg = {
            msgtype: 'text',
            touser: _getOpenId(data),
            text: {
                content: data.Content
            }
        };
    }
    kueJobs.create('message', weChatMsg);
}

/**
* _doEvent 服务器内部事件处理函数,验证用户信息成功后进入
* @param data
* @private
*/
function _doEvent(data) {
    if (data.hasOwnProperty('Event')) {
        switch (data.Event) {
            case e_type.location:
                _doLocation(data);
                break;
            case e_type.click:
                console.log('enter click event.');
                break;
            case e_type.view:
                break;
            case e_type.subscribe:
                console.log('subscribe success.');
                break;
            case e_type.unsubscribe:
                _unsubscribe(data);
                break;
            default:
                break;
        }
    }
}

/**
* _doLocation 处理地理位置数据
* @param data
* @private
*/
function _doLocation(data) {
    var ep = new EventProxy();
    var lat = parseFloat(data.Latitude);
    var lng = parseFloat(data.Longitude);
    redismodels.publicclient.update({ where: { openId: data.FromUserName }, update: { lat: lat, lng: lng, stateupdatetime: date.getTime() } }, d.bind(ep.doneLater('updateLocation')));
    ep.once('updateLocation', function (result) {
        if (result) {
            var addr = data.Latitude + "," + data.Longitude;
            var url = geocoder.reverseUrl(geocoder.coordtype, geocoder.ak, addr, 0);
            request.get({ url: url, json: true }, ep.done('reverseLocation'));
        } else {
            kueJobs.create('message', _.extend({ touser: _getOpenId(data) }, message.unknownError));
        }
    });
    ep.once("reverseLocation", function (res, body) {
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
                if (addrresult.status === 0 && addrresult.result.hasOwnProperty("formatted_address")) {
                    addr = addrresult.result.formatted_address;
                } else {
                    addr = "服务器返回地址错误，未获取到准确地址信息";
                }
                redismodels.publicclient.update({ where: { openId: data.FromUserName }, update: { addr: addr, stateupdatetime: date.getTime() } }, ep.done('updateAddr'));
            } else {
                ep.emit("error", errors.CustomError);
            }
        } else {
            ep.emit("error", errors.CustomError);
        }
    });
    ep.once("updateAddr", noop);
    ep.fail(function (err) {
        console.log("err:" + err);
    });
}

function _unsubscribe(data) {
    var ep = new EventProxy();
    redismodels.publicclient.update({ where: { openId: _getOpenId(data) }, update: { channel: "none", module: 'wechat', tasktype: '', caseId: -1, submodule: 'none', state: state.STATE.NONE, stateupdatetime: date.getTime() } }, ep.done('updateClient'));
    ep.once('updateClient', function (result) {
        if (result) {
            kueJobs.create('getUserControl', { title: 'getUserControl', module: "wechat", openid: _getOpenId(data), tag: "" }); //释放用户控制权利
            console.log("unsubscribe publicbusiness success");
        } else {
            kueJobs.create('message', _.extend({ touser: _getOpenId(data) }, message.unknownError));
        }
    });
    ep.fail(function (err) {
        console.log("err:" + err);
    });
}

/**
* _checkSupportSurvey 寻找该车牌号最近时间报案的案件,满足条件
* （1）	报案时间为8:30-17:00
* @private
*/
function _checkSupportSurvey() {
    var date = new Date(Date.now());
    var time_max = (publicbusinessSetting.workingTime.workingTime_Max).split(":");
    var time_min = (publicbusinessSetting.workingTime.workingTime_Min).split(":");
    var d_min = new Date();
    d_min.setHours(time_min[0], time_min[1], time_min[2]);
    var d_max = new Date();
    d_max.setHours(time_max[0], time_max[1], time_max[2]);
    return (date.getTime() >= d_min.getTime() && date.getTime() <= d_max.getTime());
}

function _checkBusiness(data) {
    console.log("enter checkBusiness");
    switch (data.user.submodule) {
        case businessModule.MODULE.REPORT:
            kueJobs.create("message", _.extend({ touser: data.FromUserName }, message.noFinishReport));
            break;
        case businessModule.MODULE.SURVEY:
            kueJobs.create("message", _.extend({ touser: data.FromUserName }, message.noFinishSurvey));
            break;
        case businessModule.MODULE.CHECKSCHEDULER:
            kueJobs.create("message", _.extend({ touser: data.FromUserName }, message.noFinishReport));
            break;
        case "checkAudit":
            kueJobs.create("message", _.extend({ touser: data.FromUserName }, message.noFinishSurvey));
            break;
        default:
            break;
    }
}

function _getOpenId(data) {
    var openId = '';
    if (data.hasOwnProperty("channel")) {
        openId = data.ToUserName;
    } else {
        openId = data.FromUserName;
    }
    return openId;
}

/**
* _doneJob 处理完业务后必须处理的事情
* @param job
* @param done
* @private
*/
function _doneJob(job, done) {
    done();
    job.remove();
}

function _survey(data) {
    if (data.Content === "1") {
        var result = _checkSupportSurvey();
        if (result === true) {
            var ep = new EventProxy();
            redismodels.publicclient.update({ where: { openId: data.user.openId }, update: { state: state.STATE.SURVEY, stateupdatetime: date.getTime() } }, d.bind(ep.done('_updateState')));
            ep.once('_updateState', function (result) {
                if (result) {
                    redismodels.survey.findOne({ where: { openId: data.user.openId } }, d.bind(ep.done("_findSurvey")));
                }
            });
            ep.once("_findSurvey", function (survey) {
                console.log("find survey success");
                if (survey) {
                    redismodels.survey.update({ where: { openId: data.user.openId }, update: { step: -1, maxstep: -1 } }, d.bind(ep.doneLater('_createOrResetSurvey')));
                } else {
                    redismodels.survey.create({ openId: data.user.openId }, d.bind(ep.doneLater("_createOrResetSurvey")));
                }
            });
            ep.once("_createOrResetSurvey", function (result) {
                if (result) {
                    console.log("enter survey state success");
                    var args = { carcaseId: data.user.caseId, tasktype: data.user.tasktype, openid: data.user.openId };
                    if (!Util.isEmptyStr(JSON.stringify(args))) {
                        exports.doSurvey(args, noop);
                    }
                }
            });
            ep.fail(function (err) {
                console.log('err:' + err);
            });
        } else {
            _unsubscribe(data);
            var weChatMsg = {
                touser: _getOpenId(data),
                msgtype: 'text',
                text: {
                    content: message.searchReportFail.text.content
                }
            };
            weChatMsg.text.content = util.format(weChatMsg.text.content, publicbusinessSetting.workingTime.workingTime_Min, publicbusinessSetting.workingTime.workingTime_Max, publicbusinessSetting.workingTime.workingTime_Min, publicbusinessSetting.workingTime.workingTime_Max);
            kueJobs.create('message', weChatMsg);
        }
    } else {
        kueJobs.create("message", _.extend({ touser: data.FromUserName }, message.tbsearchReportCondition));
    }
}

/**
* _checkScheduler 询问调度意见
* @param data
* @private
*/
function _checkScheduler(data) {
    var schedulerMessage = null;
    if (data.Content === "1") {
        schedulerMessage = message.humanSurveyMsg.text.content;
    } else if (data.Content === "2") {
        schedulerMessage = message.weCharSurveyMsg.text.content;
    } else {
        kueJobs.create("message", _.extend({ touser: data.FromUserName }, message.unKnownSchedulerMsg));
        return;
    }
    var memo = { choice: parseInt(data.Content), content: schedulerMessage };
    var schedulerinfo = { carmark: data.carmark, caseId: data.caseId, tasktype: data.tasktype, choice: -1, content: "" };
    schedulerinfo.choice = memo.choice;
    schedulerinfo.content = memo.content;
    data.memo = memo;
    if (data.Content === "1") {
        _updateMemo(data, "调度", function (err, result) {
            if (result === true) {
                redismodels.publicclient.update({ where: { openId: _getOpenId(data) }, update: { submodule: businessModule.MODULE.REPORT } }, noop);
                kueJobs.create('mqttMessagePub', { topic: 'schedulerResult', message: JSON.stringify(schedulerinfo) });
                kueJobs.create("message", _.extend({ touser: _getOpenId(data) }, message.schedulerResultMsg));
            }
        });
    } else if (data.Content === "2") {
        //用户同意微信查勘,首先数据库提交意见并结案,其次用户状态正确，再构造发送Content为1的事件,
        var ep = new EventProxy();
        _updateMemo(data, "调度", ep.doneLater("updateMemo"));
        ep.once("updateMemo", function (result) {
            if (result) {
                models.task.update({ where: { carcaseId: data.caseId, tasktype: '调度', frontstate: state.STATE.SCHEDULEING }, update: { isComplete: 1, frontstate: state.STATE.SCHEDULED, backstate: state.STATE.NONE, stateupdatetime: Date.now() } }, ep.doneLater("updateTask"));
            }
        });
        ep.once("updateTask", function (result) {
            if (result) {
                redismodels.publicclient.update({ where: { openId: _getOpenId(data) }, update: { channel: "none", module: "publicbusiness", submodule: businessModule.MODULE.SURVEY, state: state.STATE.NONE, stateupdatetime: date.getTime() } }, ep.doneLater("updateClient"));
            }
        });
        ep.once("updateClient", function (result) {
            if (result) {
                redismodels.publicclient.update({ where: { openId: _getOpenId(data) }, update: { tasktype: "查勘" } }, ep.done('_updateUserinfo'));
            }
        });
        ep.once("_updateUserinfo", function (result) {
            if (result) {
                kueJobs.create('mqttMessagePub', { topic: 'schedulerResult', message: JSON.stringify(schedulerinfo) });
                var enterAuditMsg = {
                    channel: "none",
                    CreateTime: Date.now() / 1000,
                    Content: "1",
                    MsgType: 'text',
                    MsgId: data.MsgId,
                    FromUserName: data.ToUserName,
                    ToUserName: data.FromUserName
                };
                kueJobs.create('mqttMessagePub', { topic: 'sendToWeChat', message: JSON.stringify(enterAuditMsg) });
            }
        });
        ep.fail(function (err) {
            console.log('err:' + err);
        });
    }
}

function _checkAudit(data) {
    var auditMessage = null;
    if (data.Content === "1") {
        auditMessage = message.agreeAuditMsg.text.content;
    } else if (data.Content === "2") {
        auditMessage = message.disagreeAuditMsg.text.content;
    } else if (data.Content === "3") {
        auditMessage = message.agreeDeleteAuditMsg.text.content;
    } else {
        kueJobs.create("message", _.extend({ touser: data.FromUserName }, message.unKnownAuditMsg));
    }
    if (data.Content === "1" || data.Content === "2" || data.Content === "3") {
        var memo = { choice: parseInt(data.Content), content: auditMessage };
        data.memo = memo;
        _updateMemo(data, "查勘", function (err, result) {
            if (result === true) {
                redismodels.publicclient.update({ where: { openId: _getOpenId(data) }, update: { submodule: "survey" } }, noop);
                var auditinfo = { carmark: data.carmark, caseId: data.caseId, tasktype: data.tasktype };
                kueJobs.create('mqttMessagePub', { topic: 'auditResult', message: JSON.stringify(auditinfo) });
                kueJobs.create("message", _.extend({ touser: _getOpenId(data) }, message.auditResultMsg));
            }
        });
    }
}

/**
* getUser 检查redis内存中是否存在该用户信息，没有用户信息则创建
* @param openId 微信消息数据中包含openid
* @param callback 回掉结果
**/
function getUser(openId, callback) {
    _checkUserExist(openId, function (err, user) {
        if (err)
            callback(err);
        if (user) {
            console.log("用户已经存在");
            callback(null, user);
        } else {
            _createUser(openId, function (err, user) {
                if (user) {
                    console.log("新建用户成功");
                    callback(null, user);
                }
            });
        }
    });
}

/**
* _checkUserInfo 由微信返回消息data确认用户信息
* @param openId 微信客户编号
* @param callback 回调结果(err,result) 错误与返回结果
* @private
*/
function _checkUserInfo(openId, callback) {
    models.publicUser.findOne({ where: { openid: openId } }, d.bind(function (err, cuserinfo) {
        if (cuserinfo) {
            callback(null, cuserinfo);
        } else {
            callback(err, null);
        }
    }));
}

/**
* checkUserExist 检查用户信息是否存在
* @param openId 微信客户编号
* @param callback 回调结果(err,result) 错误与返回结果
* @private
*/
function _checkUserExist(openId, callback) {
    redismodels.publicclient.findOne({ where: { openId: openId } }, function (err, user) {
        if (err)
            return callback(err);
        if (user) {
            return callback(null, user);
        } else {
            return callback(null, null);
        }
    });
}

function _createUser(openId, callback) {
    redismodels.publicclient.create({ openId: openId }, d.bind(function (err, user) {
        if (err) {
            console.log("err:" + err);
        }
        if (user) {
            console.log("新建用户成功1");
            callback(null, user);
        }
    }));
}

function _updateMemo(data, tasktype, callback) {
    var caseId = data.hasOwnProperty("caseId") ? data.caseId : -1;
    var ep = new EventProxy();
    var tempTask = null;
    models.task.findOne({ where: { carcaseId: caseId, tasktype: tasktype } }, ep.doneLater("_findTask"));
    ep.once("_findTask", function (task) {
        if (task) {
            tempTask = task;
            models.memo.findOne({ where: { taskId: task.id } }, ep.doneLater("_findMemo"));
        }
    });
    ep.once("_findMemo", function (memo) {
        if (memo) {
            models.memo.update({ where: { id: memo.id }, update: data.memo }, ep.doneLater("_dealMemo"));
        } else {
            tempTask.memos.create(data.memo, ep.doneLater("_dealMemo"));
        }
    });
    ep.once("_dealMemo", function (result) {
        if (result) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    });
    ep.fail(function (err) {
        console.log('err:' + err);
        callback(err, false);
    });
}

function informSurvey(data) {
    var ep = new EventProxy();
    redismodels.survey.findOne({ where: { openId: data.ToUserName } }, ep.done('findSurvey'));
    ep.once("findSurvey", function (result) {
        if (result && -1 === result.step) {
            redismodels.survey.update({ where: { openId: data.ToUserName }, update: { step: 1, maxstep: 1 } }, ep.done('updateSurvey'));
        }
    });
    ep.once("updateSurvey", function (result) {
        if (result) {
            kueJobs.create("message", _.extend({ touser: data.ToUserName }, message.surveyStepFirst));
        }
    });
    ep.fail(function (err) {
        console.log('err:' + err);
    });
}

function _goPicture(data) {
    var openId = data.hasOwnProperty("ToUserName") ? data.ToUserName : "";
    var nextstep = -1;
    var ep = new EventProxy();
    redismodels.survey.findOne({ where: { openId: openId } }, ep.done("_findSurvey"));
    ep.once("_findSurvey", function (survey) {
        if (survey) {
            if (survey.step >= 1 && survey.step < responseInfo.length) {
                nextstep = survey.step + 1;
            } else if (survey.step === responseInfo.length) {
                nextstep = -2;
                kueJobs.create("message", _.extend({ touser: openId }, message.AllFinishFlag));
            }
            redismodels.survey.update({ where: { id: survey.id }, update: { step: nextstep, maxstep: nextstep } }, ep.done("_updateSurvey"));
        }
    });
    ep.once("_updateSurvey", function (result) {
        if (result) {
            var responsemessage = {};
            for (var i = 0; i < responseInfo.length; i++) {
                if (result[0].step === responseInfo[i].step) {
                    responsemessage = responseInfo[i].message;
                }
            }
            kueJobs.create("message", _.extend({ touser: openId }, responsemessage));
        }
    });
    ep.fail(function (err) {
        console.log('err:' + err);
    });
}
//# sourceMappingURL=business.js.map
