Ext.define('ManagementSystem.view.WestPanel', {
    extend: 'Ext.Panel',
    xtype: 'westPanel',//alias : 'widget.northPanel',等价
    border: false,
    width: 201,
    layout: 'fit',
    id: 'westPanel',
    items: [
        {
            xtype: 'tree',
            id: 'wpTreePanel',
            border: false,
            bodyStyle: 'background-color:#eeeeee;',
            rootVisible: false,
            lines: false
            //,
            ////useArrows:false,
            //root: {
            //    //expanded: true,
            //    //children: [
            //    //    {
            //    //        text: "用户管理",
            //    //        //expanded: true,
            //    //        name: 1,
            //    //        children: [
            //    //            {
            //    //                text: "管理员",
            //    //                name: 11,
            //    //                leaf: true
            //    //                //, iconCls: 'tree-icon-User'
            //    //                //, iconCls: 'no-icon'
            //    //            },
            //    //            {
            //    //                text: "店长",
            //    //                name: 12,
            //    //                leaf: true
            //    //                //, iconCls: 'tree-icon-User'
            //    //                //, iconCls: 'no-icon'
            //    //            },
            //    //            {
            //    //                text: "前台",
            //    //                name: 13,
            //    //                leaf: true
            //    //                //, iconCls: 'tree-icon-User'
            //    //                //, iconCls: 'no-icon'
            //    //            }
            //    //        ]
            //    //    },
            //    //    {
            //    //        text: "维护菜单",
            //    //        //expanded: true,
            //    //        name: 2,
            //    //        children: [
            //    //            {
            //    //                text: "分类管理",
            //    //                name: 21,
            //    //                //leaf: true,
            //    //                expanded: true,
            //    //                children: [
            //    //                    {
            //    //                        text: "堂食",
            //    //                        name: 211,
            //    //                        leaf: true
            //    //                        //, iconCls: 'tree-icon-User'
            //    //                        //, iconCls: 'no-icon'
            //    //                    },
            //    //                    {
            //    //                        text: "外卖",
            //    //                        name: 212,
            //    //                        leaf: true
            //    //                        //, iconCls: 'tree-icon-User'
            //    //                        //, iconCls: 'no-icon'
            //    //                    },
            //    //                    {
            //    //                        text: "杂食",
            //    //                        name: 213,
            //    //                        leaf: true
            //    //                        //, iconCls: 'tree-icon-User'
            //    //                        //, iconCls: 'no-icon'
            //    //                    }
            //    //                ]
            //    //            },
            //    //            {
            //    //                text: "菜品管理",
            //    //                name: 22,
            //    //                //leaf: true,
            //    //                expanded: true,
            //    //                children: [
            //    //                    {
            //    //                        text: "堂食",
            //    //                        name: 221,
            //    //                        //leaf: true,
            //    //                        expanded: true
            //    //                    },
            //    //                    {
            //    //                        text: "外卖",
            //    //                        name: 222,
            //    //                        //leaf: true,
            //    //                        expanded: true
            //    //                    },
            //    //                    {
            //    //                        text: "杂食",
            //    //                        name: 223,
            //    //                        //leaf: true,
            //    //                        expanded: true
            //    //                    }
            //    //                ]
            //    //            }
            //    //        ]
            //    //    },
            //    //    {
            //    //        text: "订单列表",
            //    //        //expanded: true,
            //    //        name: 3,
            //    //        children: [
            //    //            {
            //    //                text: "堂食订单<span id='TS_Count' style='color: red'></span>",
            //    //                name: 31,
            //    //                leaf: true
            //    //            },
            //    //            {
            //    //                text: "外卖订单<span id='WM_Count' style='color: red'></span>",
            //    //                name: 32,
            //    //                leaf: true
            //    //            },
            //    //            {
            //    //                text: "杂食订单<span id='ZS_Count' style='color: red'></span>",
            //    //                name: 33,
            //    //                leaf: true
            //    //            },
            //    //            {
            //    //                text: "订位订单<span id='DW_Count' style='color: red'></span>",
            //    //                name: 34,
            //    //                leaf: true
            //    //            }
            //    //        ]
            //    //    },
            //    //    {
            //    //        text: "数据统计",
            //    //        //expanded: true,
            //    //        name: 4,
            //    //        children: [
            //    //            {
            //    //                text: "菜品统计",
            //    //                name: 41,
            //    //                leaf: true
            //    //            },
            //    //            {
            //    //                text: "订单统计",
            //    //                name: 42,
            //    //                leaf: true
            //    //            }
            //    //        ]
            //    //    },
            //    //    {
            //    //        text: "系统设置",
            //    //        //expanded: true,
            //    //        name: 5,
            //    //        children: [
            //    //            {
            //    //                text: "订位设置",
            //    //                name: 51,
            //    //                leaf: true
            //    //            },
            //    //            {
            //    //                text: "外卖设置",
            //    //                name: 52,
            //    //                leaf: true
            //    //            }
            //    //        ]
            //    //    }
            //    //]
            //}
        }
    ]
});