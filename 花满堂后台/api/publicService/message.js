/**
* Created by fyb on 14/10/28.
*/
var settings = require('../../settings');

var wechat = settings.wechat;

function resourceurl() {
    return settings.publicAddr;
}

var message = {
    commitOrderSuccess:{
        msgtype:'text',
        text:{
            content:"尊敬的客户：您好！您的预约已成功。感谢您对信达鸿车行的信任。我们的工作人员会第一时间联系您确认订单信息。请您保持手机畅通。"
        }
    },
    getcarPass:{
        msgtype:'text',
        text:{
            content:"尊敬的客户：您好！您的车辆信息已注册成功，感谢您的支持！"
        }
    },
    baodanpigai1Message:{
        msgtype: 'text',
        text: {
            content: "尊敬的客户：您好！您的申请已提交，请耐心等待后台人员受理。"
        }
    },
    chengbao1Message:{
        msgtype: 'text',
        text: {
            content: "尊敬的客户：您好！您的咨询已提交，请耐心等候工作人员处理。"
        }
    },
    lipei1Message:{
        msgtype: 'text',
        text: {
            content: "尊敬的客户：您好！您的理赔咨询已提交，请耐心等候工作人员处理。"
        }
    },
    zhuanshu1Message:{
        msgtype: 'text',
        text: {
            content: "尊敬的客户：您好！您的专属服务咨询已提交，请耐心等候工作人员处理。"
        }
    },
    other1Message:{
        msgtype: 'text',
        text: {
            content: "尊敬的客户：您好！您的其他咨询已提交，请耐心等候工作人员处理。"
        }
    },
    pianpei1Message:{
        msgtype: 'text',
        text: {
            content: "尊敬的客户：您好！您的举报信息已提交，请耐心等候工作人员处理。"
        }
    },
    chean1Message:{
        msgtype: 'text',
        text: {
            content: "尊敬的客户：您好！您的预约已经提交，请耐心等待工作人员处理。"
        }
    },
    renshang1Message:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！您的人伤调解咨询已提交,请耐心等候工作人员处理。'
        }
    },
    shangchuan1Message:{
        msgtype: 'text',
        text: {
            content: "尊敬的客户：您好！您的上传资料申请已提交，请耐心等待工作人员受理。"
        }
    },
    chakan1Message:{
        msgtype: 'text',
        text: {
            content: "尊敬的客户：您好！您的查勘申请已提交，请耐心等待工作人员受理。"
        }
    },
    baoan1Message:{
        msgtype: 'text',
        text: {
            content: "尊敬的客户，您好! 您的报案申请已提交，请耐心等候工作人员受理。"
        }
    },
    idcardBindFailMessage:{
        msgtype: 'text',
        text: {
            content: "恭喜您已经绑定成功，您的信息如下：\n车牌号：%s\n证件号：%s\n姓名：%s\n由于您绑定成功，送您20积分，您可在“人保生活--积分消费”享受积分消费。"
        }
    },
    idcardBindSuccessMessage: {
        msgtype: 'text',
        text: {
            content: "恭喜您已经绑定成功，您的信息如下：\n车牌号：%s\n证件号：%s\n姓名：%s\n由于您绑定成功，送您%s积分，您可在“人保生活--积分消费”享受积分消费。"
        }
    },
    RGtaskMessage:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！您的申请已提交，请耐心等待后台人员受理。'
        }
    },
    getTaskMessage0:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！您的人伤调解咨询已处理，请耐心等候工作人员与您联系。 '
        }
    },
    getEndTaskMessage0:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！您的人伤调解咨询已处理，请耐心等候工作人员与您联系。 '
        }
    },
    getEndTaskMessage1:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！您的撤案申请已处理，案件已注销！ '
        }
    },
    getEndTaskMessage2:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！您的举报信息已处理，请耐心等候工作人员与您联系。 '
        }
    },
    getEndTaskMessage3:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！您的补办资料将会在3个工作日内邮寄到您指定地址，请注意查收！ '
        }
    },
    getEndTaskMessage21:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！您的批单将会在3个工作日内邮寄到您指定地址，请注意查收！ '
        }
    },
    getTaskMessage6:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！您的案件已被工作人员受理, 您现在可以与工作人员进行交流。'
        }
    },
    getTaskMessage3:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！您的申请已被工作人员受理。'
        }
    },
    getEndTaskMessage6:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！您本次人工咨询已结束。'
        }
    },
    getTaskMessage12:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！让您久等了，您的报案已被工作人员受理，请您注意安全，保持电话畅通。'
        }
    },
    getEndTaskMessage12:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！让您久等了，您的报案已受理，请关注您的手机短信，并耐心等待我司理赔人员与您联系。'
        }
    },
    getTaskMessage14_1:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！让您久等了，您的查勘申请已被工作人员受理，请按照以下模板拍摄现场照片并上传。\n单方事故拍摄模板：\n1、第一张照片在车前5米（45度角）拍摄事故现场全景照片；\n2、第二张照片在车尾5米（45度角）拍摄事故现场全景照片；\n3、第三张照片在本车前风档玻璃左下角拍摄车架号；\n4、第四张照片距离碰撞部位两米拍摄碰撞部位损失照片 ；\n5、距离一米拍摄被撞物体详细损失照片（不少于两张）；\n6、拍摄行车证正副本、驾驶证正副本照片共四张；\n7、拍摄车主（被保险人）储蓄卡（不限银行）正面照片；\n8、如有事故证明请拍摄事故证明照片。 '
        }
    },
    getTaskMessage14_2:{
        msgtype:'text',
        text:{
            content:'尊敬的客户：您好！让您久等了，您的查勘申请已被工作人员受理，请按照以下模板拍摄现场照片并上传。\n双方事故拍摄模板：\n1、第一张照片在车前5米（45度角）拍摄事故现场全景照片；\n2、第二张照片在车尾5米（45度角）拍摄事故现场全景照片；\n3、第三张照片在本车前风档玻璃左下角拍摄车架号；\n4、距离两米拍摄两车碰撞部位损失照片（不少于两张，包含双方车辆车牌号） ；\n5、距离一米拍摄被撞物体详细损失照片（不少于两张）；\n6、拍摄行车证正副本、驾驶证正副本照片共四张；\n7、拍摄车主（被保险人）储蓄卡（不限银行）正面照片；\n8、事故证明请拍摄事故证明照片'
        }
    },
    getEndTaskMessage14:{
        msgtype:'text',
        text:{
            content:'尊敬的客户：您好！您本次的查勘任务已处理完毕，谢谢配合。'
        }
    },
    getTaskMessage15:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！让您久等了，您的上传资料申请已被工作人员受理，请按指引补充上传相关资料，谢谢配合。'
        }
    },
    getTaskMessage17:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！请问有什么可以帮助您？'
        }
    },
    getTaskMessage18:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！让您久等了，您的理赔咨询申请已被工作人员受理，请按指引补充上传相关资料，谢谢配合。'
        }
    },
    getTaskMessage19:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！让您久等了，您的专属服务咨询申请已被工作人员受理，请按指引补充上传相关资料，谢谢配合。'
        }
    },
    getTaskMessage20:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！让您久等了，您的其他咨询申请已被工作人员受理，请按指引补充上传相关资料，谢谢配合。'
        }
    },
    getEndTaskMessage15:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！您补充上传的资料已全部收到，谢谢配合。 '
        }
    },
    getEndTaskMessage17:{
        msgtype: 'text',
        text: {
            content: '感谢您的关注，祝您生活愉快！ '
        }
    },
    getTaskMessage:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！您的申请已被工作人员受理。'
        }
    },
    getEndTaskMessage:{
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！您的申请已处理完毕。'
        }
    },
    PinPointUploadImage: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！违章销分需要上传车主本人的驾驶证照片，请上传您本人的驾驶证照片，用于销分。请参照<a href=\"%s\">拍摄说明</a>对驾驶证进行拍照。'
        }
    },
    AfterPinPiont_image: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户：您好！您的驾驶证照片已经上传成功，请耐心等待后台人员审核您的驾驶证照片。'
        }
    },
    FailPinPoint_image: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好，您的驾驶证照片上传失败，请重新上传驾驶证照片。'
        }
    },
    ImageSystemError: {
        msgtype: 'text',
        text: {
            content: "影像系统异常，影像上传失败，请稍后重试。"
        }
    },
    auditingMessage: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好！您的驾驶证照片正在进行审核，请耐心等待。'
        }
    },
    orderMessage: {
        msgtype: 'text',
        text: {
            content: '尊敬的客户您好!您的销分记录已由操作员%s受理，请耐心等待后台人员处理您的销分记录。'
        }
    },
    refundSuccessMessage: {
        msgtype: 'text',
        text: {
            content: "尊敬的客户您好!您的违章销分任务受理失败。\n销分订单号为：%s\n失败原因是:%s"
        }
    },
    pinPointSuccessMessage: {
        msgtype: 'text',
        text: {
            content: "尊敬的客户您好!您的违章销分任务受理成功。销分记录为：\n订单号：%s\n车牌号：%s\n累计销分案件数：%s笔\n累计销分：%s分\n累计缴纳金额：%s元\n您可通过“我-违章查询”菜单查询您的详细违章记录。"
        }
    },
    pinPointFailMessage: {
        msgtype: 'text',
        text: {
            content: ""
        }
    },
    yuyueSuccessTemplate: {
        "template_id": 'mZ8ZAVgI_Jefc8uRi3M5tjM7QKkEHWsQftD1qyZClfM',
        "url": "http://weixin.qq.com/download",
        "topcolor": "#FF0000",
        "data": {
            "first": {
                "value": "",
                "color": "#000000"
            },
            "keyword1": {
                "value": "",
                "color": "#173177"
            },
            "keyword2": {
                "value": "",
                "color": "#173177"
            },
            "keyword3": {
                "value": "",
                "color": "#173177"
            },
            "keyword4": {
                "value": "",
                "color": "#173177"
            },
            "keyword5": {
                "value": "",
                "color": "#173177"
            },
            "remark": {
                "value": "您也可以通过信达鸿微信公众号查询订单信息。如有疑问，请拨打24小时服务热线：400-027-8499。 祝您生活愉快！",
                "color": "#000000"
            }
        }
    },
    pinPointFailTemplate: {
        "template_id": '09YTeekd2OSLmv16b6ZO86WX8QYQGmTwELW-JoAc21A',
        "url": "http://weixin.qq.com/download",
        "topcolor": "#FF0000",
        "data": {
            "first": {
                "value": "尊敬的客户您好!您的违章销分任务受理失败。记录为：",
                "color": "#000000"
            },
            "keyword1": {
                "value": "",
                "color": "#173177"
            },
            "keyword2": {
                "value": "",
                "color": "#173177"
            },
            "remark": {
                "value": "系统将于1-3个工作日内退还您的缴款，现在您可通过“我-违章销分”菜单重新进行违章销分。",
                "color": "#000000"
            }
        }
    },
    pinPointSuccessTemplate: {
        "template_id": "ldKrvuGBkzGES1Kf64F8jRbNIgT_ba-Y5eZvIcMUXc8",
        "url": "http://weixin.qq.com/download",
        "topcolor": "#FF0000",
        "data": {
            "first": {
                "value": "尊敬的客户您好!您的违章销分任务受理成功。销分记录为：",
                "color": "#000000"
            },
            "keyword1": {
                "value": "",
                "color": "#173177"
            },
            "keyword2": {
                "value": "",
                "color": "#173177"
            },
            "keyword3": {
                "value": "",
                "color": "#173177"
            },
            "keyword4": {
                "value": "",
                "color": "#173177"
            },
            "keyword5": {
                "value": "",
                "color": "#173177"
            },
            "remark": {
                "value": "您可通过“我-违章查询”菜单查询您的详细违章记录。",
                "color": "#000000"
            }
        }
    },
    auditSuccessTemplate: {
        "template_id": "A9MZ-hclbdfGr0qg--PS_JHhQUJ_o5yiPdrkdVoi9CM",
        "url": "http://weixin.qq.com/download",
        "topcolor": "#FF0000",
        "data": {
            "first": {
                "value": "尊敬的用户您好，您的驾驶证审核记录如下：",
                "color": "#000000"
            },
            "keyword1": {
                "value": "",
                "color": "#173177"
            },
            "keyword2": {
                "value": "",
                "color": "#173177"
            },
            "keyword3": {
                "value": "",
                "color": "#173177"
            },
            "remark": {
                "value": "您可通过“我-违章销分”菜单开始违章销分。",
                "color": "#000000"
            }
        }
    },
    auditFailTemplate: {
        "template_id": "cZalPjp5Gavcn8hZ5dqTZen8k152uR6CE4fQoORn0xM",
        "url": "http://weixin.qq.com/download",
        "topcolor": "#FF0000",
        "data": {
            "first": {
                "value": "尊敬的用户您好，您的驾驶证审核记录如下：",
                "color": "#000000"
            },
            "keyword1": {
                "value": "",
                "color": "#173177"
            },
            "keyword2": {
                "value": "",
                "color": "#173177"
            },
            "keyword3": {
                "value": "",
                "color": "#173177"
            },
            "keyword4": {
                "value": "",
                "color": "#173177"
            },
            "remark": {
                "value": "您可通过“我-个人资料”菜单重新添加驾驶证信息。",
                "color": "#000000"
            }
        }
    },
    paymentSuccessTemplate: {
        "template_id": "vdu_z_zD0fplr-iOR3oA2D0Vfhncn7ROMo3HbgqPPRY",
        "url": "http://weixin.qq.com/download",
        "topcolor": "#FF0000",
        "data": {
            "productType": {
                "value": "业务名",
                "color": "#000000"
            },
            "name": {
                "value": "违章销分业务",
                "color": "#173177"
            },
            "number": {
                "value": "1份",
                "color": "#173177"
            },
            "expDate": {
                "value": "永久有效",
                "color": "#173177"
            },
            "remark": {
                "value": "备注:您已成功完成支付,请耐心等待后台人员核实并处理您的违章销分记录。",
                "color": "#173177"
            }
        }
    }
};

module.exports = message;
//# sourceMappingURL=message.js.map
