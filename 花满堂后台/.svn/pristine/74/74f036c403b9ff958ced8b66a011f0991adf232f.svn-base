(function () {
    Ext.define('ManagementSystem.view.TaskManagement05', {
        extend: 'Ext.grid.Panel',
        xtype: 'taskManagement05',
        id: 'taskManagementId05',
        enableColumnMove: false,
        store: 'TaskStore',
        title:'订位堂食订单',
        columns: [
            {
                xtype: "rownumberer", text: "序号", width: 40,
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    return store.lastOptions.start + rowIndex + 1;
                }
            },
            {
                text: '订单号', flex: 2, dataIndex: 'id'
            },
            {
                text: '订餐时间', flex: 2, dataIndex: 'ordertime'
            },
            {
                text: '就餐时间', flex: 2, dataIndex: 'diningtime'
            },
            {
                text: '餐位', flex: 1, dataIndex: 'tableid'
            },
            {
                text: '客户数量', flex: 1, dataIndex: 'peoplecount'
            },
            {
                text: '金额', flex: 1, dataIndex: 'sumoney'
            },
            {
                text: '状态', flex: 1, dataIndex: 'taskstatus',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    //if (value != "" && value != null && value != undefined) {
                    if (value == 1) {
                        str = "<b style='color:#f1c40f;'>已下单</b>";
                    } else if (value == 2) {
                        str = "<b style='color:#04be02;'>正在出单</b>";
                    } else if (value == 3) {
                        str = "<b style='color:blue;'>派送中</b>";
                    } else if (value == 4) {
                        str = "<b style='color:green;'>订单完成</b>";
                    } else if (value == 5) {
                        str = "结账";
                    } else if (value == -1) {
                        str = "<b style='color:red;'>订单取消</b>";
                    }
                    //}
                    return str;
                }
            },
            {
                text: '支付状态', flex: 1, dataIndex: 'paymethod',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "未知";
                    //if (value != "" && value != null && value != undefined) {
                    if (value == 0) {
                        str = "<b style='color:#f1c40f;'>未支付</b>";
                    } else if (value == 1) {
                        str = "<b style='color:green;'>微信支付</b>";
                    } else if (value == 2) {
                        str = "<b style='color:blue;'>现金支付</b>";
                    }
                    //}
                    return str;
                }
            },
            {
                text: '详情', flex: 1,
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    str = "<a href='#' id='TaskDetailWin05'>详情</a>";
                    return str;
                }
            },
            {
                text: '操作', flex: 5,
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    //str = "<a href='#' id='CancelTaskDetail'>取消</a>";
                    if (record.get("taskstatus") == 1) {
                        if (record.get("paymethod") == 0) {
                            str = "<input type='button' value='打印订单' id='PrintTaskDetail05' style='cursor: pointer'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                            "<input type='button' value='现金支付' id='PaymentTaskDetail05' style='cursor: pointer'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                            "<input type='button' value='取消订单' id='CancelTaskDetail05' style='cursor: pointer'/>";
                        } else {
                            str = "<input type='button' value='打印订单' id='PrintTaskDetail05' style='cursor: pointer'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+
                            "<input type='button' value='结账单打印' id='PrintStatement' style='cursor: pointer'/>";
                        }
                    }else if(record.get("taskstatus")==4 || record.get("taskstatus")==5){
                        str="<input type='button' value='结账单打印' id='PrintStatement' style='cursor: pointer'/>"
                    }else if(record.get("taskstatus")=== -1){
                        str="订单已取消";
                    }  else {
                        str = "<input type='button' value='打印订单' id='PrintTaskDetail05' style='cursor: pointer'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                        "<input type='button' value='现金支付' id='PaymentTaskDetail05' style='cursor: pointer'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                    }
                    return str;
                }
            }
        ],
        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 35,
                style: 'background-color: #ffffff;background-image: url();',
                items: [
                    '    ',
                    {
                        xtype: 'datefield', name: 'startCreateTime', itemId: 'DateStart',
                        labelWidth: 80,
                        anchor: '100%',
                        format: 'Y-m-d',
                        width: 220,
                        fieldLabel:'时间范围从',
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
                    '  ',
                    {
                        text: '<span style="color: #ffffff;font-weight: bold">查询</span>',
                        itemId: 'BtnSearch',
                        style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                        width: 60
                    },
                    '  ',
                    {
                        text: '<span style="color: #ffffff;font-weight: bold">重置</span>',
                        itemId: 'BtnReset',
                        style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                        width: 60
                    }
                    ,
                    '  ',
                    '->'
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 35,
                style: 'background-color: #ffffff;background-image: url();',
                //defaults: {style: 'background-color: #f2af2c;background-image: url();margin:0 5px 0 5px;', width: 70},
                items: [
                    {
                        text: '<span style="color: #ffffff;font-weight: bold">立即刷新</span>',
                        itemId: 'BtnRefresh',
                        style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                        width: 60
                    }
                    ,
                    {
                        xtype: 'panel',
                        border: false,
                        bodyStyle: 'background-color: #eeeeee;background-image: url();',
                        html: '<div style="color: red;margin-left: 15px">当前页面还剩<span id="DaoJiShi05">30</span>秒将进行刷新！</div>'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '高级搜索(点击展开或收起)',
                style: 'background-color: #eeeeee;background-image: url();padding:5px;',
                //height: 120,
                //layout: 'anchor',
                //defaults: {anchor: '100%'},
                //border: false,
                collapsible: true,
                collapsed: false,
                items: [
                    {
                        xtype: "checkboxgroup",
                        style: 'background-color: #eeeeee;background-image: url();',
                        itemId: 'TaskStatus',
                        fieldLabel: "匹配关键字",
                        labelWidth: 80,
                        width: 600,
                        //columns: 5,
                        //border: false,
                        items: [
                            {boxLabel: "已下单", name: "1", id: 'TaskStatus01', itemId: 'TaskStatus01'},
                            {boxLabel: "正在出单", name: "2", id: 'TaskStatus02', itemId: 'TaskStatus02'},
                            {boxLabel: "已出单", name: "3", id: 'TaskStatus03', itemId: 'TaskStatus03'},
                            {boxLabel: "派送中", name: "4", id: 'TaskStatus04', itemId: 'TaskStatus04'},
                            {boxLabel: "订单完成", name: "5", id: 'TaskStatus05', itemId: 'TaskStatus05'}
                        ]
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                store: 'TaskStore',
                dock: 'bottom',
                displayInfo: true
            }
        ]
    });
}).call(this);