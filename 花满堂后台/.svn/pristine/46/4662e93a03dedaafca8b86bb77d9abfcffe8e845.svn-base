/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-9-13
 * Time: 下午2:36
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ManagementSystem.view.DiliveryGrid',{
    extend:'Ext.grid.Panel',
    xtype:'diliveryGrid',
    id:'diliveryGridId',
    store:'DiliveryStore',
    border:false,
    initComponent:function(){
        Ext.apply(this, {
            columns:[
                new Ext.grid.RowNumberer({text:'序号',width: 35, hidden: false}),
                {
                    text:'订单号',dataIndex:'id',flex:.7
                },
                {
                    text:'配送时间',dataIndex:'diningtime',flex:1
                },
                {
                    text:'联系人',dataIndex:'realname',flex:.5
                },
                {
                    text:'手机号码',dataIndex:'mobile',flex:1
                },
                {
                    text:'送餐地址',dataIndex:'address',flex:4
                },
                {
                    text:'金额',dataIndex:'sumoney',flex:1
                },
                {
                    text:'订单类型',dataIndex:'tasktype',flex:1,
                    renderer:function(value){
                        var str="";
                        switch(value){
                            case 1:
                                str='堂食';
                                break;
                            case 2:
                                str="外卖";
                                break;
                            case 3:
                                str="杂食";
                                break;
                            case 4:
                                str="定位";
                                break;
                        }
                        return str;
                    }
                },
                {
                    text:'配送状态',dataIndex:'taskstatus',flex:1,
                    renderer:function(value){
                        var str="";
                        switch(value){
                            case -1:
                                str="<b style='color:red;'>订单取消</b>";
                                break;
                            case 1:
                                str="<b style='color:#f1c40f;'>已下单</b>";
                                break;
                            case 2:
                                str="<b style='color:green;'>已打印</b>";
                                break;
                            case 3:
                                str="<b style='color:#ac2925;'>派送中</b>";
                                break;
                            case 4:
                                str="<b style='color:blue;'>派送中</b>";
                                break;
                            case 5:
                                str="<b style='color:#04be02;'>订单完成</b>";
                                break;
                        }
                        return str;
                    }
                },
                {text:'配送员',dataIndex:'dili_realname',flex:1},
                {
                    text:'操作',flex:1,align:'center',
                    renderer:function(value, cellmeta, record, rowIndex, columnIndex, store){
                        var returnStr="";
                        var taskstatus=record.data.taskstatus;
                        if(taskstatus==2){
                            returnStr = "<INPUT  type='button' value='安排配送' id='peisong' >";
                        }else if(record.get("taskstatus")==3 || record.get("taskstatus")==4){
                            returnStr="<input type='button' value='配送完成' id='arriveBtn' style='cursor: pointer'/>";
                        }else if(record.get('taskstatus')==5){
                            returnStr='已完成';
                        }else if(record.get("taskstatus")=== -1){
                            returnStr="订单已取消";
                        }
                        return returnStr;
                    }
                }
            ],
            dockedItems:[
                {
                    xtype:'toolbar',
                    border:true,
                    style: 'background-color: #ffeed9;background-image: url();',
                    dock:'top',
                    height:35,
                    items:[
                        '    ',
                        {
                            xtype: 'datefield', name: 'startCreateTime', itemId: 'DateStart',
                            width: 220,
                            fieldLabel:'时间范围从',
                            labelWidth:80,
                            anchor: '100%',
                            format: 'Y-m-d',
                            value: currentDate()[1],
                            editable: false, blankText: '必须选择起始时间',
                            listeners: {
                                select: function () {
                                    if (this.getValue() > this.up('toolbar').down('#DateEnd').getValue()) {
                                        Ext.Msg.alert('提示', '起始时间不能大于结束时间');
                                        this.setValue(this.up('toolbar').down('#DateEnd').getValue());
                                    }
                                }
                            }
                        },
                        {
                            xtype: 'datefield', name: 'endCreateTime', itemId: 'DateEnd',
                            width: 150,
                            labelWidth: 15,
                            anchor: '100%',
                            format: 'Y-m-d',
                            fieldLabel: '至',
                            value: currentDate()[1],
                            editable: false, blankText: '必须选择结束时间',
                            listeners: {
                                select: function () {
                                    if (this.getValue() < this.up('toolbar').down('#DateStart').getValue()) {
                                        Ext.Msg.alert('提示', '起始时间不能大于结束时间');
                                        this.setValue(this.up('toolbar').down('#DateStart').getValue());
                                    }
                                }
                            }
                        },
                        '  ',
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
                            style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                            itemId:'searchbtn',
                            iconCls:'button-icon-Search'
                        },
                        {
                            xtype:'button',
                            text:'<span style="color: #ffffff;font-weight: bold">重置</span>',
                            style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                            itemId:'resetbtn',
                            iconCls:'button-icon-Reset'
                        }
                    ]
                }
                ,
                {
                    xtype:'pagingtoolbar',
                    dock:'bottom',
                    store:'DiliveryStore',
                    displayInfo: true
                }
            ]
        });
        this.callParent(arguments);
    }
});