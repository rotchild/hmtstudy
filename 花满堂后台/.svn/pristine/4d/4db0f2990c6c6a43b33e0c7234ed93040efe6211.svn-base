/**
* Created by md313 on 14-4-23.
* 加载模型前检查schema是否有改变，有改变则进行update*更新)操作
**/
///<reference path='../../ts/jugglingdb/jugglingdb.d.ts'/>
var jugglingdb = require('jugglingdb');
var Schema = jugglingdb.Schema;

var settings = require('../../settings');
var schema = new jugglingdb.Schema('redis', settings.redis);

var Message = require('./message');
var Client = require('./client');
var Survey = require('./survey');

function reset() {
    setup(schema);
    schema.automigrate();
}

function setup(schema) {
    var message = Message(schema);
    var client = Client(schema);
    var survey = Survey(schema);

    client.hasMany(message, { as: 'message' });
    client.hasMany(survey, { as: "survey" });
}

function update(schema) {
    schema.autoupdate(function () {
        console.log("done survey");
    });
}

setup(schema);
schema.isActual(function (err, actual) {
    if (!actual) {
        update(schema);
    }
});

var models = schema.models;

models.updateDB = function () {
    setup(schema);
    update(schema);
};

models.resetDB = function () {
    setup(schema);
    schema.automigrate(function () {
        console.log("migrate done");
    });
};

models.getClient = function () {
    return schema.client;
};

module.exports = models;
//# sourceMappingURL=index.js.map
