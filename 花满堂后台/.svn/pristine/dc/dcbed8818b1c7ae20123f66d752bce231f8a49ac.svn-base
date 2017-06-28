/**
 * Created by zhou on 2014/5/12.
 * 自助查勘人员查勘信息,使用自助查勘功能后开始存储查勘信息
 */

var survey = function(schema){
   var survey = schema.define('survey',{
     openId:{type:String,index:true},
     step:{type:Number,dataType:'int',"default":-1},  //查勘步骤
     maxstep:{type:Number,dataType:'int',"default":-1}, //记录查勘到达的最大步骤
     isRepic:{type:Number,dataType:'int',"default":0}, //是否补拍 0 为否 1为是
     limit:{type:Number,dataType:'smallInt',"default":1}   //照片上限
   });
   return survey;
};

export = survey;