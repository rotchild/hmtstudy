///<reference path='../../ts/node/node.d.ts'/>
///<reference path='../../ts/mkdirp/mkdirp.d.ts'/>
///<reference path='../../ts/eventproxy/eventproxy.d.ts' />
///<reference path='../../ts/underscore/underscore.d.ts' />

import errors = require("./errors");
import fs = require("fs");
import os = require("os");
import mkdirp = require("mkdirp");
import jsaddin = require("./jsaddin");
import hcUti = require('./hcUti');
import EventProxy = require('eventproxy');
import _ = require('underscore');

/**
 *  @module File
 *  @description 服务端基础文件类，封装对基本文件操作方法,封装node.js中的原生fs模块,大部分为异步调用方法
 *  @example file = new File()
 *  file.isFileExist() 判断文件是否存在
 */

class File {
    public _TIMEINTERVAL:number = 30 * 60 * 1000;
    public defaultOpts = {
       fileDirs:[]
    };
    private _opts:any = {};
    private _fullPath:string = '';
    private _errMsg:string = '';

    constructor(public opts:any) {
        this._errMsg = "none";
        this._opts = opts?opts:this.defaultOpts;
    }

    /**
     *  setter/getter 存取器方法
     */
    public get fullPath():string {
        return this._fullPath;
    }

    public set fullPath(path:string) {
        this._fullPath = path;
    }

    /**
     * joinfilePath 传递文件数组拼接文件路径
     */
    public static joinfilePath(arr:string[]) : string {
        var path, tmp_arr;
        tmp_arr = arr;
        if (os.type() === "Windows_NT") {
            path = tmp_arr.join("\\");
        } else {
            path = tmp_arr.join("/");
        }
        return path;
    }

   /**
    * splitfilePath 分割文件名为不同字符串
    */
    public static splitfilePath(str:string) :string[] {
        var arr, tmp_str;
        tmp_str = str;
        if (os.type() === "Windows_NT") {
            arr = tmp_str.split("\\");
        } else {
            arr = tmp_str.split("/");
        }
        return arr;
    }

    public static joindownloadUrl(arr:string[]) :string {
        var path, tmp_arr;
        tmp_arr = arr;
        path = tmp_arr.join("/");
        return path;
    }

    // isValidFileName 检查文件名是否合法
    // @param [String] filename 待验证的文件名
    // @return [boolean] 文件名是否通过正则表达式进行匹配

    public isValidFileName(filename:string) :boolean {
        var str;
        if (filename.length < 0 || filename.length > 255) {
            return false;
        } else {
            str = filename.match(/^[^\\\/:\*\?\|"<>]+$/);
            if (str === null) {
                return false;
            } else {
                return true;
            }
        }
    }

    // isFileExist 检查传入文件名的文件是否存在
    // @param  [String] filename 检验是否存在的文件名
    // @return [Function] callback(err,result) result为booeaan 文件是否存在

    public isFileExist(filename:string, callback:any) {
        return fs.exists(filename, (exists) => {
            if (exists) {
                return callback(null, exists);
            } else {
                return callback(errors.NoFileExist);
            }
        });
    }

    // _walkByDFS 采用深度优先策略遍历文件夹中所有文件
    // @param [String] dir 文件目录
    // @option option [String] type 获取文件列表类型 传递absolute获取完整路径 传递part仅获取文件名。默认absolute
    // @return [Function] callback(err,result) result为文件列表
    // @private

    public _walkByDFS(dir, type, callback) {
        return fs.readdir(dir, (err, files) => {
            var dirList, fileList;
            if (err) {
                return callback(err, null);
            } else {
                dirList = files;
                fileList = [];
                if (dirList.length === 0) {
                    return callback(null, fileList);
                } else {
                    return dirList.forEach((item) => {
                        var filepath, stats;
                        filepath = File.joinfilePath([dir, item]);
                        stats = fs.statSync(filepath);
                        if (stats.isDirectory()) {
                            return this._walkByDFS(filepath, type, callback);
                        } else {
                            if (type === "absolute") {
                                fileList.push(filepath);
                            } else if (type === "part") {
                                fileList.push(item);
                            }
                            if (item === _.last(dirList)) {
                                return callback(null, fileList);
                            }
                        }
                    });
                }
            }
        });
    }

    // 获取指定目录下所有文件列表
    // @param [String] dir 文件根目录
    // @option option [String] type 获取文件列表类型 传递absolute获取完整路径 传递part仅获取文件名。默认absolute
    // @return [Function] callback 回调结果 (err,result) 错误与文件列表数组

    public getFileList(dir:string, type:string, callback:any) {
        type = type || "absolute";
        return fs.exists(dir, (exists) => {
            if (exists) {
                return this._walkByDFS(dir, type, (err, result) => {
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            } else {
                return callback(errors.NoFileExist);
            }
        });
    }

    // loadFile 读取文件内容接口
    // @param [String] filePath 文件全路径
    // @param [String] char_set 字符编码集合，传入''默认为buffer
    // @return [Function] callback 回调结果 (err,result) 错误与文件列表数组

    public loadFile(filePath, char_set, callback) {
        return fs.exists(filePath, (exists) => {
            if (exists) {
                return fs.readFile(filePath, char_set, (error, data) => {
                    if (error) {
                        return callback(error, null);
                    } else {
                        return callback(null, data);
                    }
                });
            } else {
                return callback(errors.NoFileExist);
            }
        });
    }

    // createFile 创建文件
    // @param [String] content 文件内容
    // @param [String] dir 文件目录
    // @param [String] fullPath 传递完整的文件路径
    // @return [Function] callback 回调返回结果
    // 实现方式:传入文件目录依照\或/分隔符分割成不同的路径数组，递归检查目录是否存在，没有目录时创建目录，有目录时继续检查下一级目录。
    public createFile(content, dir, fullPath, callback) {
        return fs.exists(dir, (exists) => {
            if (exists) {
                return fs.writeFile(fullPath, content, "utf-8", (err) => {
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, true);
                    }
                });
            } else {
                console.log("fullPath:" + fullPath + "dir:" + dir);
                return mkdirp(dir, (err) => {
                    if (err) {
                        return callback(err, null);
                    } else {
                        return fs.writeFile(fullPath, content, "utf-8", (err) => {
                            if (err) {
                                return callback(err, false);
                            } else {
                                return callback(null, true);
                            }
                        });
                    }
                });
            }
        });
    }

    // deleteFile 生成文件在指定时间间隔内未被下载即从服务端删除 setTimeout当服务器在30分钟内中止服务再恢复后要重新记录时间
    // @param [Number] timeInterval default:30min 时间间隔
    // @param [String] filename 待删除文件名
    // @return [Function] callback 回调结果(err,result) result为boolean值
    public deleteFile(fullPath:string,timeInterval:number,callback:any) {
        var interval;
        interval = timeInterval === null ? this._TIMEINTERVAL : timeInterval;
        return setTimeout((() => fs.exists(fullPath, (exists) => {
            if (exists) {
                return fs.unlink(fullPath, (err) => {
                    if (err) {
                        return callback(err, null);
                    } else {
                        return callback(null, true);
                    }
                });
            } else {
                return callback(errors.NoFileExist);
            }
        })), interval);
    }

    public getAllFiles(root:string): string[]{
        var res = [];
        var files = fs.readdirSync(root);
        files.forEach((file)=>{
            var pathname = root + '/' + file;
            var stat = fs.lstatSync(pathname);
            if (!stat.isDirectory()){
                res.push(pathname);
            } else {
                res = res.concat(this.getAllFiles(pathname));
            }
        });
        return res;
    }

    public delFiles(callback:any){
       var dirs = this._opts;
       var deletedFiles = [];
       for(var i=0;i<dirs.length;i++){
           var list = this.getAllFiles(dirs[i].fileDir);
           list.forEach((item)=>{
               var stat = fs.statSync(item);
               if((Date.now() - stat.ctime.getTime())> dirs[i].liveCycle){  //文件创建时间距离当前时间超过30天的文件执行删除操作
                   deletedFiles.push(item);
               }
           });
       }
       if(deletedFiles.length > 0){
           hcUti.groupQueue(5,deletedFiles,(path,callback)=>{
               this.deleteFile(path,0,callback);
           },function(doneCb){
               console.log('all done');
               callback(null,true);
           });
       }
       else{
           callback(null,true);
       }
    }
}

export = File;
