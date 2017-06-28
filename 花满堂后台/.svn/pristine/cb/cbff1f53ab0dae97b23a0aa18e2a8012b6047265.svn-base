/**
 * Created by Administrator on 2016/9/22.
 * 添加出品部
 */
(function () {
    Ext.define('ManagementSystem.view.addDepartWin', {
        extend: 'Ext.window.Window',
        xtype: 'addDepartWin',
        id: 'addDepartWin',
        layout: 'border',
        height: 150,
        width: 300,
        modal: true,
        border: false,
        //style: 'background:#ffffff',
        items: [
            {
                xtype:'panel',
                region:'center',
                layout:'fit',
                items:[
                    {
                        xtype:'form',
                        border:false,
                        itemId:'',
                        layout:"form",
                        bodyPadding: 5,
                        items: [
                            {
                                fieldLabel: '部门名称<span style="color:red;">*</span>',
                                itemId: 'departmentName',
                                xtype: 'textfield'
                            },{
                                fieldLabel: 'IP地址<span style="color:red;">*</span>',
                                itemId: 'ipAddress',
                                regex:/(?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/,
                                regexText:'请输入正确的地址',
                                xtype: 'textfield'
                            }
                        ]
                    }
                ]
            }
        ],
        buttons: [
            '->',
            {text: '确定', itemId: 'btnEnter'},
            {text: '修改', itemId: 'btnEdit'},
            {text: '取消', itemId: 'btnCancel'},
            '->'
        ]
    });
}).call(this);