/**
* Created by zhou on 2014/5/4.
* tasklog.ts 依据数据库文档定义任务表,每个任务对应一条任务记录
*/
function tasklog(schema) {
    schema.define('tasklog', {
        task_id: { type: Number, dataType: 'int' },
        tasktype: { type: String, length: 20 },
//        taskstatus: {type: Number, length: 11},//任务状态
        frontoperator: { type: String, length: 200 },
//        frontstate: { type: Number, dataType: 'smallInt' },
        backoperator: { type: String, length: 200 },
//        backstate: { type: Number, dataType: 'smallInt' },
        stateupdatetime: { type: Number, dataType: 'bigint' },
        logtime: { type: Number, dataType: 'bigint' }
    });
}

module.exports = tasklog;
//# sourceMappingURL=tasklog.js.map
