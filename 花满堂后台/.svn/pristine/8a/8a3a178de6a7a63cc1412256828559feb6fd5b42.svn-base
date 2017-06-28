Ext.define('ManagementSystem.controller.OrderStatistics', {
    extend: 'Ext.app.Controller',
    views: [
        'OrderStatistics'
        , 'components.field.DateTime'
    ],
    stores: [
        'TaskStore'
    ],
    init: function () {
        this.control({
            'orderStatistics': {
                'render': this.GetOrderStatistics
            },
            'orderStatistics #BtnSearch': {
                'click': this.GetOrderStatistics
            },
            'orderStatistics #BtnReset': {
                'click': this.ResetSearchOrderStatistics
            },
            'orderStatistics #BtnExport': {
                'click': this.ExportOrderStatistics
            }
        });
    },
    GetOrderStatistics: function () {

        //debugger;

        var DateStart = Ext.getCmp('orderStatisticsId').down('#DateStart').rawValue;
        var DateEnd = Ext.getCmp('orderStatisticsId').down('#DateEnd').rawValue;
        var startdate = "";
        if (DateStart != "" && DateStart != undefined && DateStart != null) {
            startdate = DateStart;
        }
        var enddate = "";
        if (DateEnd != "" && DateEnd != undefined && DateEnd != null) {
            enddate = DateEnd;
        }

        var keyword = Ext.getCmp('orderStatisticsId').down('#keyword').getValue();

        var TaskType = Ext.getCmp('orderStatisticsId').down('#TaskType');
        var tasktype = "";
        for (var k = 0; k < TaskType.items.length; k++) {
            if (TaskType.items.items[k].checked) {
                tasktype += TaskType.items.items[k].name + ",";
            }
        }

        tasktype = tasktype.substr(0, tasktype.lastIndexOf(","));

        var tasktypeStr = "";
        if (tasktype == "") {
            tasktypeStr = "1,2,3,4,5";
        } else {
            tasktypeStr = tasktype;
        }

        var TaskStatus = Ext.getCmp('orderStatisticsId').down('#TaskStatus');
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

        var PayMethod = Ext.getCmp('orderStatisticsId').down('#PayMethod');
        var paymethod = "";
        for (var j = 0; j < PayMethod.items.length; j++) {
            if (PayMethod.items.items[j].checked) {
                paymethod += PayMethod.items.items[j].name + ",";
            }
        }

        paymethod = paymethod.substr(0, paymethod.lastIndexOf(","));

        var paymethodStr = "";
        if (paymethod == "") {
            paymethodStr = "0,1,2";
        } else {
            paymethodStr = paymethod;
        }

        var params = {
            startdate: startdate,
            enddate: enddate,
            keyword: keyword,
            tasktype: tasktypeStr,//1：堂食 2：外卖 3：杂食 4：订位 5：订位点餐
            taskstatus: taskstatusStr,
            paymethod: paymethodStr,
            RandomTag: Math.random()
        };

        var queryUrl = encodeURI("../api/ManagementSystem/GetOrderStatistics");
        Ext.getStore("TaskStore").getProxy().url = queryUrl;
        Ext.getStore("TaskStore").getProxy().extraParams = params;
        try {
            Ext.getStore("TaskStore").currentPage = 1;
        } catch (e) {
        }//设置页面为1，防止多次刷新页面。比loadPage(1)好。这个不需要再次请求网络。用loadPage会发生多一次的网络请求。如果瞬间切换多个store的话，回调有可能紊乱。写在Store的load之前。
        Ext.getStore("TaskStore").load();
    },
    ResetSearchOrderStatistics: function () {

        var DateStart = Ext.getCmp('orderStatisticsId').down('#DateStart');
        DateStart.setValue(currentDate()[0]);
        var DateEnd = Ext.getCmp('orderStatisticsId').down('#DateEnd');
        DateEnd.setValue(currentDate()[1]);

        var keyword = Ext.getCmp('orderStatisticsId').down('#keyword');
        keyword.setValue("");

        var TaskType01 = Ext.getCmp('orderStatisticsId').down('#TaskType01');
        TaskType01.setValue(false);

        var TaskType02 = Ext.getCmp('orderStatisticsId').down('#TaskType02');
        TaskType02.setValue(false);

        var TaskType03 = Ext.getCmp('orderStatisticsId').down('#TaskType03');
        TaskType03.setValue(false);

        var TaskType04 = Ext.getCmp('orderStatisticsId').down('#TaskType04');
        TaskType04.setValue(false);

        var TaskType05 = Ext.getCmp('orderStatisticsId').down('#TaskType05');
        TaskType05.setValue(false);

        var TaskStatus01 = Ext.getCmp('orderStatisticsId').down('#TaskStatus01');
        TaskStatus01.setValue(false);

        var TaskStatus02 = Ext.getCmp('orderStatisticsId').down('#TaskStatus02');
        TaskStatus02.setValue(false);

        var TaskStatus03 = Ext.getCmp('orderStatisticsId').down('#TaskStatus03');
        TaskStatus03.setValue(false);

        var TaskStatus04 = Ext.getCmp('orderStatisticsId').down('#TaskStatus04');
        TaskStatus04.setValue(false);

        var TaskStatus05 = Ext.getCmp('orderStatisticsId').down('#TaskStatus05');
        TaskStatus05.setValue(false);

        var TaskStatus06 = Ext.getCmp('orderStatisticsId').down('#TaskStatus06');
        TaskStatus06.setValue(false);

        var PayMethod00 = Ext.getCmp('orderStatisticsId').down('#PayMethod00');
        PayMethod00.setValue(false);

        var PayMethod01 = Ext.getCmp('orderStatisticsId').down('#PayMethod01');
        PayMethod01.setValue(false);

        var PayMethod02 = Ext.getCmp('orderStatisticsId').down('#PayMethod02');
        PayMethod02.setValue(false);

        ManagementSystem.app.getOrderStatisticsController().GetOrderStatistics();
    },
    ExportOrderStatistics: function () {
        //debugger;

        var CurrentUser = PublicObject.CurrentUser;
        var realname = CurrentUser.realname;

        var keyword = Ext.getCmp('orderStatisticsId').down('#keyword').getValue();

        var _DateStart = Ext.getCmp('orderStatisticsId').down('#DateStart').rawValue;
        var _DateEnd = Ext.getCmp('orderStatisticsId').down('#DateEnd').rawValue;

        _DateStart = _DateStart + " 00:00:00";
        _DateEnd = _DateEnd + " 23:59:59";


        var _startdate = formatDate(new Date(_DateStart), "yyyyMMdd");
        var _enddate = formatDate(new Date(_DateEnd), "yyyyMMdd");


        var DateStart = Ext.getCmp('orderStatisticsId').down('#DateStart').rawValue;
        var DateEnd = Ext.getCmp('orderStatisticsId').down('#DateEnd').rawValue;
        var startdate = "";
        if (DateStart != "" && DateStart != undefined && DateStart != null) {
            startdate = DateStart;
        }
        var enddate = "";
        if (DateEnd != "" && DateEnd != undefined && DateEnd != null) {
            enddate = DateEnd;
        }

        var TaskType = Ext.getCmp('orderStatisticsId').down('#TaskType');
        var tasktype = "";
        for (var k = 0; k < TaskType.items.length; k++) {
            if (TaskType.items.items[k].checked) {
                tasktype += TaskType.items.items[i].name + ",";
            }
        }

        tasktype = tasktype.substr(0, tasktype.lastIndexOf(","));

        var tasktypeStr = "";
        if (tasktype == "") {
            tasktypeStr = "1,2,3,4,5";
        } else {
            tasktypeStr = tasktype;
        }

        var TaskStatus = Ext.getCmp('orderStatisticsId').down('#TaskStatus');
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

        var PayMethod = Ext.getCmp('orderStatisticsId').down('#PayMethod');
        var paymethod = "";
        for (var j = 0; j < PayMethod.items.length; j++) {
            if (PayMethod.items.items[j].checked) {
                paymethod += PayMethod.items.items[j].name + ",";
            }
        }

        paymethod = paymethod.substr(0, paymethod.lastIndexOf(","));

        var paymethodStr = "";
        if (paymethod == "") {
            paymethodStr = "0,1,2";
        } else {
            paymethodStr = paymethod;
        }

        var filename = _startdate + "-" + _enddate + "订单统计";
        var params = {
            filename: filename,
            startdate: startdate,
            enddate: enddate,
            keyword: keyword,
            tasktype: tasktypeStr,//1：堂食 2：外卖 3：杂食 4：订位 5：订位点餐
            taskstatus: taskstatusStr,
            paymethod: paymethodStr,
            RandomTag: Math.random()
        };
        Ext.getCmp('mainViewPort').getEl().mask("正在获取Excel下载链接，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/ManagementSystem/GetOrderStatisticsExcelUrl',
            params: params,
            method: 'Post',
            success: function (response) {
                //debugger;
                Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
                var rspText = Ext.JSON.decode(response.responseText);
                //console.log(rspText);
                if (rspText.success == true) {
                    var data = rspText.data;
                    Ext.MessageBox.confirm('确认','是否确定导出excel文件',function(btn){
                        if(btn=='yes'){
                            window.open('../' + data);
                        }
                    });
                } else if(rspText.err.code=="EBUSY") {
                    Ext.MessageBox.alert('抱歉',"请先关闭excel软件！");}
                else{
                    Ext.MessageBox.alert("抱歉", "下载链接获取错误，请刷新页面后重试");
                }
            },
            failure: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
    }
});