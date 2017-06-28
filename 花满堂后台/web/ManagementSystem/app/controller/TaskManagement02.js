/**外卖订单**/
Ext.define('ManagementSystem.controller.TaskManagement02', {
    extend: 'Ext.app.Controller',
    views: [
        'TaskManagement02'
        , 'TaskDetailWin'
        , 'components.field.DateTime'
        , 'TaskCashPaymentWin'
    ],
    stores: [
        'TaskStore'
        , 'MenuClassStore02','menuCurrentStore','DepartmentStore'
    ],
    init: function () {
        this.control({
            'taskManagement02': {
                'render': this.GetTask,
                'cellclick': this.TaskDetailWin
            },
            'taskManagement02 #BtnSearch': {
                'click': this.GetTask
            },
            'taskManagement02 #BtnReset': {
                'click': this.ResetSearchTask
            },
            'taskManagement02 #BtnRefresh': {
                'click': this.GetTask
            }
            //'taskDetailWin #OrderDeliveryIn': {//订单派送中
            //    'click': this.OrderDeliveryIn
            //},
            //'taskDetailWin #OrderComplete': {//订单已完成
            //    'click': this.OrderComplete
            //},
            //'taskDetailWin #OrderPrint': {//打印
            //    'click': this.OrderPrint
            //}
        });
    },
    GetTask: function () {

        //debugger;

        Ext.TaskManager.stop(PublicObject.TS_Task);//堂食 停止定时器
        //Ext.TaskManager.stop(PublicObject.WM_Task);//外卖 停止定时器
        Ext.TaskManager.stop(PublicObject.ZS_Task);//杂食 停止定时器
        Ext.TaskManager.stop(PublicObject.DW_Task);//订位 停止定时器
        //Ext.TaskManager.stop(PublicObject.DWTS_Task);//订位堂食 停止定时器
        //
        Ext.TaskManager.stop(PublicObject.TS_Task_DJS);//堂食 倒计时 停止定时器
        //Ext.TaskManager.stop(PublicObject.WM_Task_DJS);//外卖 倒计时 停止定时器
        Ext.TaskManager.stop(PublicObject.ZS_Task_DJS);//杂食 倒计时 停止定时器
        Ext.TaskManager.stop(PublicObject.DW_Task_DJS);//订位 倒计时 停止定时器
        //Ext.TaskManager.stop(PublicObject.DWTS_Task_DJS);//订位堂食 倒计时 停止定时器

        var DateStart = Ext.getCmp('taskManagementId02').down('#DateStart').rawValue;
        var DateEnd = Ext.getCmp('taskManagementId02').down('#DateEnd').rawValue;
        var startdate = "";
        if (DateStart != "" && DateStart != undefined && DateStart != null) {
            startdate = DateStart;
        }
        var enddate = "";
        if (DateEnd != "" && DateEnd != undefined && DateEnd != null) {
            enddate = DateEnd;
        }

        var keyword = Ext.getCmp('taskManagementId02').down('#keyword').getValue();

        var TaskStatus = Ext.getCmp('taskManagementId02').down('#TaskStatus');
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
            tasktype: 2,//1：堂食 2：外卖 3：杂食 4：订位
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
                Ext.TaskManager.start(PublicObject.WM_Task);//启动定时器 30秒
                Ext.TaskManager.start(PublicObject.WM_Task_DJS);//启动定时器 倒计时
                curCount02 = 30;
            }
        });
    },
    ResetSearchTask: function () {

        var DateStart = Ext.getCmp('taskManagementId02').down('#DateStart');
        DateStart.setValue(currentDate()[1]);
        var DateEnd = Ext.getCmp('taskManagementId02').down('#DateEnd');
        DateEnd.setValue(currentDate()[1]);

        var keyword = Ext.getCmp('taskManagementId02').down('#keyword');
        keyword.setValue("");

        var TaskStatus01 = Ext.getCmp('taskManagementId02').down('#TaskStatus01');
        TaskStatus01.setValue(false);

        var TaskStatus02 = Ext.getCmp('taskManagementId02').down('#TaskStatus02');
        TaskStatus02.setValue(false);

        //var TaskStatus03 = Ext.getCmp('taskManagementId02').down('#TaskStatus03');
        //TaskStatus03.setValue(false);

        var TaskStatus04 = Ext.getCmp('taskManagementId02').down('#TaskStatus04');
        TaskStatus04.setValue(false);

        var TaskStatus05 = Ext.getCmp('taskManagementId02').down('#TaskStatus05');
        TaskStatus05.setValue(false);
        var TaskStatus06 = Ext.getCmp('taskManagementId02').down('#TaskStatus06');
        TaskStatus06.setValue(false);
        ManagementSystem.app.getTaskManagement02Controller().GetTask();
    },
    TaskDetailWin: function (thi, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        //debugger;

        PublicObject.selectTask = record.raw;

        var win = "";
        if (e.getTarget().id == "TaskDetailWin02") {//详情
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
        }
        else if (e.getTarget().id == "PrintTaskDetail02") {//打印
            var paramsrecord =record.raw;
            if( paramsrecord.paymethod===0){
                Ext.MessageBox.alert('提示',"该订单暂未支付！请选择其他订单!");
                return;
            }
            ManagementSystem.app.getTaskManagementController().printfn(paramsrecord);
            /**if(paramsrecord.isprint!==0){
                var winR = Ext.create('ManagementSystem.view.RepeatPrintWin',{
                    items:[
                        {
                            xtype:'panel',
                            region:'north',
                            layout:'column',
                            bodyPadding: 10,
                            items:[
                                {
                                    xtype:'panel',
                                    border:false,
                                    items:[
                                        {
                                            xtype:'textfield',
                                            labelWidth:400,
                                            itemId:'pwd',
                                            inputType: 'password',
                                            fieldLabel:'<b style="color:red;">该订单已打印过一次，重复打印会造成后厨重复制作，请输入密码后确认</b>',
                                            column:0.99
                                        }
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: '桌位号*',
                                    labelWidth:50,
                                    width:120,
                                    itemId: 'tableid',
                                    mode: 'local',
                                    triggerAction: 'all',
                                    multiSelect: false,//允许多选
                                    editable: false,
                                    value: "",
                                    displayField: 'tableName',
                                    hiddenName:'id',
                                    valueField: 'id',
                                    disabled: false,
                                    store: "tableStore",
                                    forceSelection : true,// 必须选择一个选项
                                    blankText : '请选择'// 该项如果没有选择，则提示错误信息,
                                },
                                {
                                    xtype: "checkboxgroup",
                                    itemId: '',
                                    width:250,
                                    column:2,
                                    fieldLabel: "&nbsp;&nbsp;选择打印",
                                    items: [
                                        {boxLabel: "总单", name: "1", itemId: 'allBills'},
                                        {boxLabel: "传菜单", name: "2", itemId: 'handBill'}
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    fieldLabel: '按出品部选择',
                                    labelWidth:76,
                                    width:160,
                                    itemId: 'departmentM',
                                    store: "DepartmentStore",
                                    mode: 'local',
                                    triggerAction: 'all',
                                    multiSelect: false,//允许多选
                                    editable: false,
                                    value: '',
                                    displayField: 'departmentName',
                                    hiddenName:'departmentName',
                                    disabled: false,
                                    forceSelection : true,// 必须选择一个选项
                                    blankText : '请选择',// 该项如果没有选择，则提示错误信息,
                                    valueField: 'id',
                                    listeners:{
                                        select:function(){
                                            var taskStore= Ext.getStore("menuCurrentStore").data.items;
                                            var arr=[];
                                            for(var i= 0,len=taskStore.length;i<len;i++){
                                                if(this.getValue()==taskStore[i].data.depart_fk){
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
                            xtype:'gridpanel',
                            region:'center',
                            border:false,
                            autoScroll:true,
                            itemId:'dishList',
                            store:'menuCurrentStore',
                            selModel:  Ext.create('Ext.selection.CheckboxModel', {
                                checkOnly:true//如果值为true，则只用点击checkbox列才能选中此条记录
                            }),
                            columns:[
                                {
                                    header:'menuid', flex: 1, dataIndex: 'menuid',hidden:true
                                },
                                {
                                    header:'菜品名称', flex: 1, dataIndex: 'dishname'
                                },
                                {
                                    header:'单价(元)', flex: 1, dataIndex: 'presentprice'
                                },
                                {
                                    header:'数量', flex: 1, dataIndex: 'menucount'
                                }
                                //,
                                //{
                                //    header:'出品部', flex: 1, dataIndex: 'depart_fk'
                                //}
                            ]
                        }
                    ],
                    listeners:{
                        render:function(){

                        },
                        show:function(){
                            //debugger;
                            Ext.getStore('tableStore').load();
                            if(record.raw.tasktype==2){
                                Ext.getCmp('repeatPrintWin').down('#tableid').setRawValue("外卖");
                                Ext.getCmp('repeatPrintWin').down('#tableid').setDisabled(true);
                            }
                            Ext.getStore("DepartmentStore").reload();
                            var menuCurrentStore =  Ext.getStore('menuCurrentStore');
                            menuCurrentStore.removeAll();
                            var dishidsCurrent=JSON.parse(record.raw.dishids);
                            for(var i= 0;i<dishidsCurrent.length;i++){
                                var rec={
                                    menuid:dishidsCurrent[i].menuid,
                                    dishname:dishidsCurrent[i].dishname,
                                    menucount:dishidsCurrent[i].menucount,
                                    presentprice:dishidsCurrent[i].presentprice,
                                    depart_fk:dishidsCurrent[i].depart_fk
                                };
                                menuCurrentStore.insert(menuCurrentStore.getCount(),rec);
                                menuCurrentStore.commitChanges();
                            }
                        }
                    }
                });
                winR.show();
            }else{
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
                            var data = result.data;
                            Ext.getCmp("taskManagementId").getStore("TaskStore").reload();
                            Ext.MessageBox.alert('提示', '打印成功');
                        }
                    },
                    failure: function (response, options) {
                        Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                        Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                    }
                });
            }**/
        }
        else if (e.getTarget().id == "CancelTaskDetail02") {//取消

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
                                Ext.MessageBox.alert("提示", "取消订单成功！");
                            }
                            Ext.getCmp("taskManagementId02").getStore("TaskStore").reload();
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