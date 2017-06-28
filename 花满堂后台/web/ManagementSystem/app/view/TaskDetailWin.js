Ext.define('ManagementSystem.view.TaskDetailWin', {
    extend: 'Ext.Window',
    xtype: 'taskDetailWin',
    id: 'taskDetailWinId',
    modal: true,
    width: 350,
    height: 600,
    bodyStyle: 'background:#ffffff;',
    autoScroll: true,
    plain: false,
    layout: 'border',
    html: '<div style="width: 100%;padding: 5px;font-size: 14px;background: #FFFFFF" id="taskDetailWinDiv">' +
    '<div style="width: 100%;padding: 5px;" id="taskDetailWinDiv01">' +
    '<table cellpadding="0" cellspacing="0" border="0" style="padding: 5px;width: 100%;" id="taskDetailWinTable01">' +
    '<tr>' +
    '<td colspan="4" id="taskDetailWinTable01_td01">订单详情</td>' +
    '</tr>' +
    '<tr>' +
    '<td>订单号：</td><td><span id="TransactionNumber"></span></td>' +
    '<td></td>' +
    '</tr>' +
    '<tr>' +
    '<td>下单时间：</td><td colspan="3"><span id="PrintDate"></span></td>' +
    '</tr>' +
    '<tr>' +
    '<td id="showTime">就餐时间：</td><td colspan="3"><span id="dishingTime"></span></td>' +
    '</tr>' +
    '<tr>' +
    '<td>座位号：</td><td><span id="TableId"></span></td>' +
    '</tr>' +
    '</table>' +
    '</div>' +
    '<hr style="border: 1px solid #808080"/>' +
    '<div style="width: 100%;padding: 2px;" id="taskDetailWinDiv02">' +
    '<div id="taskDetailWinTable02">' +
        //'<tr>' +
        //'<td>菜品名称</td>' +
        //'<td>单价</td>' +
        //'<td>数量</td>' +
        //'<td>金额</td>' +
        //'</tr>' +
        //'<tr>' +
        //'<td>手撕羊排</td>' +
        //'<td>128.00</td>' +
        //'<td>1</td>' +
        //'<td>128.00</td>' +
        //'</tr>' +
        //'<tr>' +
        //'<td>手撕羊排</td>' +
        //'<td>128.00</td>' +
        //'<td>1</td>' +
        //'<td>128.00</td>' +
        //'</tr>' +
        //'<tr>' +
        //'<td>手撕羊排</td>' +
        //'<td>128.00</td>' +
        //'<td>1</td>' +
        //'<td>128.00</td>' +
        //'</tr>' +
        //'<tr>' +
        //'<td>手撕羊排</td>' +
        //'<td>128.00</td>' +
        //'<td>1</td>' +
        //'<td>128.00</td>' +
        //'</tr>' +
        //'<tr>' +
        //'<td>手撕羊排</td>' +
        //'<td>128.00</td>' +
        //'<td>1</td>' +
        //'<td>128.00</td>' +
        //'</tr>' +
        //'<tr>' +
        //'<td>手撕羊排</td>' +
        //'<td>128.00</td>' +
        //'<td>1</td>' +
        //'<td>128.00</td>' +
        //'</tr>' +
        //'<tr>' +
        //'<td>手撕羊排</td>' +
        //'<td>128.00</td>' +
        //'<td>1</td>' +
        //'<td>128.00</td>' +
        //'</tr>' +
        //'<tr>' +
        //'<td>手撕羊排</td>' +
        //'<td>128.00</td>' +
        //'<td>1</td>' +
        //'<td>128.00</td>' +
        //'</tr>' +
        //'<tr>' +
        //'<td>手撕羊排</td>' +
        //'<td>128.00</td>' +
        //'<td>1</td>' +
        //'<td>128.00</td>' +
        //'</tr>' +

    '</div>' +
    '</div>' +
    '<hr style="border: 1px solid #808080"/>' +
    '<div style="width: 100%;padding: 5px;" id="taskDetailWinDiv03">' +
    '<table cellpadding="0" cellspacing="0" border="0" style="padding: 5px;width: 100%;" id="taskDetailWinTable03">' +
    '<tr>' +
    '<td>合计数量：</td>' +
    '<td></td>' +
    '<td></td>' +
    '<td id="TotalCount"></td>' +
    '</tr>' +
    '<tr>' +
    '<td>合计金额：</td>' +
    '<td></td>' +
    '<td></td>' +
    '<td id="TotalCountMoney"></td>' +
    '</tr>' +
    '</table>' +
    '</div>' +
        //'<div style="width: 100%;margin-top: 75px;text-align: center;display: block" id="taskDetailWinDiv04">' +
        //'<button id="OrderDeliveryIn" style="width: 90px;height: 30px;background: #f2af2c;border-radius: 5px;border: 0px;font-size: 14px;color: #FFFFFF;font-weight: bold">订单派送中</button>&nbsp;&nbsp;&nbsp;' +
        //'<button id="OrderComplete" hidden="hidden" style="width: 90px;height: 30px;background: #f2af2c;border-radius: 5px;border: 0px;font-size: 14px;color: #FFFFFF;font-weight: bold">订单已完成</button>&nbsp;&nbsp;&nbsp;' +
        //'<button id="OrderPrint" style="width: 90px;height: 30px;background: #f2af2c;border-radius: 5px;border: 0px;font-size: 14px;color: #FFFFFF;font-weight: bold">打印</button>' +
        //'</div>' +
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
            height: 30
        },
        {
            text: '<span style="font-size: 14px;font-weight: bold;">确定</span>',
            itemId: 'OrderEnter',
            //cls:'button_color',
            //style: 'background-color: #384251;background-image: url();',
            width: 90,
            height: 30,
            listeners:{
                click:function(){
                    Ext.getCmp('taskDetailWinId').destroy();
                }
            }
        },
        {
            text: '<span style="font-size: 14px;font-weight: bold;">取消</span>',
            itemId: 'btnCancel',
            //cls:'button_color',
            //style: 'background-color: #384251;background-image: url();',
            width: 90,
            height: 30,
            listeners:{
                click:function(){
                    Ext.getCmp('taskDetailWinId').destroy();
                }
            }
        },
        '->'
    ]

});
