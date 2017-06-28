Ext.define('ManagementSystem.controller.MenuClassManagement', {
    extend: 'Ext.app.Controller',
    views: ['MenuClassManagement', 'MenuClassManagementWin'],
    stores: ['MenuClassStore'],
    init: function () {
        this.control({
            'menuClassManagement': {
                'render': this.GetMenuClass,
                'itemdblclick': function (_panel, _record, _item, _index, _eventItem) {
                    Ext.getCmp('menuClassManagementId').getSelectionModel().select(_record);
                    this.EditMenuClass();
                }
            },
            'menuClassManagement #btnAdd': {
                'click': this.AddMenuClass
            },
            'menuClassManagement #btnEdit': {
                'click': this.EditMenuClass
            },
            'menuClassManagement #btnDel': {
                'click': this.DelMenuClass
            },
            'menuClassManagementWin #btnAdd': {
                'click': this.AddMenuClassWin
            },
            'menuClassManagementWin #btnEdit': {
                'click': this.EditMenuClassWin
            },
            'menuClassManagementWin #btnCancel': {
                'click': function () {
                    Ext.getCmp("menuClassManagementWinId").destroy();
                }
            }
        });
    },
//    GetMenuClass: function () {
//        //debugger;
//        Ext.getStore("MenuClassStore").removeAll();
//
//        var selectTreeName = PublicObject.selectTreeName.raw.name;
//        var menuclasstype = "";
//        if (selectTreeName == 211) {//堂食
//            menuclasstype = 1;
//        } else if (selectTreeName == 212) {//外卖
//            menuclasstype = 2;
//        } else if (selectTreeName == 213) {//杂食
//            menuclasstype = 3;
//        }
//        //debugger;
//        Ext.getCmp('mainViewPort').getEl().mask("正在获取数据，请稍候");//遮罩
//        Ext.Ajax.request({
//            url: '../api/ManagementSystem/GetMenuClass',//获取grid数据
//            timeout: PublicObject.ajaxTimeout,
//            params: {
//                menuclasstype: menuclasstype,
//                RandomTag: Math.random()
//            },
//            method: 'Post',
//            success: function (response, options) {
//                //debugger;
//                Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
//                var result = Ext.JSON.decode(response.responseText);
//                if (result.err) {
//                    Ext.MessageBox.alert('提示', result.err.message);
//                } else {
//                    //debugger;
//                    var data = result.data;
//                    PublicObject.MenuClassData = data;
//                    Ext.getStore("MenuClassStore").proxy.data = data;
//                    Ext.getStore("MenuClassStore").loadPage(1);
//                }
//            },
//            failure: function (response, options) {
//                Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
//                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
//            }
//        });
//    },
    GetMenuClass: function () {
        //debugger;
        Ext.getStore("MenuClassStore").removeAll();

        var selectTreeName = PublicObject.selectTreeName.raw.name;
        var menuclasstype = "";
        if (selectTreeName == 211) {//堂食
            menuclasstype = 1;
        } else if (selectTreeName == 212) {//外卖
            menuclasstype = 2;
        } else if (selectTreeName == 213) {//杂食
            menuclasstype = 3;
        }

        var params = {
            menuclasstype: menuclasstype,
            RandomTag: Math.random()
        };
        var queryUrl = encodeURI("../api/ManagementSystem/GetMenuClass");
        Ext.getStore("MenuClassStore").getProxy().url = queryUrl;
        Ext.getStore("MenuClassStore").getProxy().extraParams = params;
        try {
            Ext.getStore("MenuClassStore").currentPage = 1;
        } catch (e) {
        }//设置页面为1，防止多次刷新页面。比loadPage(1)好。这个不需要再次请求网络。用loadPage会发生多一次的网络请求。如果瞬间切换多个store的话，回调有可能紊乱。写在Store的load之前。
        Ext.getStore("MenuClassStore").load();
    },
    EditMenuClass: function () {
        //debugger;
        var selectMenuClass = Ext.getCmp('menuClassManagementId').getSelectionModel().getSelection();
        if (selectMenuClass.length == 1) {
            var win = Ext.create('ManagementSystem.view.MenuClassManagementWin', {
                title: '修改菜品',
                listeners: {
                    render: function () {

                    },
                    show: function () {

                        //debugger;

                        PublicObject.selectMenuClass = selectMenuClass[0].raw;

                        Ext.getCmp('menuClassManagementWinId').down('#btnAdd').setVisible(false);

                        Ext.getCmp('menuClassManagementWinId').down('#menuclassname').setValue(selectMenuClass[0].raw.menuclassname);

                        Ext.getCmp('menuClassManagementWinId').down('#ishide').setValue(selectMenuClass[0].raw.ishide);

                        Ext.getCmp('menuClassManagementWinId').down('#menuclasssort').setValue(selectMenuClass[0].raw.menuclasssort);

                    }
                }
            });
            win.show();
        } else {
            Ext.MessageBox.alert('提示', '请先勾选一条内容');
        }
    },
    AddMenuClass: function () {
        var win = Ext.create('ManagementSystem.view.MenuClassManagementWin', {
            title: "添加分类",
            listeners: {
                render: function () {

                },
                show: function () {
                    Ext.getCmp('menuClassManagementWinId').down('#btnEdit').setVisible(false);
                }
            }
        });
        win.show();
    },
    AddMenuClassWin: function () {

        //debugger;添加分类确定

        var selectTreeName = PublicObject.selectTreeName.raw.name;

        var menuclasstype = "";

        if (selectTreeName == 211) {//堂食

            menuclasstype = 1;

        } else if (selectTreeName == 212) {//外卖

            menuclasstype = 2;

        } else if (selectTreeName == 213) {//杂食

            menuclasstype = 3;

        }

        var menuclassname = Ext.getCmp('menuClassManagementWinId').down('#menuclassname').getValue();
        var ishide = Ext.getCmp('menuClassManagementWinId').down('#ishide').getValue();
        var menuclasssort = Ext.getCmp('menuClassManagementWinId').down('#menuclasssort').getValue();
        if (menuclassname.trim() == "") {
            Ext.MessageBox.alert("提示", "分类名称不能为空!");
            return;
        }
        if (ishide === "") {
            Ext.MessageBox.alert("提示", "是否显示不能为空!");
            return;
        }
        if (menuclasssort == "" || menuclasssort == null || menuclasssort == undefined) {
            Ext.MessageBox.alert("提示", "排序不能为空!");
            return;
        }
        var reg3 = new RegExp(/^[1-9]\d*$/);
        if (!reg3.test(menuclasssort)) {
            Ext.MessageBox.alert("提示", "排序只能输入非0的正整数");
            return;
        }

        //debugger;
        Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/ManagementSystem/AddMenuClass',
            params: {
                menuclassname: menuclassname,
                ishide: ishide,
                menuclasstype: menuclasstype,
                menuclasssort: menuclasssort,
                RandomTag: Math.random()
            },
            method: 'Post',
            success: function (response, options) {
                //debugger;
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                var result = Ext.JSON.decode(response.responseText);
                if (result.err) {
                    Ext.MessageBox.alert('提示', result.err.message);
                } else {
                    //Ext.getStore('MenuClassStore').reload();

                    ManagementSystem.app.getMenuClassManagementController().GetMenuClass();

                    Ext.getCmp('menuClassManagementWinId').destroy();
                    Ext.MessageBox.alert('提示', '添加成功,请刷新页面！');
                    setTimeout(function () {
                        location.reload(true);
                    }, 2000);
                }
            },
            failure: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
    },
    EditMenuClassWin: function () {
        debugger;
        var selectTreeName = PublicObject.selectTreeName.raw.name;

        var menuclasstype = "";

        if (selectTreeName == 211) {//堂食

            menuclasstype = 1;

        } else if (selectTreeName == 212) {//外卖

            menuclasstype = 2;

        } else if (selectTreeName == 213) {//杂食

            menuclasstype = 3;

        }

        var menuclassname = Ext.getCmp('menuClassManagementWinId').down('#menuclassname').getValue();
        var ishide = Ext.getCmp('menuClassManagementWinId').down('#ishide').getValue();
        var menuclasssort = Ext.getCmp('menuClassManagementWinId').down('#menuclasssort').getValue();

        var id = PublicObject.selectMenuClass.id;
        var oldmenuclasssort = PublicObject.selectMenuClass.menuclasssort;

        if (menuclassname.trim() == "") {
            Ext.MessageBox.alert("提示", "菜品名称不能为空");
            return;
        }

        if (ishide === "") {
            Ext.MessageBox.alert("提示", "是否显示不能为空");
            return;
        }

        if (menuclasssort == "" || menuclasssort == null || menuclasssort == undefined) {
            Ext.MessageBox.alert("提示", "排序不能为空!");
            return;
        }
        var reg3 = new RegExp(/^[1-9]\d*$/);
        if (!reg3.test(menuclasssort)) {
            Ext.MessageBox.alert("提示", "排序只能输入非0的正整数");
            return;
        }

        //debugger;
        //return;
        Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/ManagementSystem/EditMenuClass',
            params: {
                id: id,
                menuclassname: menuclassname,
                ishide: ishide,
                menuclasstype: menuclasstype,
                oldmenuclasssort: oldmenuclasssort,
                menuclasssort: menuclasssort,
                RandomTag: Math.random()
            },
            method: 'Post',
            success: function (response, options) {
                //debugger;
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                var result = Ext.JSON.decode(response.responseText);
                if (result.err) {
                    Ext.MessageBox.alert('提示', result.err.message);
                } else {
                    //Ext.getStore('MenuClassStore').reload();

                    ManagementSystem.app.getMenuClassManagementController().GetMenuClass();

                    Ext.getCmp('menuClassManagementWinId').destroy();
                    Ext.MessageBox.alert('提示', '修改成功,请刷新页面');
                    setTimeout(function () {
                        location.reload(true);
                    }, 2000);
                }
            },
            failure: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
    },
    DelMenuClass: function () {
        var selectMenuClass = Ext.getCmp('menuClassManagementId').getSelectionModel().getSelection();
        if (selectMenuClass.length == 1) {
            Ext.MessageBox.confirm("提示", "是否要删除菜品[<font color='red'>" + selectMenuClass[0].raw.menuclassname + "</font>]？", function (btnId) {
                if (btnId == "yes") {
                    Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
                    Ext.Ajax.request({
                        url: '../api/ManagementSystem/DelMenuClass',
                        params: {
                            id: selectMenuClass[0].raw.id,
                            RandomTag: Math.random()
                        },
                        method: 'Post',
                        success: function (response, options) {
                            Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                            var result = Ext.JSON.decode(response.responseText);
                            if (result.err) {
                                Ext.MessageBox.alert('提示', result.err.message);
                            } else {
                                Ext.getStore('MenuClassStore').reload();
                                Ext.MessageBox.alert('提示', '删除成功');
                            }
                        },
                        failure: function (response, options) {
                            Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                        }
                    });
                }
            });
        } else {
            Ext.MessageBox.alert('提示', '请先勾选一条内容');
        }
    }
});