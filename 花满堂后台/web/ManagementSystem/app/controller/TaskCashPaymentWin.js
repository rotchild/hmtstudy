Ext.define('ManagementSystem.controller.TaskCashPaymentWin', {
    extend: 'Ext.app.Controller',
    views: [
        'TaskCashPaymentWin'
    ],
    init: function () {
        this.control({
            'taskCashPaymentWin #btnAdd': {
                'click': this.AddTaskCashPayment
            },
            'taskCashPaymentWin #btnCancel': {
                'click': function () {
                    Ext.getCmp("taskCashPaymentWinId").destroy();
                }
            }
        });
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
                            debugger;

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

    }
});