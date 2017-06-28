(function () {
    Ext.define('ManagementSystem.view.MenuClassManagement', {
        extend: 'Ext.grid.Panel',
        xtype: 'menuClassManagement',
        id: 'menuClassManagementId',
        enableColumnMove: false,
        store: 'MenuClassStore',
        columns: [
            {
                xtype: "rownumberer", text: "序号", width: 40,
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    return store.lastOptions.start + rowIndex + 1;
                }
            },
            {
                text: '分类名称', flex: 1, dataIndex: 'menuclassname'
            },
            {
                text: '创建时间', flex: 2, dataIndex: 'createtime'
            },
            {
                text: '类型', flex: 1, dataIndex: 'menuclasstype',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    if (value == 1) {
                        str = "堂食";
                    } else if (value == 2) {
                        str = "外卖";
                    } else if (value == 3) {
                        str = "杂食";
                    }
                    return str;
                }
            },
            {
                text: '是否显示', flex: 1, dataIndex: 'ishide',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    if (value == 0) {
                        str = "不显示";
                    } else if (value == 1) {
                        str = "显示";
                    }
                    return str;
                }
            },
            {
                text: '排序', flex: 1, dataIndex: 'menuclasssort',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    if (value != "" && value != null && value != undefined) {
                        //value = value;
                    } else {
                        value = "";
                    }
                    var rec = record.raw;
                    str = "<div style='float: left'>" + value + "</div>" +
                        "<div style='float: left'>" +
                        "&nbsp;&nbsp;" +
                        "<img src='../../../resources/images/sort/shang.png' style='width: 15px;height: 15px' onclick='MenuClassSort(" + JSON.stringify(rec) + ",1)'>" +
                        "&nbsp;&nbsp;" +
                        "<img src='../../../resources/images/sort/xia.png' style='width: 15px;height: 15px' onclick='MenuClassSort(" + JSON.stringify(rec) + ",2)'>" +
                        "</div>";
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
                        html: '<div style="margin-left: 15px;font-size: 20px;font-weight: bold" id="TreeMenuClassManagementText"></div>'
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
                    {
                        text: '<span style="color: #ffffff;font-weight: bold">修改</span>',
                        itemId: 'btnEdit',
                        iconCls: 'button-icon-Edit'
                    }
                    //,
                    //{text: '删除', itemId: 'btnDel', iconCls: 'button-icon-Del'}
                    //,
                    //'->',
                    //{text: '导出Excel', itemId: 'btnExcel', iconCls: 'button-icon-Excel'}
                ]
            },
            {
                xtype: 'pagingtoolbar',
                store: 'MenuClassStore',
                dock: 'bottom',
                displayInfo: true
            }
        ]
    });
}).call(this);