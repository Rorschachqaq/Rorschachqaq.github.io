// https://wiki.geogebra.org/en/Reference:GeoGebra_Apps_API
function ggbOnInit(param) {
ggbApplet.registerAddListener("setStyle");
}

function setStyle(a){
//浙江潘立强更早公开latex标签
ggbApplet.setCaption(a,"$\\large{%n}$"); 
ggbApplet.setLabelStyle(a, 3);
ggbApplet.setPointSize(a, 3);
ggbApplet.setPointStyle(a, 10);
ggbApplet.setLineThickness(a, 4);
if(ggbApplet.getObjectType(a)!="point"){
	if(ggbApplet.getObjectType(a)=="numeric")
	{
		ggbApplet.setVisible(a, true);
		ggbApplet.setLabelVisible(a, false);
		ggbApplet.setColor(a, 0, 0, 0);
	}
	else if(ggbApplet.getObjectType(a)=="complexnumber")
	{
		ggbApplet.setVisible(a, true);
		ggbApplet.setLabelVisible(a, true);
		ggbApplet.setColor(a, 255, 0, 0);
	}
	else{
		ggbApplet.setLabelVisible(a, false);
	}
}
else{
	ggbApplet.setColor(a, 0, 0, 255);
}
if(ggbApplet.getObjectType(a)=="segment" || 
ggbApplet.getObjectType(a)=="line"  || 
ggbApplet.getObjectType(a)=="parabola"){
	ggbApplet.setColor(a, "#FF000000");
    // ggbApplet.setFilling(a, 1);
}
// ggbApplet.setFilling(a, 0.5);
}

// https://wiki.geogebra.org/en/Reference:GeoGebra_App_Parameters
var parameters = {
	"id": "ggbApplet",
	"width":1200,
	"height":600, 
	// "autoHeight":true,
	"useBrowserForJS":true,
	"enableLabelDrags":true,
	"enableShiftDragZoom":true,
	"enableRightClick":true,
	"showMenuBar":true,  
	"showAlgebraInput":true,
	"showToolBar":true,
	"showToolBarHelp":true,
	"showFullscreenButton":false,
    "disableAutoScale":true,
	// "algebraInputPosition":"top",
	// "allowUpscale":false,
    //"borderColor":"white",  //去掉外边框颜色
	"language": "en",
	"ggbBase64": ggb
};

var applet = new GGBApplet(parameters, '5.0');
// 离线则下行代码取消注释，注意路径
applet.setHTML5Codebase('5.0/web3d/');
window.onload = function() {applet.inject('ggbApplet')};

function saveGgbFile(){ 
	ggbApplet.getBase64(function(b){
		document.getElementById("Base64").value = b;
		document.getElementById("Base64").select();
		document.execCommand("copy");
	}); 
};
function loadGgbFile(){ ggbApplet.setBase64(document.getElementById("Base64").value); };

function saveGgbBase(){ 
	ggbApplet.getBase64(); 
};


function restart(){ 
	saveGgbFile();
	ggbApplet.setBase64(ggb);
};

function fresh(){ 
	saveGgbBase();
	ggbApplet.setBase64(ggbApplet.getBase64());
};


function saveOnlineHTMLFile(){ 
	var strs=new Array();
	strs[0] = '<!DOCTYPE html><html><head>'+
	'<meta charset="utf-8"\/><meta name=viewport content="width=device-width,initial-scale=1">'+
	'<script src="https:\/\/kz16.top\/geogebra\/deployggb.js"><\/script>'+
	'<\/head><body><center><div id="ggbApplet"><\/div><\/center><script>'+
	'function ggbOnInit(param){ggbApplet.registerAddListener("setLargeLabel");}'+
	'function setLargeLabel(objName){ggbApplet.setCaption(objName,"$\\\\large{%n}$");ggbApplet.setLabelStyle(objName, 3);'+
	'if(ggbApplet.getObjectType(objName)!="point") ggbApplet.setLabelVisible(objName, false); }'+
	'var parameters = {'+
	'"id":"ggbApplet",'+
	'"width":'+
	parameters.width+
	', "height":'+
	parameters.height+
	','+
	'"autoHeight":true,'+
	'"useBrowserForJS":true,'+
	'"enableLabelDrags":true,'+
	'"enableShiftDragZoom":true,'+
	'"enableRightClick":true,'+
	'"showMenuBar":true,'+
	'"showAlgebraInput":true,'+
	'"showToolBar":true,'+
	'"showFullscreenButton":false,'+
	'"disableAutoScale":true,'+
	'"ggbBase64":"';
	saveGgbBase();
	strs[1] =  ggbApplet.getBase64()+
	'"};'+
	"var applet = new GGBApplet(parameters, '5.0');"+
	"window.onload = function() {applet.inject('ggbApplet')};"+
	'<\/script><\/body><\/html>';
	var blob = new Blob(strs, {type: "text/html ;charset=utf-8"});
	var name =document.getElementById("filename").value + '.html';
	saveAs(blob, name);
	// saveAs(blob);
};


function saveOfflineHTMLFile(){ 
	var strs=new Array();
	strs[0] = '<!DOCTYPE html><html><head>'+
	'<meta charset="utf-8"\/><meta name=viewport content="width=device-width,initial-scale=1">'+
	'<script src="deployggb.js"><\/script>'+
	'<\/head><body><center><div id="ggbApplet"><\/div><\/center><script>'+
	'function ggbOnInit(param){ggbApplet.registerAddListener("setLargeLabel");}'+
	'function setLargeLabel(objName){ggbApplet.setCaption(objName,"$\\\\large{%n}$");ggbApplet.setLabelStyle(objName, 3);'+
	'if(ggbApplet.getObjectType(objName)!="point") ggbApplet.setLabelVisible(objName, false); }'+
	'var parameters = {'+
	'"id":"ggbApplet",'+
	'"width":'+
	parameters.width+
	', "height":'+
	parameters.height+
	','+
	'"autoHeight":true,'+
	'"useBrowserForJS":true,'+
	'"enableLabelDrags":true,'+
	'"enableShiftDragZoom":true,'+
	'"enableRightClick":true,'+
	'"showMenuBar":true,'+
	'"showAlgebraInput":true,'+
	'"showToolBar":true,'+
	'"showFullscreenButton":false,'+
	'"disableAutoScale":true,'+
	'"ggbBase64":"';
	saveGgbBase();
	strs[1] =  ggbApplet.getBase64()+
	'"};'+
	"var applet = new GGBApplet(parameters, '5.0');"+
	"applet.setHTML5Codebase('5.0/web3d/');"+
	"window.onload = function() {applet.inject('ggbApplet')};"+
	'<\/script><\/body><\/html>';
	var blob = new Blob(strs, {type: "text/plain;charset=utf-8"});
	var name =document.getElementById("filename").value + '.html';
	saveAs(blob, name);
};


function saveOnlinePureFigHTMLFile(){ 
	var pstrs=new Array();
	pstrs[0] = '<!DOCTYPE html><html><head>'+
	'<meta charset="utf-8"\/><meta name=viewport content="width=device-width,initial-scale=1">'+
	'<script src="https:\/\/kz16.top\/geogebra\/deployggb.js"><\/script>'+
	'<\/head><body><center><div id="ggbApplet"><\/div><\/center><script>'+
	'function ggbOnInit(param){ggbApplet.registerAddListener("setLargeLabel");}'+
	'function setLargeLabel(objName){ggbApplet.setCaption(objName,"$\\\\large{%n}$");ggbApplet.setLabelStyle(objName, 3);'+
	'if(ggbApplet.getObjectType(objName)!="point") ggbApplet.setLabelVisible(objName, false); }'+
	'var parameters = {'+
	'"id":"ggbApplet",'+
	'"width":'+
	parameters.width+
	', "height":'+
	parameters.height+
	', "borderColor":"white",'+
	'"showAlgebraInput":false,'+
	'"enableLabelDrags":false,'+
	'"enableShiftDragZoom":false,'+
	'"enableRightClick":false,'+
	'"ggbBase64":"';
	saveGgbBase();
	pstrs[1] =  ggbApplet.getBase64()+
	'"};'+
	"var applet = new GGBApplet(parameters, '5.0');"+
	"window.onload = function() {applet.inject('ggbApplet')};"+
	'<\/script><\/body><\/html>';
	var pblob = new Blob(pstrs, {type: "text/plain;charset=utf-8"});
	var name =document.getElementById("filename").value + '.html';
	saveAs(pblob, name);
};



function saveOfflinePureFigHTMLFile(){ 
	var pstrs=new Array();
	pstrs[0] = '<!DOCTYPE html><html><head>'+
	'<meta charset="utf-8"\/><meta name=viewport content="width=device-width,initial-scale=1">'+
	'<script src="deployggb.js"><\/script>'+
	'<\/head><body><center><div id="ggbApplet"><\/div><\/center><script>'+
	'function ggbOnInit(param){ggbApplet.registerAddListener("setLargeLabel");}'+
	'function setLargeLabel(objName){ggbApplet.setCaption(objName,"$\\\\large{%n}$");ggbApplet.setLabelStyle(objName, 3);'+
	'if(ggbApplet.getObjectType(objName)!="point") ggbApplet.setLabelVisible(objName, false); }'+
	'var parameters = {'+
	'"id":"ggbApplet",'+
	'"width":'+
	parameters.width+
	', "height":'+
	parameters.height+
	', "borderColor":"white",'+
	'"showAlgebraInput":false,'+
	'"enableLabelDrags":false,'+
	'"enableShiftDragZoom":false,'+
	'"enableRightClick":false,'+
	'"ggbBase64":"';
	saveGgbBase();
	pstrs[1] =  ggbApplet.getBase64()+
	'"};'+
	"var applet = new GGBApplet(parameters, '5.0');"+
	"applet.setHTML5Codebase('5.0/web3d/');"+
	"window.onload = function() {applet.inject('ggbApplet')};"+
	'<\/script><\/body><\/html>';
	var pblob = new Blob(pstrs, {type: "text/plain;charset=utf-8"});
	var name =document.getElementById("filename").value + '.html';
	saveAs(pblob, name);
};