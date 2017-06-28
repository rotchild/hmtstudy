Ext.define('ManagementSystem.controller.UserGrid', {
    extend: 'Ext.app.Controller',
    views: [
        'UserGrid'
        , 'UserWindow'
    ],
    stores: ['UserStore'],
    init: function () {
        this.control({
            'userGrid': {
                'render': this.GetUser,
                'itemdblclick': function (_panel, _record, _item, _index, _eventItem) {
                    Ext.getCmp('userGridId').getSelectionModel().select(_record);
                    this.EditUser();
                }
            },
            'userGrid #btnAdd': {
                'click': this.AddUser
            },
            'userGrid #btnEdit': {
                'click': this.EditUser
            },
            'userGrid #btnDel': {
                'click': this.DelUser
            },
            'userGrid #BtnSearch': {
                'click': this.GetUser
            },
            'userGrid #BtnReset': {
                'click': this.ResetSearchUser
            },
            'userWindow #btnAdd': {
                'click': this.AddUserWin
            },
            'userWindow #btnEdit': {
                'click': this.EditUserWin
            },
            'userWindow #btnCancel': {
                'click': function () {
                    Ext.getCmp("userWindowId").destroy();
                }
            }
        });
    },
    GetUser: function () {

        //debugger;

        var selectTreeName = PublicObject.selectTreeName.raw.name;

        var userclass = "";

        if (selectTreeName == 11) {//管理员

            userclass = 1;

        } else if (selectTreeName == 12) {//店长

            userclass = 2;

        } else if (selectTreeName == 13) {//前台

            userclass = 3;

        }else if(selectTreeName == 14){
            userclass=4;
        }

        var keyword = Ext.getCmp('userGridId').down('#keyword').getValue();

        var params = {
            userclass: userclass,
            keyword: keyword,
            RandomTag: Math.random()
        };
        var queryUrl = encodeURI("../api/ManagementSystem/GetUser");
        Ext.getStore("UserStore").getProxy().url = queryUrl;
        Ext.getStore("UserStore").getProxy().extraParams = params;
        try {
            Ext.getStore("UserStore").currentPage = 1;
        } catch (e) {
        }//设置页面为1，防止多次刷新页面。比loadPage(1)好。这个不需要再次请求网络。用loadPage会发生多一次的网络请求。如果瞬间切换多个store的话，回调有可能紊乱。写在Store的load之前。
        Ext.getStore("UserStore").load();
    },
    ResetSearchUser: function () {

        var keyword = Ext.getCmp('userGridId').down('#keyword');
        keyword.setValue("");

        ManagementSystem.app.getUserGridController().GetUser();
    },
    AddUser: function () {
        var win = Ext.create('ManagementSystem.view.UserWindow', {
            title: '添加用户信息',
            listeners: {
                render: function () {

                },
                show: function () {

                    var selectTreeName = PublicObject.selectTreeName.raw.name;

                    var userclass = "";

                    if (selectTreeName == 11) {//管理员

                        userclass = 1;

                        Ext.getCmp('userWindowId').height = 180;

                    } else if (selectTreeName == 12) {//店长

                        userclass = 2;

                        Ext.getCmp('userWindowId').height = 250;

                    } else if (selectTreeName == 13) {//前台

                        userclass = 3;

                        Ext.getCmp('userWindowId').height = 250;

                    }else if (selectTreeName == 14) {

                        userclass = 4;

                        Ext.getCmp('userWindowId').height = 250;

                    }

                    Ext.getCmp('userWindowId').down('#btnEdit').setVisible(false);

                    if (userclass == 1) {//管理员

                        Ext.getCmp('userWindowId').down('#rolestr').setVisible(false);

                    }

                }
            }
        });
        win.show();
    },
    EditUser: function () {
        //debugger;
        var selectUser = Ext.getCmp('userGridId').getSelectionModel().getSelection();
        if (selectUser.length == 1) {
            var win = Ext.create('ManagementSystem.view.UserWindow', {
                title: '修改用户信息',
                listeners: {
                    render: function () {

                    },
                    show: function () {

                        PublicObject.selectUser = selectUser[0].raw;

                        var selectTreeName = PublicObject.selectTreeName.raw.name;

                        var userclass = "";

                        if (selectTreeName == 11) {//管理员

                            userclass = 1;

                            Ext.getCmp('userWindowId').height = 180;

                        } else if (selectTreeName == 12) {//店长

                            userclass = 2;

                            Ext.getCmp('userWindowId').height = 250;

                        } else if (selectTreeName == 13) {//前台

                            userclass = 3;

                            Ext.getCmp('userWindowId').height = 250;

                        }else if (selectTreeName == 14) {//前台

                            userclass = 4;

                            Ext.getCmp('userWindowId').height = 250;

                        }

                        Ext.getCmp('userWindowId').down('#btnAdd').setVisible(false);

                        Ext.getCmp('userWindowId').down('#username').setReadOnly(true);
                        Ext.getCmp('userWindowId').down('#username').setFieldStyle('background:#ffffff;border:0px;');
                        Ext.getCmp('userWindowId').down('#username').setValue(selectUser[0].raw.username);

                        Ext.getCmp('userWindowId').down('#password').setFieldLabel('用户密码(不改请留空)');

                        Ext.getCmp('userWindowId').down('#realname').setValue(selectUser[0].raw.realname);

                        Ext.getCmp('userWindowId').down('#mobile').setValue(selectUser[0].raw.mobile);

                        if (userclass == 1) {//管理员

                            Ext.getCmp('userWindowId').down('#rolestr').setVisible(false);

                        } else {
                            var rolestr = selectUser[0].raw.rolestr;
                            var RoleStr = rolestr.split(",");
                            for (var i = 0; i < RoleStr.length; i++) {
                                var key = RoleStr[i];
                                if (key == 1) {
                                    Ext.getCmp('RoleStr01').setValue(true);
                                }
                                if (key == 2) {
                                    Ext.getCmp('RoleStr02').setValue(true);
                                }
                                if (key == 3) {
                                    Ext.getCmp('RoleStr03').setValue(true);
                                }
                                if (key == 4) {
                                    Ext.getCmp('RoleStr04').setValue(true);
                                }
                                if (key == 5) {
                                    Ext.getCmp('RoleStr05').setValue(true);
                                }
                                if (key == 6) {
                                    Ext.getCmp('RoleStr06').setValue(true);
                                }
                                if (key == 7) {
                                    Ext.getCmp('RoleStr07').setValue(true);
                                }
                            }
                        }

                    }
                }
            });
            win.show();
        } else {
            Ext.MessageBox.alert('提示', '请选择一条内容');
        }
    },
    DelUser: function () {
        var selectUser = Ext.getCmp('userGridId').getSelectionModel().getSelection();
        if (selectUser.length == 1) {
            Ext.MessageBox.confirm("提示", "是否要删除用户[<font color='red'>" + selectUser[0].raw.username + " - " + selectUser[0].raw.realname + "</font>]？", function (btnId) {
                if (btnId == "yes") {
                    Ext.Ajax.request({
                        url: '../api/ManagementSystem/DelUser',
                        params: {
                            id: selectUser[0].raw.id,
                            RandomTag: Math.random()
                        },
                        method: 'Post',
                        success: function (response, options) {
                            var result = Ext.JSON.decode(response.responseText);
                            if (result.err) {
                                Ext.MessageBox.alert('提示', result.err.message);
                            } else {
                                Ext.getStore('UserStore').reload();
                                Ext.MessageBox.alert('提示', '删除成功');
                            }
                        },
                        failure: function (response, options) {
                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                        }
                    });
                }
            });
        } else {
            Ext.MessageBox.alert('提示', '请选择一条内容');
        }
    },
    AddUserWin: function () {

        //debugger;

        var selectTreeName = PublicObject.selectTreeName.raw.name;

        var userclass = "";

        if (selectTreeName == 11) {//管理员

            userclass = 1;

        } else if (selectTreeName == 12) {//店长

            userclass = 2;

        } else if (selectTreeName == 13) {//前台

            userclass = 3;

        }else if (selectTreeName == 14) {//外卖配送

            userclass = 4;

        }

        var username = Ext.getCmp('userWindowId').down('#username').getValue();
        var password = Ext.getCmp('userWindowId').down('#password').getValue();
        var realname = Ext.getCmp('userWindowId').down('#realname').getValue();
        var mobile = Ext.getCmp('userWindowId').down('#mobile').getValue();
        var rolestr = Ext.getCmp('userWindowId').down('#rolestr').getValue();
        var RoleStr = '';
        if (userclass == 1) {
            RoleStr = "1,2,3,4,5,6,7,";
        } else {
            for (var i in rolestr) {
                if (i == 1) {
                    RoleStr += "1,";
                }
                if (i == 2) {
                    RoleStr += "2,";
                }
                if (i == 3) {
                    RoleStr += "3,";
                }
                if (i == 4) {
                    RoleStr += "4,";
                }
                if (i == 5) {
                    RoleStr += "5,";
                }
                if (i == 6) {
                    RoleStr += "6,";
                }
                if (i == 7) {
                    RoleStr += "7,";
                }
            }
        }

        if (username == "") {
            Ext.MessageBox.alert("提示", "用户姓名不能为空");
            return;
        }

        if (password == "") {
            Ext.MessageBox.alert("提示", "用户密码不能为空");
            return;
        }

        if (realname == "") {
            Ext.MessageBox.alert("提示", "真实姓名不能为空");
            return;
        }

        if (RoleStr == "") {
            Ext.MessageBox.alert("提示", "任务权限不能为空");
            return;
        }
        var regex=/^[1]+[3,5,7,8]+\d{9}$/;
        if(!regex.test(mobile)){
            Ext.MessageBox.alert("提示", "亲，请填写正确的电话号码！");
            return;
        }
        //debugger;
        //return;
        Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/ManagementSystem/AddUser',
            params: {
                username: username,
                password: hex_md5(password),
                realname: realname,
                userclass: userclass,
                mobile: mobile,
                rolestr: RoleStr,
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
                    Ext.getStore('UserStore').reload();
                    Ext.getCmp('userWindowId').destroy();
                    Ext.MessageBox.alert('提示', '添加成功');
                }
            },
            failure: function (response, options) {
                Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
            }
        });
    },
    EditUserWin: function () {

        //debugger;

        var selectTreeName = PublicObject.selectTreeName.raw.name;

        var userclass = "";

        if (selectTreeName == 11) {//管理员

            userclass = 1;

        } else if (selectTreeName == 12) {//店长

            userclass = 2;

        } else if (selectTreeName == 13) {//前台

            userclass = 3;

        }else if (selectTreeName == 14) {//外卖配送

            userclass = 4;

        }

        var username = Ext.getCmp('userWindowId').down('#username').getValue();
        var password = Ext.getCmp('userWindowId').down('#password').getValue();
        var realname = Ext.getCmp('userWindowId').down('#realname').getValue();
        var mobile = Ext.getCmp('userWindowId').down('#mobile').getValue();
        var rolestr = Ext.getCmp('userWindowId').down('#rolestr').getValue();
        var RoleStr = '';
        if (userclass == 1) {
            RoleStr = "1,2,3,4,5,6,7,";
        } else {
            for (var i in rolestr) {
                if (i == 1) {
                    RoleStr += "1,";
                }
                if (i == 2) {
                    RoleStr += "2,";
                }
                if (i == 3) {
                    RoleStr += "3,";
                }
                if (i == 4) {
                    RoleStr += "4,";
                }
                if (i == 5) {
                    RoleStr += "5,";
                }
                if (i == 6) {
                    RoleStr += "6,";
                }
                if (i == 7) {
                    RoleStr += "7,";
                }
            }
        }

        if (username == "") {
            Ext.MessageBox.alert("提示", "用户姓名不能为空");
            return;
        }

        //if (password == "") {
        //    Ext.MessageBox.alert("提示", "用户密码不能为空");
        //    return;
        //}

        if (realname == "") {
            Ext.MessageBox.alert("提示", "真实姓名不能为空");
            return;
        }

        if (RoleStr == "") {
            Ext.MessageBox.alert("提示", "任务权限不能为空");
            return;
        }

        if (password != "") {
            password = hex_md5(password);
        }
        var regex=/^[1]+[3,5,7,8]+\d{9}$/;
        if(!regex.test(mobile)){
            Ext.MessageBox.alert("提示", "亲，请填写正确的电话号码！");
            return;
        }
        //debugger;
        //return;
        Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
        Ext.Ajax.request({
            url: '../api/ManagementSystem/EditUser',
            params: {
                username: username,
                password: password,
                realname: realname,
                userclass: userclass,
                mobile: mobile,
                rolestr: RoleStr,
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
                    Ext.getStore('UserStore').reload();
                    Ext.getCmp('userWindowId').destroy();
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