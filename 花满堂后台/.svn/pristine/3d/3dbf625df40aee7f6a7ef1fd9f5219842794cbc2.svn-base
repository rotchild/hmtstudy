/**
 * 图片预览相关js代码
 **/
var imgWidth = "650";
var imgHeight = "640";
/**
 * 判断图片是否加载完成
 * @param src
 */
function initImg(img, x, cid) {
    debugger;
    if (x === 0) {

        var picImg = '';

        if (cid === 0) {
            picImg = document.getElementById("main_img");
        } else if (cid === 1) {
            picImg = document.getElementById("main_img1");
        }

        //picImg.onload = function () {

            imgWidth = picImg.width;
            imgHeight = picImg.height;
            console.log("宽度：" + imgWidth);
            console.log("高度：" + imgHeight);
        //}
    } else if (x === 1) {

        imgWidth = img.naturalWidth;
        imgHeight = img.naturalHeight;
        console.log("宽度：" + imgWidth);
        console.log("高度：" + imgHeight);
    }
}

/**
 * 图片放大缩小
 * @param x
 * @constructor
 */
function PicView(x, cid) {
    debugger;
    // 缩放率 设置基本参数
    var zoom = 1.5;
    // 缩放次数
    var count = 0;
    // 当前缩放倍数值
    var cpu = 1;
    // 图片节点
    var elem = "";
    // 图片初始宽度记录
    var photoWidth = 0;
    // 图片初始高度记录
    var photoHeight = 0;
    var imagePath = "";

    var aa = '';

    if (cid === 0) {
        aa = document.getElementById("main_img");
    } else if (cid === 1) {
        aa = document.getElementById("main_img1");
    }
    photoWidth = aa.width;
    photoHeight = aa.height;

    if (x == 0) {//还原图片大小

        cpu = 1;
        count = 0;
        aa.style.width = imgWidth * cpu + "px";
        aa.style.height = imgHeight * cpu + "px";
    } else {//放大图片
        count += x;//添加记录
        cpu = Math.pow(zoom, count); // 任意次幂运算
        aa.style.width = photoWidth * cpu + "px";
        aa.style.height = photoHeight * cpu + "px";
    }
}

/**
 * 图片左旋转
 */
function rotateLeft(cid) {
    var o = '';
    if (cid === 0) {
        o = document.getElementById("main_img");
    } else if (cid === 1) {
        o = document.getElementById("main_img1");
    }
    if (window.attachEvent)//IE
    {
        var currentFilter = o.currentStyle.filter;
        if (currentFilter) {
            var filterMatch = currentFilter.match(/rotation=(\d)+/);
            var r = parseInt(filterMatch[1]) - 1;
            if (r < 0)
                r = 3;
            o.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + r + ')';
        }
        else {
            o.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=3)';
        }
//            document.getElementById('log').innerHTML = currentFilter;
    }
    else//非IE
    {
        var currentFilter = "";
        /*判断浏览器类型*/
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
                (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
//            if (Sys.ie) {//Js判断为IE浏览器
//                alert('http://www.phpernote.com' + Sys.ie);
//                if (Sys.ie == '9.0') {//Js判断为IE 9
//                } else if (Sys.ie == '8.0') {//Js判断为IE 8
//                } else {
//                }
//            }
        if (Sys.firefox) {//Js判断为火狐(firefox)浏览器
            currentFilter = o.style.MozTransform;
            if (currentFilter) {
                var filterMatch = currentFilter.match(/rotate\(([\-]\d+)deg\)/);
                if (filterMatch) {
                    var r = parseInt(filterMatch[1]) - 90;
                    if (r < -360)
                        r = -90;
                    o.style.MozTransform = 'rotate(' + r + 'deg)';
                }
                else {
                    o.style.MozTransform = 'rotate(-90deg)';
                }
            }
            else {
                o.style.MozTransform = 'rotate(-90deg)';
            }
        }
        if (Sys.chrome) {//Js判断为谷歌chrome浏览器

            currentFilter = o.style.WebkitTransform;
            if (currentFilter) {
                var filterMatch = currentFilter.match(/rotate\(([\-]\d+)deg\)/);
                if (filterMatch) {
                    var r = parseInt(filterMatch[1]) - 90;
                    if (r < -360)
                        r = -90;
                    o.style.WebkitTransform = 'rotate(' + r + 'deg)';
                } else {
                    o.style.WebkitTransform = 'rotate(-90deg)';
                }
            }
            else {
                o.style.WebkitTransform = 'rotate(-90deg)';
            }
        }
//        if (Sys.opera) {//Js判断为opera浏览器
//            currentFilter = o.style.OTransform;
//            if (currentFilter) {
//                var filterMatch = currentFilter.match(/rotate\(([\-]\d+)deg\)/);
//                if (filterMatch) {
//                    var r = parseInt(filterMatch[1]) - 90;
//                    if (r < -360)
//                        r = -90;
//                    o.style.OTransform = 'rotate(' + r + 'deg)';
//                } else {
//                    o.style.OTransform = 'rotate(-90deg)';
//                }
//            }
//            else {
//                o.style.OTransform = 'rotate(-90deg)';
//            }
//        }
//        if (Sys.safari) {//Js判断为苹果safari浏览器
//            currentFilter = o.style.Transform;
//        }
    }

}

/**
 * 图片右旋转
 */
function rotateRight(cid) {
    var o = '';
    if (cid === 0) {
        o = document.getElementById("main_img");
    } else if (cid === 1) {
        o = document.getElementById("main_img1");
    }
    if (window.attachEvent)//IE
    {
        var currentFilter = o.currentStyle.filter;
        if (currentFilter) {
            var filterMatch = currentFilter.match(/rotation=(\d)+/);
            var r = parseInt(filterMatch[1]) + 1;
            if (r > 3)
                r = 0;
            o.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + r + ')';
        }
        else {
            o.style.filter = 'progid:DXImageTransform.Microsoft.BasicImage(rotation=1)';
        }
//            document.getElementById('log').innerHTML = currentFilter;
    }
    else//非IE
    {
        var currentFilter = "";
        /*判断浏览器类型*/
        var Sys = {};
        var ua = navigator.userAgent.toLowerCase();
        var s;
        (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
            (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
                (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
                    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
                        (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
//            if (Sys.ie) {//Js判断为IE浏览器
//                alert('http://www.phpernote.com' + Sys.ie);
//                if (Sys.ie == '9.0') {//Js判断为IE 9
//                } else if (Sys.ie == '8.0') {//Js判断为IE 8
//                } else {
//                }
//            }
        if (Sys.firefox) {//Js判断为火狐(firefox)浏览器
            currentFilter = o.style.MozTransform;
            if (currentFilter) {
                var filterMatch = currentFilter.match(/rotate\(([\-]?\d+)deg\)/);
                var r = parseInt(filterMatch[1]) + 90;
                if (r > 0)
                    r = -270;
                o.style.MozTransform = 'rotate(' + r + 'deg)';
            }
            else {
                o.style.MozTransform = 'rotate(-270deg)';
            }
        }
        if (Sys.chrome) {//Js判断为谷歌chrome浏览器

            currentFilter = o.style.WebkitTransform;
            if (currentFilter) {
                var filterMatch = currentFilter.match(/rotate\(([\-]?\d+)deg\)/);
                var r = parseInt(filterMatch[1]) + 90;
                if (r > 0)
                    r = -270;
                o.style.WebkitTransform = 'rotate(' + r + 'deg)';
            }
            else {
                o.style.WebkitTransform = 'rotate(-270deg)';
            }
        }
//        if (Sys.opera) {//Js判断为opera浏览器
//            currentFilter = o.style.OTransform;
//            if (currentFilter) {
//                var filterMatch = currentFilter.match(/rotate\(([\-]?\d+)deg\)/);
//                var r = parseInt(filterMatch[1]) + 90;
//                if (r > 0)
//                    r = -270;
//                o.style.OTransform = 'rotate(' + r + 'deg)';
//            }
//            else {
//                o.style.OTransform = 'rotate(-270deg)';
//            }
//        }
//        if (Sys.safari) {//Js判断为苹果safari浏览器
//            currentFilter = o.style.Transform;
//        }
    }

}



