
var settings = require('../../settings');

var wechat = settings.wechat;

function resourceurl() {
    return settings.publicAddr;
}

var message = {
    Advertisement: {
        msgtype: 'news',
        news: {
            articles: [
                {
                    title: "【穹顶之下、同呼吸、共植树】武汉人保植树节活动",
                    description:"“穹顶之下、同呼吸、共植树”一年一度的植树节又和我们相遇，再次焕发了我们心中的朝气。要清新的空气，要美丽的环境就要植树",
                    picurl: resourceurl() + "/resources/images/message/maintain.jpg",
                    url: "http://mp.weixin.qq.com/s?__biz=MzA5MTM1NjE3NA==&mid=218871817&idx=1&sn=3bc91cf8f69ac0f731be83ef6d5ff618#rd"
                }
//                ,
//                {
//                    title: "违章查询/违章销分 太平洋保险伴您一路畅行",
//                    //                description:"一大拨福利正在向你招手哟~~即日起，关注太平洋财产保险山东分公司服务号，即可快速查询您的违规驾驶记录，并通过微信支付手段轻松销分！就是这么方便，快来给您的爱车清清记录吧~~",
//                    picurl: resourceurl() + "/resources/images/message/lawQuery.png",
//                    url: "http://mp.weixin.qq.com/s?__biz=MzA5MDA0NDMxNw==&mid=202348452&idx=2&sn=8141996534451323ab1ab4c4df94e97d#rd"
//                }
            ]
        }
    },
    Advertisement1: {
        msgtype: 'news',
        news: {
            articles: [
                {
                    title: "武汉人保之友俱乐部合作商家招募开始了！",
                    description:"武汉人保之友俱乐部，是集汽车养护、代办车辆年审、酒后代驾、商家消费、理赔增值服务、主题活动等多种服务为一体的车友服务平台。为更好地聚集人气、为俱乐部会员提供更多更好的服务，现优先在俱乐部会员中征集合作商家。",
                    picurl: resourceurl() + "/resources/images/message/zhaomu.jpg",
                    url: "http://mp.weixin.qq.com/s?__biz=MzA5MTM1NjE3NA==&mid=218871752&idx=1&sn=c54be08f0dc356c70d9393454a83804c#rd"
                }
//                ,
//                {
//                    title: "违章查询/违章销分 太平洋保险伴您一路畅行",
//                    //                description:"一大拨福利正在向你招手哟~~即日起，关注太平洋财产保险山东分公司服务号，即可快速查询您的违规驾驶记录，并通过微信支付手段轻松销分！就是这么方便，快来给您的爱车清清记录吧~~",
//                    picurl: resourceurl() + "/resources/images/message/lawQuery.png",
//                    url: "http://mp.weixin.qq.com/s?__biz=MzA5MDA0NDMxNw==&mid=202348452&idx=2&sn=8141996534451323ab1ab4c4df94e97d#rd"
//                }
            ]
        }
    },
    Advertisement2: {
        msgtype: 'news',
        news: {
            articles: [
                {
                    title: "优惠活动！",
                    picurl: resourceurl() + "/resources/images/message/youhui.jpg",
                    url: "http://mp.weixin.qq.com/s?__biz=MzA4MTI5MDMwNA==&mid=205368818&idx=1&sn=ff0799fba5839c9e1a5bd7066f9eb8b0#rd"
                },
                {
                    title: "酒后代驾",
                    picurl: resourceurl() + "/resources/images/message/daijia.jpg",
                    url: "http://mp.weixin.qq.com/s?__biz=MzA5MTM1NjE3NA==&mid=218872203&idx=2&sn=ce7b288feae984d3b165db35d0e3126c#rd"
                },
                {
                    title: "汽车保养",
                    picurl: resourceurl() + "/resources/images/message/baoyang.png",
                    url: "http://mp.weixin.qq.com/s?__biz=MzA5MTM1NjE3NA==&mid=218872203&idx=3&sn=09603ff78e60c44434046537f278cc3e#rd"
                },
                {
                    title: "车辆年审",
                    picurl: resourceurl() + "/resources/images/message/nianshen.png",
                    url: "http://mp.weixin.qq.com/s?__biz=MzA5MTM1NjE3NA==&mid=218872203&idx=4&sn=21bfb0a608dbde488bbe9cfdabf301a7#rd"
                },
                {
                    title: "汽车美容",
                    picurl: resourceurl() + "/resources/images/message/meirong.png",
                    url: "http://mp.weixin.qq.com/s?__biz=MzA5MTM1NjE3NA==&mid=218872203&idx=5&sn=e894dc1dbd038dcfa544244c45cfc807#rdd"
                },
                {
                    title: "道路救援",
                    picurl: resourceurl() + "/resources/images/message/jiuyuan.jpg",
                    url: "http://mp.weixin.qq.com/s?__biz=MzA5MTM1NjE3NA==&mid=218872203&idx=6&sn=a4756c90ac1c0a429eb5b7b9f57cb496#rd"
                }


            ]
        }
    }
};

module.exports = message;
//# sourceMappingURL=message.js.map
