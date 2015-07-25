
		var lrc = [];
		
		$(function(){
			var max = 86,i = parseInt(((parseInt(Math.random()*10) + 1) / 10) * max);
			setInterval(function(){
				i = i > max ? 1 : i;
				
				$("#bgImg").fadeOut(3000,function(){
					$(this).attr("src","http://bareman-music.stor.sinaapp.com/"+i+".jpg").load(function(){
						$(this).fadeIn(6000);
					});
					i++;
				});
				
			},20000);
		});
		
		window.onload = function(){
			var myAudio = document.getElementById('myaudio');
			var total = $(".bar").width();
			var volume = document.getElementById("volume");
			var musicBox = getSongList(),index = 0;
			var flag = $(".play-pause").attr("flag");
			var module = false; //是否随机播放
			
			myAudio.addEventListener("loadstart",function(){
				$(".proBar").width(0).removeClass("playingBar").addClass("loadingBar");
			});
			
			myAudio.addEventListener("progress",function(){
				$(".proBar").removeClass("loadingBar").addClass("playingBar");
			});
			
			myAudio.addEventListener('timeupdate', function() {
				var progress = (total * (this.currentTime / this.duration));
				var currentTime = timer(this);
				if(lrc.length){
					var idx = 0;
					for(var k = 0; k < lrc.length;k++){
						if(this.currentTime > lrc[k][0]){
							idx = k;
						}else{
							continue;
						}
					}
					var $lcrIdx = $("[time = '"+lrc[idx][0]+"']");
					var $currentLrc = $lcrIdx.text();
					if($lcrIdx.length){
						$(".lrcWrap li").css({"opacity" : "0.4","background-color" : ""});
                        $lcrIdx.css({"opacity" : "1","background-color" : "rgba(0,0,0,.3)"});
						//$(".lrcWrap").animate({"scrollTop" : $lcrIdx.index() * 40},1000);
                        $(".lrcWrap").scrollTop($lcrIdx.index() * 40 - 50);
                        var songName = $(".songList tr:eq(" + (index + 1)+ ") td:first .songName").text();
                        var title = $currentLrc.length ? $currentLrc + " - " + songName : songName;
                        $("title").text(title + " - bareman音乐盒  v1.5");
					}
				}
				
				$(".currentTime").html(currentTime);
				$(".proBar").width(progress);
			}, false);
			
			myAudio.addEventListener('ended', function() {
				index++;
				index = index >= musicBox.length ? 0 : index;
				
				$(".songImg img").hide();
				
				if(module){
					var len = musicBox.length;
					var random = parseInt(((parseInt(Math.random()*10) + 1) / 10) * (len - 1));
					index = random;
				}
				var musicName = musicBox[index];
				setTimeout(function(){
					play(myAudio,index,musicName);
				},1000);
			});
			
			$(".loop").click(function(){
				module = false;
				$("#myaudio").attr("loop","loop");
				$(".module .loop").css({
					"background-position" : "0 -146px"
				});
				$(".module .random").css({
					"background-position" : "0 -58px"
				});
				$(".module .queue").css({
					"background-position" : "0 0"
				});
			});
			
			$(".random").click(function(){
				module = true;
				$("#myaudio").removeAttr("loop");
				$(".module .loop").css({
					"background-position" : "0 -117px"
				});
				$(".module .random").css({
					"background-position" : "0 -88px"
				});
				$(".module .queue").css({
					"background-position" : "0 0"
				});
			});
			
			$(".queue").click(function(){
				module = false;
				$("#myaudio").removeAttr("loop");
				$(".module .loop").css({
					"background-position" : "0 -117px"
				});
				$(".module .random").css({
					"background-position" : "0 -58px"
				});
				$(".module .queue").css({
					"background-position" : "0 -29px"
				});
			});
			
			//单击进度条任意位置，跳播
			$(".bar").click(function(e){
				var x = ((e.clientX - $(this).offset().left) / total) * myAudio.duration;
				myAudio.currentTime = x;
			});
			
			$(".songList tr:not(:first)").dblclick(function(){
				index = $(this).index()-1;
				var musicName = musicBox[index];
				play(myAudio,index,musicName);
                $(".play-pause").attr("flag","1")
			});
			
			volume.addEventListener('change', function() {
				var volume = this.value;
				myAudio.volume = volume;
			},false);
			
			$(".play-pause").click(function(){
				myAudio.volume = $("#volume").val();
				$(".songList tr:eq(" + (index + 1)+ ") td:first").append($(".playing"));	
				if(flag == "0"){
					myAudio.play();
					$(".play-pause").css({
						"background" : "url(/Public/img/24-control-pause.png) no-repeat center center"
					});
					$(".playing div,.songImg img").css({
						"animation-play-state" : "running"
					});
					flag = 1;
				}else{
					myAudio.pause();
					$(".songList tr").each(function(){
						$(this).find("td:first").css({
							"background" : ""
						});
					});
					$(".play-pause").css({
						"background" : "url(/Public/img/24-arrow-next.png) no-repeat center center"
					});
					
					$(".playing div,.songImg img").css({
						"animation-play-state" : "paused"
					});
					
					flag = 0;
				}
				
			});
			
			$(".lastBtn").click(function(){
				index--;
				index = index < 0 ? musicBox.length  - 1 : index;
				var musicName = musicBox[index];
				play(myAudio,index,musicName);
				flag = 1;
			});
			
			$(".nextBtn").click(function(){
				index++;
				index = index >= musicBox.length ? 0 : index;
				var musicName = musicBox[index];
				play(myAudio,index,musicName);
				flag = 1;
			});
			
			$(".vIcon").click(function(){
				$("#volume").toggle();
				if($("#volume").is(":visible")){
					setTimeout(function(){
						$("#volume").fadeOut("slow");
					},5000);
				}
			});
		};
		
		function getSongList(){
			var songBox = [];
			$(".songList tr:not(:first)").each(function(){
				var songName = $(this).attr("savename");
				if(songName){
					songBox.push(songName);
				}
			});
			return songBox;
		}
		
		function play(auto,index,name) {
			var path = "http://bareman-public.stor.sinaapp.com/upload/";
			var url = path + name;
			getLyric(path + name.split(".")[0] + ".lrc");
			$(".songImg img").attr("src",path + name.split(".")[0] + ".jpg");
			$(".songImg img").load(function(){
				$(this).fadeIn(3000);
			});

			$("#myaudio").attr("src",url);
			var songName = $(".songList tr:eq(" + (index + 1)+ ") td:first .songName").html();
			var author = $(".songList tr:eq(" + (index + 1)+ ") td:eq(1)").html();
			$(".songInfo span:first").html(songName + " ("+ (index + 1) +"/"+ ($(".songList tr").length -1) +")");
			$("title").html(songName + " －bareman音乐盒 v1.5");
			$(".play-pause").css({
				"background" : "url(/Public/img/24-control-pause.png) no-repeat center center"
			});
			var $currentTr = $(".songList tr:eq(" + (index + 1)+ ")"),$currentTd = $currentTr.find("td:first"); 
			$currentTd.append($(".playing").show());
			$(".songWrap").scrollTop(index * 40);
			
			$(".playing div").css({
				"animation-play-state" : "running"
			});
			auto.play();
		}
		
		function timer(audio){
			var minu = parseInt((audio.duration - audio.currentTime) / 60);
			var sec =  parseInt((audio.duration - audio.currentTime) % 60);
			minu = minu < 10 ? "0" + minu : minu;
			sec = sec < 10 ? "0" + sec : sec;
			return minu + " : " + sec;
		}
		
		
		function getLyric(url) {
            $(".lrcWrap ul").empty();
		    var request = new XMLHttpRequest(),
		    	lrcLi = ""; //存储所有歌词
		    request.open('GET', url, true);
		    request.responseType = 'text';
		    request.onload = function() {
		        var lyric = request.response;
		       	
		       	var lines = lyric.split('\n'),
		       		pattern = /\[\d{2}:d{2}.\d{2}]/g,
		       		result = [];
		       		
		       	for(var i = 0;i< lines.length;i++){
		       		var time = lines[i].substring(1,9),
		       			value = lines[i].split("]")[1];
		       			
		       		if(time){
		       			var tTemp = "";
			       		for(var j = 0;j<time.length;j++){
			       			var t = time.slice(1, -1).split(':');
			       			tTemp = parseInt(t[0], 10) * 60 + parseFloat(t[1]);
			       		}
			       		lrcLi += "<li time = '"+tTemp+"'>"+value+"</li>";
			       		result.push([tTemp, value]);
		       		}
		       	}
                
                var finalLrc = "";
                if(lrcLi){
                	finalLrc = lrcLi;
                }else{
                    finalLrc = "<li>暂无歌词</li>";
                }
		       	
		       	$(".lrcWrap ul").append(finalLrc);
		       	
		       	result.sort(function(a, b) {
			        return a[0] - b[0];
			    });                
		       	lrc = result;
		    };
		    //向服务器发送请求
		    request.send();
		}
	