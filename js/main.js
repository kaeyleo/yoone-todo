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
		$('#addBtn').css({
			'transform': 'rotate(-45deg)',
			'-webkit-transform': 'rotate(-45deg)'
		});
		//弹出子按钮
		$('.okAddBtn').css('bottom', '200px');
	}else{
		$('#addContent').fadeOut(200);
		//按钮旋转
		$('#addBtn').css({
			'transform': 'rotate(0deg)',
			'-webkit-transform': 'rotate(0deg)'
		});
		$('.okAddBtn').css('bottom', '30px');
	}		
});

//确认添加任务
$('.okAddBtn').click(function(event) {
	var text = $('#value').val();
	if(text) {
		model.addTask(text);
		$('#value').val("");
		$('#addContent').fadeOut(200);
		$('#addBtn').css({
			'transform': 'rotate(0deg)',
			'-webkit-transform': 'rotate(0deg)'
		});
		$('.okAddBtn').css('bottom', '30px');
		$('.okAddBtn').css('background-color', '#757575');
	} 
});

//对input绑定输入监听
$('#value').bind('input propertychange', function(event) {
		var vinput = $('#value').val();
		//如果有输入则控件变色
		if(vinput!=='') {
			$('.okAddBtn').css('background-color', '#ff4081');

			$('.add-task-input').css('border-bottom-color', '#000');
		}
		//如果输入为空则控件变为默认色，待增加默认样式配置变量
		if(vinput==='') {
			$('.okAddBtn').css('background-color', '#757575');
			$('.add-task-input').css('border-bottom-color', '#BDBDBD');
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
				taskItemHTML += '<li class="task-item"><span class="task-title">'+taskTitle+'</span><i>'+i+'</i><div class="finish"></div></li>';
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
	console.log('hello');
});








