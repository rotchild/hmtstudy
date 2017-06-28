Ext.define('ManagementSystem.store.UserStore', {
    extend: 'Ext.data.Store',
    fields: [
        'id', 'username', 'password', 'mobile',
        'realname', 'rolestr',
        'userclass'
    ],
    pageSize: PublicObject.pageSize,
    proxy: {
        type: 'ajax',
        timeout: PublicObject.ajaxTimeout,
        reader: {
            //type: 'json', root: 'data', successProperty: 'success'

            type: 'json',
            root: 'data.topics',
            totalProperty: 'data.totalCount',
            successProperty: 'success'
        }
    }
});