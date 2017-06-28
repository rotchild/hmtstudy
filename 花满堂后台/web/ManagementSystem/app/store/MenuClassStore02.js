Ext.define('ManagementSystem.store.MenuClassStore02', {
    extend: 'Ext.data.Store',
    fields: ['id', 'menuclassname', 'createtime', 'ishide', 'menuclasstype'],
    pageSize: PublicObject.pageSize,
    proxy: {
        type: 'ajax',
        timeout: PublicObject.ajaxTimeout,
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'

            //type: 'json',
            //root: 'data.topics',
            //totalProperty: 'data.totalCount',
            //successProperty: 'success'
        }
    }
});