/**
 * Created by Administrator on 2016/9/26.
 * 重复打印确认窗口
 */
(function () {
    Ext.define('ManagementSystem.view.RepeatPrintWin', {
        extend: 'Ext.window.Window',
        xtype: 'repeatPrintWin',
        id: 'repeatPrintWin',
        layout: 'border',
        height: 460,
        width: 600,
        modal: true,
        border: false,
        title: '再次打印',
        items: [

        ],
        buttons: [
            '->',
            {text: '确定', itemId: 'btnEnter',
            listeners:{
                click:function(){
                    //var optionsP='{"taskid":"' + record.id + '","ordertime":"' + record.ordertime + '","realname":"' + record.realname +'","paymethod":"'+paymethod+ '","isprint":"'+isprint+
                    //    '","mobile":"' + record.mobile + '","address":"' + record.address + '","sendtime":"' + record.ordertime +'","ordertabletime":"'+record.ordertabletime+
                    //    '","totel":"' + record.sumoney +'","tableid":"'+record.tableid+'","diningtime":"'+record.diningtime+'","peoplecount":"'+record.peoplecount+
                    //    '","dishids":' + JSON.stringify(dest) + '}';
                    var paramsrecord = {
                        id:PublicObject.selectTask.id,
                        tasktype:PublicObject.selectTask.tasktype,
                        ordertime:PublicObject.selectTask.ordertime,
                        diningtime:PublicObject.selectTask.diningtime,
                        realname:PublicObject.selectTask.realname,
                        mobile:PublicObject.selectTask.mobile,
                        tableid:PublicObject.selectTask.tableid,
                        paymethod:PublicObject.selectTask.paymethod,
                        peoplecount:PublicObject.selectTask.peoplecount,
                        address:PublicObject.selectTask.address,
                        ordertabletime:PublicObject.selectTask.ordertabletime,
                        dishids:[],
                        serviceList:[],
                        allBills:false,
                        handBill:false
                    };
                    var tableid=Ext.getCmp('repeatPrintWin').down('#tableid').getRawValue();
                    if(tableid==="" || tableid===null || tableid===undefined){
                        Ext.MessageBox.alert('提示',"请选择桌位号");
                        return;
                    }else{
                        paramsrecord.tableid=tableid;
                    }
                    if(Ext.getCmp("repeatPrintWin").down("#pwd").getValue() !== PublicObject.pwd){
                        Ext.MessageBox.alert('提示',"密码错误");
                        return;
                    }
                    if(Ext.getCmp('repeatPrintWin').down('#allBills').checked==true){
                        paramsrecord.allBills=true;
                    }
                    if(Ext.getCmp('repeatPrintWin').down('#handBill').checked==true){
                        paramsrecord.handBill=true;
                    }
                    var selectDepart = Ext.getCmp('repeatPrintWin').down("#dishList").getSelectionModel().getSelection();
                    //var selectService = Ext.getCmp('repeatPrintWin').down("#serviceList").getSelectionModel().getSelection();
                    if( selectDepart.length<1 && Ext.getCmp('repeatPrintWin').down('#allBills').checked==false && Ext.getCmp('repeatPrintWin').down('#handBill').checked==false){
                        Ext.MessageBox.alert('提示',"请选择要打印的内容!");
                        return;
                    }
                    //if(selectService.length>0){
                    //    for(var s= 0,loop=selectService.length;s<loop;s++){
                    //        var ser=selectService[s].raw;
                    //        paramsrecord.serviceList.push(ser);
                    //    }
                    //}
                    paramsrecord.serviceList=JSON.stringify(paramsrecord.serviceList);
                    if(selectDepart.length>0){
                        for(var i= 0,len=selectDepart.length;i<len;i++){
                            var rec=selectDepart[i].raw;
                            paramsrecord.dishids.push(rec);
                        }
                    }
                    paramsrecord.dishids=JSON.stringify(paramsrecord.dishids);
                    Ext.getCmp('mainViewPort').getEl().mask("正在打印，请稍候");
                    Ext.Ajax.request({
                        url: '../api/ManagementSystem/orderPrintDepart',
                        params: {
                            record: JSON.stringify(paramsrecord),
                            isprint: 2,
                            RandomTag: Math.random()
                        },
                        method: 'POST',
                        success: function (response, options) {
                            Ext.getCmp('mainViewPort').getEl().unmask();
                            //debugger;
                            var result = Ext.JSON.decode(response.responseText);
                            if (result.err) {
                                Ext.MessageBox.alert('提示', result.err.message);
                            } else {
                                var data = result.data;
                                Ext.getStore("TaskStore").reload();
                                Ext.getCmp('repeatPrintWin').destroy();
                                if(Ext.getCmp("taskDetailWinId")){
                                    Ext.getCmp('taskDetailWinId').destroy();
                                }
                                Ext.MessageBox.alert('提示', '打印成功');
                            }
                        },
                        failure: function (response, options) {
                            Ext.getCmp('mainViewPort').getEl().unmask();
                            debugger;
                            Ext.MessageBox.alert('失败', '请求超时或网络故障,错误编号：' + response.status);
                        }
                    });
                }
            }
            },
            {text: '取消', itemId: 'btnCancel',
                listeners:{
                    click:function(){
                        Ext.getCmp('repeatPrintWin').destroy();
                    }
                }},
            '->'
        ]
    });
}).call(this);
