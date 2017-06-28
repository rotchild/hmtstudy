Ext.define('ManagementSystem.controller.TaskDetailWin', {
    extend: 'Ext.app.Controller',
    views: [
        'TaskDetailWin'
    ],
    stores: [
        'TaskStore',"DepartmentStore",'tableStore'
    ],
    init: function () {
        this.control({
            'taskDetailWin #OrderDeliveryIn': {//订单派送中
                'click': this.OrderDeliveryIn
            },
            'taskDetailWin #OrderComplete': {//订单已完成
                'click': this.OrderComplete
            },
            //'taskDetailWin #OrderPayment': {//现金支付
            //    'click': this.OrderPayment
            //},
            'taskDetailWin #OrderPrint': {//打印
                'click': this.OrderPrint
            }
        });
    },
    OrderDeliveryIn: function () {//订单派送
        //debugger;
        Ext.MessageBox.confirm("提示", "是否确定派送订单？", function (btn) {
            if (btn == "yes") {

                var record = PublicObject.selectTask;

                Ext.getCmp('mainViewPort').getEl().mask("正在操作，请稍候");//遮罩
                Ext.Ajax.request({
                    url: '../api/ManagementSystem/TaskDeliveryIn',
                    params: {
                        id: record.id,
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

                            Ext.getCmp('taskDetailWinId').destroy();

                            //Ext.getCmp("taskManagementId").getStore("TaskStore").reload();

                            Ext.getStore("TaskStore").reload();

                        }
                    },
                    failure: function (response, options) {
                        Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                        Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                    }
                });

            }
        });
    },
    OrderComplete: function () {//订单完成
        //debugger;
        Ext.MessageBox.confirm("提示", "是否确定完成订单？", function (btn) {
            if (btn == "yes") {

                var record = PublicObject.selectTask;

                Ext.getCmp('mainViewPort').getEl().mask("正在操作，请稍候");//遮罩
                Ext.Ajax.request({
                    url: '../api/ManagementSystem/TaskComplete',
                    params: {
                        id: record.id,
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

                            Ext.getCmp('taskDetailWinId').destroy();

                            //Ext.getCmp("taskManagementId").getStore("TaskStore").reload();

                            Ext.getStore("TaskStore").reload();

                        }
                    },
                    failure: function (response, options) {
                        Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                        Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                    }
                });

            }
        });
    },
    OrderPrint: function () {//订单打印
        //debugger;
        var record = PublicObject.selectTask;
        var paramsrecord = JSON.stringify(record);
        ManagementSystem.app.getTaskManagementController().printfn(record);
        /**if(record.isprint!==0){
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
                                fieldLabel: '桌位号',
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
                            },
                            {
                                header:'出品部', flex: 1, dataIndex: 'depart_fk'
                            }
                        ]
                    }
                ],
                listeners:{
                    render:function(){

                    },
                    show:function(){
                        debugger;
                        Ext.getStore('tableStore').load();
                        Ext.getCmp('repeatPrintWin').down('#tableid').setValue(record.tableid);
                        if(record.tasktype==2){
                            Ext.getCmp('repeatPrintWin').down('#tableid').setValue("外卖");
                            Ext.getCmp('repeatPrintWin').down('#tableid').setDisabled(true);
                        }
                        Ext.getStore("DepartmentStore").load();
                        var menuCurrentStore =  Ext.getStore('menuCurrentStore');
                        menuCurrentStore.removeAll();
                        var dishidsCurrent=JSON.parse(record.dishids);
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
        }**/
        /**else{
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
});