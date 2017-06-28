(function () {
    Ext.define('ManagementSystem.view.OrderStatistics', {
        extend: 'Ext.grid.Panel',
        xtype: 'orderStatistics',
        id: 'orderStatisticsId',
        enableColumnMove: false,
        store: 'TaskStore',
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
            //{
            //    text: '接待员', flex: 2, dataIndex: 'id'
            //},
            {
                text: '订单类型', flex: 2, dataIndex: 'tasktype',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    if (value == 1) {
                        str = "堂食订单";
                    } else if (value == 2) {
                        str = "外卖订单";
                    } else if (value == 3) {
                        str = "杂食订单";
                    } else if (value == 4) {
                        str = "订位订单";
                    } else if (value == 5) {
                        str = "订位点餐订单";
                    }
                    return str;
                }
            },
            {
                text: '订单金额', flex: 1, dataIndex: 'sumoney'
            },
            {
                text: '订单状态', flex: 1, dataIndex: 'taskstatus',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    //if (value != "" && value != null && value != undefined) {
                    if (value == 1) {
                        str = "已下单";
                    } else if (value == 2) {
                        str = "正在出单";
                    } else if (value == 3) {
                        str = "派送中";
                    } else if (value == 4) {
                        str = "派送中";
                    } else if (value == 5) {
                        str = "订单完成";
                    } else if (value == -1) {
                        str = "订单取消";
                    }
                    //}
                    return str;
                }
            },
            {
                text: '支付状态', flex: 1, dataIndex: 'paymethod',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    //if (value != "" && value != null && value != undefined) {
                    if (value == 0) {
                        str = "未支付";
                    } else if (value == 1) {
                        str = "微信支付";
                    } else if (value == 2) {
                        str = "现金支付";
                    }
                    //}
                    return str;
                }
            },
            {
                text: '订餐时间', flex: 2, dataIndex: 'ordertime'
            }
        ],
        dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 35,
                style: 'background-color: #ffffff;background-image: url();',
                //defaults: {style: 'background-color: #f2af2c;background-image: url();margin:0 5px 0 5px;', width: 70},
                items: [
                    {
                        xtype: 'panel',
                        border: false,
                        bodyStyle: 'background-color: #eeeeee;background-image: url();',
                        html: '<div style="margin-left: 15px;font-size: 20px;font-weight: bold">订单统计（暂无表头说明）</div>'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 35,
                style: 'background-color: #ffffff;background-image: url();',
                items: [
                    '    ',
                    {
                        xtype: 'panel',
                        border: false,
                        bodyStyle: 'background:#eeeeee;',
                        html: '<span style="color: #000000;">时间范围  </span>'
                    },
                    {
                        xtype: 'datefield', name: 'startCreateTime', itemId: 'DateStart',
                        width: 150,
                        labelWidth: 15,
                        anchor: '100%',
                        format: 'Y-m-d',
                        fieldLabel: '从',
                        value: currentDate()[0],
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
                    }
                    //,
                    //'  ',
                    //{
                    //    xtype: 'panel',
                    //    border: false,
                    //    bodyStyle: 'background:#eeeeee;',
                    //    html: '<span style="color: #000000;">关键词：</span>'
                    //},
                    //{
                    //    xtype: 'textfield', width: 120, itemId: 'keyword'
                    //},
                    //'  ',
                    //{
                    //    text: '<span style="color: #ffffff;font-weight: bold">查询</span>',
                    //    itemId: 'BtnSearch',
                    //    style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                    //    width: 60
                    //},
                    //'  ',
                    //{
                    //    text: '<span style="color: #ffffff;font-weight: bold">重置</span>',
                    //    itemId: 'BtnReset',
                    //    style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                    //    width: 60
                    //},
                    //'  ',
                    ////'->',
                    //{
                    //    text: '<span style="color: #ffffff;font-weight: bold">导出Excel</span>',
                    //    itemId: 'BtnExport',
                    //    style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                    //    width: 70
                    //},
                    //'  '
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 35,
                style: 'background-color: #ffffff;background-image: url();',
                items: [
                    '    ',
                    //{
                    //    xtype: 'panel',
                    //    border: false,
                    //    bodyStyle: 'background:#eeeeee;',
                    //    html: '<span style="color: #000000;">时间范围  </span>'
                    //},
                    //{
                    //    xtype: 'datefield', name: 'startCreateTime', itemId: 'DateStart',
                    //    width: 150,
                    //    labelWidth: 15,
                    //    anchor: '100%',
                    //    format: 'Y-m-d',
                    //    fieldLabel: '从',
                    //    value: currentDate()[0],
                    //    editable: false, blankText: '必须选择起始时间',
                    //    listeners: {
                    //        select: function () {
                    //            if (this.getValue() > this.up('toolbar').down('#DateEnd').getValue()) {
                    //                Ext.Msg.alert('提示', '起始时间不能大于结束时间');
                    //                this.setValue(this.up('toolbar').down('#DateEnd').getValue());
                    //            }
                    //        }
                    //    }
                    //},
                    //{
                    //    xtype: 'datefield', name: 'endCreateTime', itemId: 'DateEnd',
                    //    width: 150,
                    //    labelWidth: 15,
                    //    anchor: '100%',
                    //    format: 'Y-m-d',
                    //    fieldLabel: '至',
                    //    value: currentDate()[1],
                    //    editable: false, blankText: '必须选择结束时间',
                    //    listeners: {
                    //        select: function () {
                    //            if (this.getValue() < this.up('toolbar').down('#DateStart').getValue()) {
                    //                Ext.Msg.alert('提示', '起始时间不能大于结束时间');
                    //                this.setValue(this.up('toolbar').down('#DateStart').getValue());
                    //            }
                    //        }
                    //    }
                    //},
                    //'  ',
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
                    },
                    '  ',
                    //'->',
                    {
                        text: '<span style="color: #ffffff;font-weight: bold">导出Excel</span>',
                        itemId: 'BtnExport',
                        style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                        width: 70
                    },
                    '  '
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
                        itemId: 'TaskType',
                        fieldLabel: "订单类型",
                        labelWidth: 80,
                        width: 600,
                        //columns: 5,
                        //border: false,
                        items: [
                            {boxLabel: "堂食订单", name: "1", id: 'TaskType01', itemId: 'TaskType01'},
                            {boxLabel: "外卖订单", name: "2", id: 'TaskType02', itemId: 'TaskType02'},
                            {boxLabel: "杂食订单", name: "3", id: 'TaskType03', itemId: 'TaskType03'},
                            {boxLabel: "订位订单", name: "4", id: 'TaskType04', itemId: 'TaskType04'},
                            {boxLabel: "订位点餐订单", name: "5", id: 'TaskType05', itemId: 'TaskType05'}
                        ]
                    },
                    {
                        xtype: "checkboxgroup",
                        style: 'background-color: #eeeeee;background-image: url();',
                        itemId: 'TaskStatus',
                        fieldLabel: "订单状态",
                        labelWidth: 80,
                        width: 700,
                        //columns: 5,
                        //border: false,
                        items: [
                            {boxLabel: "已下单", name: "1", id: 'TaskStatus01', itemId: 'TaskStatus01'},
                            {boxLabel: "正在出单", name: "2", id: 'TaskStatus02', itemId: 'TaskStatus02'},
                            {boxLabel: "派送中", name: "3", id: 'TaskStatus03', itemId: 'TaskStatus03'},
                            //{boxLabel: "派送中", name: "4", id: 'TaskStatus04', itemId: 'TaskStatus04'},
                            {boxLabel: "订单完成", name: "5", id: 'TaskStatus05', itemId: 'TaskStatus05'},
                            {boxLabel: "订单取消", name: "-1", id: 'TaskStatus06', itemId: 'TaskStatus06'}
                        ]
                    },
                    {
                        xtype: "checkboxgroup",
                        style: 'background-color: #eeeeee;background-image: url();',
                        itemId: 'PayMethod',
                        fieldLabel: "支付状态",
                        labelWidth: 80,
                        width: 400,
                        //columns: 5,
                        //border: false,
                        items: [
                            {boxLabel: "未支付", name: "0", id: 'PayMethod00', itemId: 'PayMethod00'},
                            {boxLabel: "微信支付", name: "1", id: 'PayMethod01', itemId: 'PayMethod01'},
                            {boxLabel: "现金支付", name: "2", id: 'PayMethod02', itemId: 'PayMethod02'}
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