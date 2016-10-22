var model = Model();
var render = Render();

//入口
render.init();

//主题颜色 个性化 配置
var mainColor = '#25b99a';
var secColor = '#FFC107';
$('#header').css('background-color', mainColor);
$('#addBtn').css('background-color', secColor);


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
			$('.okAddBtn').css('background-color', mainColor);
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

//列表渲染
function Render() {
	var tasks;
	var taskTitle;
	var taskItemHTML='';

	var init = function() {
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

// menu
$('#menu-btn').click(function(event) {
	if ($('.menu-content').css('left')=='-260px') {
		$('.menu-content').css('left', '0');
		$('.cover').css('opacity', '.3');
	}else {
		$('.menu-content').css('left', '-260px');
		$('.cover').css('opacity', '0');
	}
});

$('.cover').click(function(event) {
	$('.menu-content').css('left', '-260px');
	$(this).css('opacity', '0');
});








