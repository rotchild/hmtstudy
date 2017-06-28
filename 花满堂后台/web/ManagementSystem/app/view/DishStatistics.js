(function () {
    Ext.define('ManagementSystem.view.DishStatistics', {
        extend: 'Ext.grid.Panel',
        xtype: 'dishStatistics',
        id: 'dishStatisticsId',
        enableColumnMove: false,
        //layout: 'border',
        store: 'DishStatiStore',
        //autoScroll: true,
        columns: [
            {
                text: '菜品ID', flex: 1, dataIndex: 'menuid'
            },
            {
                text: '菜品名称', flex: 2, dataIndex: 'dishname'
            },
            {
                text: '分类名称', flex: 2, dataIndex: 'menuclassname'
            },
            {
                text: '菜品类型', flex: 1, dataIndex: 'menu_dishtype',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    if (value != "" && value != null && value != undefined) {
                        if (value == 1) {
                            str = "堂食";
                        } else if (value == 2) {
                            str = "外卖";
                        } else if (value == 3) {
                            str = "杂食";
                        }
                    }
                    return str;
                }
            },
            {
                text: '数量', flex: 1, dataIndex: 'menu_sellcount',renderer:function(value){
                if(value){
                    return value;
                }else {
                    return 0;
                }
            }
            }
//            {
//                text: '现价', flex: 1, dataIndex: 'presentprice'
//            },
//            {
//                text: '销售金额', flex: 1, dataIndex: 'SalesAmount'
//            },
//            {
//                text: '菜单总销售金额', flex: 1, dataIndex: 'MenuSalesAmount'
//            },
//            {
//                text: '占菜单总销售额度比', flex: 1, dataIndex: 'MenuSalesAmountRate'
//                //,
//                //renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
//                //    var str = "";
//                //    str = value * 100;
//                //    return str + "%";
//                //}
//            },
//            {
//                text: '总营收额', flex: 1, dataIndex: 'TotalAmount'
//            },
//            {
//                text: '占总营收额比', flex: 1, dataIndex: 'TotalAmountRate'
                //,
                //renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                //    var str = "";
                //    str = value * 100;
                //    return str + "%";
                //}
//            }
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
                        html: '<div style="margin-left: 15px;font-size: 20px;font-weight: bold">菜品统计（暂无表头说明）</div>'
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
                    //}
                    //,
                    //'  ',
                    //{
                    //    xtype: 'combobox',
                    //    fieldLabel: '菜品类型',
                    //    labelWidth: 60,
                    //    itemId: 'dishtype',
                    //    store: Ext.create('Ext.data.Store', {
                    //        fields: ['name', 'value'],
                    //        data: [
                    //            //{'name': '全部', 'value': -1},
                    //            {'name': '堂食', 'value': 1},
                    //            {'name': '外卖', 'value': 2},
                    //            {'name': '杂食', 'value': 3}
                    //        ]
                    //    }),
                    //    queryMode: 'local',
                    //    triggerAction: 'all',
                    //    editable: false,
                    //    value: 1,
                    //    displayField: 'name',
                    //    valueField: 'value'
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
                    //'->',
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
                        xtype: 'combobox',
                        fieldLabel: '菜品类型',
                        labelWidth: 60,
                        itemId: 'dishtype',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                                {'name': '全部', 'value': -1},
                                {'name': '堂食', 'value': 1},
                                {'name': '外卖', 'value': 2},
                                {'name': '杂食', 'value': 3}
                            ]
                        }),
                        queryMode: 'local',
                        triggerAction: 'all',
                        editable: false,
                        value: -1,
                        displayField: 'name',
                        valueField: 'value'
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
                xtype:'toolbar',
                dock:'bottom',
                height:35,
                items:[
                    {
                        html:'<div>' +
                            '<table>' +
                            '<tr>' +
                            '<td style="background-color:cadetblue ;width: 60px;"  >汇总：</td>'+
                            '<td>总数量：<span id="totalcount"></span>,</td>'+
                            '<td>堂食：<span id="tangshicount"></span>,</td>'+
                            '<td>外卖：<span id="waimaicount"></span>,</td>'+
                            '<td>食杂：<span id="shizacount"></span></td>'+
                            '</tr>'+
                            '</table>'+
                            '</div>'
                    }
                ]
            }

        ]
    });
}).call(this);