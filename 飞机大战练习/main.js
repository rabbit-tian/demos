window.onload = function() {

	var oDiv = document.getElementById("aircraft");
	var enemyA = 0;
	var timer = 0;
	move()
	var Dclientwidth = document.documentElement.clientWidth;
	var Dclientheight = document.documentElement.clientHeight;

	function move() {
		var t = false,
			l = false,
			r = false,
			b = false,
			space = false;
		bing(document, 'keydown', function(ev) {
			var ev = ev || event;

			switch(ev.keyCode) {
				case 37:
					l = true;
					break;
				case 38:
					t = true;
					break;
				case 39:
					r = true;
					break;
				case 40:
					b = true;
					break;
				case 32:
					space = true;
				default:
					break;
			}
			if(space) {
				bullet()
			}
		})
		timer = setInterval(function() {
			if(l) oDiv.style.left = oDiv.offsetLeft - 10 + 'px';
			if(t) oDiv.style.top = oDiv.offsetTop - 10 + 'px';
			if(r) oDiv.style.left = oDiv.offsetLeft + 10 + 'px';
			if(b) oDiv.style.top = oDiv.offsetTop + 10 + 'px';
			if(oDiv.offsetLeft < 0) oDiv.style.left = '0px';
			if(oDiv.offsetTop < 0) oDiv.style.top = '0px';
			if(oDiv.offsetLeft > Dclientwidth - oDiv.offsetWidth) oDiv.style.left = Dclientwidth - oDiv.offsetWidth + 'px';
			if(oDiv.offsetTop > Dclientheight - oDiv.offsetHeight) oDiv.style.top = Dclientheight - oDiv.offsetHeight + 'px';

			if(enemycraft) {
				for(var i = 0; i < enemycraft.length; i++) {
					enemycraft[i].enemyB = enemycraft[i].offsetTop + enemycraft[i].offsetHeight;
					enemycraft[i].enemyL = enemycraft[i].offsetLeft;
					enemycraft[i].enemyR = enemycraft[i].offsetLeft + enemycraft[i].offsetWidth;
					enemycraft[i].enemyT = enemycraft[i].offsetTop;
					if(oDiv.offsetTop < enemycraft[i].enemyB && oDiv.offsetLeft+oDiv.offsetWidth > enemycraft[i].enemyL && oDiv.offsetLeft < enemycraft[i].enemyR && oDiv.offsetTop + oDiv.offsetHeight > enemycraft[i].enemyT) {
						clearInterval(enemycraft[i].timer);
						clearInterval(enemyA);
						clearInterval(timer)
						alert('游戏结束');
						oDiv.style.top = Dclientheight - oDiv.offsetHeight + 'px';
						oDiv.style.left = '50%';
						for(var j = 0; j < enemycraft.length; j++) {
							document.body.removeChild(enemycraft[j]);
						}

					}
				}
			}

		}, 20)
		bing(document, 'keyup', function(ev) {
			var ev = ev || event;
			switch(ev.keyCode) {
				case 37:
					l = false;
					break;
				case 38:
					t = false;
					break;
				case 39:
					r = false;
					break;
				case 40:
					b = false;
					break;
				case 32:
					space = false;
				default:
					break;
			}
		})
		window.onresize = function() {
			Dclientwidth = document.documentElement.clientWidth;
			Dclientheight = document.documentElement.clientHeight;
		}
	}

	function bing(obj, evname, fn) {
		if(obj.addEventListener) {
			obj.addEventListener(evname, fn, false)
		} else {
			obj.attachEvent('on' + evname, function() {
				fn.call(obj);
			})
		}
	}

	var enemycraft = null;

	function bullet() {
		var div = document.createElement('div');
		div.className = 'bullet';
		div.style.left = oDiv.offsetLeft + 63 + 'px';
		div.style.top = oDiv.offsetTop - 10 + 'px';
		document.body.appendChild(div);
		div.timer = setInterval(function() {
			div.style.top = div.offsetTop - 10 + 'px';

			if(enemycraft) {
				for(var i = 0; i < enemycraft.length; i++) {
					enemycraft[i].enemyB = enemycraft[i].offsetTop + enemycraft[i].offsetHeight;
					enemycraft[i].enemyL = enemycraft[i].offsetLeft;
					enemycraft[i].enemyR = enemycraft[i].offsetLeft + enemycraft[i].offsetWidth;
					if(div.offsetTop < enemycraft[i].enemyB && div.offsetLeft > enemycraft[i].enemyL && div.offsetLeft < enemycraft[i].enemyR) {
						clearInterval(enemycraft[i].timer);
						clearInterval(div.timer);
						document.body.removeChild(div);
						document.body.removeChild(enemycraft[i]);

					}

				}
			}

			if(div.offsetTop < 0) {
				clearInterval(div.timer);
				document.body.removeChild(div);
			}

		}, 20)

	}
	enemyA = setInterval(function() {
		creataircraft()
	}, 500)

	function creataircraft() {
		var div = document.createElement('div');
		div.className = 'enemy';
		var randomLeft = Math.round(Math.random() * (Dclientwidth - 120));
		div.style.left = randomLeft + 'px';
		document.body.appendChild(div);
		enemycraft = document.querySelectorAll(".enemy");
		div.timer = setInterval(function() {
			div.style.top = div.offsetTop + 2 + 'px';
			if(div.offsetTop > Dclientheight - 95) {
				clearInterval(enemyA);
				alert('游戏结束');
				for(var i = 0; i < enemycraft.length; i++) {
					clearInterval(enemycraft[i].timer);
					document.body.removeChild(enemycraft[i]);
				}

			}

		}, 20)
	}

}