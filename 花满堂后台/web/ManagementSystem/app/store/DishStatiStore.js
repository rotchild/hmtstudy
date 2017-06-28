/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-9-20
 * Time: 上午10:17
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ManagementSystem.store.DishStatiStore',{
    extend:'Ext.data.Store',
    fields:['id','openid', 'code','enclosure','photourl','createtime','taskid','menuid','detail','dishurl', 'menucount', 'dishname' ,'presentprice','menu_id','menu_dishname',
        'menu_code','menu_iseat','menu_isout','menu_isrecommend', 'menu_dishdetail', 'menu_dishurl', 'menu_sellcount','menu_dishtype', 'menu_isgrounding', 'menu_standardprice',
        'menu_presentprice','menu_outsprice','menu_changetime','menu_groundtime','menu_notgroundtime','menu_codecount','menu_tab','menu_completetime','menu_dishdescription',
        'menu_dishcount','menu_menudetailurl','menu_menuformat','dish_fk','depart_fk','scoville','menuclassname' ],
    proxy: {
        type: 'ajax',
        timeout: PublicObject.ajaxTimeout,
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
})