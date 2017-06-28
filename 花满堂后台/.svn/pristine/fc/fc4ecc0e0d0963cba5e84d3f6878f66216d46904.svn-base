Ext.define('ManagementSystem.controller.Viewport', {
    extend: 'Ext.app.Controller',
    init: function () {
        this.control({
            '#mainViewPort': {
                'render': function () {
                    this.UserCheck();
                }
            }
        });
    },
    //用户Session检测
    UserCheck: function () {
        Ext.getCmp('mainViewPort').getEl().mask("正在获取用户信息，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/ManagementSystem/UserCheck',
            params: {
                RandomTag: Math.random()
            },
            method: 'Post',
            success: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
                var result = Ext.JSON.decode(response.responseText);
                if (result.err) {
                    Ext.MessageBox.alert("提示", result.err.message);
                    window.location.href = "/";
                } else {

                    //debugger;

                    PublicObject.CurrentUser = result.data;

                    document.getElementById('divUserInfo').innerHTML = "" +
                    '<br />' +
                    result.data.realname +
                    ' <br/>' +
                    "<a style='color:#ffffff;text-decoration:none;' href='#' onclick='createModifyPassWordFormPanel()'>修改密码</a>" + "| <a style='color:#ffffff;text-decoration:none;' href='#' onclick='userLogout()'>退出</a>";

                    var wpTreePanel = Ext.getCmp('wpTreePanel');
                    ManagementSystem.app.getWestPanelController().TreeShow(wpTreePanel);

                }
            },
            failure: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//取消遮罩
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                window.location.href = "/";
            }
        });
    }

});