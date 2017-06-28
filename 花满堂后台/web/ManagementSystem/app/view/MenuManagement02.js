(function () {
    Ext.define('ManagementSystem.view.MenuManagement02', {
        extend: 'Ext.grid.Panel',
        xtype: 'menuManagement02',
        id: 'menuManagementId02',
        enableColumnMove: false,
        store: 'MenuStore',
        columns: [
            {
                xtype: "rownumberer", text: "序号", width: 40,
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    return store.lastOptions.start + rowIndex + 1;
                }
            },
            {
                text: '菜品名称', flex: 2, dataIndex: 'dishname'
            },
            {
                text: '原价', flex: 1, dataIndex: 'standardprice'
            },
            {
                text: '折扣价', flex: 1, dataIndex: 'presentprice'
            },
            //{
            //    text: '外卖价格', flex: 1, dataIndex: 'outsprice'
            //},
            {
                text: '上架数量', flex: 1, dataIndex: 'dishcount'
            },
            {
                text:'分类',flex:1,dataIndex:'dishtype',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    if (value != "" && value != null && value != undefined) {
                        if (value == 1) {
                            str = "堂食";
                        } else if (value == 2) {
                            str = "外卖";
                        }else if (value == 3) {
                            str = "杂食";
                        }
                    }
                    return str;
                }
            },
            {
                text: '菜品类型', flex: 1, dataIndex: 'menuclassname'
            },
            {
                text: '标签', flex: 2, dataIndex: 'menutab',
                renderer: function (value) {
                    var str = "",valArr=value.split(",");
                    for(var i=0;i<valArr.length;i++){
                        if(valArr[i]=="A"){
                            str+="推荐、";
                        }if(valArr[i]=="B"){
                            str+="新品、";
                        }if(valArr[i]=="C"){
                            str+="限量、";
                        }if(valArr[i]=="D"){
                            str+="热卖、";
                        }if(valArr[i]=="E"){
                            str+="特价、";
                        }
                    }
                    return str;
                }
            },
            {
                text: '是否上架', flex: 1, dataIndex: 'isgrounding',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    if (value !== "" && value !== null && value !== undefined) {
                        if (value === 0) {
                            str = "已下架";
                        } else if (value == 1) {
                            str = "已上架";
                        }
                    }
                    return str;
                }
            },
            {
                text: '详情', flex: 1,
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    str = "<a href='#' id='MenuDetailWin'>详情</a>";
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
                        html: '<div style="margin-left: 15px;font-size: 20px;font-weight: bold" id="TreeMenuManagement02Text"></div>'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 35,
                style: 'background-color: #ffffff;background-image: url();',
                defaults: {style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;', width: 70},
                items: [
                    {
                        text: '<span style="color: #ffffff;font-weight: bold">添加</span>',
                        itemId: 'btnAdd',
                        iconCls: 'button-icon-Add'
                    },
                    {text: '<span style="color: #ffffff;font-weight: bold">修改</span>', itemId: 'btnEdit', iconCls: 'button-icon-Edit'}
                    //,
                    //{
                    //    text: '<span style="color: #ffffff;font-weight: bold">删除</span>',
                    //    itemId: 'btnDel',
                    //    iconCls: 'button-icon-Del'
                    //}
                    //,
                    //'->',
                    //{text: '导出Excel', itemId: 'btnExcel', iconCls: 'button-icon-Excel'}
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 35,
                style: 'background-color: #ffffff;background-image: url();',
                items: [
                    //'    ',
                    //{
                    //    xtype: 'panel',
                    //    border: false,
                    //    bodyStyle: 'background:#ffeed9;',
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
                        fieldLabel: '是否上架',
                        labelWidth: 60,
                        xtype: 'combobox',
                        store: Ext.create('Ext.data.Store', {
                            fields: ['name', 'value'],
                            data: [
                                {'name': '全部', 'value': -1},
                                {'name': '已上架', 'value': 1},
                                {'name': '已下架', 'value': 0}
                            ]
                        }),
                        value: -1,
                        queryMode: 'local',
                        valueField: 'value',
                        displayField: 'name',
                        itemId: 'isgrounding',
                        editable: false,//设为不可输入
                        enableKeyEvent: false
                    },
                    //'  ',
                    //{
                    //    xtype: 'combobox',
                    //    fieldLabel: '菜品类型',
                    //    labelWidth: 60,
                    //    itemId: 'dishtype',
                    //    store: Ext.create('Ext.data.Store', {
                    //        fields: ['name', 'value'],
                    //        data: [
                    //            {'name': '全部', 'value': -1},
                    //            {'name': '堂食', 'value': 1},
                    //            {'name': '外卖', 'value': 2}
                    //        ]
                    //    }),
                    //    queryMode: 'local',
                    //    triggerAction: 'all',
                    //    editable: false,
                    //    value: -1,
                    //    displayField: 'name',
                    //    valueField: 'value'
                    //},
                    //'  ',
                    '  ',
                    {
                        xtype: "checkboxgroup",
                        itemId: 'menutabW',
                        fieldLabel: "菜品标签",
                        width: 400,
                        bodyPadding: 5,
                        columns: 5,
                        items: [
                            {boxLabel: "推荐", name: "A", id: 'menutab1'},
                            {boxLabel: "新品", name: "B", id: 'menutab2'},
                            {boxLabel: "限量", name: "C", id: 'menutab3'},
                            {boxLabel: "热卖", name: "D", id: 'menutab4'},
                            {boxLabel: "特价", name: "E", id: 'menutab5'}
                        ]
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
                xtype: 'pagingtoolbar',
                store: 'MenuStore',
                dock: 'bottom',
                displayInfo: true
            }
        ]
    });
}).call(this);