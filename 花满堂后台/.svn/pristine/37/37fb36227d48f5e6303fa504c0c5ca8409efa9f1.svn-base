/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-9-13
 * Time: 下午3:23
 * To change this template use File | Settings | File Templates.
 */
(function(){
    var orderid="";
    Ext.define('ManagementSystem.controller.DiliveryGridContr',{
        extend:'Ext.app.Controller',
        view:'DiliveryWin',
        init:function(){
            this.control({
                'diliveryGrid':{
                    'render':this.GetDilivery,
                    cellclick:this.peisong
                },
                'diliveryGrid #searchbtn':{
                    click:function(){
                        this.GetDilivery();
                    }
                },
                'diliveryGrid #resetbtn':{
                    click:function(){
                        ManagementSystem.app.getWestPanelController().DiliveryGrid();
                    }
                },
                'diliverywin #BtnCancel':{
                    click:function(){
                        Ext.getCmp('diliverywinId').destroy();
                    }
                },
                'diliverywin #BtnSave':{
                    click:function(){
                        this.fenpei();
                    }
                }
            })
        },
        GetDilivery:function(){
            //debugger;
            var keyword=Ext.getCmp('diliveryGridId').down('#keyword').getValue();
            var startdate=Ext.getCmp('diliveryGridId').down('#DateStart').rawValue+" 00:00:00";
            var enddate=Ext.getCmp('diliveryGridId').down('#DateEnd').rawValue+" 23:59:59";
            var params={
                userclass:5,
                keyword:keyword,
                startdate:startdate,
                enddate:enddate,
                taskstatus:'2,3,4,5',
                RandomTag:Math.random()
            };
            var queryUrl = encodeURI("../api/ManagementSystem/GetDilivery");
            Ext.getStore("DiliveryStore").getProxy().url = queryUrl;
            Ext.getStore("DiliveryStore").getProxy().extraParams = params;
            Ext.getStore("DiliveryStore").load();
        },
        peisong:function(thi, td, cellIndex, record, tr, rowIndex, e, eOpts){
            if(e.getTarget().id=='peisong'){
                //debugger;
                orderid=record.raw.id;
                var win12=Ext.create('ManagementSystem.view.DiliveryWin',{
                    listeners:{
                        show:function(){
                            var params={
                                userclass:5,
                                keyword:"",
                                RandomTag:Math.random()
                            };
                            var queryUrl = encodeURI("../api/ManagementSystem/GetDiliveryman");
                            Ext.getStore("DiliverymanStore").getProxy().url = queryUrl;
                            Ext.getStore("DiliverymanStore").getProxy().extraParams = params;
                            Ext.getStore("DiliverymanStore").load();
                        }
                    }
                });
                win12.show();
            }
            if(e.getTarget().id=="arriveBtn"){
                Ext.MessageBox.confirm("确定","确定该订单已送达客户手中？",function(btn){
                    if(btn=="yes"){
                        Ext.getCmp('mainViewPort').getEl().mask('请稍等...');
                        Ext.Ajax.request({
                            params:{
                                pOrder:record.raw.id,
                                randomTag:Math.random()
                            },
                            method:'post',
                            url:'../api/ManagementSystem/finishEvent',
                            success:function(response){
                                //debugger;
                                var result=Ext.JSON.decode(response.responseText);
                                if(result.err){
                                    Ext.getCmp('mainViewPort').getEl().unmask();
                                    Ext.Msg.alert('提示',result.err);
                                }else{
                                    Ext.getCmp('mainViewPort').getEl().unmask();
                                    Ext.Msg.alert('提示','操作成功');
                                    Ext.getStore('DiliveryStore').reload();
                                }
                            },
                            failure:function(response){
                                Ext.getCmp('mainViewPort').getEl().unmask();
                                Ext.Msg.alert('提示','请求超时或网络故障,错误编号：' + response.status)
                            }
                        });
                    }
                });
            }
        },
        fenpei:function(){
            //debugger;
            var diliveryman_id=Ext.getCmp('diliverywinId').down('#diliveryman').getValue();
            var params={
                diliveryman_id:diliveryman_id,
                orderid:orderid,
                RandomTag:Math.random()
            };
            Ext.getCmp('mainViewPort').getEl().mask('请稍等...');
            Ext.Ajax.request({
                params:params,
                method:'post',
                url:'../api/ManagementSystem/fenpeiorder',
                success:function(response){
                    //debugger;
                    var result=Ext.JSON.decode(response.responseText);
                    if(result.err){
                        Ext.getCmp('mainViewPort').getEl().unmask();
                        Ext.Msg.alert('提示',result.err);
                    }else{
                        Ext.getCmp('mainViewPort').getEl().unmask();
                        Ext.Msg.alert('提示','分配完成');
                        Ext.getCmp('diliverywinId').destroy();
                        Ext.getStore('DiliveryStore').reload();
                    }
                },
                failure:function(response){
                    Ext.getCmp('mainViewPort').getEl().unmask();
                    Ext.Msg.alert('提示','请求超时或网络故障,错误编号：' + response.status)
                }
            })
        }

    });
}).call(this);