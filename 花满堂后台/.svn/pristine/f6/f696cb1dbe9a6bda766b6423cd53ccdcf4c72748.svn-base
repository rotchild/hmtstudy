/**
 * Created by zhou on 2014/5/22.
 * 百度geocoding转换接口 依据百度服务提供地理位置转换能力
 */

var geocoder = geocoder || {};

geocoder.coordtype = "wgs84ll";

geocoder.ak = "EFaf00735e6b776e233bfda543aad468";

geocoder.version = "v2";

geocoder.optionsUrl = function(){

}

;
/**
 * reverseUrl 逆向地址
 * @param coordtype 坐标类型
 * @param ak 百度开发者密钥
 * @param location 经纬度,格式(114.00123,22.443354)
 * @param pois 是否显示周围poi信息
 */
geocoder.reverseUrl = function(coordtype:string,ak:string,location:string,pois:number):string {
   var SAMPLEPOSTREVERSE = 'http://api.map.baidu.com/geocoder/v2/?ak=' + ak +'&callback=renderReverse';
   var url = SAMPLEPOSTREVERSE;
   url += "&coordtype="+ coordtype;
   url += "&location=" + location;
   url += "&output=json";
   url += "&pois="+pois;
   var safe = url.replace(/</g,'&lt;').replace(/>/g,'&gt;');
   return safe;
};

export = geocoder;