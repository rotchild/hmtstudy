(function () {
    Ext.define('ManagementSystem.view.MenuCodeWin', {
        extend: 'Ext.window.Window',
        xtype: 'menuCodeWin',
        id: 'menuCodeWinId',
        layout: 'fit',
        height: 600,
        width: 1000,
        modal: true,
        border: false,
        //style: 'background:#ffffff',
        items: [
            {
                itemId: 'MenuCodeWinGridPanel',
                xtype: 'gridpanel',
                layout: 'border',
                border: false,
                autoScroll: true,
                store: 'EvaluationStore',
                bodyStyle: 'background:#ffffff',
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
                        text: '创建时间', flex: 2, dataIndex: 'createtime'
                    },
                    {
                        text: '菜品数量', flex: 1, dataIndex: 'menucount'
                    },
                    {
                        text: '菜品评分', flex: 1, dataIndex: 'code'
                    },
                    {
                        text: '菜品评价', flex: 3, dataIndex: 'detail'
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
                        xtype: 'pagingtoolbar',
                        store: 'EvaluationStore',
                        dock: 'bottom',
                        displayInfo: true
                    }
                ]
            }
        ],
        buttons: [
            '->',
            {text: '取消', itemId: 'btnCancel'},
            '->'
        ]
    });
}).call(this);
