/**
* Created by zhou on 2014/5/4.
* route.ts 业务处理服务端入口函数
*/
var Business = require('./business');

function route(app) {
    app.all('/api/publicbusiness/:action', function (req, res) {
        if (Business[req.params.action]) {
            if (req.route.method === 'get') {
                Business[req.params.action](req.query, function (err, result) {
                    res.send({ err: err, success: !err, data: result });
                });
            } else if (req.route.method === 'post') {
                Business[req.params.action](req.body, function (err, result) {
                    res.send({ err: err, success: !err, data: result });
                });
            } else {
                res.send(404);
            }
        } else {
            res.send(404);
        }
    });

    app.get('/publicbusiness/route/:action', function (req, res) {
        console.log('get ' + req.params.action, req.query);
        Business.route(req, res);
    });
}

module.exports = route;
//# sourceMappingURL=route.js.map
