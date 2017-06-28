/**
 * Created by Administrator on 2016/9/20.
 * 合并结账单
 */
(function () {
    Ext.define('ManagementSystem.view.OrderWin', {
        extend: 'Ext.window.Window',
        xtype: 'orderWin',
        id: 'orderWin',
        height: 550,
        width: 350,
        modal: true,
        border: false,
        autoScroll:true,
        layout: 'border',
        html: '<div style="width: 100%;padding: 5px;font-size: 14px;background: #FFFFFF" id="">' +
        '<div style="width: 100%;padding: 5px;" id="">' +
        '<table cellpadding="0" cellspacing="0" border="0" style="padding: 5px;width: 100%;" id="">' +
        '<tr>' +
        '<td colspan="4" style="font-weight: bolder;font-size: 20px;text-align: center;">消费清单</td>' +
        '</tr>' +
        '<tr>' +
        '<td colspan="2">交易号：<span id="orderNumber"></span></td>' +
        '<td colspan="2">收款员：<span id="userrealname"></span></td>' +
        '</tr>' +
        '<tr>' +
        '<td colspan="2">座位号：<span id="tableid"></span></td>' +
        '<td colspan="2">就餐人数：<span id="peoplecount"></span></td>' +
        '</tr>' +
        '<tr>' +
        '<td colspan="4">日&nbsp;&nbsp;&nbsp;期：<span id="ordertime"></span></td>' +
        '</tr>' +
        '</table>' +
        '</div>' +
        '<hr style="border: 1px solid #808080"/>' +
        '<div style="width: 100%;padding: 2px;" id="">' +
        '<div id="orderDiv">' +

        '</div>' +
        '</div>' +
        '<hr style="border: 1px solid #808080"/>' +
        '<div style="width: 100%;padding: 5px;" id="">' +
        '<table cellpadding="0" cellspacing="0" border="0" style="padding: 5px;width: 100%;" id="">' +
        '<tr>' +
        '<td>合计数量：</td>' +
        '<td></td>' +
        '<td></td>' +
        '<td id="allCount"></td>' +
        '</tr>' +
        '<tr>' +
        '<td>合计金额：</td>' +
        '<td></td>' +
        '<td></td>' +
        '<td id="allMoney"></td>' +
        '</tr>' +
        '</table>' +
        '</div></div>',
        buttons: [
            '->',
            '  ',
            {
                text: '<span style="font-size: 14px;font-weight: bold;">打印</span>',
                itemId: 'orderPrintBtn',
                //cls:'button_color',
                //style: 'background-color: #384251;background-image: url();',
                width: 90,
                height: 30,
                listeners:{
                    click:function(){
                        var that=this;
                        that.setDisabled(true);
                        setTimeout(function(){that.setDisabled(false);},2000);
                        Ext.getCmp('mainViewPort').getEl().mask("正在打印，请稍候");//遮罩
                        Ext.Ajax.request({
                            url: '../api/ManagementSystem/orderPrintAll',
                            params: {
                                orderList: JSON.stringify(PublicObject.orderList),
                                RandomTag: Math.random()
                            },
                            method: 'Post',
                            success: function (response, options) {
                                //debugger;
                                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                                var result = Ext.JSON.decode(response.responseText);
                                if (result.err) {
                                    Ext.MessageBox.alert('提示', result.err.message);
                                } else {
                                    Ext.getCmp('orderWin').destroy();
                                    Ext.MessageBox.alert('提示', '打印成功');
                                }
                            },
                            failure: function (response, options) {
                                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                            }
                        });
                    }
                }
            },
            {
                text: '<span style="font-size: 14px;font-weight: bold;">取消</span>',
                itemId: '',
                //hidden: true,
                width: 90,
                height: 30,
                listeners:{
                    click:function(){
                        Ext.getCmp('orderWin').destroy();
                    }
                }
            },
            '  ',
            '->'
        ]
    })
}).call(this);