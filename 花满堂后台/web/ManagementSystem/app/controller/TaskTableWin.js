Ext.define('ManagementSystem.controller.TaskTableWin', {
    extend: 'Ext.app.Controller',
    views: [
        'TaskTableWin'
    ],
    init: function () {
        this.control({
            'taskTableWin #btnAdd': {
                'click': this.AddTaskTable
            },
            'taskTableWin #btnCancel': {
                'click': function () {
                    Ext.getCmp("taskTableWinId").destroy();
                }
            }
        });
    },
    AddTaskTable: function () {

        var tableid = Ext.getCmp("taskTableWinId").down("#tableid").getValue();

        var record = PublicObject.selectTask;

        Ext.MessageBox.confirm("提示", "是否确定对订单号：[<span style='color: red'>" + record.id + "</span>]输入餐位号，" +
        "餐位号为：[<span style='color: red'>" + tableid + "</span>]？", function (btn) {
            if (btn == "yes") {

                Ext.getCmp('mainViewPort').getEl().mask("正在操作，请稍候");//遮罩
                Ext.Ajax.request({
                    url: '../api/ManagementSystem/AddTaskTable',
                    params: {
                        id: record.id,
                        tableid: tableid,
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

                            var TaskTable = PublicObject.TaskTable;

                            if (TaskTable == "TaskDetailWin") {

                                Ext.getCmp("taskTableWinId").destroy();

                                Ext.getCmp("taskDetailWinId").destroy();

                            } else if (TaskTable == "GridPanel") {

                                Ext.getCmp("taskTableWinId").destroy();

                            }

                            var tasktype = record.tasktype;

                            if (tasktype == 1) {//堂食

                                Ext.getCmp("taskManagementId01").getStore("TaskStore").reload();

                            } else if (tasktype == 2) {//外卖

                                Ext.getCmp("taskManagementId02").getStore("TaskStore").reload();

                            } else if (tasktype == 3) {//杂食

                                Ext.getCmp("taskManagementId03").getStore("TaskStore").reload();

                            } else if (tasktype == 4) {//订位

                                Ext.getCmp("taskManagementId04").getStore("TaskStore").reload();

                            } else if (tasktype == 5) {//订位堂食

                                Ext.getCmp("taskManagementId05").getStore("TaskStore").reload();

                            }

                        }
                    },
                    failure: function (response, options) {
                        Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                        Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                    }
                });

            }
        });

    }
});