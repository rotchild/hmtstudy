Ext.define('ManagementSystem.controller.TableOrderSetting02', {
    extend: 'Ext.app.Controller',
    views: [
        'TableOrderSetting02'
        , 'components.field.DateTime'
    ],
    init: function () {
        this.control({
            'tableOrderSetting02': {
                'render': this.GetTableOrderSetting02
            },
            'tableOrderSetting02 #btnSetting': {
                'click': this.AddTableOrderSetting02
            },
            'tableOrderSetting02 #btnCancel': {
                'click': this.CancelTableOrderSetting02
            }
        });
    },
    GetTableOrderSetting02: function () {

        Ext.getCmp('mainViewPort').getEl().mask("正在获取数据，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/ManagementSystem/GetTableOrderSetting',
            params: {
                settingstype: 2,//设置类型 1：订位设置 2：外卖设置
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

                    PublicObject.TableOrderSetting = result.data;

                    if (result.data.length == 0) {
                    } else {
                        var data = result.data[0];
                        Ext.getCmp('tableOrderSettingId02').down('#lunchstarttime').setValue(data.lunchstarttime);
                        Ext.getCmp('tableOrderSettingId02').down('#lunchendtime').setValue(data.lunchendtime);
                        Ext.getCmp('tableOrderSettingId02').down('#dinnerstarttime').setValue(data.dinnerstarttime);
                        Ext.getCmp('tableOrderSettingId02').down('#dinnerendtime').setValue(data.dinnerendtime);
                    }

                }
            },
            failure: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });

    },
    AddTableOrderSetting02: function () {
        //debugger;
        var lunchstarttime=Ext.getCmp('tableOrderSettingId02').down('#lunchstarttime').rawValue;
        var lunchendtime=Ext.getCmp('tableOrderSettingId02').down('#lunchendtime').rawValue;
        var dinnerstarttime=Ext.getCmp('tableOrderSettingId02').down('#dinnerstarttime').rawValue;
        var dinnerendtime=Ext.getCmp('tableOrderSettingId02').down('#dinnerendtime').rawValue;

        if(lunchstarttime==null||lunchstarttime==""||lunchstarttime==undefined){
            Ext.Msg.alert('提示','请将时间信息填写完整！');
            return;
        }
        if(lunchendtime==null||lunchendtime==""||lunchendtime==undefined){
            Ext.Msg.alert('提示','请将时间信息填写完整！');
            return;
        }
        if(dinnerstarttime==null||dinnerstarttime==""||dinnerstarttime==undefined){
            Ext.Msg.alert('提示','请将时间信息填写完整！');
            return;
        }
        if(dinnerendtime==null||dinnerendtime==""||dinnerendtime==undefined){
            Ext.Msg.alert('提示','请将时间信息填写完整！');
            return;
        }
        var TableOrderSetting = PublicObject.TableOrderSetting;
        var type = "";
        if (TableOrderSetting.length == 0) {
            type = 0;//第一次设置
        } else {
            type = 1;
        }
        Ext.getCmp('mainViewPort').getEl().mask("正在进行设置，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/ManagementSystem/AddTableOrderSetting02',
            params: {
                lunchstarttime:lunchstarttime,
                lunchendtime:lunchendtime,
                dinnerstarttime:dinnerstarttime,
                dinnerendtime:dinnerendtime,
                settingstype: 2,//设置类型 1：订位设置 2：外卖设置
                type: type,
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

                    PublicObject.TableOrderSetting = result.data;

                    Ext.MessageBox.alert('提示', "设置成功");

                }
            },
            failure: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });

    },
    CancelTableOrderSetting02: function () {
        //debugger;
//        Ext.MessageBox.confirm("提示", "是否确定清空所有数据？", function (btn) {
//            if (btn == "yes") {
                Ext.getCmp('tableOrderSettingId02').down('#lunchstarttime').setValue("");
                Ext.getCmp('tableOrderSettingId02').down('#lunchendtime').setValue("");
                Ext.getCmp('tableOrderSettingId02').down('#dinnerstarttime').setValue("");
                Ext.getCmp('tableOrderSettingId02').down('#dinnerendtime').setValue("");
//            }
//        });
    }
});