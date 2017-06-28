Ext.define('ManagementSystem.store.EvaluationStore', {
    extend: 'Ext.data.Store',
    model: 'ManagementSystem.model.Evaluation',
    autoLoad: false,
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