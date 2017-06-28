/**
* Created by zhou on 14-3-25.
* event.ts 微信事件类,微信公众平台事件封装函数，作为不同项目微信事件的配置文件
* 华创公司目前分为武汉人保与山东太保两个微信公众账号项目
* e_type 事件类型 p_type 项目类型
**/
var Event = function (p_type) {
    return {
        e_type: {
            click: 'CLICK',
            view: 'VIEW',
            location: 'LOCATION',
            custom: 'CUSTOM',
            subscribe: 'subscribe',
            unsubscribe: 'unsubscribe'
        },
        eventkey: {
            searchclaims: "VT_SEARCHCLAIMS",
            casereport: 'VT_CASEREPORT',
            survey: 'VT_SURVEY',
            introduceproduct: 'VT_INTRODUCEPRODUCT',
            insurancecontent: 'VT_INSURANCECONTENT',
            traffic: 'VT_TRAFFIC',
            insure: 'VT_INSURE',
            askandanswer: 'VT_ASKANDANSWER'
        },
        p_type: p_type,
        getEvent: function () {
            if (this.p_type === 'renbao') {
                return {
                    events: [
                        {
                            type: this.e_type.click,
                            name: '理赔查询',
                            key: "VT_SEARCHCLAIMS"
                        }, {
                            type: this.e_type.click,
                            name: '报案理赔',
                            key: 'VT_CASEREPORT'
                        }, {
                            type: this.e_type.click,
                            name: '上传照片',
                            key: 'VT_ADDPICTURE'
                        }, {
                            type: this.e_type.click,
                            name: '产品介绍',
                            key: 'VT_INTRODUCEPRODUCT'
                        }, {
                            type: this.e_type.click,
                            name: '保险知识',
                            key: 'VT_INSURANCECONTENT'
                        }, {
                            type: this.e_type.click,
                            name: '交通法规',
                            key: 'VT_TRAFFIC'
                        }, {
                            type: this.e_type.click,
                            name: '电话/网上投保',
                            key: 'VT_INSURE'
                        }, {
                            type: this.e_type.click,
                            name: '你问我答',
                            key: 'VT_ASKANDANSWER'
                        }, {
                            type: this.e_type.location,
                            name: '地理位置事件'
                        }]
                };
            } else if (this.p_type === "taibao") {
                return {};
            }
        }
    };
};

module.exports = Event;
//# sourceMappingURL=event.js.map
