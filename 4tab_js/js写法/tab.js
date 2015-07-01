//这个没有用jQuery，若是用了的，不能这样触发
function itemOne(){
	$("one").style.display = "block";     
            $("two").style.display = "none";  
            $("three").style.display = "none";  
            $("four").style.display = "none";
}
function itemTwo()  
        {  
            $("two").style.display = "block";  
            $("one").style.display = "none";  
            $("three").style.display = "none";  
            $("four").style.display = "none";  
        }  
        function itemThree()  
        {  
            $("three").style.display = "block";  
            $("one").style.display = "none";  
            $("two").style.display = "none";  
            $("four").style.display = "none";         
        }  
        function itemFour()  
        {  
            $("four").style.display = "block";  
            $("one").style.display = "none";  
            $("three").style.display = "none";  
            $("two").style.display = "none";          
        }  
        function $(m_id)  
        {  
            return document.getElementById(m_id);     
        }  