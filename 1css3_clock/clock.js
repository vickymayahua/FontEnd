window.onload = function(){
	var oBox = document.getElementById('box');
	//html5引入的js常用对象
	var oH = document.querySelector('.hour');
	var oM = document.querySelector('.min');
	var oS = document.querySelector('.sec');
	//生成刻度
	var N = 60;
	for (var i = 0; i < N; i++) {
		var oSpan = document.createElement('span');
		if (i%5 == 0) {
			oSpan.className = 'bs';//设置粗的整点
			var num = (i/5 ==0?12:i/5);
			oSpan.innerHTML = '<em>'+num+'<em>';
			oSpan.style.cssText = '-webkit-transform: rotate('+i*6+'deg)';
			//上面的一行在改变<span>的时候，同样也改变了里面的div，所以要再次旋转回来，如下：
			oSpan.children[0].style.cssText = '-webkit-transform: rotate('+-i*6+'deg)';//这里是(-i)
		}else{
			oSpan.className = 'scale';//设置细的刻度
		}
		oBox.appendChild(oSpan);
		//每一个刻度都是偏移6度
		oSpan.style.cssText = '-webkit-transform: rotate('+i*6+'deg)';
	}
	//设置时间移动
	function clock(){
		//获得当前时间
		var oDate = new Date();
		var h = oDate.getHours();
		var m = oDate.getMinutes()+1;
		var s = oDate.getSeconds();
		var ms = oDate.getMilliseconds();
		/*
		1小时间隔30deg，然后看看经过多少分钟，在按照比例取
		*/
		oH.style.cssText = '-webkit-transform: rotate('+(h*30+m/60*30)+'deg)';
		oM.style.cssText = '-webkit-transform: rotate('+(m*6+s/60*6)+'deg)';
		oS.style.cssText = '-webkit-transform: rotate('+(s*6+ms/1000*6)+'deg)';
	}
	clock();
	/*setInterval() 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式*/
	setInterval(clock,300);

}