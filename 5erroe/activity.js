$(document).ready(function(){
	$(".mbh-function-box b span:eq(1),.mbh-function-box b div:eq(1)").delay(1000).fadeIn("slow");
	var showTimer,pin=1,domlist = $(".mbh-function-box b:not(:eq(1))");
	//当mouseenter（鼠标指针穿过被选元素）第1个参数i的时候，执行函数
	$(".mbh-function-box b").delegate('i', 'mouseenter', function() {
                        clearInterval(showTimer);
                        pin = $(this).parent().index();                                   
           		showMbhTips($(this))
           	}).delegate('i', 'mouseleave', hideMbhTips);
//$(".mbh-function-box b:eq(1)").delegate('i', 'mouseenter', showMbhTips).delegate('i', 'mouseleave', hideMbhTips);
//显示小提示
function showMbhTips(dom, showLeft) {
	clearInterval(showTimer);
	dom.parents('div').find('b').not(":eq(1)").find('span').fadeOut('fast');
	dom.prev().fadeIn('fast'); 
	var sDom = dom.length ? dom : $(this);
	sDom.parent().css('z-index', 100).siblings().css('z-index','70');
	$(".mbh-function-box b div:visible").fadeOut('fast');
	sDom.next().fadeIn('fast', function() {
	$(this).animate();                
	});        
}
//隐藏小提示
function hideMbhTips() {
	$(".mbh-function-box b div:visible").fadeOut('fast', function() {
	$(this).parent().css('z-index', '70');
	$(this).css('opacity', 1);
	pin=$(this).parent().index();
	});
	autoMbhMove();
}
var flag = true;
function autoMbhMove(){
	showTimer = setInterval(function(){
	var shText = 'span,div'
	$(".mbh-function-box b div:eq(1)").fadeOut();
	if(pin == domlist.size()) {
                       	pin = 0,temp=[];
                       	if(flag){
                                	domlist = $(".mbh-function-box b")
                                	flag = false;       
                          } 
                }
             domlist.css('z-index','70').find(shText).fadeOut('fast');
             domlist.eq(pin).css('z-index','100').find(shText).fadeIn('fast');
             pin++;
        },3000);                
}
autoMbhMove();
});