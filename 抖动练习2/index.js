/*
* 思路分析
*
* 1.先做头部的设置时间
* 2.设计倒计时
*
* */


// 1.先做头部的时间
// 2.设计倒计时

// 获取元素
var remain = document.querySelectorAll('.remain');// 剩余时间

var aBtns = document.querySelectorAll('.header a'); // 确定按钮
var mark = document.querySelectorAll('.mark'); // 阴影层

var oLis = document.querySelectorAll('.section li'); // 四个大框

var oTime = document.querySelectorAll('.time'); // 时间设置框

var oSign = document.querySelectorAll('.sign'); // 商品下架图片元素

var contentUl = document.querySelector('.content ul'); // 放下架信息的盒子


// 遍历按钮，添加点击事件
for (var i = 0; i < aBtns.length; i++) {
    aBtns[i].index = i;
    // 点击确定按钮,设计倒计时时间
    aBtns[i].onclick = function () {
        var oInputs = oTime[this.index].querySelectorAll('input'); // 获取设置时间

        endTime = '';
        var oYear = oInputs[0].value;
        var oMon = oInputs[1].value - 1;
        var oDay = oInputs[2].value;
        var oHour = oInputs[3].value;
        var oMin = oInputs[4].value;
        var oSec = oInputs[5].value;

//1.设置到期时间
        var endTime = new Date(oYear, oMon, oDay, oHour, oMin, oSec);

        remain[this.index].innerHTML = time(endTime, this.index); // 刷新时出现时间

        clearInterval(oLis[this.index].timer);
        // 开启定时器，记录倒计时时间
        oLis[this.index].timer = setInterval(function () {
            remain[this.index].innerHTML = time(endTime, this.index);//每秒钟重新计算一次
        }.bind(this), 1000);

    };

}


//倒计时函数
function time(end, index) { // end:设计时间   index:传按钮的自定义属性

    //2.获取当前的时间
    var currTime = new Date();

    //计算时间差 设置的时间戳 - 当前的时间戳
    //  getTime()  获取时间戳的方法
    var time = end.getTime() - currTime.getTime();

    if (time <= 0) {
        time = 0;
        // 盖章"商品已下架"
        oSign[index].style.opacity = 1;// 下架图片显示

        clearInterval(oLis[index].timer); // 时间为0时，清除定时器

        MTween(oSign[index],-160,300,'background-size','linear',function (){ // 图片缩小运动

            mark[index].style.display = 'block'; // 阴影层显示
            mark[index].style.opacity = 0; // 阴影层显示
            opa(mark[index],.3); // 透明度变化到1

            shake(oLis[index], 'marginTop', 30, 5, function () {// li框抖动

                var mainP = oLis[index].querySelectorAll('p'); // 商品信息

                contentUl.innerHTML += '<li><span>'+mainP[0].innerHTML+'</span><span>'+mainP[1].innerHTML+'</span></li>';

                contentUl.style.opacity = 0; // 先让其透明度变为0

                opa(contentUl,1); // 透明度变化到1
            });
        });

    }

    //计算天数
    var d = parseInt(time / 86400000);
    //计算 时
    var h = parseInt(time % 86400000 / 3600000);
    //计算 分
    var m = parseInt(time % 3600000 / 60000);
    //计算秒
    var s = parseInt(time % 60000 / 1000);

    return '剩余时间：'+ double(d) + '天' + double(h) + '时' + double(m) + '分' + double(s) + '秒';

}

// 补零函数
function double(n) {
    n < 10 ? n = '0' + n : n = '' + n;
    return n;
}

// 透明度动画
function opa(obj,end,fn){

    //初识透明
    var opacity = 0;

    clearInterval(obj.timer);
    obj.timer = setInterval(function(){

        opacity += 10;

        obj.style.opacity = opacity/100;

        if(opacity>=end*100){
            opacity=end*100;
            clearInterval(obj.timer);
            fn&&fn();
        }

    },30);
}