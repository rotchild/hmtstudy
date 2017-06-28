/**
* Created by md313 on 14-4-21.
* 武汉人保微信公众平台消息类
*/
var settings = require('../../settings');

var wechat = settings.wechat;

function resourceurl() {
    return settings.publicAddr;
}

var message = {
    tbWelcome: {
        msgtype: 'text',
        text: {
            content: "感谢您关注太平洋财产保险山东分公司微信公众账号，我是您的微信助手，竭诚为您提供服务!"
        }
    },
    rbWelcome: {
        msgtype: 'text',
        text: {
            content: "感谢您关注武汉人保微信公众账号，我是您的微信助手，武汉人保微信公众平台将竭诚为您提供服务!"
        }
    },
    NoCommand: {
        msgtype: 'text',
        text: {
            content: "不支持的命令。"
        }
    },
    noFinishReport: {
        msgtype: 'text',
        text: {
            content: "尊敬的客户您好!请按照报案流程的提示，完成本次报案后再开始使用其他功能。"
        }
    },
    noFinishSurvey: {
        msgtype: 'text',
        text: {
            content: "尊敬的客户您好!您本次自助查勘尚未完成，请完成本次自助查勘后再开始使用其他功能。"
        }
    },
    noSurveyFound: {
        msgtype: 'text',
        text: {
            content: "尊敬的客户您好!系统没有发现您的查勘信息。"
        }
    },
    locationError: {
        msgtype: 'news',
        news: {
            articles: [{
                    title: "缺少地理位置信息",
                    description: "尊敬的客户您好!报案需获取您的地理位置，请选中公众号右上角小人标志->勾选'提供位置信息'或拨打电话95550进行报案。",
                    url: resourceurl() + "/detail/index.html#page_location",
                    picurl: resourceurl() + "/resources/images/message/location.png"
                }]
        }
    },
    /**
    * 回复车辆信息模板,用户回复完毕后需将openid与车牌号绑定
    */
    bindUser: {
        msgtype: 'text',
        text: {
            content: "尊敬的客户您好,请<a href=\"%s\">点击此处</a>填写报案信息。回复0可以退出微信报案功能。"
        }
    },
    changeUser: {
        msgtype: "text",
        text: {
            content: "尊敬的客户您好，您上次使用的用户信息是:\n出险驾驶员:%s\n出险车牌:%s\n手机号码:%s\n。回复0可退出微信报案或查勘功能，回复1使用原有信息报案，<a href=\"%s\">点击此处</a>将进入填写报案信息页面。"
        }
    },
    /**
    * 格式验证错误
    */
    formatError: {
        msgtype: 'text',
        text: {
            content: "尊敬的客户您好，您回复的车辆信息格式有误，请确认格式为鲁A18875，18655454451，王小虎 后再回复。信息间以逗号分割。"
        }
    },
    formatSuccess: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好，您的个人信息已成功保存,下面可以开始使用系统中其它功能。'
        }
    },
    verifyReport: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好,系统需确认本次报案是否为您本人操作。请<a href=\"%s\">点击这里</a>确认本次报案为您本人操作。'
        }
    },
    startReport: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好，您已成功提交车辆信息,下面点击自助报案中报案理赔按钮生成案件。'
        }
    },
    willReport: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好，您的信息我们已收到，稍后会安排调度员及时处理您的案件。现在您可以输入一段语音或文字信息来描述案件经过，回复0可退出报案。'
        }
    },
    supplyReport: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好!您的报案信息与车辆信息已上传完毕。现在您可以补充拍摄案件相关照片,通过对话信息添加拍摄图片并与调度员实时沟通,调度员审核完毕后回复您相关案件信息。'
        }
    },
    askForScheduler: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好!您需确认以下条件才可进行微信查勘：\n1、事故现场为第一现场。\n2、出险驾驶员驾驶证、出险车辆行驶证齐全。\n3、受损部位少于三处，无配件需要进行更换。\n4、事故现场适合手机拍照。\n回复1选择人工查勘，回复2选择微信查勘。'
        }
    },
    humanSurveyMsg: {
        msgtype: 'text',
        text: {
            content: '客户选择使用人工查勘方式。'
        }
    },
    weCharSurveyMsg: {
        msgtype: 'text',
        text: {
            content: '客户选择使用微信查勘方式。'
        }
    },
    unKnownSchedulerMsg: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好！必须回复1或2选择查勘方式。'
        }
    },
    schedulerResultMsg: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好！您已回复您的查勘选择,下面请耐心等待调度人员处理您的案件。'
        }
    },
    completeReport: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好!您的案件已调度成功，您的用户资料如下:\n姓名:范方舟\n联系电话:15567453423\n车牌号鄂A-18854。回复Y表示你愿意接受自助查勘，下面进入自助查勘环节，回复N则安排查勘员查勘案件信息。'
        }
    },
    unknownError: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好!出现未知错误，请稍后再重新尝试操作。'
        }
    },
    prepareSurvey: {
        msgtype: 'text',
        text: {
            content: "尊敬的客户您好！下面进入自助查勘环节,系统需核实已录入联系人电话是否已报案，案件需满足以下条件才可进行自助查勘:\n" + "1.符合不涉及人伤、小额损失的单方事故;\n2.车辆可正常行驶;\n3.车辆受损案件损失总金额在3000元以下;\n4.没有人员及其他车外财产损失。\n"
        }
    },
    searchReportSuccess: {
        msgtype: 'text',
        text: {
            content: "尊敬的客户您好！下面进入自助查勘环节,案件需满足以下条件才可进行自助查勘:\n" + "1.符合不涉及人伤、小额损失的单方事故;\n2.车辆可正常行驶;\n3.车辆受损案件损失总金额在3000元以下;\n4.没有人员及其他车外财产损失。\n" + "经验证该案件符合自助查勘条件，下面回复1开始进行自助查勘。"
        }
    },
    tbsearchReportCondition: {
        msgtype: 'text',
        text: {
            content: "尊敬的客户您好！下面进入自助查勘环节,案件需满足以下条件才可进行自助查勘:\n1.报案时间为上午%s-下午%s;\n下面回复1开始进行自助查勘。"
        }
    },
    searchReportFail: {
        msgtype: 'text',
        text: {
            content: "尊敬的客户您好！只能在上午%s至下午%s范围内使用微信自助查勘功能。\n\n如果需要进行自助查勘，请于每天上午%s至下午%s之间进行。"
        }
    },
    tbsearchReportFail: {
        msgtype: 'text',
        text: {
            content: "尊敬的客户您好！下面进入自助查勘环节,案件需满足以下两个条件才可进行自助查勘:\n1.报案时间为上午%s-下午%s;\n经验证该案件不符合自助查勘条件。"
        }
    },
    tbsearchContent: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好！必须输入1开始进行自助查勘功能。'
        }
    },
    willSurvey: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好，您的信息我们已收到,稍后将安排定损人员为您服务。'
        }
    },
    surveyStepFirst: {
        msgtype: 'news',
        news: {
            articles: [{
                    title: "请拍摄车头前45度角照片",
                    description: "尊敬的客户您好,定损员开始为您服务,下面开始自助查勘拍照,请拍摄车头前45度角照片,通过对话发送拍摄照片,该步骤只保存1张图片。阅读全文可以查看拍摄指南。定损员审核通过后进入下一步。",
                    url: resourceurl() + "/detail/index.html#page_survey",
                    picurl: resourceurl() + "/resources/images/message/step1.png"
                }]
        }
    },
    surveyStepSecond: {
        msgtype: 'news',
        news: {
            articles: [{
                    title: "请拍摄车尾后45度角照片",
                    description: "尊敬的客户您好,请拍摄车尾后45度角照片,通过对话发送拍摄照片,该步骤只保存1张图片。阅读全文可以查看拍摄指南。定损员审核通过后进入下一步。",
                    url: resourceurl() + "/detail/index.html#page_survey",
                    picurl: resourceurl() + "/resources/images/message/step2.png"
                }]
        }
    },
    surveyStepThird: {
        msgtype: 'news',
        news: {
            articles: [{
                    title: "请拍摄车架号照片",
                    description: "尊敬的客户您好,请拍摄车架号照片。要求将身份证号放置在车架号旁边进行拍摄,在通过对话发送拍摄照片,该步骤只保存1张图片。阅读全文可以查看拍摄指南。定损员审核通过后进入下一步。",
                    url: resourceurl() + "/detail/index.html#page_survey",
                    picurl: resourceurl() + "/resources/images/message/step3.png"
                }]
        }
    },
    surveyStepFourth: {
        msgtype: 'news',
        news: {
            articles: [{
                    title: "请拍摄车辆碰撞外界物体细节照",
                    description: "尊敬的客户您好,请拍摄车辆碰撞外界物体细节照,通过对话发送拍摄照片,该步骤只保存1张图片。阅读全文可以查看拍摄指南。定损员审核通过后进入下一步。",
                    url: resourceurl() + "/detail/index.html#page_survey",
                    picurl: resourceurl() + "/resources/images/message/step4.png"
                }]
        }
    },
    surveyStepFifth: {
        msgtype: 'news',
        news: {
            articles: [{
                    title: "请拍摄身份证正面照片",
                    description: "尊敬的客户您好,请拍摄身份证正面照片,通过对话发送拍摄照片,该步骤允许保存1张图片。阅读全文可以查看拍摄指南。定损员审核通过后进入下一步。",
                    url: resourceurl() + "/detail/index.html#page_survey",
                    picurl: resourceurl() + "/resources/images/message/step5.png"
                }]
        }
    },
    surveyStepSixth: {
        msgtype: 'news',
        news: {
            articles: [{
                    title: "请拍摄身份证背面照片",
                    description: "尊敬的客户您好,请拍摄身份证背面照片,通过对话发送拍摄照片,该步骤允许保存1张图片。阅读全文可以查看拍摄指南。定损员审核通过后进入下一步。",
                    url: resourceurl() + "/detail/index.html#page_survey",
                    picurl: resourceurl() + "/resources/images/message/step6.png"
                }]
        }
    },
    surveyStepSeventh: {
        msgtype: 'news',
        news: {
            articles: [{
                    title: "请拍摄银行卡正面照片",
                    description: "尊敬的客户您好,请拍摄银行卡正面照片,通过对话发送拍摄照片,该步骤允许保存1张图片。阅读全文可以查看拍摄指南。定损员审核通过后进入下一步。",
                    url: resourceurl() + "/detail/index.html#page_survey",
                    picurl: resourceurl() + "/resources/images/message/step7.png"
                }]
        }
    },
    surveyStepEightth: {
        msgtype: 'news',
        news: {
            articles: [{
                    title: "请拍摄银行卡背面照片",
                    description: "尊敬的客户您好,请拍摄银行卡背面照片,通过对话发送拍摄照片,该步骤允许保存1张图片。阅读全文可以查看拍摄指南。定损员审核通过后进入下一步。",
                    url: resourceurl() + "/detail/index.html#page_survey",
                    picurl: resourceurl() + "/resources/images/message/step8.png"
                }]
        }
    },
    surveyStepNineth: {
        msgtype: 'news',
        news: {
            articles: [{
                    title: "请拍摄更多图片",
                    description: "尊敬的客户您好,请拍摄更多图片,通过对话发送拍摄照片,更多图片中仅保存1张照片。阅读全文可以查看拍摄指南。定损员审核通过后回复定损案件完成信息。",
                    url: resourceurl() + "/detail/index.html#page_survey",
                    picurl: resourceurl() + "/resources/images/message/step9.png"
                }]
        }
    },
    surveyStepExtra: {
        msgtype: 'news',
        news: {
            articles: [{
                    title: "请拍摄行驶证(正页及附页)、驾驶证(正页及附页)和银行卡照片",
                    description: "尊敬的客户您好,请将行驶证(正页及附页)、驾驶证(正页及附页)和银行卡照片放在一起进行拍摄,该步骤允许保存1张图片。阅读全文可以查看拍摄指南。定损员审核通过后进入下一步。",
                    url: resourceurl() + "/detail/index.html#page_survey",
                    picurl: resourceurl() + "/resources/images/message/step10.png"
                }]
        }
    },
    AllFinishFlag: {
        msgtype: 'text',
        text: {
            content: "尊敬的客户您好！您已完成自助查勘引导拍照步骤。下面你还可以补充额外照片作为该案件说明。"
        }
    },
    getCarcaseMsg: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好!您的%s已受理。\n%s员%s将竭诚为您提供服务。'
        }
    },
    completeCarcaseMsg: {
        msgtype: 'text',
        text: {
            content: ''
        }
    },
    cancelCarcaseMsg: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好!您当前进行的案件由于长时间没有回应而被前台人员手动结束，请您拨打95500随时保持联系。'
        }
    },
    activateCarcaseMsg: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好!您之前上报的案件车牌号%s已被后台人员激活,%s将随时与您保持联系。'
        }
    },
    activateCarcaseFailMsg: {
        msgtype: 'text',
        text: {
            content: "尊敬的客户您好!后台人员想尝试激活您的历史案件，完成当前操作后才可激活历史案件信息。"
        }
    },
    deactivateCarcaseMsg: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好!您之前上报的案件车牌号%s已被后台人员取消激活,接下来您可以进行其它操作。'
        }
    },
    preAuditMsg: {
        msgtype: 'text',
        text: {
            content: "尊敬的客户您好!您本次损失的金额预计%s元。\n1.如果您有任何异议，请拨打我的电话%s;\n2.并非保单约定的免赔原因是%s;\n3.下面请做出选择：\n1.我对本次事故定损项目及金额已全部知晓并确认同意。\n2.我对本次事故定损存在异议。\n3.我自动放弃本次索赔，本次事故造成的损失由我个人处理无需太平洋保险公司承担，同意注销本次报案。\n下面回复1、2或3确认您的选择，谢谢！"
        }
    },
    agreeAuditMsg: {
        msgtype: 'text',
        text: {
            content: '客户已同意本次事故定损项目及金额。'
        }
    },
    disagreeAuditMsg: {
        msgtype: 'text',
        text: {
            content: '客户对本次事故定损存在异议，后台需安排人员与客户进行联系。'
        }
    },
    agreeDeleteAuditMsg: {
        msgtype: 'text',
        text: {
            content: '客户已同意放弃本次索赔并同意注销本次报案。'
        }
    },
    unKnownAuditMsg: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好！必须回复1、2或3来确认您对定损的意见。'
        }
    },
    auditResultMsg: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好！您已回复您对定损结果的意见,下面请耐心等待定损人员审核您的案件。'
        }
    },
    notLeaveModule: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好！请使用完当前功能后再使用其他功能。'
        }
    },
    exitModule: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好！您已退出报案或查勘功能,欢迎您使用其他功能。'
        }
    },
    garageTemplate: {
        msgtype: 'text',
        text: {
            content: '\n后台推荐您去%s进行修理。\n修理厂地址在%s。\n修理厂电话号码为:%s。'
        }
    },
    completeScheduler: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好！您已完成自助报案，您报案时个人信息如下:\n报案人:%s\n报案人联系电话:%s\n出险车牌:%s。\n系统已派查勘员%s去现场处理案件。\n查勘员电话号码是:%s。\n您的当前案件已受理完毕调度员将不再接收您的信息。'
        }
    },
    completeAudit: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好!您已完成自助查勘，您报案时个人信息如下:\n报案人:%s\n报案人联系电话:%s\n出险车牌:%s。\n您本次损失的金额预计%s元。并非保单约定的免赔原因是%s。\n您的当前案件已受理完毕定损员将不再接收您的信息。'
        }
    }
};

module.exports = message;
//# sourceMappingURL=message.js.map
