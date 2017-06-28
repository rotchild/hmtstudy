/**
 * Created by Administrator on 2016/10/19.
 */
Ext.define('ManagementSystem.store.tableStore', {
    extend: 'Ext.data.Store',
    fields: [
        'id', 'tableName'
    ],
    proxy: {
        type: 'ajax',
        url:'../api/ManagementSystem/getAllTable',
        timeout: PublicObject.ajaxTimeout,
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});