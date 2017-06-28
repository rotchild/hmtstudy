Ext.define('ManagementSystem.controller.MenuManagement02', {
    extend: 'Ext.app.Controller',
    views: [
        'MenuManagement02'
        , 'MenuClassWin'
        , 'MenuSequenceWin'
        , 'components.field.DateTime'
    ],
    stores: [
        'MenuStore'
        , 'MenuClassStore02'
        , 'MenuClassWinStore',
        'DepartmentStore'
    ],
    init: function () {
        this.control({
            'menuManagement02': {
                'render': this.GetMenu,
                'cellclick': function (thi, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    if (e.getTarget().id == "MenuSequenceWin") {//排序
                        Ext.getCmp('menuManagementId02').getSelectionModel().select(record);
                        this.MenuSequence();
                    }if(e.getTarget().id=="MenuDetailWin"){
                        Ext.getCmp('menuManagementId02').getSelectionModel().select(record);
                        this.menuEditEvent();
                    }
                },
                'itemdblclick': function (thi, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    Ext.getCmp('menuManagementId02').getSelectionModel().select(record);
                    this.menuEditEvent();
                }
            },
            'menuManagement02 #btnAdd': {
                //'click': this.AddMenuClassWin
                "click":this.AddMenuClassWin2
            },
            'menuManagement02 #btnEdit': {
                'click': this.menuEditEvent
            },
            'menuManagement02 #btnDel': {
                'click': this.DeleteMenuFromMenuClass
            },
            'menuManagement02 #BtnSearch': {
                'click': this.GetMenu
            },
            'menuManagement02 #BtnReset': {
                'click': this.ResetSearchMenu
            },
            'menuSequenceWin #btnAdd': {
                'click': this.AddMenuSequenceWin
            },
            'menuSequenceWin #btnCancel': {
                'click': function () {
                    Ext.getCmp("menuSequenceWinId").destroy();
                }
            },
            'menuClassWin #btnAdd': {
                'click': this.AddMenuToMenuClass
            },
            'menuClassWin #btnCancel': {
                'click': function () {
                    Ext.getCmp("menuClassWinId").destroy();
                }
            }
        });
    },
    GetMenu: function () {

        //debugger;
        Ext.getStore("MenuStore").removeAll();
        var selectTreeName = PublicObject.selectTreeName.raw.target;

        var dishtype = "";

        if (selectTreeName == 1) {//堂食

            dishtype = 1;

        } else if (selectTreeName == 2) {//外卖

            dishtype = 2;

        } else if (selectTreeName == 3) {//杂食

            dishtype = 3;

        }

        var menuclassid = PublicObject.selectTreeName.raw.name.toString().split("_")[0];

        var keyword = Ext.getCmp('menuManagementId02').down('#keyword').getValue();

        var IsGrounding = Ext.getCmp('menuManagementId02').down('#isgrounding').getValue();
        var isgrounding = "";
        if (IsGrounding == -1) {
            isgrounding = "0,1";
        } else {
            isgrounding = IsGrounding;
        }

        var menutab = Ext.getCmp('menuManagementId02').down('#menutabW').getValue();
        //menutab={
        //    A: "on",
        //    B: "on"
        //};
        var menutabArr=[];
        for(var key in menutab){
            menutabArr.push(key);
        }

        var params = {
            menuclassid: menuclassid,
            keyword: keyword,
            isgrounding: isgrounding,
            menutab:JSON.stringify(menutabArr),
            dishtype: dishtype,
            RandomTag: Math.random()
        };
        var queryUrl = encodeURI("../api/ManagementSystem/GetMenu02");
        Ext.getStore("MenuStore").getProxy().url = queryUrl;
        Ext.getStore("MenuStore").getProxy().extraParams = params;
        try {
            Ext.getStore("MenuStore").currentPage = 1;
        } catch (e) {
        }//设置页面为1，防止多次刷新页面。比loadPage(1)好。这个不需要再次请求网络。用loadPage会发生多一次的网络请求。如果瞬间切换多个store的话，回调有可能紊乱。写在Store的load之前。
        Ext.getStore("MenuStore").load();
    },
    ResetSearchMenu: function () {

        var keyword = Ext.getCmp('menuManagementId02').down('#keyword');
        keyword.setValue("");
        Ext.getCmp('menuManagementId02').down('#menutabW').setValue(false);
        var isgrounding = Ext.getCmp('menuManagementId02').down('#isgrounding');
        isgrounding.setValue(-1);

        ManagementSystem.app.getMenuManagement02Controller().GetMenu();
    },
    MenuSequence: function () {
        //debugger;
        var selectMenu = Ext.getCmp('menuManagementId02').getSelectionModel().getSelection();
        if (selectMenu.length == 1) {

            var win = Ext.create('ManagementSystem.view.MenuSequenceWin', {
                listeners: {
                    render: function () {

                    },
                    show: function () {

                        PublicObject.selectMenu = selectMenu[0].raw;

                        Ext.getCmp('menuSequenceWinId').down('#dishname').setValue(selectMenu[0].raw.dishname);
                        Ext.getCmp('menuSequenceWinId').down('#dishname').setDisabled(true);

                        Ext.getCmp('menuSequenceWinId').down('#menusequence').setValue(selectMenu[0].raw.menusequence);

                    }
                }
            });
            win.show();
        } else {
            Ext.MessageBox.alert('提示', '请先勾选一条内容');
        }
    },
    AddMenuClassWin: function () {

        //debugger;

        var win = Ext.create('ManagementSystem.view.MenuClassWin', {
            title: "分类管理",
            items: [
                {
                    itemId: 'MenuClassWinGridPanel',
                    xtype: 'gridpanel',
                    layout: 'border',
                    border: false,
                    autoScroll: true,
                    store: 'MenuClassWinStore',
                    bodyStyle: 'background:#ffffff',
                    selModel: Ext.create('Ext.selection.CheckboxModel', {
                        //singleSelect : false,
                        checkOnly: true
                    }),
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
                            text: '标准价格', flex: 1, dataIndex: 'standardprice'
                        },
                        {
                            text: '折扣价格', flex: 1, dataIndex: 'presentprice'
                        },
                        {
                            text: '上架数量', flex: 1, dataIndex: 'dishcount'
                        },
                        {
                            text: '是否上架', flex: 1, dataIndex: 'isgrounding',
                            renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                                var str = "";
                                if (value != "" && value != null && value != undefined) {
                                    if (value == 0) {
                                        str = "已下架";
                                    } else if (value == 1) {
                                        str = "已上架";
                                    }
                                }
                                return str;
                            }
                        },
                        {
                            text: '菜品类型', flex: 1, dataIndex: 'dishtype',
                            renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                                var str = "";
                                if (value != "" && value != null && value != undefined) {
                                    if (value == 1) {
                                        str = "堂食";
                                    } else if (value == 2) {
                                        str = "外卖";
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
                            store: 'MenuClassWinStore',
                            dock: 'bottom',
                            displayInfo: true
                        }
                    ]
                }
            ],
            listeners: {
                render: function () {

                },
                show: function () {

                    debugger;

                    var menuclassid = PublicObject.selectTreeName.raw.name.toString().split("_")[0];

                    var keyword = Ext.getCmp('menuClassWinId').down('#keyword').getValue();

                    var IsGrounding = Ext.getCmp('menuClassWinId').down('#isgrounding').getValue();
                    var isgrounding = "";
                    if (IsGrounding == -1) {
                        isgrounding = "0,1";
                    } else {
                        isgrounding = IsGrounding;
                    }

                    var params = {
                        menuclassid: menuclassid,
                        keyword: keyword,
                        isgrounding: isgrounding,
                        RandomTag: Math.random()
                    };

                    var queryUrl = encodeURI("../api/ManagementSystem/GetMenu03");
                    Ext.getStore("MenuClassWinStore").getProxy().url = queryUrl;
                    Ext.getStore("MenuClassWinStore").getProxy().extraParams = params;
                    try {
                        Ext.getStore("MenuClassWinStore").currentPage = 1;
                    } catch (e) {
                    }//设置页面为1，防止多次刷新页面。比loadPage(1)好。这个不需要再次请求网络。用loadPage会发生多一次的网络请求。如果瞬间切换多个store的话，回调有可能紊乱。写在Store的load之前。
                    Ext.getStore("MenuClassWinStore").load();

                }
            }
        });
        win.show();
    },
    AddMenuClassWin2:function(){
        //debugger;//添加菜品按钮

        var win = Ext.create('ManagementSystem.view.MenuDetailWin', {
            title: "添加菜品",
            listeners: {
                render: function () {
                    Ext.getStore('DepartmentStore').load();
                },
                show: function () {
                    Ext.getCmp('menuDetailWinId').down('#btnEdit').setVisible(false);
                    Ext.getCmp('menuDetailWinId').down('#dishcount').setValue(100);
                    Ext.getCmp('menuDetailWinId').down('#menusequence').setValue(1);
                    Ext.getCmp('menuDetailWinId').down("#menutab").down('#menutab02').setValue(true);
                    //updateEvent();
                }
            }
        });
        win.show();
    },
    menuEditEvent:function(){
        //菜品列表双击和查看详情事件
        var selectBefore = Ext.getCmp('menuManagementId02').getSelectionModel().getSelection();
        var menuStore=Ext.getCmp("menuManagementId02").getStore("MenuStore").data.items;
        var selectId=selectBefore[0].raw.id;
        var arr=[];
        for(var i= 0,len=menuStore.length;i<len;i++){
            if(selectId==menuStore[i].data.id){
                arr.push(menuStore[i]);
            }
        }
        Ext.getCmp('menuManagementId02').getSelectionModel().select(arr);//重新选中，避免之前选中的记录污染
        var selectMenu = Ext.getCmp('menuManagementId02').getSelectionModel().getSelection();
        if(selectMenu.length ==1 ){
            var win = Ext.create('ManagementSystem.view.MenuDetailWin', {
                title: '修改菜品',
                listeners: {
                    render: function () {
                        Ext.getStore('DepartmentStore').load();
                    },
                    show: function () {
                        PublicObject.selectMenu = selectMenu[0].raw;
                        Ext.getCmp('menuDetailWinId').down('#btnAdd').setVisible(false);
                        Ext.getCmp('menuDetailWinId').down('#dishdescription').setValue(selectMenu[0].raw.dishdescription);
                        Ext.getCmp('menuDetailWinId').down('#dishname').setValue(selectMenu[0].raw.dishname);
                        Ext.getCmp('menuDetailWinId').down('#standardprice').setValue(selectMenu[0].raw.standardprice);
                        Ext.getCmp('menuDetailWinId').down('#presentprice').setValue(selectMenu[0].raw.presentprice);
                        Ext.getCmp('menuDetailWinId').down('#dishcount').setValue(selectMenu[0].raw.dishcount);
                        Ext.getCmp('menuDetailWinId').down('#scoville').setValue(selectMenu[0].raw.scoville);
                        Ext.getCmp('menuDetailWinId').down('#isgrounding').setValue(selectMenu[0].raw.isgrounding);
                        Ext.getCmp('menuDetailWinId').down('#departmentName').setValue(selectMenu[0].raw.depart_fk);
                        Ext.getCmp('menuDetailWinId').down('#menusequence').setValue(selectMenu[0].raw.menusequence);
                        var menutab = selectMenu[0].raw.menutab;
                        if (menutab != "" && menutab != null) {
                            var menutabArr = menutab.split(",");
                            for (var i = 0; i < menutabArr.length; i++) {
                                var str = menutabArr[i];
                                if (str == "A") {
                                    Ext.getCmp('menutab01').setValue(true);
                                }
                                if (str == "B") {
                                    Ext.getCmp('menutab02').setValue(true);
                                }
                                if (str == "C") {
                                    Ext.getCmp('menutab03').setValue(true);
                                }
                                if (str == "D") {
                                    Ext.getCmp('menutab04').setValue(true);
                                }
                                if (str == "E") {
                                    Ext.getCmp('menutab05').setValue(true);
                                }
                            }
                        }

                        var isrecommend = selectMenu[0].raw.isrecommend;
                        if (isrecommend == 1) {
                            Ext.getCmp('isrecommend01').setValue(true);
                        } else if (isrecommend == 0) {
                            Ext.getCmp('isrecommend01').setValue(false);
                        }
                        Ext.getCmp('menuDetailWinId').down('#menudetailurl').setValue(selectMenu[0].raw.menudetailurl);
                        var imageurl = selectMenu[0].raw.dishurl;
                        PublicObject.imageurl = imageurl;
                        Ext.getElementById('MenuDetail_DishUrl').src = "../../../menuimage/" + PublicObject.imageurl;
                        Ext.Ajax.request({
                            url:'../api/ManagementSystem/getPicById',
                            method:'POST',
                            params:{
                                menuId:selectMenu[0].raw.id,
                                RandomTag:Math.random()
                            },
                            success:function(response){
                                //debugger;
                                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                                var result = Ext.JSON.decode(response.responseText);
                                if (result.err) {
                                    Ext.MessageBox.alert('提示', result.err.message);
                                } else {
                                    var data=result.data;
                                    if(data.length>0){
                                        for(var i=0;i<data.length;i++){
                                            getClassName("addImg","img")[i].src= "../../../menuimage/" +data[i].picUrl;
                                        }
                                    }
                                    //updateEvent();
                                }
                            },
                            failure:function(response){
                                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                                Ext.MessageBox.alert('获取图片列表失败', '请求超时或网络故障,错误编号：' + response.status);
                            }
                        });
                    }
                }
            });
            win.show();
        } else {
            Ext.MessageBox.alert('提示', '请先勾选一条内容');
        }
    },
    AddMenuSequenceWin: function () {
        //debugger;

        var menuclassid = PublicObject.selectTreeName.raw.name.toString().split("_")[0];

        var menuid = PublicObject.selectMenu.id;

        var menusequence = Ext.getCmp('menuSequenceWinId').down('#menusequence').getValue();

        if (menusequence == "") {
            Ext.MessageBox.alert("提示", "菜品排序不能为空");
            return;
        }

        //debugger;
        //return;
        Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/ManagementSystem/AddMenuSequence',
            params: {
                menuclassid: menuclassid,
                menuid: menuid,
                menusequence: menusequence,
                RandomTag: Math.random()
            },
            method: 'Post',
            success: function (response, options) {
                debugger;
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                var result = Ext.JSON.decode(response.responseText);
                if (result.err) {
                    Ext.MessageBox.alert('提示', result.err.message);
                } else {
                    Ext.getStore('MenuStore').reload();
                    Ext.getCmp('menuSequenceWinId').destroy();
                    Ext.MessageBox.alert('提示', '设置排序成功');
                }
            },
            failure: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
    },
    AddMenuToMenuClass: function () {
        //debugger;

        var selectMenu = Ext.getCmp('menuClassWinId').down('#MenuClassWinGridPanel').getSelectionModel().getSelection();
        if (selectMenu.length > 0) {

            debugger;

            var idArr = [];

            for (var i = 0; i < selectMenu.length; i++) {
                var menu = selectMenu[i];
                idArr[idArr.length] = menu.raw.id;
            }

            //debugger;

            var menuclassid = PublicObject.selectTreeName.raw.name.toString().split("_")[0];

            Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
            Ext.Ajax.request({
                url: '../api/ManagementSystem/AddMenuToMenuClass',
                params: {
                    ids: JSON.stringify(idArr),
                    menuclassid: menuclassid,
                    RandomTag: Math.random()
                },
                method: 'Post',
                success: function (response, options) {
                    debugger;
                    Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                    var result = Ext.JSON.decode(response.responseText);
                    if (result.err) {
                        Ext.MessageBox.alert('提示', result.err.message);
                    } else {

                        Ext.getCmp("menuClassWinId").destroy();

                        Ext.getStore("MenuStore").reload();

                        Ext.MessageBox.alert("提示", "添加成功");

                    }
                },
                failure: function (response, options) {
                    Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                    Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                }
            });

        } else {
            Ext.MessageBox.alert('提示', '请至少勾选一条内容');
        }
    },
    DeleteMenuFromMenuClass: function () {
        //debugger;

        var selectMenu = Ext.getCmp('menuManagementId02').getSelectionModel().getSelection();
        if (selectMenu.length > 0) {

            //debugger;

            var idArr = [];
            var nameStr = "";

            for (var i = 0; i < selectMenu.length; i++) {
                var menu = selectMenu[i];
                idArr[idArr.length] = menu.raw.id;

                if (i < selectMenu.length - 1) {
                    nameStr += menu.raw.dishname + "、";
                } else {
                    nameStr += menu.raw.dishname;
                }

            }

            //debugger;

            var menuclassid = PublicObject.selectTreeName.raw.name.toString().split("_")[0];

            Ext.MessageBox.confirm("提示", "确定将菜品<span style='color: red'>[" + nameStr + "]</span>从该分类下删除？", function (btn) {
                if (btn == "yes") {
                    Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
                    Ext.Ajax.request({
                        url: '../api/ManagementSystem/DeleteMenuFromMenuClass',
                        params: {
                            ids: idArr,
                            menuclassid: menuclassid,
                            RandomTag: Math.random()
                        },
                        method: 'Post',
                        success: function (response, options) {
                            debugger;
                            Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                            var result = Ext.JSON.decode(response.responseText);
                            if (result.err) {
                                Ext.MessageBox.alert('提示', result.err.message);
                            } else {

                                Ext.getStore("MenuStore").reload();

                                Ext.MessageBox.alert("提示", "删除成功");

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
            Ext.MessageBox.alert('提示', '请至少勾选一条内容');
        }
    }
});