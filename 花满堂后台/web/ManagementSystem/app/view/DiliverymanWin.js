/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-9-12
 * Time: 下午4:55
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ManagementSystem.view.DiliverymanWin',{
    extend:'Ext.window.Window',
    xtype:'diliverymanWin',
    id:'diliverymanWinId',
    modal: true,
    width:400,
    height: 130,
    items:[
        {
            xtype:'form',
            layout:'form',
            bodyStyle: 'background:#dfe8f6',
            border:false,
            bodyPadding:'5 5 5 5',
            defaults:{
                labelWidth:60
            },
            items:[
                {
                    xtype:'textfield',fieldLabel:'配送员<span style="color:red;">*</span>',itemId:'realname',emptyText:'必填'
                },
                {
                    xtype:'textfield',fieldLabel:'电话<span style="color:red;">*</span>',itemId:'mobile',emptyText:'必填',
                    regex:/^1[3|4|5|7|8][0-9]\d{4,8}$/,minLength:11,maxLength:11
                }
            ],
            buttons:[
                '->',
                {text:'添加',itemId:'addbtn'},
                {text:'修改',itemId:'editbtn'},
                {text:'取消',itemId:'cancelbtn'},
                '->'
            ]
        }
    ]
});