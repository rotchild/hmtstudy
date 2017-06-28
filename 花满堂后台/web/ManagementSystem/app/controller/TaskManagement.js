/**堂食订单**/
Ext.define('ManagementSystem.controller.TaskManagement', {
    extend: 'Ext.app.Controller',
    views: [
        'TaskManagement'
        , 'TaskDetailWin'
        , 'components.field.DateTime'
        , 'TaskCashPaymentWin'
        , 'addDishWin', 'SelectServiceWin'
    ],
    stores: [
        'TaskStore'
        , 'MenuClassStore02'
        , "AllmenuStore", 'menuCurrentStore', "DepartmentStore", 'tableStore', 'serviceCurrentStore'
    ],
    init: function () {
        this.control({
            'taskManagement': {
                'render': this.GetTask,
                'cellclick': this.TaskDetailWin
            },
            'taskManagement #BtnSearch': {
                'click': this.GetTask
            },
            'taskManagement #BtnReset': {
                'click': this.ResetSearchTask
            },
            'taskManagement #BtnRefresh': {
                'click': this.GetTask
            },
            'taskCashPaymentWin #btnAdd': {
                'click': this.AddTaskCashPayment
            },
            'taskCashPaymentWin #btnCancel': {
                'click': function () {
                    Ext.getCmp("taskCashPaymentWinId").destroy();
                }
            },
            "taskManagement #spotPayBtn": {
                "click": this.spotPayEvent
            },
            "taskManagement #cancelPayBtn": {
                "click": this.cancelPayEvent
            },
            "taskManagement #printOrderBtn": {
                "click": this.printOrderEvent
            },
            "taskManagement #printPayBtn": {
                "click": this.printPayEvent
            }
        });
    },
    TaskListCount: function () {
        //debugger;
        Ext.Ajax.request({
            url: '../api/ManagementSystem/GetTaskListCount',
            params: {
                taskstatus: "1",//1已下单，2正在出单，3已出单，4派送中，5订单完成,6订单取消
                tasktype: "1,2,3,4,5",//1：堂食 2：外卖 3：杂食 4：订位 5：订位堂食
                RandomTag: Math.random()
            },
            method: 'POST',
            success: function (response) {
                //debugger;
                var rspText = Ext.JSON.decode(response.responseText);
                if (rspText.success == true) {

                    var data = rspText.data[1];
                    var dataDW = rspText.data[0];
                    var TS_Count = 0;
                    var WM_Count = 0;
                    var ZS_Count = 0;
                    var DW_Count = 0;
                    var DWTS_Count = 0;

                    var TS_Data = [];
                    var WM_Data = [];
                    var ZS_Data = [];
                    var DW_Data = [];
                    var DWTS_Data = [];
                    if (data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].tasktype == 1) {
                                TS_Count++;
                                TS_Data[TS_Data.length] = data[i].id;
                            } else if (data[i].tasktype == 2) {
                                WM_Count++;
                                WM_Data[WM_Data.length] = data[i].id;
                            } else if (data[i].tasktype == 3) {
                                ZS_Count++;
                                ZS_Data[ZS_Data.length] = data[i].id;
                            } else if (data[i].tasktype == 5) {
                                DWTS_Count++;
                                DWTS_Data[DWTS_Data.length] = data[i].id;
                            }
                        }
                    }
                    if (dataDW.length > 0) {
                        for (var w = 0; w < dataDW.length; w++) {
                            if (dataDW[w].tasktype == 4) {
                                DW_Count++;
                                DW_Data[DW_Data.length] = dataDW[w].id;
                            }
                        }
                    }

                    Ext.getElementById("TS_Count").innerHTML = "(" + TS_Count + ")";
                    Ext.getElementById("WM_Count").innerHTML = "(" + WM_Count + ")";
                    Ext.getElementById("ZS_Count").innerHTML = "(" + ZS_Count + ")";
                    Ext.getElementById("DW_Count").innerHTML = "(" + DW_Count + ")";
                    //Ext.getElementById("DWTS_Count").innerHTML = "(" + DWTS_Count + ")";

                    //if (TS_Count > 0 || WM_Count > 0 ||ZS_Count > 0 || DWTS_Count > 0) {
                    //    Ext.getElementById("TS_CurrentTask").play();
                    //}

                    if (PublicObject.TS_CurrentTask.length == 0) {
                        if (TS_Data.length > 0) {
                            if (Sys.ie) {
                                document.getElementById("TS_CurrentIE").play();
                            } else {
                                document.getElementById("TS_CurrentTask").play();
                            }
                        }
                        PublicObject.TS_CurrentTask = TS_Data;
                    } else {
                        if (TS_Data.length > 0) {
                            if (TS_Data[0] > PublicObject.TS_CurrentTask[0]) {
                                if (Sys.ie) {
                                    document.getElementById("TS_CurrentIE").play();
                                } else {
                                    document.getElementById("TS_CurrentTask").play();
                                }
                            }
                        }
                        PublicObject.TS_CurrentTask = TS_Data;
                        //for (var j = 0; j < TS_Data.length; j++) {
                        //
                        //    for (var j2 = 0; j2 < PublicObject.TS_CurrentTask.length; j2++) {
                        //
                        //        debugger;
                        //
                        //        if (TS_Data[j] != PublicObject.TS_CurrentTask[j2]) {
                        //
                        //            Ext.getElementById("TS_CurrentTask").play();
                        //
                        //            break;
                        //
                        //        }
                        //
                        //    }
                        //
                        //}
                    }

                    if (PublicObject.WM_CurrentTask.length == 0) {
                        if (WM_Data.length > 0) {
                            if (Sys.ie) {
                                document.getElementById("TS_CurrentIE").play();
                            } else {
                                document.getElementById("TS_CurrentTask").play();
                            }
                        }
                        PublicObject.WM_CurrentTask = WM_Data;
                    } else {
                        if (WM_Data.length > 0) {
                            if (WM_Data[0] > PublicObject.WM_CurrentTask[0]) {
                                if (Sys.ie) {
                                    document.getElementById("TS_CurrentIE").play();
                                } else {
                                    document.getElementById("TS_CurrentTask").play();
                                }
                            }
                        }
                        PublicObject.WM_CurrentTask = WM_Data;
                        //for (var k = 0; k < WM_Data.length; k++) {
                        //
                        //    for (var k2 = 0; k2 < PublicObject.WM_CurrentTask.length; k2++) {
                        //
                        //        debugger;
                        //
                        //        if (WM_Data[k] != PublicObject.WM_CurrentTask[k2]) {
                        //
                        //            Ext.getElementById("WM_CurrentTask").play();
                        //
                        //            break;
                        //
                        //        }
                        //
                        //    }
                        //
                        //}
                    }
                    if (PublicObject.ZS_CurrentTask.length == 0) {
                        if (ZS_Data.length > 0) {
                            if (Sys.ie) {
                                document.getElementById("TS_CurrentIE").play();
                            } else {
                                document.getElementById("TS_CurrentTask").play();
                            }
                        }
                        PublicObject.ZS_CurrentTask = ZS_Data;
                    } else {
                        if (ZS_Data.length > 0) {
                            if (ZS_Data[0] > PublicObject.ZS_CurrentTask[0]) {
                                if (Sys.ie) {
                                    document.getElementById("TS_CurrentIE").play();
                                } else {
                                    document.getElementById("TS_CurrentTask").play();
                                }
                            }
                        }
                        PublicObject.ZS_CurrentTask = ZS_Data;
                        //for (var m = 0; m < ZS_Data.length; m++) {
                        //
                        //    for (var m2 = 0; m2 < PublicObject.ZS_CurrentTask.length; m2++) {
                        //
                        //        debugger;
                        //
                        //        if (ZS_Data[m] != PublicObject.ZS_CurrentTask[m2]) {
                        //
                        //            Ext.getElementById("ZS_CurrentTask").play();
                        //
                        //            break;
                        //
                        //        }
                        //
                        //    }
                        //
                        //}
                    }
                    if (PublicObject.DW_CurrentTask.length == 0) {
                        if (DW_Data.length > 0) {
                            if (Sys.ie) {
                                document.getElementById("TS_CurrentIE").play();
                            } else {
                                document.getElementById("TS_CurrentTask").play();
                            }
                        }
                        PublicObject.DW_CurrentTask = DW_Data;
                    } else {
                        if (DW_Data.length > 0) {
                            if (DW_Data[0] > PublicObject.DW_CurrentTask[0]) {
                                if (Sys.ie) {
                                    document.getElementById("TS_CurrentIE").play();
                                } else {
                                    document.getElementById("TS_CurrentTask").play();
                                }
                            }
                        }
                        PublicObject.DW_CurrentTask = DW_Data;
                        //for (var n = 0; n < DW_Data.length; n++) {
                        //
                        //    for (var n2 = 0; n2 < PublicObject.DW_CurrentTask.length; n2++) {
                        //
                        //        debugger;
                        //
                        //        if (DW_Data[n] != PublicObject.DW_CurrentTask[n2]) {
                        //
                        //            Ext.getElementById("DW_CurrentTask").play();
                        //
                        //            break;
                        //
                        //        }
                        //
                        //    }
                        //
                        //}
                    }
                    if (PublicObject.DWTS_CurrentTask.length == 0) {
                        if (DWTS_Data.length > 0) {
                            if (Sys.ie) {
                                document.getElementById("TS_CurrentIE").play();
                            } else {
                                document.getElementById("TS_CurrentTask").play();
                            }
                        }
                        PublicObject.DWTS_CurrentTask = DWTS_Data;
                    } else {
                        if (DWTS_Data.length > 0) {
                            if (DWTS_Data[0] > PublicObject.DWTS_CurrentTask[0]) {
                                if (Sys.ie) {
                                    document.getElementById("TS_CurrentIE").play();
                                } else {
                                    document.getElementById("TS_CurrentTask").play();
                                }
                            }
                        }
                        PublicObject.DWTS_CurrentTask = DWTS_Data;
                        //for (var n = 0; n < DWTS_Data.length; n++) {
                        //
                        //    for (var n2 = 0; n2 < PublicObject.DWTS_CurrentTask.length; n2++) {
                        //
                        //        debugger;
                        //
                        //        if (DWTS_Data[n] != PublicObject.DWTS_CurrentTask[n2]) {
                        //
                        //            Ext.getElementById("DWTS_CurrentTask").play();
                        //
                        //            break;
                        //
                        //        }
                        //
                        //    }
                        //
                        //}
                    }
                }
            },
            failure: function (response, options) {
                //debugger;
                Ext.MessageBox.alert('获取订单数量失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
    },
    GetTask: function () {

        //debugger;

        //Ext.TaskManager.stop(PublicObject.TS_Task);//堂食 停止定时器
        Ext.TaskManager.stop(PublicObject.WM_Task);//外卖 停止定时器
        Ext.TaskManager.stop(PublicObject.ZS_Task);//杂食 停止定时器
        Ext.TaskManager.stop(PublicObject.DW_Task);//订位 停止定时器
        //Ext.TaskManager.stop(PublicObject.DWTS_Task);//订位堂食 停止定时器
        //
        //Ext.TaskManager.stop(PublicObject.TS_Task_DJS);//堂食 倒计时 停止定时器
        Ext.TaskManager.stop(PublicObject.WM_Task_DJS);//外卖 倒计时 停止定时器
        Ext.TaskManager.stop(PublicObject.ZS_Task_DJS);//杂食 倒计时 停止定时器
        Ext.TaskManager.stop(PublicObject.DW_Task_DJS);//订位 倒计时 停止定时器
        //Ext.TaskManager.stop(PublicObject.DWTS_Task_DJS);//订位堂食 倒计时 停止定时器器

        var DateStart = Ext.getCmp('taskManagementId').down('#DateStart').rawValue;
        var DateEnd = Ext.getCmp('taskManagementId').down('#DateEnd').rawValue;
        var startdate = "";
        if (DateStart != "" && DateStart != undefined && DateStart != null) {
            startdate = DateStart;
        }
        var enddate = "";
        if (DateEnd != "" && DateEnd != undefined && DateEnd != null) {
            enddate = DateEnd;
        }

        var keyword = Ext.getCmp('taskManagementId').down('#keyword').getValue();
        var tableid = Ext.getCmp('taskManagementId').down('#tableid').getRawValue();
        var TaskStatus = Ext.getCmp('taskManagementId').down('#taskstatus').getValue();
        var taskstatusStr = TaskStatus;
        if (TaskStatus == 0) {
            taskstatusStr = [1, 2, 3, 4, 5, 6];
        }
        var params = {
            startdate: startdate,
            enddate: enddate,
            keyword: keyword,
            tableid: tableid,
            taskstatus: taskstatusStr,
            tasktype: [1, 6],//1：堂食 2：外卖 3：杂食 4：订位
            RandomTag: Math.random()
        };

        var queryUrl = encodeURI("../api/ManagementSystem/GetTask");
        Ext.getStore("TaskStore").getProxy().url = queryUrl;
        Ext.getStore("TaskStore").getProxy().extraParams = params;
        try {
            Ext.getStore("TaskStore").currentPage = 1;
        } catch (e) {
        }
        Ext.getStore("TaskStore").load({
            callback: function (record, opration, success) {
                Ext.TaskManager.start(PublicObject.TS_Task);//启动 30秒 定时器
                Ext.TaskManager.start(PublicObject.TS_Task_DJS);//启动定时器 倒计时
                curCount = 30;
                if (!success) {
                    Ext.MessageBox.alert('提示', '网络连接异常！')
                }
            }
        });
        Ext.getStore('tableStore').load();
    },
    ResetSearchTask: function () {

        var DateStart = Ext.getCmp('taskManagementId').down('#DateStart');
        DateStart.setValue(currentDate()[2]);
        var DateEnd = Ext.getCmp('taskManagementId').down('#DateEnd');
        DateEnd.setValue(currentDate()[1]);

        var keyword = Ext.getCmp('taskManagementId').down('#keyword');
        keyword.setValue("");
        Ext.getCmp('taskManagementId').down('#taskstatus').setValue(0);
        Ext.getCmp('taskManagementId').down('#tableid').setValue("全部");

        ManagementSystem.app.getTaskManagementController().GetTask();
    },
    TaskDetailWin: function (thi, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        PublicObject.selectTask = record.raw;
        //debugger;
        var win = "";
        if (e.getTarget().id == "TaskDetailWin") {//详情
            win = Ext.create('ManagementSystem.view.TaskDetailWin', {
                title: '详情',
                listeners: {
                    render: function () {

                    },
                    show: function () {
                        PublicObject.selectTask = record.raw;
                        var data = JSON.parse(record.raw.dishids);
                        var realname = record.raw.realname,
                            adddress = record.raw.address,
                            mobile = record.raw.mobile,
                            peoplecount = record.raw.peoplecount;
                        var tableAdd =
                            '<tr>' +
                                '<td colspan="4">就餐人数：<span id="">' + peoplecount + '</span></td>' +
                                '</tr>';
                        $("#taskDetailWinTable01").append(tableAdd);

                        var tableStr =
                            '<table><tbody><tr>' +
                                '<td>菜品名称</td>' +
                                '<td>单价</td>' +
                                '<td>数量</td>' +
                                '<td>金额</td>' +
                                '</tr>';
                        var TotalCount = 0;
                        var TotalCountMoney = 0;
                        if (data) {
                            for (var i = 0; i < data.length; i++) {
                                tableStr +=
                                    '<tr>' +
                                        '<td>' + data[i].dishname + '</td>' +
                                        '<td>' + data[i].presentprice + '</td>' +
                                        '<td>' + data[i].menucount + '</td>' +
                                        '<td>' + data[i].presentprice * data[i].menucount + '</td>' +
                                        '</tr>';
                                TotalCount += parseInt(data[i].menucount);
                                TotalCountMoney += data[i].presentprice * data[i].menucount;
                            }
                        }
                        var serviceData = JSON.parse(record.raw.serviceids);
                        if (serviceData) {
                            for (var j = 0; j < serviceData.length; j++) {
                                tableStr +=
                                    '<tr>' +
                                        '<td>' + serviceData[j].servicename + '</td>' +
                                        '<td>' + serviceData[j].price + '</td>' +
                                        '<td>' + serviceData[j].count + '</td>' +
                                        '<td >' + serviceData[j].price * serviceData[j].count + '</td>' +
                                        '</tr>';
                                TotalCount += parseInt(serviceData[j].count);
                                TotalCountMoney += serviceData[j].price * serviceData[j].count;
                            }
                        }
                        $("#taskDetailWinTable02").append(tableStr + "</tbody></table>");

                        document.getElementById("TotalCount").innerHTML = TotalCount;
                        document.getElementById("TotalCountMoney").innerHTML = TotalCountMoney.toFixed(2);
                        document.getElementById("TransactionNumber").innerHTML = record.raw.id;
                        //document.getElementById("Cashier").innerHTML = PublicObject.CurrentUser.username;
                        document.getElementById("TableId").innerHTML = record.raw.tableid;
                        document.getElementById("PrintDate").innerHTML = record.raw.ordertime;
                        //debugger;
                        if (record.raw.tasktype === 1 && record.raw.paymethod === 0) {
                            Ext.getCmp('taskDetailWinId').down('#OrderPrint').hide();
                            Ext.getCmp('taskDetailWinId').down('#OrderEnter').show();
                        } else {
                            Ext.getCmp('taskDetailWinId').down('#OrderPrint').show();
                            Ext.getCmp('taskDetailWinId').down('#OrderEnter').hide();
                        }
                    }
                }
            });
            win.show();
        }
        else if (e.getTarget().id == "addDish") {//加菜
            var winM = Ext.create('ManagementSystem.view.addDishWin', {
                listeners: {
                    show: function () {
                        var paramsM = {
                            keyword: "",
                            dishtype: [1],
                            comboClass: null,
                            RandomTag: Math.random()
                        };
                        var queryUrlM = encodeURI("../api/ManagementSystem/getAllMenu");
                        Ext.getStore("AllmenuStore").getProxy().url = queryUrlM;
                        Ext.getStore("AllmenuStore").getProxy().extraParams = paramsM;
                        Ext.getStore('AllmenuStore').load({scope: Ext.get('addDishWin').down('#menuGrid')});
                        var queryUrlC = encodeURI("../api/ManagementSystem/getAllMenuClass");
                        Ext.getStore("MenuClassStore02").getProxy().url = queryUrlC;
                        Ext.getStore("MenuClassStore02").getProxy().extraParams = {

                            RandomTag: Math.random()
                        };
                        Ext.getStore('MenuClassStore02').load({scope: Ext.get('addDishWin').down('#comboClass')});
                    }
                }
            });
            winM.show();
        }
        else if (e.getTarget().id == "deleteDish") {//减菜
            //debugger;
            var winM2 = Ext.create('ManagementSystem.view.deleteDishWin', {
                listeners: {
                    show: function () {
                        //debugger;
                        PublicObject.DishData = [];
                        Ext.getCmp('mainViewPort').getEl().mask("请稍候...");//遮罩
                        Ext.Ajax.request({
                            url: '../api/ManagementSystem/getTaskById',//根据 pOrder 查找所有子订单
                            params: {
                                pOrder: record.raw.pOrder,
                                RandomTag: Math.random()
                            },
                            method: 'Post',
                            success: function (response, options) {
                                //debugger;
                                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                                var result = Ext.JSON.decode(response.responseText);
                                if (result.err) {
                                    Ext.MessageBox.alert('提示', result.err.message);
                                } else {
                                    var results = result.data;
                                    var data = results.all;//所有的菜单
                                    //debugger;
                                    var DishData = [];
                                    var ObjectData = {};
                                    if (data) {
                                        for (var i in data) {
                                            //debugger;
                                            var _data = data[i];
                                            _data = JSON.parse(_data);
                                            for (var m = 0; m < _data.length; m++) {
                                                var mData = _data[m];
                                                if (ObjectData[mData.menuid]) {//已经存在
                                                    ObjectData[mData.menuid].menucount = ObjectData[mData.menuid].menucount * 1 + mData.menucount * 1;
                                                } else {//不存在
                                                    ObjectData[mData.menuid] = {
                                                        "dishid": mData.menuid,
                                                        "depart_fk": mData.depart_fk,
                                                        "dishname": mData.dishname,
                                                        "dishurl": mData.dishurl,
                                                        "menucount": mData.menucount,
                                                        "menucount2": "",
                                                        "menuid": mData.menuid,
                                                        "presentprice": mData.presentprice
                                                    };
                                                }
                                            }
                                        }
                                    }
                                    //debugger;
                                    for (var key in ObjectData) {
                                        var kData = ObjectData[key];
                                        if (kData.menucount * 1 > 0) {
                                            var rec = {
                                                "dishid": kData.dishid,
                                                "depart_fk": kData.depart_fk,
                                                "dishname": kData.dishname,
                                                "dishurl": kData.dishurl,
                                                "menucount": kData.menucount,
                                                "menucount2": kData.menucount2,
                                                "menuid": kData.menuid,
                                                "presentprice": kData.presentprice
                                            };
                                            DishData[DishData.length] = rec;
                                        }
                                    }
                                    PublicObject.DishData = DishData;
                                    var store = Ext.getStore("AllmenuStore2");
                                    store.getProxy().data = DishData;
                                    store.load();
                                }
                            },
                            failure: function (response, options) {
                                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                            }
                        });
                    }
                }
            });
            winM2.show();
        }
        else if (e.getTarget().id == "addService") {//添加服务项目
            var winS = Ext.create('ManagementSystem.view.SelectServiceWin', {
                items: [
                    {
                        xtype: 'panel',
                        region: 'north',
                        layout: 'column',
                        items: [
                            {
                                xtype: 'textfield',
                                margin: 10,
                                labelWidth: 50,
                                itemId: 'tableid',
                                fieldLabel: '桌位号<span style="color:red;">*</span>',
                                columnWidth: 0.45
                            },
                            {
                                xtype: 'numberfield',
                                margin: 10,
                                labelWidth: 60,
                                itemId: 'peoplecount',
                                columnWidth: 0.45,
                                fieldLabel: '消费人数<span style="color:red;">*</span>',
                                regex: /^[1-9]*$/,
                                regexText: '请输入正确的数量'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        region: 'center',
                        autoScroll: true,
                        items: [
                            {
                                xtype: 'gridpanel',
                                border: false,
                                itemId: 'serviceGrid',
                                store: 'ServiceClassStore',
                                selModel: Ext.create('Ext.selection.CheckboxModel', {
                                    checkOnly: true//如果值为true，则只用点击checkbox列才能选中此条记录
                                }),
                                columns: [
                                    {
                                        header: 'id', flex: 1, dataIndex: 'id', hidden: true
                                    },
                                    {
                                        header: '服务项目', flex: 1, dataIndex: 'servicename'
                                    },
                                    {
                                        header: '单价(元)', flex: 1, dataIndex: 'price'
                                    },
                                    {
                                        header: 'type', flex: 1, dataIndex: 'type', hidden: true
                                    },
                                    {
                                        header: '计费方式', flex: 1, dataIndex: 'rule', renderer: function (value) {
                                        var str = "";
                                        if (parseInt(value) == 1) {
                                            str = "按人数计费";
                                        } else if (parseInt(value) == 2) {
                                            str = "按菜单计费";
                                        } else {
                                            str = "网络超时，请刷新页面！";
                                        }
                                        return str;
                                    }
                                    }
                                ]
                            }
                        ]
                    }
                ],
                listeners: {
                    render: function () {
                        var paramsS = {
                            type: 1,
                            RandomTag: Math.random()
                        };
                        var queryUrlS = encodeURI("../api/ManagementSystem/GetServiceClass");
                        Ext.getStore('ServiceClassStore').getProxy().url = queryUrlS;
                        Ext.getStore("ServiceClassStore").getProxy().extraParams = paramsS;
                        Ext.getStore("ServiceClassStore").load();
                    },
                    show: function () {
                        Ext.getCmp('SelectServiceWin').down('#tableid').setValue(record.raw.tableid);
                    }
                }
            });
            winS.show();
        }
        else if (e.getTarget().id == "DWTS") {//订位堂食详情
            var reservationid = record.raw.reservationid;
            var winDWTS = Ext.create('Ext.window.Window', {
                xtype: 'dwtsWin',
                id: 'dwtsWin',
                modal: true,
                width: 300,
                height: 260,
                bodyStyle: 'background:#ffffff;',
                autoScroll: true,
                plain: false,
                layout: 'border',
                title: '订位详情',
                html: '<div id="dwtsList"></div>',
                listeners: {
                    show: function () {
                        var paramsD = {
                            reservationid: reservationid,
                            RandomTag: Math.random()
                        };
                        Ext.Ajax.request({
                            url: "../api/ManagementSystem/getDWTS",
                            method: "post",
                            params: paramsD,
                            success: function (response) {
                                //debugger;
                                var data = Ext.JSON.decode(response.responseText).data[0];
                                var sexStr = data.sex == 0 ? "男" : "女";
                                var tableDiv =
                                    '<table cellpadding="0" cellspacing="0" border="0" style="padding: 5px;width: 100%;font-size:14px;"><tr>' +
                                        '<td colspan="4" id="">订单详情</td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>订单号：</td><td colspan="3"><span id="">' + data.id + '</span></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>下单时间：</td><td colspan="3"><span id="">' + data.ordertime + '</span></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td id="">就餐时间：</td><td colspan="3"><span id="" style="color:red;">' + data.ordertabletime + '</span></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td>就餐环境：</td><td colspan="3"><span id="">' + data.tableid + '</span></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td id="">联系人：</td><td colspan="3"><span id="">' + data.realname + '</span></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td id="">性别：</td><td colspan="3"><span id="">' + sexStr + '</span></td>' +
                                        '</tr>' +
                                        '<tr>' +
                                        '<td id="">联系电话：</td><td colspan="3"><span id="">' + data.mobile + '</span></td>' +
                                        '</tr>' +
                                        '</table>';
                                $('#dwtsList').append(tableDiv);
                            },
                            failure: function (response) {
                                Ext.MessageBox.alert('错误', '网络连接失败！');
                            }
                        });

                    }
                }
            })
            winDWTS.show();
        }
    },
    AddTaskCashPayment: function () {

        var cashpayment = Ext.getCmp("taskCashPaymentWinId").down("#cashpayment").getValue();

        var record = PublicObject.selectTask;

        Ext.MessageBox.confirm("提示", "是否确定对订单号：[<span style='color: red'>" + record.id + "</span>]进行现金支付，" +
            "支付的现金为：[<span style='color: red'>" + cashpayment + "</span>]？", function (btn) {
            if (btn == "yes") {
                Ext.getCmp('mainViewPort').getEl().mask("正在操作，请稍候");//遮罩
                Ext.Ajax.request({
                    url: '../api/ManagementSystem/PaymentTaskDetail',
                    params: {
                        id: record.id,
                        cashpayment: cashpayment,
                        RandomTag: Math.random()
                    },
                    method: 'Post',
                    success: function (response, options) {
                        debugger;
                        Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                        var result = Ext.JSON.decode(response.responseText);
                        if (result.err) {
                            Ext.MessageBox.alert('提示', result.err.message);
                        } else {

                            var data = result.data;

                            Ext.getCmp("taskCashPaymentWinId").destroy();

                            Ext.getCmp("taskManagementId").getStore("TaskStore").reload();

                        }
                    },
                    failure: function (response, options) {
                        Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                        Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                    }
                });

            }
        });

    }, spotPayEvent: function () {
        //现场支付,合并结账
        //debugger;
        var selectTask = Ext.getCmp('taskManagementId').getSelectionModel().getSelection();
        if (selectTask.length < 1) {
            Ext.MessageBox.alert("提示", "请选择一条记录");
            return;
        }
        else {
            if (!selectTask[selectTask.length - 1].raw.reservationid) {
                PublicObject.selectTask = selectTask[selectTask.length - 1].raw;
                var selectPorder = selectTask[selectTask.length - 1].raw.pOrder;
                var taskStore = Ext.getCmp("taskManagementId").getStore("TaskStore").data.items;
                var arr = [];
                for (var i = 0, len = taskStore.length; i < len; i++) {
                    if (selectPorder == taskStore[i].data.pOrder) {
                        arr.push(taskStore[i]);
                    }
                }
                var allPrice = 0;
                for (var j = 0, loop = arr.length; j < loop; j++) {
                    allPrice += arr[j].raw.sumoney;
                }
                Ext.getCmp('taskManagementId').getSelectionModel().select(arr);
                if (selectTask[selectTask.length - 1].raw.taskstatus != 5) {
                    Ext.MessageBox.confirm("确定", "该订单尚未完成，是否确定结账？", function (btn) {
                        if (btn == "yes") {
                            var win = Ext.create('ManagementSystem.view.spotPayWin', {
                                listeners: {
                                    render: function () {

                                    },
                                    show: function () {
                                        Ext.getCmp('spotPayWin').down('#tableid').setValue(selectTask[selectTask.length - 1].raw.tableid);
                                        Ext.getCmp('spotPayWin').down('#pOrder').setValue(selectTask[selectTask.length - 1].raw.pOrder);
                                        Ext.getCmp('spotPayWin').down('#duePay').setValue(allPrice);
                                    }
                                }
                            });
                            win.show();
                        }
                    });
                }
            } else {
                Ext.MessageBox.alert('提示', "订位堂食订单不支持现场支付！")
            }

        }
    }, cancelPayEvent: function () {
        //取消订单 分别取消
        var selectTask = Ext.getCmp('taskManagementId').getSelectionModel().getSelection();
        debugger;
        if (selectTask.length == 1) {
            PublicObject.selectTask = selectTask[0].raw;
            var flag = false;
            if (selectTask[0].tasktype == 6) {
                flag = true;//加服务
            }
            if (selectTask[0].raw.taskstatus == 1) {
                flag = true;//已下单
            }
            if (selectTask[0].raw.paymethod == 0) {
                flag = true;//未支付
            }
            if (!flag) {
                Ext.MessageBox.alert("提示", "该类型订单或已支付订单暂不提供取消功能！");
                return;
            } else {
                Ext.MessageBox.confirm("确定", "是否确定取消该订单？", function (btn) {
                    if (btn == "yes") {
                        Ext.getCmp('mainViewPort').getEl().mask("正在操作，请稍候");//遮罩
                        Ext.Ajax.request({
                            url: '../api/ManagementSystem/TaskCancel',
                            params: {
                                id: selectTask[0].raw.id,
                                randomTag: Math.random()
                            },
                            method: 'Post',
                            success: function (response, options) {
                                //debugger;
                                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                                var result = Ext.JSON.decode(response.responseText);
                                if (result.err) {
                                    Ext.MessageBox.alert('提示', result.err.message);
                                } else {
                                    Ext.getCmp("taskManagementId").getStore("TaskStore").reload();
                                    Ext.MessageBox.alert('成功', "操作成功!");
                                }
                            },
                            failure: function (response, options) {
                                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                            }
                        });
                    }
                })
            }

        } else {
            Ext.MessageBox.alert("提示", "请选择一条订单");
            return;
        }
    }, printOrderEvent: function () {
        //debugger;//打印订单 分别打印
        Ext.getCmp('taskManagementId').down("#printOrderBtn").setDisabled(true);
        setTimeout(function () {
            Ext.getCmp('taskManagementId').down("#printOrderBtn").setDisabled(false);
        }, 2000);
        var selectTask = Ext.getCmp('taskManagementId').getSelectionModel().getSelection();
        if (selectTask.length == 1) {
            PublicObject.selectTask = selectTask[0].raw;
            var record = selectTask[0].raw;
            var paramsrecord = JSON.stringify(record);
            if (record.tasktype === 1 && record.reservationid && record.paymethod === 0) {
                Ext.MessageBox.alert('提示', "该订单暂未支付！请选择其他订单!");
                return;
            }
            ManagementSystem.app.getTaskManagementController().printfn(record);
        } else {
            Ext.MessageBox.alert("提示", "请选择一条订单");
            return;
        }
    }, printPayEvent: function () {
        //debugger;//打印结账单 合并打印总结账单
        var selectTask = Ext.getCmp('taskManagementId').getSelectionModel().getSelection();
        if (selectTask.length < 1) {
            Ext.MessageBox.alert("提示", "请选择一条记录");
            return;
        } else {
            PublicObject.selectTask = selectTask[selectTask.length - 1].raw;
            //根据订单号查出所有子订单
            var pOrder = selectTask[selectTask.length - 1].raw.pOrder;
            var selectPorder = selectTask[selectTask.length - 1].raw.pOrder;
            var taskStore = Ext.getStore('TaskStore').data.items;
            var arr = [];
            for (var i = 0, len = taskStore.length; i < len; i++) {
                if (selectPorder == taskStore[i].data.pOrder) {
                    arr.push(taskStore[i]);
                }
            }
            Ext.getCmp('taskManagementId').getSelectionModel().select(arr);
            var win = Ext.create('ManagementSystem.view.OrderWin', {
                listeners: {
                    render: function () {
                    },
                    show: function () {
                        Ext.getCmp('mainViewPort').getEl().mask("请稍候...");//遮罩
                        Ext.Ajax.request({
                            url: '../api/ManagementSystem/getTaskById',
                            params: {
                                pOrder: pOrder,
                                RandomTag: Math.random()
                            },
                            method: 'Post',
                            success: function (response, options) {
                                debugger;
                                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                                var result = Ext.JSON.decode(response.responseText);
                                if (result.err) {
                                    Ext.MessageBox.alert('提示', result.err.message);
                                } else {
                                    var results = result.data;
                                    var data = results.all;
                                    var allservice = results.allservice;
                                    var tableStr =
                                        '<table><tbody><tr>' +
                                            '<td>菜品名称</td>' +
                                            '<td>单价</td>' +
                                            '<td>数量</td>' +
                                            '<td>金额</td>' +
                                            '</tr>';
                                    var TotalCount = 0;
                                    var TotalCountMoney = 0;
                                    if (data) {
                                        for (var jj in data) {
                                            data[jj] = JSON.parse(data[jj]);
                                        }

                                        for (var i in data) {
                                            for (var m = 0, len = data[i].length; m < len; m++) {
                                                tableStr +=
                                                    '<tr>' +
                                                        '<td style="border-bottom: 1px;">' + data[i][m].dishname + '</td>' +
                                                        '<td style="border-bottom: 1px;">' + data[i][m].presentprice + '</td>' +
                                                        '<td style="border-bottom: 1px;">' + data[i][m].menucount + '</td>' +
                                                        '<td style="border-bottom: 1px;">' + data[i][m].presentprice * data[i][m].menucount + '</td>' +
                                                        '</tr>';
                                                TotalCount += parseInt(data[i][m].menucount);
                                                TotalCountMoney += data[i][m].presentprice * data[i][m].menucount;
                                            }
                                        }
                                    }
                                    if (allservice) {
                                        for (var ser in allservice) {
                                            tableStr +=
                                                '<tr>' +
                                                    '<td style="border-bottom: 1px;">' + allservice[ser].servicename + '</td>' +
                                                    '<td style="border-bottom: 1px;">' + allservice[ser].price + '</td>' +
                                                    '<td style="border-bottom: 1px;">' + allservice[ser].count + '</td>' +
                                                    '<td style="border-bottom: 1px;">' + allservice[ser].price * allservice[ser].count + '</td>' +
                                                    '</tr>';
                                            TotalCount += parseInt(allservice[ser].count);
                                            TotalCountMoney += allservice[ser].price * allservice[ser].count;
                                        }
                                    }
                                    $("#orderDiv").append(tableStr + "</tbody></table>");
                                    $("#allCount").html(TotalCount);
                                    $("#allMoney").html(TotalCountMoney.toFixed(2));
                                    $("#orderNumber").html(results.pOrder);
                                    $("#userrealname").html(PublicObject.CurrentUser.username);
                                    $("#tableid").html(results.tableid);
                                    $('#peoplecount').html(results.peoplecount);
                                    $("#ordertime").html(formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"));
                                    var orderList = {
                                        tasktype: 1,
                                        pOrder: results.pOrder,
                                        userrealname: PublicObject.CurrentUser.username,
                                        tableid: results.tableid,
                                        peoplecount: results.peoplecount,
                                        mobile: results.mobile,
                                        ordertime: results.ordertime,
                                        reservationid: results.reservationid,
                                        totalCount: TotalCount,
                                        totalMoney: TotalCountMoney,
                                        dishids: data,
                                        allservice: allservice
                                    };
                                    PublicObject.orderList = orderList;
                                }
                            },
                            failure: function (response, options) {
                                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                            }
                        });
                    }
                }
            });
            win.show();
        }
    },
    printfn: function (record) {
        //打印
        var paramsrecord = JSON.stringify(record);
        if (record.tasktype != 6) {
            if (record.isprint !== 0) {
                var winR = Ext.create('ManagementSystem.view.RepeatPrintWin', {
                    items: [
                        {
                            xtype: 'panel',
                            region: 'north',
                            layout: 'column',
                            bodyPadding: 6,
                            items: [
                                {
                                    xtype: 'panel',
                                    border: false,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            labelWidth: 400,
                                            itemId: 'pwd',
                                            inputType: 'password',
                                            fieldLabel: '<b style="color:red;">该订单已打印过一次，重复打印会造成后厨重复制作，请输入密码后确认</b>',
                                            column: 0.99
                                        }
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: '桌位号*',
                                    labelWidth: 50,
                                    width: 140,
                                    itemId: 'tableid',
                                    mode: 'local',
                                    triggerAction: 'all',
                                    multiSelect: false,//允许多选
                                    editable: false,
                                    value: "",
                                    displayField: 'tableName',
                                    hiddenName: 'id',
                                    valueField: 'id',
                                    disabled: false,
                                    store: "tableStore",
                                    forceSelection: true,// 必须选择一个选项
                                    blankText: '请选择'// 该项如果没有选择，则提示错误信息,
                                },
                                {
                                    xtype: "checkboxgroup",
                                    itemId: '',
                                    width: 250,
                                    column: 2,
                                    fieldLabel: "&nbsp;&nbsp;选择打印",
                                    items: [
                                        {boxLabel: "总单", name: "1", itemId: 'allBills'},
                                        {boxLabel: "传菜单", name: "2", itemId: 'handBill'}
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: '按出品部选择',
                                    labelWidth: 76,
                                    width: 160,
                                    itemId: 'departmentM',
                                    store: "DepartmentStore",
                                    mode: 'local',
                                    triggerAction: 'all',
                                    multiSelect: false,//允许多选
                                    editable: false,
                                    value: '',
                                    displayField: 'departmentName',
                                    hiddenName: 'departmentName',
                                    disabled: false,
                                    forceSelection: true,// 必须选择一个选项
                                    blankText: '请选择',// 该项如果没有选择，则提示错误信息,
                                    valueField: 'id',
                                    listeners: {
                                        select: function () {
                                            var taskStore = Ext.getStore("menuCurrentStore").data.items;
                                            var arr = [];
                                            for (var i = 0, len = taskStore.length; i < len; i++) {
                                                if (this.getValue() == taskStore[i].data.depart_fk) {
                                                    arr.push(taskStore[i]);
                                                }
                                            }
                                            Ext.getCmp('repeatPrintWin').down("#dishList").getSelectionModel().select(arr);
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            region: 'center',
                            border: false,
                            autoScroll: true,
                            itemId: 'dishList',
                            store: 'menuCurrentStore',
                            selModel: Ext.create('Ext.selection.CheckboxModel', {
                                checkOnly: true//如果值为true，则只用点击checkbox列才能选中此条记录
                            }),
                            columns: [
                                {
                                    header: 'menuid', flex: 1, dataIndex: 'menuid', hidden: true
                                },
                                {
                                    header: '菜品名称', flex: 1, dataIndex: 'dishname'
                                },
                                {
                                    header: '单价(元)', flex: 1, dataIndex: 'presentprice'
                                },
                                {
                                    header: '数量', flex: 1, dataIndex: 'menucount'
                                }
                                //,
                                //{
                                //    header:'出品部', flex: 1, dataIndex: 'depart_fk'
                                //}
                            ]
                        },
                        {
                            xtype: 'gridpanel',
                            region: 'south',
                            border: true,
                            autoScroll: true,
                            itemId: 'serviceList',
                            store: 'serviceCurrentStore',
                            //selModel:  Ext.create('Ext.selection.CheckboxModel', {
                            //    checkOnly:true//如果值为true，则只用点击checkbox列才能选中此条记录
                            //}),
                            columns: [
                                {
                                    header: 'id', flex: 1, dataIndex: 'id', hidden: true
                                },
                                {
                                    header: '服务名称', flex: 1, dataIndex: 'servicename'
                                },
                                {
                                    header: '单价(元)', flex: 1, dataIndex: 'price'
                                },
                                {
                                    header: '数量', flex: 1, dataIndex: 'count'
                                }
                                //,
                                //{
                                //    header:'出品部', flex: 1, dataIndex: 'depart_fk'
                                //}
                            ]
                        }
                    ],
                    listeners: {
                        render: function () {

                        },
                        show: function () {
                            debugger;
                            Ext.getCmp('repeatPrintWin').down('#tableid').setRawValue(record.tableid);
                            if (record.tasktype == 2) {
                                Ext.getCmp('repeatPrintWin').down('#tableid').setRawValue("外卖");
                                Ext.getCmp('repeatPrintWin').down('#tableid').setDisabled(true);
                            } else if (record.tasktype == 3) {
                                Ext.getCmp('repeatPrintWin').down('#tableid').setRawValue("食杂订单");
                                Ext.getCmp('repeatPrintWin').down('#tableid').setDisabled(true);
                            }
                            Ext.getStore("DepartmentStore").reload();
                            var menuCurrentStore = Ext.getStore('menuCurrentStore'),
                                serviceCurrentStore = Ext.getStore('serviceCurrentStore');
                            menuCurrentStore.removeAll();
                            serviceCurrentStore.removeAll();
                            var dishidsCurrent = JSON.parse(record.dishids),
                                serviceCurrent = JSON.parse(record.serviceids);
                            for (var i = 0; i < dishidsCurrent.length; i++) {
                                var rec = {
                                    menuid: dishidsCurrent[i].menuid,
                                    dishname: dishidsCurrent[i].dishname,
                                    menucount: dishidsCurrent[i].menucount,
                                    presentprice: dishidsCurrent[i].presentprice,
                                    depart_fk: dishidsCurrent[i].depart_fk
                                };
                                menuCurrentStore.insert(menuCurrentStore.getCount(), rec);
                                menuCurrentStore.commitChanges();
                            }
                            if (serviceCurrent) {
                                for (var i = 0; i < serviceCurrent.length; i++) {
                                    var Obj = {
                                        id: serviceCurrent[i].id,
                                        servicename: serviceCurrent[i].servicename,
                                        count: serviceCurrent[i].count,
                                        price: serviceCurrent[i].price
                                    };
                                    serviceCurrentStore.insert(menuCurrentStore.getCount(), Obj);
                                    serviceCurrentStore.commitChanges();
                                }
                            }
                        }
                    }
                });
                winR.show();

                /**var warningstr='<div>' +"<b style='color:red;'>该订单已打印过一次，重复打印会造成后厨重复制作，请输入密码后确认</b><br>"+
                 '<input type="password" style="margin:5px 120px;width:120px;height:36px;text-align: center;" id="inputV">' +
                 '</div>';
                 Ext.MessageBox.confirm("确认",warningstr,function(btn){
                        if(btn=="yes"){
                            if(Ext.getElementById("inputV").value !== PublicObject.pwd){
                                Ext.MessageBox.alert('提示',"密码错误");
                                return;
                            }else {
                                Ext.getCmp('mainViewPort').getEl().mask("正在打印，请稍候");//遮罩
                                Ext.Ajax.request({
                                    url: '../api/ManagementSystem/orderPrintDepart',
                                    params: {
                                        record: paramsrecord,
                                        isprint: 2,
                                        RandomTag: Math.random()
                                    },
                                    method: 'Post',
                                    success: function (response, options) {
                                        Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                                        var result = Ext.JSON.decode(response.responseText);
                                        if (result.err) {
                                            Ext.MessageBox.alert('提示', result.err.message);
                                        } else {
                                            debugger;
                                            var data = result.data;
                                            Ext.getCmp("taskManagementId").getStore("TaskStore").reload();
                                            //Ext.MessageBox.alert('提示', '打印成功');
                                        }
                                    },
                                    failure: function (response, options) {
                                        Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                                        Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                                    }
                                });
                            }
                        }
                })**/
            }
            else {
                if (record.tasktype == 1 && (record.tableid == "" || record.tableid == null || record.tableid == undefined)) {
                    ManagementSystem.app.getTaskManagementController().lowerEvent(record);
                }
                else {
                    Ext.getCmp('mainViewPort').getEl().mask("正在打印，请稍候");//遮罩
                    Ext.Ajax.request({
                        timeout: 60000,
                        url: '../api/ManagementSystem/orderPrintDepart',
                        params: {
                            record: paramsrecord,
                            isprint: 1,
                            RandomTag: Math.random()
                        },
                        method: 'Post',
                        success: function (response, options) {
                            Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                            var result = Ext.JSON.decode(response.responseText);
                            if (result.err) {
                                Ext.MessageBox.alert('提示', result.err.message);
                            } else {
                                //debugger;
                                var backMessage = result.data._callbacks;
                                Ext.getStore("TaskStore").reload();
                                if (Ext.getCmp("taskDetailWinId")) {
                                    Ext.getCmp('taskDetailWinId').destroy();
                                }
                                Ext.MessageBox.alert('提示', '打印成功');
                            }
                        },
                        failure: function (response, options) {
                            Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                        }
                    });
                }
            }
        } else {
            Ext.MessageBox.alert('提示', '该类型订单不提供打印功能！');
        }

    },
    lowerEvent: function (record) {
        //分配座位号
        var winT = Ext.create('Ext.window.Window', {
            title: '分配桌位号',
            itemId: 'lowerWin',
            id: "lowerWin",
            height: 140,
            width: 250,
            layout: 'fit',
            items: [
                {
                    xtype: 'panel',
                    bodyPadding: 10,
                    items: [
                        {
                            xtype: 'panel',
                            border: false,
                            html: '<span style="color:#0000FF;">*请先为此订单分配桌位号</span>'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '请分配桌位号*',
                            labelWidth: 90,
                            width: 160,
                            itemId: 'tableid',
                            mode: 'local',
                            triggerAction: 'all',
                            multiSelect: false,//允许多选
                            editable: false,
                            value: "",
                            displayField: 'tableName',
                            hiddenName: 'id',
                            valueField: 'id',
                            disabled: false,
                            store: "tableStore",
                            forceSelection: true,// 必须选择一个选项
                            blankText: '请选择',// 该项如果没有选择，则提示错误信息,
                            listeners: {
                                click: function () {
                                    Ext.getStore("tableStore").load();
                                }
                            }
                        }
                    ],
                    buttons: [
                        '->',
                        {text: '确定', itemId: 'btnEnter',
                            listeners: {
                                click: function () {
                                    var tableid = Ext.getCmp('lowerWin').down('#tableid').getRawValue();
                                    Ext.getCmp('lowerWin').getEl().mask("请稍候...");//遮罩
                                    Ext.Ajax.request({
                                        url: '../api/ManagementSystem/selectTableNO',
                                        params: {
                                            tableid: tableid,
                                            pOrder: record.pOrder,
                                            reservationid: record.reservationid,
                                            RandomTag: Math.random()
                                        },
                                        method: 'Post',
                                        success: function (response, options) {
                                            Ext.getCmp('lowerWin').getEl().unmask();//遮罩
                                            var result = Ext.JSON.decode(response.responseText);
                                            if (result.err) {
                                                Ext.MessageBox.alert('提示', result.err.message);
                                            } else {
                                                //debugger;
                                                Ext.getCmp("taskManagementId").getStore("TaskStore").removeAll();
                                                Ext.getCmp("taskManagementId").getStore("TaskStore").reload();
                                                Ext.getCmp('lowerWin').destroy();
                                                if (Ext.getCmp('taskDetailWinId')) {
                                                    Ext.getCmp('taskDetailWinId').destroy();
                                                }
                                                Ext.MessageBox.alert('提示', "成功");
                                            }
                                        },
                                        failure: function (response, options) {
                                            Ext.getCmp('lowerWin').getEl().unmask();//遮罩
                                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                                        }
                                    });
                                }
                            }
                        },
                        {text: '取消', itemId: 'btnCancel',
                            listeners: {
                                click: function () {
                                    Ext.getCmp('lowerWin').destroy();
                                }
                            }},
                        '->'
                    ]
                }
            ],
            listeners: {
                render: function () {

                },
                show: function () {

                }
            }
        });
        winT.show();
    }
});