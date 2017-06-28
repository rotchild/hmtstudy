Ext.define('ManagementSystem.controller.MenuManagement', {
    extend: 'Ext.app.Controller',
    views: [
        'MenuManagement'
        , 'MenuDetailWin'
        , 'components.field.DateTime'
    ],
    stores: [
        'MenuStore'
        , 'MenuClassStore02'
    ],
    init: function () {
        this.control({
            'menuManagement': {
                'render': this.GetMenu,
                'itemdblclick': function (_panel, _record, _item, _index, _eventItem) {
                    Ext.getCmp('menuManagementId').getSelectionModel().select(_record);
                    this.EditMenu();
                },
                'cellclick': function (thi, td, cellIndex, record, tr, rowIndex, e, eOpts) {
                    if (e.getTarget().id == "MenuDetailWin") {//详情
                        Ext.getCmp('menuManagementId').getSelectionModel().select(record);
                        this.EditMenu();
                    }
                }
            },
            'menuManagement #btnAdd': {
                'click': this.AddMenu
            },
            //'menuManagement #btnEdit': {
            //    'click': this.EditMenu
            //},
            //'menuManagement #btnDel': {
            //    'click': this.DelMenu
            //},
            'menuManagement #BtnSearch': {
                'click': this.GetMenu
            },
            'menuManagement #BtnReset': {
                'click': this.ResetSearchMenu
            },
            'menuDetailWin #btnAdd': {
                'click': this.AddMenuWin
            },
            'menuDetailWin #btnEdit': {
                'click': this.EditMenuWin
            },
            'menuDetailWin #btnCancel': {
                'click': function () {
                    Ext.getCmp("menuDetailWinId").destroy();
                    Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                }
            }
        });
    },
    GetMenu: function () {

        debugger;

        var selectTreeName = PublicObject.selectTreeName.raw.name;

        var dishtype = "";

        if (selectTreeName == 221) {//堂食

            dishtype = 1;

        } else if (selectTreeName == 222) {//外卖

            dishtype = 2;

        } else if (selectTreeName == 223) {//杂食

            dishtype = 3;

        }

        var queryUrl = encodeURI('../api/ManagementSystem/GetMenuClass02?menuclasstype=' + dishtype + '&RandomTag=' + Math.random());
        Ext.getStore('MenuClassStore02').getProxy().url = queryUrl;
        Ext.getStore('MenuClassStore02').load();

        var DateStart = Ext.getCmp('menuManagementId').down('#DateStart').rawValue;
        var DateEnd = Ext.getCmp('menuManagementId').down('#DateEnd').rawValue;
        var startdate = "";
        if (DateStart != "" && DateStart != undefined && DateStart != null) {
            startdate = DateStart;
        }
        var enddate = "";
        if (DateEnd != "" && DateEnd != undefined && DateEnd != null) {
            enddate = DateEnd;
        }

        var keyword = Ext.getCmp('menuManagementId').down('#keyword').getValue();

        var IsGrounding = Ext.getCmp('menuManagementId').down('#isgrounding').getValue();
        var isgrounding = "";
        if (IsGrounding == -1) {
            isgrounding = "0,1";
        } else {
            isgrounding = IsGrounding;
        }

        var IsRecommend = Ext.getCmp('menuManagementId').down('#IsRecommend');
        var isrecommend = "";
        for (var i = 0; i < IsRecommend.items.length; i++) {
            if (IsRecommend.items.items[i].checked) {
                isrecommend += IsRecommend.items.items[i].name + ",";
            }
        }

        isrecommend = isrecommend.substr(0, isrecommend.lastIndexOf(","));

        var isrecommendStr = "";
        if (isrecommend == "") {
            isrecommendStr = "0,1";
        } else {
            isrecommendStr = isrecommend;
        }

        //var DishType = Ext.getCmp('menuManagementId').down('#dishtype').getValue();
        //var dishtype = "";
        //if (DishType == -1) {
        //    dishtype = "1,2";
        //} else {
        //    dishtype = DishType;
        //}

        var menuclass = Ext.getCmp('menuManagementId').down('#menuclass').getValue();
        //var menuclass = "";
        //if (MenuClass == "") {
        //    menuclass = "1,2";
        //} else {
        //    menuclass = MenuClass;
        //}

        debugger;

        var params = {
            startdate: startdate,
            enddate: enddate,
            keyword: keyword,
            isgrounding: isgrounding,
            dishtype: dishtype,
            isrecommend: isrecommendStr,
            menuclass: menuclass,
            RandomTag: Math.random()
        };
        var queryUrl = encodeURI("../api/ManagementSystem/GetMenu");
        Ext.getStore("MenuStore").getProxy().url = queryUrl;
        Ext.getStore("MenuStore").getProxy().extraParams = params;
        try {
            Ext.getStore("MenuStore").currentPage = 1;
        } catch (e) {
        }//设置页面为1，防止多次刷新页面。比loadPage(1)好。这个不需要再次请求网络。用loadPage会发生多一次的网络请求。如果瞬间切换多个store的话，回调有可能紊乱。写在Store的load之前。
        Ext.getStore("MenuStore").load();
    },
    ResetSearchMenu: function () {

        var DateStart = Ext.getCmp('menuManagementId').down('#DateStart');
        DateStart.setValue(currentDate()[0]);
        var DateEnd = Ext.getCmp('menuManagementId').down('#DateEnd');
        DateEnd.setValue(currentDate()[1]);

        var keyword = Ext.getCmp('menuManagementId').down('#keyword');
        keyword.setValue("");

        var isgrounding = Ext.getCmp('menuManagementId').down('#isgrounding');
        isgrounding.setValue(-1);

        //var dishtype = Ext.getCmp('menuManagementId').down('#dishtype');
        //dishtype.setValue(-1);

        var menuclass = Ext.getCmp('menuManagementId').down('#menuclass');
        menuclass.setValue("");

        var IsRecommend01 = Ext.getCmp('menuManagementId').down('#IsRecommend01');
        IsRecommend01.setValue(false);

        ManagementSystem.app.getMenuManagementController().GetMenu();
    },

    AddMenu: function () {

        var selectTreeName = PublicObject.selectTreeName.raw.name;

        var dishtype = "";

        if (selectTreeName == 221) {//堂食

            dishtype = 1;

        } else if (selectTreeName == 222) {//外卖

            dishtype = 2;

        } else if (selectTreeName == 223) {//杂食

            dishtype = 3;

        }

        var queryUrl = encodeURI('../api/ManagementSystem/GetMenuClass02?menuclasstype=' + dishtype + '&RandomTag=' + Math.random());
        Ext.getStore('MenuClassStore02').getProxy().url = queryUrl;
        Ext.getStore('MenuClassStore02').load();

        var win = Ext.create('ManagementSystem.view.MenuDetailWin', {
            title: "添加菜品",
            listeners: {
                render: function () {

                },
                show: function () {

                    Ext.getCmp('menuDetailWinId').down('#btnEdit').setVisible(false);

                    Ext.getCmp("menuDetailWinId").down("#groundtime").setVisible(false);
                    Ext.getCmp("menuDetailWinId").down("#notgroundtime").setVisible(false);

                    Ext.getCmp('menuDetailWinId').down('#dishtype').setValue(dishtype);
                    Ext.getCmp('menuDetailWinId').down('#dishtype').setDisabled(true);

                    if (dishtype == 3) {//杂食
                        Ext.getCmp("menuDetailWinId").down("#completetime").setVisible(false);
                    }

                    Ext.getElementById('MenuDetail_Code_Div').style.display = "none";

                    PublicObject.imageurl = "";

                }
            }
        });
        win.show();
    }
    ,
    AddMenuWin: function () {
        //添加菜谱确定

        //iconCls: "tree-icon-Area"
        //leaf: true
        //name: "4_menuclass"
        //target: 3
        //text: "水煮类"

        //iconCls: "tree-icon-Area"
        //leaf: true
        //name: "15_menuclass"
        //target: 2
        //text: "炒饭"
        var menuclassid = PublicObject.selectTreeName.raw.name.toString().split("_")[0];//菜品类型
        var dishtype = PublicObject.selectTreeName.raw.target;//分类类型

        var dishname = Ext.getCmp('menuDetailWinId').down('#dishname').getValue();//菜品名称
        var standardprice = Ext.getCmp('menuDetailWinId').down('#standardprice').getValue();//原价
        var presentprice = Ext.getCmp('menuDetailWinId').down('#presentprice').getValue();//折扣价
        var dishcount = Ext.getCmp('menuDetailWinId').down('#dishcount').getValue();//上架数量
        var isgrounding = Ext.getCmp('menuDetailWinId').down('#isgrounding').getValue();
        var menusequence = Ext.getCmp('menuDetailWinId').down('#menusequence').getValue();//排序
        var departId=Ext.getCmp('menuDetailWinId').down('#departmentName').getValue();
        var scoville=Ext.getCmp('menuDetailWinId').down('#scoville').getValue();
        var menutab = Ext.getCmp('menuDetailWinId').down('#menutab').getValue();//标签
        var imgArr=getClassName("addImg","img");//5张图片
        var imgList=[];
        for(var i=0;i<imgArr.length;i++){
            var src=imgArr[i].src;
            if(src.substring(src.length-7,src.length) !== "add.png"){
                imgList.push(src);
            }
        }
        var menutabStr = "";
        for (var i in menutab) {
            if (i == "A") {
                menutabStr += "A,";
            }
            if (i == "B") {
                menutabStr += "B,";
            }
            if (i == "C") {
                menutabStr += "C,";
            }
            if (i == "D") {
                menutabStr += "D,";
            }
            if (i == "E") {
                menutabStr += "E,";
            }
        }

        var isrecommend = Ext.getCmp('menuDetailWinId').down('#isrecommend').getValue();//厨师推荐
        var isrecommendStr = "";
        for (var j in isrecommend) {
            if (j == "1") {
                isrecommendStr = 1;
            }
        }

        if (isrecommendStr == "") {
            isrecommendStr = 0;
        }
        if(departId=="" || departId==null || departId==undefined){
            Ext.MessageBox.alert("提示", "请选择出品部");
            return;
        }
        //debugger;

        var dishdescription = Ext.getCmp('menuDetailWinId').down('#dishdescription').getValue();//备注

        var imageurl = PublicObject.imageurl;

        var menudetailurl = Ext.getCmp('menuDetailWinId').down('#menudetailurl').getValue();//连接地址

        var  discount= Ext.getCmp('menuDetailWinId').down('#presentprice').getValue();
        var menuquere=Ext.getCmp('menuDetailWinId').down('#menusequence').getValue();
        var regexP=/^[0-9]+([.]{1}[0-9]{1,2})?$/,
            regexC=/^[0-9]\d*$/;
        if (dishname.trim() == "") {
            Ext.MessageBox.alert("提示", "菜品名称不能为空");
            return;
        }
        if(!regexC.test(menuquere)){
            Ext.MessageBox.alert('提示',"请填写优先级！");
            return;
        }

        if (!regexP.test(standardprice)) {
            Ext.MessageBox.alert("提示", "请填写正确的标准价格！");
            return;
        }
        if(!regexP.test(discount)){
            Ext.MessageBox.alert('提示','请填写正确的折扣价格！');
            return;
        }
        if(discount-standardprice > 0){
            Ext.MessageBox.alert('提示','请填写正确的价格！');
            return;
        }
        if ( !regexC.test(dishcount)) {
            Ext.MessageBox.alert("提示", "请填写正确的上架数量！");
            return;
        }
        if(imgList.length<1){
            Ext.MessageBox.alert("提示", "请上传一张图片！");
            return;
        }
        //debugger;
        Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/ManagementSystem/AddMenu2',
            params: {
                dishname: dishname,
                standardprice: standardprice,
                presentprice: presentprice,
                dishcount: dishcount,
                dishtype: dishtype,
                dish_fk:menuclassid,
                menutab: menutabStr,
                departId:departId,
                isrecommend: isrecommendStr,
                isgrounding:isgrounding,
                scoville:scoville,
                dishdescription: dishdescription,
                imageurl: imageurl,
                imgList:JSON.stringify(imgList),
                menudetailurl: menudetailurl,
                menusequence:menusequence,
                RandomTag: Math.random()
            },
            method: 'POST',
            success: function (response, options) {
                //debugger;
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                var result = Ext.JSON.decode(response.responseText);
                if (result.err) {
                    Ext.MessageBox.alert('提示', result.err.message);
                } else {
                    Ext.getStore('MenuStore').reload();
                    Ext.getCmp('menuDetailWinId').destroy();
                    Ext.MessageBox.alert('提示', '添加成功');
                }
            },
            failure: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
    }
    ,
    EditMenuWin: function () {
        //debugger;//修改菜谱确定
        var selectMenu = PublicObject.selectMenu;
        var id = selectMenu.id;
        var menuclassid = PublicObject.selectTreeName.raw.name.toString().split("_")[0];//菜品类型
        var dishtype = PublicObject.selectTreeName.raw.target;//分类类型

        var dishname = Ext.getCmp('menuDetailWinId').down('#dishname').getValue();//菜品名称
        var standardprice = Ext.getCmp('menuDetailWinId').down('#standardprice').getValue();//原价
        var presentprice = Ext.getCmp('menuDetailWinId').down('#presentprice').getValue();//折扣价
        var dishcount = Ext.getCmp('menuDetailWinId').down('#dishcount').getValue();//上架数量
        var isgrounding = Ext.getCmp('menuDetailWinId').down('#isgrounding').getValue();
        var menusequence = Ext.getCmp('menuDetailWinId').down('#menusequence').getValue();//排序
        var departId=Ext.getCmp('menuDetailWinId').down('#departmentName').getValue();
        var scoville=Ext.getCmp('menuDetailWinId').down('#scoville').getValue();
        var menutab = Ext.getCmp('menuDetailWinId').down('#menutab').getValue();//标签
        var imgArr=getClassName("addImg","img");//5张图片
        var imgList=[];
        for(var i=0;i<imgArr.length;i++){
            var src=imgArr[i].src;
            if(src.substring(src.length-7,src.length) !== "add.png"){
                imgList.push(src);
            }
        }
        var menutabStr = "";
        for (var i in menutab) {
            if (i == "A") {
                menutabStr += "A,";
            }
            if (i == "B") {
                menutabStr += "B,";
            }
            if (i == "C") {
                menutabStr += "C,";
            }
            if (i == "D") {
                menutabStr += "D,";
            }
            if (i == "E") {
                menutabStr += "E,";
            }
        }

        var isrecommend = Ext.getCmp('menuDetailWinId').down('#isrecommend').getValue();//厨师推荐
        var isrecommendStr = "";
        for (var j in isrecommend) {
            if (j == "1") {
                isrecommendStr = 1;
            }
        }

        if (isrecommendStr == "") {
            isrecommendStr = 0;
        }
        if(departId=="" || departId==null || departId==undefined){
            Ext.MessageBox.alert("提示", "请选择出品部");
            return;
        }
        //debugger;

        var dishdescription = Ext.getCmp('menuDetailWinId').down('#dishdescription').getValue();//备注

        var imageurl = PublicObject.imageurl;

        var menudetailurl = Ext.getCmp('menuDetailWinId').down('#menudetailurl').getValue();//连接地址

        var  discount= Ext.getCmp('menuDetailWinId').down('#presentprice').getValue();
        var menuquere=Ext.getCmp('menuDetailWinId').down('#menusequence').getValue();
        var regexP=/^[0-9]+([.]{1}[0-9]{1,2})?$/,
            regexC=/^[0-9]\d*$/;
        if (dishname.trim() == "") {
            Ext.MessageBox.alert("提示", "菜品名称不能为空");
            return;
        }
        if(!regexC.test(menuquere)){
            Ext.MessageBox.alert('提示',"请填写优先级！");
            return;
        }

        if (!regexP.test(standardprice)) {
            Ext.MessageBox.alert("提示", "请填写正确的标准价格！");
            return;
        }
        if(!regexP.test(discount)){
            Ext.MessageBox.alert('提示','请填写正确的折扣价格！');
            return;
        }
        if(discount-standardprice > 0){
            Ext.MessageBox.alert('提示','请填写正确的价格！');
            return;
        }
        if ( !regexC.test(dishcount)) {
            Ext.MessageBox.alert("提示", "请填写正确的上架数量！");
            return;
        }
        if(imgList.length<1){
            Ext.MessageBox.alert("提示", "请上传一张图片！");
            return;
        }

        //debugger;
        Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
        Ext.Ajax.request({
                url: '../api/ManagementSystem/EditMenu',
                params: {
                    id:id,
                    dishname: dishname,
                    standardprice: standardprice,
                    presentprice: presentprice,
                    dishcount: dishcount,
                    dishtype: dishtype,
                    dish_fk:menuclassid,
                    menutab: menutabStr,
                    departId:departId,
                    isrecommend: isrecommendStr,
                    isgrounding:isgrounding,
                    scoville:scoville,
                    dishdescription: dishdescription,
                    imageurl: imageurl,
                    imgList:JSON.stringify(imgList),
                    menudetailurl: menudetailurl,
                    menusequence:menusequence,
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
                    Ext.getStore('MenuStore').reload();
                    Ext.getCmp('menuDetailWinId').destroy();
                    Ext.MessageBox.alert('提示', '修改成功');
                }
            },
            failure: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
    }
});