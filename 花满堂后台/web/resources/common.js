/**
 * Created by zhou on 2014/5/20.
 * common.js 公用配置文件，例如多个平台mqtt服务端等
 */

var common = common || {};

var localaddr = location.protocol+'//'+location.hostname;
var localport = location.port?location.port:'';

//var mediaport = (parseInt(localport)===7091)? ':80/testrb': ':'+ (parseInt(localport) - 1).toString();
var mediaport = (parseInt(localport)===808)? ':80': ':'+ (parseInt(localport) - 1).toString();
common.BMap = {
    ak:"EFaf00735e6b776e233bfda543aad468",
    v:"1.5"
};

common.mqtt = {
    client:null,
    channel:null, //连接频道
    CREATECHAT_KEY:'createChat',
    MSG_KEY:"sendToWeChat",
    HISTORY_KEY:'history',
    SERVER:localaddr,  //mqtt服务端地址
    PORT:8333
};

common.audioServer = localaddr + mediaport + "/service/getVoice?mediaId=";

common.responseMessage = [
      {"name":"您拍摄的整车照片未包含全部车体，请参考自助定损拍照所附查看全文链接。"},
      {"name":"您拍摄的车架号（VIN）位数不完整，请参考自助定损拍照所附查看全文链接。"},
      {"name":"您拍摄的车架号（VIN）因反光等原因无清晰影像，建议您打开前机盖拍摄车辆铭牌或终止自助查勘等待外勤到现场定损。"},
      {"name":"您拍摄的事故受损情况略有模糊，无法为您准确定损，建议您重新拍摄或终止自助查勘等待外勤到现场定损。"}
];

common.roleType = 'TB';