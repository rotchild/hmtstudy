Ext.define('ManagementSystem.controller.MenuCodeWin', {
    extend: 'Ext.app.Controller',
    views: [
        'MenuCodeWin'
    ],
    init: function () {
        this.control({
            'menuCodeWin': {
                'show': this.ShowMenuCodeWin
            },
            'menuCodeWin #btnCancel': {
                'click': function () {
                    Ext.getCmp("menuCodeWinId").destroy();
                }
            }
        });
    },
    ShowMenuCodeWin: function () {

        //debugger;

        var selectMenu = PublicObject.selectMenu;

        var menuid = selectMenu.id;

        var DateStart = Ext.getCmp('menuCodeWinId').down('#DateStart').rawValue;
        var DateEnd = Ext.getCmp('menuCodeWinId').down('#DateEnd').rawValue;
        var startdate = "";
        if (DateStart != "" && DateStart != undefined && DateStart != null) {
            startdate = DateStart;
        }
        var enddate = "";
        if (DateEnd != "" && DateEnd != undefined && DateEnd != null) {
            enddate = DateEnd;
        }

        var keyword = Ext.getCmp('menuCodeWinId').down('#keyword').getValue();

        var params = {
            startdate: startdate,
            enddate: enddate,
            keyword: keyword,
            menuid: menuid,
            RandomTag: Math.random()
        };
        var queryUrl = encodeURI("../api/ManagementSystem/GetEvaluation");
        Ext.getStore("EvaluationStore").getProxy().url = queryUrl;
        Ext.getStore("EvaluationStore").getProxy().extraParams = params;
        try {
            Ext.getStore("EvaluationStore").currentPage = 1;
        } catch (e) {
        }//设置页面为1，防止多次刷新页面。比loadPage(1)好。这个不需要再次请求网络。用loadPage会发生多一次的网络请求。如果瞬间切换多个store的话，回调有可能紊乱。写在Store的load之前。
        Ext.getStore("EvaluationStore").load();
    }
});