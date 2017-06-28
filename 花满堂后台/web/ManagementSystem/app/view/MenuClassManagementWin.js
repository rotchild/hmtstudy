/**分类管理**/
Ext.define('ManagementSystem.view.MenuClassManagementWin', {
    extend: 'Ext.Window',
    xtype: 'menuClassManagementWin',
    id: 'menuClassManagementWinId',
    modal: true,
    width: 400,
    height: 150,
    plain: true,
    //初始化表单面板
    items: [
        {
            xtype: 'form',
            layout: 'form',
            //bodyStyle: 'background:#dfe8f6',
            bodyPadding: '5 5 0 5',
            border: false,
            itemId: 'menuClassForm',
            defaults: {
                labelAlign: 'right'
                //,
                //fieldStyle: 'background:#FFFFFF;border:0px;'
            },
            items: [
                {xtype: 'textfield', fieldLabel: '分类名称<span style="color:red;">*</span>', labelWidth: 60, itemId: 'menuclassname'},
                {
                    fieldLabel: '是否显示<span style="color:red;">*</span>',
                    labelWidth: 60,
                    xtype: 'combobox',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['name', 'value'],
                        data: [
                            {'name': '不显示', 'value': 0},
                            {'name': '显示', 'value': 1}
                        ]
                    }),
                    value: 1,
                    queryMode: 'local',
                    valueField: 'value',
                    displayField: 'name',
                    itemId: 'ishide',
                    editable: false,//设为不可输入
                    enableKeyEvent: false,
                    autoScroll: true
                },
                {xtype: 'textfield', fieldLabel: '排序<span style="color:red;">*</span>', labelWidth: 60, itemId: 'menuclasssort',
                    maxLength: 11,
                    enforceMaxLength: true}
            ],
            buttons: [
                '->',
                {text: '添加', itemId: 'btnAdd'},
                {text: '修改', itemId: 'btnEdit'},
                {text: '取消', itemId: 'btnCancel'},
                '->'
            ]
        }
    ]
})
;
