/**
 * Created by Administrator on 2016/9/14.
 * 加菜窗口
 */
Ext.define('ManagementSystem.controller.DeleteDishWinCtrl', {
    extend: 'Ext.app.Controller',
    views: [
        'deleteDishWin'
//        , 'deleteDishManualWin'
    ],
    stores: ["AllmenuStore2"],
    init: function () {
        this.control({
            "deleteDishWin #btnEnter": {
                "click": this.deleteDishEnter
            },
            "deleteDishWin #btnCancel": {
                "click": function () {
                    Ext.getCmp("deleteDishWin").destroy();
                }
            },
            "deleteDishWin #btnSearch": {
                "click": this.deleteDishSearch
            },
            "deleteDishWin #btnReset": {
                "click": this.deleteDishReset
            }
        });
    },
    deleteDishEnter: function () {
        //debugger;
        var DishData = PublicObject.DishData;
        var DeleteData = [];
        var dishnameStr = "";
        for (i = 0; i < DishData.length; i++) {
            var item = DishData[i];
            var menucount2 = item.menucount2;
            if (menucount2 != "" && menucount2 != null && menucount2 != undefined) {
                if (menucount2 * 1 > 0) {
                    DeleteData[DeleteData.length] = item;
                    dishnameStr += item.dishname + ",";
                }
            }
        }

        if (DeleteData.length > 0) {
            dishnameStr = dishnameStr.substr(0, dishnameStr.lastIndexOf(","));
            //debugger;
            Ext.MessageBox.confirm("提示", "确定为:&nbsp;" + PublicObject.selectTask.pOrder + "&nbsp;减菜？", function (btn) {
                if (btn == "yes") {
                    var params = {
                        pOrder: PublicObject.selectTask.pOrder,
                        dishIds: JSON.stringify(DeleteData),
                        tasktype: 1,
                        taskstatus: 1,
                        isprint: 0,
                        paymethod: 0,
                        openid: PublicObject.selectTask.openid,
                        tableid: PublicObject.selectTask.tableid,
                        realname: PublicObject.selectTask.realname,
                        mobile: PublicObject.selectTask.mobile,
                        peoplecount: PublicObject.selectTask.peoplecount,
                        randomTag: Math.random()
                    };
                    //debugger;
                    Ext.getCmp('mainViewPort').getEl().mask("正在操作，请稍候");//遮罩
                    Ext.Ajax.request({
                        url: '../api/ManagementSystem/deleteDishWinEvent',
                        params: params,
                        method: 'Post',
                        success: function (response, options) {
                            //debugger;
                            Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                            var result = Ext.JSON.decode(response.responseText);
                            if (result.err) {
                                Ext.MessageBox.alert('提示', result.err.message);
                            } else {
                                Ext.getStore('TaskStore').reload();
                                Ext.MessageBox.alert('成功', "操作成功");
                                Ext.getCmp("deleteDishWin").destroy();
                            }
                        },
                        failure: function (response, options) {
                            Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                        }
                    });
                }
            });
        } else {
            Ext.MessageBox.alert('提示', "请填写需要减菜的数量。");
            return;
        }
    },
    deleteDishSearch: function () {
        //debugger;
        var keyword = Ext.getCmp("deleteDishWin").down("#keyword").getValue();
        var DishData = PublicObject.DishData;
        var Data = [];
        for (i = 0; i < DishData.length; i++) {
            var item = DishData[i];
            var dishname = item.dishname;
            if (dishname != "" && dishname != null && dishname != undefined) {
                if (dishname.indexOf(keyword) > -1) {
                    Data[Data.length] = item;
                }
            }
        }
        var store = Ext.getStore("AllmenuStore2");
        store.removeAll();
        store.getProxy().data = Data;
        store.load();
    },
    deleteDishReset: function () {
        //debugger;
        var keyword = Ext.getCmp("deleteDishWin").down("#keyword");
        keyword.setValue("");
        var store = Ext.getStore("AllmenuStore2");
        store.removeAll();
        var Data = PublicObject.DishData;
        store.getProxy().data = Data;
        store.load();
    }
});