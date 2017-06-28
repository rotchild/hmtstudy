/**
* Created by zhou on 2014/7/10.
*/
///<reference path='../../ts/node/node.d.ts' />
var path = require('path');
var message = require('./message');

var settings = {
    workingTime: {
        workingTime_Max: "17:00:00",
        workingTime_Min: "8:30:00"
    },
    imageDir: path.join(__dirname, '../../web/surveyImages'),
    responseInfo: {
        rbresponseInfo: [{ step: "1", message: message.surveyStepFirst }, { step: "2", message: message.surveyStepSecond }, { step: "3", message: message.surveyStepThird }, { step: "4", message: message.surveyStepFourth }, { step: "5", message: message.surveyStepFifth }, { step: "6", message: message.surveyStepSixth }, { step: "7", message: message.surveyStepSeventh }, { step: "8", message: message.surveyStepEightth }, { step: '9', message: message.surveyStepNineth }],
        tbresponseInfo: [{ step: "1", message: message.surveyStepFirst }, { step: "2", message: message.surveyStepSecond }, { step: "3", message: message.surveyStepThird }, { step: "4", message: message.surveyStepFourth }, { step: "5", message: message.surveyStepExtra }, { step: '6', message: message.surveyStepNineth }]
    }
};

module.exports = settings;
//# sourceMappingURL=publicbusinessSetting.js.map
