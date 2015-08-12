window.onload = function(){
	//alert("message");
	//使用id来寻找canvas
	var canvas = document.getElementById("myCanvas");
	//创建context对象，getContext("2d")对象是内建的HTML5对象，拥有多种绘制路径
	//调用getContext("2d")会返回一个 CanvasRenderingContext2D对象
	var ctx = canvas.getContext("2d");

	//设置画布的大小为全屏幕
	var W = window.innerWidth, H = window.innerHeight;
	canvas.width = W;
	canvas.height = H;

	//定义微粒子数组
	var particles = [];
	//创建鼠标对象
	var mouse = {};
	
	//创建一次粒子
	var particle_count = 50;
	for(var i = 0; i < particle_count; i++){
		particles.push(new particle());
	}

	//为canvas注册事件处理程序：鼠标移动 false是冒泡阶段处理程序
	canvas.addEventListener('mousemove', track_mouse, false);
	function track_mouse(e){
	/*画布上的坐标 在这里 想当于 文档上坐标*/
		mouse.x = e.pageX;
		mouse.y = e.pageY;
	}

	//定义一个particle类
	function particle(){
		//设置速度speed.x -2.5 to 2.5
		//speed.y -15 to -5
		this.speed = {x: -2.5+Math.random()*5, y: -15+Math.random()*10};
		//location是鼠标坐标
		if(mouse.x && mouse.y){
			this.location = {x: mouse.x, y: mouse.y};
		}else{
			this.location = {x: W*0.5, y: H*0.5};
		}
		//半径的范围10-30
		this.radius = 10+Math.random()*20;
		//life生存时间20-30
		this.life = 20+Math.random()*10;
		//剩余时间
		this.remaining_life = this.life;

		//设置火焰的颜色
		//将得到的随机数 四舍五入 为整数
		this.r = Math.round(Math.random()*255);
		this.g = Math.round(Math.random()*255);
		this.b = Math.round(Math.random()*255);
	}

	function draw(){
		//在 旧图像 上显示 新图像
		ctx.globalCompositeOperation = "source-over";
		//设置画布的整个背景为黑色
		ctx.fillStyle = "black";
		//填充区域的大小
		ctx.fillRect(0, 0, W, H);
		ctx.globalCompositeOperation = "lighter";

		//画出每一个粒子
		for(var i = 0; i < particles.length; i++){
			var p = particles[i];
			//起始一条路径 或重置当前路径
			ctx.beginPath();
			//随着时间的消逝 改变 粒子的透明度 百分之几
			p.opacity = Math.round(p.remaining_life/p.life*100)/100;
			//创建 放射环(圆形渐变) 的渐变(gradient)
			var gradient = ctx.createRadialGradient(p.location.x, p.location.y, 0, p.location.x, p.location.y, p.radius);
			//起始位置的颜色和透明度
			gradient.addColorStop(0, "rgba("+p.r+","+p.g+","+p.b+","+p.opacity+")");
			//中间位置的颜色和透明度
			gradient.addColorStop(0.5, "rgba("+p.r+", "+p.g+", "+p.b+", "+p.opacity+")");
			gradient.addColorStop(1, "rgba("+p.r+", "+p.g+", "+p.b+", 0)");
			//用渐变填充
			ctx.fillStyle = gradient;
			//arc用于创建圆 或者是 部分圆
			//参数：中心x、中心y、圆半径、起始角、终止角、顺时针或逆时针
			ctx.arc(p.location.x, p.location.y, p.radius, 0, Math.PI*2, false);
			//填充当前绘图路径
			ctx.fill();


			//每一个粒子的移动
			p.remaining_life--;
			p.radius--;
			p.location.x += p.speed.x;
			p.location.y += p.speed.y;

			if (p.remaining_life < 0 || p.radius < 0) {
				particles[i] = new particle();
			};
		}

	}
	setInterval(draw, 30);//每隔30ms调用一次

}