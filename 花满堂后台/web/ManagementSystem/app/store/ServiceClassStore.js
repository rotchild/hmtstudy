/**
 * Created by Administrator on 2016/9/19.
 */
Ext.define('serviceModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',       type: 'int'},
        {name: 'servicename', type: 'string'},
        {name: 'price',  type: 'float'},
        {name: 'type',  type: 'int'},
        {name: 'rule',  type: 'int'},
        {name: 'isdefault',  type: 'int'}
    ]
});

Ext.define('ManagementSystem.store.ServiceClassStore', {
    extend: 'Ext.data.Store',
    model:'serviceModel',
    autoLoad:false,
    //fields: [
    //    'id', 'servicename','price','type','rule','isdefault'
    //],
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