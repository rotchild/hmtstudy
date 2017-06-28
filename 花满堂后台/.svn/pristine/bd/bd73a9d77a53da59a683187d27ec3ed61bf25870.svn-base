/**
 * Created by Administrator on 2016/9/14.
 * 加菜窗口
 */
Ext.define('ManagementSystem.controller.AddDishWinCtrl', {
    extend: 'Ext.app.Controller',
    views: [
        'addDishWin','addDishManualWin'
    ],
    stores: ["AllmenuStore"],
    init: function () {
        this.control({
            'addDishWin #menuGrid': {
                'cellclick': this.addDishGrid
            },
            "addDishWin #btnEnter":{
                "click":this.addDishEnter
            },
            "addDishWin #btnCancel":{
                "click":function(){Ext.getCmp("addDishWin").destroy();}
            },
            "addDishWin #btnSearch":{
                "click":this.addDishSearch
            },
            "addDishWin #btnReset":{
                "click":this.addDishReset
            },
            "addDishWin #btnManual":{
                "click":this.addDishManual
            },
            "addDishManualWin #btnEnter":{
                "click":this.manualDishEnter
            },
            "addDishManualWin #btnCancel":{
                "click":function(){Ext.getCmp('addDishManualWin').destroy();}
            }
        });
    },
    addDishGrid:function(thi, td, cellIndex, record, tr, rowIndex, e, eOpts){
        //debugger;
        //changetime: "2016-07-07 10:31:55"
        //code: null
        //codecount: null
        //completetime: 10
        //depart_fk: null
        //dish_fk: null
        //dishcount: 61
        //dishdescription: ""
        //dishdetail: ""
        //dishname: "鱼香肉丝"
        //dishtype: 1
        //dishurl: "20160707102933394S.png"
        //groundtime: ""
        //id: 18
        //iseat: null
        //isgrounding: 1
        //isout: null
        //isrecommend: 0
        //menudetailurl: ""
        //menuformat: ""
        //menutab: ""
        //notgroundtime: ""
        //outsprice: null
        //presentprice: 23
        //scoville: 0
        //sellcount: 39
        //standardprice: 25
        PublicObject.selectDish = record.raw;
        var record_id=parseInt(record.raw.id);
        if (e.getTarget().id == "addBtn") {
            td.children[0].children[1].value++;
        }if (e.getTarget().id == "delBtn") {
            td.children[0].children[1].value--;
            if(td.children[0].children[1].value <= 0){
                td.children[0].children[1].value=0;
                document.getElementById(record_id).parentNode.parentNode.removeChild(document.getElementById(record_id).parentNode);
            }
        }
            var inputV=td.children[0].children[1].value;
        var reg=/^\+?[0-9][0-9]*$/;
        if(!reg.test(inputV)){
            Ext.MessageBox.alert('提示',"请输入正确的数字");
            return;
        }
            if(inputV>0){
                Ext.getCmp("addDishWin").down('#addCart').expand();
                    if(document.getElementById(record_id)==null){
                        //debugger;
                        var Aul=document.createElement("ul");
                        Aul.setAttribute("class",'headUl');
                        Aul.innerHTML='<li id="'+record.raw.id+'" style="display:none;" class="dishId">'+record_id+'</li>'+
                        '<li class="dishname">'+record.raw.dishname+"</li>"+
                        "<li>"+record.raw.menuclassname+"</li>"+
                        '<li class="dishCount">'+inputV+'</li>'+
                        '<li class="dishprice">'+record.raw.presentprice+'</li>'+
                        '<li style="display: none;" class="dishurl">'+record.raw.dishurl+'</li>'+
                        '<li style="display: none;" class="depart">'+record.raw.depart_fk+'</li>'+
                        '<li><img src="/images/icons/close.png" onclick="removeDish(this);" class="dishurl"></li>';
                        document.getElementById("cartUl").appendChild(Aul);
                    }else{
                        document.getElementById(record_id).parentNode.childNodes[3].innerHTML=inputV;
                    }
            }

    },
    addDishEnter:function(){
        var headUl=getClassName('headUl',"ul");
        var dishIds=[];
        if(headUl.length>0){
            for(var i=0;i<headUl.length;i++){
                var liArr=headUl[i].childNodes;
                var dishId=liArr[0].innerText;
                var dishname=liArr[1].innerText;
                var dishcount=liArr[3].innerText;
                var dishprice=liArr[4].innerText;
                var dishurl=liArr[5].innerText;
                var depart_fk=liArr[6].innerText;
                var addObj={
                    "menuid":parseInt(dishId),
                    "menucount":parseInt(dishcount),
                    "dishname":dishname,
                    "presentprice":parseInt(dishprice),
                    "depart_fk":parseInt(depart_fk),
                    "dishurl":dishurl
                };
                dishIds.push(addObj);
            }
            //debugger;//selectTask.id为此菜单加菜
            Ext.MessageBox.confirm("确定","确定为:&nbsp;"+PublicObject.selectTask.pOrder+"&nbsp;加菜？",function(btn){
                if(btn=="yes"){
                    var params={
                        pOrder:PublicObject.selectTask.pOrder,
                        dishIds:JSON.stringify(dishIds),
                        tasktype:1,
                        taskstatus:1,
                        isprint:0,
                        paymethod:0,
                        openid:PublicObject.selectTask.openid,
                        tableid:PublicObject.selectTask.tableid,
                        realname:PublicObject.selectTask.realname,
                        mobile:PublicObject.selectTask.mobile,
                        peoplecount:PublicObject.selectTask.peoplecount,
                        randomTag:Math.random()
                    };
                    Ext.getCmp('mainViewPort').getEl().mask("正在操作，请稍候");//遮罩
                    Ext.Ajax.request({
                        url: '../api/ManagementSystem/addDishWinEvent',
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
                                Ext.getCmp("addDishWin").destroy();
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
    },
    addDishSearch:function(){
        Ext.getStore("AllmenuStore").removeAll();
        //var combotype=Ext.getCmp('addDishWin').down('#combotype').getValue();
        var comboClass=Ext.getCmp('addDishWin').down('#comboClass').getValue();
        var keyword=Ext.getCmp('addDishWin').down('#keyword').getValue();
        //if(combotype==0){
        //    combotype=[1];
        //}
        var params = {
            keyword: keyword,
            dishtype: 1,
            comboClass:comboClass,
            RandomTag: Math.random()
        };
        var queryUrl = encodeURI("../api/ManagementSystem/getAllMenu");
        Ext.getStore("AllmenuStore").getProxy().url = queryUrl;
        Ext.getStore("AllmenuStore").getProxy().extraParams = params;
        Ext.getStore("AllmenuStore").load();
    },
    addDishReset:function(){
        Ext.getCmp('addDishWin').down('#comboClass').setValue("");
        //Ext.getCmp('addDishWin').down('#combotype').setValue("");
        Ext.getCmp('addDishWin').down('#keyword').setValue("");
        Ext.getStore("AllmenuStore").removeAll();
        var comboClass=Ext.getCmp('addDishWin').down('#comboClass').getValue();
        //var combotype=Ext.getCmp('addDishWin').down('#combotype').getValue();
        var keyword=Ext.getCmp('addDishWin').down('#keyword').getValue();
        //if(combotype==0){
        //    combotype="1,2,3";
        //}
        var params = {
            keyword: keyword,
            dishtype:1,
            comboClass: comboClass,
            RandomTag: Math.random()
        };
        var queryUrl = encodeURI("../api/ManagementSystem/getAllMenu");
        Ext.getStore("AllmenuStore").getProxy().url = queryUrl;
        Ext.getStore("AllmenuStore").getProxy().extraParams = params;
        Ext.getStore("AllmenuStore").load();
    },
    addDishManual:function(){
        var win = Ext.create('ManagementSystem.view.addDishManualWin',{
            listeners:{
                render:function(){
                    Ext.getStore('DepartmentStore').load();
                }
            }
        });
        win.show();
    },
    manualDishEnter:function(){
        //自定义菜品放进购物车
        debugger;
        var dishid=-1,
            dishnameM=Ext.getCmp('addDishManualWin').down('#dishnameM').getValue(),
            priceM=Ext.getCmp('addDishManualWin').down('#priceM').getValue(),
            remarkM=Ext.getCmp('addDishManualWin').down('#remarkM').getValue(),
            dishcountM=Ext.getCmp('addDishManualWin').down('#dishcountM').getValue(),
            departmentM=Ext.getCmp('addDishManualWin').down('#departmentM').getValue();
        var regexP=/^[0-9]+([.]{1}[0-9]{1,2})?$/,
            regexC=/^[0-9]\d*$/;
        if (dishnameM == "") {
            Ext.MessageBox.alert("提示", "菜品名称不能为空!");
            return;
        }
        if (departmentM == "" || departmentM==null || departmentM==undefined) {
            Ext.MessageBox.alert("提示", "请选择出品部!");
            return;
        }
        if (!regexP.test(priceM)) {
            Ext.MessageBox.alert("提示", "请填写正确的价格！");
            return;
        }
        if (!regexC.test(dishcountM)) {
            Ext.MessageBox.alert("提示", "请填写正确的数量！");
            return;
        }
        if(remarkM.length>60){
            Ext.MessageBox.alert("亲，别输了，我都报红提示你了", "菜品描述太长了！");
            return;
        }
        Ext.getCmp("addDishWin").down('#addCart').expand();
        var Aul=document.createElement("ul");
        Aul.setAttribute("class",'headUl');
        Aul.innerHTML='<li id="'+dishid+'" style="display:none;" class="dishId">'+dishid+'</li>'+
        '<li class="dishname">'+dishnameM+"</li>"+
        "<li>"+"自定义菜品"+"</li>"+
        '<li class="dishCount">'+dishcountM+'</li>'+
        '<li class="dishprice">'+priceM+'</li>'+
        '<li style="display: none;" class="dishurl">'+remarkM+'</li>'+
        '<li style="display: none;" class="depart">'+departmentM+'</li>'+
        '<li><img src="/images/icons/close.png" onclick="removeDish(this);" class="dishurl"></li>';
        document.getElementById("cartUl").appendChild(Aul);
        Ext.getCmp('addDishManualWin').destroy();
    }
});