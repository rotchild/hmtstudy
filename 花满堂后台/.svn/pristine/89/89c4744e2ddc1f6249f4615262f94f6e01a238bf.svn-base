//jslint vars: true, white: true, nomen: true, node: true, indent: 2
//jshint laxcomma: true, laxbreak: true, white: false, node: true
"use strict";
// 'logger' module manages the system wide logging destination.
///<reference path='../../ts/winston/winston.d.ts'/>
var winston = require("winston");
module.exports = function (tag) {
    var logger;
    logger = new winston.Logger({
        transports: [
            new winston.transports.Console({
                level: "verbose",
                timestamp: true
            }),
            new winston.transports.File({
                filename: "./logs/analysis.log",
                timestamp: "true",
                maxsize: 10485760,
                maxFiles: 10
            })
        ],
        exitOnError: false
    });
    /*
     Define __stack property to return the current call stack.
     refer to http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
     */
    logger.__stack = function () {
        var err, saved, stack;
        saved = Error.prepareStackTrace;
        // return original structured stack without any formatting
        Error.prepareStackTrace = function (error, stack) { return stack; };
        err = new Error();
        // capture stack up to logger.log, discarding any later calls on the stack
        Error.captureStackTrace(err, logger.log);
        stack = err.stack;
        Error.prepareStackTrace = saved;
        return stack;
    };
    /*
     Define __line property to return current line number
     */
    logger.__line = function () {
        return this.__stack()[1].getLineNumber();
    };
    logger.stack = function () {
        var err;
        err = new Error();
        Error.captureStackTrace(err, logger.stack);
        console.log(err.stack);
    };
    logger.log = function (level, msg, meta, callback) {
        // convert to string if meta is of type Error
        return winston.Logger.prototype.log.call(this, level, "[" + tag + ":" + this.__line() + "] " + msg, (meta instanceof Error ? meta + " " : meta), callback);
    };
    return logger;
};
//# sourceMappingURL=logger.js.map