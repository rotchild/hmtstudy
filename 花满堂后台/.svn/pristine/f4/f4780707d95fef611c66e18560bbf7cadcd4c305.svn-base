Ext.define('ManagementSystem.store.MenuStore', {
    extend: 'Ext.data.Store',
    fields: [
        'id', 'dishname', 'standardprice', 'presentprice', 'outsprice', 'code',
        'dishcount', 'isgrounding', 'iseat', 'isout', 'isrecommend', 'dishdetail', 'dishurl',
        'sellcount', 'dishtype', 'changetime', 'groundtime', 'notgroundtime', 'menutab', 'completetime',
        'dishdescription', 'menusequence', 'menuformat', 'menudetailurl','menuclassname','dish_fk','depart_fk','scoville'
    ],
    pageSize: PublicObject.pageSize,
    proxy: {
        type: 'ajax',
        timeout: PublicObject.ajaxTimeout,
        reader: {
            //type: 'json',
            //root: 'data',
            //successProperty: 'success'

            type: 'json',
            root: 'data.topics',
            totalProperty: 'data.totalCount',
            successProperty: 'success'
        }
    }
});