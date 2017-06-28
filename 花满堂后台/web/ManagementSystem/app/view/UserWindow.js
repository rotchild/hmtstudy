Ext.define('ManagementSystem.view.UserWindow', {
    extend: 'Ext.Window',
    xtype: 'userWindow',
    id: 'userWindowId',
    modal: true,
    title: '添加用户',
    width: 400,
    height: 250,
    plain: true,
    //初始化表单面板
    items: [
        {
            xtype: 'form',
            layout: 'form',
            bodyStyle: 'background:#ffffff',
            bodyPadding: '5 5 0 5',
            border: false,
            itemId: 'userForm',
            items: [
                {xtype: 'textfield', fieldLabel: '用户名<span style="color:red;">*</span>', itemId: 'username'},
                {xtype: 'textfield', fieldLabel: '用户密码<span style="color:red;">*</span>', inputType: 'password', itemId: 'password'},
                {xtype: 'textfield', fieldLabel: '真实姓名<span style="color:red;">*</span>', itemId: 'realname'},
                {xtype: 'textfield', fieldLabel: '联系方式<span style="color:red;">*</span>', itemId: 'mobile'},
                //{
                //    xtype: 'combo',
                //    fieldLabel: '用户级别',
                //    itemId: 'userclass',
                //    store: new Ext.data.SimpleStore({
                //        data: [
                //            [1, '管理员'],
                //            [2, '用户'],
                //            [3, '领导']
                //        ],
                //        fields: ['value', 'text']
                //    }),
                //    mode: 'local',
                //    triggerAction: 'all',
                //    editable: false,
                //    value: '',
                //    displayField: 'text',
                //    valueField: 'value'
                //},
                {
                    xtype: "checkboxgroup",
                    itemId: 'rolestr',
                    fieldLabel: '任务权限<span style="color:red;">*</span>',
                    columns: 2,
                    items: [
                        //{boxLabel: "用户管理", name: "1", id: 'RoleStr01'},
                        {boxLabel: "维护菜单", name: "2", id: 'RoleStr02'},
                        {boxLabel: "订单列表", name: "3", id: 'RoleStr03'},
                        {boxLabel: "数据统计", name: "4", id: 'RoleStr04'},
                        {boxLabel: "部门管理", name: "5", id: 'RoleStr05'},
                        {boxLabel: "配送管理", name: "6", id: 'RoleStr06'},
                        {boxLabel: "系统设置", name: "7", id: 'RoleStr07'}
                    ]
                }
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
