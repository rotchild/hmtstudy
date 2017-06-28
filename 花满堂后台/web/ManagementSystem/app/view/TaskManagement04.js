//订位订单
(function () {
    Ext.define('ManagementSystem.view.TaskManagement04', {
        extend: 'Ext.grid.Panel',
        xtype: 'taskManagement04',
        id: 'taskManagementId04',
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
                text: '订单号', flex: 1, dataIndex: 'id'
            },
            {
                text: '联系人', flex: 1, dataIndex: 'realname'
            },
            {
                text: '联系方式', flex: 1, dataIndex: 'mobile'
            },
            //{
            //    text: '配送地址', flex: 3, dataIndex: 'address'
            //},
            {
                text: '人数', flex: 1, dataIndex: 'peoplecount'
            },
            {
                text: '下单时间', flex: 1.5, dataIndex: 'ordertime'
            },
            {
                text: '就餐时间', flex: 1.5, dataIndex: 'ordertabletime'
            },
            {
                text: '环境', flex: 1, dataIndex: 'tableid'
            },
            {
                text: '详情', flex: 1, dataIndex: '',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    str = "<a href='#' id='TaskDetailWin04'>详情</a>";
                    return str;
                }
            },
            {
                text: '状态', flex: 1, dataIndex: 'taskstatus',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    if (value != "" && value != null && value != undefined) {
                        if (value == 1) {
                            str = "<span style='color:red;'>未到达</span>";
                        } else if (value == 2) {
                            str = "<span style='color:green;'>已到达<span>";
                        } else if (value == -1) {
                            str = "订单已取消";
                        }
                    }
                    return str;
                }
            },
            /**{
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
            },**/
            {
                text: '操作', flex: 5,
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    if (record.get("taskstatus") == 1) {
                        str = "<input type='button' value='客户到达' id='arriveBtn' style='cursor: pointer'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                            "<input type='button' value='打印订单' id='PrintTaskDetail04' style='cursor: pointer'/>";
                    }else if(record.get("taskstatus")==2){
                        str="<input type='button' value='打印订单' id='PrintTaskDetail04' style='cursor: pointer'/>"
                    }else if(record.get("taskstatus")=== -1){
                        str="订单已取消";
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
                        html: '<div style="margin-left: 15px;font-size: 20px;font-weight: bold" id="">订位订单</div>'
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
                        width: 64
                    }
                    ,
                    {
                        xtype: 'panel',
                        border: false,
                        bodyStyle: 'background-color: #eeeeee;background-image: url();',
                        html: '<div style="color: red;margin-left: 10px;width:100%;">当前页面还剩<span id="DaoJiShi04" style="font-weight: bolder;margin:0 5px;">30</span>秒将进行刷新！</div>'
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
                            {boxLabel: "未到达", name: "1", id: 'TaskStatus01', itemId: 'TaskStatus01'},
                            {boxLabel: "已到达", name: "2", id: 'TaskStatus02', itemId: 'TaskStatus02'}
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