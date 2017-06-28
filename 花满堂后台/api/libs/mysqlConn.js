//mysqlConn.js
var mysql=require('mysql');
var config = require('../../settings');
var pool = mysql.createPool(config.mysql);

//防注入查询
exports.safeQueryData = function(sqlcmd,params,callback)
{
    pool.getConnection(function(err, connection){
        if (err) {
            console.log('getConnection Error: ' + err.message);
            callback(err,null);
        } else {
        connection.query(sqlcmd,params,
            function selectDB(error, results, fields) {
                if(error)
                    connection.emit('error');
                callback(error,results);
            }
        );}
        connection.end();
    })
};