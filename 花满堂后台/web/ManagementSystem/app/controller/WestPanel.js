var d_d=0;
Ext.define('ManagementSystem.controller.WestPanel', {
    extend: 'Ext.app.Controller',
    views: [
        'MenuClassManagement'
        , 'MenuManagement'
        , 'MenuManagement02'
        , 'TaskManagement'
        , 'TaskManagement02'
        , 'TaskManagement03'
        , 'TaskManagement04'
        , 'TaskManagement05'
        , 'UserGrid'
        , 'TableOrderSetting'
        , 'TableOrderSetting02'
        , 'DishStatistics'
        , 'OrderStatistics'
        , 'MenuCodeWin'
    ],
    stores: [
        'MenuClassStore'
        , 'MenuStore'
        , 'TaskStore'
        , 'UserStore'
        , 'EvaluationMenuStore'
        , 'EvaluationStore','DiliverymanStore','DiliveryStore'
    ],
    init: function () {
        this.control({
            //'#westPanel': {
            //    'render': function () {
            //        debugger;
            //        var wpTreePanel = Ext.getCmp('wpTreePanel');
            //        ManagementSystem.app.getWestPanelController().TreeShow(wpTreePanel);
            //    }
            //},
            '#westPanel #wpTreePanel': {
                'itemclick': function (tree, record, item, index, e, eOpts) {

                    //debugger;

                    var TreeMenuClass = PublicObject.TreeMenuClass;

                    if (record.raw.name.toString().split("_").length == 1) {

                        if (record.raw.name == 11) {//管理员

                            PublicObject.selectTreeName = record;

                            this.UserGrid();

                        } else if (record.raw.name == 12) {//店长

                            PublicObject.selectTreeName = record;

                            this.UserGrid();

                        } else if (record.raw.name == 13) {//前台

                            PublicObject.selectTreeName = record;

                            this.UserGrid();

                        }else if (record.raw.name == 14) {//外卖配送

                            PublicObject.selectTreeName = record;

                            this.UserGrid();

                        } else if (record.raw.name == 211) {//分类管理 堂食

                            PublicObject.selectTreeName = record;

                            this.MenuClassManagement();

                        } else if (record.raw.name == 212) {//分类管理 外卖

                            PublicObject.selectTreeName = record;

                            this.MenuClassManagement();

                        } else if (record.raw.name == 213) {//分类管理 杂食

                            PublicObject.selectTreeName = record;

                            this.MenuClassManagement();

                        }
                        else if (record.raw.name == 231) {//服务类管理 堂食

                            PublicObject.selectTreeName = record;

                            this.serviceManagement();

                        } else if (record.raw.name == 232) {//服务类管理 外卖

                            PublicObject.selectTreeName = record;

                            this.serviceManagement();

                        } else if (record.raw.name == 233) {//服务类管理 杂食

                            PublicObject.selectTreeName = record;

                            this.serviceManagement();

                        }
                        else if (record.raw.name == 3) {//订单列表

                            PublicObject.selectTreeName = record;
                            //
                            //this.TaskManagement();

                            //debugger;

                            this.TaskListCount();


                        } else if (record.raw.name == 31) {//堂食订单

                            PublicObject.selectTreeName = record;

                            this.TaskManagement();

                        } else if (record.raw.name == 32) {//外卖订单

                            PublicObject.selectTreeName = record;

                            this.TaskManagement02();

                        } else if (record.raw.name == 33) {//杂食订单

                            PublicObject.selectTreeName = record;

                            this.TaskManagement03();

                        } else if (record.raw.name == 34) {//订位订单

                            PublicObject.selectTreeName = record;

                            this.TaskManagement04();

                        } else if (record.raw.name == 35) {//订位堂食订单

                            PublicObject.selectTreeName = record;

                            this.TaskManagement05();

                        } else if (record.raw.name == 41) {//菜品统计

                            PublicObject.selectTreeName = record;

                            this.DishStatistics();

                        } else if (record.raw.name == 42) {//订单统计

                            PublicObject.selectTreeName = record;

                            this.OrderStatistics();

                        }else if(record.raw.name == 6){
                            PublicObject.selectPlan = record;
                            this.DiliveryPlan(record);
                        }
                        else if(record.raw.name==61){ //配送员
                            PublicObject.selectTreeName = record;
                            this.DiliverymanGrid();
                        }
                        else if(record.raw.name==62){ //配送
                            PublicObject.selectTreeName = record;
                            this.DiliveryGrid();
                        }
                        else if (record.raw.name == 71) {//订位设置

                            PublicObject.selectTreeName = record;

                            this.TableOrderSetting();

                        } else if (record.raw.name == 72) {//外卖设置

                            PublicObject.selectTreeName = record;

                            this.TableOrderSetting02();

                        } else if (record.raw.name == 5) {//部门管理

                            PublicObject.selectTreeName = record;

                            this.departManagement();

                        }

                    } else {

                        //debugger;

                        //var name = record.raw.name.toString().split("_")[0];

                        PublicObject.selectTreeName = record;

                        this.MenuManagement02();

                        //debugger;

                    }
                }
            }
        });
    },
    TaskListCount: function () {
        //debugger;
        var wpTreePanel = Ext.getCmp('wpTreePanel');
        wpTreePanel.getRootNode().childNodes[PublicObject.TreeCount].expand(true);
        Ext.Ajax.request({
            url: '../api/ManagementSystem/GetTaskListCount',
            params: {
                taskstatus: "1",//1已下单，2正在出单，3已出单，4派送中，5订单完成,6订单取消
                tasktype: "1,2,3,4,5",//1：堂食 2：外卖 3：杂食 4：订位 5：订位堂食
                RandomTag: Math.random()
            },
            method: 'POST',
            success: function (response) {
                //debugger;
                var rspText = Ext.JSON.decode(response.responseText);
                if (rspText.success == true) {

                    var data = rspText.data[1];
                    var dataDW=rspText.data[0];
                    var TS_Count = 0;
                    var WM_Count = 0;
                    var ZS_Count = 0;
                    var DW_Count = 0;
                    var DWTS_Count = 0;

                    var TS_Data = [];
                    var WM_Data = [];
                    var ZS_Data = [];
                    var DW_Data = [];
                    var DWTS_Data = [];
                    if(data.length>0){
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].tasktype == 1) {
                                TS_Count++;
                                TS_Data[TS_Data.length] = data[i].id;
                            } else if (data[i].tasktype == 2) {
                                WM_Count++;
                                WM_Data[WM_Data.length] = data[i].id;
                            } else if (data[i].tasktype == 3) {
                                ZS_Count++;
                                ZS_Data[ZS_Data.length] = data[i].id;
                            }  else if (data[i].tasktype == 5) {
                                DWTS_Count++;
                                DWTS_Data[DWTS_Data.length] = data[i].id;
                            }
                        }
                    }
                    if(dataDW.length>0){
                        for(var w=0;w<dataDW.length;w++){
                            if(dataDW[w].tasktype == 4) {
                                DW_Count++;
                                DW_Data[DW_Data.length] = dataDW[w].id;
                            }
                        }
                    }

                    wpTreePanel.getRootNode().childNodes[PublicObject.TreeCount].removeAll();
                    var node1 = {
                        text: "堂食订单<span id='TS_Count' style='color: red'>(" + TS_Count + ")</span>",
                        name: 31,
                        leaf: true
                    };
                    var node2 = {
                        text: "外卖订单<span id='WM_Count' style='color: red'>(" + WM_Count + ")</span>",
                        name: 32,
                        leaf: true
                    };
                    var node3 = {
                        text: "食杂订单<span id='ZS_Count' style='color: red'>(" + ZS_Count + ")</span>",
                        name: 33,
                        leaf: true
                    };
                    var node4 = {
                        text: "订位订单<span id='DW_Count' style='color: red'>(" + DW_Count + ")</span>",
                        name: 34,
                        leaf: true
                    };
                    var node5 = {
                        text: "订位堂食订单<span id='DWTS_Count' style='color: red'>(" + DWTS_Count + ")</span>",
                        name: 35,
                        leaf: true
                    };

                    wpTreePanel.getRootNode().childNodes[PublicObject.TreeCount].appendChild(node1);
                    wpTreePanel.getRootNode().childNodes[PublicObject.TreeCount].appendChild(node2);
                    wpTreePanel.getRootNode().childNodes[PublicObject.TreeCount].appendChild(node3);
                    wpTreePanel.getRootNode().childNodes[PublicObject.TreeCount].appendChild(node4);
                    //wpTreePanel.getRootNode().childNodes[PublicObject.TreeCount].appendChild(node5);

                    //if (TS_Count > 0 || WM_Count > 0 ||ZS_Count > 0 ||DWTS_Count > 0) {
                    //    document.getElementById("TS_CurrentTask").play();
                    //}
                    Ext.getElementById("TS_Count").innerHTML = "(" + TS_Count + ")";
                    Ext.getElementById("WM_Count").innerHTML = "(" + WM_Count + ")";
                    Ext.getElementById("ZS_Count").innerHTML = "(" + ZS_Count + ")";
                    Ext.getElementById("DW_Count").innerHTML = "(" + DW_Count + ")";
                    //Ext.getElementById("DWTS_Count").innerHTML = "(" + DWTS_Count + ")";
                    //debugger;
                    if (PublicObject.TS_CurrentTask.length == 0) {
                        if (TS_Data.length > 0) {
                            if(Sys.ie){
                                document.getElementById("TS_CurrentIE").play();
                            }else{
                                document.getElementById("TS_CurrentTask").play();
                            }
                        }
                        PublicObject.TS_CurrentTask = TS_Data;
                    } else {
                        if (TS_Data.length > 0) {
                            if (TS_Data[0] > PublicObject.TS_CurrentTask[0]) {
                                if(Sys.ie){
                                    document.getElementById("TS_CurrentIE").play();
                                }else{
                                    document.getElementById("TS_CurrentTask").play();
                                }
                            }
                        }
                        PublicObject.TS_CurrentTask = TS_Data;
                        //for (var j = 0; j < TS_Data.length; j++) {
                        //
                        //    for (var j2 = 0; j2 < PublicObject.TS_CurrentTask.length; j2++) {
                        //
                        //        debugger;
                        //
                        //        if (TS_Data[j] != PublicObject.TS_CurrentTask[j2]) {
                        //
                        //            Ext.getElementById("TS_CurrentTask").play();
                        //
                        //            break;
                        //
                        //        }
                        //
                        //    }
                        //
                        //}
                    }

                    if (PublicObject.WM_CurrentTask.length == 0) {
                        if (WM_Data.length > 0) {
                            if(Sys.ie){
                                document.getElementById("TS_CurrentIE").play();
                            }else{
                                document.getElementById("TS_CurrentTask").play();
                            }
                        }
                        PublicObject.WM_CurrentTask = WM_Data;
                    } else {
                        if (WM_Data.length > 0) {
                            if (WM_Data[0] > PublicObject.WM_CurrentTask[0]) {
                                if(Sys.ie){
                                    document.getElementById("TS_CurrentIE").play();
                                }else{
                                    document.getElementById("TS_CurrentTask").play();
                                }
                            }
                        }
                        PublicObject.WM_CurrentTask = WM_Data;
                        //for (var k = 0; k < WM_Data.length; k++) {
                        //
                        //    for (var k2 = 0; k2 < PublicObject.WM_CurrentTask.length; k2++) {
                        //
                        //        debugger;
                        //
                        //        if (WM_Data[k] != PublicObject.WM_CurrentTask[k2]) {
                        //
                        //            Ext.getElementById("WM_CurrentTask").play();
                        //
                        //            break;
                        //
                        //        }
                        //
                        //    }
                        //
                        //}
                    }
                    if (PublicObject.ZS_CurrentTask.length == 0) {
                        if (ZS_Data.length > 0) {
                            if(Sys.ie){
                                document.getElementById("TS_CurrentIE").play();
                            }else{
                                document.getElementById("TS_CurrentTask").play();
                            }
                        }
                        PublicObject.ZS_CurrentTask = ZS_Data;
                    } else {
                        if (ZS_Data.length > 0) {
                            if (ZS_Data[0] > PublicObject.ZS_CurrentTask[0]) {
                                if(Sys.ie){
                                    document.getElementById("TS_CurrentIE").play();
                                }else{
                                    document.getElementById("TS_CurrentTask").play();
                                }
                            }
                        }
                        PublicObject.ZS_CurrentTask = ZS_Data;
                        //for (var m = 0; m < ZS_Data.length; m++) {
                        //
                        //    for (var m2 = 0; m2 < PublicObject.ZS_CurrentTask.length; m2++) {
                        //
                        //        debugger;
                        //
                        //        if (ZS_Data[m] != PublicObject.ZS_CurrentTask[m2]) {
                        //
                        //            Ext.getElementById("ZS_CurrentTask").play();
                        //
                        //            break;
                        //
                        //        }
                        //
                        //    }
                        //
                        //}
                    }
                    if (PublicObject.DW_CurrentTask.length == 0) {
                        if (DW_Data.length > 0) {
                            if(Sys.ie){
                                document.getElementById("TS_CurrentIE").play();
                            }else{
                                document.getElementById("TS_CurrentTask").play();
                            }
                        }
                        PublicObject.DW_CurrentTask = DW_Data;
                    } else {
                        if (DW_Data.length > 0) {
                            if (DW_Data[0] > PublicObject.DW_CurrentTask[0]) {
                                if(Sys.ie){
                                    document.getElementById("TS_CurrentIE").play();
                                }else{
                                    document.getElementById("TS_CurrentTask").play();
                                }
                            }
                        }
                        PublicObject.DW_CurrentTask = DW_Data;
                        //for (var n = 0; n < DW_Data.length; n++) {
                        //
                        //    for (var n2 = 0; n2 < PublicObject.DW_CurrentTask.length; n2++) {
                        //
                        //        debugger;
                        //
                        //        if (DW_Data[n] != PublicObject.DW_CurrentTask[n2]) {
                        //
                        //            Ext.getElementById("DW_CurrentTask").play();
                        //
                        //            break;
                        //
                        //        }
                        //
                        //    }
                        //
                        //}
                    }
                    if (PublicObject.DWTS_CurrentTask.length == 0) {
                        if (DWTS_Data.length > 0) {
                            if(Sys.ie){
                                document.getElementById("TS_CurrentIE").play();
                            }else{
                                document.getElementById("TS_CurrentTask").play();
                            }
                        }
                        PublicObject.DWTS_CurrentTask = DWTS_Data;
                    } else {
                        if (DWTS_Data.length > 0) {
                            if (DWTS_Data[0] > PublicObject.DWTS_CurrentTask[0]) {
                                if(Sys.ie){
                                    document.getElementById("TS_CurrentIE").play();
                                }else{
                                    document.getElementById("TS_CurrentTask").play();
                                }
                            }
                        }
                        PublicObject.DWTS_CurrentTask = DWTS_Data;
                        //for (var n = 0; n < DWTS_Data.length; n++) {
                        //
                        //    for (var n2 = 0; n2 < PublicObject.DWTS_CurrentTask.length; n2++) {
                        //
                        //        debugger;
                        //
                        //        if (DWTS_Data[n] != PublicObject.DWTS_CurrentTask[n2]) {
                        //
                        //            Ext.getElementById("DWTS_CurrentTask").play();
                        //
                        //            break;
                        //
                        //        }
                        //
                        //    }
                        //
                        //}
                    }
                }
            },
            failure: function (response, options) {
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
    },
    TreeShow: function (view) {
        //debugger;
        var CurrentUser = PublicObject.CurrentUser;
        var Me=this;
        if (CurrentUser != "") {
            var rolestr = CurrentUser.rolestr;
            if (rolestr != "") {
                var rolestrArr = rolestr.split(",");
                PublicObject.TreeCount=0;
                var node="";
                function tree_show(_index,Arr,cb){
                    var j=_index;
                    var _rolestrArr=Arr;
                    if(_rolestrArr.length<_index){
                        return cb(null,'over');
                    }
                    if (_rolestrArr[j] == 1) {
                        PublicObject.TreeCount++;
                        node = {
                            text: "用户管理",
                            //expanded: true,
                            name: 1,
                            children: [
                                {
                                    text: "管理员",
                                    name: 11,
                                    leaf: true
                                    , iconCls: 'tree-icon-User'
                                    //, iconCls: 'no-icon'
                                },
                                {
                                    text: "店长",
                                    name: 12,
                                    leaf: true
                                    , iconCls: 'tree-icon-User'
                                    //, iconCls: 'no-icon'
                                },
                                {
                                    text: "前台",
                                    name: 13,
                                    leaf: true
                                    , iconCls: 'tree-icon-User'
                                    //, iconCls: 'no-icon'
                                },
                                {
                                    text: "外卖配送组组长",
                                    name: 14,
                                    leaf: true
                                    , iconCls: 'tree-icon-User'
                                    //, iconCls: 'no-icon'
                                }
                            ]
                        };
                        view.getRootNode().appendChild(node);
                        _index++;
                        tree_show(_index,rolestrArr,cb);
                    }
                    if (_rolestrArr[j] == 2) {
                        //debugger;
                        node = {
                            text: "维护菜单",
                            //expanded: true,
                            name: 2,
                            children: [
                                {
                                    text: "分类管理",
                                    name: 21,
                                    //leaf: true,
                                    expanded: true,
                                    children: [
                                        {
                                            text: "堂食",
                                            name: 211,
                                            leaf: true
                                            //, iconCls: 'tree-icon-Areas'
                                            //, iconCls: 'no-icon'
                                        },
                                        {
                                            text: "外卖",
                                            name: 212,
                                            leaf: true
                                            //, iconCls: 'tree-icon-Areas'
                                            //, iconCls: 'no-icon'
                                        },
                                        {
                                            text: "食杂铺",
                                            name: 213,
                                            leaf: true
                                            //, iconCls: 'tree-icon-Areas'
                                            //, iconCls: 'no-icon'
                                        }
                                    ]
                                },
                                {
                                    text: "菜品管理",
                                    name: 22,
                                    itemId:'22Value',
                                    //leaf: true,
                                    expanded: false,
                                    children: [
                                        {
                                            text: "堂食",
                                            name: 221,
                                            leaf: true,
                                            expanded: true
                                            //, iconCls: 'tree-icon-Areas'
                                        },
                                        {
                                            text: "外卖",
                                            name: 222,
                                            leaf: true,
                                            expanded: true
                                            //, iconCls: 'tree-icon-Areas'
                                        },
                                        {
                                            text: "食杂铺",
                                            name: 223,
                                            leaf: true,
                                            expanded: true
                                            //, iconCls: 'tree-icon-Areas'
                                        }
                                    ]
                                },
                                {
                                    text: "服务类管理",
                                    name: 23,
                                    itemId:'23Value',
                                    //leaf: true,
                                    expanded: false,
                                    children: [
                                        {
                                            text: "堂食",
                                            name: 231,
                                            leaf: true,
                                            expanded: true
                                            //, iconCls: 'tree-icon-Areas'
                                        },
                                        {
                                            text: "外卖",
                                            name: 232,
                                            leaf: true,
                                            expanded: true
                                            //, iconCls: 'tree-icon-Areas'
                                        }
                                    ]
                                }
                            ]
                        };
                        view.getRootNode().appendChild(node);
                        Ext.Ajax.request({
                            url: '../api/ManagementSystem/GetMenuClass02',
                            params: {
                                menuclasstype: '',
                                RandomTag: Math.random()
                            },
                            method: 'POST',
                            success: function (response) {
                                //debugger;
                                var rspText = Ext.JSON.decode(response.responseText);
                                if (rspText.success == true) {

                                    var data = rspText.data;

                                    PublicObject.TreeMenuClass = data;

                                    for (var i = 0; i < data.length; i++) {
                                        var node = {
                                            target: data[i].menuclasstype,
                                            name: data[i].id + "_menuclass",
                                            text: data[i].menuclassname,
                                            iconCls: 'tree-icon-Area',
                                            leaf: true
                                        };
                                        //debugger;
                                        var menuclasstype = data[i].menuclasstype;
                                        if (menuclasstype == 1) {//堂食
                                            view.getRootNode().childNodes[PublicObject.TreeCount].childNodes[1].childNodes[0].appendChild(node);
                                        }
                                        if (menuclasstype == 2) {//外卖
                                            view.getRootNode().childNodes[PublicObject.TreeCount].childNodes[1].childNodes[1].appendChild(node);
                                        }
                                        if (menuclasstype == 3) {//杂食
                                            view.getRootNode().childNodes[PublicObject.TreeCount].childNodes[1].childNodes[2].appendChild(node);
                                        }
                                    }
                                    PublicObject.TreeCount++;
                                }
                                _index++;
                                tree_show(_index,rolestrArr,cb);
                            },
                            failure: function (response, options) {
                                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                                _index++;
                                tree_show(_index,rolestrArr,cb);
                            }
                        });

                    }
                    if (_rolestrArr[j] == 3) {
                        node = {
                            text: "订单列表",
                            expanded: false,
                            name: 3
                        };
                        view.getRootNode().appendChild(node);
                        //Me.TaskListCount();
                        //debugger;
                        //Ext.TaskManager.start(taskInit);
                        _index++;
                        tree_show(_index,rolestrArr,cb);
                    }
                    if (_rolestrArr[j] == 5) {
                        node = {
                            text: "部门管理",
                            expanded: false,
                            name: 5
                        };
                        view.getRootNode().appendChild(node);
                        _index++;
                        tree_show(_index,rolestrArr,cb);
                    }
                    if (_rolestrArr[j] == 4) {
                        node = {
                            text: "数据统计",
                            //expanded: true,
                            name: 4,
                            children: [
                                {
                                    text: "菜品统计",
                                    name: 41,
                                    leaf: true
                                },
                                {
                                    text: "订单统计",
                                    name: 42,
                                    leaf: true
                                }
                            ]
                        };
                        view.getRootNode().appendChild(node);
                        _index++;
                        tree_show(_index,rolestrArr,cb);
                    }
                    if (_rolestrArr[j] == 6) {
                        node = {
                            text: "外卖配送管理",
                            expanded: false,
                            itemId:'diliveryPlan',
                            id:'dileveryPlan',
                            name: 6
                        };
                        view.getRootNode().appendChild(node);
                        _index++;
                        tree_show(_index,rolestrArr,cb);
                    }
                    if (_rolestrArr[j] == 7) {
                        node = {
                            text: "系统设置",
                            //expanded: true,
                            name: 7,
                            children: [
                                {
                                    text: "订位设置",
                                    name: 71,
                                    leaf: true
                                },
                                {
                                    text: "外卖设置",
                                    name: 72,
                                    leaf: true
                                }
                            ]
                        };
                        view.getRootNode().appendChild(node);
                        _index++;
                        tree_show(_index,rolestrArr,cb);
                    }
                }
                tree_show(0,rolestrArr,function(err,result){
                   console.log('err:',err);
                   console.log('result:',result);
                });
//                for (var j = 0; j < rolestrArr.length; j++) {
//                    //debugger;
//                    var node = "";
//                    if (rolestrArr[j] == 1) {
//
//                        PublicObject.TreeCount++;
//
//                        node = {
//                            text: "用户管理",
//                            //expanded: true,
//                            name: 1,
//                            children: [
//                                {
//                                    text: "管理员",
//                                    name: 11,
//                                    leaf: true
//                                    , iconCls: 'tree-icon-User'
//                                    //, iconCls: 'no-icon'
//                                },
//                                {
//                                    text: "店长",
//                                    name: 12,
//                                    leaf: true
//                                    , iconCls: 'tree-icon-User'
//                                    //, iconCls: 'no-icon'
//                                },
//                                {
//                                    text: "前台",
//                                    name: 13,
//                                    leaf: true
//                                    , iconCls: 'tree-icon-User'
//                                    //, iconCls: 'no-icon'
//                                },
//                                {
//                                    text: "外卖配送组组长",
//                                    name: 14,
//                                    leaf: true
//                                    , iconCls: 'tree-icon-User'
//                                    //, iconCls: 'no-icon'
//                                }
//                            ]
//                        };
//
//                        view.getRootNode().appendChild(node);
//
//                    }
//                    if (rolestrArr[j] == 2) {
//
//                        //debugger;
//
//                        node = {
//                            text: "维护菜单",
//                            //expanded: true,
//                            name: 2,
//                            children: [
//                                {
//                                    text: "分类管理",
//                                    name: 21,
//                                    //leaf: true,
//                                    expanded: true,
//                                    children: [
//                                        {
//                                            text: "堂食",
//                                            name: 211,
//                                            leaf: true
//                                            //, iconCls: 'tree-icon-Areas'
//                                            //, iconCls: 'no-icon'
//                                        },
//                                        {
//                                            text: "外卖",
//                                            name: 212,
//                                            leaf: true
//                                            //, iconCls: 'tree-icon-Areas'
//                                            //, iconCls: 'no-icon'
//                                        },
//                                        {
//                                            text: "食杂铺",
//                                            name: 213,
//                                            leaf: true
//                                            //, iconCls: 'tree-icon-Areas'
//                                            //, iconCls: 'no-icon'
//                                        }
//                                    ]
//                                },
//                                {
//                                    text: "菜品管理",
//                                    name: 22,
//                                    itemId:'22Value',
//                                    //leaf: true,
//                                    expanded: false,
//                                    children: [
//                                        {
//                                            text: "堂食",
//                                            name: 221,
//                                            leaf: true,
//                                            expanded: true
//                                            //, iconCls: 'tree-icon-Areas'
//                                        },
//                                        {
//                                            text: "外卖",
//                                            name: 222,
//                                            leaf: true,
//                                            expanded: true
//                                            //, iconCls: 'tree-icon-Areas'
//                                        },
//                                        {
//                                            text: "食杂铺",
//                                            name: 223,
//                                            leaf: true,
//                                            expanded: true
//                                            //, iconCls: 'tree-icon-Areas'
//                                        }
//                                    ]
//                                },
//                                {
//                                    text: "服务类管理",
//                                    name: 23,
//                                    itemId:'23Value',
//                                    //leaf: true,
//                                    expanded: false,
//                                    children: [
//                                        {
//                                            text: "堂食",
//                                            name: 231,
//                                            leaf: true,
//                                            expanded: true
//                                            //, iconCls: 'tree-icon-Areas'
//                                        },
//                                        {
//                                            text: "外卖",
//                                            name: 232,
//                                            leaf: true,
//                                            expanded: true
//                                            //, iconCls: 'tree-icon-Areas'
//                                        }
//                                        //,
//                                        //{
//                                        //    text: "食杂铺",
//                                        //    name: 233,
//                                        //    leaf: true,
//                                        //    expanded: true
//                                        //    //, iconCls: 'tree-icon-Areas'
//                                        //}
//                                    ]
//                                }
//                            ]
//                        };
//
//                        view.getRootNode().appendChild(node);
//
//                        Ext.Ajax.request({
//                            url: '../api/ManagementSystem/GetMenuClass02',
//                            params: {
//                                menuclasstype: '',
//                                RandomTag: Math.random()
//                            },
//                            method: 'POST',
//                            success: function (response) {
//                                //debugger;
//                                var rspText = Ext.JSON.decode(response.responseText);
//                                if (rspText.success == true) {
//
//                                    var data = rspText.data;
//
//                                    PublicObject.TreeMenuClass = data;
//
//                                    for (var i = 0; i < data.length; i++) {
//                                        var node = {
//                                            target: data[i].menuclasstype,
//                                            name: data[i].id + "_menuclass",
//                                            text: data[i].menuclassname,
//                                            iconCls: 'tree-icon-Area',
//                                            leaf: true
//                                        };
//                                        //debugger;
//                                        var menuclasstype = data[i].menuclasstype;
//
//                                        if (menuclasstype == 1) {//堂食
//                                            view.getRootNode().childNodes[PublicObject.TreeCount].childNodes[1].childNodes[0].appendChild(node);
//                                        }
//                                        if (menuclasstype == 2) {//外卖
//                                            view.getRootNode().childNodes[PublicObject.TreeCount].childNodes[1].childNodes[1].appendChild(node);
//                                        }
//                                        if (menuclasstype == 3) {//杂食
//                                            view.getRootNode().childNodes[PublicObject.TreeCount].childNodes[1].childNodes[2].appendChild(node);
//                                        }
//
//                                    }
//
//                                    PublicObject.TreeCount++;
//
//                                }
//                            },
//                            failure: function (response, options) {
//                                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
//                            }
//                        });
//
//                    }
//                    if (rolestrArr[j] == 3) {
//
//                        node = {
//                            text: "订单列表",
//                            expanded: true,
//                            name: 3
//                            //,
//                            //children: [
//                            //    {
//                            //        text: "堂食订单<span id='TS_Count' style='color: red'></span>",
//                            //        name: 31,
//                            //        leaf: true
//                            //    },
//                            //    {
//                            //        text: "外卖订单<span id='WM_Count' style='color: red'></span>",
//                            //        name: 32,
//                            //        leaf: true
//                            //    },
//                            //    {
//                            //        text: "杂食订单<span id='ZS_Count' style='color: red'></span>",
//                            //        name: 33,
//                            //        leaf: true
//                            //    },
//                            //    {
//                            //        text: "订位订单<span id='DW_Count' style='color: red'></span>",
//                            //        name: 34,
//                            //        leaf: true
//                            //    },
//                            //    {
//                            //        text: "订位堂食订单<span id='DWTS_Count' style='color: red'></span>",
//                            //        name: 35,
//                            //        leaf: true
//                            //    }
//                            //]
//                        };
//
//                        view.getRootNode().appendChild(node);
//                        this.TaskListCount();
//                        //debugger;
//                        Ext.TaskManager.start(taskInit);
//                    }
//                    if (rolestrArr[j] == 5) {
//
//                        node = {
//                            text: "部门管理",
//                            expanded: false,
//                            name: 5
//                        };
//
//                        view.getRootNode().appendChild(node);
//
//                    }
//                    if (rolestrArr[j] == 4) {
//
//                        node = {
//                            text: "数据统计",
//                            //expanded: true,
//                            name: 4,
//                            children: [
//                                {
//                                    text: "菜品统计",
//                                    name: 41,
//                                    leaf: true
//                                },
//                                {
//                                    text: "订单统计",
//                                    name: 42,
//                                    leaf: true
//                                }
//                            ]
//                        };
//
//                        view.getRootNode().appendChild(node);
//
//                    }
//                    if (rolestrArr[j] == 6) {
//                        node = {
//                            text: "外卖配送管理",
//                            expanded: true,
//                            itemId:'diliveryPlan',
//                            id:'dileveryPlan',
//                            name: 6
//                            //,
//                            //children: [
//                            //    {
//                            //        text: "配送员",
//                            //        name: 61,
//                            //        leaf: true
//                            //    },
//                            //    {
//                            //        text: "配送",
//                            //        name: 62,
//                            //        leaf: true
//                            //    }
//                            //]
//                        };
//
//                        view.getRootNode().appendChild(node);
//                    }
//                    if (rolestrArr[j] == 7) {
//
//                        node = {
//                            text: "系统设置",
//                            //expanded: true,
//                            name: 7,
//                            children: [
//                                {
//                                    text: "订位设置",
//                                    name: 71,
//                                    leaf: true
//                                },
//                                {
//                                    text: "外卖设置",
//                                    name: 72,
//                                    leaf: true
//                                }
//                            ]
//                        };
//
//                        view.getRootNode().appendChild(node);
//
//                    }
//                }
            }
        }
    },
    UserGrid: function () {
        //debugger;
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('userGrid', {
            region: 'center',
            selModel: Ext.create('Ext.selection.CheckboxModel', {
//                singleSelect : false,
                checkOnly: true
            })
        }));

        Ext.getElementById("TreeUserGridText").innerHTML = PublicObject.selectTreeName.raw.text;

    },
    MenuClassManagement: function () {
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('menuClassManagement', {
            region: 'center',
            selModel: Ext.create('Ext.selection.CheckboxModel', {
//                singleSelect : false,
                checkOnly: true
            })
        }));

        Ext.getElementById("TreeMenuClassManagementText").innerHTML = PublicObject.selectTreeName.raw.text;

    },
    MenuManagement: function () {
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('menuManagement', {
            region: 'center',
            selModel: Ext.create('Ext.selection.CheckboxModel', {
//                singleSelect : false,
                checkOnly: true
            })
        }));

        Ext.getElementById("TreeMenuManagementTextText").innerHTML = PublicObject.selectTreeName.raw.text;

    },
    MenuManagement02: function () {
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('menuManagement02', {
            region: 'center',
            selModel: Ext.create('Ext.selection.CheckboxModel', {
//                singleSelect : false,
                checkOnly: true
            })
        }));

        Ext.getElementById("TreeMenuManagement02Text").innerHTML = PublicObject.selectTreeName.raw.text;

    },
    TaskManagement: function () {
        Ext.TaskManager.stop(taskInit);
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('taskManagement', {
            region: 'center'
            ,
            selModel: Ext.create('Ext.selection.CheckboxModel', {
                singleSelect:true
            })
        }));
    },
    serviceManagement:function(){
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('serviceManagement', {
            region: 'center',
            selModel: Ext.create('Ext.selection.CheckboxModel', {
                singleSelect : true
            })
        }));
    },
    TaskManagement02: function () {
        Ext.TaskManager.stop(taskInit);
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('taskManagement02', {
            region: 'center'
        }));
        var TaskStatus01 = Ext.getCmp('taskManagementId02').down('#TaskStatus01');
        TaskStatus01.setValue(false);

        var TaskStatus02 = Ext.getCmp('taskManagementId02').down('#TaskStatus02');
        TaskStatus02.setValue(false);

        //var TaskStatus03 = Ext.getCmp('taskManagementId02').down('#TaskStatus03');
        //TaskStatus03.setValue(false);

        var TaskStatus04 = Ext.getCmp('taskManagementId02').down('#TaskStatus04');
        TaskStatus04.setValue(false);

        var TaskStatus05 = Ext.getCmp('taskManagementId02').down('#TaskStatus05');
        TaskStatus05.setValue(false);
        var TaskStatus06 = Ext.getCmp('taskManagementId02').down('#TaskStatus06');
        TaskStatus06.setValue(false);
    },
    TaskManagement03: function () {
        Ext.TaskManager.stop(taskInit);
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('taskManagement03', {
            region: 'center'
//            ,
//            selModel: Ext.create('Ext.selection.CheckboxModel', {
////                singleSelect : false,
//                checkOnly: true
//            })
        }));
        var TaskStatus01 = Ext.getCmp('taskManagementId03').down('#TaskStatus01');
        TaskStatus01.setValue(false);

        var TaskStatus02 = Ext.getCmp('taskManagementId03').down('#TaskStatus02');
        TaskStatus02.setValue(false);

        //var TaskStatus03 = Ext.getCmp('taskManagementId03').down('#TaskStatus03');
        //TaskStatus03.setValue(false);

        var TaskStatus04 = Ext.getCmp('taskManagementId03').down('#TaskStatus04');
        TaskStatus04.setValue(false);

        var TaskStatus05 = Ext.getCmp('taskManagementId03').down('#TaskStatus05');
        TaskStatus05.setValue(false);
        var TaskStatus06 = Ext.getCmp('taskManagementId03').down('#TaskStatus06');
        TaskStatus06.setValue(false);
    },
    TaskManagement04: function () {
        Ext.TaskManager.stop(taskInit);
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('taskManagement04', {
            region: 'center'
//            ,
//            selModel: Ext.create('Ext.selection.CheckboxModel', {
////                singleSelect : false,
//                checkOnly: true
//            })
        }));
    },
    TaskManagement05: function () {
        Ext.TaskManager.stop(taskInit);
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('taskManagement05', {
            region: 'center'
//            ,
//            selModel: Ext.create('Ext.selection.CheckboxModel', {
////                singleSelect : false,
//                checkOnly: true
//            })
        }));
        var TaskStatus01 = Ext.getCmp('taskManagementId05').down('#TaskStatus01');
        TaskStatus01.setValue(false);

        var TaskStatus02 = Ext.getCmp('taskManagementId05').down('#TaskStatus02');
        TaskStatus02.setValue(false);

        var TaskStatus03 = Ext.getCmp('taskManagementId05').down('#TaskStatus03');
        TaskStatus03.setValue(false);

        var TaskStatus04 = Ext.getCmp('taskManagementId05').down('#TaskStatus04');
        TaskStatus04.setValue(false);

        var TaskStatus05 = Ext.getCmp('taskManagementId05').down('#TaskStatus05');
        TaskStatus05.setValue(false);
        var TaskStatus06 = Ext.getCmp('taskManagementId05').down('#TaskStatus06');
        TaskStatus06.setValue(false);
    },
    DishStatistics: function () {
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('dishStatistics', {
            region: 'center'
//            ,
//            selModel: Ext.create('Ext.selection.CheckboxModel', {
////                singleSelect : false,
//                checkOnly: true
//            })
        }));
    },
    OrderStatistics: function () {
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('orderStatistics', {
            region: 'center'
//            ,
//            selModel: Ext.create('Ext.selection.CheckboxModel', {
////                singleSelect : false,
//                checkOnly: true
//            })
        }));
    },
    TableOrderSetting: function () {
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('tableOrderSetting', {
            region: 'center'
//            ,
//            selModel: Ext.create('Ext.selection.CheckboxModel', {
////                singleSelect : false,
//                checkOnly: true
//            })
        }));
    },
    TableOrderSetting02: function () {
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('tableOrderSetting02', {
            region: 'center'
//            ,
//            selModel: Ext.create('Ext.selection.CheckboxModel', {
////                singleSelect : false,
//                checkOnly: true
//            })
        }));
    },
    DiliverymanGrid:function(){
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('diliverymanGrid', {
            region: 'center' ,
            selModel: Ext.create('Ext.selection.CheckboxModel', {
//                singleSelect : false,
                checkOnly: true
            })

        }));
    },
    DiliveryGrid:function(){
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('diliveryGrid', {
            region: 'center'
            //,
//            selModel: Ext.create('Ext.selection.CheckboxModel', {
////                singleSelect : false,
//                checkOnly: true
//            })
        }));
    },
    departManagement:function(){
        Ext.getCmp('centerPanel').removeAll();
        Ext.getCmp('centerPanel').add(Ext.widget('departManagement', {
            region: 'center' ,
            selModel: Ext.create('Ext.selection.CheckboxModel', {
//                singleSelect : false,
                checkOnly: true
            })
        }));
    },
    DiliveryPlan:function(record){
        //debugger;//配送任务数
        Ext.Ajax.request({
            url: '../api/ManagementSystem/getDiliveryPlan',
            params: {
                taskstatus: [2,3],
                RandomTag: Math.random()
            },
            method: 'POST',
            success: function (response) {
                //debugger;
                var rspText = Ext.JSON.decode(response.responseText);
                if (rspText.success == true) {
                    var data = rspText.data;
                    var wpTreePanel = Ext.getCmp('wpTreePanel');
                    var planCount=0;
                    if(data.length>0){planCount=data.length;}
                    record.removeAll();
                    var node1 = {
                        text: "配送员",
                        name: 61,
                        leaf: true
                    };
                    var node2 = {
                        text: "配送任务<span id='WM_Count' style='color: red'>(" + planCount + ")</span>",
                        name: 62,
                        leaf: true
                    };
                    record.appendChild(node1);
                    record.appendChild(node2);
                    if(planCount>PublicObject.PlanCount){
                        if(Sys.ie){
                            document.getElementById("planCountIE").play();
                        }else{
                            document.getElementById("planCountFF").play();
                        }
                        PublicObject.PlanCount=planCount;
                    }
                }
            },
            failure: function (response, options) {
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
        Ext.TaskManager.start(diliveryPlan);
    }
});