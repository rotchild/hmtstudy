/**
 * Created by Administrator on 2016/10/24.
 */
Ext.define('ManagementSystem.store.MenuClassStore', {
    extend: 'Ext.data.Store',
    fields: ['id', 'menuclassname', 'createtime', 'ishide', 'menuclasstype', 'menuclasssort'],
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