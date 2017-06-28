
var api = require('./advertisement');
function route(app) {
    app.all('/api/advertisement/:action', function (req, res) {
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
    app.get('/advertisement/route/:action', function (req, res) {
        api.route(req, res);
    });
}
module.exports = route;
//# sourceMappingURL=route.js.map
