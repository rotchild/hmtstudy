/**
 * Created with JetBrains WebStorm.
 * User: Administrator
 * Date: 16-9-13
 * Time: 下午3:39
 * To change this template use File | Settings | File Templates.
 */
Ext.define('ManagementSystem.store.DiliveryStore', {
    extend: 'Ext.data.Store',
    fields: ['id','ordertime','realname','mobile','address','sumoney','tasktype','taskstatus','dili_realname','dili_id','dili_nobile','diningtime'],
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