(function () {
        Ext.define('ManagementSystem.view.UserGrid', {
        extend: 'Ext.grid.Panel',
        xtype: 'userGrid',
        id: 'userGridId',
        enableColumnMove: false,
        store: 'UserStore',
        columns: [
            {
                xtype: "rownumberer", text: "序号", width: 40,
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    //debugger;
                    return store.lastOptions.start + rowIndex + 1;
                }
            },
            {text: '用户姓名', flex: 1, dataIndex: 'username'},
            {
                text: '用户密码', flex: 1, dataIndex: 'password',
                renderer: function (_value, _metaData, _record, _rowIdx, _colIdx, _store) {
                    var str = "";
                    str = "***";
                    return str;
                }
            },
            {text: '真实姓名', flex: 1, dataIndex: 'realname'},
            {text: '联系方式', flex: 1, dataIndex: 'mobile'},
            {
                text: '用户级别', flex: 1, dataIndex: 'userclass',
                renderer: function (_value, _metaData, _record, _rowIdx, _colIdx, _store) {
                    var str = "";
                    switch (_value) {
                        case 1:
                            str = '管理员';
                            break;
                        case 2:
                            str = '店长';
                            break;
                        case 3:
                            str = '前台';
                            break;
                        case 4:
                            str = '外卖配送';
                            break;
                        default :
                            str="数据有误";
                            break;
                    }
                    return str;
                }
            },
            {
                text: '任务权限', flex: 3, dataIndex: 'rolestr',
                renderer: function (_value, _metaData, _record, _rowIdx, _colIdx, _store) {
                    var classname = "";
                    var str = _value.split(",");
                    for (var i = 0; i < str.length; i++) {
                        var keys = str[i];
                        if (keys == 1) {
                            classname += "用户管理、"
                        } else if (keys == 2) {
                            classname += "维护菜单、"
                        } else if (keys == 3) {
                            classname += "订单列表、"
                        } else if (keys == 4) {
                            classname += "数据统计、"
                        } else if (keys == 5) {
                            classname += "部门管理、"
                        } else if (keys == 6) {
                            classname += "配送管理、"
                        }else if (keys == 7) {
                            classname += "系统设置、"
                        }
                    }
                    return classname;
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
                        html: '<div style="margin-left: 15px;font-size: 20px;font-weight: bold" id="TreeUserGridText"></div>'
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
                    },
                    {
                        text: '<span style="color: #ffffff;font-weight: bold">删除</span>',
                        itemId: 'btnDel',
                        iconCls: 'button-icon-Del'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 35,
                style: 'background-color: #ffffff;background-image: url();',
                items: [
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
                xtype: 'pagingtoolbar',
                store: 'UserStore',
                dock: 'bottom',
                displayInfo: true
            }
        ]
    });
}).call(this);