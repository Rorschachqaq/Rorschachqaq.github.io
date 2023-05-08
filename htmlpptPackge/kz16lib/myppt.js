var a_idx = 0;
jQuery(document).ready(function($) {
	$("body").click(function(e) {
		var a = [
			"❤", "❤", "❤", "❤", "❤",
			"❤", "❤", "❤", "❤",
			"❤", "❤", "❤"
		];
		var b = [
			"#FFF68F", "#FFBBFF", "#FF0000", "#FF00FF", "#F08080",
			"#008000", "#7FFFAA", "#0000CD", "#0000FF", "#080808"
		];
		var a_index = Math.floor((Math.random() * a.length));
		var b_index = Math.floor((Math.random() * b.length));

		var color = b[b_index];
		var $i = $("<span/>").text(a[a_index]);
		var x = e.pageX,
			y = e.pageY;

		$i.css({
			"z-index": 999999999999999999999999999999999999999999999999999999999999999999999,
			"top": y - 20,
			"left": x,
			"position": "absolute",
			"font-weight": "bold",
			"color": color,
		});
		$("body").append($i);
		$i.animate({
			"top": y - 180,
			"opacity": 0
		}, 1500, function() {
			$i.remove();
		});
	});
});



$(function () {
	$("a.Hyperlink").mouseover(function (e) {
		this.Mytitle = this.title;
		this.title = "";
		$("body").append("<div id='div_toop'>" + this.Mytitle + "</div>");
		$("#div_toop")
			.css({
				"position": "absolute",
				"font-size": "40px",
				"background-color": "#93ee15",
				// "background-color": "rgba(0,255,0)", 
				"padding":"10px",
				"opacity":"1"
			}).show("fast");
	}).mouseout(function () { 
		this.title = this.Mytitle;
		$("#div_toop").remove();
	}).mousemove(function (e) { 
		$("#div_toop")
			.css({
				"top": (e.pageY + 10) + "px",
				"position": "absolute",
				"left": (e.pageX + 20) + "px"
			});
	});
});


function showPic(e,sUrl){ 
	var x,y; 
	x = e.clientX; 
	y = e.clientY; 
	document.getElementById("Layer1").style.left = x+2+'px'; 
	document.getElementById("Layer1").style.top = y+2+'px'; 
	document.getElementById("Layer1").innerHTML = "<img border='0' src=\"" + sUrl + "\">"; 
	document.getElementById("Layer1").style.display = ""; 
	} 
	function hiddenPic(){ 
	document.getElementById("Layer1").innerHTML = ""; 
	document.getElementById("Layer1").style.display = "none"; 
} 



function toggleFullscreen(elem) {
	elem = elem || document.documentElement;
	if (!document.fullscreenElement && !document.mozFullScreenElement &&
	  !document.webkitFullscreenElement && !document.msFullscreenElement) {
	  if (elem.requestFullscreen) {
		elem.requestFullscreen();
	  } else if (elem.msRequestFullscreen) {
		elem.msRequestFullscreen();
	  } else if (elem.mozRequestFullScreen) {
		elem.mozRequestFullScreen();
	  } else if (elem.webkitRequestFullscreen) {
		elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
	  }
	} else {
	  if (document.exitFullscreen) {
		document.exitFullscreen();
	  } else if (document.msExitFullscreen) {
		document.msExitFullscreen();
	  } else if (document.mozCancelFullScreen) {
		document.mozCancelFullScreen();
	  } else if (document.webkitExitFullscreen) {
		document.webkitExitFullscreen();
	  }
	}
  }
  
  document.getElementById('btnFullscreen').addEventListener('click', function() {
	toggleFullscreen();
  });
  

