/**
 * Created by Administrator on 2016/9/19.
 */
Ext.define('ManagementSystem.controller.ServiceManagementCtrl', {
    extend: 'Ext.app.Controller',
    views: [

    ],
    stores: [
        "ServiceClassStore"
    ],
    init: function () {
        this.control({
            'serviceManagement': {
                'render': this.GetMenu,
                'itemdblclick': function (_panel, _record, _item, _index, _eventItem) {
                    Ext.getCmp('serviceManagement').getSelectionModel().select(_record);
                    this.EditMenu();
                }
            },
            'serviceManagement #btnAdd': {
                'click': this.AddMenu
            },
            'serviceManagement #btnEdit': {
                'click': this.EditMenu
            },
            'serviceManagement #btnDel': {
                'click': this.deleteService
            },
            'addServiceWin #btnEnter': {
                'click': this.AddMenuWin
            },
            'addServiceWin #btnEdit': {
                'click': this.EditMenuWin
            },
            'addServiceWin #btnCancel': {
                'click': function () {
                    Ext.getCmp("addServiceWin").destroy();
                }
            }
        });
    },
    GetMenu: function () {

        //debugger;

        var selectTreeName = PublicObject.selectTreeName.raw.name;

        var dishtype = "";

        if (selectTreeName == 231) {//堂食

            dishtype = 1;

        } else if (selectTreeName == 232) {//外卖

            dishtype = 2;

        } else if (selectTreeName == 233) {//杂食

            dishtype = 3;

        }
        var params={
            type: dishtype,
            RandomTag: Math.random()
        };
        var queryUrl = encodeURI('../api/ManagementSystem/GetServiceClass');
        Ext.getStore("ServiceClassStore").getProxy().extraParams = params;
        Ext.getStore('ServiceClassStore').getProxy().url = queryUrl;
        Ext.getStore('ServiceClassStore').load();

    },
    EditMenu: function () {
        //debugger;

        var selectTreeName = PublicObject.selectTreeName.raw.name;

        var dishtype = "";

        if (selectTreeName == 231) {//堂食

            dishtype = 1;

        } else if (selectTreeName == 232) {//外卖

            dishtype = 2;

        } else if (selectTreeName == 233) {//杂食

            dishtype = 3;

        }

        var selectMenu = Ext.getCmp('serviceManagement').getSelectionModel().getSelection();
        if (selectMenu.length == 1) {
            var record=selectMenu[0].raw;
            PublicObject.selectDish=record;
            var win = Ext.create('ManagementSystem.view.addServiceWin', {
                title:'修改服务类',
                listeners: {
                    render: function () {

                    },
                    show: function () {
                        Ext.getCmp('addServiceWin').down('#type').setValue(dishtype);
                        Ext.getCmp('addServiceWin').down('#type').setDisabled(true);
                        Ext.getCmp('addServiceWin').down('#servicename').setValue(record.servicename);
                        Ext.getCmp('addServiceWin').down('#price').setValue(record.price);
                        Ext.getCmp('addServiceWin').down('#isdefault').setValue(record.isdefault);
                        Ext.getCmp('addServiceWin').down('#btnEnter').hide();
                    }
                }
            });
            win.show();
        } else {
            Ext.MessageBox.alert('提示', '请先勾选一条内容');
        }
    },
    AddMenu: function () {
        //debugger;
        var selectTreeName = PublicObject.selectTreeName.raw.name;

        var dishtype = "";

        if (selectTreeName == 231) {//堂食

            dishtype = 1;

        } else if (selectTreeName == 232) {//外卖

            dishtype = 2;

        } else if (selectTreeName == 233) {//杂食

            dishtype = 3;

        }

        var win = Ext.create('ManagementSystem.view.addServiceWin', {
            listeners: {
                render: function () {

                },
                show: function () {
                    Ext.getCmp('addServiceWin').down('#type').setValue(dishtype);
                    Ext.getCmp('addServiceWin').down('#type').setDisabled(true);
                    Ext.getCmp('addServiceWin').down('#btnEdit').hide();
                }
            }
        });
        win.show();
    }
    ,
    AddMenuWin: function () {
        var dishname = Ext.getCmp('addServiceWin').down('#servicename').getValue();
        var type = Ext.getCmp('addServiceWin').down('#type').getValue();
        var price = Ext.getCmp('addServiceWin').down('#price').getValue();
        var isdefault = Ext.getCmp('addServiceWin').down('#isdefault').getValue();
        var rule = Ext.getCmp('addServiceWin').down('#rule').getValue();
        var regexp=/^[0-9]+(\.[0-9]{0,2})?$/;
        if (dishname.trim() == "") {
            Ext.MessageBox.alert("提示", "服务名称不能为空");
            return;
        }

        if (!regexp.test(price)) {
            Ext.MessageBox.alert("提示", "请填写正确的价格");
            return;
        }
        //debugger;
        //return;
        Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/ManagementSystem/AddService',
            params: {
                servicename: dishname,
                type: type,
                price: price,
                rule:rule,
                isdefault: isdefault,
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
                    Ext.getStore('ServiceClassStore').reload();
                    Ext.getCmp('addServiceWin').destroy();
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
        //修改菜谱确定
        debugger;
        var dishname = Ext.getCmp('addServiceWin').down('#servicename').getValue();
        var type = Ext.getCmp('addServiceWin').down('#type').getValue();
        var price = Ext.getCmp('addServiceWin').down('#price').getValue();
        var isdefault = Ext.getCmp('addServiceWin').down('#isdefault').getValue();
        var rule = Ext.getCmp('addServiceWin').down('#rule').getValue();
        var regexp=/^[0-9]+(\.[0-9]{0,2})?$/;
        if (dishname.trim() == "") {
            Ext.MessageBox.alert("提示", "服务名称不能为空");
            return;
        }
        if (!regexp.test(price)) {
            Ext.MessageBox.alert("提示", "请填写正确的价格");
            return;
        }
        if(dishname==PublicObject.selectDish.servicename && price==PublicObject.selectDish.price && isdefault==PublicObject.selectDish.isdefault){
            return;
        }
        //return;
        Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/ManagementSystem/EditService',
            params: {
                id: PublicObject.selectDish.id,
                servicename: dishname,
                type: type,
                price: price,
                rule:rule,
                isdefault: isdefault,
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
                    Ext.getStore('ServiceClassStore').reload();
                    Ext.getCmp('addServiceWin').destroy();
                    Ext.MessageBox.alert('提示', '修改成功');
                }
            },
            failure: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
    },
    deleteService:function(){
        var selectMenu = Ext.getCmp('serviceManagement').getSelectionModel().getSelection();
        var Arr=[];
        for(var i=0;i<selectMenu.length;i++){
            Arr.push(selectMenu[i].data.id);
        }
        if(selectMenu.length>0){
            Ext.MessageBox.confirm('确定','确定删除该服务？',function(btn){
                if(btn=="yes"){
                    var params={
                        ids:JSON.stringify(Arr),
                        randomTag:Math.random()
                    }
                    Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
                    Ext.Ajax.request({
                        url: '../api/ManagementSystem/DeleteService',
                        params: params,
                        method: 'Post',
                        success: function (response, options) {
                            //debugger;
                            Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                            var result = Ext.JSON.decode(response.responseText);
                            if (result.err) {
                                Ext.MessageBox.alert('提示', result.err.message);
                            } else {
                                Ext.getStore('ServiceClassStore').reload();
                                //Ext.MessageBox.alert('提示', '成功');
                            }
                        },
                        failure: function (response, options) {
                            Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                        }
                    });
                }
            })
        }
    }
});