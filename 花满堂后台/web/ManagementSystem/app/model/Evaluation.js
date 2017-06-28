(function () {
    Ext.define('ManagementSystem.model.Evaluation', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'openid', type: 'string'},
            {name: 'code', type: 'int'},
            {name: 'enclosure', type: 'string'},
            {name: 'photourl', type: 'string'},
            {name: 'createtime', type: 'string'},
            {name: 'taskid', type: 'int'},
            {name: 'menuid', type: 'int'},
            {name: 'detail', type: 'string'},
            {name: 'dishurl', type: 'string'},
            {name: 'menucount', type: 'int'},
            {name: 'dishname', type: 'string'},
            {name: 'presentprice', type: 'float'}
        ]
    });
}).call(this);