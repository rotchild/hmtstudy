/**
* Created by lg on 2014/11/25.
*/
///<reference path='../ts/node/node.d.ts' />
var path = require('path');

var businessServer = 'http://app.whhcxw.com.cn:7091';
var WXPay = require('weixin-pay');

var settings = {
    cookie_secret: 'secret_meteoric',
    serverPort: 9006,
    mysql: {
        database: 'hmtwechat',
        //host:'120.27.24.243',
        host: '192.168.1.65',
        user: 'assist',
        username: 'assist',
        password: 'ipcamera',
        port: 3306,
        pool: true,
        multipleStatements: true
    },
        wxpay : WXPay({
        appid: 'wxd961ab01b07030dc',
        mch_id: '10024480',
        partner_key: '86B94F630AE281F840DA6211BEBC9424'
    }),
    redis: {
        host:'120.27.24.243',
        //host: '127.0.0.1',
        port: 6379,
        client: '',
        ttl: 60000 * 60 * 24 * 30 * 3,
        options: {
            no_ready_check: true
        }
    },
    imageSystem: {
        server: "10.196.27.113",
        port: 8088
    },
    centerJobSystem: {
        appId: '05',
        appKey: '905cccb92b064a2db69a97fr704643d5',
        jobSyncInterval: 15 * 1000,
        wsdlFile: './api/business/p09_test.wsdl'
    },
    thirdBusiSystem: {
        partnerCode: 'VEHCHAT',
        user: 'VEHCHAT',
        password: '123456',
        terminalNo: 'TEST_3090100',
        branchCode: '3090100',
        productKind: 'AUTOCOMPRENHENSIVEINSURANCE2009PRODUCT',
        server: 'http://112.64.185.187/jttpitx/itxsvc/param'
    },
    page: {
        selectProduct: 'http://42.96.199.56:7091/mobile/person.html#page_personCreateJob'
    },
    lawQuery: {
        driver: 'http://cxqlapi.sdjtaq.cn:8080/cxqlwebservice/SdJszjfService?USERNAME=cpic10108888&PASSWORD=e30fb8337da9190af689249e4351f676',
//        car: 'http://cxqlapi.sdjtaq.cn:8080/cxqlwebservice/SdWzcxService?USERNAME=cpic10108888&PASSWORD=e30fb8337da9190af689249e4351f676'
        car :'http://52.17.33.150:808/api/Public/renbaoVerify'
    },
    weChatServer: 'http://127.0.0.1:7090',
    publicAddr: businessServer,
    printHost:"http://192.168.1.17:8080/HuaManTangPrinter/servlet/Print",//打印机端口
    printSettingHost:'http://192.168.1.17:8080/HuaManTangPrinter/servlet/AddIP',//修改打印机配置文件端口
    deleteDirs: [
        {
            fileDir: path.join(__dirname, '../web/surveyImages'),
            liveCycle: 30 * 24 * 60 * 60 * 1000
        }, {
            fileDir: path.join(__dirname, '../images'),
            liveCycle: 30 * 24 * 60 * 60 * 1000
        }],
    deleteFileInterval: 60 * 60 * 1000,
    platform: "hc"
};
module.exports = settings;
//# sourceMappingURL=settings_hc.js.map
