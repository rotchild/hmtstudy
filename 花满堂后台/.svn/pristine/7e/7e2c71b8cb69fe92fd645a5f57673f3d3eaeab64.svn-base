//if (window.addEventListener) {
//    window.addEventListener('DOMMouseScroll', wheel, false);//给firefox添加鼠标滚动事件
//}
//
//function wheel(event) {
//    return wheelimg(event);
//}
//
//function wheelimg(event) {
//    var detail = 0;
//    var div = document.getElementById("div_mainImg");
//    //    var div = document.getElementById("div1");
//    if (event.detail) {
//        //如果是firefox
//        var allImg = div.getElementsByTagName('img');
//        //        var allImg = div.getElementsByTagName('img');
//        var isThis = false;//现判断鼠标中仑的元素是不是包含在那个div里面
//        for (i = 0; i < allImg.length; i++) {
//            isThis = true;
//            allImg[i].width = allImg[i].width + event.detail * 12;
//            event.returnValue = false;
//        }
//
//    }
//    return true;
//}


/**
 * 方法一
 * */
function bbimg() {
    var div = document.getElementById("div_mainImg");
    var allImg = div.getElementsByTagName('img');
    for (i = 0; i < allImg.length; i++) {
        var zoom = parseInt(allImg[i].style.zoom, 10) || 100;
        zoom += event.wheelDelta / 12;
        if (zoom > 0) allImg[i].style.zoom = zoom + '%';
    }

//

    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);//给firefox添加鼠标滚动事件
    }

    if (/Firefox/.test(navigator.userAgent)) {//判断Firefox
        window.addEventListener('DOMMouseScroll', wheel, false);
    }

    function wheel(event) {
        return wheelimg(event);
    }

    function wheelimg(event) {
        var detail = 0;
        var div = document.getElementById("div_mainImg");
        //    var div = document.getElementById("div1");
        if (event.detail) {
            //如果是firefox
            var allImg = div.getElementsByTagName('img');
            //        var allImg = div.getElementsByTagName('img');
            var isThis = false;//现判断鼠标中仑的元素是不是包含在那个div里面
            for (i = 0; i < allImg.length; i++) {
                isThis = true;
                allImg[i].width = allImg[i].width + event.detail * 12;
                event.returnValue = false;
            }

        }
        return true;
    }
}


/**
 * 方法二（1）
 * */
/*
 document.getElementById("oImage").addEventListener("DOMMouseScroll",function(event){
 console.log(event.detail)
 return Picture();
 },false);
 var count = 10;
 function Picture()
 {
 document.getElementById("oImage").style.height="500px"
 }
 */
//function bbb() {
//    console.log("进入缩放");
//    var div = document.getElementById("div_mainImg");
//    var allImg = div.getElementsByTagName('img');
//    $(".div_mainImg img").each(function () {
//        if ($.browser.msie) {
//            $(this).bind("mousewheel", function (e) {
//                var e = e || event, v = e.wheelDelta || e.detail;
//                if (v > 0)
//                    resizeImg(this, false);
//                else
//                    resizeImg(this, true);
//                window.event.returnValue = false;
//                //e.stopPropagation();
//                return false;
//            })
//        } else {
//            $(this).bind("DOMMouseScroll", function (event) {
//                if (event.detail < 0)
//                    resizeImg(this, false);
//                else
//                    resizeImg(this, true);
//                event.preventDefault();
//                //event.stopPropagation();
//            })
//        }
//    });
//    function resizeImg(node, isSmall) {
//        if (!isSmall) {
//            $(node).height($(node).height() * 1.2);
//        } else {
//            $(node).height($(node).height() * 0.8);
//        }
//    }
//}

/**
 * 方法二
 * */
//$(function(){
//    $(".body img").each(function(){
//        if($.browser.msie){
//            $(this).bind("mousewheel",function(e){
//                var e=e||event,v=e.wheelDelta||e.detail;
//                if(v>0)
//                    resizeImg(this,false);
//                else
//                    resizeImg(this,true);
//                window.event.returnValue = false;
//                //e.stopPropagation();
//                return false;
//            })
//        }else{
//            $(this).bind("DOMMouseScroll",function(event){
//                if(event.detail<0)
//                    resizeImg(this,false);
//                else
//                    resizeImg(this,true);
//                event.preventDefault()
//                //event.stopPropagation();
//            })
//        }
//    });
//    function resizeImg(node,isSmall){
//        if(!isSmall){
//            $(node).height($(node).height()*1.2);
//        }else
//        {
//            $(node).height($(node).height()*0.8);
//        }
//    }
//});

/**
 * 方法三
 * */
//(function () {
//    var zooming = function (e) {
//        e = window.event || e;
//        var o = this, data = e.wheelDelta || -e.detail * 40, zoom, size;//FF的e.detail跟wheelDelta是相反的
//        if (!+'\v1') {//IE
//            zoom = parseInt(o.style.zoom) || 100;
//            zoom += data / 12;
//            if (zoom > zooming.min)
//                o.style.zoom = zoom + '%';
//            e.returnValue = false;
//        } else {
//            size = o.getAttribute("_zoomsize").split(",");
//            zoom = parseInt(o.getAttribute("_zoom")) || 100;
//            zoom += data / 12;
//            if (zoom > zooming.min) {
//                o.setAttribute("_zoom", zoom);
//                o.style.width = size[0] * zoom / 100 + "px";
//                o.style.height = size[1] * zoom / 100 + "px";
//            }
//            e.preventDefault();//阻止默认行为
//            e.stopPropagation();//for firefox3.6
//        }
//    };
//    zooming.add = function (obj, min) {//第一个参数指定可以缩放的图片，min指定最小缩放的大小 ,default to 50
//        zooming.min = min || 50;
//        obj.onmousewheel = zooming;
//        if (/Firefox/.test(navigator.userAgent))//if Firefox
//            obj.addEventListener("DOMMouseScroll", zooming, false);
//        if (!!+'\v1') {//if not IE
//            obj.setAttribute("_zoomsize", obj.offsetWidth + "," + obj.offsetHeight);
//        }
//    };
//    window.onload = function () {//放在onload中，否则非ie中会无法计算图片大小出错
//        zooming.add(document.getElementById("testimg1"));
//    };
//})();

/**
 * 方法四
 // * */
//function bbb() {
//    var zooming = function (e) {
//
//        e = window.event || e;
//        var o = this, data = e.wheelDelta || -e.detail * 40, zoom, size;//FF的e.detail跟wheelDelta是相反的
//        if (!+'\v1') {//IE
//            zoom = parseInt(o.style.zoom) || 100;
//            zoom += data / 12;
//            if (zoom > zooming.min)
//                o.style.zoom = zoom + '%';
//            e.returnValue = false;
//        } else {
//            size = o.getAttribute("_zoomsize").split(",");
//            zoom = parseInt(o.getAttribute("_zoom")) || 100;
//            zoom += data / 12;
//            if (zoom > zooming.min) {
//                o.setAttribute("_zoom", zoom);
//                o.style.width = size[0] * zoom / 100 + "px";
//                o.style.height = size[1] * zoom / 100 + "px";
//            }
//            e.preventDefault();//阻止默认行为
//            e.stopPropagation();//for firefox3.6
//        }
//    };
//    zooming.add = function (obj, min) {//第一个参数指定可以缩放的图片，min指定最小缩放的大小 ,default to 50
//        zooming.min = min || 50;
//        obj.onmousewheel = zooming;
//        if (/Firefox/.test(navigator.userAgent))//if Firefox
//            obj.addEventListener("DOMMouseScroll", zooming, false);
//        if (!!+'\v1') {//if not IE
//            obj.setAttribute("_zoomsize", obj.offsetWidth + "," + obj.offsetHeight);
//        }
//    };
//
//    window.onload = function () {//放在onload中，否则非ie中会无法计算图片大小出错
////    var div = document.getElementById("div_mainImg");
////    zooming.add($("div_mainImg").getElementById("main_img"));
//        zooming.add(document.getElementsByClassName('img3'));
//    };
//}