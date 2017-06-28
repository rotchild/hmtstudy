function scrollPics() {

    function $(e) {
        return document.getElementById(e);
    }

    document.getElementsByClassName = function (cl) {
        var retnode = [];
        var myclass = new RegExp('\\b' + cl + '\\b');
        var elem = this.getElementsByTagName('*');
        for (var i = 0; i < elem.length; i++) {
            var classes = elem[i].className;
            if (myclass.test(classes)) retnode.push(elem[i]);
        }
        return retnode;
    };

    var MyMar;
    var speed = 5; //速度，越大越慢
    var spec = 10; //每次滚动的间距, 越大滚动越快
    var ipath = '../../../images/'; //图片路径
    var w = 0;
    var spa = 4;//缩略图区域补充数值

    var thumbs = $('showArea').getElementsByClassName('thumb_img');
    //console.log("获取图片的个数：" + thumbs.length);

    var rHtml = '';
    for (var i = 0; i < thumbs.length; i++) {
        rHtml += '<img src="' + thumbs[i].getAttribute('src') + '"/>';
    }

    w = thumbs.length * 220 + thumbs.length * 10;
    h = 180;
    //console.log("需要加上的宽度为：" + w);
    $('showArea').style.width = w + 'px';
    $('showArea').style.height = h + 'px';
    $('showArea').style.margin = 6 + 'px';
    var rLoad = document.createElement("div");
    $('photos').appendChild(rLoad);
    rLoad.style.width = "1px";
    rLoad.style.height = "1px";
    rLoad.style.overflow = "hidden";
    rLoad.innerHTML = rHtml;

    $('goleft').onmouseover = function () {
        this.src = ipath + 'goleft.png';
        MyMar = setInterval(goleft, speed);
    };

    $('goleft').onmouseout = function () {
        this.src = ipath + 'goleft2.png';
        clearInterval(MyMar);
    };

    $('goright').onmouseover = function () {
        this.src = ipath + 'goright.png';
        MyMar = setInterval(goright, speed);
    };

    $('goright').onmouseout = function () {
        this.src = ipath + 'goright2.png';
        clearInterval(MyMar);
    };

    function goleft() {
        $('photos').scrollLeft -= spec;
    }

    function goright() {
        $('photos').scrollLeft += spec;
    }

}

function scrollPics02() {

    function $(e) {
        return document.getElementById(e);
    }

    document.getElementsByClassName = function (cl) {
        var retnode = [];
        var myclass = new RegExp('\\b' + cl + '\\b');
        var elem = this.getElementsByTagName('*');
        for (var i = 0; i < elem.length; i++) {
            var classes = elem[i].className;
            if (myclass.test(classes)) retnode.push(elem[i]);
        }
        return retnode;
    };

    var thumbs = $('showArea').getElementsByClassName('thumb_img');
//    console.log("获取图片的长度：" + thumbs.length);

    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].onmouseover = function () {
            $('main_img').src = this.src;
            var step = this.id.lastIndexOf(1);
            if (step !== -1) {
                var record = Ext.getStore('ImageInfo').getAt(step - 1);
                var pictureview = Ext.ComponentQuery.query("pictureview")[0];
                pictureview.setRecord(record);
            }
            PicView(0);
            initImg(this, 1);
        };
    }

}

//function scrollPics03() {
//
//    function $(e) {
//        return document.getElementById(e);
//    }
//
//    document.getElementsByClassName = function (cl) {
//        var retnode = [];
//        var myclass = new RegExp('\\b' + cl + '\\b');
//        var elem = this.getElementsByTagName('*');
//        for (var i = 0; i < elem.length; i++) {
//            var classes = elem[i].className;
//            if (myclass.test(classes)) retnode.push(elem[i]);
//        }
//        return retnode;
//    };
//
//    var thumbs2 = $('showArea2').getElementsByClassName('thumb_img2');
////    console.log("获取图片的长度：" + thumbs2.length);
//    for (var j = 0; j < thumbs2.length; j++) {
//        thumbs2[j].onmouseover = function () {
//            $('main_img').src = this.src;
//        }
//    }
//
//}


