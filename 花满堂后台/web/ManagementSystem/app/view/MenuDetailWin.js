Ext.define('ManagementSystem.view.MenuDetailWin', {
    extend: 'Ext.Window',
    xtype: 'menuDetailWin',
    id: 'menuDetailWinId',
    modal: true,
    width: 640,
    height: 530,
    plain: false,
    layout: 'border',
    //初始化表单面板
    items: [
        {
            region: 'west',
            layout: 'border',
            width: 340,
            //bodyStyle: 'background:#dfe8f6',
            bodyPadding: '2',
            itemId: 'menuDetail',
            items: [
                {
                    xtype: 'form',
                    layout: 'form',
                    region: 'center',
                    //bodyStyle: 'background:#dfe8f6',
                    bodyPadding: '5 5 0 5',
                    border: false,
                    items: [
                        {
                            xtype: 'textfield',
                            fieldLabel: '菜品名称<span style="color:red;">*</span>',
                            labelWidth: 60,
                            itemId: 'dishname',
                            allowBlank: false,
                            selectOnFocus: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '原价<span style="color:red;">*</span>',
                            labelWidth: 60,
                            itemId: 'standardprice',
                            //regex: /^[0-9]\d*$/,//正整数
                            regex: /^[0-9]+(\.[0-9]{0,2})?$/,//小数点
                            allowBlank: false,
                            selectOnFocus: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '折扣价<span style="color:red;">*</span>',
                            labelWidth: 60,
                            itemId: 'presentprice',
                            //regex: /^[0-9]\d*$/,//正整数
                            regex: /^[0-9]+(\.[0-9]{0,2})?$/,//小数点
                            //allowBlank: false,
                            selectOnFocus: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '上架数量<span style="color:red;">*</span>',
                            labelWidth: 60,
                            itemId: 'dishcount',
                            regex: /^[0-9]\d*$/,
                            allowBlank: false,
                            selectOnFocus: true
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '优先级(数字越大排名越靠前)',
                            labelWidth: 100,
                            itemId: 'menusequence',
                            regex: /^[0-9]\d*$/,
                            allowBlank: false,
                            selectOnFocus: true
                        },
                        {
                            fieldLabel: '是否上架<span style="color:red;">*</span>',
                            labelWidth: 60,
                            itemId: 'isgrounding',
                            xtype: 'combobox',
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name', 'value'],
                                data: [
                                    {'name': '上架', 'value': 1},
                                    {'name': '下架', 'value': 0}
                                ]
                            }),
                            value: 1,
                            queryMode: 'local',
                            valueField: 'value',
                            displayField: 'name',
                            editable: false,//设为不可输入
                            enableKeyEvent: false
                        },
                        {
                            xtype: "checkboxgroup",
                            itemId: 'menutab',
                            fieldLabel: "菜品标签",
                            columns: 3,
                            items: [
                                {boxLabel: "推荐", name: "A", id: 'menutab01'},
                                {boxLabel: "新品", name: "B", id: 'menutab02'},
                                {boxLabel: "限量", name: "C", id: 'menutab03'},
                                {boxLabel: "热卖", name: "D", id: 'menutab04'},
                                {boxLabel: "特价", name: "E", id: 'menutab05'}
                            ]
                        },
                        {
                            xtype: "checkboxgroup",
                            itemId: 'isrecommend',
                            fieldLabel: "厨师推荐",
                            columns: 1,
                            items: [
                                {boxLabel: "厨师推荐（移动端页面显示）", name: "1", id: 'isrecommend01'}
                                //,
                                //{boxLabel: "新品", name: "B", id: 'menutab02'},
                                //{boxLabel: "限量", name: "C", id: 'menutab03'},
                                //{boxLabel: "热卖", name: "D", id: 'menutab04'},
                                //{boxLabel: "特价", name: "E", id: 'menutab05'}
                            ]
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '出品部<span style="color:red;">*</span>',
                            itemId: 'departmentName',
                            store: "DepartmentStore",
                            mode: 'local',
                            triggerAction: 'all',
                            multiSelect: false,//允许多选
                            editable: false,
                            value: '',
                            displayField: 'departmentName',
                            hiddenName:'departmentName',
                            disabled: false,
                            forceSelection : true,// 必须选择一个选项
                            blankText : '请选择',// 该项如果没有选择，则提示错误信息,
                            valueField: 'id'
                        },
                        {
                            xtype: 'combobox',
                            fieldLabel: '辣味程度',
                            itemId: 'scoville',
                            mode: 'local',
                            triggerAction: 'all',
                            multiSelect: false,//允许多选
                            editable: false,
                            value: 0,
                            displayField: 'name',
                            hiddenName:'value',
                            valueField: 'value',
                            disabled: false,
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name', 'value'],
                                data: [
                                    {'name': '无辣', 'value': 0},
                                    {'name': '微辣', 'value': 1},
                                    {'name': '中辣', 'value': 2},
                                    {'name': '变态辣', 'value': 3}
                                ]
                            }),
                            forceSelection : true,// 必须选择一个选项
                            blankText : '请选择'// 该项如果没有选择，则提示错误信息,
                        },
                        {
                            xtype: 'textareafield',
                            fieldLabel: '菜品介绍',
                            labelWidth: 60,
                            itemId: 'dishdescription',
                            height: 100,
                            width: 400
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: '详情外链',
                            labelWidth: 60,
                            itemId: 'menudetailurl'
                        }
                    ]
                }
            ]
        },
        //{
        //    region:'north',
        //    width:640,
        //    height:530,
        //    itemId:'northShow',
        //    hidden:true,
        //    html: '<div class="northPic" style="position:relative;">' +
        //            '<img id="Picmax">' +
        //            '</div>'
        //},
        {
            region: 'center',
            //bodyStyle: 'background:#dfe8f6',
            //bodyPadding: '0',
            html: '<div class="picDiv">' +
            '<img id="MenuDetail_DishUrl" src="" style="width: 284px;height:200px;" alt="请上传图片"/>' +
            //'<input type="button" value="上传图片" onclick="UploadImageMenu()"/>'+
            '<ul id="picUL">' +
                '<li><img src="../../../images/add.png" class="addImg" id="img_1" onclick="UploadImageMenu(1)"/></li>'+
                '<li><img src="../../../images/add.png" class="addImg" id="img_2" onclick="UploadImageMenu(2)"/></li>'+
                '<li><img src="../../../images/add.png" class="addImg" id="img_3" onclick="UploadImageMenu(3)"/></li>'+
                '<li><img src="../../../images/add.png" class="addImg" id="img_4" onclick="UploadImageMenu(4)"/></li>'+
                '<li><img src="../../../images/add.png" class="addImg" id="img_5" onclick="UploadImageMenu(5)"/></li>'+
            '</ul>'+
                //'<ul><li><img src="../../../images/add.png" class="addImg" id="img_1" onclick="UploadImageMenu(1)"/></li></ul>'+
            '</div>'
        }
    ],
    buttons: [
        '->',
        {text: '添加', itemId: 'btnAdd'},
        {text: '修改', itemId: 'btnEdit'},
        {text: '取消', itemId: 'btnCancel'},
        '->'
    ]
});
