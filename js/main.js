//清除之前项目的本地存储数据
localStorage.removeItem('sss');

var model = Model(),
	render = Render();

//入口
render.init();
//默认显示todo列表页面
$('#task-list').show();

/*
	==================================================================================
										任务管理
					1. 添加任务按钮 模块
						|-1. 添加任务，按钮动效 √
						|-2. 确认添加按钮 √
						|-3. input输入监听，验证有无输入 √
					4. 任务列表项 清除/完成 点击操作 √
					5. 本地存储 添加/清除/完成 √
					6. 任务列表渲染器 √
	==================================================================================
*/
//添加任务按钮模块
(function(){
	var btnSVG = $('#addBtn svg'),
		addTaskContent = $('#addContent'),
		okAddBtn = $('.okAddBtn'),
		input = $('#value');
	//添加新的任务
	$('#addBtn').click(function(event) {
		if(addTaskContent.css('display')==='none') {
			addTaskContent.show('100');
			input.focus();
			//按钮旋转
			btnSVG.css({
				'transform': 'rotate(-45deg)',
				'-webkit-transform': 'rotate(-45deg)'
			});
			//弹出子按钮
			okAddBtn.css('bottom', '90px');
		}else{
			addTaskContent.hide('100');
			//按钮旋转
			btnSVG.css({
				'transform': 'rotate(0deg)',
				'-webkit-transform': 'rotate(0deg)'
			});
			okAddBtn.css('bottom', '5px');
		}		
	});
	//确认添加任务
	okAddBtn.click(function(event) {
		var text = input.val();
		if(text) {
			model.addTask(text);
			input.val("");
			addTaskContent.fadeOut('100');
			btnSVG.css({
				'transform': 'rotate(0deg)',
				'-webkit-transform': 'rotate(0deg)'
			});
			okAddBtn.css('bottom', '5px');
			okAddBtn.css('background-color', '#757575');
			input.css('border-bottom-color', '#BDBDBD');
			//关闭侧边栏和遮罩
			hideSidebar();
			$('.cover').hide('200');
			//切换到todo列表
			MenuItemFunc.listPage('todo');
			
		} 
	});
	//对input绑定输入监听
	input.bind('input propertychange', function(event) {
			var vinput = input.val();
			//如果有输入则控件变色
			if(vinput!=='') {
				okAddBtn.css('background-color', appColor().mainColor);
				input.css('border-bottom-color', '#212121');
			}
			//如果输入为空则控件变为默认色，待增加默认样式配置变量
			if(vinput==='') {
				okAddBtn.css('background-color', '#757575');
				input.css('border-bottom-color', '#BDBDBD');
			}
	});
})();

/*
*	任务项里的 清除/完成 操作
*/
$("#task-list").on("click", ".clear",function() {
	model.clearTask('todo', $(this).parent().find('i').text());
 });
$("#task-list").on("click", ".finish",function() {
	//先添加到已完成列表，然后在当前删除
	model.completeTask($(this).parent().find('.task-title').text());
	model.clearTask('todo', $(this).parent('.task-item').find('i').text());
 });
$("#completed-list").on("click", ".clear",function() {
	model.clearTask('completed', $(this).parent().find('i').text());

 });

// localStorage.removeItem('yoone_completed');
// console.log(localStorage.getItem('yoone_completed'));

//本地数据存储
function Model() {
	var addTask = function(s) {
		var taskItem = [localStorage['yoone_todo']];
		taskItem.push(s);
		localStorage.setItem('yoone_todo', taskItem);
		render.init();
	};
	var completeTask = function(t) {
		var arr = [localStorage['yoone_completed']];
		arr.push(t);
		localStorage.setItem('yoone_completed', arr);
		var newArr = localStorage['yoone_completed'].split(',');
		$('#completed-list').prepend('<li class="task-item"><span class="task-title">'+t+'</span><i>'+(newArr.length-1)+'</i><div class="clear"><svg width="128px" height="128.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M885.960599 229.332129 139.025868 229.332129c-13.322423 0-24.092721-10.770298-24.092721-24.092721 0-13.302981 10.770298-24.097838 24.092721-24.097838l746.93473 0c13.323447 0 24.092721 10.794857 24.092721 24.097838C910.05332 218.561831 899.284045 229.332129 885.960599 229.332129L885.960599 229.332129zM645.010875 132.956128l-265.036305 0c-13.323447 0-24.097838-10.770298-24.097838-24.097838 0-13.297864 10.774391-24.093744 24.097838-24.093744l265.036305 0c13.328563 0 24.098861 10.796904 24.098861 24.093744C669.109736 122.186853 658.340461 132.956128 645.010875 132.956128L645.010875 132.956128zM404.06729 759.409856 404.06729 349.805968c0-13.301957 10.769274-24.097838 24.092721-24.097838 13.328563 0 24.097838 10.79588 24.097838 24.097838l0 409.603889c0 13.32754-10.769274 24.097838-24.097838 24.097838C414.837588 783.507694 404.06729 772.738419 404.06729 759.409856L404.06729 759.409856zM572.728618 759.409856 572.728618 349.805968c0-13.301957 10.773368-24.097838 24.097838-24.097838 13.323447 0 24.092721 10.79588 24.092721 24.097838l0 409.603889c0 13.32754-10.769274 24.097838-24.092721 24.097838C583.501986 783.507694 572.728618 772.738419 572.728618 759.409856L572.728618 759.409856zM235.406986 301.615409c13.32447 0 24.093744 10.796904 24.093744 24.092721l0 28.528754 0 91.946109 0 385.510144c0 26.600845 21.590737 48.192605 48.190559 48.192605l409.603889 0c26.599821 0 48.190559-21.591761 48.190559-48.192605l0-385.510144 0-91.946109 0-28.528754c0-13.296841 10.769274-24.092721 24.093744-24.092721 13.32754 0 24.097838 10.796904 24.097838 24.092721l0 96.383164 0 24.091698 0 409.609005c0 39.924291-32.361035 72.285327-72.284303 72.285327L283.593452 928.077324c-39.923268 0-72.284303-32.361035-72.284303-72.285327L211.309148 490.398006l0-44.215014 0-24.091698 0-96.383164C211.309148 312.412312 222.083539 301.615409 235.406986 301.615409L235.406986 301.615409zM235.406986 301.615409" /></svg></div></li>');
	};
	//分待完成和已完成，对列表下标进行删除 需传递-> todo or completed 
	var clearTask = function(list, i) {
		var arr, listName, el;
		if(list=='todo') {
			listName = 'yoone_todo';
			el = '#task-list';
		}else if(list=='completed') {
			listName = 'yoone_completed';
			el = '#completed-list';
		}
		arr = localStorage[listName].split(',');
		arr.splice(i,1);
		localStorage.setItem(listName, arr);
		render.init(el);
	};
	return {
		addTask: addTask,
		completeTask: completeTask,
		clearTask: clearTask
	};
}

//任务列表 渲染器
function Render() {
	var tasks,
		taskTitle,
		taskItemHTML='';

	var init = function(el) {
		var el = el || '#task-list',
			listName,
			finishEl;

		if(el=='#task-list'){
			listName = 'yoone_todo';
			finishEl = '<div class="finish"><svg viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><style type="text/css"><![CDATA[@font-face{font-family: ifont; src: url("//at.alicdn.com/t/font_1442373896_4754455.eot?#iefix") format("embedded-opentype"), url("//at.alicdn.com/t/font_1442373896_4754455.woff") format("woff"), url("//at.alicdn.com/t/font_1442373896_4754455.ttf") format("truetype"), url("//at.alicdn.com/t/font_1442373896_4754455.svg#ifont") format("svg");}]]></style></defs><g class="transform-group"><g transform="scale(0.015625, 0.015625)"><path d="M511.174192 67.649749c-244.689908 0-443.046558 198.358697-443.046558 443.046558 0 244.689908 198.35665 443.046558 443.046558 443.046558 244.686838 0 443.046558-198.35665 443.046558-443.046558C954.22075 266.00947 755.862054 67.649749 511.174192 67.649749zM511.174192 909.437801c-220.22061 0-398.741493-178.522929-398.741493-398.741493s178.520883-398.741493 398.741493-398.741493c220.218564 0 398.741493 178.522929 398.741493 398.741493S731.392756 909.437801 511.174192 909.437801zM708.859553 372.923478 475.452619 606.334505 357.927949 488.807788c-9.389858-9.387811-25.415856-8.580422-35.798321 1.802042-10.379395 10.377348-11.184737 26.405393-1.796926 35.793204l135.981021 135.983067c4.920056 4.916986 11.660574 7.03216 18.457374 6.442736 7.535627 0.639566 15.292288-1.917676 21.057595-7.684006L746.4548 410.518724c10.382465-10.382465 10.382465-27.212782 0-37.595246C736.074382 362.544083 719.240995 362.544083 708.859553 372.923478z"></path></g></g></svg></div>';
		}else if(el=='#completed-list'){
			listName = 'yoone_completed';
			finishEl = '';
		}
		//app主题色
		appColor();
		$(el).html('');
		if(localStorage[listName]) {
			tasks = localStorage[listName].split(',');
			for(var i=1; i<tasks.length; i++) {
				taskTitle = tasks[i];			
				$(el).prepend('<li class="task-item"><span class="task-title">'+taskTitle+'</span><i>'+i+'</i><div class="clear"><svg width="128px" height="128.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M885.960599 229.332129 139.025868 229.332129c-13.322423 0-24.092721-10.770298-24.092721-24.092721 0-13.302981 10.770298-24.097838 24.092721-24.097838l746.93473 0c13.323447 0 24.092721 10.794857 24.092721 24.097838C910.05332 218.561831 899.284045 229.332129 885.960599 229.332129L885.960599 229.332129zM645.010875 132.956128l-265.036305 0c-13.323447 0-24.097838-10.770298-24.097838-24.097838 0-13.297864 10.774391-24.093744 24.097838-24.093744l265.036305 0c13.328563 0 24.098861 10.796904 24.098861 24.093744C669.109736 122.186853 658.340461 132.956128 645.010875 132.956128L645.010875 132.956128zM404.06729 759.409856 404.06729 349.805968c0-13.301957 10.769274-24.097838 24.092721-24.097838 13.328563 0 24.097838 10.79588 24.097838 24.097838l0 409.603889c0 13.32754-10.769274 24.097838-24.097838 24.097838C414.837588 783.507694 404.06729 772.738419 404.06729 759.409856L404.06729 759.409856zM572.728618 759.409856 572.728618 349.805968c0-13.301957 10.773368-24.097838 24.097838-24.097838 13.323447 0 24.092721 10.79588 24.092721 24.097838l0 409.603889c0 13.32754-10.769274 24.097838-24.092721 24.097838C583.501986 783.507694 572.728618 772.738419 572.728618 759.409856L572.728618 759.409856zM235.406986 301.615409c13.32447 0 24.093744 10.796904 24.093744 24.092721l0 28.528754 0 91.946109 0 385.510144c0 26.600845 21.590737 48.192605 48.190559 48.192605l409.603889 0c26.599821 0 48.190559-21.591761 48.190559-48.192605l0-385.510144 0-91.946109 0-28.528754c0-13.296841 10.769274-24.092721 24.093744-24.092721 13.32754 0 24.097838 10.796904 24.097838 24.092721l0 96.383164 0 24.091698 0 409.609005c0 39.924291-32.361035 72.285327-72.284303 72.285327L283.593452 928.077324c-39.923268 0-72.284303-32.361035-72.284303-72.285327L211.309148 490.398006l0-44.215014 0-24.091698 0-96.383164C211.309148 312.412312 222.083539 301.615409 235.406986 301.615409L235.406986 301.615409zM235.406986 301.615409" /></svg></div>'+finishEl+'</li>');
			}
		}
	}
	return {
		init: init
	};
}

/*
	==================================================================================
										侧边菜单栏
					1. 唤出侧边栏菜单 √
					2. 菜单选项调用页面 √
	==================================================================================
*/
// 菜单按钮
$('#menu-btn').click(function(event) {
	if ($('.menu-content').css('left')=='-260px') {
		$('.menu-content').css('left', '0');
		$('.cover').fadeIn();
	}else {
		hideSidebar();
		$('.cover').fadeOut();
	}
});

//关闭侧边栏
function hideSidebar() {
	$('.menu-content').css('left', '-260px');
}
//点击遮罩层隐藏关闭侧边栏
$('.cover').click(function(event) {
	hideSidebar();
	$('.cover').fadeOut();
});
//菜单选项调用页面
$('.menu-item').click(function(event) {
	hideSidebar();
	var data = $(this).attr('data');
	switch(data) {
		case 'todo':
			MenuItemFunc.listPage('todo');
			break;
		case 'completed':
			MenuItemFunc.listPage('completed');
			break;
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
//菜单呼出页面种类：卡片式，页面
var MenuItemFunc = (function () {
	var listPage = function(type) {
		$('.cover').fadeOut();
		if(type=='todo'){
			$('#completed-list').fadeOut();
			$('#task-list').fadeIn();
		}else if(type=='completed'){
			if($('#completed-list').html()==''){
				render.init('#completed-list');
			}
			render.init('#completed-list');
			$('#task-list').fadeOut();
			$('#completed-list').fadeIn();	
		}
	};
	var changeColor = function () {
		subMenuPanel();
		colorPanel();
		showHeaderBtn();
	};
	var about = function() {
		subMenuPanel();
		aboutPanel();
	};
	return {
		listPage: listPage,
		changeColor: changeColor,
		aboutApp: about
	};
})();
//菜单卡片
var subMenuPanel = function() {
	$('.menu-subCard').fadeIn();
	$('#menu-btn').fadeOut();
	$('#back-btn').fadeIn();
	//关闭当前菜单选项
	$('.cover, #back-btn').click(function(event) {
		$('.cover').fadeOut();
		$('.menu-subCard').fadeOut();
		$('#menu-btn').fadeIn();
		$('#back-btn').fadeOut();
	});
}
//换肤功能 主题颜色控制器 
function appColor() {
	var mainColor = localStorage.yoone_color || '#25b99a',
		secColor = '#FFC107';
	$('#header').css('background-color', mainColor);
	$('#addBtn').css('background-color', secColor);
	return {
		mainColor: mainColor
	};
}
//组装"换肤"面板
function colorPanel() {
	var html = '<ul class=setColorPanel><li class=colorItem data=#25b99a><span>文艺药丸</span><div class=colorBlock><div class=cgreen></div><div class=cgwhite></div></div><li class=colorItem data=#F44336><span>狂热药丸</span><div class=colorBlock><div class=cred></div><div class=crwhite></div></div><li class=colorItem data=#2196F3><span>高冷药丸</span><div class=colorBlock><div class=cblue></div><div class=cbwhite></div></div></ul>';
	$('.menu-subCard').html(html);
	$('.colorItem').click(function(event) {
		mainColor = $(this).attr('data');
		//颜色 本地存储
		localStorage.yoone_color = mainColor;
		appColor();
		//动效
		$('.colorBlock').removeClass('shake');
		var colorBlock = $(this).find('.colorBlock');
		colorBlock.addClass('shake');
		showHeaderBtn();
	});
}
//组装"关于"面板
function aboutPanel() {
	var html = '<div class=aboutApp><p><b>药丸清单，一个专治拖延症患者的应用。</b><br>当前为测试版本，持续更新中...<br><br>@2016 <a href="http://liaokeyu.com/about.html" target="_blank">廖柯宇</a></div>';
	$('.menu-subCard').html(html);
}

/*
	==================================================================================
										手势操作 
					1. 导航栏和操作按钮智能隐藏 xxxxxxxx
					2. 任务列表左右滑动可完成或删除
	==================================================================================
*/
//滑动智能隐藏 header和btn 
(function(){
	// var sctA = $(document).scrollTop(), 
	// 	headerHeight = $('#header').height();
	var sctA = $(document).scrollTop(), 
		headerHeight = $('#header').height();

	$(window).scroll(function(event) {
		var sctB = $(document).scrollTop();

		if(sctB>headerHeight){
			$('#header').addClass('headerUp');
			$('.btnBox').addClass('btnDown');
		}else{
			$('#header').removeClass('headerUp');
			$('.btnBox').removeClass('btnDown');
		}
		if(sctB>sctA){
			$('#header').removeClass('headerDown');
			$('.btnBox').removeClass('btnUp');
		}else{
			$('#header').addClass('headerDown');
			$('.btnBox').addClass('btnUp');
		}
		sctA = $(document).scrollTop();
	});
})();

function showHeaderBtn() {
	$('#header').addClass('headerDown');
	$('.btnBox').addClass('btnUp');
}