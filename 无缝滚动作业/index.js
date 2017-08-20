/*
 无缝滚动思路
 1.首尾隔添加一张图片，以便障眼法的使用
 2.从左右按钮触发的事件做起
 3.先让图片无缝滚动起来
 4.再让小点运动起来
 */


// 获取元素
var contain = document.querySelector('#contain');
var oUl = document.querySelector('ul'); // 图片框
var imgs = oUl.querySelectorAll('img');

// 小点
var oDivs = document.querySelectorAll('.points div');

// 上一张下一张按钮
var prev = document.querySelector('.prev');
var next = document.querySelector('.next');

// 定义变量

var imgNum = 1; // 记录图片的下标
var pointNum = 0; // 记录小点的下标

var isClick = false; // 此时未点击状态

// 初始化位置

oUl.style.marginLeft = -600 * imgNum + 'px'; // 图片的初始化位置
MTween(oDivs[pointNum], 20, 500, 'height', 'linear'); // 第一个点的初始化位置


// 下一张按钮

next.onclick = function () {

    if(isClick) return; // 如果是点击状态，不执行下面操作
    isClick = true; // 处于点击状态

    //图片的运动

    MTween(oUl, -600, 500, 'marginLeft', 'linear', function () {
        imgNum++;
        if (imgNum >= imgs.length - 1) { // 如果图片运动到最后一张，匀速把他拉到第一张
            imgNum = 1;
            oUl.style.marginLeft = -600 * imgNum + 'px';
        }
        isClick = false; // 单次点击运动完，此时改为未点击状态
    });


    // 点的运动

    // 遍历所有圆点，恢复到原位
    MTween(oDivs[pointNum], -20, 500, 'height', 'linear');

    pointNum++; // 记录点的下标

    if (pointNum > oDivs.length - 1) {
        pointNum = 0; // 点的边界处理
    }

    // 遍历所有圆点，向上运动20
    MTween(oDivs[pointNum], 20, 500, 'height', 'linear');

};


// 上一张按钮

prev.onclick = function () {

    if(isClick) return; // 如果是点击状态，不执行下面操作
    isClick = true; // 处于点击状态



    //图片的运动

    MTween(oUl, 600, 500, 'marginLeft', 'linear', function () {
        imgNum--;

        if (imgNum <= 0) { // 如果图片运动到第一张，匀速把他拉到倒数第二张
            imgNum = imgs.length - 2;
            oUl.style.marginLeft = -600 * imgNum + 'px';
        }

        isClick = false; // 单次点击运动完，此时改为未点击状态
    });


    // 点的运动

    // 遍历所有圆点，恢复到原位
    MTween(oDivs[pointNum], -20, 500, 'height', 'linear');

    pointNum--; // 记录点的下标

    if (pointNum <0 ) {
        pointNum = oDivs.length - 1; // 点的边界处理
    }

    // 遍历所有圆点，向上运动20
    MTween(oDivs[pointNum], 20, 500, 'height', 'linear');

};


// 自动播放

var timer = setInterval(next.onclick,2000);

contain.onmouseover = function (){
    clearInterval(timer);
};

contain.onmouseout = function (){
    timer = setInterval(next.onclick,2000);
};

