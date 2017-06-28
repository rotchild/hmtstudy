(function () {
    Ext.define('ManagementSystem.view.TableOrderSetting02', {
        extend: 'Ext.panel.Panel',
        xtype: 'tableOrderSetting02',
        id: 'tableOrderSettingId02',
        bodyStyle: 'background:#eeeeee;',
        items: [
            {
                xtype: 'panel',
                bodyPadding: '10 10 5 10',
                //fieldDefaults: {labelAlign: 'right'},
                layout: "fit",
                bodyStyle: 'background:#eeeeee;',
                border: false,
                items: [
                    {
                        xtype:'fieldset',
                        padding: '5 5 20 5',
                        title: '时间限制',
                        items:[
                            {
                                xtype:'panel',
                                baseCls: "x-plain",
                                layout: "column",
                                padding: '5 5 5 5',
                                items:[
                                    {
                                        xtype:'timefield',
                                        itemId:'lunchstarttime',
                                        fieldLabel:'上午',
                                        emptyText:'请选择',
                                        editable:false,
                                        labelWidth:30,
                                        width:130,
                                        format:'H:i:s',
                                        increment:30 //控制分钟的时间颗粒度,默认是15分钟，也可以改成1分钟
                                    },
                                    {
                                        xtype:'timefield',
                                        itemId:'lunchendtime',
                                        fieldLabel:'至',
                                        emptyText:'请选择',
                                        editable:false,
                                        labelWidth:20,
                                        width:130,
                                        format:'H:i:s',
                                        increment:30, //控制分钟的时间颗粒度,默认是15分钟，也可以改成1分钟
                                        listeners:{
                                            change:function(){
                                                var lunchstarttime=Ext.getCmp('tableOrderSettingId02').down('#lunchstarttime').getValue();
                                                var lunchendtime=Ext.getCmp('tableOrderSettingId02').down('#lunchendtime').getValue();
                                                if(lunchstarttime>lunchendtime){
                                                    Ext.Msg.alert('提示','结束时间不得早于开始时间！');
                                                    return;
                                                }
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                xtype:'panel',
                                baseCls: "x-plain",
                                layout: "column",
                                padding: '5 5 5 5',
                                items:[
                                    {
                                        xtype:'timefield',
                                        itemId:'dinnerstarttime',
                                        fieldLabel:'下午',
                                        emptyText:'请选择',
                                        editable:false,
                                        labelWidth:30,
                                        width:130,
                                        format:'H:i:s',
                                        increment:30, //控制分钟的时间颗粒度,默认是15分钟，也可以改成1分钟
                                        listeners:{
                                            change:function(){
                                                var lunchendtime=Ext.getCmp('tableOrderSettingId02').down('#lunchendtime').getValue();
                                                var dinnerstarttime=Ext.getCmp('tableOrderSettingId02').down('#dinnerstarttime').getValue();
                                                if(lunchendtime>dinnerstarttime){
                                                    Ext.Msg.alert('提示','上午结束时间不得晚于下午开始时间！');
                                                    return;
                                                }
                                            }
                                        }
                                    },
                                    {
                                        xtype:'timefield',
                                        itemId:'dinnerendtime',
                                        fieldLabel:'至',
                                        emptyText:'请选择',
                                        editable:false,
                                        labelWidth:20,
                                        width:130,
                                        format:'H:i:s',
                                        increment:30, //控制分钟的时间颗粒度,默认是15分钟，也可以改成1分钟
                                        listeners:{
                                            change:function(){
                                                var dinnerstarttime=Ext.getCmp('tableOrderSettingId02').down('#dinnerstarttime').getValue();
                                                var dinnerendtime=Ext.getCmp('tableOrderSettingId02').down('#dinnerendtime').getValue();
                                                if(dinnerstarttime>dinnerendtime){
                                                    Ext.Msg.alert('提示','结束时间不得早于开始时间！');
                                                    return;
                                                }
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ],
                buttons: [
                    //'->',
                    {
                        text: '<span style="color: #ffffff;font-weight: bold;">设置</span>',
                        itemId: 'btnSetting',
                        style: 'background-color: #384251;background-image: url();',
                        width: 60,
                        height: 25
                    },
                    {
                        text: '<span style="color: #ffffff;font-weight: bold;">重置</span>',
                        itemId: 'btnCancel',
                        style: 'background-color: #384251;background-image: url();',
                        width: 60,
                        height: 25
                    },
                    '->'
                ]
            }
        ]
    });
}).call(this);

