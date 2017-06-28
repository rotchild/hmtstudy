/**
 * Created by zhou on 2014/4/4.
 * 定义消息模板内容,微信会话可能包括文字、图片、语音信息等
 */

var msgtpl = msgtpl || {};

//msgtpl.banner = ['<table style="table-layout:fixed;word-break:break-all;word-wrap:break-word;width:100%;height:88px;" border="0" cellspacing="0"cellpadding="0">',
//                    '<tr style="width:100%;height:86px;">',
//                        '<td style="width:600px;height:86px">',
//                            '<img style="width:600px;height:86px;" src="{{{bannerleft}}}"/>',
//                        '</td> ',
//                    '<td style="width:100%;height:86px;border: none">',
//                        '<img style="width:100%;height:86px;"  src="{{{bannermiddle}}}"/>',//324*86
//                    '</td> ',
//                    '<td style="width:400px;height:86px;background-image:url({{{bannerright}}})" >',
//                        '<div id="bannertbar" style="width;100%;height:86px;text-align:right;padding:20px 5px 0px 0px;">',
//                            '<img src="../../../../../resources/images/icon-login-seaver.gif" width="16" height="16"> ',
//                            '<span id="loginUser" style="color:;font-size:20px;font-weight:bold;"></span>',
//                            '<img src="../../../../../resources/images/cancellation.png" width="16" height="16"> ',
//                            '<span id="modifyPassWord" style="color:;font-size:20px;font-weight:bold;cursor:pointer;">修改密码</span>',
//                            '<img src="../../../../../resources/images/exit2.png" width="16" height="16"> ',
//                            '<span id="exit" style="color:;font-size:20px;font-weight:bold;cursor:pointer;">退出</span> ',
//                         '</div>',
//                    '</td> ',
//                  '</tr>',
//                '</table>'].join('');

msgtpl.text = ['<div id="text_template" class="text" style = "margin:5px 0 5px 10px">',
    '<span style = "color:forestGreen">{{wechatsystem}}：&nbsp; {{time}} </span>',
    '<div style = "margin:5px 0 5px 10px"> {{content}} </div>',
    '</div>'].join('');

msgtpl.othertext = ['<div id="text_template" class="text" style = "margin:5px 0 5px 10px">',
    '<span style = "color:blue"> {{licenseno}}：&nbsp; {{time}} </span>',
    '<div style = "margin:5px 0 5px 10px"> {{content}} </div>',
    '</div>'].join('');

msgtpl.image = ['<div id="image_template" class="image" style = "margin:5px 0 5px 10px">',
    '<span style = "color:blue"> {{licenseno}}：&nbsp; {{time}} </span>',
    '<div style = "margin:5px 0 5px 10px"><img src=\"{{src}}\" style="width:250px;"></div>',
    '</div>'].join('');
msgtpl.otherimage = ['<div id="image_template" class="image" style = "margin:5px 0 5px 10px">',
    '<span style = "color:forestGreen"> {{wechatsystem}}：&nbsp; {{time}} </span>',
    '<div style = "margin:5px 0 5px 10px"><img src=\"{{src}}\" style="width:250px;"></div>',
    '</div>'].join('');

msgtpl.audio = ['<div id="audio_template" class="audio" style = "margin:5px 0 5px 10px">',
    '<span style = "color:blue"> {{licenseno}}：&nbsp; {{time}} </span>',
    '<div style = "margin:5px 0 5px 10px"><audio id="media" src=\"{{src}}\" controls></audio></div>',
    '</div>'].join('');

msgtpl.previewImage = [
    '<div id="div_mainImg">',
    '   <img src="{{src}}" id="main_img" class="preview"/>',
    //'   <div class="bottomDiv">',
    //'       <div class="iviewer_zoom_in iviewer_common iviewer_button" onclick="PicView(1);"></div>',
    //'       <div class="iviewer_zoom_out iviewer_common iviewer_button" onclick="PicView(-1);"></div>',
    //'       <div class="iviewer_zoom_zero iviewer_common iviewer_button" onclick="PicView(0);"></div>',
    //'       <div class="iviewer_rotate_left iviewer_common iviewer_button" onclick="rotateLeft();"></div>',
    //'       <div class="iviewer_rotate_right iviewer_common iviewer_button" onclick="rotateRight();"></div>',
    //'   </div>',
    '</div>'
].join('');

//msgtpl.marker = [
//    "   <div>",
//    "       <br /><B>{{RealName}}</B>",
//    "       <br />出险车牌:{{CarMark}}",
//    "       <br/>报案人电话:{{Telephone}}",
//    "       <br />出险位置:{{Address}}",
//    "       <br /><a onclick=\'{{action}}\' href=\'#\'>调度案件</a>",
//    "   </div>"
//].join('');

//msgtpl.noClickMarker = [
//    "   <div>",
//    "       <br /><B>{{RealName}}</B>",
//    "       <br />出险车牌:{{CarMark}}",
//    "       <br/>报案人电话:{{Telephone}}",
//    "       <br />出险位置:{{Address}}",
//    "   </div>"
//].join('');
//
//msgtpl.taskinfo = [
//    '<div id="taskinfo" style="width: 100%;height: 100%;">' +
//        '<div style="width: 100%;height: 20%;font-size: 14px">' +
//            '<div style="width: 30%;float: left;margin-left: 5px">' +
//                '<span>&nbsp;&nbsp;&nbsp;出险车牌：</span><label>{{carmark}}</label>' +
//            '</div>' +
//            '<div style="width: 70%;margin-left: 5px">' +
//                '<span>出险驾驶员：</span><label>{{carcase_driver}}</label>' +
//            '</div>' +
//        '</div>' +
//        '<div style="width: 100%;height: 20%;font-size: 14px">' +
//            '<div style="width: 30%;float: left;margin-left: 5px">' +
//                '<span>&nbsp;&nbsp;&nbsp;驾驶员电话：</span><label>{{driver_tel}}</label>' +
//            '</div>' +
//            '<div style="width: 70%;margin-left: 5px">' +
//                '<span>报案人：</span><label>{{reporter}}</label>' +
//            '</div>' +
//        '</div>' +
//        '<div style="width: 100%;height: 20%;font-size: 14px">' +
//            '<div style="width: 30%;float: left;margin-left: 5px">' +
//                '<span>&nbsp;&nbsp;&nbsp;报案人电话：</span><label>{{reporter_tel}}</label>' +
//            '</div>' +
//            '<div style="width: 70%;margin-left: 5px">' +
//                '<span>出险时间：</span><label>{{accidenttime}}</label>' +
//            '</div>' +
//        '</div>' +
//        '<div style="width: 100%;height: 20%;font-size: 14px">' +
//            '<div style="width: 50%;float: left;margin-left: 5px">' +
//                '<span>&nbsp;&nbsp;&nbsp;目前位置：</span><label>{{current_addr}}</label>' +
//            '</div>' +
//            '<div style="width: 50%;margin-left: 5px">' +
//                '<span>&nbsp;&nbsp;&nbsp;出险位置：</span><label>{{carcase_addr}}</label>' +
//            '</div>' +
//        '</div>' +
//        '<div style="width: 100%;height: 20%;font-size: 14px">' +
//            '<div style="width: 30%;float: left;margin-left: 5px">' +
//                '<span>&nbsp;&nbsp;&nbsp;来源：</span><label style="color:#ff0000">来自微信</label>' +
//            '</div>' +
//            '<div id="accident_character" style="width: 70%;margin-left: 5px">' +
//                '<span>&nbsp;&nbsp;&nbsp;案件详情:</span><label>{{accident_character}}</label>'+
//            '</div>' +
//        '</div>' +
//   '</div>'
//].join('');