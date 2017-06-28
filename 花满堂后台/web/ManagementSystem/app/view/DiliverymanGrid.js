/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-9-12
 * Time: 下午3:16
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ManagementSystem.view.DiliverymanGrid',{
    extend:'Ext.grid.Panel',
    xtype:'diliverymanGrid',
    id:'diliverymanGridId',
    store:'DiliverymanStore',
    border:false,
    initComponent:function(){
        Ext.apply(this, {
            columns:[
                new Ext.grid.RowNumberer({text:'序号',width: 35, hidden: false}),
                {
                    text:'姓名',dataIndex:'realname',flex:2
                },
                {
                    text:'手机号码',dataIndex:'mobile',flex:2
                    //            renderer:function(value){
                    //                var tel=value.replace(value.substring(3,7),'****');
                    //                return tel;
                    //            }
                }
            ],
            dockedItems:[
                {
                    xtype:'toolbar',
                    border:true,
                    style: 'background-color: #ffffff;background-image: url();',
                    defaults: {style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;', width: 70},
                    dock:'top',
                    height:35,
                    items:[
                        {
                            xtype:'button',
                            text:'<span style="color: #ffffff;font-weight: bold">添加</span>',
                            itemId:'addbtn',
                            iconCls:'button-icon-Add'
                        },
                        {
                            xtype:'button',
                            text:'<span style="color: #ffffff;font-weight: bold">修改</span>',
                            itemId:'editbtn',
                            iconCls:'button-icon-Edit '
                        },
                        {
                            xtype:'button',
                            text:'<span style="color: #ffffff;font-weight: bold">删除</span>',
                            itemId:'deletebtn',
                            iconCls:'button-icon-Del'
                        },
                        {
                            xtype: 'panel',
                            border: false,
                            bodyStyle: 'background:#eeeeee;',
                            html: '<span style="color: #000000;">关键词：</span>'
                        },
                        {
                            xtype: 'textfield', width: 120, itemId: 'keyword'
                        },
                        {
                            xtype:'button',
                            text:'<span style="color: #ffffff;font-weight: bold">查询</span>',
                            itemId:'searchbtn',
                            iconCls:'button-icon-Search'
                        },
                        {
                            xtype:'button',
                            text:'<span style="color: #ffffff;font-weight: bold">重置</span>',
                            itemId:'resetbtn',
                            iconCls:'button-icon-Reset'
                        }
                    ]
                }
//        ,
//        {
//            xtype:'pagingtoolbar',
//            dock:'bottom',
//            store:''
//        }
            ]
        });
        this.callParent(arguments);
    }
});