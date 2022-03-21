/* 
	본 JS는 퍼블리싱 편의를 위해 
	중복되는 공통 레이아웃 영역을 로드할 목적으로 작성된 문서입니다.
	서버 언어로 레이아웃을 구성하게되면 오류를 유발하는 코드이오니
	Back-End 개발시 이 파일을 반드시 삭제해 주세요 :)
*/

// 레이아웃 공통 영역 로드
var _ui_dev_mode = true;
// var _ui_dev_mode = false;

$(function () {
	const headerInc = $('.header').data('inc');
	const pageTitle = $('.header').data('page-title');
	let headerUrl;
	if (headerInc == undefined) {
		if (pageTitle == undefined) {
			headerUrl = window.location.pathname;
		} else {
			headerUrl = '/html/_inc_header.html';
		}
	} else {
		headerUrl = '/html/' + headerInc;
	}
	const components = [{
		name: 'header',
		element: $('.header'),
		fileUrl: headerUrl,
		container: '.header',
		use: true,
		callback: function () {
			$('.tit_page').html(pageTitle);
		},
	}, {
		name: 'bottomQuickbar',
		element: $('.bottom_quickbar'),
		fileUrl: '/html/_inc_bottom_quickbar.html',
		container: '.bottom_quickbar',
		use: true,
		callback: function () {
			quickNavTabbar();
		},
	}, {
		name: 'commonLayers',
		element: $('.common_layers'),
		fileUrl: '/html/_inc_common_layers.html',
		container: '.common_layers',
		use: true,
		callback: function () {
			setTransferListSlider();
			accountThemeSetting();
		},
	}];

	components.forEach(function (value, index, array) {
		if (!components[index].element.is(':visible')) {
			components[index].use = false;
		}
	});

	let useLoadComponents = components.filter(function (useLoadComponent) {
		return useLoadComponent.use && window.location.pathname != useLoadComponent.fileUrl;
	});

	let defaultComponents = components.filter(function (defaultComponent) {
		var myContents = defaultComponent.use && window.location.pathname == defaultComponent.fileUrl;
		if (myContents) defaultComponent.callback.call();
		return myContents;
	});

	if (useLoadComponents.length < defaultComponents.length) {
		setDefaultUI('case 1');
	}

	useLoadComponents.forEach(function (value, index, array) {
		var component = useLoadComponents[index],
			element = component.element,
			fileUrl = component.fileUrl,
			container = component.container,
			callback = component.callback;
		if (window.location.pathname == fileUrl) {
			setDefaultUI('case 2');
		} else {
			element.load(fileUrl + ' ' + container + ' > *', function (response, stu, xhr) {
				callback.call();
				if (index == useLoadComponents.length - 1) {
					setDefaultUI('case 3');
				}
			});
		}
	});

	// 페이지 로딩시 기본 세팅
	function setDefaultUI(type) {
		hashModalOpener();

		// 공통 UI
		tabmenu();
		inputStatus();
		quickNavSettingLayer();
		setQuickTransferSwitch();

		// 접근성
		setCaption();

		if (_ui_dev_mode) console.log(type + ': UI setup is complete.');
	}
});

//
// 공통 컴포넌트 UI
//

// 해시 URL로 모달팝업 열기 (화면 미리보기 용도)
function hashModalOpener() {
	var hash = window.location.hash;
	var popupData = hash.substring(hash.lastIndexOf("#") + 1);
	if ($('.modal_popup[data-popup="' + popupData + '"]').length) {
		if ($('.modal_popup.show').length) closeModal($('.modal_popup.show').data('popup'));
		openModal(popupData);
	}
	$(window).bind('hashchange', function () {
		hashModalOpener();
	});
}

// 탭메뉴
function tabmenu() {
	$(document).on('click', '.tab_list a', function (e) {
		var tg = $(this).attr('href');
		$(this).attr('title', '선택됨').parent('li').addClass('on').siblings('li').removeClass('on').children('a').removeAttr('title');
		if (tg === '#' || tg === '' || tg === '#;') {
			e.preventDefault();
		} else if (tg.charAt(0) === '#') {
			if ($(tg).hasClass('tab_cont')) {
				$(tg).show().siblings('.tab_cont').hide();
				e.preventDefault();
			}
		}
	});
	$('.tab_list .on a').each(function () {
		$(this).attr('title', '선택됨');
		var tg = $(this).attr('href');
		if (tg !== '#' && tg !== '#;' && tg.charAt(0) === '#') {
			$(tg + '.tab_cont').css('display', 'block');
		}
	});
	$('.tab_menu1').each(function () {
		var outerWidth = Math.floor($(this).width());
		var innerWidth = 0;
		var current = $('li.on', this).index();
		$('li', this).each(function () {
			innerWidth += Math.floor($(this).width());
		});

		if (outerWidth < innerWidth) {
			$(this).addClass('scroll_enable');
		}
		if (current > 1) {
			var posL = $('li', this).eq(current - 1).position().left;
			$(this).children().scrollLeft(posL);
		}
	});
	$('.tab_menu2').each(function () {
		if ($('li', this).length > 3) {
			$(this).addClass('col_drop');
		}
	});
	//포스트페이 하단버튼 스크롤 3월 4주차 추가
	$('.btn_group').each(function () {
		var outerWidth = Math.floor($(this).width());
		var innerWidth = 0;
		var current = $('.btn_group input:checked').closest('.check_item', this).index();
		$('.check_item').eq(current).addClass('on');
		var checkCurrent = $('.check_item.on', this).index();
		$('.check_item', this).each(function () {
			innerWidth += Math.floor($(this).width());
		});
		if (outerWidth < innerWidth) {
			$(this).addClass('scroll_enable');
		}
		if (checkCurrent > 1) {
			var posL = $('.check_item', this).eq(checkCurrent - 1).position().left;
			$(this).children().scrollLeft(posL);
		}
	});
}

// 인풋박스 스타일
function inputStatus() {
	$('.tf_item').click(function () {
		$('.tf_item').removeClass('focus');
		$(this).addClass('focus');
	});
	$('.tf_item .btn_reset').click(function () {
		$(this).prev('.tf').val('').focus();
	});
	$('.tf_item .tf, .tf_item .opt').focus(function () {
		$(this).closest('.tf_item').addClass('focus');
	}).blur(function () {
		$(this).closest('.tf_item').removeClass('focus');
	});
	$('.tf_item').each(function () {
		var $container = $(this);
		var $tf = $('.input_area .tf', this);

		if ($('.input_area .tf, .input_area .opt', this).length > 1 || $('.input_area :input', this).length > 1) {
			$container.addClass('active');
		} else if (!$('.lab:input', $container)) {
			// console.log(111);
		} else if ($tf.length == 1) {
			var text = Boolean($tf.val()) || Boolean($tf.attr('placeholder'));
			$container.toggleClass('active', text);

			$tf.on('focusin', function () {
				$container.addClass('active');
			}).on('focusout', function () {
				text = Boolean($tf.val()) || Boolean($tf.attr('placeholder'));
				$container.toggleClass('active', text);
			});
		}
	});
}

// 터치 디바이스 체커
function is_touch_device() {
	try {
		document.createEvent("TouchEvent");
		return true;
	} catch (e) {
		return false;
	}
}

// 퀵메뉴설정 레이어
function quickNavSettingLayer() {
	if (is_touch_device) {
		$.ajax({
			async: false,
			type: 'GET',
			dataType: 'script',
			url: '/resources/js/jquery.ui.touch-punch.js'
		});
	}

	// 드래그앤 드롭 순서 변경
	$('.quickmenu_list_all').sortable({
		placeholder: 'sortable-placeholder'
	});
}

// 접근성 개선 관련
function setCaption() {
	if ($('.input_step .on').length) {
		$('.input_step .on').each(function () {
			$(this).append('<span class="sr_only">현재 단계</span>');
		});
	}
}

// 데이트피커 기본설정
$(function () {
	$.datepicker.setDefaults({
		showOn: 'button',
		buttonImageOnly: true,
		dateFormat: 'yy.mm.dd',
		changeMonth: true,
		changeYear: true,
		buttonImageOnly: false,
		showMonthAfterYear: true,
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		yearSuffix: '년',
	});
});

// 데이트피커 + 모달레이어
var $target;

function openDatepicker(opener, target) {
	if (target == undefined) {
		$target = $(opener).closest('.tf_item').find('.tf').eq(0);
	} else {
		$target = $(target);
	}
	$target.datepicker({
		beforeShow: function () {
			$('body').append('<div class="modal_popup modal_datepicker hide" data-popup="layerDatepicker"><div class="dimed"></div><div class="popup_inner"><div class="popup_body"></div><button type="button" class="btn btn_close_popup">닫기</button></div></div>');
			$('#ui-datepicker-div').appendTo('[data-popup=layerDatepicker] .popup_body');
			openModal('layerDatepicker', modalOpener);
			setTimeout(datepickerAddCaption, 200);
		},
		onChangeMonthYear: function () {
			setTimeout(datepickerAddCaption, 200);
		},
		onClose: function () {
			closeModal('layerDatepicker');
			$('[data-popup=layerDatepicker]').remove();
			$(opener).focus();
		}
	}).datepicker('show');
}

function datepickerAddCaption() {
	$('.ui-datepicker-prev, .ui-datepicker-next').attr('href', '#;');
	$('.ui-datepicker-calendar').prepend('<caption>달력</caption>');
	$('.ui-state-active').attr('title', '선택됨');
	$('.ui-datepicker-today a').attr('title', '오늘');
	$('.ui-datepicker-today .ui-state-active').attr('title', '오늘(선택됨)');
	$('.ui-datepicker-year').attr('title', '년');
	$('.ui-datepicker-month').attr('title', '월');
}

// 모달 레이어
$(function () {
	$('.modal_popup.show').each(function () {
		//openModal($(this), null);
		openModal($(this).data('popup'));
	});
	// URL 해시 레이어 활성화
	var hash = location.hash;
	if (!(hash === '#' || hash === '' || hash === '#;')) {
		setTimeout(
			function () {
				if ($(hash).hasClass('modal_popup')) openModal(hash);
			}, 300);
	}
});

var modalOpener = null;
$(document).on('click', 'a.js_layer_open', function (e) {
	var tg = $(this).attr('href');
	openModal(tg, $(this));
	e.preventDefault();
}).on('click', '.modal_popup .btn_close_popup, .modal_popup .dimed', function () {
	if ($(this).closest('.modal_popup').hasClass('modal_datepicker')) {
		$target.datepicker('hide');
	} else if ($(this).hasClass('remove')) {
		$(this).closest('.modal_popup').remove();
	} else {
		var target = $(this).closest('.modal_popup').attr('data-popup');
		closeModal(target, modalOpener);
	}
}).on('keydown', '.modal_popup .popup_inner', function (e) {
	if ($('.popup_inner').is(e.target) && e.keyCode == 9 && e.shiftKey) { // shift + tab
		e.preventDefault();
		$(this).find('.btn_close_popup').focus();
	}
}).on('keydown', '.modal_popup .btn_close_popup', function (e) {
	if (e.keyCode == 9 && !e.shiftKey) { // tab
		e.preventDefault();
		$(this).closest('.popup_inner').attr('tabindex', '0').focus();
		$(this).unbind('keydown').keydown();
	}
});

function openModal(_target, _opener) {
	var tg = $('.modal_popup[data-popup=' + _target + ']');
	tg.removeClass('dim_hide');
	if (tg.length > 0) {
		modalOpener = _opener;
		$(_target).appendTo('body');
		bodyScroll(true, $('body').width());
		$('body').addClass('modal_open');
		setTimeout(function () {
			tg.addClass('show').removeClass('hide');
			$('.modal_popup').not($('.modal_popup[data-popup=' + _target + ']')).addClass('dim_hide');
		}, 100);
		setTimeout(function () {
			$('.popup_inner', tg).attr('tabindex', '0').focus();
			tg.scrollTop(0);
		}, 300);
	}

	// 하단 고정영역 내 토글 모달 호출 버튼 활성화
	if (tg.hasClass('modal_toggle')) {
		tg.closest('.bottom_toggle').find('.btn_toggle').addClass('active');
	}

	// [접근성] 헤더 내 모달 닫기 버튼 위치 변경
	if (tg.hasClass('popup') && $('.btn_close_popup', tg).length) {
		$('.btn_close_popup', tg).appendTo($('.popup_inner', tg));
	}
}

function closeModal(_target) {
	var tg = $('.modal_popup[data-popup=' + _target + ']');
	if ($('.modal_popup').hasClass('show')) {
		$('.modal_popup').removeClass('dim_hide');
	}
	if (tg.hasClass('show')) {
		if ($('.modal_popup.show').length == 1) {
			bodyScroll(false);
		}
		tg.addClass('hide').removeClass('show');
		if ($(modalOpener).length && !tg.hasClass('modal_datepicker')) {
			$(modalOpener).focus();
		}
		// 레이어 해시 제거
		history.pushState('', document.title, window.location.pathname + window.location.search);
	} else {
		alert('닫을 레이어를 올바로 지정해 주세요. \n closeModal(\'#레이어아이디\')')
	}

	// 하단 고정영역 내 토글 모달 호출 버튼 비활성화
	if (tg.hasClass('modal_toggle')) {
		tg.closest('.bottom_toggle').find('.btn_toggle').removeClass('active');
	}
}

var modalScrollTop;

function bodyScroll(_status, _orgWidth) {
	var $fixedModal = $('body');

	if (_status) {
		$fixedModal.addClass('modal_open');
		var scrollbarWidth = $('body').width() - _orgWidth;
		if (scrollbarWidth > 0) {
			$fixedModal.css({
				'margin-right': scrollbarWidth
			});
			$('.fixed-header #header').css({
				'right': scrollbarWidth
			});
		}
	} else {
		$fixedModal.removeClass('modal_open');
		$fixedModal.css({
			'margin-right': '',
		});
		$('.fixed-header #header').css({
			'right': '',
		});
	}
}

$(function () {
	// 하단 고정영역 내 토글 모달
	$('.bottom_toggle').each(function () {
		var $btn = $('.btn_toggle', this);
		var modalData = $('.modal_toggle', this).data('popup');
		var $cont = $('.toggle_cont', this);
		var spacing = $('.toggle_btn_area', this).outerHeight();

		$cont.css('bottom', spacing);

		$btn.click(function (e) {
			e.preventDefault();
			if ($btn.hasClass('active')) {
				$btn.removeClass('active');
				closeModal(modalData, $btn);
			} else {
				$btn.addClass('active');
				openModal(modalData, $btn);
			}
		});
	});
});

// 
// 레이아웃
//

// 전체메뉴
$(document).on('click', '.btn_allmenu', function (e) {
	e.preventDefault();
	allmenuControl('open', $(this));
}).on('click', '.btn_allmenu_close, .allmenu .dimed', function (e) {
	e.preventDefault();
	let opener = $allmenuOpener ? $allmenuOpener : $('.btn_allmenu');
	allmenuControl('close', opener);
});

var $allmenuOpener = null;

function allmenuControl(_status, _opener) {
	$allmenuOpener = $(_opener);
	if (_status == 'open') {
		$('.allmenu').appendTo('body');
		setTimeout(function () {
			$('body').toggleClass('allmenu_open');
		}, 100);
		setTimeout(function () {
			$('.allmenu_inner').attr('tabindex', '0').focus();
		}, 300);
	} else if (_status == 'close') {
		$('body').removeClass('allmenu_open');
		$allmenuOpener.focus();
	}
}

// 다이렉트 헤더 내 토글리스트
$(document).on('click', '.direct_ongoing_list dt a', function (e) {
	e.preventDefault();
	$(this).parent('dt').next('dd').slideToggle('fast').siblings('dd').slideUp('fast');
	$(this).parent('dt').toggleClass('on').siblings('dt').removeClass('on');
});

$(document).on('click', '.gnb_area a', function (e) {
	// 전체메뉴 내 탭
	e.preventDefault();
	$('.lnb_title').text($(this).text());
	$('.gnb_area li').removeClass('on').children('a').removeAttr('title');
	$(this).parent('li').addClass('on').children('a').attr('title', '선택됨')
}).on('click', '.lnb_list .btn_favor', function (e) {
	// 자주쓰는 메뉴 토글
	e.preventDefault();
	$(this).attr('title', $(this).attr('title') == '등록됨' ? '' : '등록됨')
		.children('.ico').toggleClass('ico_star_on ico_star_off');
});

// 상하 스크롤 블러영역
$(document).ready(function () {
	$('.scroll_container').each(function () {
		scrVertical($(this));
	});
});

function scrVertical(_obj) {
	if (_obj.height() < _obj.children('.scroll_track').children('.scroll_content').height()) {
		_obj.addClass('scroll_start');
	}

	_obj.children('.scroll_track').on('scroll', function (e) {
		var currTop = this.scrollTop,
			scrHeight = this.scrollHeight,
			trackHeight = $(this).height();

		// 하단 블러
		if (currTop === 0 || currTop + trackHeight < scrHeight) {
			_obj.removeClass('scroll_end').addClass('scroll_start')
		} else if (currTop + trackHeight === scrHeight) {
			_obj.removeClass('scroll_start')
		}

		// 상단, 하단 블러 
		// if (currTop === 0) {
		// 	_obj.removeClass('scrolling').removeClass('scroll_end').addClass('scroll_start')
		// } else if (currTop + trackHeight < scrHeight) {
		// 	_obj.removeClass('scroll_start').removeClass('scroll_end').addClass('scrolling')
		// } else if (currTop + trackHeight === scrHeight) {
		// 	_obj.removeClass('scrolling').removeClass('scroll_start').addClass('scroll_end')
		// }
	})
}

$(document).on('click', '.untact_menu > li > .toggle_tit', function () {
	var accCurrent = $(this);
	if (accCurrent.hasClass('on')) {
		accCurrent.removeClass('on').children().find('.sr_only').text('펼치기');
		accCurrent.next().slideUp();
	} else {
		accCurrent.addClass('on').children().find('.sr_only').text('접기');
		accCurrent.next().slideDown();
	}
})

// 레이어 옵션선택 활성화항목 접근성 개선
$(function () {
	setTimeout(function () {
		$('.opt_list .active').each(function () {
			$(this).attr('title', '선택됨');
		});
	}, 200);
});

//
// 메인
//

// 헤더 GNB
$(document).on('click', '.gnb a', function (e) {
	$(this).attr('title', '선택됨').parent('li').addClass('on')
		.siblings('li').removeClass('on').children('a').removeAttr('title');
});

// 빠른이체 스위치
function setQuickTransferSwitch() {
	if ($('.acc_info_area .check_quick_transfer').length) {
		$('.acc_info_area .check_quick_transfer').each(function () {
			quickTransferToggle($(this));
		}).change(function () {
			quickTransferToggle($(this));
		});
	}
}

function quickTransferToggle(_obj) {
	if ($('input', _obj).prop('checked')) {
		$(_obj).closest('.acc_info_area').find('.add_quick').show();
	} else {
		$(_obj).closest('.acc_info_area').find('.add_quick').hide();
	}
}

// 빠른이체목록 슬라이더
function setTransferListSlider() {
	$('.transfer_list a').click(function () {
		$(this).toggleClass('on');
		if ($(this).hasClass('on')) {
			$(this).attr('title', '선택됨');
		} else {
			$(this).removeAttr('title');
		}
	});
	$('.transfer_list').slick({
		fade: false,
		autoplay: false,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		variableWidth: true,
		infinite: true,
		arrows: false,
		dots: false,
		// dotsClass: 'slick-dots',
		accessibility: false,
	});
	$('.tab_list a').click(function () {
		$('.transfer_list').slick('setPosition');
	});
}

// 자주쓰는메뉴
function favorMenuControl() {
	const $box = $('.favor_menu_box'),
		maxH = $box.outerHeight(),
		minH = 182,
		boxTop = $box.offset().top - 100;
	let boxH,
		btnText;
	$box.css('height', minH);
	$('.btn_box_handler').click(function (e) {
		e.preventDefault();
		$box.toggleClass('opened');
		boxH = $box.hasClass('opened') ? maxH : minH;
		btnText = $box.hasClass('opened') ? '접기' : '펼치기';
		$(this).children('.sr_only').text(btnText);
		$('.favor_menu_box').animate({
			'height': boxH
		}, 'fast');
		$('body, html').animate({
			scrollTop: boxTop
		}, 300);
	});
}

// 퀵메뉴 하단바
function quickNavTabbar() {
	const $quickNav = $('.bottom_quickbar'),
		$handler = $('.quickbar_handler');

	if ($('.bottom_quickbar:visible').length) {
		$('body').addClass('use_quickbar');
		$quickNav.css('bottom', 80 - $quickNav.outerHeight());
		$handler.click(function (e) {
			e.preventDefault();
			quickNavControl('toggle');
		});
		$('.bottom_quickbar').on('scroll touchmove mousewheel', function (e) {
			e.preventDefault();
			e.stopPropagation();
		});
		let mstartY = 0,
			mendY = 0,
			startY = 0,
			endY = 0,
			range = 30;
		$quickNav.on('mousedown', function (e) {
			mstartY = e.pageY;
		}).on('mouseup', function (e) {
			mendY = e.pageY;
			if (mstartY - mendY > range) {
				quickNavControl('expand');
			} else if (mendY - mstartY > range) {
				quickNavControl('collapse');
			}
		}).on('touchstart', function (e) {
			startY = e.originalEvent.changedTouches[0].screenY;
		}).on('touchend', function (e) {
			endY = e.originalEvent.changedTouches[0].screenY;
			if (startY - endY > range) {
				quickNavControl('expand');
			} else if (endY - startY > range) {
				quickNavControl('collapse');
			}
		});
	}

	function quickNavControl(status) {
		if (status == 'expand') {
			$quickNav.addClass('opened');
		} else if (status == 'collapse') {
			$quickNav.removeClass('opened');
		} else if (status == 'toggle') {
			$quickNav.toggleClass('opened');
		}
		var text = $quickNav.hasClass('opened') ? '접기' : '펼치기';
		$handler.children('.sr_only').text(text);
	}
}

// 계좌관리 레이어 호출
var $accBox;

function accountSettingView(opener) {
	openModal('layerDepositManage', opener);
	$accBox = $(opener).closest('.acc_info_area');
	console.log($accBox);
}

function accountThemeSetting() {
	// 계좌관리 색상선택
	$('.btn_theme').each(function () {
		var options = $(this).data('theme-options'),
			brightness = options.brightness,
			color = options.boxColor;

		$(this).css('background-color', $(this).data('theme-options').boxColor);
		if (brightness == 'light') {
			$(this).addClass('btn_theme_light');
		}

		$(this).click(function () {
			$(this).addClass('on').attr('title', '선택됨')
				.closest('li').siblings('li').children('.btn_theme').removeClass('on').removeAttr('title', '선택됨');

			closeModal('layerDepositManage');
			setTimeout(function () {
				$('.acc_box', $accBox).css('background-color', color);
				if (brightness == 'light') {
					$($accBox).removeClass('theme_dark');
					$($accBox).addClass('theme_light');
				} else if (brightness == 'dark') {
					$($accBox).removeClass('theme_light');
					$($accBox).addClass('theme_dark');
				} else {
					$($accBox).removeClass('theme_light');
					$($accBox).removeClass('theme_dark');
				}
			}, 100);
		});
	});
}