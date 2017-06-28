Ext.define('ManagementSystem.controller.UserWindow', {
    extend: 'Ext.app.Controller',
    init: function () {
        this.control({
            'userWindow #btnAdd': {
                'click': function () {
                    var username = Ext.getCmp('userWindow').down('#username').getValue();
                    var password = Ext.getCmp('userWindow').down('#password').getValue();
                    var realname = Ext.getCmp('userWindow').down('#realname').getValue();

                    var areaid = Ext.getCmp('userWindow').down('#AreaItemId').getValue();

                    if (username == "") {
                        Ext.MessageBox.alert("提示", "用户名不能为空");
                        return;
                    }
                    if (password == "") {
                        Ext.MessageBox.alert("提示", "密码不能为空");
                        return;
                    }
                    if (realname == "") {
                        Ext.MessageBox.alert("提示", "真实姓名不能为空");
                        return;
                    }

                    //debugger;
                    var userclass = Ext.getCmp('userWindow').down('#userclass');
                    var userclassStr = {};
                    var flag = false;
                    for (var i = 0; i < userclass.items.length; i++) {
                        if (userclass.items.items[i].checked) {
                            //debugger;
                            flag = true;
                            userclassStr[userclass.items.items[i].name] = 1;
                        }
                    }
                    if (!flag) {
                        Ext.MessageBox.alert("提示", "用户级别不能为空");
                        return;
                    }
                    //debugger;
                    var _userclass = JSON.stringify(userclassStr);
                    Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩
                    Ext.Ajax.request({
                        url: '../api/ManagementSystem/AddUser',
                        params: {
                            username: username,
                            password: hex_md5(password),
                            realname: realname,
                            userclass: _userclass,
                            areaid: areaid,
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
                                Ext.getCmp('userWindow').destroy();
                                Ext.MessageBox.alert('提示', '添加成功');
                            }
                        },
                        failure: function (response, options) {
                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                        }
                    });
                }
            },
            'userWindow #btnCancel': {
                'click': function () {
                    Ext.getCmp('userWindow').destroy();
                }
            },
            'userWindow #btnEdit': {
                'click': function () {
                    var realname = Ext.getCmp('userWindow').down('#realname').getValue();
                    if (realname == "") {
                        Ext.MessageBox.alert("提示", "真实姓名不能为空");
                        return;
                    }

                    var areaid = Ext.getCmp('userWindow').down('#AreaItemId').getValue();
                    if (areaid == "") {
                        Ext.MessageBox.alert("提示", "所属机构不能为空");
                        return;
                    }

                    //debugger;
                    var userclass = Ext.getCmp('userWindow').down('#userclass');
                    var userclassStr = {};
                    var flag = false;
                    for (var i = 0; i < userclass.items.length; i++) {
                        if (userclass.items.items[i].checked) {
                            //debugger;
                            flag = true;
                            userclassStr[userclass.items.items[i].name] = 1;
                        }
                    }
                    if (!flag) {
                        Ext.MessageBox.alert("提示", "用户级别不能为空");
                        return;
                    }
                    //debugger;
                    var _userclass = JSON.stringify(userclassStr);

                    var password = Ext.getCmp('userWindow').down('#password').getValue();
                    if (password != "")
                        password = hex_md5(password);

                    Ext.getCmp('mainViewPort').getEl().mask("正在提交数据，请稍候");//遮罩

                    Ext.Ajax.request({
                        url: '../api/ManagementSystem/EditUser',
                        params: {
                            username: Ext.getCmp('userWindow').down('#username').getValue(),
                            password: password,
                            realname: realname,
                            userclass: _userclass,
                            areaid: areaid,
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
                                Ext.getCmp('userWindow').destroy();
                                Ext.MessageBox.alert('提示', '修改成功');
                            }
                        },
                        failure: function (response, options) {
                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                        }
                    });
                }
            }
        });
    }
});