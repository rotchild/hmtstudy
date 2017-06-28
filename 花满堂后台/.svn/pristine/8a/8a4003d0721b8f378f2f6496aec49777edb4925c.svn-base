/**
 * Created by Administrator on 2016/9/18.
 * 添加自定义菜品
 */
(function () {
    Ext.define('ManagementSystem.view.addDishManualWin', {
        extend: 'Ext.window.Window',
        xtype: 'addDishManualWin',
        id: 'addDishManualWin',
        layout: 'border',
        height: 300,
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
                                fieldLabel: '菜品名称<span style="color:red;">*</span>',
                                itemId: 'dishnameM',
                                xtype: 'textfield'
                            },{
                                fieldLabel: '菜品单价<span style="color:red;">*</span>',
                                itemId: 'priceM',
                                xtype: 'textfield',
                                regex:/^[0-9]+(\.[0-9]{0,2})?$/,
                                regexText:'请输入正确的单价'
                            },{
                                fieldLabel: '菜品描述(60字以内)',
                                itemId: 'remarkM',
                                xtype: 'textarea',
                                row:3,
                                maxLength:60,
                                maxLengthText:'太长了'
                            }, {
                                fieldLabel: '菜品数量<span style="color:red;">*</span>',
                                itemId: 'dishcountM',
                                xtype: 'textfield',
                                regex:/^[1-9]+$/,
                                regexText:'请输入正确的数量'
                            },
                            {
                                xtype: 'combobox',
                                fieldLabel: '出品部<span style="color:red;">*</span>',
                                itemId: 'departmentM',
                                store: "DepartmentStore",
                                mode: 'local',
                                triggerAction: 'all',
                                multiSelect: false,//允许多选
                                editable: false,
                                value: '',
                                displayField: 'departmentName',
                                hiddenName:'departmentName',
                                disabled: false,
                                forceSelection : true,// 必须选择一个选项
                                blankText : '请选择',// 该项如果没有选择，则提示错误信息,
                                valueField: 'id'
                            }
                        ]
                    }
                ]
            }
        ],
        buttons: [
            '->',
            {text: '确定', itemId: 'btnEnter'},
            {text: '取消', itemId: 'btnCancel'},
            '->'
        ]
    });
}).call(this);