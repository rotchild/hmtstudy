/**
 * Created by Administrator on 2016/9/19.
 * 添加服务项目
 */
(function () {
    Ext.define('ManagementSystem.view.addServiceWin', {
        extend: 'Ext.window.Window',
        xtype: 'addServiceWin',
        id: 'addServiceWin',
        layout: 'border',
        height: 250,
        width: 340,
        modal: true,
        border: false,
        title: '添加服务',
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
                                fieldLabel: '服务名称<span style="color:red;">*</span>',
                                itemId: 'servicename',
                                xtype: 'textfield'
                            },{
                                fieldLabel: '价格<span style="color:red;">*</span>',
                                itemId: 'price',
                                xtype: 'textfield',
                                regex:/^[0-9]+\.{0,1}[0-9]{0,2}$/,
                                regexText:'请输入正确的单价'
                            },
                            {
                                xtype: 'combobox',
                                fieldLabel: '分类',
                                itemId: 'type',
                                mode: 'local',
                                triggerAction: 'all',
                                multiSelect: false,//允许多选
                                editable: false,
                                value: 0,
                                displayField: 'name',
                                hiddenName:'value',
                                valueField: 'value',
                                disabled: false,
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['name', 'value'],
                                    data: [
                                        {'name': '堂食', 'value': 1},
                                        {'name': '外卖', 'value': 2},
                                        {'name': '食杂', 'value': 3}
                                    ]
                                }),
                                forceSelection : true,// 必须选择一个选项
                                blankText : '请选择'// 该项如果没有选择，则提示错误信息,
                            },
                            {
                                xtype: 'combobox',
                                fieldLabel: '计费方式',
                                itemId: 'rule',
                                mode: 'local',
                                triggerAction: 'all',
                                multiSelect: false,//允许多选
                                editable: false,
                                value: 1,
                                displayField: 'name',
                                hiddenName:'value',
                                valueField: 'value',
                                disabled: true,
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['name', 'value'],
                                    data: [
                                        {'name': '按人数计算', 'value': 1},
                                        {'name': '按菜单计算', 'value': 2}
                                    ]
                                }),
                                forceSelection : true,// 必须选择一个选项
                                blankText : '请选择'// 该项如果没有选择，则提示错误信息,
                            },
                            {
                                xtype: 'combobox',
                                fieldLabel: '是否默认选择<span style="color:red;">*</span>',
                                itemId: 'isdefault',
                                mode: 'local',
                                triggerAction: 'all',
                                multiSelect: false,//允许多选
                                editable: false,
                                value: 1,
                                displayField: 'name',
                                hiddenName:'value',
                                valueField: 'value',
                                disabled: false,
                                forceSelection : true,// 必须选择一个选项
                                blankText : '请选择',// 该项如果没有选择，则提示错误信息,
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['name', 'value'],
                                    data: [
                                        {'name': '是', 'value': 1},
                                        {'name': '否', 'value': 0}
                                    ]
                                })
                            },{
                                xtype:'panel',
                                border:false,
                                html: "<div style='font-size: 12px;color:red;'>*默认选择将在订单生成时自动添加该服务</div>"
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