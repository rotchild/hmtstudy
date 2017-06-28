/**
* Created by md313 on 14-4-23.
* 用户消息类,自定义查勘与报案模块规定消息格式
*/
var message = function (schema) {
    var Message = schema.define('publicmessage', {
        CreateTime: { type: Number },
        ToUserName: String,
        FromUserName: String,
        MsgType: String,
        Content: String,
        MsgId: { type: Number, dataType: 'int' },
        PicUrl: String,
        MediaId: String,
        step: { type: Number, dataType: 'int' },
        maxstep: { type: Number, dataType: 'int' },
        limit: { type: Number, dataType: 'int' },
        isRepic: { type: Number, dataType: 'int' },
        channel: { type: String, index: true },
        caseId: { type: Number, dataType: 'int' },
        tasktype: { type: String, length: 20 }
    });
    return Message;
};

module.exports = message;
//# sourceMappingURL=message.js.map
