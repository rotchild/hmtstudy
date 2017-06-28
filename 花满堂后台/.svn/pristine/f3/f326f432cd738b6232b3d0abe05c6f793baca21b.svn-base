/**
 * Created by Administrator on 15-1-2.
 */

var mysql = require('mysql');
var config = require('../../settings');
var File = require('../libs/File');
var pool = mysql.createPool(config.mysql);
var hcUti = require("../libs/hcUti.js");
var request = require('request');
var eventproxy = require('eventproxy');
var path = require('path');
var Buffer = require("buffer").Buffer;
exports.GetApi = function (_req, _res, _callbackFunction, _errMark) {
    return {
        sqlConn: require('../libs/db.js'),//数据库连接属性
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
        UserCheck: function () {
            var Me = this;
            Me.callbackFunction(null, Me.req.session.MSuser);
        },
        UserLogin: function () {
            //console.log("进入接口UserLogin");
            var Me, username, password;
            Me = this;
            username = this.GetParams('username');
            password = this.GetParams("password");

            var sqlCmd = "SELECT * FROM `user` WHERE username = ? AND `password` = ?;";//登录
            Me.sqlConn.query(sqlCmd, [username, password], function (_err, _results) {
                if (!_err) {
                    if (_results.length > 0) {
                        Me.req.session.MSuser = _results[0];
                    } else {
                        _err = Me.errors.WrongLogin;
                    }
                }
                Me.callbackFunction(_err, _results);
            });
        },
        UserCheckOut: function () {
            var Me = this;
            try {
                delete Me.req.session.MSuser;
            } catch (err) {
            }///单纯屏蔽错误，不作处理。
            Me.callbackFunction(null, 'UserCheckOut');
        },
        UpdatePassWord: function () {
            //console.log("进入接口updatePassWord");
            var username = this.GetParams("username");
            var oldpassword = this.GetParams("oldpassword");
            var newpassword = this.GetParams("newpassword");
            var Me = this;
            var sqlCmd = "SELECT * from `user` WHERE username = ? and password = ?;";
            Me.sqlConn.query(sqlCmd, [username, oldpassword], function (err, reslut) {
                if (err) {
                    Me.callbackFunction(err, null);
                } else {
                    //console.log("获取的数据额为：", reslut);
                    if (reslut.length > 0) {
                        var sqlCmd2 = "update `user` set password = ? where username = ?;";
                        Me.sqlConn.query(sqlCmd2, [newpassword, username], function (_err, _result) {
                            if (_err) {
                                Me.callbackFunction(_err, null);
                            } else {
                                Me.callbackFunction(err, _result);
                            }
                        });
                    } else {
                        Me.callbackFunction(Me.errors.WrongPassWord, null);
                    }
                }
            });
        },
        GetMenuClass: function () {
            //console.log("获取分类");
            var Me, menuclasstype, start, limit;
            Me = this;

            menuclasstype = this.GetParams("menuclasstype");

            start = this.GetParams("start");
            limit = this.GetParams("limit");

            var sqlCmd = 'select * from menuclass ';
            var sqlWhere = ' where 1=1 ';

            if (menuclasstype != "" && menuclasstype != undefined) {
                sqlWhere += "and menuclasstype = " + menuclasstype + " ";
            }

            sqlCmd += sqlWhere + ' order by menuclasssort asc limit ' + start + ',' + limit + ';';
//            sqlCmd += sqlWhere + ' order by menuclasssort asc;';

            sqlCmd += "select count(id) as totalCount from menuclass ";
            sqlCmd += sqlWhere + ";";

            //console.log("sqlCmd语句：", sqlCmd);

            this.sqlConn.query(sqlCmd, [], function (err, results) {
                if (err) {
                    console.log(err);
                    Me.callbackFunction(err, results);
                } else {
                    //Me.callbackFunction(err, results);
                    Me.callbackFunction(err, {"totalCount": results[1][0].totalCount, 'topics': results[0]});
                }
            });
        },
        GetMenuClass02: function () {
            //console.log("进入接口GetMenuClass02");
            var Me, menuclasstype;
            Me = this;

            menuclasstype = Me.GetParams("menuclasstype");

            var sqlCmd = 'select * from menuclass ';
            var sqlWhere = 'where ishide = 1 ';


            if (menuclasstype != "" && menuclasstype != undefined) {
                sqlWhere += 'and menuclasstype = ' + menuclasstype + " ";
            }

            sqlCmd += sqlWhere + " order by menuclasssort asc;";

            //console.log("sqlCmd语句：", sqlCmd);

            this.sqlConn.query(sqlCmd, [], function (err, results) {
                if (err) {
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, results);
                }
            });
        },
        AddMenuClass: function () {
            //console.log("添加分类");
            var Me, menuclassname, createtime, ishide, menuclasstype, menuclasssort;
            Me = this;
            menuclassname = Me.GetParams("menuclassname");
            ishide = Me.GetParams("ishide");
            menuclasstype = Me.GetParams("menuclasstype");
            menuclasssort = Me.GetParams("menuclasssort");

            var hcUti = require("../libs/hcUti");
            createtime = hcUti.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");

            var sqlParams = [];
            var sqlCmd = "select * from menuclass where menuclassname = ? and menuclasstype = ?;";
            sqlParams[sqlParams.length] = menuclassname;
            sqlParams[sqlParams.length] = menuclasstype;

            //console.log("sqlCmd语句：", sqlCmd);
            //console.log("sqlParams语句：", sqlParams);

            Me.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    Me.callbackFunction(err, results);
                } else {
                    if (results.length > 0) {
                        Me.callbackFunction(Me.errors.DuplicateMenuClassName, results);
                    } else {

                        //2017-06-20 16:23 添加排序字段，新增时若输入的序号已存在，则将原序号以及以下数据全部下移一位，然后将该数据插入
                        var _sqlCmd = "select * from menuclass where menuclasssort = ? and menuclasstype = ?;" +
                            "select * from menuclass where menuclasstype = ? order by menuclasssort asc;";
                        var _sqlParams = [menuclasssort, menuclasstype, menuclasstype];

                        //console.log("_sqlCmd-语句：", _sqlCmd);
                        //console.log("_sqlParams-语句：", _sqlParams);

                        Me.sqlConn.query(_sqlCmd, _sqlParams, function (_err, _results) {
                            if (_err) {
                                Me.callbackFunction(_err, _results);
                            } else {
                                var _result1 = _results[0];//查询原序号是否存在
                                var _result2 = _results[1];//查询所有此类型中的分类数据

                                var sqlParams2 = [];
                                var sqlCmd2 = "";
                                if (_result1.length > 0) {//说明序号已经存在
                                    sqlCmd2 += 'insert into menuclass (menuclassname,createtime,ishide,menuclasstype,menuclasssort) values (?,?,?,?,?);';
                                    sqlParams2[sqlParams2.length] = menuclassname;
                                    sqlParams2[sqlParams2.length] = createtime;
                                    sqlParams2[sqlParams2.length] = ishide;
                                    sqlParams2[sqlParams2.length] = menuclasstype;
                                    sqlParams2[sqlParams2.length] = menuclasssort;

                                    //对其他数据的处理
                                    for (var i = 0; i < _result2.length; i++) {
                                        var iData = _result2[i];
                                        if (iData.menuclasssort >= menuclasssort) {
                                            sqlCmd2 += "update menuclass set menuclasssort = ? where id = ?;";
                                            sqlParams2[sqlParams2.length] = iData.menuclasssort * 1 + 1;
                                            sqlParams2[sqlParams2.length] = iData.id;
                                        }
                                    }

                                } else {//序号不存在
                                    sqlCmd2 += 'insert into menuclass (menuclassname,createtime,ishide,menuclasstype,menuclasssort) values (?,?,?,?,?);';
                                    sqlParams2[sqlParams2.length] = menuclassname;
                                    sqlParams2[sqlParams2.length] = createtime;
                                    sqlParams2[sqlParams2.length] = ishide;
                                    sqlParams2[sqlParams2.length] = menuclasstype;
                                    sqlParams2[sqlParams2.length] = menuclasssort;
                                }

                                //console.log("sqlCmd2-语句：", sqlCmd2);
                                //console.log("sqlParams2-语句：", sqlParams2);

                                Me.sqlConn.query(sqlCmd2, sqlParams2, function (err2, results2) {
                                    if (err2) {
                                        Me.callbackFunction(err2, results2);
                                    } else {
                                        Me.callbackFunction(err2, results2);
                                    }
                                });
                            }
                        });
                    }
                }
            });
        },
        EditMenuClass: function () {
            //console.log("进入接口EditMenuClass");
            var Me, menuclassname, id, ishide, menuclasstype, menuclasssort, oldmenuclasssort;
            Me = this;
            menuclassname = Me.GetParams("menuclassname");
            id = Me.GetParams("id");
            ishide = Me.GetParams("ishide");
            menuclasstype = Me.GetParams("menuclasstype");
            menuclasssort = Me.GetParams("menuclasssort");//新的需要修改的序号
            oldmenuclasssort = Me.GetParams("oldmenuclasssort");//老的序号

            //var hcUti = require("../libs/hcUti");
            //createtime = hcUti.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");

            var sqlParams = [];
            var sqlCmd = "select * from menuclass where menuclassname = ? and menuclasstype = ? and id not in (?);";
            sqlParams[sqlParams.length] = menuclassname;
            sqlParams[sqlParams.length] = menuclasstype;
            sqlParams[sqlParams.length] = id;

            //console.log("sqlCmd语句：", sqlCmd);
            //console.log("sqlParams语句：", sqlParams);

            Me.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    Me.callbackFunction(err, results);
                } else {
                    if (results.length > 0) {
                        Me.callbackFunction(Me.errors.DuplicateMenuClassName, results);
                    } else {

                        //2017-06-20 16:48 分别给【堂食】、【外卖】、【食杂铺】列表都添加一个排序字段 修改时若是输入的序号已存在，则将该条数据和重复的序号数据交换位置
                        var _sqlCmd = "select * from menuclass where menuclasssort = ? and menuclasstype = ? and id not in (?);";
                        var _sqlParams = [menuclasssort, menuclasstype, id];

                        //console.log("_sqlCmd-语句：", _sqlCmd);
                        //console.log("_sqlParams-语句：", _sqlParams);

                        Me.sqlConn.query(_sqlCmd, _sqlParams, function (_err, _results) {
                            if (_err) {
                                Me.callbackFunction(_err, _results);
                            } else {
                                var sqlParams2 = [];
                                var sqlCmd2 = "";
                                if (_results.length > 0) {//说明序号已经存在
                                    sqlCmd2 += 'update menuclass set menuclassname = ? , ishide = ? , menuclasssort = ? where id = ?;';
                                    sqlParams2[sqlParams2.length] = menuclassname;
                                    sqlParams2[sqlParams2.length] = ishide;
                                    sqlParams2[sqlParams2.length] = menuclasssort;
                                    sqlParams2[sqlParams2.length] = id;

                                    //对原存在的序号的处理
                                    sqlCmd2 += 'update menuclass set menuclasssort = ? where id = ?;';
                                    sqlParams2[sqlParams2.length] = oldmenuclasssort;
                                    sqlParams2[sqlParams2.length] = _results[0].id;

                                } else {//序号不存在
                                    sqlCmd2 += 'update menuclass set menuclassname = ? , ishide = ? , menuclasssort = ? where id = ?;';
                                    sqlParams2[sqlParams2.length] = menuclassname;
                                    sqlParams2[sqlParams2.length] = ishide;
                                    sqlParams2[sqlParams2.length] = menuclasssort;
                                    sqlParams2[sqlParams2.length] = id;
                                }

                                //console.log("sqlCmd2-语句：", sqlCmd2);
                                //console.log("sqlParams2-语句：", sqlParams2);

                                Me.sqlConn.query(sqlCmd2, sqlParams2, function (err2, results2) {
                                    if (err2) {
                                        Me.callbackFunction(err2, results2);
                                    } else {
                                        Me.callbackFunction(err2, results2);
                                    }
                                });
                            }
                        });
                    }
                }
            });
        },
        DelMenuClass: function () {
            //console.log("进入接口DelMenuClass");
            var Me, id;
            Me = this;
            id = Me.GetParams("id");

            var sqlParams = [];
            var sqlCmd = "delete from menuclass where id = ?;";
            sqlParams[sqlParams.length] = id;

            //console.log("sqlCmd语句：", sqlCmd);
            //console.log("sqlParams语句：", sqlParams);

            Me.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, results);
                }
            });
        },
        MenuClassSort: function () {
            //console.log("分类排序");
            var Me, id, createtime, menuclasstype, menuclasssort, sorttype;
            Me = this;
            id = Me.GetParams("id");
            sorttype = Me.GetParams("sorttype");
            menuclasstype = Me.GetParams("menuclasstype");
            menuclasssort = Me.GetParams("menuclasssort");

            var hcUti = require("../libs/hcUti");
            createtime = hcUti.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");

            //2017-06-20 17:46 添加排序字段，点击上下可移动该条数据的排序位置
            var _sqlCmd = "";
            var _sqlParams = [];
            if (sorttype == 1) {//向上 查询同类中 排序小于自己的序号（序号越小，排序越大）
                _sqlCmd = "select * from menuclass where menuclasstype = ? and menuclasssort < ? order by menuclasssort asc;";
                _sqlParams = [menuclasstype, menuclasssort];
            } else if (sorttype == 2) {//向下 查询同类中 排序大于自己的序号（序号越小，排序越大）
                _sqlCmd = "select * from menuclass where menuclasstype = ? and menuclasssort > ? order by menuclasssort asc;";
                _sqlParams = [menuclasstype, menuclasssort];
            }

            //console.log("_sqlCmd-语句：", _sqlCmd);
            //console.log("_sqlParams-语句：", _sqlParams);

            Me.sqlConn.query(_sqlCmd, _sqlParams, function (_err, _results) {
                if (_err) {
                    Me.callbackFunction(_err, _results);
                } else {
                    var sqlParams2 = [];
                    var sqlCmd2 = "";

                    if (_results.length > 0) {//有数据
                        var newmenuclasssort = "";
                        var newid = "";
                        if (sorttype == 1) {//向上 交换
                            newmenuclasssort = _results[_results.length - 1].menuclasssort;
                            newid = _results[_results.length - 1].id;
                        } else if (sorttype == 2) {//向下 交换
                            newmenuclasssort = _results[0].menuclasssort;
                            newid = _results[0].id;
                        }
                        sqlCmd2 += 'update menuclass set menuclasssort = ? where id = ?;';
                        sqlParams2[sqlParams2.length] = newmenuclasssort;
                        sqlParams2[sqlParams2.length] = id;

                        sqlCmd2 += 'update menuclass set menuclasssort = ? where id = ?;';
                        sqlParams2[sqlParams2.length] = menuclasssort;
                        sqlParams2[sqlParams2.length] = newid;

                        //console.log("sqlCmd2-语句：", sqlCmd2);
                        //console.log("sqlParams2-语句：", sqlParams2);
                        Me.sqlConn.query(sqlCmd2, sqlParams2, function (err2, results2) {
                            if (err2) {
                                Me.callbackFunction(err2, results2);
                            } else {
                                Me.callbackFunction(err2, results2);
                            }
                        });
                    } else {//没有数据 则向上已经最小 向下已经最大
                        if (sorttype == 1) {//向上
                            Me.callbackFunction({message: "该分类已经是排序最大，不能向上操作"}, null);
                        } else if (sorttype == 2) {//向下
                            Me.callbackFunction({message: "该分类已经是排序最小，不能向下操作"}, null);
                        }
                    }
                }
            });
        },
        GetMenu: function () {
            //console.log("进入接口GetMenu");
            var Me, startdate, enddate, keyword, isgrounding, dishtype, menuclass, isrecommend,
                start, limit;
            Me = this;
            startdate = this.GetParams('startdate');
            enddate = this.GetParams('enddate');
            keyword = this.GetParams('keyword');
            isgrounding = this.GetParams('isgrounding');
            dishtype = this.GetParams('dishtype');
            menuclass = this.GetParams('menuclass');

            isrecommend = this.GetParams("isrecommend");

            start = this.GetParams("start");
            limit = this.GetParams("limit");

            startdate = startdate + " 00:00:00";
            enddate = enddate + " 23:59:59";

            var sqlCmd = "select * from menu ";
            var sqlWhere = "where isgrounding in ( " + isgrounding + " ) and dishtype in ( " + dishtype + " ) ";
            var sqlParams = [];

            if (menuclass != "" && menuclass != null && menuclass != undefined) {
                sqlWhere += "and id in ( select menuid from menukey where menuclassid = ? ) ";
                sqlParams[sqlParams.length] = menuclass;
            }

            if (isrecommend != "" && isrecommend != null && isrecommend != undefined) {
                sqlWhere += "and isrecommend in ( " + isrecommend + " ) ";
            }

            //菜单内容修改时间
            if (startdate) {
                sqlWhere += "and changetime >= '" + startdate + "' ";
            }

            if (enddate) {
                sqlWhere += "and changetime <= '" + enddate + "' ";
            }

            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlWhere += "and ( dishname like ? ) ";
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            sqlCmd = sqlCmd + sqlWhere + " order by changetime desc limit " + start + "," + limit + ";";

            sqlCmd += "select count(id) as totalCount from menu ";

            sqlCmd = sqlCmd + sqlWhere + ";";

            if (menuclass != "" && menuclass != null && menuclass != undefined) {
                sqlParams[sqlParams.length] = menuclass;
            }

            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            //console.log("sqlCmd语句：", sqlCmd);
            //console.log("sqlParams语句：", sqlParams);

            this.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, {"totalCount": results[1][0].totalCount, 'topics': results[0]});
                }
            });
        },
        AddMenu: function () {
            //console.log("进入接口AddMenu");
            var Me, menuclass, dishname, standardprice, presentprice, dishcount, isgrounding,
                dishtype, groundtime, notgroundtime, completetime, menutab, dishdescription,
                changetime, dishdetail, imageurl, menudetailurl,
                isrecommend, menuformat;
            Me = this;
            menuclass = Me.GetParams("menuclass");
            dishname = Me.GetParams("dishname");
            standardprice = Me.GetParams("standardprice");
            presentprice = Me.GetParams("presentprice");
            dishcount = Me.GetParams("dishcount");
            isgrounding = Me.GetParams("isgrounding");
            dishtype = Me.GetParams("dishtype");
            groundtime = Me.GetParams("groundtime");
            notgroundtime = Me.GetParams("notgroundtime");
            completetime = Me.GetParams("completetime");
            menutab = Me.GetParams("menutab");
            dishdescription = Me.GetParams("dishdescription");
            dishdetail = Me.GetParams("dishdetail");
            imageurl = Me.GetParams("imageurl");
            menudetailurl = Me.GetParams("menudetailurl");
            isrecommend = Me.GetParams("isrecommend");
            menuformat = Me.GetParams("menuformat");

            var hcUti = require("../libs/hcUti");
            changetime = hcUti.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");

            var sqlParams3 = [];
            var sqlCmd3 = "select * from menu where dishname = ? and dishtype = ?;";
            sqlParams3[sqlParams3.length] = dishname;
            sqlParams3[sqlParams3.length] = dishtype;

            //console.log("sqlCmd3语句：", sqlCmd3);
            //console.log("sqlParams3语句：", sqlParams3);

            Me.sqlConn.query(sqlCmd3, sqlParams3, function (err3, results3) {
                if (err3) {
                    Me.callbackFunction(err3, results3);
                } else {
                    if (results3.length > 0) {
                        Me.callbackFunction(Me.errors.DuplicateDishName, results3);
                    } else {

                        var isRecommendStr = "";

                        if (isrecommend == "") {
                            isRecommendStr = 0;
                        } else {
                            isRecommendStr = isrecommend;
                        }

                        var sqlParams = [];
                        var sqlCmd = "insert into menu (dishname, standardprice, presentprice, dishcount, isgrounding, dishtype, " +
                            "groundtime, notgroundtime, completetime, menutab, dishdescription, changetime, dishdetail, dishurl, " +
                            "menudetailurl, sellcount, isrecommend, menuformat) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,?,?);";
                        sqlParams[sqlParams.length] = dishname;
                        sqlParams[sqlParams.length] = standardprice;
                        sqlParams[sqlParams.length] = presentprice;
                        sqlParams[sqlParams.length] = dishcount;
                        sqlParams[sqlParams.length] = isgrounding;
                        sqlParams[sqlParams.length] = dishtype;
                        sqlParams[sqlParams.length] = groundtime;
                        sqlParams[sqlParams.length] = notgroundtime;
                        sqlParams[sqlParams.length] = completetime;
                        sqlParams[sqlParams.length] = menutab;
                        sqlParams[sqlParams.length] = dishdescription;
                        sqlParams[sqlParams.length] = changetime;
                        sqlParams[sqlParams.length] = dishdetail;
                        sqlParams[sqlParams.length] = imageurl;
                        sqlParams[sqlParams.length] = menudetailurl;
                        sqlParams[sqlParams.length] = isRecommendStr;
                        sqlParams[sqlParams.length] = menuformat;

                        //console.log("sqlCmd语句：", sqlCmd);
                        //console.log("sqlParams语句：", sqlParams);

                        Me.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                            if (err) {
                                Me.callbackFunction(err, results);
                            } else {
                                //console.log("获取的数据为：", results);

                                menuclass = JSON.parse(menuclass);

                                if (menuclass == "") {//菜品为空
                                    Me.callbackFunction(err, results);
                                } else {

                                    var menuid = results.insertId;

                                    var sqlParams2 = [];
                                    var sqlCmd2 = "";

                                    for (var i = 0; i < menuclass.length; i++) {
                                        sqlCmd2 += 'insert into menukey (menuclassid,menuid,createtime) values (?,?,?);';
                                        sqlParams2[sqlParams2.length] = menuclass[i];
                                        sqlParams2[sqlParams2.length] = menuid;
                                        sqlParams2[sqlParams2.length] = changetime;
                                    }

                                    //console.log("sqlCmd2语句：", sqlCmd2);
                                    //console.log("sqlParams2语句：", sqlParams2);

                                    Me.sqlConn.query(sqlCmd2, sqlParams2, function (err2, results2) {
                                        if (err2) {
                                            Me.callbackFunction(err2, results2);
                                        } else {
                                            Me.callbackFunction(err2, results2);
                                        }
                                    });
                                }
                            }
                        });

                    }
                }
            });

        },
        AddMenu2: function () {
            //dishname: dishname,添加菜谱
            //    standardprice: standardprice,
            //    presentprice: presentprice,
            //    dishcount: dishcount,
            //    dishtype: dishtype,
            //    dish_fk:menuclassid,
            //    menutab: menutabStr,
            //    isrecommend: isrecommendStr,
            //    dishdescription: dishdescription,
            //    imageurl: imageurl,
            //    menudetailurl: menudetailurl,

            var Me, dishname, standardprice, presentprice, dishcount,
                dishtype, menutab, dishdescription,
                changetime, imageurl, menudetailurl,
                isrecommend, dish_fk, menusequence, departId, scoville, depart_fk, isgrounding, imgList;
            Me = this;
            dishname = Me.GetParams("dishname");
            standardprice = Me.GetParams("standardprice");
            presentprice = Me.GetParams("presentprice");
            dishcount = Me.GetParams("dishcount");
            dishtype = Me.GetParams("dishtype");
            menutab = Me.GetParams("menutab");
            dishdescription = Me.GetParams("dishdescription");
            imageurl = Me.GetParams("imageurl");
            menudetailurl = Me.GetParams("menudetailurl");
            isrecommend = Me.GetParams("isrecommend");
            dish_fk = Me.GetParams('dish_fk');
            menusequence = Me.GetParams('menusequence');
            isgrounding = Me.GetParams('isgrounding');
            imgList = JSON.parse(Me.GetParams('imgList'));//5张图片
            var hcUti = require("../libs/hcUti");
            changetime = hcUti.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
            departId = Me.GetParams('departId');
            scoville = Me.GetParams('scoville');//辣度
            depart_fk = Me.GetParams('departId');
            var sqlParams3 = [];
            var sqlCmd3 = "select * from menu where dishname = ? and dishtype = ?;";
            sqlParams3[sqlParams3.length] = dishname;
            sqlParams3[sqlParams3.length] = dishtype;
            var ep = new eventproxy();
            //console.log("添加菜品：", sqlCmd3);
            //console.log("sqlParams3语句：", sqlParams3);

            Me.sqlConn.query(sqlCmd3, sqlParams3, function (err3, results3) {
                if (err3) {
                    Me.callbackFunction(err3, results3);
                } else {
                    if (results3.length > 0) {
                        Me.callbackFunction(Me.errors.DuplicateDishName, results3);
                    } else {
                        var isRecommendStr = "";
                        if (isrecommend == "") {
                            isRecommendStr = 0;
                        } else {
                            isRecommendStr = isrecommend;
                        }
                        var sqlParams = [];
                        var sqlCmd = "insert into menu (dishname, standardprice, presentprice, dishcount, dishtype, " +
                            " menutab, dishdescription, changetime,dishurl," +
                            "menudetailurl, isrecommend, dish_fk,isgrounding,scoville,depart_fk) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
                        sqlParams[sqlParams.length] = dishname;
                        sqlParams[sqlParams.length] = standardprice;
                        sqlParams[sqlParams.length] = presentprice;
                        sqlParams[sqlParams.length] = dishcount;
                        sqlParams[sqlParams.length] = dishtype;
                        sqlParams[sqlParams.length] = menutab;
                        sqlParams[sqlParams.length] = dishdescription;
                        sqlParams[sqlParams.length] = changetime;
                        sqlParams[sqlParams.length] = imageurl;
                        sqlParams[sqlParams.length] = menudetailurl;
                        sqlParams[sqlParams.length] = isRecommendStr;
                        sqlParams[sqlParams.length] = dish_fk;
                        sqlParams[sqlParams.length] = isgrounding;
                        sqlParams[sqlParams.length] = scoville;
                        sqlParams[sqlParams.length] = depart_fk;
                        //console.log("imgList：", imgList);
                        //console.log("sqlParams语句：", sqlParams);

                        Me.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                            if (err) {
                                Me.callbackFunction(err, results);
                            } else {
                                //console.log("获取的数据为：", results);
                                var menuclass = dish_fk;
                                var menuid = results.insertId;
                                var sqlParams2 = [];
                                var sqlCmd2 = "";
                                sqlCmd2 += 'insert into menukey (menuclassid,menuid,createtime,menusequence) values (?,?,?,?);';
                                sqlParams2[sqlParams2.length] = menuclass;
                                sqlParams2[sqlParams2.length] = menuid;
                                sqlParams2[sqlParams2.length] = changetime;
                                sqlParams2[sqlParams2.length] = menusequence;
                                var sqlImg = "insert into menuphotos (picId,picUrl,menuId,updateTime) values ";
                                var parmasImg = [];
                                for (var g = 0; g < imgList.length; g++) {
                                    var imgUrl = imgList[g].substring(imgList[g].lastIndexOf("/") + 1, imgList[g].length);
                                    var picId = menuid + "_" + (g + 1);
                                    sqlImg += '("' + picId + '","' + imgUrl + '",' + menuid + ',"' + Date.parse(changetime) + '")';
                                    if (g < imgList.length - 1) {
                                        sqlImg += ",";
                                    }
                                }
                                var sqlAll = sqlCmd2 + sqlImg + ";";
                                //console.log("sqlAll：", sqlAll,sqlParams2);
                                //console.log("sqlParams2语句：", sqlParams2);
                                pool.getConnection(function (err, connection) {
                                    if (err) {
                                        console.error('mysql 连接失败');
                                        Me.callbackFunction(err, null);
                                    }
                                    //开始事务
                                    connection.beginTransaction(function (_err) {
                                        if (_err) {
                                            console.log("_err", _err)
                                            throw _err;
                                            Me.callbackFunction(_err, null);
                                        }
                                        connection.query(sqlAll, sqlParams2, function (__err, result1) {
                                            if (__err) {
                                                console.log("__err", __err);
                                                connection.rollback(function () {
                                                    throw __err;
                                                });
                                                Me.callbackFunction(__err, null);
                                            }
                                            connection.commit(function (____err) {
                                                if (____err) {
                                                    console.log("____err", ____err);
                                                    connection.rollback(function () {
                                                        throw ____err;
                                                    });
                                                    Me.callbackFunction(____err, null);
                                                }
                                                //console.log("success!");

                                                connection.release();

                                                Me.callbackFunction(null, true);
                                            });
                                        });
                                    });
                                });
                                //Me.sqlConn.query(sqlCmd2, sqlParams2, function (err2, results2) {
                                //    if (err2) {
                                //        console.log(err2);
                                //        Me.callbackFunction(err2, results2);
                                //    } else {
                                //        Me.callbackFunction(err2, results2);
                                //    }
                                //});
                            }
                        });

                    }
                }
            });
        },
        EditMenu: function () {
            //console.log("修改菜谱");
            var Me, id, dishname, standardprice, presentprice, dishcount,
                dishtype, menutab, dishdescription, isgrounding,
                changetime, imageurl, menudetailurl,
                isrecommend, dish_fk, menusequence, departId, scoville;
            Me = this;
            id = Me.GetParams('id');
            dishname = Me.GetParams("dishname");
            standardprice = Me.GetParams("standardprice");
            presentprice = Me.GetParams("presentprice");
            dishcount = Me.GetParams("dishcount");
            dishtype = Me.GetParams("dishtype");
            menutab = Me.GetParams("menutab");
            dishdescription = Me.GetParams("dishdescription");
            isgrounding = Me.GetParams('isgrounding');
            imageurl = Me.GetParams("imageurl");
            menudetailurl = Me.GetParams("menudetailurl");
            isrecommend = Me.GetParams("isrecommend");
            dish_fk = Me.GetParams('dish_fk');
            menusequence = Me.GetParams('menusequence') || null;
            var hcUti = require("../libs/hcUti");
            changetime = hcUti.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
            departId = Me.GetParams('departId');
            scoville = Me.GetParams('scoville');//辣度
            var imgList = JSON.parse(Me.GetParams('imgList'));
            var sqlParams3 = [];
            var sqlCmd3 = "select * from menu where dishname = ? and dishtype = ? and id not in (?) ;";
            sqlParams3[sqlParams3.length] = dishname;
            sqlParams3[sqlParams3.length] = dishtype;
            sqlParams3[sqlParams3.length] = id;

            var ep = new eventproxy();

            //console.log("sqlCmd3语句：", sqlCmd3);
            //console.log("sqlParams3语句：", sqlParams3);
            //1查询，2，修改，3，删除menukey记录，删除menuphotos记录，4，insert menukey记录，insert menuphotos记录
            Me.sqlConn.query(sqlCmd3, sqlParams3, function (err3, results3) {
                if (err3) {
                    console.log("select:", err3);
                    Me.callbackFunction(err3, results3);
                } else {
                    if (results3.length > 0) {
                        Me.callbackFunction(Me.errors.DuplicateDishName, results3);
                    } else {
                        ep.emit("update");
                    }
                }
            });
            ep.once('update', function () {
                var isRecommendStr = "";
                if (isrecommend == "") {
                    isRecommendStr = 0;
                } else {
                    isRecommendStr = isrecommend;
                }
                var sqlParams = [];
                var sqlCmd = "update menu set dishname = ?, standardprice = ?, presentprice = ?, dishcount = ?, isgrounding = ?, dishtype = ?, " +
                    " menutab = ?, dishdescription = ?, changetime = ?, " +
                    "dishurl = ? , menudetailurl = ? , isrecommend = ? ,dish_fk=?,depart_fk=?,scoville=? where id = ?;";
                sqlParams[sqlParams.length] = dishname;
                sqlParams[sqlParams.length] = standardprice;
                sqlParams[sqlParams.length] = presentprice;
                sqlParams[sqlParams.length] = dishcount;
                sqlParams[sqlParams.length] = isgrounding;
                sqlParams[sqlParams.length] = dishtype;
                sqlParams[sqlParams.length] = menutab;
                sqlParams[sqlParams.length] = dishdescription;
                sqlParams[sqlParams.length] = changetime;
                sqlParams[sqlParams.length] = imageurl;
                sqlParams[sqlParams.length] = menudetailurl;
                sqlParams[sqlParams.length] = isRecommendStr;
                sqlParams[sqlParams.length] = dish_fk;
                sqlParams[sqlParams.length] = departId;
                sqlParams[sqlParams.length] = scoville;
                sqlParams[sqlParams.length] = id;

                //console.log("修改菜品：", sqlCmd);
                //console.log("sqlParams语句：", sqlParams);

                Me.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                    if (err) {
                        console.log("update:", err);
                        Me.callbackFunction(err, results);
                    } else {
                        ep.emit("delete");
                    }
                });
            });
            ep.once('delete', function () {
                var menuid = id;
                var sqlCmd3 = "delete from menukey where menuid = ?;";
                var sqlDeletePic = "delete from menuphotos where menuid=?;";
                Me.sqlConn.query(sqlCmd3 + sqlDeletePic, [menuid, menuid], function (err3, results3) {
                    if (err3) {
                        console.log("delete:", err3);
                        Me.callbackFunction(err3, results3);
                    } else {
                        ep.emit("insert");
                    }
                });
            });
            ep.once('insert', function () {
                var sqlParams2 = [];
                var sqlCmd2 = "";
                var menuclass = dish_fk;
                sqlCmd2 += 'insert into menukey (menuclassid,menuid,createtime,menusequence) values (?,?,?,?);';
                sqlParams2[sqlParams2.length] = menuclass;
                sqlParams2[sqlParams2.length] = id;
                sqlParams2[sqlParams2.length] = changetime;
                sqlParams2[sqlParams2.length] = menusequence;
                //console.log("sqlCmd2语句：", sqlCmd2);
                //console.log("imgList：", imgList);
                var sqlImg = "insert into menuphotos (picId,picUrl,menuId,updateTime) values ";
                var parmasImg = [];
                for (var g = 0; g < imgList.length; g++) {
                    var imgUrl = imgList[g].substring(imgList[g].lastIndexOf("/") + 1, imgList[g].length);
                    var picId = id + "_" + (g + 1);
                    sqlImg += '("' + picId + '","' + imgUrl + '",' + id + ',"' + Date.parse(changetime) + '")';
                    if (g < imgList.length - 1) {
                        sqlImg += ",";
                    }
                }
                var sqlAll = sqlCmd2 + sqlImg + ";";
                //console.log("sqlAll：", sqlAll,sqlParams2);
                //console.log("sqlParams2语句：", sqlParams2);
                pool.getConnection(function (err, connection) {
                    if (err) {
                        console.error('mysql 连接失败');
                        Me.callbackFunction(err, null);
                    }
                    //开始事务
                    connection.beginTransaction(function (_err) {
                        if (_err) {
                            console.log("_err", _err);
                            throw _err;
                            Me.callbackFunction(_err, null);
                        }
                        connection.query(sqlAll, sqlParams2, function (__err, result1) {
                            if (__err) {
                                console.log("__err", __err);
                                connection.rollback(function () {
                                    throw __err;
                                });
                                Me.callbackFunction(__err, null);
                            }
                            connection.commit(function (____err) {
                                if (____err) {
                                    console.log("____err", ____err);
                                    connection.rollback(function () {
                                        throw ____err;
                                    });
                                    Me.callbackFunction(____err, null);
                                }
                                //console.log("success!");

                                connection.release();

                                Me.callbackFunction(null, true);
                            });
                        });
                    });
                });
            });
            ep.fail(function (err) {
                console.log('printErr:', err);
                return Me.callbackFunction(err);
            });

        },
        GetMenuKey: function () {
            //console.log("进入接口GetMenuKey");
            var Me, id, menuclasstype;
            Me = this;
            id = Me.GetParams("id");
            menuclasstype = Me.GetParams("menuclasstype");

            var sqlCmd = 'SELECT * FROM menukey LEFT JOIN menuclass ON menuclass.id = menukey.menuclassid WHERE menukey.menuid = ? AND menuclass.menuclasstype = ?;';

            //console.log("sqlCmd语句：", sqlCmd);

            this.sqlConn.query(sqlCmd, [id, menuclasstype], function (err, results) {
                if (err) {
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, results);
                }
            });
        },
        uploadImage: function () {
            //console.log("进入接口uploadImage");
            var Me, files, exceldir, temp_filename, temp_filepath, fullPath, file, ep, employeePath, filename, filename1;

            Me = this;

            var util = require('../libs/hcUti.js');
            var time = new Date();
            var _date = util.formatDate(time, "yyyyMMddhhmmssSS");

            filename = _date;

            files = Me.req.files;
            console.log("获取的参数为files：", Me.req.files);

            temp_filename = Me.req.body.Filename;
            temp_filepath = files[temp_filename].path;

            console.log("获取的参数为temp_filename1：", temp_filename);
            console.log("获取的参数为temp_filepath1：", temp_filepath);

            var path = require('path');
            var File = require('../libs/File');
            var EventProxy = require("eventproxy");

            employeePath = path.join(__dirname, '../../web/menuimage');
            temp_filename = temp_filename.substring(temp_filename.length - 4, temp_filename.length);
            if (temp_filename.lastIndexOf(".bmp") === -1 && temp_filename.lastIndexOf(".jpg") === -1 && temp_filename.lastIndexOf(".gif") === -1 && temp_filename.lastIndexOf(".png") === -1 && temp_filename.lastIndexOf(".jpeg") === -1) {
                var _err = "图片格式错误,请上传如下格式：*.bmp、*.jpg、*.png、*.jpeg";
                //console.log("报错：", _err);
                Me.callbackFunction(_err, null);
            } else {
                exceldir = employeePath;
                filename = filename + "." + temp_filename.split(".")[1];
                filename1 = filename;
                fullPath = File.joinfilePath([exceldir, filename]);
                console.log("完全路径：", fullPath);
                file = new File();
                ep = new EventProxy();
                file.loadFile(temp_filepath, null, ep.doneLater('loadFile'));
                ep.once('loadFile', function (result) {
                    if (result) {
                        return file.createFile(result, exceldir, fullPath, ep.doneLater('createFile'));
                    }
                });
                ep.once('createFile', function (result) {
                    if (result) {
                        //file.deleteFile(fullPath, 30 * 60 * 60 * 1000, function (_err, _result) {
                        //    if (_result) {
                        //        //return _callback(err, result);
                        //    } else {
                        //        return _callback(null, false);
                        //    }
                        //});

                        //console.log("获取的数据为：", result);
                        //此处将图片转换成流传到生产服务器 2017/2/14 LIUGANG
                        var fs = require('fs');
                        var http = require('http');
                        var filename = fullPath;
                        var medianame = temp_filename;
                        var mimes = {
                            //image
                            '.bmp': 'image/bmp',
                            '.png': 'image/png',
                            '.gif': 'image/gif',
                            '.jpg': 'image/jpeg',
                            '.jpeg': 'image/jpeg'
                        };
                        console.log('medianame:', medianame);
                        // ext = path.extname(medianame).toLowerCase();
                        var ext = medianame.toLowerCase();
                        console.log("ext:", ext);
                        var mime = mimes[ext];
                        console.log("mime:", mime);
//                        var mime='image/jpeg';
                        console.log(filename);
//                        var formData = {
//                            media: fs.createReadStream(filename)
//                        };
                        var boundary = 'tvmin';
                        var max = 9007199254740992;
                        var dec = Math.random() * max;
                        var hex = boundary + dec.toString(36);
                        var boundaryKey = '----WebKitFormBoundary' + hex;
                        var payload = '\r\n\r\n--' + boundaryKey + '\r\n'
                            + 'Content-Disposition: form-data; name="Filename"; filename="' + filename1 + '"\r\n'
                            // + 'Content-Type: ' + mime + '\r\n\r\n';
                            + 'Content-Type:application/octet-stream\r\n\r\n';
                        var enddata = '\r\n--' + boundaryKey + '--';
                        fs.readFile(filename, function (err, data) {
                            console.log('data', data.length);
                            //data=fs.createWriteStream(filename);
                            var contentLength = Buffer.byteLength(payload, 'utf8') + data.length + Buffer.byteLength(enddata, 'utf8');
                            var options = {
                                host: "huamantang.com.cn",
                                port: "3091",
                                method: 'POST',
                                //path: '/api/ManagementSystem/SynsImage?filename='+filename1,
                                path: '/upload',
                                headers: {
                                    'Content-Type': 'multipart/form-data; boundary=' + boundaryKey,
                                    'Content-Length': contentLength,
                                    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.31 (KHTML, like Gecko) Chrome/26.0.1410.43 Safari/537.31',
                                    'Cookie': this.cookie
                                }
                            };
                            console.log('options:', options);
                            var req = http.request(options, function (response) {
                                var statusCode = response.statusCode;
//        console.log('STATUS: ' + statusCode,options);
                                response.setEncoding('utf8');
                                var data1 = '';
                                response.on('data',function (chunk) {
                                    data1 += chunk;
                                }).on('end', function () {

                                        console.log('send end');
                                        console.log('data1', data1);
                                        if (data1 == 'received_upload') {
                                            var images = require("images");

                                            var filename_thumb = "thumb_" + filename1;

                                            fullPath_thumb = File.joinfilePath([exceldir, filename_thumb]);

                                            //console.log("缩略图的名称为filename_thumb：", filename_thumb);
                                            //console.log("缩略图的路径为fullPath_thumb：", fullPath_thumb);

                                            images(fullPath)                     //加载图像文件
                                                .size(200)                          //等比缩放图像到400像素宽
                                                .draw(images(fullPath), 200, 200)   //在(50,50)处绘制Logo
                                                .save(fullPath_thumb, {               //保存图片到文件,图片质量为50
                                                    quality: 50
                                                });

                                            Me.callbackFunction(null, fullPath);
                                        } else {
                                            Me.callbackFunction(true, null);
                                        }
                                    });
                            });
                            req.on('error', function (e) {
                                console.error("error:" + e);
                            });

                            req.write(payload, 'utf8');
                            req.write(data, 'binary');
                            req.write(enddata, 'utf8');
                            req.end();


                        });


                        /*
                         var images = require("images");

                         var filename_thumb = "thumb_" + filename;

                         fullPath_thumb = File.joinfilePath([exceldir, filename_thumb]);

                         //console.log("缩略图的名称为filename_thumb：", filename_thumb);
                         //console.log("缩略图的路径为fullPath_thumb：", fullPath_thumb);

                         images(fullPath)                     //加载图像文件
                         .size(200)                          //等比缩放图像到400像素宽
                         .draw(images(fullPath), 200, 200)   //在(50,50)处绘制Logo
                         .save(fullPath_thumb, {               //保存图片到文件,图片质量为50
                         quality: 50
                         });

                         Me.callbackFunction(null, fullPath);

                         */


                        //var from = images(fullPath);
                        //images(from, 0, 0, 400, 400) // 从input.jpg复制400x400的矩形区域
                        //    .size(100)                //等比缩放图像到100像素宽
                        //    .save(fullPath_thumb, {     //保存到output.jpg,图片质量为100
                        //        quality: 100
                        //    });


                    }
                });
                ep.fail(function (err) {
                    //console.log('err:' + JSON.stringify(err));
                    Me.callbackFunction(err, null);
                });
            }
        },

        GetMenu02: function () {
            //console.log("获取菜品");
            var Me, menuclassid, keyword, isgrounding, dishtype, start, limit, menutab;
            Me = this;
            menuclassid = this.GetParams('menuclassid');
            keyword = this.GetParams('keyword');
            isgrounding = this.GetParams('isgrounding');
            dishtype = this.GetParams('dishtype');
            menutab = JSON.parse(Me.GetParams('menutab'));
            start = this.GetParams("start");
            limit = this.GetParams("limit");

            var sqlCmd = "select menu.*,menukey.menusequence as menusequence,menuclass.menuclassname from menu " +
                "LEFT JOIN menukey ON menukey.menuid = menu.id " +
                "left join menuclass on menu.dish_fk=menuclass.id ";
            var sqlWhere = "where menu.dishtype in ( " + dishtype + " ) " +
                "AND isgrounding in ( " + isgrounding + " ) " +
                "and menu.id in ( select menuid from menukey where menuclassid = " + menuclassid + " ) " +
                "and menukey.menuclassid = " + menuclassid + " ";
            var sqlParams = [];

            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlWhere += "and ( dishname like ? ) ";
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }
            if (menutab.length > 0) {
                menutab = menutab.join() + ",";
                sqlWhere += " and ( menutab like ?) ";
                sqlParams[sqlParams.length] = "%" + menutab + "%";
            }

            sqlCmd = sqlCmd + sqlWhere + " order by menusequence desc limit " + start + "," + limit + ";";

            sqlCmd += "select count(menu.id) as totalCount from menu " +
                "LEFT JOIN menukey ON menukey.menuid = menu.id ";

            sqlCmd = sqlCmd + sqlWhere + ";";
            sqlParams[sqlParams.length] = "%" + menutab + "%";
            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            //console.log("sqlCmd语句：", sqlCmd);
            //console.log("sqlParams语句：", sqlParams);

            this.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    console.log(err);
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, {"totalCount": results[1][0].totalCount, 'topics': results[0]});
                }
            });
        },
        GetMenu03: function () {
            //console.log("进入接口GetMenu03");
            var Me, menuclassid, keyword, isgrounding, start, limit;
            Me = this;
            menuclassid = this.GetParams('menuclassid');
            keyword = this.GetParams('keyword');
            isgrounding = this.GetParams('isgrounding');

            start = this.GetParams("start");
            limit = this.GetParams("limit");


            var EventProxy = require("eventproxy");
            var ep = new EventProxy();

            var sqlCmd1 = "select * from menuclass where id = " + menuclassid + ";";

            //console.log("sqlCmd1语句：", sqlCmd1);

            Me.sqlConn.query(sqlCmd1, [], function (err1, result1) {
                if (err1) {
                    Me.callbackFunction(err1, result1);
                } else {
                    //console.log("获取的数据为：", result1[0]);
                    var menuclasstype = result1[0].menuclasstype;

                    var sqlCmd2 = "SELECT * FROM menu ";
                    var sqlWhere2 = "WHERE dishtype = " + menuclasstype + " " +
                        "AND isgrounding in ( " + isgrounding + " ) " +
                        "AND id not in ( " +
                        "SELECT menu.id FROM menu LEFT JOIN menukey ON menukey.menuid = menu.id WHERE menukey.menuclassid = " + menuclassid + " " +
                        ") ";

                    // 关键字查询
                    if (keyword != "" && keyword != undefined) {
                        sqlWhere2 += "AND ( dishname like '%" + keyword + "%' ) ";
                    }

                    sqlCmd2 = sqlCmd2 + sqlWhere2 + " order by changetime desc limit " + start + "," + limit + ";";

                    sqlCmd2 += "select count(menu.id) as totalCount from menu ";
                    sqlCmd2 = sqlCmd2 + sqlWhere2 + ";";

                    //console.log("sqlCmd2语句：", sqlCmd2);

                    Me.sqlConn.query(sqlCmd2, [], function (err2, result2) {
                        if (err2) {
                            Me.callbackFunction(err2, result2);
                        } else {
                            Me.callbackFunction(err2, {"totalCount": result2[1][0].totalCount, 'topics': result2[0]});
                        }
                    });
                }
            });

        },

        AddMenuSequence: function () {
            //console.log("进入接口AddMenuSequence");
            var Me, menuclassid, menuid, menusequence;
            Me = this;
            menuclassid = Me.GetParams("menuclassid");
            menuid = Me.GetParams("menuid");
            menusequence = Me.GetParams("menusequence");

            var sqlParams = [];
            var sqlCmd = "update menukey set menusequence = ? where menuclassid = ? and menuid = ?;";
            sqlParams[sqlParams.length] = menusequence;
            sqlParams[sqlParams.length] = menuclassid;
            sqlParams[sqlParams.length] = menuid;

            //console.log("sqlCmd语句：", sqlCmd);
            //console.log("sqlParams语句：", sqlParams);

            Me.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, results);
                }
            });
        },

        GetTask: function () {
            //console.log("订单数量");
            var Me, startdate, enddate, keyword, taskstatus, tasktype, start, limit, tableid;
            Me = this;
            startdate = this.GetParams('startdate');
            enddate = this.GetParams('enddate');
            keyword = this.GetParams('keyword');
            taskstatus = this.GetParams('taskstatus');
            tasktype = this.GetParams('tasktype');
            tableid = Me.GetParams('tableid');
            start = this.GetParams("start");
            limit = this.GetParams("limit");

            startdate = startdate + " 00:00:00";
            enddate = enddate + " 23:59:59";

            var sqlCmd = "select * from task ";
            var sqlWhere = "where tasktype in (" + tasktype + ") ";
            var sqlParams = [];

            if (taskstatus != "" && taskstatus != null && taskstatus != undefined) {
                sqlWhere += "and taskstatus in ( " + taskstatus + " ) ";
            }
            if (tableid && tableid !== "全部") {
                sqlWhere += " and tableid='" + tableid + "'";
            }
            //菜单内容修改时间
            if (startdate) {
                if (tasktype == 4) {
                    sqlWhere += "and ordertabletime>='" + startdate + "' ";
                } else {
                    sqlWhere += "and ordertime >= '" + startdate + "' ";
                }
            }

            if (enddate) {
                if (tasktype == 4) {
                    sqlWhere += "and ordertabletime<='" + enddate + "' ";
                } else {
                    sqlWhere += "and ordertime <= '" + enddate + "' ";
                }
            }

            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlWhere += "and ( id like ? " +
                    " or pOrder like ?" +
                    " or realname like ?" +
                    ") ";
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            sqlCmd = sqlCmd + sqlWhere + " order by ordertime desc limit " + start + "," + limit + ";";

            sqlCmd += "select count(id) as totalCount from task ";

            sqlCmd = sqlCmd + sqlWhere + ";";

            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            //console.log("sqlCmd语句：", sqlCmd);
            //console.log("sqlParams语句：", sqlParams);

            this.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    console.log(err);
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, {"totalCount": results[1][0].totalCount, 'topics': results[0]});
                }
            });
        },
        GetTask02: function () {
            //console.log("进入接口GetTask02");
            var Me, startdate, enddate, keyword, taskstatus, tasktype, start, limit;
            Me = this;
            startdate = this.GetParams('startdate');
            enddate = this.GetParams('enddate');
            keyword = this.GetParams('keyword');
            taskstatus = this.GetParams('taskstatus');
            tasktype = this.GetParams('tasktype');

            start = this.GetParams("start");
            limit = this.GetParams("limit");

            startdate = startdate + " 00:00:00";
            enddate = enddate + " 23:59:59";

            var sqlCmd = "select * from task ";
            var sqlWhere = "where tasktype = " + tasktype + " ";
            var sqlParams = [];

            if (taskstatus != "" && taskstatus != null && taskstatus != undefined) {
                sqlWhere += "and taskstatus in ( " + taskstatus + " ) ";
            }

            //菜单内容修改时间
            if (startdate) {
                sqlWhere += "and ordertime >= '" + startdate + "' ";
            }

            if (enddate) {
                sqlWhere += "and ordertime <= '" + enddate + "' ";
            }

            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlWhere += "and ( id like ? ) ";
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            sqlCmd = sqlCmd + sqlWhere + " order by ordertime desc limit " + start + "," + limit + ";";

            sqlCmd += "select count(id) as totalCount from task ";

            sqlCmd = sqlCmd + sqlWhere + ";";

            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            //console.log("sqlCmd语句：", sqlCmd);
            //console.log("sqlParams语句：", sqlParams);

            this.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, {"totalCount": results[1][0].totalCount, 'topics': results[0]});
                }
            });
        },

        GetUser: function () {
            //console.log("进入接口GetUser");
            var Me, keyword, userclass, start, limit;
            Me = this;
            keyword = this.GetParams('keyword');
            userclass = this.GetParams('userclass');

            start = this.GetParams("start");
            limit = this.GetParams("limit");

            //startdate = startdate + " 00:00:00";
            //enddate = enddate + " 23:59:59";

            var sqlCmd = "select * from `user` ";
            var sqlWhere = "where userclass = " + userclass + " ";
            var sqlParams = [];

            //if (startdate) {
            //    sqlWhere += "and ordertime >= '" + startdate + "' ";
            //}
            //
            //if (enddate) {
            //    sqlWhere += "and ordertime <= '" + enddate + "' ";
            //}

            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlWhere += "and ( username like ? " +
                    " or realname like ? " +
                    " or mobile like ? ) ";
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            sqlCmd = sqlCmd + sqlWhere + " order by id desc limit " + start + "," + limit + ";";

            sqlCmd += "select count(id) as totalCount from `user` ";

            sqlCmd = sqlCmd + sqlWhere + ";";

            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            //console.log("sqlCmd语句：", sqlCmd);
            //console.log("sqlParams语句：", sqlParams);

            this.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    console.log(err);
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, {"totalCount": results[1][0].totalCount, 'topics': results[0]});
                }
            });
        },
        AddUser: function () {
            //console.log("进入接口AddUser");
            var Me, username, password, realname,
                userclass, mobile, rolestr;
            Me = this;
            username = Me.GetParams("username");
            password = Me.GetParams("password");
            realname = Me.GetParams("realname");
            userclass = Me.GetParams("userclass");
            mobile = Me.GetParams("mobile");
            rolestr = Me.GetParams("rolestr");

            var sqlParams = [];
            var sqlCmd = "select * from `user` where username = ?;";
            sqlParams[sqlParams.length] = username;

            //console.log("sqlCmd语句：", sqlCmd);
            //console.log("sqlParams语句：", sqlParams);

            this.sqlConn.query(sqlCmd, sqlParams, function (_err, _results) {
                if (_err) {
                    Me.callbackFunction(_err, _results);
                } else {
                    if (_results.length > 0) {
                        Me.callbackFunction(Me.errors.DuplicateUser, null);
                    } else {
                        var sqlParams2 = [];
                        var sqlCmd2 = "insert into `user` (username,password,realname,userclass,mobile,rolestr) values (?,?,?,?,?,?);";
                        sqlParams2[sqlParams2.length] = username;
                        sqlParams2[sqlParams2.length] = password;
                        sqlParams2[sqlParams2.length] = realname;
                        sqlParams2[sqlParams2.length] = userclass;
                        sqlParams2[sqlParams2.length] = mobile;
                        sqlParams2[sqlParams2.length] = rolestr;
                        //console.log("查询语句1：", sqlCmd2);
                        //console.log("查询语句2：", sqlParams2);
                        Me.sqlConn.query(sqlCmd2, sqlParams2, Me.callbackFunction);
                    }
                }
            });
        },
        EditUser: function () {
            //console.log("进入接口EditUser");
            var Me, username, password, realname,
                userclass, mobile, rolestr;
            Me = this;
            username = Me.GetParams("username");
            password = Me.GetParams("password");
            realname = Me.GetParams("realname");
            userclass = Me.GetParams("userclass");
            mobile = Me.GetParams("mobile");
            rolestr = Me.GetParams("rolestr");
            var sqlParams = [];
            var sqlCmd = "";
            if (password != "") {
                sqlCmd = "update `user` set realname = ? ,userclass = ? ,mobile = ? ,rolestr = ? ,password = ? where username = ? ;";
                sqlParams[sqlParams.length] = realname;
                sqlParams[sqlParams.length] = userclass;
                sqlParams[sqlParams.length] = mobile;
                sqlParams[sqlParams.length] = rolestr;
                sqlParams[sqlParams.length] = password;
                sqlParams[sqlParams.length] = username;
            } else {
                sqlCmd = "update `user` set realname = ? ,userclass = ? ,mobile = ? ,rolestr = ? where username = ? ;";
                sqlParams[sqlParams.length] = realname;
                sqlParams[sqlParams.length] = userclass;
                sqlParams[sqlParams.length] = mobile;
                sqlParams[sqlParams.length] = rolestr;
                sqlParams[sqlParams.length] = username;
            }

            //console.log("查询语句1：", sqlCmd);
            //console.log("查询语句2：", sqlParams);
            Me.sqlConn.query(sqlCmd, sqlParams, Me.callbackFunction);
        },
        DelUser: function () {
            //console.log("进入接口DelUser");
            var Me, id;
            Me = this;
            id = Me.GetParams("id");
            var sqlCmd = "delete from `user` where id = ? ;";
            Me.sqlConn.query(sqlCmd, [id], Me.callbackFunction);
        },

        AddMenuToMenuClass: function () {
            //console.log("进入接口AddMenuToMenuClass");
            var Me, ids, menuclassid, changetime;
            Me = this;
            ids = JSON.parse(Me.GetParams("ids"));
            menuclassid = Me.GetParams("menuclassid");

            //console.log("获取的数据为：", [ids, menuclassid]);

            var hcUti = require("../libs/hcUti");
            changetime = hcUti.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");

            var sqlParams = [];
            var sqlCmd = "";

            for (var i = 0; i < ids.length; i++) {
                sqlCmd += 'insert into menukey (menuclassid,menuid,createtime) values (?,?,?);';
                sqlParams[sqlParams.length] = menuclassid;
                sqlParams[sqlParams.length] = ids[i];
                sqlParams[sqlParams.length] = changetime;
            }

            //console.log("sqlCmd语句为：", sqlCmd);
            //console.log("sqlParams的数据为：", sqlParams);

            Me.sqlConn.query(sqlCmd, sqlParams, Me.callbackFunction);
        },
        DeleteMenuFromMenuClass: function () {
            //console.log("进入接口DeleteMenuFromMenuClass");
            var Me, ids, menuclassid;
            Me = this;
            ids = Me.GetParams("ids");
            menuclassid = Me.GetParams("menuclassid");

            //console.log("获取的数据为：", [ids, menuclassid]);

            var sqlParams = [];
            var sqlCmd = "";

            sqlCmd = "delete from menukey where menuid in ( ? ) and menuclassid = ?;";

            sqlParams[sqlParams.length] = ids;
            sqlParams[sqlParams.length] = menuclassid;

            //console.log("sqlCmd语句为：", sqlCmd);
            //console.log("sqlParams的数据为：", sqlParams);

            Me.sqlConn.query(sqlCmd, sqlParams, Me.callbackFunction);
        },
        GetTaskMenu: function () {
            //console.log("进入接口GetTaskMenu");
            var Me, taskid;
            Me = this;
            taskid = Me.GetParams("taskid");

            var sqlCmd = "select * from evaluation where taskid = " + taskid + ";";

            //console.log("sqlCmd语句为：", sqlCmd);

            Me.sqlConn.query(sqlCmd, [], Me.callbackFunction);

        },
        TaskPrint: function () {//订单打印
            //console.log("进入接口TaskPrint");
            var Me, id;
            Me = this;
            id = Me.GetParams("id");

            var _sqlCmd = "select * from task where id = " + id + " and taskstatus = 1;";

            var EventProxy = require("eventproxy");
            var ep = new EventProxy();

            Me.sqlConn.query(_sqlCmd, [], ep.done("FindTask"));

            ep.once("FindTask", function (result) {
                if (result.length > 0) {

                    var sqlCmd = "update task set taskstatus = " + 2 + " where id = " + id + ";";

                    //console.log("sqlCmd语句为：", sqlCmd);

                    Me.sqlConn.query(sqlCmd, [], Me.callbackFunction);

                } else {
                    Me.callbackFunction(Me.errors.NoTask, null);
                }
            });

            ep.fail(function (err) {
                //console.log('err:' + JSON.stringify(err));
                Me.callbackFunction(err, null);
            });
        },
        TaskDeliveryIn: function () {//订单派送
            //console.log("进入接口TaskDeliveryIn");
            var Me, id;
            Me = this;
            id = Me.GetParams("id");

            var _sqlCmd = "select * from task where id = " + id + " and taskstatus = 2;";

            var EventProxy = require("eventproxy");
            var ep = new EventProxy();

            Me.sqlConn.query(_sqlCmd, [], ep.done("FindTask"));

            ep.once("FindTask", function (result) {
                if (result.length > 0) {

                    var sqlCmd = "update task set taskstatus = " + 3 + " where id = " + id + ";";

                    //console.log("sqlCmd语句为：", sqlCmd);

                    Me.sqlConn.query(sqlCmd, [], Me.callbackFunction);

                } else {
                    Me.callbackFunction(Me.errors.NoTask02, null);
                }
            });

            ep.fail(function (err) {
                //console.log('err:' + JSON.stringify(err));
                Me.callbackFunction(err, null);
            });

        },
        TaskComplete: function () {//订单完成
            //console.log("进入接口TaskComplete");
            var Me, id;
            Me = this;
            id = Me.GetParams("id");

            var _sqlCmd = "select * from task where id = " + id + " and taskstatus = 3;";

            var EventProxy = require("eventproxy");
            var ep = new EventProxy();

            Me.sqlConn.query(_sqlCmd, [], ep.done("FindTask"));

            ep.once("FindTask", function (result) {
                if (result.length > 0) {

                    var sqlCmd = "update task set taskstatus = " + 4 + " where id = " + id + ";";

                    //console.log("sqlCmd语句为：", sqlCmd);

                    Me.sqlConn.query(sqlCmd, [], Me.callbackFunction);

                } else {
                    Me.callbackFunction(Me.errors.NoTask03, null);
                }
            });

            ep.fail(function (err) {
                //console.log('err:' + JSON.stringify(err));
                Me.callbackFunction(err, null);
            });

        },
        TaskCancel: function () {
            //console.log("订单取消");
            var Me, id;
            Me = this;
            id = Me.GetParams("id");

            var _sqlCmd = "select * from task where id = " + id + " and paymethod = 0;";

            var EventProxy = require("eventproxy");
            var ep = new EventProxy();

            Me.sqlConn.query(_sqlCmd, [], ep.done("FindTask"));

            ep.once("FindTask", function (result) {
                if (result.length > 0) {
                    try {
                        var dishids = JSON.parse(result[0].dishids);//订单点的菜品
                    } catch (err) {
                        Me.callbackFunction(err, null);
                    }

                    var sqlCmd = "",
                        sqlCmdTask = '',
                        sqlAll = '';
                    if (result[0].tasktype == 1 && result[0].id == result[0].pOrder) {//如果是堂食，取消订单下的所有服务和加菜
                        sqlCmdTask = 'update task set taskstatus=-1 where pOrder=' + id + ';';
                    } else {
                        sqlCmdTask = "update task set taskstatus =-1 where id = " + id + ";";
                    }

                    sqlCmd += "update evaluation set code = -1 where taskid = " + id + ";";
                    if (dishids && dishids.length > 0) {
                        for (var i = 0; i < dishids.length; i++) {
                            sqlCmd += "update menu set dishcount = dishcount + " + dishids[i].menucount + ", sellcount = sellcount - " + dishids[i].menucount + " where id = " + dishids[i].menuid + ";";
                        }
                    }

                    sqlAll = sqlCmd + sqlCmdTask;
                    console.log("sqlCmd语句为：", sqlAll);

                    pool.getConnection(function (err, connection) {
                        if (err) {
                            //console.error('mysql 连接失败');
                            Me.callbackFunction(err, null);
                        }

                        //开始事务
                        connection.beginTransaction(function (_err) {
                            if (_err) {
                                throw _err;
                                Me.callbackFunction(_err, null);
                            }
                            connection.query(sqlAll, function (__err, result1) {
                                //console.log("进入sqlCmd");
                                if (__err) {
                                    connection.rollback(function () {
                                        throw __err;
                                    });
                                    Me.callbackFunction(__err, null);
                                }
                                connection.commit(function (____err) {
                                    //console.log("进入commit");
                                    if (____err) {
                                        connection.rollback(function () {
                                            throw ____err;
                                        });
                                        Me.callbackFunction(____err, null);
                                    }
                                    //console.log("success!");

                                    connection.release();

                                    Me.callbackFunction(null, true);
                                });
                            });
                        });
                    });

                } else {
                    Me.callbackFunction(Me.errors.NoTaskPayment, null);
                }
            });

            ep.fail(function (err) {
                //console.log('err:' + JSON.stringify(err));
                Me.callbackFunction(err, null);
            });
        },
        PaymentTaskDetail: function () {//现金支付
            //console.log("进入接口PaymentTaskDetail");
            var Me, id, cashpayment;
            Me = this;
            id = Me.GetParams("id");
            cashpayment = Me.GetParams("cashpayment");

            var _sqlCmd = "select * from task where id = " + id + " and paymethod = 0;";

            //console.log("_sqlCmd语句为：", _sqlCmd);

            var EventProxy = require("eventproxy");
            var ep = new EventProxy();

            Me.sqlConn.query(_sqlCmd, [], ep.done("FindTask"));

            ep.once("FindTask", function (result) {
                if (result.length > 0) {

                    var sqlCmd = "update task set paymethod = 2 , cashpayment = " + cashpayment + " where id = " + id + ";";

                    //console.log("sqlCmd语句为：", sqlCmd);

                    Me.sqlConn.query(sqlCmd, [], ep.done("UpdateTaskPayMethod"));

                } else {
                    Me.callbackFunction(Me.errors.NoPaymentTaskDetail, null);
                }
            });

            ep.once("UpdateTaskPayMethod", function (result) {
                if (result) {
                    Me.callbackFunction(null, result);
                }
            });

            ep.fail(function (err) {
                //console.log('err:' + JSON.stringify(err));
                Me.callbackFunction(err, null);
            });
        },
        GetTaskListCount: function () {
            //console.log("任务数量");
            var Me, taskstatus, tasktype;
            Me = this;
            taskstatus = this.GetParams('taskstatus');
            tasktype = this.GetParams('tasktype');

            var sqlCmd = "select * from task ";
            var sqlWhere = "where tasktype in ( " + tasktype + " ) ";
            var ordertime_s = hcUti.formatDate(new Date(), "yyyy-MM-dd") + " 00:00:00";
            var ordertime_e = hcUti.formatDate(new Date(), "yyyy-MM-dd") + " 23:59:59";
            var sqlCmdDW = "select * from task where tasktype=4 and taskstatus in (" + taskstatus + ") and ordertabletime>='" + ordertime_s + "' and ordertabletime<='" + ordertime_e + "' order by id desc;";
            var sqlCmdAll = "select * from task where tasktype in (1,2,3) and taskstatus in (" + taskstatus + ") and ordertime>='" + ordertime_s + "' and ordertime<='" + ordertime_e + "' order by id desc;";

            sqlCmd = sqlCmdDW + sqlCmdAll;
            //console.log("sqlCmd语句：", sqlCmd);
            this.sqlConn.query(sqlCmd, [], function (err, results) {
                if (err) {
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, results);
                }
            });
        },
        GetTableOrderSetting: function () {
            //console.log("进入接口GetTableOrderSetting");
            var Me, settingstype;
            Me = this;
            settingstype = Me.GetParams('settingstype');

            var sqlCmd = "select * from settings where settingstype in ( " + settingstype + " ) ";

            //console.log("sqlCmd语句：", sqlCmd);

            Me.sqlConn.query(sqlCmd, [], function (err, results) {
                if (err) {
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, results);
                }
            });
        },
        AddTableOrderSetting: function () {
            //console.log("进入接口AddTableOrderSetting");
            var Me, fourtablecount, sixtablecount, boxtablecount, lunchstarttime, lunchendtime, dinnerstarttime, dinnerendtime,
                spanlimitstime, type, settingstype;
            Me = this;
            fourtablecount = Me.GetParams('fourtable');
            sixtablecount = Me.GetParams('sixtable');
            boxtablecount = Me.GetParams('baojian');
            lunchstarttime = Me.GetParams('lunchstarttime');
            lunchendtime = Me.GetParams('lunchendtime');
            dinnerstarttime = Me.GetParams('dinnerstarttime');
            dinnerendtime = Me.GetParams('dinnerendtime');
            spanlimitstime = Me.GetParams('spanday');
            type = Me.GetParams('type');
            settingstype = Me.GetParams('settingstype');
            var sqlCmd = "";
            var sqlParams = [];

            if (type == 0) {//第一次设置

                sqlCmd = "insert into settings (fourtablecount, sixtablecount, boxtablecount, " +
                    "lunchstarttime, lunchendtime, dinnerstarttime, dinnerendtime,  spanlimitstime, settingstype" +
                    ") values (?,?,?,?,?,?,?,?,?,?,?,?);";

                sqlParams[sqlParams.length] = fourtablecount;
                sqlParams[sqlParams.length] = sixtablecount;
                sqlParams[sqlParams.length] = boxtablecount;
                sqlParams[sqlParams.length] = lunchstarttime;
                sqlParams[sqlParams.length] = lunchendtime;
                sqlParams[sqlParams.length] = dinnerstarttime;
                sqlParams[sqlParams.length] = dinnerendtime;
                sqlParams[sqlParams.length] = spanlimitstime;
                sqlParams[sqlParams.length] = settingstype;

            } else {

                sqlCmd = "update settings set fourtablecount = ?, sixtablecount = ?, boxtablecount = ?, " +
                    "lunchstarttime = ?, lunchendtime = ?, dinnerstarttime = ?, dinnerendtime = ?,  spanlimitstime = ? where settingstype = ?;";

                sqlParams[sqlParams.length] = fourtablecount;
                sqlParams[sqlParams.length] = sixtablecount;
                sqlParams[sqlParams.length] = boxtablecount;
                sqlParams[sqlParams.length] = lunchstarttime;
                sqlParams[sqlParams.length] = lunchendtime;
                sqlParams[sqlParams.length] = dinnerstarttime;
                sqlParams[sqlParams.length] = dinnerendtime;
                sqlParams[sqlParams.length] = spanlimitstime;
                sqlParams[sqlParams.length] = settingstype;

            }

            //console.log("sqlCmd语句为：", sqlCmd);
            //console.log("sqlParams数据为：", sqlParams);

            Me.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, results);
                }
            });
        },
//        deleteTableSetting:function(){
//            var Me=this;
//            var sqlCmd="delete from settings where settingstype=1;";
//            Me.sqlConn.query(sqlCmd,[],function(err,result){
//                if(err){
//                    Me.callbackFunction(err,null)
//                }else{
//                    Me.callbackFunction(null,result);
//                }
//            })
//        },
        AddTableOrderSetting02: function () {
            //console.log("进入接口AddTableOrderSetting02");
            var Me, lunchstarttime, lunchendtime, dinnerstarttime, dinnerendtime, settingstype, type;
            Me = this;
            lunchstarttime = Me.GetParams('lunchstarttime');
            lunchendtime = Me.GetParams('lunchendtime');
            dinnerstarttime = Me.GetParams('dinnerstarttime');
            dinnerendtime = Me.GetParams('dinnerendtime');
            settingstype = Me.GetParams('settingstype');
            type = Me.GetParams('type');

            var sqlCmd = "";
            var sqlParams = [];

            if (type == 0) {//第一次设置

                sqlCmd = "insert into settings (lunchstarttime, lunchendtime, dinnerstarttime, dinnerendtime, settingstype) values (?,?,?,?,?);";

                sqlParams[sqlParams.length] = lunchstarttime;
                sqlParams[sqlParams.length] = lunchendtime;
                sqlParams[sqlParams.length] = dinnerstarttime;
                sqlParams[sqlParams.length] = dinnerendtime;
                sqlParams[sqlParams.length] = settingstype;

            } else {

                sqlCmd = "update settings set lunchstarttime = ?, lunchendtime = ?, dinnerstarttime=?,dinnerendtime=? where settingstype = ?;";

                sqlParams[sqlParams.length] = lunchstarttime;
                sqlParams[sqlParams.length] = lunchendtime;
                sqlParams[sqlParams.length] = dinnerstarttime;
                sqlParams[sqlParams.length] = dinnerendtime;
                sqlParams[sqlParams.length] = settingstype;

            }

            //console.log("sqlCmd语句为：", sqlCmd);
            //console.log("sqlParams数据为：", sqlParams);

            Me.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, results);
                }
            });
        },
        GetDishStatistics: function () {
            //console.log("菜品统计");查出所有菜品，对比task表统计数量
            var Me, startdate, enddate, keyword, dishtype;
            Me = this;
            startdate = this.GetParams('startdate');
            enddate = this.GetParams('enddate');
            keyword = this.GetParams('keyword');
            dishtype = this.GetParams('dishtype');

            startdate = startdate + " 00:00:00";
            enddate = enddate + " 23:59:59";

            var sqlCmd = "select * from view_evaluation_menu_menuclass ";
            var sqlWhere = "where menu_dishtype in (" + dishtype + ") ";
            var sqlParams = [];

            if (startdate) {
                sqlWhere += "and createtime >= '" + startdate + "' ";
            }

            if (enddate) {
                sqlWhere += "and createtime <= '" + enddate + "' ";
            }

            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlWhere += "and ( menu_dishname like ? ) ";
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            sqlCmd = sqlCmd + sqlWhere + ";";

//            var sqlCmd2 = "select * from menu ";
//            var sqlWhere2 = "where dishtype in ( " + dishtype + " ) ";
//
//            // 关键字查询
//            if (keyword != "" && keyword != undefined) {
//                sqlWhere2 += "and ( dishname like ? ) ";
//                sqlParams[sqlParams.length] = '%' + keyword + '%';
//            }
//
//            sqlCmd2 = sqlCmd2 + sqlWhere2 + ";";

            //console.log("sqlCmd+sqlCmd2语句：", sqlCmd );
            //console.log("sqlParams语句：", sqlParams);

            Me.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    Me.callbackFunction(err, results);
                } else {
//                    console.log('result:',results);
                    Me.callbackFunction(err, results);
                }
            });
        },
        GetDishStatisticsExcelUrl: function () {
            //console.log("进入接口GetDishStatisticsExcelUrl");
            var Me, startdate, enddate, keyword, dishtype, filename;
            Me = this;
            startdate = this.GetParams('startdate');
            enddate = this.GetParams('enddate');
            keyword = this.GetParams('keyword');
            dishtype = this.GetParams('dishtype');
            filename = this.GetParams('filename');
            startdate = startdate + " 00:00:00";
            enddate = enddate + " 23:59:59";

            var sqlCmd = "select * from view_evaluation_menu_menuclass ";
            var sqlWhere = "where menu_dishtype in (" + dishtype + ") ";
            var sqlParams = [];

            if (startdate) {
                sqlWhere += "and createtime >= '" + startdate + "' ";
            }

            if (enddate) {
                sqlWhere += "and createtime <= '" + enddate + "' ";
            }

            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlWhere += "and ( menu_dishname like ? ) ";
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            sqlCmd = sqlCmd + sqlWhere + ";";

//            var sqlCmd2 = "select * from menu ";
//            var sqlWhere2 = "where dishtype in ( " + dishtype + " ) ";
//
//            // 关键字查询
//            if (keyword != "" && keyword != undefined) {
//                sqlWhere2 += "and ( dishname like ? ) ";
//                sqlParams[sqlParams.length] = '%' + keyword + '%';
//            }
//
//            sqlCmd2 = sqlCmd2 + sqlWhere2 + ";";

            //console.log("sqlCmd+sqlCmd2语句：", sqlCmd);
            //console.log("sqlParams语句：", sqlParams);

            this.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    console.log("excel:", err);
                    Me.callbackFunction(err, results);
                } else {

                    //console.log("获取的数据为：", results);
                    var recordData = results;
                    var excel = "";
                    excel = [
                        ['菜品名称', '分类名称', '菜品类型', '数量']
                    ];
                    for (var i = 0; i < recordData.length; i++) {
                        var rec = [];
                        var dishtype = recordData[i].menu_dishtype;
                        var dishtypeName = "";
                        if (dishtype == 1) {
                            dishtypeName = "堂食";
                        } else if (dishtype == 2) {
                            dishtypeName = "外卖";
                        } else if (dishtype == 3) {
                            dishtypeName = "食杂铺"
                        }
                        rec[rec.length] = recordData[i].dishname;
                        rec[rec.length] = recordData[i].menuclassname;
                        rec[rec.length] = dishtypeName;
                        rec[rec.length] = recordData[i].menu_sellcount || 0;
                        excel[excel.length] = rec;
                    }
//                    excel = [["菜品ID", "菜品名称", "菜品类型", "数量", "现价", "销售金额", "菜单总销售金额", "占菜单总销售额度比", "总营收额", "占总营收额比"]];

//                    var EvaluationData = results[0];//菜品销售数据
//
//                    var MenuData = results[1];//菜品数据
//
//                    var TotalAmount = 0;//总营收金额
//                    var TotalAmountRate = 0;//总营收金额比
//
//                    var MenuSalesAmount = 0;//菜品销售金额
//                    var MenuSalesAmountRate = 0;//菜品销售金额比
//                    for (var k = 0; k < EvaluationData.length; k++) {
//
//                        var kData = EvaluationData[k];
//
//                        TotalAmount += kData.menucount * kData.presentprice;
//
//                        if (kData.menu_dishtype == dishtype) {
//
//                            MenuSalesAmount += kData.menucount * kData.presentprice;
//
//                        }
//
//                    }
//
//                    for (var j = 0; j < MenuData.length; j++) {
//
//                        var jData = MenuData[j];
//
//                        var SalesCount = 0;//销售数量
//                        var SalesAmount = 0;//销售金额
//                        //var MenuSalesAmount = 0;//菜品销售金额
//                        //var MenuSalesAmountRate = 0;//菜品销售金额比
//
//                        for (var i = 0; i < EvaluationData.length; i++) {
//
//                            var iData = EvaluationData[i];
//
//                            if (jData.id == iData.menuid && iData.menu_dishtype == dishtype) {
//
//                                SalesCount += iData.menucount;
//
//                                SalesAmount += iData.menucount * iData.presentprice;
//
//                            }
//
//                        }
//
//                        if (MenuSalesAmount != 0) {
//
//                            MenuSalesAmountRate = (SalesAmount / MenuSalesAmount).toFixed(2);
//
//                        }
//
//                        if (TotalAmount != 0) {
//
//                            TotalAmountRate = (SalesAmount / TotalAmount).toFixed(2);
//
//                        }
//
//                        var arr = [];
//
//                        arr[arr.length] = jData.id;
//                        arr[arr.length] = jData.dishname;
//
//                        var DishType = jData.dishtype;
//                        var _DishType = "";
//                        if (DishType == 1) {
//                            _DishType = "堂食";
//                        } else if (DishType == 2) {
//                            _DishType = "外卖";
//                        } else if (DishType == 3) {
//                            _DishType = "杂食";
//                        }
//                        arr[arr.length] = _DishType;
//
//                        arr[arr.length] = SalesCount;
//                        arr[arr.length] = jData.presentprice;
//                        arr[arr.length] = SalesAmount;
//                        arr[arr.length] = MenuSalesAmount;
//                        arr[arr.length] = MenuSalesAmountRate;
//                        arr[arr.length] = TotalAmount;
//                        arr[arr.length] = TotalAmountRate;
//
//                        excel[excel.length] = arr;
//
//                    }

                    //console.log("excel数据：", excel);

                    var xlsx2 = require("../libs/xlsx2");
                    var settings = require('../../settings');
                    var excelDir = settings.excelDir;
                    console.log("dir:" + excelDir);
                    xlsx2.createExcelUrl(filename, excel, excelDir, function (err, result) {
                        if (err) {
                            console.log("错误::：" + err);
                            Me.callbackFunction(err, result);
                        } else {
                            var employeePath = path.join(__dirname, '../../web/excel/');
                            var fullPath = File.joinfilePath([employeePath + filename + ".xlsx"]);
                            console.log("全局路径", fullPath);
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

                }
            });
        },
        GetOrderStatistics: function () {
            //console.log("进入接口GetOrderStatistics");
            var Me, startdate, enddate, keyword, tasktype, taskstatus, paymethod, start, limit;
            Me = this;
            startdate = this.GetParams('startdate');
            enddate = this.GetParams('enddate');
            keyword = this.GetParams('keyword');
            tasktype = this.GetParams('tasktype');
            taskstatus = this.GetParams('taskstatus');
            paymethod = this.GetParams('paymethod');

            start = this.GetParams("start");
            limit = this.GetParams("limit");

            startdate = startdate + " 00:00:00";
            enddate = enddate + " 23:59:59";

            var sqlCmd = "select * from task ";
            var sqlWhere = "where tasktype in ( " + tasktype + " ) " +
                "and taskstatus in ( " + taskstatus + " ) " +
                "and paymethod in ( " + paymethod + " ) ";
            var sqlParams = [];

            if (startdate) {
                sqlWhere += "and ordertime >= '" + startdate + "' ";
            }

            if (enddate) {
                sqlWhere += "and ordertime <= '" + enddate + "' ";
            }

            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlWhere += "and ( id like ? ) ";
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            sqlCmd = sqlCmd + sqlWhere + " order by ordertime desc limit " + start + "," + limit + ";";

            sqlCmd += "select count(id) as totalCount from task ";

            sqlCmd = sqlCmd + sqlWhere + ";";

            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            //console.log("sqlCmd语句：", sqlCmd);
            //console.log("sqlParams语句：", sqlParams);

            this.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, {"totalCount": results[1][0].totalCount, 'topics': results[0]});
                }
            });
        },
        GetOrderStatisticsExcelUrl: function () {
            //console.log("进入接口GetOrderStatisticsExcelUrl");
            var Me, startdate, enddate, keyword, filename, tasktype, taskstatus, paymethod;
            Me = this;
            startdate = this.GetParams('startdate');
            enddate = this.GetParams('enddate');
            keyword = this.GetParams('keyword');
            tasktype = this.GetParams('tasktype');
            taskstatus = this.GetParams('taskstatus');
            paymethod = this.GetParams('paymethod');

            filename = this.GetParams('filename');

            startdate = startdate + " 00:00:00";
            enddate = enddate + " 23:59:59";

            var sqlCmd = "select * from task ";
            var sqlWhere = "where tasktype in ( " + tasktype + " ) " +
                "and taskstatus in ( " + taskstatus + " ) " +
                "and paymethod in ( " + paymethod + " ) ";
            var sqlParams = [];

            if (startdate) {
                sqlWhere += "and ordertime >= '" + startdate + "' ";
            }

            if (enddate) {
                sqlWhere += "and ordertime <= '" + enddate + "' ";
            }

            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlWhere += "and ( id like ? ) ";
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            sqlCmd = sqlCmd + sqlWhere + ";";

            //console.log("sqlCmd语句：", sqlCmd);
            //console.log("sqlParams语句：", sqlParams);

            this.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    Me.callbackFunction(err, results);
                } else {

                    //console.log("获取的数据为：", results);

                    var excel = "";
                    excel = [
                        ["订单号", "订单类型", "订单金额", "订单状态", "支付状态", "订餐时间"]
                    ];

                    for (var j = 0; j < results.length; j++) {

                        var jData = results[j];

                        var arr = [];

                        arr[arr.length] = jData.id;

                        var TaskType = jData.tasktype;
                        var _TaskType = "";
                        if (TaskType == 1) {
                            _TaskType = "堂食订单";
                        } else if (TaskType == 2) {
                            _TaskType = "外卖订单";
                        } else if (TaskType == 3) {
                            _TaskType = "杂食订单";
                        } else if (TaskType == 4) {
                            _TaskType = "订位订单";
                        } else if (TaskType == 5) {
                            _TaskType = "订位点餐订单";
                        }
                        arr[arr.length] = _TaskType;
                        arr[arr.length] = jData.sumoney;
                        var TaskStatus = jData.taskstatus;
                        var _TaskStatus = "";
                        if (TaskStatus == 1) {
                            _TaskStatus = "已下单";
                        } else if (TaskStatus == 2) {
                            _TaskStatus = "正在出单";
                        } else if (TaskStatus == 3) {
                            _TaskStatus = "派送中";
                        } else if (TaskStatus == 4) {
                            _TaskStatus = "订单完成";
                        } else if (TaskStatus == 5) {
                            _TaskStatus = "结账";
                        } else if (TaskStatus == -1) {
                            _TaskStatus = "订单取消";
                        }
                        arr[arr.length] = _TaskStatus;

                        var PayMethod = jData.paymethod;
                        var _PayMethod = "";
                        switch (parseInt(PayMethod)) {
                            case 0:
                                _PayMethod = "未支付";
                                break;
                            case 1:
                                _PayMethod = "微信支付";
                                break;
                            case 2:
                                _PayMethod = "现金支付";
                                break;
                            case 3:
                                _PayMethod = "会员卡支付";
                                break;
                            case 4:
                                _PayMethod = "银联支付";
                                break;
                            case 5:
                                _PayMethod = "支付宝支付";
                                break;
                        }
                        arr[arr.length] = _PayMethod;

                        arr[arr.length] = jData.ordertime;

                        excel[excel.length] = arr;

                    }

                    //console.log("excel数据：", excel);

//                    var xlsx2 = require("../libs/xlsx2");
//                    var excelDir = "excel";
//                    var path = require('path');
//                    var File = require('../libs/File');
//                    xlsx2.createExcelUrl(filename, excel, excelDir, function (err, result) {
//                        if (err) {
//                            console.log("excel:",err);
//                            Me.callbackFunction(err, result);
//                        } else {
//                            var employeePath = path.join(__dirname, '../../web/excel');
//                            var fullPath = File.joinfilePath([employeePath, filename + ".xlsx"]);
//                            //console.log("全局路径",fullPath);
//                            xlsx2.deleteFile(fullPath, function (_err, _result) {
//                                if (_result) {
//                                    //Me.callbackFunction(err,result);
//                                } else {
//                                    Me.callbackFunction(null, false);
//                                }
//                            });
//                            Me.callbackFunction(err, result);
//                        }
//                    });
                    var xlsx2 = require("../libs/xlsx2");
                    var settings = require('../../settings');
                    var excelDir = settings.excelDir;
                    console.log("dir:" + excelDir);
                    xlsx2.createExcelUrl(filename, excel, excelDir, function (err, result) {
                        if (err) {
                            console.log("错误::：" + err);
                            Me.callbackFunction(err, result);
                        } else {
                            var employeePath = path.join(__dirname, '../../web/excel/');
                            var fullPath = File.joinfilePath([employeePath + filename + ".xlsx"]);
                            console.log("全局路径", fullPath);
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
                }
            });
        },
        GetEvaluation: function () {
            //console.log("进入接口GetEvaluation");
            var Me, startdate, enddate, keyword, menuid, start, limit;
            Me = this;
            startdate = this.GetParams('startdate');
            enddate = this.GetParams('enddate');
            keyword = this.GetParams('keyword');
            menuid = this.GetParams('menuid');

            start = this.GetParams("start");
            limit = this.GetParams("limit");

            startdate = startdate + " 00:00:00";
            enddate = enddate + " 23:59:59";

            var sqlCmd = "select * from evaluation ";
            var sqlWhere = "where menuid = " + menuid + " and code >= 0 ";
            var sqlParams = [];

            if (startdate) {
                sqlWhere += "and createtime >= '" + startdate + "' ";
            }

            if (enddate) {
                sqlWhere += "and createtime <= '" + enddate + "' ";
            }

            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlWhere += "and ( dishname like ? " +
                    "or detail like ? ) ";
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            sqlCmd = sqlCmd + sqlWhere + " order by createtime desc limit " + start + "," + limit + ";";

            sqlCmd += "select count(id) as totalCount from evaluation ";

            sqlCmd = sqlCmd + sqlWhere + ";";

            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            //console.log("sqlCmd语句：", sqlCmd);
            //console.log("sqlParams语句：", sqlParams);

            this.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, {"totalCount": results[1][0].totalCount, 'topics': results[0]});
                }
            });
        },
        OrderPrint: function () {
            //console.log("调用打印机接口，成功后修改isprint");
            var Me, record, url, url1, url2, url3, url4, url5, paystate, dishids, dishidsStr, type
                , tasktype1, tasktype2, tasktype3, tasktype4, tasktype5;
            Me = this;

            try {
                record = JSON.parse(Me.GetParams("record"));
            } catch (err) {
                Me.callbackFunction(err, null);
            }

            //console.log("获取的数据为：", record);

            if (record.paymethod == 0) {
                paystate = "未支付";
            } else if (record.paymethod == 1) {
                paystate = "微信支付";
            } else if (record.paymethod == 2) {
                paystate = "现金支付";
            }

            if (record.tasktype == 1 || record.tasktype == 5) {
                type = "堂食";
                tasktype1 = "ts_chuancai";
                tasktype2 = "ts_zongdan";
                tasktype3 = "ts_tangshi";
                tasktype4 = "ts_jiezhang";
                tasktype5 = "ts_fendan";
            } else if (record.tasktype == 2) {
                type = "外卖";
                tasktype1 = "wm_chuancai";
                tasktype2 = "wm_zongdan";
                tasktype3 = "wm_tangshi";
                tasktype4 = "wm_jiezhang";
                tasktype5 = "wm_fendan";
            } else if (record.tasktype == 3) {
                type = "杂食";
                tasktype1 = "zs_chuancai";
                tasktype2 = "zs_zongdan";
                tasktype3 = "zs_tangshi";
                tasktype4 = "zs_jiezhang";
                tasktype5 = "zs_fendan";
            } else if (record.tasktype == 4) {
                type = "订位";
                tasktype1 = "dw_chuancai";
                tasktype2 = "dw_zongdan";
                tasktype3 = "dw_tangshi";
                tasktype4 = "dw_jiezhang";
                tasktype5 = "dw_fendan";
            }
            //else if (record.tasktype == 5) {
            //    type = "订位堂食";
            //    tasktype1 = "dwts_chuancai";
            //    tasktype2 = "dwts_zongdan";
            //    tasktype3 = "dwts_tangshi";
            //    tasktype4 = "dwts_jiezhang";
            //    tasktype5 = "dwts_fendan";
            //}

            try {
                dishids = JSON.parse(record.dishids);
            } catch (err) {
                Me.callbackFunction(err, null);
            }

            //dishids = record.dishids;
            //console.log("获取的数据为dishids：", dishids);

            dishidsStr = "";
            if (dishids !== null) {
                for (var i = 0; i < dishids.length; i++) {

                    //console.log("获取的数据为dishids：", dishids[i]);

                    var id = parseInt(i) + 1;

                    if (i == dishids.length - 1) {
                        dishidsStr += '{"dishname":"' + id + '.' + dishids[i].dishname +
                            '","menucount":"' + dishids[i].menucount +
                            '","presentprice":"' + dishids[i].presentprice.toFixed(2) +
                            '","price":"' + dishids[i].presentprice.toFixed(2) +
                            '"}';
                    } else {
                        dishidsStr += '{"dishname":"' + id + '.' + dishids[i].dishname +
                            '","menucount":"' + dishids[i].menucount +
                            '","presentprice":"' + dishids[i].presentprice.toFixed(2) +
                            '","price":"' + dishids[i].presentprice.toFixed(2) +
                            '"},';
                    }

                }
            }

            //console.log("获取的数据为dishidsStr：", dishidsStr);
            var settings = require("../../settings");
            url = settings.printHost;
            //url1 = url + '?tasktype=' + tasktype1 + '&type=' + type +

            url1 = url + '?&type=' + type +
                '&task={"taskid":' + record.id + ',"ordertime":"' + record.ordertime + '","realname":"' + record.realname + '","paymethod":"' + record.paymethod +
                '","mobile":"' + record.mobile + '","address":"' + record.address + '","sendtime":"' + record.ordertime + '","ordertabletime":"' + record.ordertabletime +
                '","totel":"' + record.sumoney + '","paystate":"' + paystate + '","tableid":"' + record.tableid + '","diningtime":"' + record.diningtime + '","peoplecount":"' + record.peoplecount +
                '","dishids":[' + dishidsStr + ']}';

            //console.log("传递的参数为url1：", url1);

            //url2 = url + '?tasktype=' + tasktype2 + '&type=' + type +
            url2 = url + '?&type=' + type +
                '&task={"taskid":' + record.id + ',"ordertime":"' + record.ordertime + '","realname":"' + record.realname +
                '","mobile":"' + record.mobile + '","address":"' + record.address + '","sendtime":"' + record.ordertime +
                '","totel":"' + record.sumoney + '","paystate":"' + paystate +
                '","dishids":[' + dishidsStr + ']}';

            //console.log("传递的参数为url2：", url2);

            //url3 = url + '?tasktype=' + tasktype3 + '&type=' + type +
            url3 = url + '?&type=' + type +
                '&task={"taskid":' + record.id + ',"ordertime":"' + record.ordertime + '","realname":"' + record.realname +
                '","mobile":"' + record.mobile + '","address":"' + record.address + '","sendtime":"' + record.ordertime +
                '","totel":"' + record.sumoney + '","paystate":"' + paystate +
                '","dishids":[' + dishidsStr + ']}';

            //console.log("传递的参数为url3：", url3);

            //url4 = url + '?tasktype=' + tasktype4 + '&type=' + type +
            url4 = url + '?&type=' + type +
                '&task={"taskid":' + record.id + ',"ordertime":"' + record.ordertime + '","realname":"' + record.realname +
                '","mobile":"' + record.mobile + '","address":"' + record.address + '","sendtime":"' + record.ordertime +
                '","totel":"' + record.sumoney + '","paystate":"' + paystate +
                '","dishids":[' + dishidsStr + ']}';

            //console.log("传递的参数为url4：", url4);

            //url5 = url + '?tasktype=' + tasktype5 + '&type=' + type +
            url5 = url + '?&type=' + type +
                '&task={"taskid":' + record.id + ',"ordertime":"' + record.ordertime + '","realname":"' + record.realname +
                '","mobile":"' + record.mobile + '","address":"' + record.address + '","sendtime":"' + record.ordertime +
                '","totel":"' + record.sumoney + '","paystate":"' + paystate +
                '","dishids":[' + dishidsStr + ']}';
            //console.log("传递的参数为url5：", url5);
            var optionsP = '{"taskid":' + record.id + ',"ordertime":"' + record.ordertime + '","realname":"' + record.realname + '","paymethod":"' + record.paymethod +
                '","mobile":"' + record.mobile + '","address":"' + record.address + '","sendtime":"' + record.ordertime + '","ordertabletime":"' + record.ordertabletime +
                '","totel":"' + record.sumoney + '","paystate":"' + paystate + '","tableid":"' + record.tableid + '","diningtime":"' + record.diningtime + '","peoplecount":"' + record.peoplecount +
                '","dishids":[' + dishidsStr + ']}';
            console.log("打印url1：2", optionsP);
            console.log('task:', optionsP);
            request.post(url, {form: {type: type, task: optionsP}}, function (err, response, body) {
                console.log("req:" + body);
//                console.log("req:"+body.length);
                try {
                    var _body = JSON.parse(body);
                } catch (error) {
                    console.log('error:', error);
                    return Me.callbackFunction('系统错误！', false);
                }
                console.log('_body[i]:', _body[1]);
                var failStr = "";
                if (_body.length > 0) {
                    for (var i = 0; i < _body.length; i++) {
                        if (_body[i].success == 'false' || !_body[i].success) {
                            failStr += _body[i].IP + "打印失败；"
                        }
                    }
                    if (failStr.length > 0) {
                        return Me.callbackFunction({message: failStr}, false);
                    } else {
                        return Me.callbackFunction(null, true);
                    }
                } else {
                    return Me.callbackFunction('系统错误！', false);
                }
            });
        },
        OrderPrint_D: function () {
            //调用打印机接口，成功后修改isprint
            var Me, record, url, paystate = "", type = "", dishidsStr, dishids;
            Me = this;
            try {
                record = JSON.parse(Me.GetParams("record"));
            } catch (err) {
                Me.callbackFunction(err, null);
            }
            //console.log("获取的数据为：", record);
            if (record.paymethod == 0) {
                paystate = "未支付";
            } else if (record.paymethod == 1) {
                paystate = "微信支付";
            } else if (record.paymethod == 2) {
                paystate = "现金支付";
            }
            if (record.tasktype == 1 || record.tasktype == 5) {
                type = "堂食";
            } else if (record.tasktype == 2) {
                type = "外卖";
            } else if (record.tasktype == 3) {
                type = "杂食";
            } else if (record.tasktype == 4) {
                type = "订位";
            }
            try {
                dishids = JSON.parse(record.dishids);
            } catch (err) {
                Me.callbackFunction(err, null);
            }
            dishidsStr = "";
            if (dishids !== null) {
                for (var i = 0; i < dishids.length; i++) {
                    //console.log("获取的数据为dishids：", dishids[i]);
                    var id = parseInt(i) + 1;
                    if (i == dishids.length - 1) {
                        dishidsStr += '{"dishname":"' + id + '.' + dishids[i].dishname +
                            '","menucount":"' + dishids[i].menucount +
                            '","presentprice":"' + dishids[i].presentprice.toFixed(2) +
                            '","price":"' + dishids[i].presentprice.toFixed(2) +
                            '"}';
                    } else {
                        dishidsStr += '{"dishname":"' + id + '.' + dishids[i].dishname +
                            '","menucount":"' + dishids[i].menucount +
                            '","presentprice":"' + dishids[i].presentprice.toFixed(2) +
                            '","price":"' + dishids[i].presentprice.toFixed(2) +
                            '"},';
                    }
                }
            }
            //console.log("获取的数据为dishidsStr：", dishidsStr);
            var settings = require("../../settings");
            url = settings.printHost;

            var params = url + '?&type=' + type +
                '&task={"taskid":' + record.id + ',"ordertime":"' + record.ordertime + '","realname":"' + record.realname + '","paymethod":"' + record.paymethod +
                '","mobile":"' + record.mobile + '","address":"' + record.address + '","sendtime":"' + record.ordertime + '","ordertabletime":"' + record.ordertabletime +
                '","totel":"' + record.sumoney + '","paystate":"' + paystate + '","tableid":"' + record.tableid + '","diningtime":"' + record.diningtime + '","peoplecount":"' + record.peoplecount +
                '","dishids":[' + dishidsStr + ']}';
            var optionsP = '{"taskid":' + record.id + ',"ordertime":"' + record.ordertime + '","realname":"' + record.realname + '","paymethod":"' + record.paymethod +
                '","mobile":"' + record.mobile + '","address":"' + record.address + '","sendtime":"' + record.ordertime + '","ordertabletime":"' + record.ordertabletime +
                '","totel":"' + record.sumoney + '","paystate":"' + paystate + '","tableid":"' + record.tableid + '","diningtime":"' + record.diningtime + '","peoplecount":"' + record.peoplecount +
                '","dishids":[' + dishidsStr + ']}';
            var _stype = "'" + type + "'";
            console.log("打印url1：2", optionsP);
            console.log('task:', optionsP);
            request.post(url, {form: {type: type, task: optionsP}}, function (err, response, body) {
                console.log("req:" + body);
//                console.log("req:"+body.length);
                try {
                    var _body = JSON.parse(body);
                } catch (error) {
                    console.log('error:', error);
                    return Me.callbackFunction('系统错误！', false);
                }
                console.log('_body[i]:', _body[1]);
                var failStr = "";
                if (_body.length > 0) {
                    for (var i = 0; i < _body.length; i++) {
                        if (_body[i].success == 'false' || !_body[i].success) {
                            failStr += _body[i].IP + "打印失败；"
                        }
                    }
                    if (failStr.length > 0) {
                        return Me.callbackFunction({message: failStr}, false);
                    } else {
                        return Me.callbackFunction(null, true);
                    }
                } else {
                    return Me.callbackFunction('系统错误！', false);
                }
            });
        },
        getPrintStatement: function () {
            var Me, record, url, paystate = "", type = "", dishidsStr, dishids, paymethod = "未知";
            Me = this;
            try {
                record = JSON.parse(Me.GetParams("record"));
            } catch (err) {
                Me.callbackFunction(err, null);
            }
            //console.log("获取的数据为：", record);
            if (record.paymethod == 0) {
                paymethod = "未支付";
            } else if (record.paymethod == 1) {
                paymethod = "微信支付";
            } else if (record.paymethod == 2) {
                paymethod = "现金支付";
            }

            if (record.tasktype == 1 || record.tasktype == 5) {
                type = "堂食结账单";
            } else if (record.tasktype == 2) {
                type = "外卖结账单";
            } else if (record.tasktype == 3) {
                type = "杂食结账单";
            } else if (record.tasktype == 4) {
                type = "订位结账单";
            }
            try {
                dishids = JSON.parse(record.dishids);
            } catch (err) {
                Me.callbackFunction(err, null);
            }
            dishidsStr = "";
            if (dishids !== null) {
                for (var i = 0; i < dishids.length; i++) {
                    //console.log("获取的数据为dishids：", dishids[i]);
                    var id = parseInt(i) + 1;
                    if (i == dishids.length - 1) {
                        dishidsStr += '{"dishname":"' + id + '.' + dishids[i].dishname +
                            '","menucount":"' + dishids[i].menucount +
                            '","presentprice":"' + dishids[i].presentprice.toFixed(2) +
                            '","price":"' + dishids[i].presentprice.toFixed(2) +
                            '"}';
                    } else {
                        dishidsStr += '{"dishname":"' + id + '.' + dishids[i].dishname +
                            '","menucount":"' + dishids[i].menucount +
                            '","presentprice":"' + dishids[i].presentprice.toFixed(2) +
                            '","price":"' + dishids[i].presentprice.toFixed(2) +
                            '"},';
                    }
                }
            }
            //console.log("获取的数据为dishidsStr：", dishidsStr);
            var settings = require("../../settings");
            url = settings.printHost;

            var params = url + '?&type=' + type +
                '&task={"taskid":' + record.id + ',"ordertime":"' + record.ordertime + '","realname":"' + record.realname + '","paymethod":"' + paymethod +
                '","mobile":"' + record.mobile + '","address":"' + record.address + '","sendtime":"' + record.ordertime + '","ordertabletime":"' + record.ordertabletime +
                '","totel":"' + record.sumoney + '","tableid":"' + record.tableid + '","diningtime":"' + record.diningtime + '","peoplecount":"' + record.peoplecount +
                '","dishids":[' + dishidsStr + ']}';

            console.log("打印url：3", params);
            var optionsP = '{"taskid":' + record.id + ',"ordertime":"' + record.ordertime + '","realname":"' + record.realname + '","paymethod":"' + paymethod +
                '","mobile":"' + record.mobile + '","address":"' + record.address + '","sendtime":"' + record.ordertime + '","ordertabletime":"' + record.ordertabletime +
                '","totel":"' + record.sumoney + '","tableid":"' + record.tableid + '","diningtime":"' + record.diningtime + '","peoplecount":"' + record.peoplecount +
                '","dishids":[' + dishidsStr + ']}';
            console.log("打印url1：2", optionsP);
            console.log('task:', optionsP);
            request.post(url, {form: {type: type, task: optionsP}}, function (err, response, body) {
                console.log("req:" + body);
//                console.log("req:"+body.length);
                try {
                    var _body = JSON.parse(body);
                } catch (error) {
                    console.log('error:', error);
                    return Me.callbackFunction('系统错误！', false);
                }
                console.log('_body[i]:', _body[1]);
                var failStr = "";
                if (_body.length > 0) {
                    for (var i = 0; i < _body.length; i++) {
                        if (_body[i].success == 'false' || !_body[i].success) {
                            failStr += _body[i].IP + "打印失败；"
                        }
                    }
                    if (failStr.length > 0) {
                        return Me.callbackFunction({message: failStr}, false);
                    } else {
                        return Me.callbackFunction(null, true);
                    }
                } else {
                    return Me.callbackFunction('系统错误！', false);
                }
            });
//            request.get({
//                url:params
//            },function(err,result,body){
//                console.log(err,result);
//                console.log('body:',body);
//                if(err){
//                    Me.callbackFunction(err,null);
//                }else{
//                    console.log("打印成功");
//                    Me.callbackFunction(null, true);
//                }
//            });
        },
        GetDiliveryman: function () {
            var Me, keyword, userclass, start, limit;
            Me = this;
            keyword = this.GetParams('keyword');
            userclass = this.GetParams('userclass');
            var sqlCmd = "select * from `user` ";
            var sqlWhere = "where userclass = " + userclass + " ";
            var sqlParams = [];

            // 关键字查询
            if (keyword != "" && keyword != undefined) {
                sqlWhere += "and ( username like ? " +
                    " or realname like ? " +
                    " or mobile like ? ) ";
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }

            sqlCmd = sqlCmd + sqlWhere + " order by id desc;";
//            console.log("sqlCmd语句：", sqlCmd);
            //console.log("sqlParams语句：", sqlParams);

            this.sqlConn.query(sqlCmd, sqlParams, function (err, results) {
                if (err) {
                    console.log(err);
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, results);
                }
            });
        },
        addDiliveryman: function () {
            var Me, realname, mobile;
            Me = this;
            realname = Me.GetParams('realname');
            mobile = Me.GetParams('mobile');
            var sqlCmd = "select * from user where mobile=?;";
            Me.sqlConn.query(sqlCmd, mobile, function (err, result) {
                if (err) {
                    Me.callbackFunction(err, null);
                } else {
                    if (result.length > 0) {
                        Me.callbackFunction('该电话号码已经存在！', null)
                    } else {
                        var sqlCmd2 = "insert into user (realname,mobile,userclass) values (?,?,5);";
                        Me.sqlConn.query(sqlCmd2, [realname, mobile], function (err2, result2) {
                            if (err2) {
                                Me.callbackFunction('添加失败！', null)
                            } else {
                                Me.callbackFunction(null, result2)
                            }
                        })
                    }
                }
            })
        },
        editDiliveryman1: function () {
            var Me, realname, id;
            Me = this;
            id = Me.GetParams('id');
            realname = Me.GetParams('realname');
            var sqlCmd2 = "update user set realname=? where id=?;";
            Me.sqlConn.query(sqlCmd2, [realname, id], function (err2, result2) {
                if (err2) {
                    Me.callbackFunction('修改失败！', null)
                } else {
                    Me.callbackFunction(null, result2)
                }
            });
        },
        editDiliveryman2: function () {
            var Me, realname, mobile, id;
            Me = this;
            id = Me.GetParams('id');
            realname = Me.GetParams('realname');
            mobile = Me.GetParams('mobile');
            var sqlCmd = "select * from user where mobile=?;";
            Me.sqlConn.query(sqlCmd, mobile, function (err, result) {
                if (err) {
                    Me.callbackFunction(err, null);
                } else {
                    if (result.length > 0) {
                        Me.callbackFunction('该电话号码已经存在！', null);
                        console.log('err:dianhau cunzai ')
                    } else {
                        var sqlCmd2 = "update user set realname=?,mobile=? where id=?;";
                        Me.sqlConn.query(sqlCmd2, [realname, mobile, id], function (err2, result2) {
                            if (err2) {
                                Me.callbackFunction('修改失败！', null)
                            } else {
                                Me.callbackFunction(null, result2)
                            }
                        });
                    }
                }
            })
        },
        deleteDiliveryman: function () {
            var Me, user_id;
            Me = this;
            user_id = Me.GetParams('userid');
            var sqlCmd = "delete from user where id in (?);";
            Me.sqlConn.query(sqlCmd, user_id, function (err, result) {
                if (err) {
                    Me.callbackFunction(err, null);
                } else {
                    Me.callbackFunction(null, result);
                }
            })
        },
        GetDilivery: function () {
            var Me, keyword, start, limit, taskstatus, startdate, enddate;
            Me = this;
            keyword = Me.GetParams('keyword');
            taskstatus = Me.GetParams('taskstatus');
            startdate = Me.GetParams('startdate');
            enddate = Me.GetParams('enddate');
            start = Me.GetParams('start');
            limit = Me.GetParams('limit');
            var sqlCmd = "select task.*,user.id as dili_id,user.realname as dili_realname,user.mobile as dili_mobile from task left join user on task.diliveryman=user.id ";
            var sqlCmd2 = "select count(0)  as totalCount from task ";
            var sqlParams = [];
            var sqlWhere = " where task.tasktype in (2,3) ";
            if (taskstatus) {
                sqlWhere += " and task.taskstatus in (" + taskstatus + ") ";
            }
            if (startdate) {
                sqlWhere += " and task.diningtime>='" + startdate + "'";
            }
            if (enddate) {
                sqlWhere += " and task.diningtime<='" + enddate + "'";
            }
            if (keyword) {
                sqlWhere += " and (task.id like ? or task.realname like ? or task.mobile like ? or task.address like ? )";
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
                sqlParams[sqlParams.length] = '%' + keyword + '%';
            }
            sqlCmd = sqlCmd + sqlWhere + " limit " + start + "," + limit + ";";
            sqlCmd2 = sqlCmd2 + sqlWhere + ";";
            //console.log('dilivery:',sqlCmd);
            Me.sqlConn.query(sqlCmd + sqlCmd2, sqlParams, function (err, result) {
                if (err) {
                    console.log(err);
                    Me.callbackFunction(err, null)
                } else {
                    Me.callbackFunction(null, {"totalCount": result[1][0].totalCount, "topics": result[0]})
                }
            })
        },
        getDiliveryPlan: function () {
            //console.log('配送任务数');
            var Me = this;
            var startdate = hcUti.formatDate(new Date(), "yyyy-MM-dd" + " 00:00:00");
            var enddate = hcUti.formatDate(new Date(), "yyyy-MM-dd" + " 23:59:59");
            var sqlCmd = "select * from task where tasktype in (2,3) and taskstatus in (2,3) and diningtime>='" + startdate + "' and diningtime<='" + enddate + "';";
            //console.log(sqlCmd);
            Me.sqlConn.query(sqlCmd, [], function (err, result) {
                if (!err) {
                    //console.log(result.length);
                    Me.callbackFunction(null, result);
                } else {
                    console.log(err);
                }
            })
        },
        finishEvent: function () {
            //配送完成
            var Me = this;
            var porder = Me.GetParams('pOrder');
            var sqlCmd = "update task set taskstatus=5 where id=" + porder + ";";
            Me.sqlConn.query(sqlCmd, [], function (err, result) {
                if (!err) {
                    //console.log(result);
                    Me.callbackFunction(null, result);
                } else {
                    console.log(err);
                }
            })
        },
        arriveEvent: function () {
            //客户到达
            var Me = this;
            var porder = Me.GetParams('id');
            var sqlCmd = "update task set taskstatus=2 where id=" + porder + ";";
            Me.sqlConn.query(sqlCmd, [], function (err, result) {
                if (!err) {
                    //console.log(result);
                    Me.callbackFunction(null, result);
                } else {
                    console.log(err);
                }
            })
        },
        fenpeiorder: function () {
            var Me, diliveryman_id, orderid;
            Me = this;
            diliveryman_id = Me.GetParams('diliveryman_id');
            orderid = Me.GetParams('orderid');
            var sqlCmd = "update task set taskstatus=3,diliveryman=? where id=?;";
            var sqlParams = [diliveryman_id, orderid];
            Me.sqlConn.query(sqlCmd, sqlParams, function (err, result) {
                if (err) {
                    Me.callbackFunction(err, null)
                } else {
                    Me.callbackFunction(null, result);
                }
            })
        },
        getAllDepartment: function () {
            //所有出品部
            var Me = this;
            var sqlCmd = "select * from departments where state=1;";
            Me.sqlConn.query(sqlCmd, [], function (errs, results) {
                if (results) {
                    Me.callbackFunction(null, results);
                }
            });
        },
        AddDepart: function () {
            //添加部门 成功后通知修改打印机配置文件
            var Me, departmentName, ipAddress;
            Me = this;
            var ep = new eventproxy();
            departmentName = Me.GetParams('departmentName');
            ipAddress = Me.GetParams('ipAddress');
            var sqlSelect = "select * from departments where departmentName=?;";
            Me.sqlConn.query(sqlSelect, [departmentName], function (err, result) {
                if (err) {
                    Me.callbackFunction(err, null);
                } else {
                    if (result.length > 0) {
                        var Mess = {
                            message: "部门名称重复已被占用，请使用其他名称！"
                        };
                        Me.callbackFunction(Mess, null);
                    } else {
                        ep.emit('insert');
                    }
                }
            });
            ep.once('insert', function () {
                var sqlInert = "insert into departments (departmentName,ipAddress,state) values (?,?,?);";
                var sqlParams = [departmentName, ipAddress, 1];
                Me.sqlConn.query(sqlInert, sqlParams, function (errs, results) {
                    if (errs) {
                        console.log(errs);
                        Me.callbackFunction(errs, null);
                    } else {
                        ep.emit("update");
                    }
                });
            });
            ep.once('update', function () {
                //修改打印机配置文件?{DepartmentName:"卤菜部",IP:"192.168.1.11"}
                var settings = require("../../settings");
                var url = settings.printSettingHost;
                var optionsP = '{"DepartmentName":"' + departmentName + '","IP":' + '"' + ipAddress + '"' + '}';
                console.log("添加:", url, optionsP);
                //console.log("dishIds::",dest);
                request.post(url, {form: {task: optionsP}}, function (err, response, body) {
                    if (err) {
                        console.log("req:" + err);
                        var timecout = {
                            message: '网络连接失败'
                        };
                        Me.callbackFunction(timecout, null);
                    } else {
                        //console.log("body:;;",body);
                        try {
                            var _body = JSON.parse(body);
                        } catch (error) {
                            console.log('网络连接error:', error);
                            var Mess = {
                                message: '网络连接异常'
                            };
                            return Me.callbackFunction(Mess, false);
                        }
                        if (_body.success == true) {
                            return Me.callbackFunction(null, true);
                        }
                    }
                });
            });
        },
        EditDepart: function () {
            //修改部门
            var Me, departmentName, ipAddress, id;
            Me = this;
            departmentName = Me.GetParams('departmentName');
            ipAddress = Me.GetParams('ipAddress');
            id = Me.GetParams('id');
            var ep = new eventproxy();
            var sqlSelect = "select * from departments where id=?;";
            var paramsS = [id];
            Me.sqlConn.query(sqlSelect, paramsS, function (errs, results) {
                if (errs) {
                    console.log(errs);
                    Me.callbackFunction(errs, null);
                } else {
                    if (results.length < 0) {
                        var Mess = {
                            message: "该部门不存在，请刷新页面后再试！"
                        };
                        Me.callbackFunction(Mess, null);
                    } else {
                        var sqlUpdate = "update departments set departmentName=?,ipAddress=? where id=?;";
                        var sqlParams = [departmentName, ipAddress, id];
                        Me.sqlConn.query(sqlUpdate, sqlParams, function (errs, results) {
                            if (errs) {
                                console.log(errs);
                                Me.callbackFunction(errs, null);
                            } else {
                                ep.emit("update");
                            }
                        })
                    }
                }
            });
            ep.once('update', function () {
                //修改打印机配置文件?{DepartmentName:"卤菜部",IP:"192.168.1.11"}
                var settings = require("../../settings");
                var url = settings.printSettingHost;
                var optionsP = '{"DepartmentName":"' + departmentName + '","IP":' + '"' + ipAddress + '"' + '}';
                console.log("修改;", url, optionsP);
                //console.log("dishIds::",dest);
                request.post(url, {form: {task: optionsP}}, function (err, response, body) {
                    if (err) {
                        console.log("req:" + err);
                        var timecout = {
                            message: '网络连接失败'
                        };
                        Me.callbackFunction(timecout, null);
                    } else {
                        //console.log("body:;;",body);
                        try {
                            var _body = JSON.parse(body);
                        } catch (error) {
                            console.log('网络连接error:', error);
                            var Mess = {
                                message: '网络连接异常'
                            };
                            return Me.callbackFunction(Mess, false);
                        }
                        if (_body.success == true) {
                            return Me.callbackFunction(null, true);
                        }
                    }
                });
            });
        },
        DeleteDepart: function () {
            //删除部门
            var Me, ids;
            Me = this;
            ids = JSON.parse(Me.GetParams('ids'));
            var sqlDel = "update departments set state=0 where id in (" + ids + ");";
            Me.sqlConn.query(sqlDel, [], function (err, result) {
                if (err) {
                    console.log(err);
                    Me.callbackFunction(err, null);
                } else {
                    Me.callbackFunction(err, result);
                }
            })
        },
        getAllMenu: function () {
            //所有菜谱
            var Me = this;
            var dishtype = Me.GetParams('dishtype');
            var keyword = Me.GetParams('keyword');
            var menuclass = Me.GetParams('comboClass');
            var sqlCmd = "select menu.*,menuclass.menuclassname,menuclass.id as menuclassId from menu left join menuclass on menu.dish_fk=menuclass.id";
            var sqlWhere = " where menu.isgrounding=1 ";
            var sqlParams = [];
            if (dishtype) {
                sqlWhere += " and menu.dishtype in (" + dishtype + ")";
            }
            if (menuclass) {
                sqlWhere += " and menuclass.id=?";
                sqlParams.push(menuclass);
            }
            if (keyword !== null && keyword !== "" && keyword !== undefined) {
                sqlWhere += " and  menu.dishname like ? ";
                sqlParams.push("%" + keyword + "%");
            }
            sqlCmd = sqlCmd + sqlWhere + ";";
            //console.log(sqlCmd,sqlParams);
            Me.sqlConn.query(sqlCmd, sqlParams, function (errs, results) {
                if (!errs) {
                    Me.callbackFunction(null, results);
                } else {
                    console.log(errs);
                }
            });
        },
        getAllMenuClass: function () {
            //所有菜品
            var Me = this;
            var sqlCmd = "select menuclass.menuclassname,menuclass.id from menuclass where menuclasstype=1;";
            //console.log(sqlCmd);
            Me.sqlConn.query(sqlCmd, [], function (errs, results) {
                if (!errs) {
                    Me.callbackFunction(null, results);
                } else {
                    console.log(errs);
                }
            });
        },
        addDishWinEvent: function () {
            //加菜提交
            //pOrder:PublicObject.selectTask.id,
            //    dishIds:dishIds,
            //    tasktype:1,
            //    taskstatus:1,
            //    isprint:0,
            //    paymethod:0,
            //    tableid:PublicObject.selectTask.tableid,
            var Me, pOrder, dishIds, tasktype, taskstatus, isprint, paymethod, tableid, openid, realname, mobile, peoplecount;
            Me = this;
            var ep = new eventproxy();
            try {
                dishIds = JSON.parse(Me.GetParams('dishIds'));
            } catch (err) {
                Me.callbackFunction(err, null);
            }
            pOrder = Me.GetParams('pOrder');
            tasktype = Me.GetParams('tasktype');
            taskstatus = Me.GetParams('taskstatus');
            isprint = Me.GetParams('isprint');
            paymethod = Me.GetParams('paymethod');
            tableid = Me.GetParams('tableid');
            openid = Me.GetParams('openid');
            realname = Me.GetParams('realname');
            mobile = Me.GetParams('mobile');
            peoplecount = Me.GetParams('peoplecount');
            var today = new Date();
            var ordertime = hcUti.formatDate(today, "yyyy-MM-dd hh:mm:ss");
            var idArr = [], summoney = 0;
            if (dishIds.length > 0) {
                for (var i = 0; i < dishIds.length; i++) {
                    idArr.push(dishIds[i].menuid);
                    summoney += parseInt(dishIds[i].menucount) * parseInt(dishIds[i].presentprice);
                }
            }
            //先查库存，再修改task表和menu表
            var sqlSelect = "select * from menu where id in(" + idArr + ");";
            //console.log('select:',sqlSelect);
            Me.sqlConn.query(sqlSelect, [], ep.done('getMenu'));
            ep.once('getMenu', function (result) {
//                    var filterResult=Me.filteNotGroundingMenu(record.data,result);
//                    console.log('filterResult:',filterResult);
                var _str = Me.CheckMenuCount(dishIds, result);
                //console.log('_str:',JSON.stringify(_str));
                var checkmenuCount = _str.filterMenu;
                if (checkmenuCount.length > 0) {
                    //console.log('checkmenuCount:',checkmenuCount);
                    var _menunames = [];
                    for (var i = 0; i < checkmenuCount.length; i++) {
                        _menunames[_menunames.length] = checkmenuCount[i].dishname;
                    }
                    var errorMessage = {
                        name: "库存不足提示",
                        message: "尊敬的客户您好，您点的" + _menunames + "库存不足，请重新下单！"
                    };
                    return Me.callbackFunction(errorMessage, null);
                } else if (checkmenuCount.length == 0) {
                    console.log('符合条件，进行下单');
                    var sql_updateMenu = "";
                    var sql_buildOrder = "";
                    var buildOrderParams = [];
                    for (var i = 0; i < dishIds.length; i++) {
                        sql_updateMenu += "update menu set dishcount=dishcount-" + dishIds[i].menucount + ",sellcount=sellcount+" + dishIds[i].menucount + " where id=" + dishIds[i].menuid + ";";
                    }
                    sql_buildOrder = "insert into task (openid,ordertime," +
                        "sumoney,taskstatus,tasktype,dishids,isprint,paymethod,tableid,pOrder,realname,mobile,peoplecount,addtype) values (?,?,?,1,1,?,0,0,?,?,?,?,?,1);";
                    buildOrderParams = [openid, ordertime, summoney, JSON.stringify(dishIds), tableid, pOrder, realname, mobile, peoplecount];
                    var sql_last = sql_buildOrder + sql_updateMenu;
                    //console.log('sql_last:',sql_last,buildOrderParams);
                    pool.getConnection(function (err, connection) {
                        if (err) {
                            console.error('mysql 连接失败');
                            Me.callbackFunction(err, null);
                        }
                        //开始事务
                        connection.beginTransaction(function (_err) {
                            if (_err) {
                                throw _err;
                                Me.callbackFunction(_err, null);
                            }
                            connection.query(sql_last, buildOrderParams, function (__err, result1) {
                                if (__err) {
                                    connection.rollback(function () {
                                        throw __err;
                                    });
                                    Me.callbackFunction(__err, null);
                                }
                                connection.commit(function (____err) {
                                    //console.log("进入commit");
                                    if (____err) {
                                        connection.rollback(function () {
                                            throw ____err;
                                        });
                                        Me.callbackFunction(____err, null);
                                    }
                                    //console.log("success!");

                                    connection.release();

                                    Me.callbackFunction(null, true);
                                });
                            });
                        });
                    });
                }

            });
            ep.fail(function (err) {
                console.log('[commitOrder]', err);
                Me.callbackFunction(err);
            });
        },
        deleteDishWinEvent: function () {
            //减菜提交
            //pOrder:PublicObject.selectTask.id,
            //    dishIds:dishIds,
            //    tasktype:1,
            //    taskstatus:1,
            //    isprint:0,
            //    paymethod:0,
            //    tableid:PublicObject.selectTask.tableid,
            var Me, pOrder, dishIds, tasktype, taskstatus, isprint, paymethod, tableid, openid, realname, mobile, peoplecount;
            Me = this;
            var ep = new eventproxy();
            try {
                dishIds = JSON.parse(Me.GetParams('dishIds'));
            } catch (err) {
                Me.callbackFunction(err, null);
            }
            pOrder = Me.GetParams('pOrder');
            tasktype = Me.GetParams('tasktype');
            taskstatus = Me.GetParams('taskstatus');
            isprint = Me.GetParams('isprint');
            paymethod = Me.GetParams('paymethod');
            tableid = Me.GetParams('tableid');
            openid = Me.GetParams('openid');
            realname = Me.GetParams('realname');
            mobile = Me.GetParams('mobile');
            peoplecount = Me.GetParams('peoplecount');
            var today = new Date();
            var ordertime = hcUti.formatDate(today, "yyyy-MM-dd hh:mm:ss");
            var idArr = [], summoney = 0;
            var dishIdsArr = [];
            if (dishIds.length > 0) {
                for (var i = 0; i < dishIds.length; i++) {
                    idArr.push(dishIds[i].menuid);
                    summoney += parseInt(dishIds[i].menucount2) * parseInt(dishIds[i].presentprice);
                    var rec = {
                        "menuid": dishIds[i].menuid,
                        "menucount": dishIds[i].menucount2 * -1,
                        "dishname": dishIds[i].dishname,
                        "depart_fk": dishIds[i].depart_fk,
                        "presentprice": dishIds[i].presentprice,
                        "dishurl": dishIds[i].dishurl
                    };
                    dishIdsArr[dishIdsArr.length] = rec;
                }
            }
            summoney = summoney * -1;
            //先查库存，再修改task表和menu表
            var sqlSelect = "select * from menu where id in(" + idArr + ");";
            //console.log('select:',sqlSelect);
            Me.sqlConn.query(sqlSelect, [], ep.done('getMenu'));
            ep.once('getMenu', function (result) {
                console.log('进行减菜');
                var sql_updateMenu = "";
                var sql_buildOrder = "";
                var buildOrderParams = [];
                for (var i = 0; i < dishIdsArr.length; i++) {
                    sql_updateMenu += "update menu set dishcount=dishcount-" + dishIdsArr[i].menucount + "," +
                        "sellcount=sellcount+" + dishIdsArr[i].menucount + " where id=" + dishIdsArr[i].menuid + ";";
                }
                sql_buildOrder = "insert into task (openid,ordertime," +
                    "sumoney,taskstatus,tasktype,dishids,isprint,paymethod,tableid,pOrder,realname,mobile,peoplecount,addtype) values (?,?,?,1,1,?,0,0,?,?,?,?,?,1);";
                buildOrderParams = [openid, ordertime, summoney, JSON.stringify(dishIdsArr), tableid, pOrder, realname, mobile, peoplecount];
                var sql_last = sql_buildOrder + sql_updateMenu;
                //console.log('sql_last:', sql_last, buildOrderParams);
                pool.getConnection(function (err, connection) {
                    if (err) {
                        console.error('mysql 连接失败');
                        Me.callbackFunction(err, null);
                    }
                    //开始事务
                    connection.beginTransaction(function (_err) {
                        if (_err) {
                            throw _err;
                            Me.callbackFunction(_err, null);
                        }
                        connection.query(sql_last, buildOrderParams, function (__err, result1) {
                            if (__err) {
                                connection.rollback(function () {
                                    throw __err;
                                });
                                Me.callbackFunction(__err, null);
                            }
                            connection.commit(function (____err) {
                                //console.log("进入commit");
                                if (____err) {
                                    connection.rollback(function () {
                                        throw ____err;
                                    });
                                    Me.callbackFunction(____err, null);
                                }
                                //console.log("success!");

                                connection.release();

                                Me.callbackFunction(null, true);
                            });
                        });
                    });
                });
            });
            ep.fail(function (err) {
                console.log('[commitOrder-deleteDishWinEvent]', err);
                Me.callbackFunction(err);
            });
        },
        spotPayEnter: function () {
            //结账单现场支付
            var Me, orderid, realprice, coupon, vipcard, paymethod, duePay, orderTime;
            Me = this;
            orderid = Me.GetParams('orderid');
            realprice = Me.GetParams('realprice');
            coupon = Me.GetParams('coupon');
            vipcard = Me.GetParams('vipcard');
            paymethod = Me.GetParams('paymethod');
            duePay = Me.GetParams('duePay');
            orderTime = Date.parse(new Date());
            var sqlCmd = "insert into tasklog (pOrder,taskType,methodType,duePay,netPay,coupon,vipCard,orderTime) values (?,1,?,?,?,?,?,?);";
            var sqlUpdate = "update task set taskstatus=5, paymethod=" + parseInt(paymethod) + " where pOrder=" + orderid + ";";
            var sqlParams = [];
            sqlParams.push(orderid);
            sqlParams.push(parseInt(paymethod));
            sqlParams.push(duePay * 1);
            sqlParams.push(realprice * 1);
            sqlParams.push(coupon);
            sqlParams.push(vipcard);
            sqlParams.push(orderTime);
            //console.log(sqlCmd,sqlParams);
            var sqlAll = sqlUpdate + sqlCmd;
            //console.log(sqlAll);
            pool.getConnection(function (err, connection) {
                if (err) {
                    //console.error('mysql 连接失败');
                    Me.callbackFunction(err, null);
                }

                //开始事务
                connection.beginTransaction(function (_err) {
                    if (_err) {
                        throw _err;
                        Me.callbackFunction(_err, null);
                    }
                    connection.query(sqlAll, sqlParams, function (__err, result1) {
                        //console.log("进入_sqlInsert");
                        if (__err) {
                            connection.rollback(function () {
                                throw __err;
                            });
                            Me.callbackFunction(__err, null);
                        }
                        connection.commit(function (____err) {
                            //console.log("进入commit");
                            if (____err) {
                                connection.rollback(function () {
                                    throw ____err;
                                });
                                Me.callbackFunction(____err, null);
                            }
                            //console.log("success!");

                            connection.release();

                            Me.callbackFunction(null, true);
                        });
                    });
                });
            });
        },
        GetServiceClass: function () {
            //获取服务类
            var Me, menuclasstype;
            Me = this;
            menuclasstype = Me.GetParams("type");

            var sqlCmd = 'select * from serviceclass where state=1 ';
            var sqlWhere = '';


            if (menuclasstype != "" && menuclasstype != undefined) {
                sqlWhere += ' and type = ' + menuclasstype + " ";
            }

            sqlCmd += sqlWhere + ";";

            //console.log("sqlCmd语句：", sqlCmd);

            this.sqlConn.query(sqlCmd, [], function (err, results) {
                if (err) {
                    Me.callbackFunction(err, results);
                } else {
                    Me.callbackFunction(err, results);
                }
            });
        },
        AddService: function () {
            //添加服务
            var Me, servicename, type, price, rule, isdefault;
            Me = this;
            servicename = Me.GetParams('servicename');
            type = Me.GetParams('type');
            price = Me.GetParams('price');
            rule = Me.GetParams('rule');
            isdefault = Me.GetParams('isdefault');
            var sqlInert = "insert into serviceclass (servicename,type,price,rule,isdefault) values (?,?,?,?,?);";
            var sqlSelect = "select * from serviceclass where servicename='" + servicename + "';";
            Me.sqlConn.query(sqlSelect, [], function (err, result) {
                if (!err) {
                    if (result.length > 0) {
                        var Mess = {
                            message: "名称重复，请填写其他名称！"
                        };
                        Me.callbackFunction(Mess, null);
                    } else {
                        var sqlParams = [servicename, type, price, rule, isdefault];
                        Me.sqlConn.query(sqlInert, sqlParams, function (errs, results) {
                            if (errs) {
                                console.log(errs);
                                Me.callbackFunction(errs, null);
                            } else {
                                Me.callbackFunction(null, results);
                            }
                        })
                    }
                }
            })
        },
        EditService: function () {
            //修改服务
            var Me, servicename, type, price, rule, isdefault, id;
            Me = this;
            servicename = Me.GetParams('servicename');
            type = Me.GetParams('type');
            price = Me.GetParams('price');
            rule = Me.GetParams('rule');
            isdefault = Me.GetParams('isdefault');
            id = Me.GetParams('id');
            var ep = new eventproxy();
            var sqlSelect = "select * from serviceclass where id=?;";
            var paramsS = [id];
            Me.sqlConn.query(sqlSelect, paramsS, ep.done('selectName'));
            ep.once("selectName", function (results) {
                if (results.length < 0) {
                    var Mess = {
                        message: "该服务不存在，请刷新页面后再试！"
                    };
                    Me.callbackFunction(Mess, null);
                } else {
                    var sqlSelect2 = "select * from serviceclass where servicename=? and type=? and price=? and rule=? and isdefault=? and state=1;";
                    var sqlParams = [servicename, type, price, rule, isdefault];
                    Me.sqlConn.query(sqlSelect2, sqlParams, ep.done("update2"));
                }
            });
            ep.once("update2", function (resultu) {
                if (resultu.length > 0) {
                    var Mess = {
                        message: "名称重复，请填写其他名称！"
                    };
                    Me.callbackFunction(Mess, null);
                } else {
                    var sqlUpdate = "update serviceclass set servicename=?,type=?,price=?,rule=?,isdefault=? where id=?;";
                    var sqlParamsU = [servicename, type, price, rule, isdefault, id];
                    Me.sqlConn.query(sqlUpdate, sqlParamsU, function (err, result) {
                        if (err) {
                            console.log(err);
                            Me.callbackFunction(errs, null);
                        } else {
                            Me.callbackFunction(null, result);
                        }
                    })
                }
            });
            ep.fail(function (err) {
                console.log('updateErr:', err);
                Me.callbackFunction(err);
            });
        },
        DeleteService: function () {
            //删除服务
            var Me, ids;
            Me = this;
            ids = JSON.parse(Me.GetParams('ids'));
            var sqlDel = "update serviceclass set state=0 where id in (" + ids + ");";
            Me.sqlConn.query(sqlDel, [], function (err, result) {
                if (err) {
                    console.log(err);
                    Me.callbackFunction(err, null);
                } else {
                    Me.callbackFunction(err, result);
                }
            })
        },
        orderPrintDepart: function () {
            //菜单打印 分部门
            //console.log("菜单打印 分部门");
            var Me, record, paymethod, dishids, type, isprint, serviceList;
            Me = this;
            isprint = Me.GetParams('isprint');
            var ep = new eventproxy();
            try {
                record = JSON.parse(Me.GetParams("record"));
            } catch (err) {
                console.log("recerr::", err);
                return  Me.callbackFunction(err, null);
            }
            //console.log("获取的数据为：", record);
            if (record.paymethod == 0) {
                paymethod = "未支付";
            } else if (record.paymethod == 1) {
                paymethod = "微信支付";
            } else if (record.paymethod == 2) {
                paymethod = "现金支付";
            }

            if (record.tasktype == 1 || record.tasktype == 5) {
                type = "堂食";
            } else if (record.tasktype == 2) {
                type = "外卖";
            } else if (record.tasktype == 3) {
                type = "杂食";
            } else if (record.tasktype == 4) {
                type = "订位";
            }
            try {
                dishids = JSON.parse(record.dishids);
            } catch (err) {
                console.log("dish::", err);
                return  Me.callbackFunction(err, null);
            }
            try {
                serviceList = record.serviceList ? JSON.parse(record.serviceList) : JSON.parse(record.serviceids);
            } catch (err) {
                console.log("sererr::", err);
                return Me.callbackFunction(err, null);
            }
            //dishids = record.dishids;
            //console.log("获取的数据为dishids：", dishids);
            var map = {}, dest = [];
            if (dishids !== null) {
                for (var i = 0; i < dishids.length; i++) {//菜单分组
                    var ai = dishids[i];
                    if (!map[ai.depart_fk]) {
                        dest.push({
                            depart_fk: ai.depart_fk,
                            data: [ai]
                        });
                        map[ai.depart_fk] = ai;
                    } else {
                        for (var j = 0; j < dest.length; j++) {
                            var dj = dest[j];
                            if (dj.depart_fk == ai.depart_fk) {
                                dj.data.push(ai);
                                break;
                            }
                        }
                    }
                }
            }
            //console.log("-----",dest);
            //修改订单状态 菜品数量
            var sqlUpdate = "update task set isprint=" + isprint;
            var sqlMenu = "";
            if (isprint == 1) {
                sqlUpdate += ",taskstatus=2";
                if (dest.length > 0) {
                    for (var r = 0, rr = dest.length; r < rr; r++) {
                        var departDish = dest[r].data;
                        for (var d = 0, dd = departDish.length; d < dd; d++) {
                            sqlMenu += "update menu set dishcount=dishcount-" + departDish[d].menucount + ",sellcount=sellcount+" + departDish[d].menucount + " where id=" + departDish[d].menuid + ";";
                        }
                    }
                }
            }
            var sqlAll = sqlUpdate + " where id=" + record.id + ";" + sqlMenu;
            //console.log('sqlAll:',sqlAll);
            pool.getConnection(function (err, connection) {
                if (err) {
                    //console.error('mysql 连接失败');
                    return Me.callbackFunction(err, null);
                }
                //开始事务
                connection.beginTransaction(function (_err) {
                    if (_err) {
                        //throw _err;
                        return Me.callbackFunction(_err, null);
                    }
                    connection.query(sqlAll, [], function (__err, result1) {
                        //console.log("进入_sqlInsert");
                        if (__err) {
                            connection.rollback(function () {
                                //throw __err;
                            });
                            return Me.callbackFunction(__err, null);
                        }
                        connection.commit(function (____err) {
                            //console.log("进入commit");
                            if (____err) {
                                connection.rollback(function () {
                                    //  throw ____err;
                                });
                                return Me.callbackFunction(____err, null);
                            }
                            //console.log("success!");
                            connection.release();
                            ep.emit("getdepart");
                        });
                    });
                });
            });
            ep.once("getdepart", function () {
                var sqlDepart = "select * from departments where state=1;";
                Me.sqlConn.query(sqlDepart, [], ep.done("getprint"));
            });
            ep.once("getprint", function (result) {
                if (dest.length > 0) {
                    for (var r = 0, rr = dest.length; r < rr; r++) {
                        for (var de = 0, dep = result.length; de < dep; de++) {
                            if (dest[r].depart_fk == result[de].id) {
                                dest[r].depart_fk = result[de].ipAddress
                            }
                        }
                    }
                }

                //console.log("`````",dest[0].data);
                var settings = require("../../settings");
                var url = settings.printHost;
                var optionsP = '{"taskid":"' + record.id + '","ordertime":"' + record.ordertime + '","realName":"' + record.realname + '","paymethod":"' + paymethod + '","isprint":"' + isprint +
                    '","mobile":"' + record.mobile + '","address":"' + record.address + '","sendtime":"' + record.ordertime + '","ordertabletime":"' + record.ordertabletime +
                    '","totel":"' + record.sumoney + '","tableid":"' + record.tableid + '","diningtime":"' + record.diningtime + '","peoplecount":"' + record.peoplecount +
                    '","dishids":' + JSON.stringify(dest) + ',"serviceList":' + JSON.stringify(serviceList) + ',"allBills":' + record.allBills + ',"handBill":' + record.handBill + '}';
                console.log("dishIds", url, record.tasktype, optionsP);
                //console.log("dishIds::",dest);
                request.post(url, {form: {type: record.tasktype, task: optionsP}}, function (err, response, body) {
                    if (err) {
                        console.log("req:" + err);
                        var timecout = {
                            message: '网络连接超时'
                        };
                        return Me.callbackFunction(timecout, null);
                    } else {
                        //console.log("body:;;",body);
                        try {
                            var _body = JSON.parse(body);
                        } catch (error) {
                            console.log('网络连接error:', error);
                            var Mess = {
                                message: '打印机连接异常'
                            };
                            return Me.callbackFunction(Mess, false);
                        }
                        //console.log('_body[i]:',_body);
                        var failStr = "";
                        if (_body.length > 0) {
                            for (var i = 0; i < _body.length; i++) {
                                if (_body[i].success == 'false' || !_body[i].success) {
                                    failStr += _body[i].IP + ":打印失败；";
                                }
                            }
                            if (failStr.length > 0) {
                                return Me.callbackFunction({message: failStr}, false);
                            } else {
                                return Me.callbackFunction(null, true);
                            }
                        } else {
                            return Me.callbackFunction({message: '系统错误！'}, false);
                        }
                    }
                });
                /**var paramsP=url+"?type="+record.tasktype+"&task="+optionsP;
                 console.log(paramsP);
                 request.get({
                    url:paramsP
                },function(err,result,body){
                    //console.log('body:',body);
                    console.log(err,body);
                    if(err){
                        Me.callbackFunction(err,null);
                    }else{
                        console.log("打印成功");
                        Me.callbackFunction(null, true);
                    }
                });**/
            });
            ep.fail(function (err) {
                console.log('printErr:', err);
                return Me.callbackFunction(err);
            });
        },
        getTaskById: function () {
            //根据porder查找所有子订单
            var Me, pOrder;
            Me = this;
            pOrder = Me.GetParams('pOrder');
            var sqlselect = "select * from task where pOrder='" + pOrder + "';";
            Me.sqlConn.query(sqlselect, [], function (errUpdate, resultUpdate) {
                if (errUpdate) {
                    console.log(errUpdate);
                    Me.callbackFunction(errUpdate, null);
                } else {
                    if (resultUpdate.length > 0) {
                        var all = [], allservice = [], record = {}, summenoy = 0, dishObj = {};
                        for (var i = 0, len = resultUpdate.length; i < len; i++) {
                            summenoy += resultUpdate[i].sumoney;
                            record = {
                                pOrder: resultUpdate[i].pOrder,
                                tableid: resultUpdate[i].tableid,
                                peoplecount: resultUpdate[i].peoplecount,
                                mobile: resultUpdate[i].mobile,
                                ordertime: resultUpdate[i].ordertime,
                                summenoy: 0,
                                all: {},
                                allservice: {}
                            };
                            if (resultUpdate[i].dishids) {
                                dishObj[resultUpdate[i].id] = resultUpdate[i].dishids;
                            }
                            if (resultUpdate[i].serviceids) {
                                allservice.push(resultUpdate[i].serviceids);
                            }
                            if (resultUpdate[i].reservationid !== "" && resultUpdate[i].reservationid !== null || resultUpdate[i].reservationid !== undefined) {
                                record.reservationid = resultUpdate[i].reservationid;
                            }
                        }
                        var serviceObj = {};
                        /**for(var a= 0;a<all.length;a++){
                            var dishids=JSON.parse(all[a]);
                            for(var d= 0,lop=dishids.length;d<lop;d++){
                                var menuid=dishids[d].menuid;
                                if(dishObj[menuid]){
                                    dishObj[menuid].menucount+=dishids[d].menucount;
                                }else{
                                    dishObj[menuid]={};
                                    dishObj[menuid].menucount=dishids[d].menucount;
                                }
                                dishObj[menuid].menuid=menuid;
                                dishObj[menuid].dishname=dishids[d].dishname;
                                dishObj[menuid].presentprice=dishids[d].presentprice;
                            }
                        }**/
                        for (var s = 0; s < allservice.length; s++) {
                            var serviceids = JSON.parse(allservice[s]);
                            for (var b = 0, lopb = serviceids.length; b < lopb; b++) {
                                var serviceid = serviceids[b].id;
                                if (serviceObj[serviceid]) {
                                    serviceObj[serviceid].count += parseInt(serviceids[b].count);
                                } else {
                                    serviceObj[serviceid] = {};
                                    serviceObj[serviceid].count = parseInt(serviceids[b].count);
                                }
                                serviceObj[serviceid].id = serviceid;
                                serviceObj[serviceid].servicename = serviceids[b].servicename;
                                serviceObj[serviceid].price = serviceids[b].price;
                                summenoy += serviceids[b].price * parseInt(serviceids[b].count);
                            }
                        }
                        record.summenoy = summenoy;
                        record.all = dishObj;
                        record.allservice = serviceObj;
                        //console.log(record);
                        Me.callbackFunction(null, record);
                    }
                }
            });
        },
        orderPrintAll: function () {
            //总结账单打印
            var Me, orderList, type, dishids, allservice;
            Me = this;
            try {
                orderList = JSON.parse(Me.GetParams('orderList'));
            } catch (err) {
                return  Me.callbackFunction(err, null);
            }
            if (orderList.tasktype == 1) {
                type = "堂食";
            } else if (orderList.tasktype == 2) {
                type = "外卖";
            } else if (orderList.tasktype == 3) {
                type = "杂食";
            } else if (orderList.tasktype == 4) {
                type = "订位";
            } else if (orderList.tasktype == 5) {
                type = "订位堂食";
            }
            type += "结账单";
            dishids = orderList.dishids;
            allservice = orderList.allservice;
            var dishArr = [], service = [];
            if (dishids) {
                for (var dish in dishids) {
                    dishArr.push(dishids[dish]);
                }
            }
            if (allservice) {
                for (var ser in allservice) {
                    service.push(allservice[ser]);
                }
            }
            var settings = require("../../settings");
            var ep = new eventproxy();
            var url = settings.printHost;
            var optionsP = '{"taskid":"' + orderList.pOrder + '","ordertime":"' + orderList.ordertime + '","realName":"' + orderList.userrealname +
                '","sendtime":"' + hcUti.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss") + '","totalcount":"' + orderList.totalCount + '","mobile":"' + orderList.mobile +
                '","totalmoney":"' + orderList.totalMoney + '","tableid":"' + orderList.tableid + '","isprint":"1"' + ',"peoplecount":"' + orderList.peoplecount +
                '","dishArr":' + JSON.stringify(dishArr) + ',"allservice":' + JSON.stringify(service) + '}';
            console.log("总单打印url：", optionsP);
            request.post(url, { form: { type: -1, task: optionsP }}, function (err, response, body) {
                if (err) {
                    console.log("req:" + err);
                    var timecout = {
                        message: '网络连接失败'
                    };
                    return Me.callbackFunction(timecout, null);
                } else {
                    //console.log("body:;;",body);
                    try {
                        var _body = JSON.parse(body);
                    } catch (error) {
                        console.log('网络连接error:', error);
                        var Mess = {
                            message: '打印机连接异常'
                        };
                        return Me.callbackFunction(Mess, false);
                    }
                    //console.log('_body[i]:',_body[1]);
                    var failStr = "";
                    if (_body.length > 0) {
                        for (var i = 0; i < _body.length; i++) {
                            if (_body[i].success == 'false' || !_body[i].success) {
                                failStr += _body[i].IP + "打印失败；";
                            }
                        }
                        if (failStr.length > 0) {
                            return Me.callbackFunction({message: failStr}, false);
                        } else {
                            if (orderList.reservationid !== "" || orderList.reservationid !== null || orderList.reservationid != undefined) {
                                ep.emit("update");//订位堂食结账
                            } else {
                                return Me.callbackFunction(null, true);
                            }
                        }
                    } else {
                        return Me.callbackFunction({message: '系统错误！'}, false);
                    }
                }
            });
            ep.once("update", function () {
                var sqlUpdate = "update task set taskstatus=5 where reservationid='" + orderList.reservationid + "';";
                Me.sqlConn.query(sqlUpdate, [], function (errupdate, resultupdate) {
                    if (errupdate) {
                        console.log("errupdate:", errupdate);
                        Me.callbackFunction(errupdate, null);
                    } else {
                        Me.callbackFunction(null, true);
                    }
                })
            });
        },
        selectServiceWinEvent: function () {
            //堂食添加服务项目
            var Me, pOrder, tableid, serviceids;
            Me = this;
            pOrder = Me.GetParams("pOrder");
            tableid = Me.GetParams('tableid');
            try {
                serviceids = JSON.parse(Me.GetParams('serviceids'));
            } catch (err) {
                Me.callbackFunction(err, null);
            }
            var peoplecount = Me.GetParams("peoplecount");
            var nowtime = hcUti.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss");
            var idArr = [], summoney = 0;
            if (serviceids.length > 0) {
                for (var i = 0; i < serviceids.length; i++) {
                    idArr.push(serviceids[i].id);
                    summoney += serviceids[i].count * serviceids[i].price;
                }
            }
            var sqlUpdate = "insert into task (serviceids,pOrder,tableid,ordertime,taskstatus,tasktype,peoplecount,paymethod,sumoney) values (?,?,?,?,?,?,?,0,?);";
            var sqlParams = [JSON.stringify(serviceids), pOrder, tableid, nowtime, 3, 6, peoplecount, summoney];
            //console.log(sqlUpdate,sqlParams);
            Me.sqlConn.query(sqlUpdate, sqlParams, function (err, result) {
                if (err) {
                    console.log(err);
                    Me.callbackFunction(err, null);
                } else {
                    Me.callbackFunction(null, result);
                }
            })
        },
        CheckMenuCount: function (r1, r2) {
//            console.log('对比库存:',r1);
//            console.log('r2:',r2);
            var filterMenu = [];
            var flag = false;
            for (var i = 0; i < r1.length; i++) {
                flag = false;
                for (var j = 0; j < r2.length; j++) {
                    if (r2[j].id == r1[i].menuid) {
                        r1[i].depart_fk = r2[j].depart_fk;
                        if (r2[j].dishcount < r1[i].menucount) {
                            filterMenu[filterMenu.length] = r1[i];
                        }
                    }
                }
            }
            //console.log('库存不足的菜有:',filterMenu);
            var str = {filterMenu: filterMenu, newArr: r1};
            return(str);
        },
        getAllTable: function () {
            //获取所有桌位号
            var Me = this;
            var sqlCmd = "select id,tableName from tableno where tableState=1;";
            Me.sqlConn.query(sqlCmd, [], function (err, result) {
                if (!err) {
                    //console.log(result.length);
                    Me.callbackFunction(null, result);
                }
            });
        },
        selectTableNO: function () {
            //为订单分配桌位号
            var Me, tableid, pOrder, reservationid;
            Me = this;
            tableid = Me.GetParams('tableid');
            pOrder = Me.GetParams('pOrder');
            reservationid = Me.GetParams('reservationid');
            var sqlCmd = "update task set tableid=? where pOrder=?;update task set taskstatus=2 where tasktype=4 and reservationid=?;";
            Me.sqlConn.query(sqlCmd, [tableid, pOrder, reservationid], function (err, result) {
                if (err) {
                    console.log(err);
                    Me.callbackFunction(err, null);
                } else {
                    Me.callbackFunction(null, result);
                }
            })
        },
        getDWTS: function () {
            //订位堂食关联订位信息
            var Me = this;
            var reservationid = Me.GetParams('reservationid');
            var sqlCmd = "select * from task where tasktype=4 and reservationid=?;";
            Me.sqlConn.query(sqlCmd, [reservationid], function (err, result) {
                if (!err) {
                    Me.callbackFunction(null, result);
                }
            })
        },
        getPicById: function () {//根据menuid查询菜品图片
            var Me, menuId;
            Me = this;
            menuId = Me.GetParams('menuId');
            var sqlcmd = "select * from menuphotos where menuId=" + menuId + ";";
            Me.sqlConn.query(sqlcmd, [], function (err, result) {
                if (!err) {
                    Me.callbackFunction(null, result);
                }
            })
        }
    };
};


