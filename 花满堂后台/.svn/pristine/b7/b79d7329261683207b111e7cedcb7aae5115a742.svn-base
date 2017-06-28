/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-9-13
 * Time: 下午5:02
 * To change this template use File | Settings | File Templates.
 */
(function(){
    Ext.define('ManagementSystem.view.DiliveryWin',{
        extend:'Ext.window.Window',
        id:'diliverywinId',
        xtype:'diliverywin',
        modal:true,
        height:110,
        border:false,
        width:250,
        title:'请选择配送员',
        items:[
            {
//                border:false,
                bodyPadding:'10 8 8 8',
                items:[
                    {
                        xtype:'combo',
                        itemId:'diliveryman',
                        fieldLabel:'配送员<span style="color:red;">*</span>',
                        store:'DiliverymanStore',
                        mode:'local',
                        labelWidth:60,
                        displayField:'realname',
                        valueField:'id',
                        editable:false
                    }
                ],
                buttons: [
                    "->",
                    {text: '确定', itemId: 'BtnSave'},
                    {text: '取消', itemId: 'BtnCancel'},
                    "->"
                ]
            }
        ]
    });
}).call(this)
