Ext.define('ManagementSystem.store.EvaluationMenuStore', {
    extend: 'Ext.data.Store',
//    fields: [
//        ],
    model: 'ManagementSystem.model.EvaluationMenu',
    autoLoad: false,
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});