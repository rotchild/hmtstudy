/**订位堂食订单**/
Ext.define('ManagementSystem.controller.TaskManagement05', {
    extend: 'Ext.app.Controller',
    views: [
        'TaskManagement05'
        , 'components.field.DateTime'
        , 'TaskTableWin'
    ],
    stores: [
        'TaskStore'
        , 'MenuClassStore02'
    ],
    init: function () {
        this.control({
            'taskManagement05': {
                'render': this.GetTask,
                'cellclick': this.TaskDetailWin
            },
            'taskManagement05 #BtnSearch': {
                'click': this.GetTask
            },
            'taskManagement05 #BtnReset': {
                'click': this.ResetSearchTask
            },
            'taskManagement05 #BtnRefresh': {
                'click': this.GetTask
            }
        });
    },
    GetTask: function () {

        //debugger;

        //Ext.TaskManager.stop(PublicObject.TS_Task);//堂食 停止定时器
        //Ext.TaskManager.stop(PublicObject.WM_Task);//外卖 停止定时器
        //Ext.TaskManager.stop(PublicObject.ZS_Task);//杂食 停止定时器
        //Ext.TaskManager.stop(PublicObject.DW_Task);//订位 停止定时器
        //Ext.TaskManager.stop(PublicObject.DWTS_Task);//订位堂食 停止定时器
        //
        //Ext.TaskManager.stop(PublicObject.TS_Task_DJS);//堂食 倒计时 停止定时器
        //Ext.TaskManager.stop(PublicObject.WM_Task_DJS);//外卖 倒计时 停止定时器
        //Ext.TaskManager.stop(PublicObject.ZS_Task_DJS);//杂食 倒计时 停止定时器
        //Ext.TaskManager.stop(PublicObject.DW_Task_DJS);//订位 倒计时 停止定时器
        //Ext.TaskManager.stop(PublicObject.DWTS_Task_DJS);//订位堂食 倒计时 停止定时器

        var DateStart = Ext.getCmp('taskManagementId05').down('#DateStart').rawValue;
        var DateEnd = Ext.getCmp('taskManagementId05').down('#DateEnd').rawValue;
        var startdate = "";
        if (DateStart != "" && DateStart != undefined && DateStart != null) {
            startdate = DateStart;
        }
        var enddate = "";
        if (DateEnd != "" && DateEnd != undefined && DateEnd != null) {
            enddate = DateEnd;
        }

        var keyword = Ext.getCmp('taskManagementId05').down('#keyword').getValue();

        var TaskStatus = Ext.getCmp('taskManagementId05').down('#TaskStatus');
        var taskstatus = "";
        for (var i = 0; i < TaskStatus.items.length; i++) {
            if (TaskStatus.items.items[i].checked) {
                taskstatus += TaskStatus.items.items[i].name + ",";
            }
        }

        taskstatus = taskstatus.substr(0, taskstatus.lastIndexOf(","));

        var taskstatusStr = "";
        if (taskstatus == "") {
            taskstatusStr = "1,2,3,4,5";
        } else {
            taskstatusStr = taskstatus;
        }

        var params = {
            startdate: startdate,
            enddate: enddate,
            keyword: keyword,
            taskstatus: taskstatusStr,
            tasktype: 5,//1：堂食 2：外卖 3：杂食 4：订位 5：订位堂食
            RandomTag: Math.random()
        };
        var queryUrl = encodeURI("../api/ManagementSystem/GetTask");
        Ext.getStore("TaskStore").getProxy().url = queryUrl;
        Ext.getStore("TaskStore").getProxy().extraParams = params;
        try {
            Ext.getStore("TaskStore").currentPage = 1;
        } catch (e) {
        }//设置页面为1，防止多次刷新页面。比loadPage(1)好。这个不需要再次请求网络。用loadPage会发生多一次的网络请求。如果瞬间切换多个store的话，回调有可能紊乱。写在Store的load之前。
        Ext.getStore("TaskStore").load({
            callback: function () {
                //debugger;
                //Ext.TaskManager.start(PublicObject.DWTS_Task);//启动 30秒 定时器
                //Ext.TaskManager.start(PublicObject.DWTS_Task_DJS);//启动定时器 读秒
                //curCount05 = 30;
                //ManagementSystem.app.getTaskManagementController().TaskListCount();
            }
        });
    },
    ResetSearchTask: function () {

        var DateStart = Ext.getCmp('taskManagementId05').down('#DateStart');
        DateStart.setValue(currentDate()[1]);
        var DateEnd = Ext.getCmp('taskManagementId05').down('#DateEnd');
        DateEnd.setValue(currentDate()[1]);

        var keyword = Ext.getCmp('taskManagementId05').down('#keyword');
        keyword.setValue("");

        var TaskStatus01 = Ext.getCmp('taskManagementId05').down('#TaskStatus01');
        TaskStatus01.setValue(false);

        var TaskStatus02 = Ext.getCmp('taskManagementId05').down('#TaskStatus02');
        TaskStatus02.setValue(false);

        var TaskStatus03 = Ext.getCmp('taskManagementId05').down('#TaskStatus03');
        TaskStatus03.setValue(false);

        var TaskStatus04 = Ext.getCmp('taskManagementId05').down('#TaskStatus04');
        TaskStatus04.setValue(false);

        var TaskStatus05 = Ext.getCmp('taskManagementId05').down('#TaskStatus05');
        TaskStatus05.setValue(false);

        ManagementSystem.app.getTaskManagement05Controller().GetTask();
    },
    TaskDetailWin: function (thi, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        debugger;

        PublicObject.selectTask = record.raw;

        var win = "";
        if (e.getTarget().id == "TaskDetailWin05") {//详情

            debugger;

            win = Ext.create('ManagementSystem.view.TaskDetailWin', {
                title: '详情',
                listeners: {
                    render: function () {

                    },
                    show: function () {
                        debugger;
                        //PublicObject.selectTask = record.raw;

                        Ext.Ajax.request({
                            url: '../api/ManagementSystem/GetTaskMenu',
                            params: {
                                taskid: record.raw.id,
                                RandomTag: Math.random()
                            },
                            method: 'Post',
                            success: function (response, options) {
                                debugger;
                                var result = Ext.JSON.decode(response.responseText);
                                if (result.err) {
                                    Ext.MessageBox.alert('提示', result.err.message);
                                } else {
                                    debugger;

                                    var data = result.data;

                                    var tableStr =
                                        '<table><tr>' +
                                        '<td>菜品名称</td>' +
                                        '<td>单价</td>' +
                                        '<td>数量</td>' +
                                        '<td>金额</td>' +
                                        '</tr>';

                                    var TotalCount = 0;
                                    var TotalCountMoney = 0;

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

                                    $("#taskDetailWinTable02").append(tableStr+"</table>");

                                    Ext.getElementById("TotalCount").innerHTML = TotalCount;

                                    Ext.getElementById("TotalCountMoney").innerHTML = TotalCountMoney;

                                    Ext.getElementById("TransactionNumber").innerHTML = record.raw.id;

                                    Ext.getElementById("Cashier").innerHTML = PublicObject.CurrentUser.username;

                                    Ext.getElementById("PrintDate").innerHTML = record.raw.ordertime;

                                    if (record.raw.taskstatus == 1) {//已下单
                                        Ext.getCmp('taskDetailWinId').down('#OrderDeliveryIn').setVisible(false);
                                        Ext.getCmp('taskDetailWinId').down('#OrderComplete').setVisible(false);
                                        //Ext.getCmp('taskDetailWinId').down('#OrderPayment').setVisible(false);
                                    } else if (record.raw.taskstatus == 2) {//正在出单
                                        Ext.getCmp('taskDetailWinId').down('#OrderComplete').setVisible(false);
                                        //Ext.getCmp('taskDetailWinId').down('#OrderPayment').setVisible(false);
                                    } else if (record.raw.taskstatus == 3) {//派送中
                                        Ext.getCmp('taskDetailWinId').down('#OrderDeliveryIn').setVisible(false);
                                        //Ext.getCmp('taskDetailWinId').down('#OrderPayment').setVisible(false);
                                    } else if (record.raw.taskstatus == 4) {//订单完成
                                        Ext.getCmp('taskDetailWinId').down('#OrderDeliveryIn').setVisible(false);
                                        Ext.getCmp('taskDetailWinId').down('#OrderComplete').setVisible(false);
                                    } else if (record.raw.taskstatus == 5) {
                                        Ext.getCmp('taskDetailWinId').down('#OrderDeliveryIn').setVisible(false);
                                        Ext.getCmp('taskDetailWinId').down('#OrderComplete').setVisible(false);
                                        //Ext.getCmp('taskDetailWinId').down('#OrderPayment').setVisible(false);
                                    }

                                }
                            },
                            failure: function (response, options) {
                                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                            }
                        });

                    }
                }
            });
            win.show();

        } else if (e.getTarget().id == "PrintTaskDetail05") {//打印订单

            debugger;

            var tableid = record.raw.tableid;
            if (tableid != "" && tableid != undefined && tableid != null) {

                var paramsrecord = JSON.stringify(record);
                //直接调用 打印机
                Ext.getCmp('mainViewPort').getEl().mask("正在打印，请稍候");//遮罩
                Ext.Ajax.request({
                    url: '../api/ManagementSystem/OrderPrint',
                    params: {
                        record: paramsrecord,
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
                            debugger;

                            var data = result.data;

                            Ext.MessageBox.alert('提示', '打印成功');

                        }
                    },
                    failure: function (response, options) {
                        Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                        Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                    }
                });

            } else {

                debugger;

                PublicObject.TaskTable = 'GridPanel';

                win = Ext.create('ManagementSystem.view.TaskTableWin');
                win.show();

            }

        } else if (e.getTarget().id == "CancelTaskDetail05") {//取消订单

            //debugger;

            Ext.MessageBox.confirm("提示", "是否确定取消订单？", function (btn) {
                if (btn == "yes") {

                    //debugger;

                    Ext.getCmp('mainViewPort').getEl().mask("正在操作，请稍候");//遮罩
                    Ext.Ajax.request({
                        url: '../api/ManagementSystem/TaskCancel',
                        params: {
                            id: record.raw.id,
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
                                //debugger;

                                //var data = result.data;

                                Ext.MessageBox.alert("提示", "取消订单成功！");

                            }

                            Ext.getCmp("taskManagementId05").getStore("TaskStore").reload();

                            ManagementSystem.app.getTaskManagementController().TaskListCount();

                        },
                        failure: function (response, options) {
                            Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                        }
                    });

                }
            });

        } else if (e.getTarget().id == "PaymentTaskDetail05") {//现金支付

            win = Ext.create("ManagementSystem.view.TaskCashPaymentWin");
            win.show();

            //Ext.MessageBox.confirm("提示", "是否确定进行现金支付？", function (btn) {
            //    if (btn == "yes") {
            //
            //        Ext.getCmp('mainViewPort').getEl().mask("正在操作，请稍候");//遮罩
            //        Ext.Ajax.request({
            //            url: '../api/ManagementSystem/PaymentTaskDetail',
            //            params: {
            //                id: record.raw.id,
            //                RandomTag: Math.random()
            //            },
            //            method: 'Post',
            //            success: function (response, options) {
            //                debugger;
            //                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
            //                var result = Ext.JSON.decode(response.responseText);
            //                if (result.err) {
            //                    Ext.MessageBox.alert('提示', result.err.message);
            //                } else {
            //                    debugger;
            //
            //                    var data = result.data;
            //
            //                    Ext.getCmp("taskManagementId05").getStore("TaskStore").reload();
            //
            //                }
            //            },
            //            failure: function (response, options) {
            //                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
            //                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            //            }
            //        });
            //
            //    }
            //});

        }else if(e.getTarget().id=="PrintStatement"){//结账单打印
            var paramsP = JSON.stringify(record.raw);
            Ext.getCmp('mainViewPort').getEl().mask("正在打印，请稍候");//遮罩
            Ext.Ajax.request({
                url: '../api/ManagementSystem/getPrintStatement',
                params: {
                    record: paramsP,
                    RandomTag: Math.random()
                },
                method: 'Post',
                success: function (response, options) {
                    debugger;
                    Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.err) {
                        Ext.MessageBox.alert('提示', result.err);
                    } else {
                        var data = result.data;
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
});