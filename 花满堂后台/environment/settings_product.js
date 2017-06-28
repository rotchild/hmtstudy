/**
* Created by Administrator on 2014/4/21.
*/
///<reference path='../ts/node/node.d.ts' />
var path = require('path');
var businessServer = 'http://whpicc.com.cn:808';
var settings = {
    cookie_secret: 'secret_meteoric',
    serverPort: 808,
    mysql: {
        database: 'hmtwechat',
        host:'120.27.24.243',
        //host: '127.0.0.1',
        user: 'assist',
        username: 'assist',
        password: 'ipcamera',
        port: 3306,
        pool: true,
        multipleStatements: true
    },
//    信达鸿：
        wxpay : WXPay({
        appid: 'wxc693c3da755e4ecb',
        mch_id: '1239039602',
        partner_key: 'xdhqijdlophujidfuewanb234oi98ddd'
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
        server: "10.190.48.90",
        port: 8088
    },
    centerJobSystem: {
        appId: '05',
        appKey: '905cccb92b064a2db69a97fr704643d5',
        jobSyncInterval: 30 * 1000,
        wsdlFile: './api/business/p09_product.wsdl'
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
        selectProduct: businessServer + '/mobile/person.html#page_personCreateJob',
        report: businessServer + '/mobile/index.html#page_report',
        jobInfo: businessServer + '/mobile/person.html#page_jobInfo'
    },
    lawQuery: {
        driver: 'http://cxqlapi.sdjtaq.cn:8080/cxqlwebservice/SdJszjfService?USERNAME=cpic10108888&PASSWORD=e30fb8337da9190af689249e4351f676',
        car: 'http://cxqlapi.sdjtaq.cn:8080/cxqlwebservice/SdWzcxService?USERNAME=cpic10108888&PASSWORD=e30fb8337da9190af689249e4351f676'
    },
    weChatServer: 'http://127.0.0.1',
    publicAddr: businessServer,
    printHost:"http://192.168.1.144:8080/Gprinter/servlet/Print",
    deleteDirs: [
        {
            fileDir: path.join(__dirname, '../web/surveyImages'),
            liveCycle: 30 * 24 * 60 * 60 * 1000
        }, {
            fileDir: path.join(__dirname, '../images'),
            liveCycle: 30 * 24 * 60 * 60 * 1000
        }],
    deleteFileInterval: 60 * 60 * 1000,
    platform: "xdh"
};
module.exports = settings;
//# sourceMappingURL=settings_product.js.map
