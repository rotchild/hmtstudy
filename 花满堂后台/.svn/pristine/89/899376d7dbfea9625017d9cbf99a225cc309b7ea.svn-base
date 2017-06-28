/**
* Created by zhou on 2014/6/27
* businessWork.ts
*/
///<reference path='../../ts/node/node.d.ts'/>
///<reference path='../../ts/archiver/archiver.d.ts'/>
///<reference path='../../ts/express/express.d.ts' />
///<reference path='../../ts/request/request.d.ts'/>
///<reference path='../../ts/underscore/underscore.d.ts'/>
///<reference path='../../ts/mkdirp/mkdirp.d.ts'/>
var archiver = require('archiver');
var EventProxy = require('eventproxy');

var errors = require('../libs/errors');

var fs = require('fs');
var path = require('path');
var request = require('request');
var mkdirp = require("mkdirp");

/**
* @module businessWork
* @author hustfyb
* @description 封装与业务流程无关但需要的常用方法
*/
function init() {
}
exports.init = init;

/**
* packageFile 文件打包方法
* @param imagenames
* @param p_filename 原有文件名数组array,其中每个对象是string类型
* @param prefix 打包后生成文件名前缀
* @param format 打包生成文件格式 zip文件格式
* @param callback 回调函数(err,result)
*/
function packageFile(imagenames, p_filename, prefix, format, callback) {
    var ep = new EventProxy();
    var archive = archiver('zip');
    var output = fs.createWriteStream(prefix + p_filename + format);
    archive.pipe(output);
    imagenames.forEach(function (filename) {
        archive.append(fs.createReadStream(prefix + filename), { name: p_filename + "/" + filename });
    });
    archive.finalize();
    output.on('close', function () {
        ep.emit('zipDone');
    });
    archive.on('error', function (error) {
        ep.emit('error', errors.ArchiiveError);
    });
    ep.once('zipDone', function () {
        var fullpath = prefix + p_filename + format;
        var part = fullpath.replace(path.dirname(fullpath), '/surveyImages/' + p_filename);
        callback(null, part);
    });
    ep.fail(function (error) {
        callback(error, false);
    });
}
exports.packageFile = packageFile;

function createDirSync(filepath) {
    var dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
        mkdirp.sync(dir);
    }
}
exports.createDirSync = createDirSync;

function getAllFiles(root) {
    var res = [];
    var files = fs.readdirSync(root);
    files.forEach(function (file) {
        var pathname = root + '/' + file;
        var stat = fs.lstatSync(pathname);
        if (!stat.isDirectory()) {
            res.push(pathname.replace(root + '/', ''));
        } else {
            res = res.concat(exports.getAllFiles(pathname));
        }
    });
    return res;
}
exports.getAllFiles = getAllFiles;

/**
* downloadFile 下载文件并将文件写入指定文件夹中
* @param url
* @param filepath 文件路径
* @param callback
*/
function downloadFile(url, filepath, callback) {
    var picFs = fs.createWriteStream(filepath);
    var ep = new EventProxy();
    request.get({ url: url, json: true }, function (err, res, body) {
        if (!err && body) {
            ep.emit("done", body);
        } else {
            ep.emit('error', err);
        }
    }).pipe(picFs);
    ep.once('done', function (body) {
        if (body.length > 0) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    });
    ep.fail(function (err) {
        console.log('download file failed:' + err);
        callback(err, false);
    });
}
exports.downloadFile = downloadFile;
//# sourceMappingURL=businessWork.js.map
