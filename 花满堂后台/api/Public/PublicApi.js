var EventProxy = require("eventproxy");
var path = require('path');
var File = require('../libs/File');

exports.GetApi = function (_req, _res, _callbackFunction, _errMark) {
    return {
        sqlConn: require('../libs/db.js'),//数据库连接属性8
        req: _req,
        res: _res,
        errors: _errMark,
        callbackFunction: _callbackFunction,
        errObj: {code: '-1', cause: ''},
        GetParams: function (paramName) {
            if (typeof(_req.query[paramName]) == "undefined" && typeof(_req.body[paramName]) == "undefined")
                throw {message: '缺乏参数：' + paramName};
            else if (!_req.query[paramName])
                return _req.body[paramName];
            else
                return _req.query[paramName];
        },
        GetDayStamp: function (_days) {
            var today = new Date();
            var todayStr = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate() + ' 00:00:00';
            return (new Date(todayStr).getTime() - 24 * 60 * 60 * 1000 * _days).toString().substr(0, 10);
        },
        LoginCheck: function () {
            var Me, username, password, userclass;
            Me = this;
            username = this.GetParams('username');
            password = this.GetParams("password");
            userclass = this.GetParams("userclass");
            console.log("userclass:", userclass);
            //var sqlCmd = "select username,realname,userstate,userclass,rolestr " +
            //    " from user " +
            //    " where username = ? and password = ? and userstate = 1 ;";

            //view_userarea 视图 关联 user 和 area 两张表
            var sqlCmd = "select * " +
                " from user " +
                " where username = ? and password = ? ;";
            Me.sqlConn.query(sqlCmd, [username, password], function (_err, _results) {
                if (!_err) {
                    if (_results.length > 0) {
                        console.log('results',_results);
                        //Me.req.session.user = _results[0];
                        var ss = JSON.parse(_results[0].userclass);
                        var qx = false;
//                        console.log("ss:", ss);
                        for (var key in ss) {
                            if (key == userclass) {
//                                console.log("hehe", key);
                                qx = true;
                                //console.log("进入UserClass：",userclass);
                                switch (parseInt(userclass)) {
                                    case 1:
                                        //console.log("进入Session11");
                                        Me.req.session.MSuser = _results[0];
                                        break;
                                    case 2:
                                        //console.log("进入Session22");
                                        Me.req.session.TJuser = _results[0];
                                        break;
                                    case 3:
                                        console.log("进入Session33",Me.req.session.DDuser);
                                        Me.req.session.DDuser = _results[0];
                                        break;
//                                    case 4:
//                                        Me.req.session.WMSuser = _results[0];
//                                        break;
//                                    case 5:
//                                        Me.req.session.OTuser = _results[0];
//                                        break;
//                                    case 7:
//                                        Me.req.session.FSuser = _results[0];
//                                        break;
//                                    case 8:
//                                        Me.req.session.PNTSuser = _results[0];
//                                        break;
//                                    case 9:
//                                        Me.req.session.MPMuser = _results[0];
//                                        break;
                                    default :
                                        break;
                                }
                                //console.log("Session：",_results[0]);
                                Me.callbackFunction(_err, userclass);
                            }
                        }
                        if (!qx) {
                            console.log("权限错误");
                            _err = Me.errors.WrongPermissionUser;
                            Me.callbackFunction(_err, _results);
                        }
                    } else {
                        _err = Me.errors.WrongLogin;
                        Me.callbackFunction(_err, false);
                    }
                } else {
                    Me.callbackFunction(_err, _results);
                }
            });
        },
        LoginCheck1: function () {
            var Me, username, password;
            Me = this;
            username = this.GetParams('username');
            password = this.GetParams("password");
            var sqlCmd = "select * from business " +
                " where username = ? and password = ?;";
            Me.sqlConn.query(sqlCmd, [username, password], function (_err, _results) {
                if (!_err) {
                    if (_results.length > 0) {
                        //console.log("获取的数据为：", _results[0]);
                        Me.req.session.BMuser = _results[0];
                        Me.callbackFunction(null, _results);
                    } else {
                        _err = Me.errors.WrongLogin;
                        Me.callbackFunction(_err, false);
                    }
                } else {
                    Me.callbackFunction(_err, _results);
                }
            });
        },
        ChangePassword: function () {
            var Me, username, oldpassword, newpassword;
            Me = this;
            username = this.GetParams('username');
            oldpassword = this.GetParams('oldpassword');
            newpassword = this.GetParams('newpassword');
            var sqlCmd = "update users set password = ? where username = ? and password = ? and status = 1";
            Me.sqlConn.query(sqlCmd, [newpassword, username, oldpassword], Me.callbackFunction);
        },
        CreateExcel: function () {
            var Me = this;
            var filename = this.GetParams('filename');
            var values = JSON.parse(this.GetParams('values'));
            //console.log( Me.excelObj.filename);
            //console.log(  Me.excelObj.values);
            var excelDir = "excel";
            var xlsx2 = require("../libs/xlsx2");
            xlsx2.createExcelUrl(filename, values, excelDir, function (err, result) {
                if (err) {
                    Me.callbackFunction(err, result);
                } else {
                    var employeePath = path.join(__dirname, '../../web/excel');
                    var fullPath = File.joinfilePath([employeePath, filename + ".xlsx"]);
                    //console.log("全局路径",fullPath);
                    xlsx2.deleteFile(fullPath, function (_err, _result) {
                        if (_result) {
                            //Me.callbackFunction(err,result);
                        } else {
                            Me.callbackFunction(null, false);
                        }
                    });
                    Me.callbackFunction(err, result);
                }
            });

            //var xlsx = require('node-xlsx');
            //Me.excelObj.fs = require('fs');
            //Me.excelObj.fullpath = 'web\\'+Me.excelObj.excelDir;
            //Me.excelObj.filebuffer = xlsx.build([{name: "Sheet1", data: Me.excelObj.values}]); // returns a buffer
            //if (!Me.excelObj.fs.existsSync(Me.excelObj.fullpath)) {
            //    Me.excelObj.fs.mkdir(Me.excelObj.fullpath, 0777, function (err) {
            //        if (err)
            //            Me.callbackFunction(err, null);
            //        else
            //            Me.excelObj.fs.writeFile(Me.excelObj.fullpath + "\\" + Me.excelObj.filename, Me.excelObj.filebuffer, 'binary', function (_err, _result) {
            //                if (_err) Me.callbackFunction(_err, _result);
            //                else
            //                    Me.callbackFunction(_err, Me.excelObj.excelDir + "\\" + Me.excelObj.filename)
            //            });
            //    });
            //} else {
            //    Me.excelObj.fs.writeFile(Me.excelObj.fullpath + "\\" + Me.excelObj.filename, Me.excelObj.filebuffer, 'binary', function (_err, _result) {
            //        if (_err) Me.callbackFunction(_err, _result);
            //        else
            //            Me.callbackFunction(_err, Me.excelObj.excelDir + "\\" + Me.excelObj.filename)
            //    });
            //}
        }
//        ,
//        Test:function(){
//            var Me = this;
//            Me.xlsx = require('node-xlsx');
//            Me.fs = require('fs');
//            Me.obj = [{"name": "mySheetName","data": [[1,2,3],[true,false,null,"sheetjs"],["foo","bar",41689.604166666664,"0.3"],["baz",null,"qux"]]}];
//            Me.file = Me.xlsx.build(Me.obj);
//            console.log(file);
//            Me.fs.mkdir('exce', 0777, function(err) {
//                if(err)
//                    Me.callbackFunction(err,null);
//                else
//                Me.fs.writeFile('exce\\user.xlsx', Me.file, 'binary',Me.callbackFunction);
//            });
//        }

        ,
        //网页编辑器图片上传接口
        UploadPic: function () {
            var Me = this;
            //系统的文件系统支持框架
            var fs = require('fs');

            var tmp_path = "";

            // 获得文件的临时路径
            try {
                tmp_path = Me.req.files.FilePath.path;
            } catch (err) {
                Me.callbackFunction({
                    name: 'InvalidPicFile',
                    message: '图片文件有误'
                }, "");
                return;
            }

            // 指定文件上传后的目录和文件名
            var last3 = Me.req.files.FilePath.name.toString().substr(Me.req.files.FilePath.name.toString().length - 3, 3);
            Me.picname = new Date().getTime() + '' + (Math.random().toString()).substr(2, 4) + '.' + last3;
            var target_path = 'web/upload/' + Me.picname;

            //创建对应目录
            fs.mkdir('web/upload', 0777, function () {
                //读取临时文件
                fs.readFile(tmp_path, function (error, data) {
                    //写入到对应文件中
                    fs.writeFile(target_path, data, function (err) {
                        if (err) {
                            Me.callbackFunction(err, "照片上传失败");
                            return;
                        }
                        fs.unlink(tmp_path);
                        Me.callbackFunction(null, Me.picname);
                    });//writefile
                });//readfile
            });//mkdir
        },

        //网页编辑器加载网页接口
        LoadHTML: function () {
            var Me = this;
            //系统的文件系统支持框架
            var fs = require('fs');

            var fileSrc = this.GetParams('fileSrc');

            fs.readFile(fileSrc, 'utf-8', function (err, data) {
                if (err) {
                    Me.callbackFunction(err, "文件读取失败");
                } else {
                    Me.callbackFunction(null, data);
                }
            });
        },

        //网页编辑器保存网页接口
        SaveHTML: function () {
            var Me = this;
            //系统的文件系统支持框架
            Me.saveFS = require('fs');

            Me.fileSrc = this.GetParams('fileSrc');

            Me.htmlCode = this.GetParams('htmlCode');

            console.log("接收到的数据：", Me.fileSrc);
            console.log("接收到的数据：", Me.htmlCode);

            Me.saveFS.unlink(Me.fileSrc, function (err) {
                if (err) {
                    Me.callbackFunction(err, "文件删除失败");
                    return;
                } else {
                    //写入到对应文件中
                    Me.saveFS.writeFile(Me.fileSrc, Me.htmlCode, function (err) {
                        if (err) {
                            Me.callbackFunction(err, "文件写入失败");
                            return;
                        }
                        Me.callbackFunction(null, "ok");
                    });//writefile
                }
            });
        }
        ,
        SessionCheck: function () {
            var Me = this;
            console.log('SessionCheck');
            Me.openid = this.GetParams('openid');
            var sqlCmd = "select * from publicuser " +
                " where openid = ? ;";
            Me.sqlConn.query(sqlCmd, [Me.openid], function (_err, _results) {
                if (!_err) {
                    if (_results.length > 0) {
                        Me.req.session.PublicUser = _results[0];
//                        console.log('Me.req.session.PublicUser:',Me.req.session.PublicUser);
                        Me.callbackFunction(null, _results);
                    } else {
                        _err = Me.errors.WrongLogin;
                        Me.callbackFunction(_err, false);
                    }
                } else {
                    Me.callbackFunction(_err, _results);
                }
            });
        },
        GetSession: function () {
            var Me = this;
            Me.callbackFunction(null, Me.req.session.PublicUser);
        },
        //从服务器获取当前时间
        GetCurrentTime: function () {
            var Me = this;
            var nowTime = new Date().getTime();
            console.log("nowTime:", nowTime);
            Me.callbackFunction(null, nowTime);
        }
        , renbaoVerify: function () {
            var Me = this;
            //console.log('renbaoVerify:',args);
            var licenseno = this.GetParams('licenseno');
            var mobile = this.GetParams('mobile');
            var owner = this.GetParams('owner');
            var identifynumber = this.GetParams('identifynumber');
            var CLSBDH = this.GetParams('CLSBDH');

            var sqlTxt = " select a.policyno, " +
                " to_char(a.OperateDate,'%Y-%m-%d %H:%M:%S') as OperateDate,to_char(a.startdate,'%Y-%m-%d %H:%M:%S') as startdate,to_char(a.enddate,'%Y-%m-%d %H:%M:%S') as enddate,a.comcode,a.sumpremium,b.insuredname,b.mobile,b.identifynumber,c.licenseno,c.frameno,d.LastDamagedBI,d.LastDamagedCI " +
                " from hb4200car3gdb@hb_4200_cb_ids:prpcmain a,hb4200car3gdb@hb_4200_cb_ids:prpcinsured b,hb4200car3gdb@hb_4200_cb_ids:prpcitem_car c,hb4200car3gdb@hb_4200_cb_ids:PrpCitem_carext d " +
                " where a.proposalno=b.proposalno " +
                " and a.proposalno=c.proposalno " +
                " and a.proposalno=d.proposalno " +
                " and b.InsuredFlag[2] = '1' " +
                " and a.othflag[4]!='1' " +
                " and a.underwriteflag in ('1','3') " +
                " and (a.comcode[1,4]='4201' or a.comcode[1,6]='429004') " +
                " and a.enddate>=current " +
                    //" and c.licenseno='鄂AD8Q13' "+
                    //" and insuredname='李青' "+
                " and b.mobile='" + mobile + "' " +
                " and b.identifynumber='" + identifynumber + "' " +
                " and substr(c.frameno,length(c.frameno)-5,6)='" + CLSBDH + "'";
            //console.log("renbaoVerify:",owner);
            Me.sqlConn = require('../libs/db.js');//数据库连接属性
            Me.odbc = require('../libs/odbc.js');
            Me.odbc.query({
                dsn: "Dsn=trs",
                sql: sqlTxt
            }, function (data) {
                console.log('renbaoVerifyData:', data);
                if (data.records.length > 0) {
                    Me.callbackFunction(null, data.records);
                } else {
                    Me.callbackFunction(null, true);
                }
            });
            //Me.callbackFunction(null, "ok");
        }
    };
};