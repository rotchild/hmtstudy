Ext.define('ManagementSystem.store.TaskStore', {
    extend: 'Ext.data.Store',
    fields: [
        'id', 'uopenid', 'realname', 'address', 'mobile',
        'ordertime', 'diningtime', 'ordertabletime', 'sumoney', 'taskstatus', 'tasktype',
        'dishids', 'peoplecount', 'isprint', 'sex', 'paymethod', 'out_trade_no','tableid','pOrder','reservationid'
    ],
    pageSize: PublicObject.pageSize,
    groupField: 'pOrder',
    sorters: {property: 'pOrder', direction: 'DESC'},
    proxy: {
        type: 'ajax',
        timeout: PublicObject.ajaxTimeout,
        reader: {
            type: 'json',
            root: 'data.topics',
            totalProperty: 'data.totalCount',
            successProperty: 'success'
        }
    }
});