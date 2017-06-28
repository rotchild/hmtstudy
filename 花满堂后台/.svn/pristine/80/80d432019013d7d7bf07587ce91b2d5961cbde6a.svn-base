Ext.define('ManagementSystem.view.TaskCashPaymentWin', {
    extend: 'Ext.Window',
    xtype: 'taskCashPaymentWin',
    id: 'taskCashPaymentWinId',
    modal: true,
    width: 290,
    height: 100,
    plain: true,
    title: "现金支付",
    layout: 'border',
    //初始化表单面板
    items: [
        {
            region: 'west',
            //xtype: 'form',
            //layout: 'form',
            width: 280,
            //bodyStyle: 'background:#ffffff',
            bodyPadding: '5 5 0 5',
            border: false,
            itemId: 'taskForm',
            items: [
                {xtype: 'textfield', fieldLabel: '支付现金', labelWidth: 60, itemId: 'cashpayment'}
                //,
                //{
                //    fieldLabel: '是否显示',
                //    xtype: 'combobox',
                //    store: Ext.create('Ext.data.Store', {
                //        fields: ['name', 'value'],
                //        data: [
                //            {'name': '不显示', 'value': 0},
                //            {'name': '显示', 'value': 1}
                //        ]
                //    }),
                //    value: 1,
                //    queryMode: 'local',
                //    valueField: 'value',
                //    displayField: 'name',
                //    itemId: 'ishide',
                //    editable: false,//设为不可输入
                //    enableKeyEvent: false,
                //    autoScroll: true
                //}
            ]
        }
    ],
    buttons: [
        '->',
        {text: '确认', itemId: 'btnAdd'},
        {text: '取消', itemId: 'btnCancel'},
        '->'
    ]
});
