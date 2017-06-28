/**
 * Created by Administrator on 2016/9/21.
 * 选择服务项目
 */
(function () {
    Ext.define('ManagementSystem.view.SelectServiceWin', {
        extend: 'Ext.window.Window',
        xtype: 'SelectServiceWin',
        id: 'SelectServiceWin',
        layout: 'border',
        height: 260,
        width: 500,
        modal: true,
        border: false,
        title: '添加服务',
        buttons: [
            '->',
            {text: '确定', itemId: 'btnEnter',
            listeners:{
                click:function(){
                    var pOrder=PublicObject.selectTask.pOrder,
                        tableid=PublicObject.selectTask.tableid,
                        peoplecount=PublicObject.selectTask.peoplecount,
                        count=Ext.getCmp('SelectServiceWin').down('#peoplecount').getValue(),
                        selectModel=Ext.getCmp('SelectServiceWin').down('#serviceGrid').getSelectionModel().getSelection();
                    var regex=/^[1-9]+[0-9]*$/;
                    if(!regex.test(count)){
                        Ext.MessageBox.alert('提示',"请输入正确的人数");
                        return;
                    }
                    //id: 3
                    //isdefault: 1
                    //price: 2
                    //rule: 1
                    //servicename: "餐位费"
                    //type: 1
                    var Arr=[];
                    for(var i=0;i<selectModel.length;i++){
                        var obj={};
                        obj.id=selectModel[i].data.id;
                        obj.price=selectModel[i].data.price;
                        obj.servicename=selectModel[i].data.servicename;
                        obj.count=count;
                        Arr.push(obj);
                    }
                    var params={
                        pOrder:pOrder,
                        tableid:tableid,
                        peoplecount:peoplecount,
                        serviceids:JSON.stringify(Arr),
                        randomTag:Math.random()
                    };
                    Ext.getCmp('mainViewPort').getEl().mask("正在操作，请稍候");//遮罩
                    Ext.Ajax.request({
                        url: '../api/ManagementSystem/selectServiceWinEvent',
                        params:params,
                        method: 'Post',
                        success: function (response, options) {
                            //debugger;
                            Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                            var result = Ext.JSON.decode(response.responseText);
                            if (result.err) {
                                Ext.MessageBox.alert('提示', result.err.message);
                            } else {
                                Ext.getStore('TaskStore').reload();
                                Ext.MessageBox.alert('成功', "操作成功");
                                Ext.getCmp("SelectServiceWin").destroy();
                            }
                        },
                        failure: function (response, options) {
                            Ext.getCmp('mainViewPort').getEl().unmask();//遮罩
                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                        }
                    });
                }
            }
            },
            {text: '取消', itemId: 'btnCancel',
            listeners:{
                click:function(){
                    Ext.getCmp('SelectServiceWin').destroy();
                }
            }},
            '->'
        ]
    });
}).call(this);