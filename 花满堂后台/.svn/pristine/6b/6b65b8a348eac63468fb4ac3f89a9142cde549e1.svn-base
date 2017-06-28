/**
 * Created by Administrator on 2016/9/13.
 * 加菜窗口
 */
(function () {
    Ext.define('ManagementSystem.view.addDishWin', {
        extend: 'Ext.window.Window',
        xtype: 'addDishWin',
        id: 'addDishWin',
        layout: 'border',
        height: 690,
        width: 1000,
        modal: true,
        border: false,
        //style: 'background:#ffffff',
        items: [
            {
                xtype:'panel',
                region:'north',
                dockedItems:[
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        border: true,
                        height: 35,
                        style: '',
                        defaults: {style: 'margin:0 5px 0 5px;padding:0 5px 0 5px;'},
                        items: [
                            /**{
                                xtype: "combobox",
                                itemId: 'combotype',
                                id:'combotype',
                                mode:'local',
                                labelWidth:100,
                                width:230,
                                value:0,
                                displayField:'name',
                                name:'value',
                                hiddenName:'name',
                                fieldLabel : "按分类查询",
                                emptyText : '请选择',
                                //allowBlank : false,// 不允许为空
                                valueField : 'value',// 值,可选
                                editable : false,// 是否允许输入
                                //forceSelection : true,// 必须选择一个选项
                                //blankText : '请选择',// 该项如果没有选择，则提示错误信息,
                                triggerAction : 'all',// 显示所有下列数据，一定要设置属性triggerAction为all
                                store: Ext.create('Ext.data.Store', {
                                    fields: ['name', 'value'],
                                    data: [
                                        {'name': '全部', 'value': 0},
                                        {'name': '堂食', 'value': 1},
                                        {'name': '外卖', 'value': 2},
                                        {'name': '杂食', 'value': 3}
                                    ]
                                })
                            },**/
                            {
                                xtype: 'combobox',
                                fieldLabel: '按菜品查询',
                                itemId: 'comboClass',
                                mode: 'local',
                                triggerAction: 'all',
                                multiSelect: false,//允许多选
                                editable: false,
                                value: "全部",
                                displayField: 'menuclassname',
                                hiddenName:'id',
                                valueField: 'id',
                                disabled: false,
                                store: "MenuClassStore02",
                                forceSelection : true,// 必须选择一个选项
                                blankText : '请选择'// 该项如果没有选择，则提示错误信息
                            },
                            {
                                xtype: 'textfield', width: 180, itemId: 'keyword',fieldLabel:'关键词',labelWidth:60
                            },
                            {
                                xtype: 'button',
                                itemId: 'btnSearch',
                                style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                                text: '<span style="color: #ffffff;font-weight: bold">查询</span>',
                                width:60
                            }
                            , {
                                xtype: 'button',
                                itemId: 'btnReset',
                                text: '<span style="color: #ffffff;font-weight: bold">重置</span>',
                                style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                                width:60
                            }, {
                                xtype: 'button',
                                itemId: 'btnManual',
                                text: '<span style="color: #ffffff;font-weight: bold">添加自定义菜品</span>',
                                style: 'background-color: #384251;background-image: url();margin:0 5px 0 5px;',
                                width:100
                            }
                        ]
                    }
                ]
            },
            {
                xtype:'panel',
                region:'center',
                layout:'fit',
                items:[
                    {
                        xtype:'gridpanel',
                        border:false,
                        store:'AllmenuStore',
                        itemId:'menuGrid',
                        columns: [
                            {
                                xtype: "rownumberer", text: "序号", width: 40,
                                renderer: function (value, cellmeta, record, rowIndex, columnIndex, store) {
                                    return store.lastOptions.start + rowIndex + 1;
                                }
                            },
                            {
                                text: '菜品名称', flex: 1, dataIndex: 'dishname'
                            },
                            {
                                text: '菜品分类', flex: 1, dataIndex: 'dishtype',renderer:function(value){
                                var str="";
                                if(value==1){
                                    str="堂食";
                                }if(value==2){
                                    str="外卖";
                                }if(value==3){
                                    str="食杂";
                                }
                                return str;
                            }
                            },
                            {
                                text: '菜品类型', flex:.7, dataIndex: 'menuclassname'
                            },
                            {
                                text: '单价', flex:.5, dataIndex: 'presentprice'
                            },
                            {
                                text: '数量', flex:1.2,
                                renderer: function () {
                                    return '<a href="###"><img src="../images/icons/del.png" id="delBtn"></a>'+
                                            '<input type="text" style="margin-left: 5px;width:50px;text-align: center;" value="0" class="inputV" disabled>'+
                                        '<a href="###" style="margin-left: 5px;"><img src="../images/icons/add.png" id="addBtn"></a>';
                                }
                            }
                        ]
                    }
                ]
            },
            {
                xtype:'panel',
                title:'<b>购物车</b>',
                itemId:'addCart',
                region:'east',
                width:510,
                collapsible:true,
                collapsed:true,
                split:true,
                layout:'border',
                items:[
                    {
                        xtype:'panel',
                        region:'center',
                        layout:'fit',
                        autoScroll:true,
                        html:'<ul id="cartUl">' +
                            '<li><span class="headSpan" style="display:none;">序号</span>' +
                        '<span class="headSpan">菜品名称</span>' +
                        '<span class="headSpan">分类</span>' +
                        '<span class="headSpan">数量</span>' +
                        '<span class="headSpan">单价</span>' +
                        '<span class="headSpan">删除</span></li>'+
                        '</ul>'
                    }
                ]
            }
        ],
        buttons: [
            '->',
            {text: '确定', itemId: 'btnEnter'},
            {text: '取消', itemId: 'btnCancel'},
            '->'
        ]
    });
}).call(this);