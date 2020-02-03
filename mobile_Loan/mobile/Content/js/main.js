$(function () {
	//e.preventDefault();
	//e.stopPropagation();

	//loading
	$(window).load(function () {
		$('body').removeClass('loading');
	});

	var headerHeight = $('.header').outerHeight(),
		headerOffset = $('.header').offset().top;
	if (headerOffset > headerHeight) {
		$('.header').addClass('on');
	} else {
		$('.header').removeClass('on');
	}
	$(window).on('scroll', function (e) {
		var winTop = $(this).scrollTop();
		if (winTop > 0 || $('body').hasClass('openMenu')) {
			$('.header').addClass('on');
		} else {
			$('.header').removeClass('on');
		}

		if (winTop > 100) {
			$('[data-id="js-goTop"]').fadeIn(300);
		} else {
			$('[data-id="js-goTop"]').fadeOut(200);
		}
	});

	$('[data-id="js-burger"]').on('click', function () {
		$('body').toggleClass('openMenu');
		$('.header').toggleClass('on');
	});

	$('.menuMask').on('touchstart click', function (e) {
		e.preventDefault();
		$('body').removeClass('openMenu');
		$('.header').removeClass('on');
	});

	$('[data-id="mm1Toggle"]').on('click', function () {
		$(this).toggleClass('on');
		$(this).next('.mm2').slideToggle(300);
	});

	$('.mm2__name').on('click', function () {
		$(this).toggleClass('on');
		$(this).next('.mm3').slideToggle(300);
	});

	$('[data-id="js-share"]').on('click', function () {
		$(this).closest('.shareBox').toggleClass('on');
		$(this).find('.icon').toggleClass('open');
		$(this).next('.shareBox__list').toggleClass('on');
	});

	$('[data-id="js-goTop"]').on('click', function () {
		$('body,html').animate({ scrollTop: 0 }, 600)
	});

	$('[data-id="js-collapse"]').on('click', function () {
		var $this = $(this);
		var $container = $(this).closest('.collapse');
		$this.toggleClass('on');
		$this.next('[data-content="collapse"]').slideToggle(300).toggleClass('open');
		$container.siblings('.collapse').children('[data-content="collapse"]').slideUp(300).removeClass('open');
		$container.siblings('.collapse').children('[data-id="js-collapse"]').removeClass('on');
		if ($this.hasClass('on')) {
			setTimeout(function () {
				var offsetTop = $this.offset().top;
				$('body, html').animate({ scrollTop: offsetTop - $('header').outerHeight() });
			}, 350);
		}
	}).each(function () {
		if ($(this).hasClass('on')) {
			var $container = $(this).closest('.collapse');
			$(this).next('[data-content="collapse"]').show().addClass('open');
		}
	});

	$('[data-trigger-click="true"]').trigger('click');

	$('[data-js-tabs="true"]').tabs();

	$('[data-fancyform="normal"]').transformSelect();

	$('[data-fancyform="contry"]').transformSelect({
		subTemplate: function (i) {
			return "<img src='" + i.data('contry-image') + "'><span>" + i.text() + "</span>";
		},
		initValue: function () {
			return "<img src='" + $(this).data('contry-image') + "'>" + $(this).text();
		},
		valueTemplate: function () {
			return "<img src='" + $(this).data('contry-image') + "'>" + $(this).text();
		},
	});

	$('[data-id="js-submit"]').on('click', function (e) {
		var submitValue = $(this).data('submit-value');
		$('[data-result-value="' + submitValue + '"]').fadeIn();
	});
})