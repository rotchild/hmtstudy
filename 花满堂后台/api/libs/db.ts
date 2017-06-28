/**
 * db.ts
 */
///<reference path='../../ts/mysql/mysql.d.ts'/>

import mysql = require ('mysql');
import setting= require('../../settings');
var pool = mysql.createPool(setting.mysql);
export function query(queryStr,params:string[],cb) {
    pool.query(queryStr,params,cb);
}


