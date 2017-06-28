/**订位订单**/
Ext.define('ManagementSystem.controller.TaskManagement04', {
    extend: 'Ext.app.Controller',
    views: [
        'TaskManagement04'
        , 'components.field.DateTime'
        , 'TaskCashPaymentWin'
    ],
    stores: [
        'TaskStore'
        , 'MenuClassStore02'
    ],
    init: function () {
        this.control({
            'taskManagement04': {
                'render': this.GetTask,
                'cellclick': this.TaskDetailWin
            },
            'taskManagement04 #BtnSearch': {
                'click': this.GetTask
            },
            'taskManagement04 #BtnReset': {
                'click': this.ResetSearchTask
            },
            'taskManagement04 #BtnRefresh': {
                'click': this.GetTask
            }
        });
    },
    GetTask: function () {

        //debugger;

        Ext.TaskManager.stop(PublicObject.TS_Task);//堂食 停止定时器
        Ext.TaskManager.stop(PublicObject.WM_Task);//外卖 停止定时器
        Ext.TaskManager.stop(PublicObject.ZS_Task);//杂食 停止定时器
        //Ext.TaskManager.stop(PublicObject.DW_Task);//订位 停止定时器
        //Ext.TaskManager.stop(PublicObject.DWTS_Task);//订位堂食 停止定时器
        //
        Ext.TaskManager.stop(PublicObject.TS_Task_DJS);//堂食 倒计时 停止定时器
        Ext.TaskManager.stop(PublicObject.WM_Task_DJS);//外卖 倒计时 停止定时器
        Ext.TaskManager.stop(PublicObject.ZS_Task_DJS);//杂食 倒计时 停止定时器
        //Ext.TaskManager.stop(PublicObject.DW_Task_DJS);//订位 倒计时 停止定时器
        //Ext.TaskManager.stop(PublicObject.DWTS_Task_DJS);//订位堂食 倒计时 停止定时器

        var DateStart = Ext.getCmp('taskManagementId04').down('#DateStart').rawValue;
        var DateEnd = Ext.getCmp('taskManagementId04').down('#DateEnd').rawValue;
        var startdate = "";
        if (DateStart != "" && DateStart != undefined && DateStart != null) {
            startdate = DateStart;
        }
        var enddate = "";
        if (DateEnd != "" && DateEnd != undefined && DateEnd != null) {
            enddate = DateEnd;
        }

        var keyword = Ext.getCmp('taskManagementId04').down('#keyword').getValue();

        var TaskStatus = Ext.getCmp('taskManagementId04').down('#TaskStatus');
        var taskstatus = "";
        for (var i = 0; i < TaskStatus.items.length; i++) {
            if (TaskStatus.items.items[i].checked) {
                taskstatus += TaskStatus.items.items[i].name + ",";
            }
        }

        taskstatus = taskstatus.substr(0, taskstatus.lastIndexOf(","));

        var taskstatusStr = "";
        if (taskstatus == "") {
            taskstatusStr = "-1,1,2";
        } else {
            taskstatusStr = taskstatus;
        }

        var params = {
            startdate: startdate,
            enddate: enddate,
            keyword: keyword,
            tableid:null,
            taskstatus: taskstatusStr,
            tasktype: 4,//1：堂食 2：外卖 3：杂食 4：订位
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
                Ext.TaskManager.start(PublicObject.DW_Task);//启动 30秒 定时器
                Ext.TaskManager.start(PublicObject.DW_Task_DJS);//启动定时器 读秒
                curCount04 = 30;
            }
        });
    },
    ResetSearchTask: function () {

        var DateStart = Ext.getCmp('taskManagementId04').down('#DateStart');
        DateStart.setValue(currentDate()[1]);
        var DateEnd = Ext.getCmp('taskManagementId04').down('#DateEnd');
        DateEnd.setValue(currentDate()[1]);

        var keyword = Ext.getCmp('taskManagementId04').down('#keyword');
        keyword.setValue("");
        var TaskStatus01 = Ext.getCmp('taskManagementId04').down('#TaskStatus01');
        TaskStatus01.setValue(false);

        var TaskStatus02 = Ext.getCmp('taskManagementId04').down('#TaskStatus02');
        TaskStatus02.setValue(false);
        ManagementSystem.app.getTaskManagement04Controller().GetTask();
    },
    TaskDetailWin: function (thi, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        //debugger;

        PublicObject.selectTask = record.raw;
        //address: null
        //cashpayment: null
        //diliveryman: null
        //diningtime: null
        //dishids: null
        //evmt: null
        //isprint: 1
        //mobile: "18571523673"
        //openid: "oQMKotxs3uH3eSMevIWEskT8yYO0"
        //ordertabletime: "2016-10-08 13:00 00"
        //ordertime: "2016-10-08 10:18:30"
        //out_trade_no: null
        //pOrder: null
        //paymethod: null
        //peoplecount: 5
        //points: null
        //realname: "夏清"
        //remark: ""
        //reservationid: "1000335_D"
        //serviceids: null
        //sex: 0
        //sumoney: null
        //tableid: "4人桌"
        //taskstatus: 2
        //tasktype: 4
        var win = "";
        if (e.getTarget().id == "TaskDetailWin04") {//详情
            win = Ext.create('ManagementSystem.view.TaskOrderWin', {
                title: '详情',
                listeners: {
                    render: function () {

                    },
                    show: function () {
                        PublicObject.selectTask = record.raw;
                        var data = JSON.parse(record.raw.dishids);

                        document.getElementById("taskDetailWinTable01_td01").innerHTML="订位订单详情";
                        document.getElementById("ordertabletime").innerHTML=record.raw.ordertabletime;
                        document.getElementById("TransactionNumber").innerHTML = record.raw.id;
                        document.getElementById("realname").innerHTML=record.raw.realname;
                        //document.getElementById("Cashier").innerHTML = PublicObject.CurrentUser.username;
                        document.getElementById("mobile").innerHTML=record.raw.mobile;
                        document.getElementById("TableId").innerHTML = record.raw.tableid;
                        document.getElementById("peoplecount").innerHTML=record.raw.peoplecount;
                        document.getElementById("PrintDate").innerHTML = record.raw.ordertime;
                        document.getElementById("remark").innerHTML=record.raw.remark;
                        var sexStr=record.raw.sex==0 ? "男" : "女";
                        var value=record.raw.taskstatus;
                        var statusStr="";
                        if (value != "" && value != null && value != undefined) {
                            if (value == 1) {
                                statusStr = "未到达";
                            } else if (value == 2) {
                                statusStr = "已到达";
                            } else if (value == -1) {
                                statusStr = "订单已取消";
                            }
                        }
                        document.getElementById("taskstatus").innerHTML=statusStr;
                        document.getElementById("sex").innerHTML=sexStr;
                    }
                }
            });
            win.show();
        }
        else if (e.getTarget().id == "PrintTaskDetail04") {//打印订单
            //debugger;
            var paramsrecord = JSON.stringify(record.raw);
            //直接调用 打印机
            Ext.getCmp('mainViewPort').getEl().mask("正在打印，请稍候");//遮罩
            Ext.Ajax.request({
                url: '../api/ManagementSystem/orderPrintDepart',
                params: {
                    record: paramsrecord,
                    isprint:1,
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

                        var data = result.data;

                        Ext.MessageBox.alert('提示', '打印成功');

                        //Ext.getCmp('taskDetailWinId').destroy();
                        //
                        ////Ext.getCmp("taskManagementId").getStore("TaskStore").reload();
                        //

                        Ext.getCmp("taskManagementId04").getStore("TaskStore").reload();

                        ManagementSystem.app.getTaskManagementController().TaskListCount();

                    }
                },
                failure: function (response, options) {debugger;
                    Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                    Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                }
            });

        }
        else if (e.getTarget().id == "CancelTaskDetail04") {//取消订单
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

                            Ext.getCmp("taskManagementId04").getStore("TaskStore").reload();

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
        else if(e.getTarget().id=="arriveBtn"){
            Ext.MessageBox.confirm('确定',"确定客户已到达？",function(btn){
                if(btn=="yes"){
                    Ext.getCmp('mainViewPort').getEl().mask("正在操作，请稍候");//遮罩
                    Ext.Ajax.request({
                        url: '../api/ManagementSystem/arriveEvent',
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
                                Ext.MessageBox.alert("提示", "操作成功！");
                            }

                            Ext.getCmp("taskManagementId04").getStore("TaskStore").reload();

                            ManagementSystem.app.getTaskManagementController().TaskListCount();

                        },
                        failure: function (response, options) {
                            Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                        }
                    });
                }
            })
        }
    }
});