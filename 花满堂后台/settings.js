/**
* Created by Administrator on 2014/4/21.
* settings.ts environment file
*/
var enviroment = process.env.wechat || 'hc';
//console.log(enviroment);
//var settingsTest = require('./environment/settings_test');
//var settingsHcTest = require('./environment/settings_hctest');
//var settingsProduct = require('./environment/settings_product');
//var settingsDevelop = require('./environment/settings_develop');
//var settingsProducttest = require('./environment/settings_producttest');
var settingsHc = require('./environment/settings_hc');

var settings;
switch (enviroment) {
    case 'test':
        settings = settingsTest;
        break;
    case 'product':
        settings = settingsProduct;
        break;
    case 'producttest':
        settings = settingsProducttest;
        break;
    case 'hctest':
        settings = settingsHcTest;
        break;
    case 'hc':
        settings = settingsHc;
        break;
    default:
        settings = settingsDevelop;
        break;
}
module.exports = settings;
//# sourceMappingURL=settings.js.map
