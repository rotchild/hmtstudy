Ext.define('ManagementSystem.view.MenuManagementWin', {
    extend: 'Ext.Window',
    xtype: 'menuManagementWin',
    id: 'menuManagementWinId',
    modal: true,
    width: 400,
    height: 210,
    plain: true,
    layout: 'border',
    //初始化表单面板
    items: [
        {
            region: 'west',
            xtype: 'form',
            layout: 'form',
            width: 280,
            //bodyStyle: 'background:#dfe8f6',
            bodyPadding: '5 5 0 5',
            border: false,
            itemId: 'menuForm',
            items: [
                {xtype: 'textfield', fieldLabel: '菜单名称', labelWidth: 60, itemId: 'dishname'},
                {xtype: 'textfield', fieldLabel: '标准价格', labelWidth: 60, itemId: 'standardprice'},
                {xtype: 'textfield', fieldLabel: '现在价格', labelWidth: 60, itemId: 'presentprice'},
                {xtype: 'textfield', fieldLabel: '外卖价格', labelWidth: 60, itemId: 'outsprice'},
                {xtype: 'textfield', fieldLabel: '菜单名称', labelWidth: 60, itemId: 'dishname'},
                {xtype: 'textfield', fieldLabel: '上架数量', labelWidth: 60, itemId: 'dishconut'}
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
        },
        {
            region: 'center',
            //bodyStyle: 'background:#dfe8f6',
            bodyPadding: '5 5 0 5',
            border: false,
            itemId: 'menuForm2',
            html: '<div style="width: 80px;height: 100px">' +
            '<input type="button" value="编辑资料" onclick="AddMenuDetailWin()"/>' +
            '</div>'
        }
    ],
    buttons: [
        '->',
        {text: '添加', itemId: 'btnAdd'},
        {text: '修改', itemId: 'btnEdit'},
        {text: '取消', itemId: 'btnCancel'},
        '->'
    ]
});
