/**
* Created by md313 on 14-4-23.
* clinet.ts 客户端模型类
* 采用 redis 缓存用户报案时上报的信息至内存中
* 与公司服务端案件状态共享与同步
* 用户上报姓名、车牌号与电话号码绑定在该client中
**/
var client = function (schema) {
    var client = schema.define('publicclient', {
        channel: { type: String, "default": "none" },
        openId: { type: String, index: true },
        module: { type: String, "default": 'wechat' },
        submodule: { type: String, "default": "none" },
        state: { type: Number, dataType: 'smallInt', "default": 0 },
        tasktype: { type: String, length: 20, default: "" },
        caseId: { type: Number, dataType: 'int', default: -1 },
        stateupdatetime: { type: Number, dataType: 'bigint', "default": Date.now() },
        lat: { type: Number, dataType: "decimal", precision: 8, scale: 5, "default": 0.00000 },
        lng: { type: Number, dataType: 'decimal', precision: 8, scale: 5, "default": 0.00000 },
        addr: { type: String, length: 255 }
    });
    return client;
};

module.exports = client;
//# sourceMappingURL=client.js.map
