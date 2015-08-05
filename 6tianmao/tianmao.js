$(document).ready(function(){
	//alert("message");
	/*我的淘宝*/
	$(".sn-mytaobao,menu-bd").mouseover(function(){
		//alert("mubu");
		$(".sn-mytaobao .menu-bd").css("display","block");
		$(".sn-mytaobao b").css("border-color","transparent transparent #420DBF transparent");
	});
	$(".sn-mytaobao").mouseout(function(){
		$(".sn-mytaobao .menu-bd").css("display","none");
		$(".sn-mytaobao b").css("border-color","#420DBF transparent transparent transparent");
	});
	//'手机版
	$(".sn-mobile").mouseover(function(){
		$(".sn-qrcode").css("display","block");
	});
	$(".sn-mobile").mouseout(function(){
		$(".sn-qrcode").css("display","none");
	});
	//热搜的第一个关键词左边没有分隔符
	$("ul.hot-query li:first-child").css("border-left","#fff");






	var data;
	$.getJSON('a.json',function(json){
		 data = json;
		 /*var strHtml ="";
		 $.each(data,function(infoIndex,fpcategory){
		 	strHtml += fpcategory[0].imgalt;
		 })
		 alert(strHtml);*/
	});
	var Tianmao = function(){
		this.init();
	}
	Tianmao.prototype = {
		init:function(){
			this.imgPath = 'imgs/';
			this.json = data;
		},
		createList:function(i){
			$obj = $tianmao;

			$objlev1div = $("<div/>");
			$obj.append($objlev1div);
			$objlev1div.addClass("module");

			$objlev2div = $("<div/>");
			$objlev1div.append($objlev2div);
			$objlev2div.addClass("category-pannel-banner");
			$objlev2div.css("background",data.fpcategory[i].bgcolor);

			$objlev3div = $("<div/>");
			$objlev2div.append($objlev3div);
			$objlev3div.addClass("banner-container");

			$objlev4a = $("<a/>");
			$objlev3div.append($objlev4a);

			$objlev4a.attr("href",data.fpcategory[i].ahref);
			$objlev5b = $("<b/>");
			$objlev4a.append($objlev5b);
			$objlev5b.addClass("text-banner");
			$objlev5b.css("background","url("+this.imgPath+data.fpcategory[i].burlbackground+") no-repeat");
			$objlev5img = $("<img/>");
			$objlev4a.append($objlev5img);
			$objlev5img.addClass("main-banner");
			$objlev5img.attr("src",this.imgPath+data.fpcategory[i].imgsrc);

			$objlev4div = $("<div/>");
			$objlev3div.append($objlev4div);
			$objlev4div.addClass("small-banner");
			$objlev5a =  $("<a/>");
			$objlev4div.append($objlev5a);
			$objlev5a.addClass("j_ActLink");
			$objlev6img = $("<img/>");
			$objlev5a.append($objlev6img);
			$objlev6img.attr("src",this.imgPath+data.fpcategory[i].smallimgsrc1);
			$objlev5b2 = $("<b/>");
			$objlev4div.append($objlev5b2);
			$objlev5b2.addClass("banner-separator");
			$objlev5a2 = $("<a/>");
			$objlev4div.append($objlev5a2);
			$objlev5a2.addClass("j_ActLink");
			$objlev6img2 = $("<img/>");
			$objlev5a2.append($objlev6img2);
			$objlev6img2.attr("src",this.imgPath+data.fpcategory[i].smallimgsrc2);
		},
		removeList:function(){
			$obj = $tianmao;
			$obj.empty();
		}
	};
	
	var myTianmao = new Tianmao();
	function handler(e){
		//这时候的$(this)是选择器中的类对应的元素
		//而e.target则表示的是当前选中的子元素
		var $tar = $(e.target);
		if($tar[0].localName == "li"){
			var i = $tar.parent().children().index($tar);
		}else{
			var i = $tar.parent().index();
		}
		$(".category-"+i+"-pannel").addClass("menu-pannel-hover");
		$tianmao = $(".category-"+i+"-pannel .fp-lazyload-con");//当前的选中的子元素
		myTianmao.createList(i);
	}
	function handlerout(e){
		//这时候的$(this)是选择器中的类对应的元素
		//而e.target则表示的是当前选中的子元素
		var $tar = $(e.target);
		if($tar[0].localName == "li"){
			var i = $tar.parent().children().index($tar);
		}else{
			var i = $tar.parent().index();
		}
		
		$(".category-"+i+"-pannel").removeClass("menu-pannel-hover");
		$tianmao = $(".category-"+i+"-pannel>.fp-lazyload-con");//当前的选中的子元素
		myTianmao.removeList();
	}
	$(".menu-nav-container").mouseover(handler);
	$(".menu-nav-container").mouseout(handlerout);
	//$(".menu-nav-container").on("mouseover","li",handler);
	//$(".menu-nav-container").off("mouseout","li",handlerout);
});