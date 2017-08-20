/*
*思路
* 1.先把当前时间添加上
* 2.再让图片翻转
* 3.最后添加点的闪烁
*
* */


//获取元素
var oDivs = document.querySelectorAll('div');// 获取所有装时间图片的盒子
var points = document.querySelectorAll('li>img'); // 获取小点
var timer = 0; // 记录定时器的id

var oldTime = getTime(); // 先获取一个以前的时间，再拿当前时间和以前时间作比较

//先设置页面刷新状态的时间

for (var i = 0; i < oDivs.length; i++) {

    oDivs[i].querySelectorAll('img')[0].src = 'images/' + oldTime[i] + '.jpg';

}


// 开启定时器，显示时间

timer = setInterval(function () {
    // 先加上小点
    for (var i = 0; i < points.length; i++) {

        points[i].src = 'images/b.jpg'; // 先去掉小点

    }
    // 隔半秒加上小点
    setTimeout(function () {
        for (var i = 0; i < points.length; i++) {

            points[i].src = 'images/c.jpg';

        }
    }, 500);


    autoPlay(); //时间滑动函数

}, 1000);


// 自动播放
function autoPlay() {

    var time = getTime(); // 获取当前时间

    // 获取显示时间的图片
    for (var i = 0; i < time.length; i++) {
        if (oldTime[i] != time[i]) {
            slied(i, time);
        }// 如果当前时间和上个时间不相等，图片向上切换
    }
    oldTime = time; // 此时图片滑动完，让之前时间等于当前时间
}


// 图片向上切换

function slied(n, time) {
    var imgs = oDivs[n].querySelectorAll('img'); // 获取每个div下的两张图片，就是时分秒
    // console.log(imgs);

    imgs[1].src = 'images/' + time[n] + '.jpg'; //让运动到显示框中的图片时间等于当前时间

    MTween(oDivs[n], -170, 400, 'top', 'linear', function () {
        imgs[0].src = 'images/' + time[n] + '.jpg'; // 让装图片时间的盒子向上移动，图片时间等于当前时间，以备下次显示
        oDivs[n].style.top = ''; // 当div向上运动到自身一般一般距离，再拉回来，循环运动
    });
}

// 获取当前时间函数

function getTime() {
    // 先获取当前时间
    var date = new Date();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    var time = toTwo(h) + toTwo(m) + toTwo(s); // 获取当前时间的字符串
    // console.log(s);
    return time;
}

// 补零和转成字符串
function toTwo(n) {
    return n < 10 ? n = '0' + n : n = '' + n;
}







