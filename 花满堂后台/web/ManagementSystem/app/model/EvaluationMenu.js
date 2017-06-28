(function () {
    Ext.define('ManagementSystem.model.EvaluationMenu', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'dishname', type: 'string'},
            {name: 'standardprice', type: 'float'},
            {name: 'presentprice', type: 'float'},
            {name: 'outsprice', type: 'float'},
            {name: 'code', type: 'float'},
            {name: 'dishcount', type: 'int'},
            {name: 'isgrounding', type: 'int'},
            {name: 'iseat', type: 'int'},
            {name: 'isout', type: 'int'},
            {name: 'isrecommend', type: 'int'},
            {name: 'dishdetail', type: 'string'},
            {name: 'dishurl', type: 'string'},
            {name: 'sellcount', type: 'int'},
            {name: 'dishtype', type: 'int'},
            {name: 'changetime', type: 'string'},
            {name: 'groundtime', type: 'string'},
            {name: 'notgroundtime', type: 'string'},
            {name: 'menutab', type: 'string'},
            {name: 'completetime', type: 'string'},
            {name: 'dishdescription', type: 'string'},
            {name: 'menuformat', type: 'string'},
            {name: 'menudetailurl', type: 'string'},
            
            {name: 'SalesCount', type: 'int'},
            {name: 'SalesAmount', type: 'float'},
            {name: 'MenuSalesAmount', type: 'float'},
            {name: 'MenuSalesAmountRate', type: 'float'},
            {name: 'TotalAmount', type: 'float'},
            {name: 'TotalAmountRate', type: 'float'}
        ]
    });
}).call(this);