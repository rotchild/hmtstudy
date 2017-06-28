(function () {
    Ext.define('ManagementSystem.view.TableOrderSetting', {
        extend: 'Ext.panel.Panel',
        xtype: 'tableOrderSetting',
        id: 'tableOrderSettingId',
        bodyStyle: 'background:#eeeeee;',
        items: [
            {
                xtype: 'panel',
                bodyPadding: '10 10 5 10',
                //fieldDefaults: {labelAlign: 'right'},
                bodyStyle: 'background:#eeeeee;',
//                layout: "fit",
                border: false,
                items: [
                    {
                        xtype: 'fieldset',
                        padding: '5 5 0 5',
                        title: '桌位限制',
                        html: '<div style="width: 600px;height: 160px;">' +
                        '<table cellpadding="0" cellspacing="0" border="0" style="padding: 5px;width: 100%;" id="tableOrderSettingTable">' +
                        '<tr>' +
                        '<td style="width: 80px;">大厅：</td>' +
                            '<td colspan="2">' +
                            '4人桌&nbsp;&nbsp;<input id="FourTableCount" type="text" style="width: 50px;height: 24px;text-align: center;" onkeyup="getdatingcount()"/>桌，' +
                            '&nbsp;&nbsp;6人桌&nbsp;&nbsp;<input id="SixTableCount" type="text" style="width: 50px;height: 24px;text-align: center;" onkeyup="getdatingcount()"/>桌' +
                            '</td>' +
                            '<td >大厅约  <span id="datingnum"></span>人</td>'+
                        '</tr>'+
                            '<tr>' +
                            '<td>包间:</td>'+
                            '<td colspan="2">' +
                            '包厢&nbsp;&nbsp;<input id="BoxTableCount" type="text" style="width: 50px;height: 24px;text-align: center;" onkeyup="getdatingcount()"/>&nbsp;&nbsp;间'+
                            '</td>'+
                            '<td >包间约  <span id="baojiannum"></span>人</td>'+
                            '</tr>'+
                        '<tr>' +
                        '<td style="width: 100px;">合计约  <span id="totalcount" style="font-weight: bolder;"></span>  人</td>' +
                        '</tr>' +
                        '</tr>' +
                        '</table>' +
                        '</div>'
                    },
                    {
                        xtype:'fieldset',
                        padding: '5 5 20 5',
                        title: '时间限制',
//                        html: '<div style="width: 600px;height:200px;">' +
//                            '<table>' +
//                            '<tr>' +
//                            '<td style="width: 80px;">时间限制：</td>' +
//                            '<td colspan="2">' +
//                            '午餐&nbsp;&nbsp;<input id="LunchStartTime1" type="text" style="width: 50px;height: 30px;"/>&nbsp;&nbsp;点' +
//                            '&nbsp;&nbsp;<input id="LunchStartTime2" type="text" style="width: 50px;height: 30px;"/>&nbsp;&nbsp;分' +
//                            '</td>' +
//                            '<td colspan="2">' +
//                            '至&nbsp;&nbsp;<input id="LunchEndTime1" type="text" style="width: 50px;height: 30px;"/>&nbsp;&nbsp;点' +
//                            '&nbsp;&nbsp;<input id="LunchEndTime2" type="text" style="width: 50px;height: 30px;"/>&nbsp;&nbsp;分' +
//                            '</td>' +
//                            '<td colspan="2"></td>' +
//                            '</tr>' +
//                            '</tr>' +
//                            '<tr>' +
//                            '<td style="width: 80px;"></td>' +
//                            '<td colspan="2">' +
//                            '晚餐&nbsp;&nbsp;<input id="DinnerStartTime1" type="text" style="width: 50px;height: 30px;"/>&nbsp;&nbsp;点' +
//                            '&nbsp;&nbsp;<input id="DinnerStartTime2" type="text" style="width: 50px;height: 30px;"/>&nbsp;&nbsp;分' +
//                            '</td>' +
//                            '<td colspan="2">' +
//                            '至&nbsp;&nbsp;<input id="DinnerEndTime1" type="text" style="width: 50px;height: 30px;"/>&nbsp;&nbsp;点' +
//                            '&nbsp;&nbsp;<input id="DinnerEndTime2" type="text" style="width: 50px;height: 30px;"/>&nbsp;&nbsp;分' +
//                            '</td>' +
//                            '<td colspan="2"></td>' +
//                            '</tr>' +
//                            '<tr>' +
//                            '<td style="width: 80px;">间隔时间：</td>' +
//                            '<td colspan="6">' +
//                            '<select id="IntervalTime" style="width: 100px;height: 30px;">' +
//                            '<option value="0">0分钟</option>' +
//                            '<option value="5">5分钟</option>' +
//                            '<option value="10">10分钟</option>' +
//                            '<option value="15">15分钟</option>' +
//                            '<option value="20">20分钟</option>' +
//                            '<option value="30">30分钟</option>' +
//                            '</select>' +
//                            '</td>' +
//                            '</tr>' +
//                            '<tr>' +
//                            '</table>'+
//                            '</div>'

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
                                                var lunchstarttime=Ext.getCmp('tableOrderSettingId').down('#lunchstarttime').getValue();
                                                var lunchendtime=Ext.getCmp('tableOrderSettingId').down('#lunchendtime').getValue();
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
                                                var lunchendtime=Ext.getCmp('tableOrderSettingId').down('#lunchendtime').getValue();
                                                var dinnerstarttime=Ext.getCmp('tableOrderSettingId').down('#dinnerstarttime').getValue();
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
                                                var dinnerstarttime=Ext.getCmp('tableOrderSettingId').down('#dinnerstarttime').getValue();
                                                var dinnerendtime=Ext.getCmp('tableOrderSettingId').down('#dinnerendtime').getValue();
                                                if(dinnerstarttime>dinnerendtime){
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
                                padding: '5 5 5 5',
                                items:[
                                    {
                                        xtype:'textfield',
                                        fieldLabel:'跨度',
                                        itemId:'spanday',
                                        labelWidth:30,
                                        width:90,
                                        regex:/^[1-9]$/,
                                        regexText:'亲，格式错误'
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

