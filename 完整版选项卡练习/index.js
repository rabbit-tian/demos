/*
选项卡自动播放思路
1.要把每一个需求分开写
2.先从子菜单的自动播放开始
3.然后切换大面板和子菜单，以及图片框和图片

选项卡移入效果思路
1.整个大盒子，移入停止定时器，移出开启定时器
2.大标题的移入效果：以鼠标移入的标题为零界点，移入前清空样式，移入后添加样式
3.子菜单的移入效果：先获取每个大标题下的子菜单，再根据鼠标移入的子菜单为零界点，移入前清空样式，移入后添加样式


小标题和大面板的关系：
当一个大面板中子菜单运动到最后一个时，切换到下一个大面板，同时也要获取下一个面板下的子菜单
* */

// 封装元素获取函数
function $(name) {
    return typeof name == "string" ? document.querySelectorAll(name).length > 1 ? document.querySelectorAll(name) : document.querySelector(name) : name;
}

// 获取元素

var contain = $('#contain'); // 整个大框

var oLis = $('li'); // 大标题

var oLists = $('.list'); // 大板块
var listMenu = oLists[0].querySelectorAll('.list2'); // 获取第一个板块下的三个子菜单

var imgBoxs = $('.img'); // 图片的外框
var oImgs = imgBoxs[0].querySelectorAll('img'); // 获取第一个图片框内的图片集合

// 整理数据
var timer = 0; // 记录定时器的id
var smallNum = 0; // 记录子菜单的下标
var bigNum = 0; // 记录大面板的下标


autoPlay(); // 页面刷新状态为自动播放阶段

// 先从子菜单的自动播放入手

function autoPlay(){
    timer = setInterval(function (){
        // 清除变化之前子菜单的样式
        listMenu[smallNum].style.backgroundColor = '';
        oImgs[smallNum].style.display = 'none'; // 上一张图片隐藏

        smallNum++; // 记录子菜单下标

        if(smallNum>listMenu.length-1){ // 子菜单的边界处理
            smallNum = 0;

            // 清除样式
            oLists[bigNum].style.display = 'none';// 隐藏上一块面板
            oLis[bigNum].style.backgroundColor = ''; // 清除上个标题颜色
            imgBoxs[bigNum].style.display = 'none'; // 隐藏前图片框


            bigNum++; // 第一个面板的子菜单走完，此时进入第二个面板

            // 下一块面板显示
            if(bigNum>oLists.length-1){
                bigNum = 0; // 大面板的边界处理
            }

            oLists[bigNum].style.display = 'block'; // 显示当前面板
            oLis[bigNum].style.backgroundColor = 'red'; // 当前标题为红色
            imgBoxs[bigNum].style.display = 'block'; // 显示当前图片框


            listMenu = oLists[bigNum].querySelectorAll('.list2');// 获取新面板下的子菜单
            oImgs = imgBoxs[bigNum].querySelectorAll('img');// 获取新面板下的子菜单
        }

        // 让当前子菜单添加样式
        listMenu[smallNum].style.backgroundColor = 'pink';

        // 更换图片
        oImgs[smallNum].style.display = 'block'; // 下一张图片显示

    },500);
}


// 鼠标移入移出大框效果

contain.onmouseover = function (){
    clearInterval(timer);
};

contain.onmouseout= function (){
    autoPlay();
};


// 鼠标移出大标题的效果

for (var i = 0; i < oLis.length; i++) {
    oLis[i].index = i; // 记录大标题的下标

    oLis[i].onmouseover = function (){
        // 清除之前的样式
        oLis[bigNum].style.backgroundColor = ''; // 清除标题样式
        oLists[bigNum].style.display = 'none'; // 隐藏上个面板
        listMenu[smallNum].style.backgroundColor = ''; // 清除上个子菜单样式

        imgBoxs[bigNum].style.display = 'none'; // 隐藏上个图片框
        oImgs[smallNum].style.display = 'none'; // 上一张图片隐藏

        bigNum = this.index;
        smallNum = 0;

        oLis[bigNum].style.backgroundColor = 'red';// 给当前的标题加上样式
        oLists[bigNum].style.display = 'block'; // 显示当前面板

        listMenu = oLists[bigNum].querySelectorAll('.list2');// 获取新面板下的子菜单
        listMenu[smallNum].style.backgroundColor = 'pink'; // 当前子菜单为粉色

        imgBoxs[bigNum].style.display = 'block'; // 显示当前图片框
        oImgs = imgBoxs[bigNum].querySelectorAll('img');// 获取新面板下的图片
        oImgs[smallNum].style.display = 'block'; // 下一张图片显示
    };


    // 子菜单的移入效果

    var menu = oLists[i].querySelectorAll('.list2');// 获取当前面板下的子菜单

    for (var j = 0; j < menu.length; j++) {
        menu[j].index = j;

        menu[j].onmouseover = function (){

            // 先清除样式
            listMenu[smallNum].style.backgroundColor = ''; // 清除上个子菜单样式
            oImgs[smallNum].style.display = 'none'; // 上一张图片隐藏


            smallNum = this.index;

            listMenu[smallNum].style.backgroundColor = 'pink'; // 当前子菜单为粉色
            oImgs[smallNum].style.display = 'block'; // 下一张图片显示
        }

    }

}






