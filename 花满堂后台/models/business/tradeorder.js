/**
 * Created by lg on 2015/7/21.
 */
var tradeorder = function (schema) {
    return schema.define('tradeorder', {
        openid:{type: String, length: 36},
        out_trade_no: { type: String, index: { kind: 'UNIQUE' }, length: 32 },
        transaction_id:{ type: String, index: { kind: 'UNIQUE' }, length: 32 },
        result_code:{type: String, length: 20},
        return_code: {type: String, length: 20},
        trade_state: {type: String, length: 20},
        time_end:{type: String, length: 20},
        total_fee:{ type: String, length: 20 },
        orderUser: { type: String },
        createTime: { type: Number, dataType: 'bigint' },
        orderStatus: { type: Number, default: 0 }
    });
};

module.exports = tradeorder;