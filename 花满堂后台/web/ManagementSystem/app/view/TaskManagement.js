/**堂食订单**/
(function () {
    Ext.define('ManagementSystem.view.TaskManagement', {
        extend: 'Ext.grid.Panel',
        xtype: 'taskManagement',
        id: 'taskManagementId',
        enableColumnMove: false,
        store: 'TaskStore',
        features: [
            {ftype: 'grouping'}
        ],
        //plugins: [
        //    Ext.create('Ext.grid.plugin.RowEditing', {
        //        clicksToEdit: 1
        //    })
        //],
        columns: [
            //{
            //    xtype: "rownumberer", text: "序号", width: 40,
            //    renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
            //        return store.lastOptions.start + rowIndex + 1;
            //    }
            //},
            {
                header: '订单号', flex: .6, dataIndex: 'pOrder'
            },
            {
                header: '子订单号', flex: .6, dataIndex: 'id'
            },
            {
                header: '订单类型', flex: 1, dataIndex: '',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    if (record.get('pOrder') != record.get('id')) {
                        if (record.get('sumoney') * 1 > 0) {
                            str = "堂食订单加菜";
                        } else if (record.get('sumoney') * 1 < 0) {
                            str = "堂食订单减菜";
                        }
                    } else if (record.get('reservationid')) {
                        str = '<span style="color:red;">订位堂食订单</span>';
                    } else str = '<span style="color:blue;">堂食订单</span>';
                    if (record.get("tasktype") == 6) {
                        str = "添加服务";
                    }
                    return str;
                }
            },
            {
                header: '下单时间', flex: 1, dataIndex: 'ordertime'
            },
            {
                header: '桌位号', flex: 1, dataIndex: 'tableid'
            },
            {
                header: '就餐人数', flex: .5, dataIndex: 'peoplecount'
            },
            {
                header: '就餐联系人', flex: .5, dataIndex: 'realname'
            },
            {
                header: '就餐联系电话', flex: 1, dataIndex: 'mobile'
            },
            {
                header: '金额', flex: .5, dataIndex: 'sumoney'
            },
            {
                header: '状态', flex: 1, dataIndex: 'taskstatus',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    switch (value) {
                        case -1:
                            str = "<b style='color:red;'>订单已取消</b>";
                            break;
                        case 1:
                            str = "<b style='color:#f1c40f;'>已下单</b>";
                            break;
                        case 2:
                            str = "<b style='color:green;'>已打印</b>";
                            break;
                        case 3:
                            str = "<b style='color:#ac2925;'>正在出单</b>";
                            break;
                        case 4:
                            str = "<b style='color:blue;'>正在出单</b>";
                            break;
                        case 5:
                            str = "订单完成";
                            break;
                        //case 6:
                        //    str="堂食订单添加服务";
                        //    break;
                        default:
                            str = "";
                            break;
                    }
                    return str;
                }
            },
            {
                header: '支付状态', flex: 1, dataIndex: 'paymethod',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "未知";
                    switch (parseInt(value)) {
                        case 0:
                            str = "<b style='color:red;'>未支付</b>";
                            break;
                        case 1:
                            str = "<b style='color:green;'>微信支付</b>";
                            break;
                        case 2:
                            str = "<b style='color:blue;'>现金支付</b>";
                            break;
                        case 3:
                            str = "<b style='color:#040404;'>会员卡支付</b>";
                            break;
                        case 4:
                            str = "<b style='color:#550000;'>银联支付</b>";
                            break;
                        case 5:
                            str = "<b style='color:#ac2925;'>支付宝支付</b>";
                            break;
                        //case 6:
                        //    str = "堂食订单添加服务";
                        //    break;
                        default:
                            str = "";
                            break;
                    }
                    return str;
                }
            },
            {
                header: '详情', flex: .5,
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    str = "<a href='#' id='TaskDetailWin'>详情</a>";
                    return str;
                }
            },
            {
                header: '操作', flex: 1.5,
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    if (record.data.reservationid) {
                        str = '<a href="###" id="DWTS">订位堂食订单</a>';
                    } else if (record.data.taskstatus == 6) {
                        str = "堂食订单添加服务";
                    } else {
                        str = "<input type='button' value='加菜' id='addDish' style='cursor: pointer'/>" +
                            "<input type='button' value='减菜' id='deleteDish' style='margin-left:10px;cursor: pointer'/>" +
                            "<input type='button' value='服务项目' id='addService' style='margin-left:10px;cursor: pointer'/>";
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
                //defaults: {style: 'background-color: #f2af2c;background-image: url();margin:0 5px 0 5px;', width: 70},
                items: [
                    {
                        xtype: 'panel',
                        border: false,
                        bodyStyle: 'background-color: #eeeeee;background-image: url();',
                        html: '<div style="margin-left: 15px;font-size: 20px;font-weight: bold" id="">堂食订单</div>'
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
                        xtype: 'datefield', name: 'startCreateTime', itemId: 'DateStart',
                        width: 220,
                        fieldLabel: '时间范围从',
                        labelWidth: 80,
                        anchor: '100%',
                        format: 'Y-m-d',
                        value: currentDate()[2],
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
                        xtype: 'textfield', width: 160, itemId: 'keyword', fieldLabel: '关键词', labelWidth: 50
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
                    '->',
                    //{
                    //    text: '<span style="color: #000000;">导出Excel</span>',
                    //    itemId: 'BtnExport',
                    //    style: 'background-color: #f2af2c;background-image: url();margin:0 5px 0 5px;',
                    //    width: 70
                    //},
                    '  '
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 35,
                style: 'background-color: #ffffff;',
                //defaults: {style: 'background-color: #f2af2c;background-image: url();margin:0 5px 0 5px;', width: 70},
                items: [
                    {
                        text: '<span style="color: #ffffff;font-weight: bold">立即刷新</span>',
                        itemId: 'BtnRefresh',
                        style: 'background-color: #384251;margin:0 5px 0 5px;',
                        width: 64
                    }
                    ,
                    {
                        xtype: 'panel',
                        border: false,
                        html: '<div style="color: red;margin-left: 10px;width:100%;">当前页面还剩<span id="DaoJiShi" style="font-weight: bolder;margin:0 5px;">30</span>秒将进行刷新！</div>'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: '高级搜索(点击展开或收起)',
                layout: 'column',
                collapsible: true,
                collapsed: false,
                items: [
                    {
                        xtype: 'combobox',
                        fieldLabel: '桌位号',
                        itemId: 'tableid',
                        mode: 'local',
                        triggerAction: 'all',
                        multiSelect: false,//允许多选
                        editable: false,
                        value: "全部",
                        labelWidth: 60,
                        width: 200,
                        displayField: 'tableName',
                        hiddenName: 'id',
                        valueField: 'id',
                        disabled: false,
                        store: "tableStore",
                        forceSelection: true,// 必须选择一个选项
                        blankText: '请选择'// 该项如果没有选择，则提示错误信息
                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: '订单状态',
                        itemId: 'taskstatus',
                        mode: 'local',
                        triggerAction: 'all',
                        multiSelect: false,//允许多选
                        editable: false,
                        value: 0,
                        labelWidth: 60,
                        width: 200,
                        displayField: 'name',
                        hiddenName: 'value',
                        valueField: 'value',
                        disabled: false,
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                                {'name': '全部', 'value': 0},
                                {'name': '已下单', 'value': 1},
                                {'name': '已打印', 'value': 2},
                                {'name': '正在出单', 'value': 3},
                                //{'name': '正在出单', 'value': 4},
                                {'name': '订单完成', 'value': 5},
                                {'name': '订单已取消', 'value': 6}
                            ]
                        }),
                        forceSelection: true,// 必须选择一个选项
                        blankText: '请选择'// 该项如果没有选择，则提示错误信息,
                    },
                    {
                        xtype: 'toolbar',
                        border: false,
                        items: [
                            "->",
                            {
                                text: '<span style="color: #ffffff;font-weight: bold">现场支付</span>',
                                itemId: 'spotPayBtn',
                                style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                                width: 62
                            }
                            ,
                            {
                                text: '<span style="color: #ffffff;font-weight: bold">取消订单</span>',
                                itemId: 'cancelPayBtn',
                                style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                                width: 62
                            },
                            {
                                text: '<span style="color: #ffffff;font-weight: bold">打印订单</span>',
                                itemId: 'printOrderBtn',
                                style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                                width: 62
                            },
                            {
                                text: '<span style="color: #ffffff;font-weight: bold">打印消费清单</span>',
                                itemId: 'printPayBtn',
                                style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                                width: 86
                            }
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