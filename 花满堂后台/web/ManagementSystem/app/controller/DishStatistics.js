Ext.define('ManagementSystem.controller.DishStatistics', {
    extend: 'Ext.app.Controller',
    views: [
        'DishStatistics'
        , 'components.field.DateTime'
    ],
    stores: [ 'DishStatiStore'
//        'EvaluationMenuStore'
    ],
    init: function () {
        this.control({
            'dishStatistics': {
                'render': this.GetDishStatistics
            },
            'dishStatistics #BtnSearch': {
                'click': this.GetDishStatistics
            },
            'dishStatistics #BtnReset': {
                'click': this.ResetSearchDishStatistics
            },
            'dishStatistics #BtnExport': {
                'click': this.ExportDishStatistics
            }
        });
    },
    GetDishStatistics: function () {
        //debugger;

        var dishtype = Ext.getCmp('dishStatisticsId').down('#dishtype').getValue();
        if(dishtype==-1){
            dishtype=[1,2,3];
        }
        var DateStart = Ext.getCmp('dishStatisticsId').down('#DateStart').rawValue;
        var DateEnd = Ext.getCmp('dishStatisticsId').down('#DateEnd').rawValue;
        var startdate = "";
        if (DateStart != "" && DateStart != undefined && DateStart != null) {
            startdate = DateStart;
        }
        var enddate = "";
        if (DateEnd != "" && DateEnd != undefined && DateEnd != null) {
            enddate = DateEnd;
        }

        var keyword = Ext.getCmp('dishStatisticsId').down('#keyword').getValue();

        var params = {
            startdate: startdate,
            enddate: enddate,
            keyword: keyword,
            dishtype: dishtype,
            RandomTag: Math.random()
        };
        var url=encodeURI('../api/ManagementSystem/GetDishStatistics');
        Ext.getStore('DishStatiStore').getProxy().url=url;
        Ext.getStore('DishStatiStore').getProxy().extraParams=params;
        Ext.getStore('DishStatiStore').removeAll();
        Ext.getStore('DishStatiStore').load({callback:function(){
            var totalcount=0,tangshicount=0,waimaicount=0,shizacount=0;
            var storedata=Ext.getStore('DishStatiStore').data;
            for(var i=0;i<storedata.length;i++){
                var dishtype=storedata.items[i].data.menu_dishtype;
                if(dishtype==1){
                    tangshicount+=storedata.items[i].data.menu_sellcount;
                }else if(dishtype==2){
                    waimaicount+=storedata.items[i].data.menu_sellcount;
                }else if(dishtype==3){
                    shizacount+=storedata.items[i].data.menu_sellcount;
                }
            }
            totalcount=tangshicount+waimaicount+shizacount;
            Ext.getElementById('totalcount').innerHTML=totalcount;
            Ext.getElementById('tangshicount').innerHTML=tangshicount;
            Ext.getElementById('waimaicount').innerHTML=waimaicount;
            Ext.getElementById('shizacount').innerHTML=shizacount;
        }});

//        Ext.getCmp('mainViewPort').getEl().mask("正在获取数据，请稍候");//遮罩
//        Ext.Ajax.request({
//            url: '../api/ManagementSystem/GetDishStatistics',
//            params: params,
//            method: 'Post',
//            success: function (response, options) {
//                debugger;
//                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
//                var result = Ext.JSON.decode(response.responseText);
//                if (result.err) {
//                    Ext.MessageBox.alert('提示', result.err.message);
//                } else {
//                    debugger;
//
//                    var EvaluationData = result.data[0];//菜品销售数据
//
//                    var MenuData = result.data[1];//菜品数据
//
//                    //var store = Ext.getStore("EvaluationMenuStore");
//
//                    var store = Ext.getCmp("dishStatisticsId").store;
//
//                    store.removeAll();
//
//                    debugger;
//
//                    var TotalAmount = 0;//总营收金额
//                    var TotalAmountRate = 0;//总营收金额比
//
//                    var MenuSalesAmount = 0;//菜品销售金额
//                    var MenuSalesAmountRate = 0;//菜品销售金额比
//
//                    //var MenuSalesAmount1 = 0;//堂食 总营收金额
//                    //var MenuSalesAmount2 = 0;//外卖 总营收金额
//                    //var MenuSalesAmount3 = 0;//杂食 总营收金额
//
//                    var dishtype = Ext.getCmp('dishStatisticsId').down('#dishtype').getValue();
//
//                    for (var k = 0; k < EvaluationData.length; k++) {
//
//                        var kData = EvaluationData[k];
//
//                        TotalAmount += kData.menucount * kData.presentprice;
//
//                        if (kData.menu_dishtype == dishtype) {
//
//                            MenuSalesAmount += kData.menucount * kData.presentprice;
//
//                        }
//
//                        //if (kData.menu_dishtype == 1) {//堂食
//                        //
//                        //    MenuSalesAmount1 += kData.menucount * kData.presentprice;
//                        //
//                        //} else if (kData.menu_dishtype == 2) {//外卖
//                        //
//                        //    MenuSalesAmount2 += kData.menucount * kData.presentprice;
//                        //
//                        //} else if (kData.menu_dishtype == 3) {//杂食
//                        //
//                        //    MenuSalesAmount3 += kData.menucount * kData.presentprice;
//                        //
//                        //}
//
//                    }
//
//                    for (var j = 0; j < MenuData.length; j++) {
//
//                        var jData = MenuData[j];
//
//                        var SalesCount = 0;//销售数量
//                        var SalesAmount = 0;//销售金额
//                        //var MenuSalesAmount = 0;//菜品销售金额
//                        //var MenuSalesAmountRate = 0;//菜品销售金额比
//
//                        for (var i = 0; i < EvaluationData.length; i++) {
//
//                            debugger;
//
//                            var iData = EvaluationData[i];
//
//                            if (jData.id == iData.menuid && iData.menu_dishtype == dishtype) {
//
//                                debugger;
//
//                                SalesCount += iData.menucount;
//
//                                SalesAmount += iData.menucount * iData.presentprice;
//
//                            }
//
//                        }
//
//                        //if (jData.dishtype == 1) {
//                        //
//                        //    MenuSalesAmount = MenuSalesAmount1;
//                        //
//                        //} else if (jData.dishtype == 2) {
//                        //
//                        //    MenuSalesAmount = MenuSalesAmount2;
//                        //
//                        //} else if (jData.dishtype == 3) {
//                        //
//                        //    MenuSalesAmount = MenuSalesAmount3;
//                        //
//                        //}
//
//                        if (MenuSalesAmount != 0) {
//
//                            MenuSalesAmountRate = (SalesAmount / MenuSalesAmount).toFixed(2);
//
//                        }
//
//                        if (TotalAmount != 0) {
//
//                            TotalAmountRate = (SalesAmount / TotalAmount).toFixed(2);
//
//                        }
//
//                        //var rec = {
//                        //    code: 0,
//                        //    createtime: "2015-10-30 17:25:54",
//                        //    detail: null,
//                        //    dishname: "剁椒鱼头",
//                        //    dishurl: "",
//                        //    enclosure: null,
//                        //    id: 96,
//                        //    menu_changetime: "2015-10-29 13:45:18",
//                        //    menu_code: null,
//                        //    menu_codecount: null,
//                        //    menu_completetime: 20,
//                        //    menu_dishcount: 4,
//                        //    menu_dishdescription: "红椒青椒",
//                        //    menu_dishdetail: "",
//                        //    menu_dishname: "剁椒鱼头",
//                        //    menu_dishtype: 1,
//                        //    menu_dishurl: "",
//                        //    menu_groundtime: "",
//                        //    menu_id: 17,
//                        //    menu_iseat: null,
//                        //    menu_isgrounding: 1,
//                        //    menu_isout: null,
//                        //    menu_isrecommend: 1,
//                        //    menu_menudetailurl: "",
//                        //    menu_menuformat: "大份",
//                        //    menu_notgroundtime: "",
//                        //    menu_outsprice: null,
//                        //    menu_presentprice: 45,
//                        //    menu_sellcount: 1,
//                        //    menu_standardprice: 50,
//                        //    menu_tab: "A,C,",
//                        //    menucount: 1,
//                        //    menuid: 17,
//                        //    openid: "ipadMini_1",
//                        //    photourl: null,
//                        //    presentprice: 45,
//                        //    taskid: 1000004,
//                        //    SalesAmount: SalesAmount,
//                        //    MenuSalesAmount: MenuSalesAmount,
//                        //    MenuSalesAmountRate: MenuSalesAmountRate,
//                        //    TotalAmount: TotalAmount,
//                        //    TotalAmountRate: TotalAmountRate
//                        //};
//                        //var rec2 = {
//                        //    changetime: "2015-10-19 11:49:54",
//                        //    code: 3,
//                        //    codecount: 2,
//                        //    completetime: 30,
//                        //    dishcount: 15,
//                        //    dishdescription: "",
//                        //    dishdetail: "香脆",
//                        //    dishname: "手撕羊排",
//                        //    dishtype: 1,
//                        //    dishurl: "2015101616281471S.png",
//                        //    groundtime: "",
//                        //    id: 1,
//                        //    iseat: 1,
//                        //    isgrounding: 1,
//                        //    isout: 1,
//                        //    isrecommend: 0,
//                        //    menudetailurl: "",
//                        //    menuformat: null,
//                        //    menutab: "A,B,C,",
//                        //    notgroundtime: "",
//                        //    outsprice: 30,
//                        //    presentprice: 30,
//                        //    sellcount: 17,
//                        //    standardprice: 30
//                        //};
//                        //var rec = {
//                        //    code: jData.code,
//                        //    createtime: jData.createtime,
//                        //    detail: jData.detail,
//                        //    dishname: jData.dishname,
//                        //    dishurl: jData.dishurl,
//                        //    enclosure: jData.enclosure,
//                        //    id: jData.id,
//                        //    menu_changetime: jData.menu_changetime,
//                        //    menu_code: jData.menu_code,
//                        //    menu_codecount: jData.menu_codecount,
//                        //    menu_completetime: jData.menu_completetime,
//                        //    menu_dishcount: jData.menu_dishcount,
//                        //    menu_dishdescription: jData.menu_dishdescription,
//                        //    menu_dishdetail: jData.menu_dishdetail,
//                        //    menu_dishname: jData.menu_dishname,
//                        //    menu_dishtype: jData.menu_dishtype,
//                        //    menu_dishurl: jData.menu_dishurl,
//                        //    menu_groundtime: jData.menu_groundtime,
//                        //    menu_id: jData.menu_id,
//                        //    menu_iseat: jData.menu_iseat,
//                        //    menu_isgrounding: jData.menu_isgrounding,
//                        //    menu_isout: jData.menu_isout,
//                        //    menu_isrecommend: jData.menu_isrecommend,
//                        //    menu_menudetailurl: jData.menu_menudetailurl,
//                        //    menu_menuformat: jData.menu_menuformat,
//                        //    menu_notgroundtime: jData.menu_notgroundtime,
//                        //    menu_outsprice: jData.menu_outsprice,
//                        //    menu_presentprice: jData.menu_presentprice,
//                        //    menu_sellcount: jData.menu_sellcount,
//                        //    menu_standardprice: jData.menu_standardprice,
//                        //    menu_tab: jData.menu_tab,
//                        //    menucount: jData.menucount,
//                        //    menuid: jData.menuid,
//                        //    openid: jData.openid,
//                        //    photourl: jData.photourl,
//                        //    presentprice: jData.presentprice,
//                        //    taskid: jData.taskid,
//                        //    SalesAmount: SalesAmount,
//                        //    MenuSalesAmount: MenuSalesAmount,
//                        //    MenuSalesAmountRate: MenuSalesAmountRate,
//                        //    TotalAmount: TotalAmount,
//                        //    TotalAmountRate: TotalAmountRate
//                        //};
//
//                        var rec = {
//                            changetime: jData.changetime,
//                            code: jData.code,
//                            codecount: jData.codecount,
//                            completetime: jData.completetime,
//                            dishcount: jData.dishcount,
//                            dishdescription: jData.dishdescription,
//                            dishdetail: jData.dishdetail,
//                            dishname: jData.dishname,
//                            dishtype: jData.dishtype,
//                            dishurl: jData.dishurl,
//                            groundtime: jData.groundtime,
//                            id: jData.id,
//                            iseat: jData.iseat,
//                            isgrounding: jData.isgrounding,
//                            isout: jData.isout,
//                            isrecommend: jData.isrecommend,
//                            menudetailurl: jData.menudetailurl,
//                            menuformat: jData.menuformat,
//                            menutab: jData.menutab,
//                            notgroundtime: jData.notgroundtime,
//                            outsprice: jData.outsprice,
//                            presentprice: jData.presentprice,
//                            sellcount: jData.sellcount,
//                            standardprice: jData.standardprice,
//                            SalesCount: SalesCount,
//                            SalesAmount: SalesAmount,
//                            MenuSalesAmount: MenuSalesAmount,
//                            MenuSalesAmountRate: MenuSalesAmountRate,
//                            TotalAmount: TotalAmount,
//                            TotalAmountRate: TotalAmountRate
//                        };
//
//                        store.insert(store.getCount(), rec);
//                        store.commitChanges();
//
//                    }
//
//                }
//            },
//            failure: function (response, options) {
//                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
//                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
//            }
//        });

    },
    ResetSearchDishStatistics: function () {

        var DateStart = Ext.getCmp('dishStatisticsId').down('#DateStart');
        DateStart.setValue(currentDate()[0]);
        var DateEnd = Ext.getCmp('dishStatisticsId').down('#DateEnd');
        DateEnd.setValue(currentDate()[1]);

        var keyword = Ext.getCmp('dishStatisticsId').down('#keyword');
        keyword.setValue("");

        var dishtype = Ext.getCmp('dishStatisticsId').down('#dishtype');
        dishtype.setValue(-1);

        ManagementSystem.app.getDishStatisticsController().GetDishStatistics();
    },
    ExportDishStatistics: function () {
        //debugger;

        var CurrentUser = PublicObject.CurrentUser;
        var realname = CurrentUser.realname;
        var date = new Date();

        var keyword = Ext.getCmp('dishStatisticsId').down('#keyword').getValue();

        var dishtype = Ext.getCmp('dishStatisticsId').down('#dishtype').getValue();
        var _dishtype = "菜品统计";
        if (dishtype == 1) {
            _dishtype = "堂食统计";
        } else if (dishtype == 2) {
            _dishtype = "外卖统计";
        } else if (dishtype == 3) {
            _dishtype = "杂食统计";
        }else if(dishtype==-1){
            dishtype=[1,2,3];
        }

        var _DateStart = Ext.getCmp('dishStatisticsId').down('#DateStart').rawValue;
        var _DateEnd = Ext.getCmp('dishStatisticsId').down('#DateEnd').rawValue;

        _DateStart = _DateStart + " 00:00:00";
        _DateEnd = _DateEnd + " 23:59:59";

        var _startdate = formatDate(new Date(_DateStart), "yyyyMMdd");
        var _enddate = formatDate(new Date(_DateEnd), "yyyyMMdd");

        var filename = _startdate + "-" + _enddate  + "_" + _dishtype;

        var DateStart = Ext.getCmp('dishStatisticsId').down('#DateStart').rawValue;
        var DateEnd = Ext.getCmp('dishStatisticsId').down('#DateEnd').rawValue;
        var startdate = "";
        if (DateStart != "" && DateStart != undefined && DateStart != null) {
            startdate = DateStart;
        }
        var enddate = "";
        if (DateEnd != "" && DateEnd != undefined && DateEnd != null) {
            enddate = DateEnd;
        }

        var params = {
            filename: filename,
            startdate: startdate,
            enddate: enddate,
            keyword: keyword,
            dishtype: dishtype,
            RandomTag: Math.random()
        };
        Ext.getCmp('mainViewPort').getEl().mask("正在获取Excel下载链接，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/ManagementSystem/GetDishStatisticsExcelUrl',
            params: params,
            method: 'Post',
            success: function (response) {
                //debugger;
                Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
                var rspText = Ext.JSON.decode(response.responseText);
                //console.log(rspText);
                if (rspText.success == true) {
                    var data = rspText.data;
                    Ext.MessageBox.confirm('确认','是否确定导出excel文件',function(btn){
                        if(btn=='yes'){
                            window.open('../' + data);
                        }
                    });
                }else if(rspText.err.code=="EBUSY") {
                    Ext.MessageBox.alert('抱歉',"请先关闭excel软件！");}
                else {
                    Ext.MessageBox.alert("抱歉", "下载链接获取错误，请刷新页面后重试");
                }
            },
            failure: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });

    }
});