/**
 * Created by Administrator on 2016/9/22.
 * 部门管理
 */
Ext.define('ManagementSystem.controller.DepartCtrl', {
    extend: 'Ext.app.Controller',
    views: [
        'addDepartWin'
    ],
    stores: [
        "DepartmentStore"
    ],
    init: function () {
        this.control({
            'departManagement': {
                'render': this.GetMenu,
                'itemdblclick': function (_panel, _record, _item, _index, _eventItem) {
                    Ext.getCmp('departManagement').getSelectionModel().select(_record);
                    this.EditMenu();
                }
            },
            'departManagement #btnAdd': {
                'click': this.AddMenu
            },
            'departManagement #btnEdit': {
                'click': this.EditMenu
            },
            'departManagement #btnDel': {
                'click': this.deleteService
            },
            'addDepartWin #btnEnter': {
                'click': this.AddMenuWin
            },
            'addDepartWin #btnEdit': {
                'click': this.EditMenuWin
            },
            'addDepartWin #btnCancel': {
                'click': function () {
                    Ext.getCmp("addDepartWin").destroy();
                }
            }
        });
    },
    GetMenu: function () {

        //debugger;

        var selectTreeName = PublicObject.selectTreeName.raw.name;
        var params={randomTag:Math.random()};
        var queryUrl = encodeURI('../api/ManagementSystem/getAllDepartment');
        Ext.getStore("DepartmentStore").getProxy().extraParams = params;
        Ext.getStore('DepartmentStore').getProxy().url = queryUrl;
        Ext.getStore('DepartmentStore').load();

    },
    EditMenu: function () {
        //debugger;

        var selectTreeName = PublicObject.selectTreeName.raw.name;

        var selectMenu = Ext.getCmp('departManagement').getSelectionModel().getSelection();
        if (selectMenu.length == 1) {
            var record=selectMenu[0].raw;
            PublicObject.selectDish=record;
            var win = Ext.create('ManagementSystem.view.addDepartWin', {
                title:'修改部门信息',
                listeners: {
                    render: function () {

                    },
                    show: function () {
                        Ext.getCmp('addDepartWin').down('#departmentName').setValue(record.departmentName);
                        Ext.getCmp('addDepartWin').down('#ipAddress').setValue(record.ipAddress);
                        if(Ext.getCmp('addDepartWin').down('#departmentName').getValue()==="前台" || Ext.getCmp('addDepartWin').down('#departmentName').getValue()==="传菜"){
                            Ext.getCmp('addDepartWin').down('#departmentName').disable(true);
                        }
                        Ext.getCmp('addDepartWin').down('#btnEnter').hide();
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

        var win = Ext.create('ManagementSystem.view.addDepartWin', {
            title:'添加部门',
            listeners: {
                render: function () {

                },
                show: function () {
                    Ext.getCmp('addDepartWin').down('#btnEdit').hide();
                }
            }
        });
        win.show();
    }
    ,
    AddMenuWin: function () {
        //添加菜谱确定
        var departmentName = Ext.getCmp('addDepartWin').down('#departmentName').getValue();
        var ipAddress = Ext.getCmp('addDepartWin').down('#ipAddress').getValue();
        if (departmentName.trim() == "" || departmentName.trim()==null || departmentName.trim()==undefined) {
            Ext.MessageBox.alert("提示", "名称不能为空");
            return;
        }
        var regext=/(?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/;
        if (ipAddress == "" || ipAddress==null || ipAddress==undefined) {
            Ext.MessageBox.alert("提示", "IP地址不能为空");
            return;
        }
        if(!regext.test(ipAddress)){
            Ext.MessageBox.alert("提示", "请输入正确的地址!");
            return;
        }
        //return;
        Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/ManagementSystem/AddDepart',
            params: {
                departmentName: departmentName,
                ipAddress: ipAddress,
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
                    Ext.getStore('DepartmentStore').reload();
                    Ext.getCmp('addDepartWin').destroy();
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
        var departmentName = Ext.getCmp('addDepartWin').down('#departmentName').getValue();
        var ipAddress = Ext.getCmp('addDepartWin').down('#ipAddress').getValue();
        if (departmentName.trim() == "" || departmentName.trim()==null || departmentName.trim()==undefined) {
            Ext.MessageBox.alert("提示", "名称不能为空");
            return;
        }
        var regext=/(?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/;
        if (ipAddress == "" || ipAddress==null || ipAddress==undefined) {
            Ext.MessageBox.alert("提示", "IP地址不能为空");
            return;
        }
        if(!regext.test(ipAddress)){
            Ext.MessageBox.alert("提示", "请输入正确的地址!");
            return;
        }
        //debugger;
        //return;
        Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/ManagementSystem/EditDepart',
            params: {
                id: PublicObject.selectDish.id,
                departmentName: departmentName,
                ipAddress: ipAddress,
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
                    Ext.getStore('DepartmentStore').reload();
                    Ext.getCmp('addDepartWin').destroy();
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
        var selectMenu = Ext.getCmp('departManagement').getSelectionModel().getSelection();
        var Arr=[];
        for(var i=0;i<selectMenu.length;i++){
            Arr.push(selectMenu[i].data.id);
        }
        Ext.MessageBox.confirm('确定','确定删除该部门？',function(btn){
            if(btn=="yes"){
                var params={
                    ids:JSON.stringify(Arr),
                    randomTag:Math.random()
                }
                Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
                Ext.Ajax.request({
                    url: '../api/ManagementSystem/DeleteDepart',
                    params: params,
                    method: 'Post',
                    success: function (response, options) {
                        //debugger;
                        Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                        var result = Ext.JSON.decode(response.responseText);
                        if (result.err) {
                            Ext.MessageBox.alert('提示', result.err.message);
                        } else {
                            Ext.getStore('DepartmentStore').reload();
                            Ext.MessageBox.alert('提示', '成功');
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
});