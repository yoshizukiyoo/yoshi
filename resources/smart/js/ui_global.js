// ui_global.js : 필수 스크립트 정의

// 헤더 스크롤시 디자인
$(window).on('load scroll', function () {
	var scrollValue = $(document).scrollTop();
	if (scrollValue) {
		$('body').addClass('scrolled');
	} else {
		$('body').removeClass('scrolled');
	}
});

$(function () {
	// 하단 고정영역 모달 오픈 여백 확보
	if ($('.bottom_fixed_area').length) {
		$('.wrapper').css('padding-bottom', $('.bottom_fixed_area').outerHeight());
	}

	// 토글 버튼
	$('[data-toggle-btn]').click(function () {
		var $btn = $(this);
		var toggleContent = $(this).data('toggle-btn');
		var $cont = $('[data-toggle-content=' + toggleContent + ']');
		$cont.toggle();

		// 툴팁
		if ($cont.hasClass('tooltip')) {
			var contTop = $btn.offset().top + $btn.outerHeight();
			$cont.css('top', contTop);
			$cont.appendTo('#content');
		};
	});

	// 툴팁 닫기
	$('.btn_close_tooltip').click(function () {
		$(this).closest('[data-toggle-content]').toggle();
	});
});

// 테이블 스크롤 표시
$(function () {
	$('.tbl').each(function () {
		tableScroll($(this));
	});
});

function tableScroll(obj) {
	if (obj.width() < obj.children('table').width()) {
		obj.addClass('tbl_scroll');
		obj.wrapInner('<div class="scroll_track"></div>').append('<i class="ico ico_chevron_primary_bold_left"></i><i class="ico ico_chevron_primary_bold_right"></i>');
	}

	var ingClass = 'scroll_ing',
		endClass = 'scroll_end';

	obj.children('.scroll_track').on('scroll', function (e) {
		var currLeft = this.scrollLeft,
			scrWidth = this.scrollWidth,
			cliWidth = this.clientWidth;

		if (currLeft === 0) {
			obj.removeClass(ingClass).removeClass(endClass);
		} else if (currLeft !== 0 && currLeft + cliWidth < scrWidth) {
			obj.addClass(ingClass).removeClass(endClass);
		} else {
			obj.addClass(endClass);
		}
	});
}

// 기간조회 버튼 클릭 활성화
$(document).on('click', '.btn_period', function () {
	$(this).addClass('active').attr('title', '선택됨')
		.siblings('.btn_period').removeClass('active').removeAttr('title');
});