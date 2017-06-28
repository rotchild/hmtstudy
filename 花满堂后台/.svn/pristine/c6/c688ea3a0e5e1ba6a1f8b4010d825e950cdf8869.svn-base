/**
 * Created by lg on 14-7-22.
 */
var jugglingdb = require('jugglingdb');
var Schema = jugglingdb.Schema;
var settings = require('../../settings');
var schema = new jugglingdb.Schema('mysql', settings.mysql);
var Address = require('./address');
var Evaluation = require('./evaluation');
var Menu = require('./menu');
var Tables = require('./tables');
var Task = require('./task');
var Tasklog = require('./tasklog');
var Tradeorder = require('./tradeorder');
var User = require('./user');
var Vippoints = require('./vippoints');
var PublicUser = require('../publicUser');
var Menuclass = require('./menuclass');
var Menukey = require('./menukey');

var Settings = require('./settings');

function reset() {
    setup(schema);
    schema.automigrate(function (err, result) {

    });
}

function setup(schema) {
    var address = Address(schema);
    var evaluation = Evaluation(schema);
//    var products=Products(schema);
    var menu = Menu(schema);
    var tables = Tables(schema);
    var task = Task(schema);
    var tasklog = Tasklog(schema);
    var tradeorder = Tradeorder(schema);
    var user = User(schema);
    var vippoints = Vippoints(schema);
    var publicUser = PublicUser(schema);
    var menuclass = Menuclass(schema);
    var menukey = Menukey(schema);
    var settings = Settings(schema);

}

function update(schema) {
    schema.autoupdate();
}

setup(schema);

var models = schema.models;

models.resetDB = function () {
    reset();
}

models.updateDB = function () {
    update(schema);
}

models.getClient = function () {
    return schema.client;
};

module.exports = models;