/**杂食订单**/
Ext.define('ManagementSystem.controller.TaskManagement03', {
    extend: 'Ext.app.Controller',
    views: [
        'TaskManagement03'
        , 'components.field.DateTime'
        , 'TaskCashPaymentWin'
    ],
    stores: [
        'TaskStore'
    ],
    init: function () {
        this.control({
            'taskManagement03': {
                'render': this.GetTask,
                'cellclick': this.TaskDetailWin
            },
            'taskManagement03 #BtnSearch': {
                'click': this.GetTask
            },
            'taskManagement03 #BtnReset': {
                'click': this.ResetSearchTask
            },
            'taskManagement03 #BtnRefresh': {
                'click': this.GetTask
            }
        });
    },
    GetTask: function () {

        //debugger;

        Ext.TaskManager.stop(PublicObject.TS_Task);//堂食 停止定时器
        Ext.TaskManager.stop(PublicObject.WM_Task);//外卖 停止定时器
        //Ext.TaskManager.stop(PublicObject.ZS_Task);//杂食 停止定时器
        Ext.TaskManager.stop(PublicObject.DW_Task);//订位 停止定时器
        //Ext.TaskManager.stop(PublicObject.DWTS_Task);//订位堂食 停止定时器
        //
        Ext.TaskManager.stop(PublicObject.TS_Task_DJS);//堂食 倒计时 停止定时器
        Ext.TaskManager.stop(PublicObject.WM_Task_DJS);//外卖 倒计时 停止定时器
        //Ext.TaskManager.stop(PublicObject.ZS_Task_DJS);//杂食 倒计时 停止定时器
        Ext.TaskManager.stop(PublicObject.DW_Task_DJS);//订位 倒计时 停止定时器
        //Ext.TaskManager.stop(PublicObject.DWTS_Task_DJS);//订位堂食 倒计时 停止定时器

        var DateStart = Ext.getCmp('taskManagementId03').down('#DateStart').rawValue;
        var DateEnd = Ext.getCmp('taskManagementId03').down('#DateEnd').rawValue;
        var startdate = "";
        if (DateStart != "" && DateStart != undefined && DateStart != null) {
            startdate = DateStart;
        }
        var enddate = "";
        if (DateEnd != "" && DateEnd != undefined && DateEnd != null) {
            enddate = DateEnd;
        }

        var keyword = Ext.getCmp('taskManagementId03').down('#keyword').getValue();

        var TaskStatus = Ext.getCmp('taskManagementId03').down('#TaskStatus');
        var taskstatus = "";
        for (var i = 0; i < TaskStatus.items.length; i++) {
            if (TaskStatus.items.items[i].checked) {
                taskstatus += TaskStatus.items.items[i].name + ",";
            }
        }

        taskstatus = taskstatus.substr(0, taskstatus.lastIndexOf(","));

        var taskstatusStr = "";
        if (taskstatus == "") {
            taskstatusStr = "-1,1,2,3,4,5";
        } else {
            taskstatusStr = taskstatus;
        }

        var params = {
            startdate: startdate,
            enddate: enddate,
            keyword: keyword,
            taskstatus: taskstatusStr,
            tableid:null,
            tasktype: 3,//1：堂食 2：外卖 3：杂食 4：订位
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
                Ext.TaskManager.start(PublicObject.ZS_Task);//启动 30秒 定时器
                Ext.TaskManager.start(PublicObject.ZS_Task_DJS);//启动定时器 倒计时
                curCount03 = 30;
            }
        });
    },
    ResetSearchTask: function () {

        var DateStart = Ext.getCmp('taskManagementId03').down('#DateStart');
        DateStart.setValue(currentDate()[1]);
        var DateEnd = Ext.getCmp('taskManagementId03').down('#DateEnd');
        DateEnd.setValue(currentDate()[1]);

        var keyword = Ext.getCmp('taskManagementId03').down('#keyword');
        keyword.setValue("");

        var TaskStatus01 = Ext.getCmp('taskManagementId03').down('#TaskStatus01');
        TaskStatus01.setValue(false);

        var TaskStatus02 = Ext.getCmp('taskManagementId03').down('#TaskStatus02');
        TaskStatus02.setValue(false);

        var TaskStatus03 = Ext.getCmp('taskManagementId03').down('#TaskStatus03');
        TaskStatus03.setValue(false);

        var TaskStatus04 = Ext.getCmp('taskManagementId03').down('#TaskStatus04');
        TaskStatus04.setValue(false);

        var TaskStatus05 = Ext.getCmp('taskManagementId03').down('#TaskStatus05');
        TaskStatus05.setValue(false);

        var TaskStatus06 = Ext.getCmp('taskManagementId03').down('#TaskStatus06');
        TaskStatus06.setValue(false);
        ManagementSystem.app.getTaskManagement03Controller().GetTask();
    },
    TaskDetailWin: function (thi, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        //debugger;

        PublicObject.selectTask = record.raw;

        var win = "";
        if (e.getTarget().id == "TaskDetailWin03") {//详情
            win = Ext.create('ManagementSystem.view.TaskDetailWin', {
                title: '详情',
                listeners: {
                    render: function () {

                    },
                    show: function () {
                        //PublicObject.selectTask = record.raw;

                        Ext.Ajax.request({
                            url: '../api/ManagementSystem/GetTaskMenu',
                            params: {
                                taskid: record.raw.id,
                                RandomTag: Math.random()
                            },
                            method: 'Post',
                            success: function (response, options) {
                                //debugger;
                                var result = Ext.JSON.decode(response.responseText);
                                if (result.err) {
                                    Ext.MessageBox.alert('提示', result.err.message);
                                } else {
                                    var data = result.data;
                                    var realname=record.raw.realname,
                                        address=record.raw.address,
                                        mobile=record.raw.mobile,
                                        peoplecount=record.raw.peoplecount;
                                    var tableAdd=
                                        '<tr>' +
                                        '<td colspan="4">联系人：<span id="">'+realname+'</span></td>' +
                                        '</tr>'+
                                        '<tr>' +
                                        '<td colspan="4">手机号码：<span id="">'+mobile+'</span></td>' +
                                        '</tr>'+
                                        '<tr>' +
                                        '<td colspan="4">送餐地址：<span id="">'+address+'</span></td>' +
                                        '</tr>';
                                    $("#taskDetailWinTable01").append(tableAdd);
                                    var tableStr =
                                        '<table><thead><tr>' +
                                        '<td>菜品名称</td>' +
                                        '<td>单价</td>' +
                                        '<td>数量</td>' +
                                        '<td>金额</td>' +
                                        '</tr></thead><tbody>';

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
                                    var serviceData = JSON.parse(record.raw.serviceids);
                                    if(serviceData){
                                        for (var j = 0; j < serviceData.length; j++) {
                                            tableStr +=
                                                '<tr>' +
                                                '<td>' + serviceData[j].servicename + '</td>' +
                                                '<td>' + serviceData[j].price + '</td>' +
                                                '<td>'  +serviceData[j].count+'</td>' +
                                                '<td >'  +serviceData[j].price * serviceData[j].count+'</td>' +
                                                '</tr>';
                                            TotalCount += parseInt(serviceData[j].count);
                                            TotalCountMoney += serviceData[j].price * serviceData[j].count;
                                        }
                                    }
                                    var taskstatus=record.raw.taskstatus,
                                        paymethod=record.raw.paymethod;
                                    var statusStr = "",payStr="未知";
                                    switch(taskstatus){
                                        case -1:
                                            statusStr="订单已取消";
                                            break;
                                        case 1:
                                            statusStr="已下单";
                                            break;
                                        case 2:
                                            statusStr="已打印";
                                            break;
                                        case 3:
                                            statusStr="派送中";
                                            break;
                                        case 4:
                                            statusStr="派送中";
                                            break;
                                        case 5:
                                            statusStr="订单完成";
                                            break;
                                    }
                                    if (paymethod == 0) {
                                        payStr = "未支付";
                                    } else if (paymethod == 1) {
                                        payStr = "微信支付";
                                    } else if (paymethod == 2) {
                                        payStr = "现金支付";
                                    }
                                    var tableStatus=
                                        '<tr>' +
                                        '<td>状态：</td>' +
                                        '<td>'+ statusStr+ '</td>'+
                                        '<td>支付状态：</td>' +
                                        '<td >'+payStr+'</td>' +
                                        '</tr>';
                                    $("#taskDetailWinTable02").append(tableStr+"</tbody></table>");
                                    $('#taskDetailWinTable03').append(tableStatus);
                                    Ext.getElementById("TotalCount").innerHTML = TotalCount;
                                    Ext.getElementById("TotalCountMoney").innerHTML = TotalCountMoney.toFixed(2);
                                    Ext.getElementById("TransactionNumber").innerHTML = record.raw.id;
                                    //Ext.getElementById("Cashier").innerHTML = PublicObject.CurrentUser.username;
                                    Ext.getElementById("TableId").innerHTML = record.raw.tableid;
                                    Ext.getElementById("showTime").innerHTML="配送时间：";
                                    Ext.getElementById("dishingTime").innerHTML =record.raw.diningtime;
                                    Ext.getElementById("PrintDate").innerHTML =record.raw.ordertime;
                                    if(record.raw.paymethod===0){
                                        Ext.getCmp('taskDetailWinId').down('#OrderPrint').hide();
                                        Ext.getCmp('taskDetailWinId').down('#OrderEnter').show();
                                    }else{
                                        Ext.getCmp('taskDetailWinId').down('#OrderPrint').show();
                                        Ext.getCmp('taskDetailWinId').down('#OrderEnter').hide();
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
        } else if (e.getTarget().id == "PrintTaskDetail03") {//打印订单

            var paramsrecord =record.raw;
            if( paramsrecord.paymethod===0){
                Ext.MessageBox.alert('提示',"该订单暂未支付！请选择其他订单!");
                return;
            }
            ManagementSystem.app.getTaskManagementController().printfn(paramsrecord);

        } else if (e.getTarget().id == "CancelTaskDetail03") {//取消订单

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
                                Ext.MessageBox.alert("提示", "取消订单成功！");
                            }
                            Ext.getCmp("taskManagementId03").getStore("TaskStore").reload();
                            ManagementSystem.app.getTaskManagementController().TaskListCount();
                        },
                        failure: function (response, options) {
                            Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                        }
                    });
                }
            });
        }
    }
});