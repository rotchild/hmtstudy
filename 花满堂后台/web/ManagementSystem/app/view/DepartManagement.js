/**
 * Created by Administrator on 2016/9/22.
 * 部门管理
 */
(function () {
    Ext.define('ManagementSystem.view.DepartManagement', {
        extend: 'Ext.grid.Panel',
        xtype: 'departManagement',
        id: 'departManagement',
        enableColumnMove: false,
        store: 'DepartmentStore',
        columns: [
            {
                xtype: "rownumberer", text: "序号", width: 40,
                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                    return store.lastOptions.start + rowIndex + 1;
                }
            },
            {
                text: '出品部名称', flex: 2, dataIndex: 'departmentName'
            },
            {
                text: 'IP地址', flex: 1, dataIndex: 'ipAddress'
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
                        html: '<div style="margin-left: 15px;font-size: 20px;font-weight: bold" id="TreeMenuManagementTextText">部门管理</div>'
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
