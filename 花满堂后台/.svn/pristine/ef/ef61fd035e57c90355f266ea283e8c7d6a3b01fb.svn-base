/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-9-12
 * Time: 下午4:05
 * To change this template use File | Settings | File Templates.
 */
(function(){
    var id="";
    var telephone="";
    Ext.define('ManagementSystem.controller.DiliverymanGridContr',{
        extend:'Ext.app.Controller',
        view:'DiliverymanGrid',
        store:'DiliverymanStore',
        init:function(){
            this.control({
                'diliverymanGrid':{
                    'render':this.getDiliveryman
                },
                'diliverymanGrid #addbtn':{
                    'click':function(){
                        var win=Ext.create('ManagementSystem.view.DiliverymanWin',{
                            title:'添加配送员',
                            listeners:{
                                show:function(){
                                    Ext.getCmp('diliverymanWinId').down('#editbtn').setVisible(false);
                                }
                            }
                        });
                        win.show();
                    }
                },
                'diliverymanGrid #searchbtn':{
                    'click':function(){
                        this.getDiliveryman();
                    }
                },
                'diliverymanGrid #editbtn':{
                    'click':function(){
                        this.panelEditDiliveryman();
                    }
                },
                'diliverymanGrid #resetbtn':{
                    'click':function(){
                        ManagementSystem.app.getWestPanelController().DiliverymanGrid();
                    }
                },
                'diliverymanGrid #deletebtn':{
                    'click':function(){
                        this.paneldeleteDiliveryman();
                    }
                },
                'diliverymanWin #addbtn':{
                    click:function(){
                        this.addDiliveryman();
                    }
                },
                'diliverymanWin #editbtn':{
                    click:function(){
                        this.editDiliveryman();
                    }
                },
                'diliverymanWin #cancelbtn':{
                    click:function(){
                        Ext.getCmp('diliverymanWinId').destroy();
                    }
                }
            })
        },
        getDiliveryman:function(){
            //debugger;
            var keyword=Ext.getCmp('diliverymanGridId').down('#keyword').getValue();
            var params={
                userclass:5,
                keyword:keyword,
                RandomTag:Math.random()
            };
            var queryUrl = encodeURI("../api/ManagementSystem/GetDiliveryman");
            Ext.getStore("DiliverymanStore").getProxy().url = queryUrl;
            Ext.getStore("DiliverymanStore").getProxy().extraParams = params;
            Ext.getStore("DiliverymanStore").load();
        },
        addDiliveryman:function(){
            //debugger;
            var realname=Ext.getCmp('diliverymanWinId').down('#realname').getValue();
            var mobile=Ext.getCmp('diliverymanWinId').down('#mobile').getValue();
            if(realname.trim()==undefined || realname.trim()=="" || realname.trim()==null){
                Ext.Msg.alert('提示','请填写姓名！');
                return;
            }
            if(!(/^[1]+[3,5,7,8]+\d{9}$/.test(mobile))){
                Ext.Msg.alert('提示','请填写正确的电话号码！');
                return;
            }
            var params={
                realname:realname,
                mobile:mobile,
                RandomTag:Math.random()
            };
            Ext.getCmp('mainViewPort').getEl().mask('请稍等...');
            Ext.Ajax.request({
                params:params,
                url:'../api/ManagementSystem/addDiliveryman',
                method:'post',
                success:function(response){
                    //debugger;
                    var result=Ext.JSON.decode(response.responseText);
                    if(result.err){
                        Ext.Msg.alert('提示',result.err);
                    }else{
                        Ext.getCmp('mainViewPort').getEl().unmask();
                        Ext.Msg.alert('提示','添加成功！');
                        Ext.getStore('DiliverymanStore').removeAll();
                        Ext.getCmp('diliverymanWinId').destroy();
                        Ext.getStore('DiliverymanStore').reload()
                    }
                },
                failure:function(response){
                    Ext.getCmp('mainViewPort').getEl().unmask();
                    Ext.Msg.alert('提示','请求超时或网络故障,错误编号：' + response.status)
                }
            })
        },
        editDiliveryman:function(){
            //debugger;
            var realname=Ext.getCmp('diliverymanWinId').down('#realname').getValue();
            var mobile=Ext.getCmp('diliverymanWinId').down('#mobile').getValue();
            if(realname.trim()==undefined || realname.trim()=="" || realname.trim()==null){
                Ext.Msg.alert('提示','请填写姓名！');
                return;
            }
            if(!(/^[1]+[3,5,7,8]+\d{9}$/.test(mobile))){
                Ext.Msg.alert('提示','请填写正确的电话号码！');
                return;
            }
            var params={};
            if(telephone==mobile){
                params={
                    id:id,
                    realname:realname,
                    RandomTag:Math.random()
                };
                Ext.getCmp('mainViewPort').getEl().mask('请稍等...');
                Ext.Ajax.request({
                    params:params,
                    url:'../api/ManagementSystem/editDiliveryman1',
                    method:'post',
                    success:function(response){
                        Ext.getCmp('mainViewPort').getEl().unmask();
                        var result=Ext.JSON.decode(response.responseText);
                        if(result.err){
                            Ext.getCmp('mainViewPort').getEl().unmask();
                            Ext.Msg.alert('提示',result.err);
                        }else{
                            Ext.getCmp('mainViewPort').getEl().unmask();
                            Ext.Msg.alert('提示','修改成功！');
                            Ext.getStore('DiliverymanStore').removeAll();
                            Ext.getCmp('diliverymanWinId').destroy();
                            Ext.getStore('DiliverymanStore').reload()
                        }
                    },
                    failure:function(response){
                        Ext.getCmp('mainViewPort').getEl().unmask();
                        Ext.Msg.alert('提示','请求超时或网络故障,错误编号：' + response.status)
                    }
                })
            }else{
                params={
                    id:id,
                    realname:realname,
                    mobile:mobile,
                    RandomTag:Math.random()
                };
                Ext.getCmp('mainViewPort').getEl().mask('请稍等...');
                Ext.Ajax.request({
                    params:params,
                    url:'../api/ManagementSystem/editDiliveryman2',
                    method:'post',
                    success:function(response){
                        //debugger;
                        Ext.getCmp('mainViewPort').getEl().unmask();
                        var result=Ext.JSON.decode(response.responseText);
                        if(result.err){
                            Ext.getCmp('mainViewPort').getEl().unmask();
                            Ext.Msg.alert('提示',result.err);
                        }else{
                            Ext.getCmp('mainViewPort').getEl().unmask();
                            Ext.Msg.alert('提示','修改成功！');
                            Ext.getStore('DiliverymanStore').removeAll();
                            Ext.getCmp('diliverymanWinId').destroy();
                            Ext.getStore('DiliverymanStore').reload()
                        }
                    },
                    failure:function(response){
                        Ext.getCmp('mainViewPort').getEl().unmask();
                        Ext.Msg.alert('提示','请求超时或网络故障,错误编号：' + response.status)
                    }
                })
            }


        },
        panelEditDiliveryman:function(){
            //debugger;
            var selection=Ext.getCmp('diliverymanGridId').getSelectionModel().getSelection();
            if(selection.length>0){
                id=selection[0].raw.id;
                telephone=selection[0].raw.mobile;
                var win=Ext.create('ManagementSystem.view.DiliverymanWin',{
                    title:'修改配送员信息',
                    listeners:{
                        show:function(){
                            Ext.getCmp('diliverymanWinId').down('#realname').setValue(selection[0].raw.realname);
                            Ext.getCmp('diliverymanWinId').down('#mobile').setValue(selection[0].raw.mobile);
                            Ext.getCmp('diliverymanWinId').down('#addbtn').setVisible(false);
                        }
                    }
                });
                win.show();
            }else{
                Ext.Msg.alert('提示','请先选择一个配送员！');
            }
        },
        paneldeleteDiliveryman:function(){
            var selection=Ext.getCmp('diliverymanGridId').getSelectionModel().getSelection();
            if(selection.length>0){
                var jsonData=[];
                Ext.MessageBox.confirm('提示',"是否要删除所选的配送员",function(btnId){
                    if(btnId=="yes"){
                    //debugger;
                        for(var i=0;i<selection.length;i++){
                            var user_id=selection[i].get("id");
                            jsonData.push(user_id);
                        }
                        Ext.getCmp('mainViewPort').getEl().mask("正在删除...");
                        Ext.Ajax.request({
                            url:'../api/ManagementSystem/deleteDiliveryman' ,
                            params:{
                                userid:jsonData,
                                RandomTag:Math.random()
                            } ,
                            method:'Post',
                            success:function(response,options){
//                                 debugger;
                                var result=Ext.JSON.decode(response.responseText);
                                if(result.err){
                                    Ext.getCmp('mainViewPort').getEl().unmask();
                                    Ext.MessageBox.alert('提示',result.err.message);
                                }
                                else{
                                    Ext.getStore('DiliverymanStore').load();
                                    Ext.getCmp('mainViewPort').getEl().unmask();
                                    Ext.MessageBox.alert('提示','删除成功！');
                                }
                            },
                            failure:function(response,options){
                                Ext.getCmp('mainViewPort').getEl().unmask();
                                Ext.MessageBox.alert('失败','请求失败'+response.status);
                            }
                        })
                    }
                })
            }else{
                Ext.Msg.alert('提示','请先选择配送员！');
            }
        }
    });
}).call(this);
