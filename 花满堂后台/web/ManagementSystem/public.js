var PublicObject = {
    pageSize: 50,
    ajaxTimeout: 180000,

    selectTreeName: 0,//选中的树节点

    selectMenuClass: [],//选中的菜品
    selectMenu: [],//选中的菜单
    selectUser: [],//选中的用户
    selectTask: [],//选中的订单
    selectDish: [],//选中的菜谱
    orderList: {},//支付总单数据

    CurrentUser: [],//当前用户信息
    TreeMenuClass: [],//菜单管理底下的树节点信息

    imageurl: "",//主菜单图片路径

    TS_Task: [],//堂食 启动任务
    WM_Task: [],//外卖 启动任务
    ZS_Task: [],//杂食 启动任务
    DW_Task: [],//订位 启动任务
    DWTS_Task: [],//订位堂食 启动任务

    TS_Task_DJS: [],//堂食 启动任务 倒计时
    WM_Task_DJS: [],//外卖 启动任务 倒计时
    ZS_Task_DJS: [],//杂食 启动任务 倒计时
    DW_Task_DJS: [],//订位 启动任务 倒计时
    DWTS_Task_DJS: [],//订位堂食 启动任务 倒计时

    PlanCount: 0,//外卖任务数
    selectPlan: {},
    TS_CurrentTask: [],//堂食 当前任务
    WM_CurrentTask: [],//外卖 当前任务
    ZS_CurrentTask: [],//杂食 当前任务
    DW_CurrentTask: [],//订位 当前任务
    DWTS_CurrentTask: [],//订位 当前任务

    TreeCount: 0,//登录 权限 树节点
    pwd: "hmt2016",
    TaskTable: "",//输入餐位 是从哪里来的  TaskDetailWin：代表从TaskDetailWin窗口来的 GridPanel：代表从GridPanel上来的

    selectUserClass: 0,//左侧树中选中的用户类型
    selectParentID: 0  //左侧树中选中的市级机构

    , DishData: []//减菜菜单
};

var isIE = !!window.ActiveXObject;
var isIE6 = isIE && !window.XMLHttpRequest;
var isIE8 = isIE && !!document.documentMode;
var isIE7 = isIE && !isIE6 && !isIE8;

var eventUtil = {
    addEventHandler: function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    removeEventHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    getTarget: function (event) {//获取事件源
        if (event.target) {
            return event.target;
        } else {
            return event.srcElement;
        }
    },
    stopPropagation: function (event) {//阻止事件冒泡
        if (event.stopPropagetion) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    stopDefault: function (event) {//阻止事件默认行为
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
};

function getdatingcount() {
    debugger;
    var fourtable = document.getElementById('FourTableCount').value;
    var sixtable = document.getElementById('SixTableCount').value;
    var baojian = document.getElementById('BoxTableCount').value;
    var regexp = /^[0-9]+$/;
    //if(!regexp.test(fourtable) || !regexp.test(sixtable) || !regexp.test(baojian)){
    //    Ext.MessageBox.alert('提示','亲，请输入正确的数字！');
    //    return;
    //}else{
    var datingtotal = fourtable * 4 + sixtable * 6;
    var baojiantotal = baojian * 10;
    document.getElementById('datingnum').innerHTML = datingtotal;
    document.getElementById('baojiannum').innerHTML = baojiantotal;
    document.getElementById('totalcount').innerHTML = (datingtotal + baojiantotal) * 1;
    //}
}

function formatDate(date, fmt) {
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function currentDate() {
    var date = new Date();//当前时间
    var startdate = new Date(date.getFullYear(), date.getMonth() - 2, date.getDate());//当天的00:00:00
    var beforedate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 3);//前天
    var enddate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);//当天的23:59:59
    return [startdate, enddate, beforedate];
}

function CurrentMonth() {
    var date = new Date();
    var date1 = new Date(date.getFullYear(), date.getMonth(), 1);//当月的第一天 00:00:00
    var _date = new Date(date.getFullYear(), date.getMonth() + 1, 1).getTime();
    var date2 = new Date(_date - 1000);//当月的最后一天 23:59:59
    return [date1, date2];
}

function createModifyPassWordFormPanel() {
    var records = PublicObject.CurrentUser;
    var realname = records.realname,
        username = records.username;
    var formPanel = new Ext.form.FormPanel({
        baseCls: 'x-plain',
        defaults: {width: 300, bodyPadding: 5}, defaultType: 'textfield',
        items: [
            {
                xtype: 'hiddenfield',
                name: 'username', itemId: 'username', value: username
            },
            {
                fieldLabel: '用户名',
                name: 'user', id: 'modifyPwd_user', value: realname, disabled: true
            },
            {
                fieldLabel: '<span style="color:red">*</span>原始密码',
                id: 'oldpassword',
                name: 'oldpassword',
                allowBlank: false,
                blankText: '必须填写原始密码',
                inputType: 'password'
            },
            {
                fieldLabel: '<span style="color:red">*</span>修改密码',
                id: 'newpassword',
                name: 'newpassword',
                allowBlank: false,
                blankText: '必须填写修改密码',
                inputType: 'password'
            },
            {
                fieldLabel: '<span style="color:red">*</span>确认密码',
                id: 'confirmPwd',
                name: 'confirmPwd',
                allowBlank: false,
                blankText: '必须填写确认密码',
                inputType: 'password'
            }
        ]
    });
    var win = new Ext.Window({
        id: '_modifyPwdWin',
        title: '修改密码', width: 350, height: 180, layout: 'fit', modal: true, plain: true,
        bodyStyle: 'padding:5px;', buttonAlign: 'center', items: [formPanel],
        buttons: [
            {
                text: '修改',
                handler: function () {
                    modifyPassWord(formPanel, win);
                }
            },
            {
                text: '取消',
                handler: function () {
                    win.close();
                }
            }
        ]
    });
    win.show();
}

function modifyPassWord(form, win) {
    var oldPwd = form.down("#oldpassword").getValue(),
        newPwd = form.down("#newpassword").getValue(),
        confirmPwd = form.down('#confirmPwd').getValue(),
        oldPassword = hex_md5(oldPwd),
        newPassword = hex_md5(newPwd);
    if (oldPwd == "") {
        Ext.MessageBox.alert('提示', '原始密码不能为空');
        form.down("#oldpassword").setValue("");
    } else {
        if (newPwd == "" || confirmPwd == "") {
            Ext.MessageBox.alert('提示', '请确认密码！');
            form.down("#newpassword").setValue("");
            form.down('#confirmPwd').setValue("");
        } else {
            if (newPwd === confirmPwd) {
                debugger;
                Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
                Ext.Ajax.request({
                    url: '../api/ManagementSystem/UpdatePassWord', method: 'GET',
                    params: {
                        username: form.down("#username").getValue(),
                        oldpassword: oldPassword,
                        newpassword: newPassword,
                        RandomTag: Math.random()
                    },
                    success: function (response) {
                        debugger;
                        Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
                        var result = Ext.JSON.decode(response.responseText);
                        if (result.err) {
                            Ext.MessageBox.alert("提示", result.err.message);
                        } else {
                            Ext.MessageBox.alert("提示", "修改密码成功，请重新登录");
                            win.close();
                            window.location.href = '/';
                        }
                    },
                    failure: function (response, options) {
                        //debugger;
                        Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
                        Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                        window.location.href = "/";
                    }
                });
            }
            else {
                Ext.MessageBox.alert('提示', '修改密码与确认密码不一致')
            }
        }
    }

}

function userLogout() {
    Ext.getCmp('mainViewPort').getEl().mask("正在退出，请稍候");//遮罩
    Ext.Ajax.request({
        url: '../api/ManagementSystem/UserCheckOut',
        method: 'GET',
        success: function (response) {
            debugger;
            Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
            var rspText = JSON.parse(response.responseText);
            if (rspText.success) {
                Ext.getDom('divUserInfo').innerHTML = '';
                window.location.href = '/';
            } else {
                Ext.Msg.alert('提示', ('退出失败' + rspText.err.message));
            }
        },
        failure: function (response, options) {
            //debugger;
            Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            window.location.href = "/";
        }
    })
}

//显示一道菜的所有评分窗口
function ScoreWin() {
    debugger;
    var win = Ext.create('ManagementSystem.view.MenuCodeWin', {
        title: "菜品评价详情"
    });
    win.show();
}

//上传图片
function UploadImageMenu(d) {
    var win = Ext.create('ManagementSystem.view.uploadFile.uploadWindow', {
        listeners: {
            show: function () {
                Ext.getCmp('uploadWindow').setTitle('上传第' + d + '张图片');
                Ext.getCmp('mainViewPort').getEl().mask();//遮罩
            },
            close: function () {
                Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
            }
        }
    });
    win.show();
}

//堂食 定时器
PublicObject.TS_Task = { //Ext的定时器，每隔30秒刷新store。
    run: function () {
        Ext.getStore("TaskStore").load();
        ManagementSystem.app.getTaskManagementController().TaskListCount();
    },
    interval: 30 * 1000
};

var curCount = 30;
PublicObject.TS_Task_DJS = { //Ext的定时器，每隔30秒刷新store。
    run: function () {
        if (curCount == 1) {
            document.getElementById("DaoJiShi").innerHTML = curCount;
            curCount = 30;
        } else {
            document.getElementById("DaoJiShi").innerHTML = curCount;
            curCount--;
        }
    },
    interval: 1000
};

//外卖 定时器
PublicObject.WM_Task = { //Ext的定时器，每隔30秒刷新store。
    run: function () {
        Ext.getStore("TaskStore").load();
        ManagementSystem.app.getTaskManagementController().TaskListCount();
    },
    interval: 30 * 1000
};

var curCount02 = 30;
PublicObject.WM_Task_DJS = { //Ext的定时器，每隔30秒刷新store。
    run: function () {
        if (curCount02 == 1) {
            curCount02 = 30;
            document.getElementById("DaoJiShi02").innerHTML = curCount02;
        } else {
            document.getElementById("DaoJiShi02").innerHTML = curCount02;
            curCount02--;
        }
    },
    interval: 1000
};

//杂食 定时器
PublicObject.ZS_Task = { //Ext的定时器，每隔30秒刷新store。
    run: function () {
        Ext.getStore("TaskStore").load();
        ManagementSystem.app.getTaskManagementController().TaskListCount();
    },
    interval: 30 * 1000
};

var curCount03 = 30;
PublicObject.ZS_Task_DJS = { //Ext的定时器，每隔30秒刷新store。
    run: function () {
        if (curCount03 == 1) {
            document.getElementById("DaoJiShi03").innerHTML = curCount03;
            curCount03 = 30;
        } else {
            document.getElementById("DaoJiShi03").innerHTML = curCount03;
            curCount03--;
        }
    },
    interval: 1000
};

//订位 定时器
PublicObject.DW_Task = { //Ext的定时器，每隔30秒刷新store。
    run: function () {
        Ext.getStore("TaskStore").load();
        ManagementSystem.app.getTaskManagementController().TaskListCount();
    },
    interval: 30 * 1000
};

var curCount04 = 30;
PublicObject.DW_Task_DJS = { //Ext的定时器，每隔30秒刷新store。
    run: function () {
        //Ext.getStore("TaskStore").load();
        if (curCount04 == 1) {
            document.getElementById("DaoJiShi04").innerHTML = curCount04;
            curCount04 = 30;
        } else {
            document.getElementById("DaoJiShi04").innerHTML = curCount04;
            curCount04--;
        }
    },
    interval: 1000
};

//订位堂食 定时器
PublicObject.DWTS_Task = { //Ext的定时器，每隔30秒刷新store。
    run: function () {
        Ext.getStore("TaskStore").load();
        ManagementSystem.app.getTaskManagementController().TaskListCount();
    },
    interval: 30 * 1000
};

var curCount05 = 30;
PublicObject.DWTS_Task_DJS = { //Ext的定时器，每隔30秒刷新store。
    run: function () {
        //Ext.getStore("TaskStore").load();
        if (curCount05 == 1) {
            document.getElementById("DaoJiShi05").innerHTML = curCount05;
            curCount05 = 30;
        } else {
            document.getElementById("DaoJiShi05").innerHTML = curCount05;
            curCount05--;
        }
    },
    interval: 1000
};

function removeDish(that) {
    //移除购物车
    var divLi = that.parentNode;
    divLi.parentNode.parentNode.removeChild(divLi.parentNode);
}

var taskInit = {
    run: function () {
        ManagementSystem.app.getWestPanelController().TaskListCount();
    },
    interval: 30000
};

var diliveryPlan = {
    run: function () {
        ManagementSystem.app.getWestPanelController().DiliveryPlan(PublicObject.selectPlan);
    },
    interval: 30000
};

function getClassName(classStr, tagName) {
    if (document.getElementsByClassName) {
        return document.getElementsByClassName(classStr);
    } else {
        var nodes = document.getElementsByTagName(tagName);
        var arr = new Array();
        for (var i = 0; i < nodes.length; i++) {
            if (hasClass(nodes[i], classStr)) {
                arr.push(nodes[i]);
            }
        }
        return arr;
    }
}
function hasClass(tagStr, classStr) {
    var list = tagStr.className.split(/\s+/);//可能包含多个class
    for (var i = 0; i < list.length; i++) {
        if (list[i] == classStr) {
            return true;
        }
    }
    return false;
}


var Sys = {};
var ua = navigator.userAgent.toLowerCase();
if (window.ActiveXObject)
    Sys.ie = ua.match(/msie ([\d.]+)/)[1];
else if (document.getBoxObjectFor)
    Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1];
else if (window.MessageEvent && !document.getBoxObjectFor)
    Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1];
else if (window.opera)
    Sys.opera = ua.match(/opera.([\d.]+)/)[1];
else if (window.openDatabase)
    Sys.safari = ua.match(/version\/([\d.]+)/)[1];


String.prototype.trim = function () {
    //return this.replace(/(^\s*)|(\s*$)/g, '');
    var str = this.replace(/^\s+/, ''),//使用正则处理头部空格，非正则过滤尾部字符
        end = str.length - 1,
        ws = /\s/;
    while (ws.test(str.charAt(end))) {
        end--;
    }
    return str.slice(0, end + 1);
};

function updateEvent() {
    var picUL = document.getElementById('picUL');
    eventUtil.addEventHandler(picUL, "click", function (e) {
        var target = eventUtil.getTarget(e);
        if (target.tagName.toLowerCase() == "img") {//判断事件源
            debugger;
            var addImgArr = picUL.getElementsByTagName("img");
            for (var j = 0, len = addImgArr.length; j < len; j++) {
                addImgArr[j].onclick = (function (j) {
                    return function () {
                        var win = Ext.create('ManagementSystem.view.uploadFile.uploadWindow', {
                            listeners: {
                                show: function () {
                                    Ext.getCmp('uploadWindow').setTitle('上传第' + (j + 1) + '张图片');
                                    Ext.getCmp('mainViewPort').getEl().mask();//遮罩
                                },
                                close: function () {
                                    Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
                                }
                            }
                        });
                        win.show();
                    };
                })(j);
            }
        }
    })
}

//排序 向上 向下
function MenuClassSort(record, sorttype) {
    //debugger;
    Ext.getCmp('mainViewPort').getEl().mask("正在操作，请稍候");//遮罩
    Ext.Ajax.request({
        url: '../api/ManagementSystem/MenuClassSort',//排序
        timeout: PublicObject.ajaxTimeout,
        params: {
            id: record.id,
            menuclasstype: record.menuclasstype,
            sorttype: sorttype,//1：向上 2：向下
            menuclasssort: record.menuclasssort,
            RandomTag: Math.random()
        },
        method: 'Post',
        success: function (response, options) {
            //debugger;
            Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
            var result = Ext.JSON.decode(response.responseText);
            if (result.err) {
                Ext.MessageBox.alert('提示', result.err.message);
            } else {
                //debugger;
                ManagementSystem.app.getMenuClassManagementController().GetMenuClass();

                Ext.MessageBox.alert('提示', '操作成功,请刷新页面！');
                setTimeout(function () {
                    location.reload(true);
                }, 2000);
            }
        },
        failure: function (response, options) {
            Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
        }
    });
}

function DeleteDish(dishid, menucount) {
    //debugger;
    var menucount2_dishid = "menucount2_" + dishid;
    var _value = document.getElementById(menucount2_dishid).value;
    if (_value != "" && _value != null && _value != undefined) {
        var reg = /^\+?[0-9][0-9]*$/;
        if (!reg.test(_value)) {
            document.getElementById(menucount2_dishid).value = "";
            DishData(dishid, "");
            Ext.MessageBox.alert('提示', "请输入正确的数字");
            return;
        }
        if (_value * 1 == 0) {
            document.getElementById(menucount2_dishid).value = "";
            DishData(dishid, "");
            Ext.MessageBox.alert('提示', "减菜数量不能为0");
            return;
        }
        if (menucount * 1 < _value * 1) {
            document.getElementById(menucount2_dishid).value = "";
            DishData(dishid, "");
            Ext.MessageBox.alert('提示', "减菜数量不能大于点菜数量");
            return;
        }
        DishData(dishid, _value);
    } else {
        document.getElementById(menucount2_dishid).value = "";
        DishData(dishid, "");
    }
}

function DishData(dishid, _value) {
    var DishData = PublicObject.DishData;
    for (i = 0; i < DishData.length; i++) {
        var iData = DishData[i];
        if (iData.dishid == dishid) {
            iData.menucount2 = _value;
            break;
        }
    }
}

