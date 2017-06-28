
var router = require('./route');
var settings = require('../../settings');
var message = require('./message');
var Event = require('../publicbusiness/event');
var _ = require('underscore');
var kue = require('../libs/bullLikeKue');

var jobs = kue.createQueue(settings);

var moduleName = "advertisement";
var e_type = Event('renbao').e_type;

function route(req, res) {
    res.redirect("/mobile/index.html#page_error");
}
exports.route = route;

/**
* 模块初始化
*/
function init(app) {
    console.log("app:", app);
    router(app);
    jobs.process('weChat/' + moduleName, doMessage);
}
exports.init = init;

function doMessage(job, done) {
    var msg = job.data;
    console.log("msg:", msg);
    switch (msg.MsgType) {
        case 'event':
            if (msg.Event === e_type.click && msg.EventKey == "VT_WECHATADVERTISEMENT") {
                jobs.create("message", _.extend({ touser: msg.FromUserName }, message.Advertisement));
            }
            else if(msg.Event === e_type.click && msg.EventKey == "VT_WECHATADVERTISEMENT1"){
                jobs.create("message", _.extend({ touser: msg.FromUserName }, message.Advertisement1))
            }
            else if(msg.Event === e_type.click && msg.EventKey == "VT_WECHATADVERTISEMENT2"){
                jobs.create("message", _.extend({ touser: msg.FromUserName }, message.Advertisement2))
            }
            break;
        default:
            break;
    }
    done();
    job.remove();
}
//# sourceMappingURL=advertisement.js.map
