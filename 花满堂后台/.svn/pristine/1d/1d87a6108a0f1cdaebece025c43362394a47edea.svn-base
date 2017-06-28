/**
 * Created by Administrator on 2016/9/13.
 */
Ext.define('ManagementSystem.store.DepartmentStore', {
    extend: 'Ext.data.Store',
    fields: [
        'id', 'departmentName', 'ipAddress'
    ],
    proxy: {
        type: 'ajax',
        api:{
            read:'../api/ManagementSystem/getAllDepartment'
        },
        timeout: PublicObject.ajaxTimeout,
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});