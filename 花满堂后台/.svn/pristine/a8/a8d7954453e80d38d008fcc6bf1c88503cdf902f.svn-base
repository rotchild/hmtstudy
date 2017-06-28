/**
 * Created by Administrator on 2016/9/18.
 * 现场支付窗口
 */
(function () {
    Ext.define('ManagementSystem.view.spotPayWin', {
        extend: 'Ext.window.Window',
        xtype: 'spotPayWin',
        id: 'spotPayWin',
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
                                fieldLabel: '订单号<span style="color:red;">*</span>',
                                itemId: 'pOrder',
                                disabled:true,
                                xtype: 'textfield'
                            },
                            {
                                fieldLabel: '桌位号<span style="color:red;">*</span>',
                                itemId: 'tableid',
                                disabled:true,
                                xtype: 'textfield'
                            },
                            {
                                xtype: "combobox",
                                itemId: 'paymethod',
                                mode:'local',
                                labelWidth:100,
                                width:230,
                                value:2,
                                displayField:'name',
                                name:'value',
                                hiddenName:'name',
                                fieldLabel : '选择支付方式<span style="color:red;">*</span>',
                                emptyText : '请选择',
                                //allowBlank : false,// 不允许为空
                                valueField : 'value',// 值,可选
                                editable : false,// 是否允许输入
                                //forceSelection : true,// 必须选择一个选项
                                //blankText : '请选择',// 该项如果没有选择，则提示错误信息,
                                triggerAction : 'all',// 显示所有下列数据，一定要设置属性triggerAction为all
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['name', 'value'],
                                    data: [
                                        {'name': '会员卡', 'value': 3},
                                        {'name': '现金支付', 'value': 2},
                                        {'name': '银联支付', 'value': 4},
                                        {'name': '微信支付', 'value': 1},
                                        {'name': '支付宝支付', 'value': 5}
                                    ]
                                })
                            },
                            {
                                fieldLabel: '请输入会员卡号',
                                itemId: 'vipcard',
                                xtype: 'textfield'
                            },{
                                fieldLabel: '优惠劵金额(元)',
                                itemId: 'coupon',
                                xtype: 'textfield',
                                regex:/^[0-9]+(\.[0-9]{0,2})?$/,
                                regexText:'请输入正确的金额'
                            }, {
                                fieldLabel: '应付金额(元)<span style="color:red;">*</span>',
                                itemId: 'duePay',
                                xtype: 'textfield',
                                regex:/^[0-9]+(\.[0-9]{0,2})?$/,
                                regexText:'请输入正确的金额'
                            }, {
                                fieldLabel: '实收金额(元)<span style="color:red;">*</span>',
                                itemId: 'realprice',
                                xtype: 'textfield',
                                regex:/^[0-9]+(\.[0-9]{0,2})?$/,
                                regexText:'请输入正确的金额'
                            }
                        ]
                    }
                ]
            }
        ],
        buttons: [
            '->',
            {text: '确定', itemId: 'btnEnter',listeners:{
                "click":function(){
                    debugger;
                    var tableid=PublicObject.selectTask.tableid,
                        paymethod=Ext.getCmp('spotPayWin').down("#paymethod").getValue(),
                        vipcard=Ext.getCmp('spotPayWin').down("#vipcard").getValue(),
                        coupon=Ext.getCmp('spotPayWin').down("#coupon").getValue(),
                        duePay=Ext.getCmp('spotPayWin').down('#duePay').getValue(),
                        realprice=Ext.getCmp('spotPayWin').down("#realprice").getValue();
                    var orderid=PublicObject.selectTask.pOrder;
                    var regex=/^[0-9]+(\.[0-9]{0,2})?$/;
                    if(!paymethod && !vipcard && !coupon && !realprice){
                        Ext.MessageBox.alert("提示","请输入支付信息");
                        return;
                    }else if(!regex.test(duePay) || !regex.test(realprice)){
                        Ext.MessageBox.alert("提示","请输入支付金额");
                        return;
                    }
                    else{
                        var params={
                            orderid:orderid,
                            realprice:realprice,
                            coupon:coupon,
                            duePay:duePay,
                            vipcard:vipcard,
                            tasktype:1,
                            paymethod:paymethod,
                            randomTag:Math.random()
                        };
                        Ext.getCmp('mainViewPort').getEl().mask("正在操作，请稍候");//遮罩
                        Ext.Ajax.request({
                            url: '../api/ManagementSystem/spotPayEnter',
                            params:params,
                            method: 'Post',
                            success: function (response, options) {
                                debugger;
                                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                                var result = Ext.JSON.decode(response.responseText);
                                if (result.err) {
                                    Ext.MessageBox.alert('提示', result.err.message);
                                } else {
                                    debugger;
                                    Ext.getStore("TaskStore").reload();
                                    Ext.MessageBox.alert('成功', "操作成功!");
                                    Ext.getCmp("spotPayWin").destroy();
                                }
                            },
                            failure: function (response, options) {
                                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                            }
                        });
                    }
                }
            }},
            {text: '取消', itemId: 'btnCancel',listeners:{
                "click":function(){Ext.getCmp("spotPayWin").destroy();}
            }},
            '->'
        ]
    });
}).call(this);