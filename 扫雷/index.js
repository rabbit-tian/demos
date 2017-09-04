//获取元素

var smallBoxs; //100个小格子
var box = document.querySelector('.box'); //游戏盒子
var eArr = [];//元素的数组  一行一个
var c4Arr = [];//储存雷的位置


//游戏开始
start();

function start() {
	box.innerHTML = ''; //清空游戏盒子的结构
	for(var i = 0; i < 100; i++) { //写入100个input
		box.innerHTML += "<input type='button'>";
	}
	smallBoxs = document.querySelectorAll('.box input'); //找到100个按钮
	
	
	
	//在100个按钮中随机找到10个数字,用于存放雷
	c4Arr = [];
	while(c4Arr.length < 10) {
		var num = Math.floor(Math.random() * 100);
		var repeat = false;
		for(var i = 0; i < c4Arr.length; i++) {
			if(c4Arr[i] == num) {
				repeat = true;
				break;
			}
		}
		if(!repeat) {
			c4Arr.push(num);
		}
	}
	
	
	
	//将这10个数字代表的按钮  安装炸弹
	for(var i = 0; i < c4Arr.length; i++) {
		smallBoxs[c4Arr[i]].bomb = true;
	}
	
	//每一行放在一起
	var arr = [];
	eArr = [];
	for(var i = 0; i < smallBoxs.length; i++) {
		if(i < 10) {
			smallBoxs[i].index = '0' + i
		} else {
			smallBoxs[i].index = '' + i;
		}
		arr.push(smallBoxs[i]);
		if((i + 1) % 10 == 0) {
			eArr.push(arr);
			arr = [];
		}
		smallBoxs[i].onclick = function() {
			find(this);
		}
	}

}

//扫雷函数  
/**
 * 功能  查找当前按钮以及周围至多8个按钮
 * 
 * 
 * 参数
 * obj = 要查找的按钮
 * 
 * 
 * */

function find(obj) {
	//判断自己
	if(obj.bomb) {
		gemeover();
		return;
	}
	//禁用此按钮
	obj.disabled = true;
	obj.style.backgroundColor = '#fff';
	
	
	//声明一个变量保存周围雷数
	var num = 0;
	
	
	//获得行和列  
	var line = parseInt(obj.index.charAt(0)); //行
	var rank = parseInt(obj.index.charAt(1)); //列

	//判断左上
	if(eArr[line - 1] && eArr[line - 1][rank - 1]) {
		if(eArr[line - 1][rank - 1].bomb) {
			num++;
		}
	}

	//判断正上
	if(eArr[line - 1] && eArr[line - 1][rank]) {
		if(eArr[line - 1][rank].bomb) {
			num++;
		}
	}

	//判断右上
	if(eArr[line - 1] && eArr[line - 1][rank + 1]) {
		if(eArr[line - 1][rank + 1].bomb) {
			num++;
		}
	}

	//判断正右
	if(eArr[line] && eArr[line][rank + 1]) {
		if(eArr[line][rank + 1].bomb) {
			num++;
		}
	}

	//判断右下
	if(eArr[line + 1] && eArr[line + 1][rank + 1]) {
		if(eArr[line + 1][rank + 1].bomb) {
			num++;
		}
	}

	//判断正下
	if(eArr[line + 1] && eArr[line + 1][rank]) {
		if(eArr[line + 1][rank].bomb) {
			num++;
		}
	}

	//判断左下
	if(eArr[line + 1] && eArr[line + 1][rank - 1]) {
		if(eArr[line + 1][rank - 1].bomb) {
			num++;
		}
	}

	//判断正左
	if(eArr[line] && eArr[line][rank - 1]) {
		if(eArr[line][rank - 1].bomb) {
			num++;
		}
	}


	//判断是否有雷
	if(num != 0) {
		obj.value = num;//显示雷的总数
	} else {
		//查找左上
		if(eArr[line - 1] && eArr[line - 1][rank - 1]) {
			if(!eArr[line - 1][rank - 1].disabled) {
				console.log('查找左上')
				find(eArr[line - 1][rank - 1]);
			}
		}

		//判断正上
		if(eArr[line - 1] && eArr[line - 1][rank]) {
			if(!eArr[line - 1][rank].disabled) {
				find(eArr[line - 1][rank]);
			}
		}

		//判断右上
		if(eArr[line - 1] && eArr[line - 1][rank + 1]) {
			if(!eArr[line - 1][rank + 1].disabled) {
				find(eArr[line - 1][rank + 1]);
			}
		}

		//判断正右
		if(eArr[line] && eArr[line][rank + 1]) {
			if(!eArr[line][rank + 1].disabled) {
				find(eArr[line][rank + 1]);
			}
		}

		//判断右下
		if(eArr[line + 1] && eArr[line + 1][rank + 1]) {
			if(!eArr[line + 1][rank + 1].disabled) {
				find(eArr[line + 1][rank + 1]);
			}
		}

		//判断正下
		if(eArr[line + 1] && eArr[line + 1][rank]) {
			if(!eArr[line + 1][rank].disabled) {
				find(eArr[line + 1][rank]);
			}
		}

		//判断左下
		if(eArr[line + 1] && eArr[line + 1][rank - 1]) {
			if(!eArr[line + 1][rank - 1].disabled) {
				find(eArr[line + 1][rank - 1]);
			}
		}

		//判断正左
		if(eArr[line] && eArr[line][rank - 1]) {
			if(!eArr[line][rank - 1].disabled) {
				find(eArr[line][rank - 1]);
			}
		}
	}
}

function gemeover() {
	alert('游戏结束');
	for (var i = 0; i < c4Arr.length; i++) {
		smallBoxs[c4Arr[i]].value = '雷';
	}
}