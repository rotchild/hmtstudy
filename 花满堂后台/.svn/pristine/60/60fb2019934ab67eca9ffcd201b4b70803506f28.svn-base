/**
 * Created by Administrator on 2016/9/13.
 * 加菜窗口
 */
(function () {
    Ext.define('ManagementSystem.view.deleteDishWin', {
        extend: 'Ext.window.Window',
        xtype: 'deleteDishWin',
        id: 'deleteDishWin',
        layout: 'border',
        height: 690,
        width: 1000,
        modal: true,
        border: false,
        //style: 'background:#ffffff',
        items: [
            {
                xtype: 'panel',
                region: 'north',
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        border: true,
                        height: 35,
                        style: '',
                        defaults: {style: 'margin:0 5px 0 5px;padding:0 5px 0 5px;'},
                        items: [
                            {
                                xtype: 'textfield', width: 180, itemId: 'keyword', fieldLabel: '关键词', labelWidth: 60
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnSearch',
                                style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                                text: '<span style="color: #ffffff;font-weight: bold">查询</span>',
                                width: 60
                            }
                            ,
                            {
                                xtype: 'button',
                                itemId: 'btnReset',
                                text: '<span style="color: #ffffff;font-weight: bold">重置</span>',
                                style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                                width: 60
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'panel',
                region: 'center',
                layout: 'fit',
                items: [
                    {
                        xtype: 'gridpanel',
                        border: false,
                        store: 'AllmenuStore2',
                        itemId: 'menuGrid',
                        columns: [
                            {
                                xtype: "rownumberer", text: "序号", width: 40,
                                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                                    return store.lastOptions.start + rowIndex + 1;
                                }
                            },
                            {
                                text: '菜品名称', flex: 1, dataIndex: 'dishname'
                            },
//                            {
//                                text: '菜品分类', flex: 1, dataIndex: 'dishtype',
//                                renderer: function (value) {
//                                    var str = "";
//                                    if (value == 1) {
//                                        str = "堂食";
//                                    }
//                                    if (value == 2) {
//                                        str = "外卖";
//                                    }
//                                    if (value == 3) {
//                                        str = "食杂";
//                                    }
//                                    return str;
//                                }
//                            },
//                            {
//                                text: '菜品类型', flex: .7, dataIndex: 'menuclassname'
//                            },
                            {
                                text: '单价', flex: .5, dataIndex: 'presentprice'
                            },
                            {
                                text: '数量', flex: .7, dataIndex: 'menucount'
                            },
                            {
                                text: '减菜', flex: 1.2, dataIndex: 'menucount2',
                                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                                    var dishid = record.raw.dishid;
                                    var str = "<input type='text' style='width: 50px;text-align: center' " +
                                        "value='" + value + "' id='menucount2_" + record.raw.dishid + "' " +
                                        "class='inputV' " +
                                        "onblur=\"DeleteDish('" + dishid + "','" + record.raw.menucount + "')\" " +
                                        "onkeyup=\"DeleteDish('" + dishid + "','" + record.raw.menucount + "')\">";
                                    return str;
                                }
                            }
                        ]
                    }
                ]
            }
//            ,
//            {
//                xtype: 'panel',
//                title: '<b>购物车</b>',
//                itemId: 'addCart',
//                region: 'east',
//                width: 510,
//                collapsible: true,
//                collapsed: true,
//                split: true,
//                layout: 'border',
//                items: [
//                    {
//                        xtype: 'panel',
//                        region: 'center',
//                        layout: 'fit',
//                        autoScroll: true,
//                        html: '<ul id="cartUl">' +
//                            '<li><span class="headSpan" style="display:none;">序号</span>' +
//                            '<span class="headSpan">菜品名称</span>' +
//                            '<span class="headSpan">分类</span>' +
//                            '<span class="headSpan">数量</span>' +
//                            '<span class="headSpan">单价</span>' +
//                            '<span class="headSpan">删除</span></li>' +
//                            '</ul>'
//                    }
//                ]
//            }
        ],
        buttons: [
            '->',
            {text: '确定', itemId: 'btnEnter'},
            {text: '取消', itemId: 'btnCancel'},
            '->'
        ]
    });
}).call(this);