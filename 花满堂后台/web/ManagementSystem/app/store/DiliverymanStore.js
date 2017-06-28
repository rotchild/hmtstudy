/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-9-13
 * Time: 下午12:00
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ManagementSystem.store.DiliverymanStore', {
    extend: 'Ext.data.Store',
    fields: [
        'id', 'username', 'password', 'mobile',
        'realname', 'rolestr',
        'userclass'
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