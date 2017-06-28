module.exports = function(app) {
    app.all('/api/Public/:ifName',
        function(req, res) {
            var ifName = req.params.ifName;//接口名

            if(!ifName)
                res.send(404);

             function CallBackFunction(_err,_result) {
                res.send({err:_err,success:!_err,data:_result});
            }

            var errors = require('../libs/errMark.js');

            var apiPublic = require('./PublicApi.js').GetApi(req,res,CallBackFunction,errors);

            try {
                if(apiPublic[ifName]) {
                    apiPublic[ifName]();
                } else {
                    res.send({err:errors.NoInterface,success:false,data:null});
                }
            } catch (_err){
                res.send({err:_err,success:!_err,data:_err.message});
            }
        }

    );
};