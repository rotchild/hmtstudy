/**
 * Created by Administrator on 2016/9/19.
 * 服务类管理
 */
(function () {
    Ext.define('ManagementSystem.view.ServiceManagement', {
        extend: 'Ext.grid.Panel',
        xtype: 'serviceManagement',
        id: 'serviceManagement',
        enableColumnMove: false,
        store: 'ServiceClassStore',
        columns: [
            {
                xtype: "rownumberer", text: "序号", width: 40,
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    return store.lastOptions.start + rowIndex + 1;
                }
            },
            {
                text: '服务名称', flex: 2, dataIndex: 'servicename'
            },
            {
                text: '价格', flex: 1, dataIndex: 'price'
            },
            {
                text: '分类', flex: 1, dataIndex: 'type',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    if (value != "" && value != null && value != undefined) {
                        if (value == 1) {
                            str = "堂食";
                        } else if (value == 2) {
                            str = "外卖";
                        } else if (value == 3) {
                            str = "食杂";
                        }
                    }
                    return str;
                }
            },
            {
                text: '是否默认', flex: 1, dataIndex: 'isdefault',
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    var str = "";
                    if (value !== "" && value !== null && value !== undefined) {
                        if (value === 0) {
                            str = "否";
                        } else if (value === 1) {
                            str = "是";
                        }
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
                        html: '<div style="margin-left: 15px;font-size: 20px;font-weight: bold" id="TreeMenuManagementTextText">服务类管理</div>'
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
                    //{
                    //    text: '<span style="color: #ffffff;font-weight: bold">删除</span>',
                    //    itemId: 'btnDel',
                    //    iconCls: 'button-icon-Del'
                    //}
                ]
            }
        ]
    });
}).call(this);