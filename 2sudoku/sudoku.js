/*
九宫格小游戏
1. 8种结果
2. 有结果的时候，至少有5颗子
3. 将甲乙两方的棋子的index各放入两个数组中
4. 把结果存在一个数组中，然后和棋子数组进行比较
*/
	var classselect = 0;//决定未来下棋的是哪一方
	var lis = document.getElementsByTagName('li');//格子对象
	var lock = document.getElementById('lock');//结果出现之后，不能下棋，得重新来过
	var win = [[0,1,2],[3,4,5],[6,7,8],[2,5,8],[1,4,7],[0,3,6],[0,4,8],[2,4,6]];//赢的结果
	var x=[];//放×方下过的格子的index
	var o=[];//放o方下过的格子的index
	var winnum = 0; //出现平局
	var len = lis.length;//先计算出来，这样高效
	var  winlen = win.length;

	for (var i = 0; i <len; i++) {

	lis[i].onclick = function(){
		if (this.className == "") {//如果classname为空，则说明该格子还是空
			
			if (classselect%2 == 1) {
				this.className = "o";
				o.push(this.innerHTML);
			} else if(classselect%2 == 0){
				this.className = "x"; //给list的class赋值
				x.push(this.innerHTML);
			};
			++classselect;
		} else{
			alert('这个格子已经有子了，请重新选择！');
		};
		if (classselect>4) {//从走到第5步开始就可能出现输赢，此时开始判断
			//由于x方先下，所以想是否与win数组相匹配
			for (var h = 0; h < winlen; h++) {
				var num = 0;
				for (var j = 0; j<win[h].length; j++){
					for (var k = 0; k<x.length; k++){
						if (win[h][j] == x[k]) {
							num++;
						};
					}
				}
				if (num == 3) {
					alert("x赢！");
					winnum = 1; //winnum为1的时候，不为平局
					lock.style.display = "block"; //类似锁屏效果
				};
				
			};
			//判断o方是否赢
			for (var h = 0; h < winlen; h++){
				var num = 0;
				for (var j = 0; j<win[h].length; j++) {
					for (var k = 0; k < o.length; k++) {
						if (win[h][j] == o[k]) {
							num++; //相同的个数，要3才会赢
						};
					};
				}
				if (num == 3) {
					//alert("o赢！");
					winnum = 1;
					lock.style.display = "block";//以块级元素显示
				};
			}
		};
		//判断是否为平局
		if (classselect == 9 && winnum !=1) {
			alert("平局");
		};
	}
};


//重来一次
function again() {
	for (var i = 0; i < lis.length; i++) {
		lis[i].className="";
		x = [];
		o = [];
		lock.style.display = "none";
		classselect = 0;
		winnum = 0;
	};
}