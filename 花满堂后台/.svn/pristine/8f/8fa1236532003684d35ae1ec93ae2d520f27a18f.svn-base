/**
 * Created by Administrator on 2014/4/23.
 */
///<reference path='../ts/jugglingdb/jugglingdb.d.ts'/>
var jugglingdb = require('jugglingdb');
var settings = require('../settings');
var schema = new jugglingdb.Schema('mysql', settings.mysql);
//var employee = require('./employee');
//var job = require('./job');
//var joblog = require('./joblog');
var publicUser = require('./publicUser');

//employee(schema);
//job(schema);
//joblog(schema);
publicUser(schema);

var models = schema.models;
models.updateDB = function () {
    schema.autoupdate(function () {
        schema.disconnect();
        console.log('done');
    });
};

models.resetDB = function () {
    schema.automigrate(function () {
        console.log("migrate done");
    });
};

models.getClient = function () {
    return schema.client;
};

module.exports = models;
//# sourceMappingURL=index.js.map
