// 
// 예금 레이아웃
//


// 스크롤 내비게이션
$(document).ready(function () {});

// IE감지
// var agent = navigator.userAgent.toLowerCase();
// if (agent.indexOf("msie") > -1 || agent.indexOf("trident") > -1) {
// 	$('html').addClass('ie_html');
// }

// GNB
$(document).on('mouseenter focusin', '.header .gnb>ul>li>a', function () {
	var obj = $(this);
	obj.addClass('current').parent().siblings().find('>a').removeClass();
	obj.next().addClass('open').parent().siblings().find('.layer_memu_box').removeClass('open');
	$('.quick_menu_wrap').addClass('quick_hidden');
});
$(document).on('mouseleave', '#gnb', function () {
	gnbClose();
});
$(document).on('keydown', '#gnb>ul>li:last-child>.layer_memu_box>.menu_wrap>.menu_list:last-child>ul>li:last-child>a', function (e) {
	if (e.which == 9 != e.shiftKey && e.which == 9) {
		gnbClose();
	}
});

function gnbClose() {
	$('.gnb>ul>li>a').removeClass();
	$('.layer_memu_box').removeClass('open');
	$('.quick_menu_wrap').removeClass('quick_hidden');
}

// 전체메뉴 실행
$(document).on('click', '.btn_allmenu > button', function () {
	var obj = $(this);
	obj.parent().addClass('open');
	obj.find('>span').text('전체메뉴 닫기');
});

function menuBox(box) {
	$('.result_box > div').hide();
	$('.btn_mymenu_box > a').removeClass('current');

	if (box == 'lately') { // 최근이용 메뉴 열기
		$('.lately_result_box').show();
	} else if (box == 'my') { // MY메뉴 열기
		$('.mymenu_result_box').show();
	} else { // 메뉴 검색결과 열기
		$('.menu_search_box').show();
	}

	if ($('.result_box').css('display') == 'block') {
		allMenuHeight();
	} else {
		//$('.allmenu_wrap').animate({ height: $('.allmenu_wrap').height() - $('.result_box').outerHeight() });
		$('.allmenu_wrap').height($('.allmenu_wrap').height() - $('.result_box').outerHeight());
		$('.result_box').show();
	}
}

function menuClose() {
	$('.result_box').slideUp(function () {
		allMenuHeight();
	});
}

// 전체메뉴 버튼 off 변경 및 대체텍스트 변경
$(document).on('click', '.allmenu_inner .btn_close_popup', function () {
	$('.btn_allmenu > button').focus().parent().removeClass('open');
	$('.btn_allmenu > button').find('>span').text('전체메뉴 열기');
});

// 전체메뉴 mCustomScrollbar 설정
function allMenuScroll() {
	openModal('allMenuLayer', '.btn_allmenu > button');
	allMenuHeight();

	// $(".allmenu_wrap").mCustomScrollbar({
	// 	theme: "dark",
	// 	axis: "y"
	// });

	$(window).resize(function () {
		allMenuHeight();
	});
}

// 전체메뉴 높이 구하기
function allMenuHeight() {
	var h = $('.allmenu_inner').height();
	$('.allmenu_wrap').height(h - 243);
	if ($('.result_box').css('display') == 'block') {
		$('.allmenu_wrap').height($('.allmenu_wrap').height() - $('.result_box').outerHeight());
	}
}

// 전체메뉴 레이어 '최근이용 메뉴', 'MY메뉴' 활성화
$(document).on('click', '.btn_mymenu_box > a', function () {
	$(this).addClass('current').siblings().removeClass('current');
});

// 전체 메뉴 탭메뉴
$(document).on('click', '.tab_all_menu a', function () {
	var menuId = $(this).data('layer-tab');
	$(this).addClass('current').parent().siblings().find('>a').removeClass('current');
	$('.tab_sub_menu[data-menu-box="' + menuId + '"]').show().siblings().hide();
	return false;
});

// 최근 이용 메뉴 체크
function latelyCheck() {
	$('.lately_check').addClass('on');
	closeModal('myMenuAlert');
}

// 퀵메뉴 열기
$(document).on('click', '.btn_quick_open', function () {
	$('.quick_menu_inner').addClass('open');
});

// 퀵메뉴 닫기
$(document).on('click', '.btn_quick_close', function () {
	$('.quick_menu_inner').removeClass('open');
});

// Breadcrumb
$(document).on('click', '.breadcrumb_list>li>a', function (e) {
	if ($(this).next('.sub_list_wrap').length) {
		e.preventDefault();
		$(this).parent('li').toggleClass('on').siblings('li').removeClass('on');
	}
}).on('keydown', '.breadcrumb_list ul>li:last-child>a', function (e) {
	if (e.keyCode == 9 && !e.shiftKey) {
		$('.breadcrumb_list>li').removeClass('on');
	}
});
$(document).on('mousedown', function (e) {
	var $obj = $('.breadcrumb_list');
	if ($obj.length > 0) {
		var objPos = $obj.offset();
		objPos.right = (objPos.left + $obj.width());
		objPos.bottom = (objPos.top + $obj.height());
		if ((e.pageX < objPos.left || e.pageX > objPos.right || e.pageY < objPos.top || e.pageY > objPos.bottom) && !$(e.target).closest('.breadcrumb_list').length) {
			$('.breadcrumb_list>li').removeClass('on');
		}
	}
});

// 화면 크기 변경시에 축소
// function resizeApply() {
// 	var minWidth = 1200;
// 	var body = document.getElementsByTagName('body')[0];
// 	if (window.innerWidth < minWidth) {
// 			body.style.zoom = (window.innerWidth / minWidth);}
// 			else body.style.zoom = 1;
// }
// window.onload = function() {
// 	window.addEventListener('resize', function() {
// 		resizeApply(); 
// 	});
// }
// resizeApply();