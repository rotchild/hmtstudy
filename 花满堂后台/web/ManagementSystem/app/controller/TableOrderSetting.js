Ext.define('ManagementSystem.controller.TableOrderSetting', {
    extend: 'Ext.app.Controller',
    views: [
        'TableOrderSetting'
        , 'components.field.DateTime'
    ],
    init: function () {
        this.control({
            'tableOrderSetting': {
                'render': this.GetTableOrderSetting
            },
            'tableOrderSetting #btnSetting': {
                'click': this.AddTableOrderSetting
            },
            'tableOrderSetting #btnCancel': {
                'click': this.CancelTableOrderSetting
            }
        });
    },
    GetTableOrderSetting: function () {
        //debugger;
        Ext.getCmp('mainViewPort').getEl().mask("正在获取数据，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/ManagementSystem/GetTableOrderSetting',
            params: {
                settingstype: 1,//设置类型 1：订位设置 2：外卖设置
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
                        Ext.getElementById("FourTableCount").value = data.fourtablecount;
                        Ext.getElementById("SixTableCount").value = data.sixtablecount;
                        Ext.getElementById("BoxTableCount").value = data.boxtablecount;
                        getdatingcount();
                        Ext.getCmp('tableOrderSettingId').down('#lunchstarttime').setValue(data.lunchstarttime);
                        Ext.getCmp('tableOrderSettingId').down('#lunchendtime').setValue(data.lunchendtime);
                        Ext.getCmp('tableOrderSettingId').down('#dinnerstarttime').setValue(data.dinnerstarttime);
                        Ext.getCmp('tableOrderSettingId').down('#dinnerendtime').setValue(data.dinnerendtime);
                        Ext.getCmp('tableOrderSettingId').down('#spanday').setValue(data.spanlimitstime);
                    }
                }
            },
            failure: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });

    },
    AddTableOrderSetting: function () {
        //debugger;
        var type=PublicObject.TableOrderSetting;
        if(type==0){
            type=0;
        }else{
            type=1;
        }
        var fourtable=Ext.getElementById('FourTableCount').value;
        var sixtable=Ext.getElementById('SixTableCount').value;
        var baojian=Ext.getElementById('BoxTableCount').value;
        var lunchstarttime=Ext.getCmp('tableOrderSettingId').down('#lunchstarttime').rawValue;
        var lunchendtime=Ext.getCmp('tableOrderSettingId').down('#lunchendtime').rawValue;
        var dinnerstarttime=Ext.getCmp('tableOrderSettingId').down('#dinnerstarttime').rawValue;
        var dinnerendtime=Ext.getCmp('tableOrderSettingId').down('#dinnerendtime').rawValue;
        var spanday=Ext.getCmp('tableOrderSettingId').down('#spanday').getValue();
        var regexp=/^[0-9]+$/;
        if(!regexp.test(fourtable) || !regexp.test(sixtable) || !regexp.test(baojian) || !regexp.test(spanday)){
            Ext.MessageBox.alert('提示','亲，请输入正确的数字！');
            return;
        }
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

        var params={
            type:type,
            fourtable:fourtable,
            sixtable:sixtable,
            baojian:baojian,
            lunchstarttime:lunchstarttime,
            lunchendtime:lunchendtime,
            dinnerstarttime:dinnerstarttime,
            dinnerendtime:dinnerendtime,
            spanday:spanday,
            settingstype: 1,
            RandomTag:Math.random()
        };
        Ext.getCmp('mainViewPort').getEl().mask("请稍候...");//遮罩
        Ext.Ajax.request({
            url: '../api/ManagementSystem/AddTableOrderSetting',
            params:params,
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
    CancelTableOrderSetting: function () {
        //debugger;
//        Ext.MessageBox.confirm("提示", "是否确定清空所有数据？", function (btn) {
//            if (btn == "yes") {
                Ext.getElementById("FourTableCount").value = "";
                Ext.getElementById("SixTableCount").value = "";
                Ext.getElementById("BoxTableCount").value = "";
//                settingstype=1;
                Ext.getCmp('tableOrderSettingId').down('#lunchstarttime').setValue("");
                Ext.getCmp('tableOrderSettingId').down('#lunchendtime').setValue("");
                Ext.getCmp('tableOrderSettingId').down('#dinnerstarttime').setValue("");
                Ext.getCmp('tableOrderSettingId').down('#dinnerendtime').setValue("");
                Ext.getCmp('tableOrderSettingId').down('#spanday').setValue("");
//                Ext.getCmp('mainViewPort').getEl().mask("请稍候...");
//                Ext.Ajax.respest({
//                    params:{RandomTag:Math.random()},
//                    url:'../api/ManagementSystem/deleteTableSetting',
//                    method:'post',
//                    success:function(response){
//                        Ext.getCmp('mainViewPort').getEl().unmask();
//                        var result=Ext.JSON.decode(response.responseText);
//                        if(result.err){
//                            Ext.Msg.alert('提示',result.err);
//                        }else{
//                            Ext.Msg.alert('提示','已清空所有设置数据！');
//                            ManagementSystem.app.getTableOrderSettingControl().GetTableOrderSetting();
//                        }
//                    },
//                    failure:function(response){
//                        Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
//                        Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
//                    }
//                })
//            }
//        });
    }
});