// 需求
/*
*
* 1.展开收起动画
* 2.查找替换的切换
* 3.查找功能
* 4.替换功能

* */


// 获取元素

var aboveText = document.querySelector('.above-text');

var oLis = document.querySelectorAll('.above-match li');//获取上面的展开，查找，替换三个按钮
var underside = document.querySelector('.underside'); //获取下面一大块的内容
var longInp = document.querySelector('.inp>input');//获取查找元素框
var shortInp = document.querySelectorAll('.mark input');//获取替换文本框
var inpBox = document.querySelector('.inp'); // 查找框
var markBox = document.querySelector('.mark'); // 替换框


var underBtns = document.querySelectorAll('.btn a'); //获取下面面板的查找替换按钮
var activeBtn = document.querySelector('.inp a'); // 获取执行查找按钮
var activeBtn2 = document.querySelector('.mark a'); // 获取执行查找按钮

var cancel = document.querySelector('.cancel'); // 取消按钮

// 整理内容
var isclick = -1; // 默认未点击过，内容隐藏状态
var timer = 0; // 记录定时器id
var duration = 100; // 运动时间

// 展开和收起功能
oLis[0].amina = false; // 默认未运动状态

oLis[0].onclick = function () {
    if (this.amina) return; // 如果是运动状态，就跳出整个运动
    this.amina = true; // 此时是运动状态

    if (isclick == -1) {
        oLis[0].innerHTML = '收起';

        // oLis[1].style.top = '80px';
        // oLis[2].style.top = '80px';
        // oLis[2].style.top = '160px';

        // 先让查找替换都先向下运动80px，再让替换再向下运动80px
        MTween(oLis[1], 80, duration, 'top', 'linear');
        MTween(oLis[2], 80, duration, 'top', 'linear', function () {
            MTween(oLis[2], 80, duration, 'top', 'linear',function (){
                oLis[0].amina = false; // 运动完恢复成未运动状态
                var a = 0;
                underside.style.display = 'block';
                underside.style.opacity = a/100;
                timer = setInterval(function (){
                    a+=2;
                    if(a>=100){
                        a=100;
                        clearInterval(timer);
                    }
                    underside.style.opacity = a/100;
                },5)
            });
        });


        isclick = 0;
    } else { // 否则，隐藏所有内容
        oLis[0].innerHTML = '展开';

        // 先让替换都先向上运动80px，再让两个一起回到原位
        MTween(oLis[2], -80, duration, 'top', 'linear', function () {
            MTween(oLis[1], -80, duration, 'top', 'linear');
            MTween(oLis[2], -80, duration, 'top', 'linear',function (){
                oLis[0].amina = false; // 运动完恢复成未运动状态
                var a = 100;
                underside.style.opacity = a/100;
                timer = setInterval(function (){
                    a-=2;
                    if(a<=0){
                        a=0;
                        clearInterval(timer);
                        underside.style.display = 'none';

                    }
                    underside.style.opacity = a/100;
                },5)
            });
        });

        isclick = -1;
    }
};


// 查找按钮点击

oLis[1].onclick = underBtns[0].onclick = function () {

    inpBox.style.display = 'block';
    markBox.style.display = 'none';

    // 清空替换框内容
    shortInp[0].value = '';
    shortInp[1].value = '';

};

// 替换按钮点击

oLis[2].onclick = underBtns[1].onclick = function () {

    inpBox.style.display = 'none';
    markBox.style.display = 'block';

    // 清空查找内容
    longInp.value = '';
};


// 查找内容


var totalText = aboveText.innerHTML; // (一直不会改变的)获取文本框内所有文字

var arrText = []; // 定义一个空数组

// // 点击查找执行按钮

activeBtn.onclick = function () {

    if (!longInp.value) { // 如果输入框没有内容，提示
        alert('请输入查找内容');
    } else {

        arrText = totalText.split(longInp.value); // 将文本框内容按照查找内容作为分隔符分隔成数组
        if(arrText.length == 1){
            alert('请重新输入内容');
        }
        aboveText.innerHTML = arrText.join('<span>' + longInp.value + '</span>'); // 将查找的字样加上样式

    }
};


// 替换内容

activeBtn2.onclick = function () {

    if (!shortInp[0].value || !shortInp[1].value) { // 如果输入框没有内容，提示
        alert('请输入替换内容');
    } else {
        arrText = totalText.split(shortInp[0].value);// 将数组按照需要替换的字分隔成数组，
        if(arrText.length == 1){
            alert('请重新输入内容');
        }
        aboveText.innerHTML = arrText.join('<span>' + shortInp[1].value + '</span>'); //再按照替换成的字，拼接成字符串

        // 将文本内容改成变化后的内容
        totalText = totalText.split(shortInp[0].value).join(shortInp[1].value);

    }
};


