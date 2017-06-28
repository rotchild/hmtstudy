/**
 * Created by Administrator on 2016/9/13.
 * 所有菜谱
 */
Ext.define('ManagementSystem.store.AllmenuStore', {
    extend: 'Ext.data.Store',
    fields: [
        'id', 'dishname', 'standardprice', 'presentprice', 'outsprice', 'code',
        'dishcount', 'isgrounding', 'iseat', 'isout', 'isrecommend', 'dishdetail', 'dishurl',
        'sellcount', 'dishtype', 'changetime', 'groundtime', 'notgroundtime', 'menutab', 'completetime',
        'dishdescription', 'menusequence', 'menuformat', 'menudetailurl','menuclassname','dish_fk','depart_fk','scoville'
    ],
    proxy: {
        type: 'ajax',
        timeout: PublicObject.ajaxTimeout,
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});