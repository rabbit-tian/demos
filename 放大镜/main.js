window.onload = function () {
	
	var imgBox = document.getElementById("imgBox"),
		scope = document.getElementById("scope"),
		bigImg = document.getElementById("bigImg");
	
	imgBox.onmouseover = function () {
		scope.style.display = 'block';
		bigImg.style.display = 'block';

		imgBox.onmousemove = function (e) {
			var e = e||event;
			scope.style.top = (e.clientY-imgBox.offsetTop) - (scope.offsetHeight/2) + 'px';
			scope.style.left = (e.clientX-imgBox.offsetLeft) - (scope.offsetWidth/2) + 'px';

			if (scope.offsetLeft<0) {
				scope.style.left = '0px'
			}
			if (scope.offsetLeft>imgBox.offsetWidth-scope.offsetWidth) {
				scope.style.left = imgBox.offsetWidth-scope.offsetWidth + 'px'
			}
			if (scope.offsetTop<0) {
				scope.style.top = '0px'
			}
			if (scope.offsetTop>imgBox.offsetHeight-scope.offsetHeight) {
				scope.style.top = imgBox.offsetHeight-scope.offsetHeight + 'px';
			}
			bigImg.style.backgroundPosition = -(scope.offsetLeft*2)+'px '+ -(scope.offsetTop*2)+'px';
		}
	};
	
	imgBox.onmouseout = function () {
		scope.style.display = 'none';
		bigImg.style.display = 'none';
		imgBox.onmousemove = null;
	}
	
};