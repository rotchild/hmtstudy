/**
 * Created by md313 on 14-4-23.
 * clinet.ts 客户端模型类
 * 采用 redis 缓存用户报案时上报的信息至内存中
 * 与公司服务端案件状态共享与同步
 * 用户上报姓名、车牌号与电话号码绑定在该client中
 **/
var client = function(schema){
  var client = schema.define('publicclient', {
    channel:{type: String,"default":"none"},    //聊天建立频道
    openId: {type: String,index: true},
    module: {type: String,"default":'wechat'},  //主模块
    submodule:{type: String,"default":"none"},  //子模块(business分为多个子模块report 报案 survey 查勘)
    state:{type:Number,dataType:'smallInt',"default":0}, //保存用户所需要的报案状态
    tasktype:{type:String,length:20,default:""},  //用户正在进行案件的任务类型
    caseId:{type:Number,dataType:'int',default:-1},  //用户正在进行案件的案件号
    stateupdatetime:{type:Number,dataType:'bigint',"default":Date.now()}, //状态更新时间
    lat:{type: Number,dataType:"decimal",precision: 8, scale: 5,"default":0.00000},
    lng:{type: Number,dataType:'decimal', precision: 8, scale: 5,"default":0.00000},
    addr:{type:String,length:255} //地理位置
  });
  return client;
};

export = client;