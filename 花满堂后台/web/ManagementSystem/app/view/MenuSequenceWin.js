Ext.define('ManagementSystem.view.MenuSequenceWin', {
    extend: 'Ext.Window',
    xtype: 'menuSequenceWin',
    id: 'menuSequenceWinId',
    title: '菜品排序',
    modal: true,
    width: 400,
    height: 120,
    plain: true,
    //初始化表单面板
    items: [
        {
            xtype: 'form',
            layout: 'form',
            //bodyStyle: 'background:#dfe8f6',
            bodyPadding: '5 5 0 5',
            border: false,
            itemId: 'menuSequenceForm',
            items: [
                {xtype: 'textfield', fieldLabel: '菜品名称<span style="color:red;">*</span>', labelWidth: 60, itemId: 'dishname'},
                {
                    xtype: 'textfield',
                    fieldLabel: '菜品排序<span style="color:red;">*</span>',
                    labelWidth: 60,
                    itemId: 'menusequence',
                    //regex: /^[0-9]\d*$/,//正整数
                    regex: /^[0-9]+([.]{1}[0-9]{1,2})?$/,//小数点
                    //allowBlank: false,
                    selectOnFocus: true
                }
            ],
            buttons: [
                '->',
                {text: '确定', itemId: 'btnAdd'},
                {text: '取消', itemId: 'btnCancel'},
                '->'
            ]
        }
    ]
})
;
