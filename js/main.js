var model = Model();
var render = Render();

//入口
render.init();


//添加新的任务
$('#addBtn').click(function(event) {
	if($('#addContent').css('display')==='none') {
		$('#addContent').fadeIn(100);
		$('#value').focus();
		//按钮旋转
		$('#addBtn svg').css({
			'transform': 'rotate(-45deg)',
			'-webkit-transform': 'rotate(-45deg)'
		});
		//弹出子按钮
		$('.okAddBtn').css('bottom', '90px');
	}else{
		$('#addContent').fadeOut(200);
		//按钮旋转
		$('#addBtn svg').css({
			'transform': 'rotate(0deg)',
			'-webkit-transform': 'rotate(0deg)'
		});
		$('.okAddBtn').css('bottom', '5px');
	}		
});

//确认添加任务
$('.okAddBtn').click(function(event) {
	var text = $('#value').val();
	if(text) {
		model.addTask(text);
		$('#value').val("");
		$('#addContent').fadeOut(200);
		$('#addBtn svg').css({
			'transform': 'rotate(0deg)',
			'-webkit-transform': 'rotate(0deg)'
		});
		$('.okAddBtn').css('bottom', '5px');
		$('.okAddBtn').css('background-color', '#757575');
		$('#value').css('border-bottom-color', '#BDBDBD');
	} 
});

//对input绑定输入监听
$('#value').bind('input propertychange', function(event) {
		var vinput = $('#value').val();
		//如果有输入则控件变色
		if(vinput!=='') {
			$('.okAddBtn').css('background-color', appColor().mainColor);
			$('#value').css('border-bottom-color', '#212121');
		}
		//如果输入为空则控件变为默认色，待增加默认样式配置变量
		if(vinput==='') {
			$('.okAddBtn').css('background-color', '#757575');
			$('#value').css('border-bottom-color', '#BDBDBD');
		}
});

$("#task-list").on("click", ".finish",function() {
	model.completeTask($(this).parent('.task-item').find('i').text());
 });

//本地数据存储
function Model() {
	var taskItem;
	var addTask = function(s) {
		taskItem = [localStorage['sss']];
		taskItem.push(s);
		localStorage.setItem('sss', taskItem);
		render.init();
	};
	var completeTask = function(i) {
		var cpArr = localStorage['sss'].split(',');
		cpArr.splice(i,1);
		localStorage.setItem('sss', cpArr);
		render.init();
	};
	return {
		addTask: addTask,
		completeTask: completeTask
	};
}
//页面渲染
function Render() {
	var tasks;
	var taskTitle;
	var taskItemHTML='';
	var init = function() {
		//app主题色
		appColor();
		document.getElementById('task-list').innerHTML = '';
		try {
			tasks = localStorage['sss'].split(',');
			for(var i=tasks.length-1; i>0; i--) {
				taskTitle = tasks[i];
				taskItemHTML += '<li class="task-item"><span class="task-title">'+taskTitle+'</span><i>'+i+'</i><div class="finish"><svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"><![CDATA[@font-face{font-family: ifont; src: url("//at.alicdn.com/t/font_1442373896_4754455.eot?#iefix") format("embedded-opentype"), url("//at.alicdn.com/t/font_1442373896_4754455.woff") format("woff"), url("//at.alicdn.com/t/font_1442373896_4754455.ttf") format("truetype"), url("//at.alicdn.com/t/font_1442373896_4754455.svg#ifont") format("svg");}]]></style></defs><g class="transform-group"><g transform="scale(0.015625, 0.015625)"><path d="M511.174192 67.649749c-244.689908 0-443.046558 198.358697-443.046558 443.046558 0 244.689908 198.35665 443.046558 443.046558 443.046558 244.686838 0 443.046558-198.35665 443.046558-443.046558C954.22075 266.00947 755.862054 67.649749 511.174192 67.649749zM511.174192 909.437801c-220.22061 0-398.741493-178.522929-398.741493-398.741493s178.520883-398.741493 398.741493-398.741493c220.218564 0 398.741493 178.522929 398.741493 398.741493S731.392756 909.437801 511.174192 909.437801zM708.859553 372.923478 475.452619 606.334505 357.927949 488.807788c-9.389858-9.387811-25.415856-8.580422-35.798321 1.802042-10.379395 10.377348-11.184737 26.405393-1.796926 35.793204l135.981021 135.983067c4.920056 4.916986 11.660574 7.03216 18.457374 6.442736 7.535627 0.639566 15.292288-1.917676 21.057595-7.684006L746.4548 410.518724c10.382465-10.382465 10.382465-27.212782 0-37.595246C736.074382 362.544083 719.240995 362.544083 708.859553 372.923478z"></path></g></g></svg></div></li>';
			}
			document.getElementById('task-list').innerHTML = taskItemHTML;
			taskItemHTML = '';
		}catch(e){
		}
	}
	return {
		init: init
	};
}
// 菜单按钮
$('#menu-btn').click(function(event) {
	if ($('.menu-content').css('left')=='-260px') {
		$('.menu-content').css('left', '0');
		$('.cover').fadeIn('60');
	}else {
		hideSidebar();
		$('.cover').fadeOut('60');
	}
});

$('.cover').click(function(event) {
	hideSidebar();
	$('.cover').fadeOut('60');
});

//菜单选项调用页面
$('.menu-item').click(function(event) {
	hideSidebar();
	var data = $(this).attr('data');
	switch(data) {
		case 'changeColor':
			MenuItemFunc.changeColor();
			break;
		case 'about':
			MenuItemFunc.aboutApp();
			break;
		default:
			console.log('no data');
	}
});
//关闭侧边栏 hide sidebar
function hideSidebar() {
	$('.menu-content').css('left', '-260px');
}
//菜单呼出页面种类：卡片式，页面
var MenuItemFunc = (function () {
	var changeColor = function () {
		subMenuPanel();
		colorPanel();
	};
	var about = function() {
		subMenuPanel();
		aboutPanel()
	};
	return {
		changeColor: changeColor,
		aboutApp: about
	};
})();
//菜单卡片
var subMenuPanel = function() {
	$('.menu-subCard').fadeIn('200');
	$('#menu-btn').fadeOut('fast');
	$('#back-btn').fadeIn('fast');
	//关闭当前菜单选项
	$('.cover, #back-btn').click(function(event) {
		$('.cover').fadeOut('fast');
		$('.menu-subCard').fadeOut('fast');
		$('#menu-btn').fadeIn('fast');
		$('#back-btn').fadeOut('fast');
	});
}
//配置主题颜色
function appColor() {
	var mainColor = localStorage.yoone_color || '#25b99a';
	var secColor = '#FFC107';
	$('#header').css('background-color', mainColor);
	$('#addBtn').css('background-color', secColor);
	return {
		mainColor: mainColor
	};
}
//组装颜色面板
function colorPanel() {
	var html = '<ul class=setColorPanel><li class=colorItem data=#25b99a><span>文艺药丸</span><div class=colorBlock><div class=cgreen></div><div class=cgwhite></div></div><li class=colorItem data=#F44336><span>大力药丸</span><div class=colorBlock><div class=cred></div><div class=crwhite></div></div><li class=colorItem data=#2196F3><span>高冷药丸</span><div class=colorBlock><div class=cblue></div><div class=cbwhite></div></div></ul>';
	$('.menu-subCard').html(html);
	$('.colorItem').click(function(event) {
		mainColor = $(this).attr('data');
		//颜色 本地存储
		localStorage.yoone_color = mainColor;
		appColor();
	});
}
//组装关于面板
function aboutPanel() {
	var html = '<div class=aboutApp><p><b>药丸清单，一个专治拖延症患者的应用。</b><br>当日事必当日毕，当天任务日后即焚。<br>当前为测试版本，持续更新中...<br><br>@2016 <a href="http://liaokeyu.com/about.html" target="_blank">廖柯宇</a></div>';
	$('.menu-subCard').html(html);
}


