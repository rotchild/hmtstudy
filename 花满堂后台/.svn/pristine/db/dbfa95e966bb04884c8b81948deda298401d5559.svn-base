/**
 * Created by Administrator on 2016/10/20.
 * 订位详情
 */
Ext.define('ManagementSystem.view.TaskOrderWin', {
    extend: 'Ext.Window',
    xtype: 'taskOrderWin',
    id: 'taskOrderWin',
    modal: true,
    width: 340,
    height: 500,
    bodyStyle: 'background:#ffffff;',
    autoScroll: true,
    plain: false,
    layout: 'border',
    html: '<div style="width: 100%;padding: 5px;font-size: 14px;background: #FFFFFF" id="taskDetailWinDiv">' +
    '<div style="width: 100%;padding: 5px;" id="taskDetailWinDiv01">' +
    '<table cellpadding="0" cellspacing="0" border="0" style="padding: 5px;width: 100%;" id="taskDetailWinTable01">' +
    '<tr>' +
    '<td colspan="4" id="taskDetailWinTable01_td01"><h3>订位订单详情</h3></td>' +
    '</tr>' +
    '<tr>' +
    '<td>订&nbsp;单&nbsp;号：</td><td><span id="TransactionNumber"></span></td>' +
    '<td></td>' +
    '</tr>' +
    '<tr>' +
    '<td>下单时间：</td><td colspan="3"><span id="PrintDate"></span></td>' +
    '</tr>' +
    '<tr>' +
    '<td>就餐时间：</td><td colspan="3"><span id="ordertabletime"></span></td>' +
    '</tr>' +
    '<td>联&nbsp;系&nbsp;人：</td><td colspan="3"><span id="realname"></span></td>' +
    '</tr>' +
    '<tr>' +
    '<td>性&nbsp;&nbsp;别：</td><td colspan="3"><span id="sex"></span></td>' +
    '</tr>' +
    '<tr>' +
    '<td>联系电话：</td><td colspan="3"><span id="mobile"></span></td>' +
    '</tr>' +
    '<tr>' +
    '<td>人&nbsp;&nbsp;数：</td><td colspan="3"><span id="peoplecount"></span></td>' +
    '</tr>' +
    '<tr>' +
    '<td>环&nbsp;&nbsp;境：</td><td colspan="3"><span id="TableId"></span></td>' +
    '</tr>' +
    '<tr>' +
    '<td>状&nbsp;&nbsp;态：</td><td colspan="3"><span id="taskstatus"></span></td>' +
    '</tr>' +
    '<tr>' +
    '<td>备&nbsp;&nbsp;注：</td><td colspan="3"><span id="remark"></span></td>' +
    '</tr>' +
    '</table>' +
    '</div>' +
    '</div>',
    buttons: [
        '->',
        '  ',
        {
            text: '<span style="font-size: 14px;font-weight: bold;">订单打印</span>',
            itemId: 'OrderPrint',
            //cls:'button_color',
            //style: 'background-color: #384251;background-image: url();',
            width: 90,
            height: 30,
            listeners:{
                click:function(){
                    var paramsrecord = JSON.stringify(PublicObject.selectTask);
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
            }
        },
        /**{
            text: '<span style="font-size: 14px;font-weight: bold;">确定</span>',
            itemId: 'OrderEnter',
            //cls:'button_color',
            //style: 'background-color: #384251;background-image: url();',
            width: 90,
            height: 30,
            listeners:{
                click:function(){
                    Ext.getCmp('taskOrderWin').destroy();
                }
            }
        },**/
        {
            text: '<span style="font-size: 14px;font-weight: bold;">取消</span>',
            itemId: 'btnCancel',
            //cls:'button_color',
            //style: 'background-color: #384251;background-image: url();',
            width: 90,
            height: 30,
            listeners:{
                click:function(){
                    Ext.getCmp('taskOrderWin').destroy();
                }
            }
        },
        '->'
    ]

});
