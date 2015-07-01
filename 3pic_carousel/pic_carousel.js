var t = n =0, count;
$(document).ready(function(){
	$lista = $("#banner_list a");//得到这个筛选下的jQuery对象
	count = $lista.length;//获得这个对象的长度
	//除去第一个元素，所有元素都隐藏
	$("#banner_list a:not(:first-child)").hide();
	//html() 方法返回或设置被选元素的内容 (inner HTML)。
	$("#banner_info").html($("#banner_list a:first-child").find("img").attr('title'));
	//点击banner_info这个div的处理事件
	$("#banner_info").click(function(){
		window.open($("#banner_list a:first-child").attr('href'),"_blank")
	});
	//点击右下角的1,2,3,4的处理事件
	$("#banner li").click(function(){
		var i = $(this).text()-1;//获取li元素的值，即1,2,3,4
		n = i; //i的值为0,1,2,3
		if(i>=count) return;
		$("#banner_info").html($("#banner_list a").eq(i).find("img").attr('title'));
		//unbind() 方法移除被选元素的事件处理程序。
		$("#banner_info").unbind().click(function(){
			window.open($("$banner_list a").eq(i).attr('href'),"_blank")
		});
		//当前所有可见的均500ms淡去，选中的以1000ms出现
		$("#banner_list a").filter(":visible").fadeOut(500).parent().children().eq(i).fadeIn(1000);
		//document.getElementById("banner").style.background = "";
		//给这个选中的元素添加类onair
		$(this).toggleClass("onair");
		//将所选元素的同胞元素移除这个class属性；
		//从所有匹配的元素中移除指定的属性。
		$(this).siblings().removeAttr("class");
	});
	t = setInterval("showAuto()",2000);
	$("#banner").hover(function(){
		clearInterval(t)
	},function(){
		t = setInterval("showAuto()",2000)
	});

});
function showAuto(){
	n = n>=(count-1)?0:++n;
	$("#banner li").eq(n).trigger('click');//触发第n个的click事件
}