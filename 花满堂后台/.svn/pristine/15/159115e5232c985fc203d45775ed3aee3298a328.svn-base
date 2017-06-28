/**
* Created by Administrator on 2014/4/21.
*/
var api = require('./publicService');
var paySettings = require('../../settings');
    function route(app) {
        console.log("publicService路由");
    app.all('/api/publicService/:action', function (req, res) {
        if (api[req.params.action]) {

            if (req.route.method == 'get') {
                api[req.params.action](req.query, function (err, result) {
                    res.send({ err: err, success: !err, data: result });
                });
            } else if (req.route.method == 'post') {
                api[req.params.action](req.body, function (err, result) {
                    res.send({ err: err, success: !err, data: result });
                });
            } else {
                res.send(404);
            }
        } else {
            res.send(404);
        }
    });
    app.get('/publicService/route/:action', function (req, res) {
        console.log("publicService/route路由");
        api.route(req, res);
    });
        app.get('/publicService/wechat/:action', function (req, res) {
            console.log("publicService/wechat路由");
            api.wechat(req, res);
        });
//    var WXPay = require('weixin-pay');
//    var wxpay = WXPay({
//        appid: 'wxc693c3da755e4ecb',
//        mch_id: '1239039602',
//        partner_key: 'xdhqijdlophujidfuewanb234oi98ddd'
////    pfx: fs.readFileSync('./wxpay_cert.p12'),
//    });
////    var wxpay = WXPay({
////        appid: 'wxd961ab01b07030dc',
////        mch_id: '10024480',
////        partner_key: '86B94F630AE281F840DA6211BEBC9424'
////    });
    app.use('/wxpay/notify', paySettings.wxpay.useWXCallback(function(msg, req, res, next){
        // 处理商户业务逻辑
        console.log('msg:',msg);
        api.orderNotify1(msg,function(err,result){
            console.log(err,result);
            if(err){
                res.fail();
            }else{
                res.success();
            }
        })
        // res.success() 向微信返回处理成功信息，res.fail()返回失败信息。
//        res.success();
    }));
}
module.exports = route;
//# sourceMappingURL=route.js.map
