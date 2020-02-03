// Avoid `console` errors in browsers that lack a console.
(function () {
	var method;
	var noop = function () { };
	var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
	];
	var length = methods.length;
	var console = (window.console = window.console || {});

	while (length--) {
		method = methods[length];

		// Only stub undefined methods.
		if (!console[method]) {
			console[method] = noop;
		}
	}
}());
// Place any jQuery/helper plugins in here.

//fancyFilter
; (function ($) {
	$.fn.fancyFilter = function (options) {

		if (this.length == 0) return this;

		var $el = $(this),
			$unit = $el.find('li'),
			length = $unit.length,
			slider;
		var suspension = false;
		var width = 'pc';
		var adjustControl = function () {
			var ww = $(window).width();
			if (ww <= 960 && ww > 480) {
				$('.cardsList .bx-wrapper .bx-controls').css({ 'left': -420 + (960 - ww) / 2 + 'px' });
			} else if (ww <= 480) {
				$('.cardsList .bx-wrapper .bx-controls').css({ 'left': -435 + (960 - ww) / 2 + 'px' });
			}
		};
		var ww = $(window).width();
		var funcs = {
			init: function () {
				$unit.each(function (i, el) {
					$(this).attr('data-index', i);
				});
				window.onorientationchange = funcs.resize;
				$('.cardsList').on('click', '[data-id="cardControler"] > li', funcs.click);
				$(window).resize(function () {
					if (slider) {
						if (Modernizr.mq('(min-width: 960px)')) {
							if (width != 'pc') {
								funcs.resize(50);
								width = 'pc';
							}
						} else if (Modernizr.mq('(min-width: 768px) and (max-width: 959px)')) {
							if (width != 'pad') {
								funcs.resize(30);
								width = 'pad';
							}
						} else {
							if (width != 'mobile') {
								funcs.resize(20);
								width = 'mobile';
							}
						}
					} else {
						if (Modernizr.mq('(min-width: 960px)')) {
							funcs.bulid(50);
						} else if (Modernizr.mq('(min-width: 768px) and (max-width: 959px)')) {
							funcs.bulid(30);
						} else {
							funcs.bulid(20);
						}
					}
					adjustControl();
				}).trigger('resize');
			},
			click: function () {
				if (suspension) {
					return false;
				}
				var _active = $el.find('.active').eq(0).data('index'),
					_this = $(this).data('index'),
					_relative = _this - _active;
				if (_relative > 2) {
					_relative = _relative - length;
				}
				if (_relative < -2) {
					_relative = _relative + length;
				}

				switch (_relative) {
					case 0:
						break;
					case 1:
						slider.goToNextSlide();
						break;
					case 2:
						slider.goToNextSlide();
						setTimeout(function () {
							slider.goToNextSlide();
						}, 330)
						break;
					case -1:
						slider.goToPrevSlide();
						break;
					case -2:
						slider.goToPrevSlide();
						setTimeout(function () {
							slider.goToPrevSlide();
						}, 330)
						break;
				}
				suspension = true;
				setTimeout(function () {
					suspension = false;
				}, 300 * Math.abs(_relative));
			},
			resize: function (margin) {
				var option = {
					slideMargin: margin,
					moveSlides: 1,
					maxSlides: 2,
					maxSlides: 2,
					startSlide: 2,
					speed: 300,
					touchEnabled: false,
					swipeThreshold: 80,
					easing: 'linear',
					fancyFilter: true,
					onSliderLoad: function () {
						$el.find('li').on('click', funcs.click)
					},
					onSlideBefore: function ($slideElement, oldIndex, newIndex) {
						$el.children().removeClass('active');
						var index = $slideElement.data('index');
						$('[data-index=' + index + ']').addClass('active');
						funcs.simulattion();
					}
				};
				slider.reloadSlider(option);
			},
			bulid: function (margin) {
				var option = {
					slideMargin: margin,
					moveSlides: 1,
					maxSlides: 2,
					maxSlides: 2,
					startSlide: 2,
					touchEnabled: false,
					swipeThreshold: 80,
					speed: 300,
					fancyFilter: true,
					easing: 'linear',
					onSliderLoad: function () {
						$el.find('li').on('click', funcs.click);
						adjustControl();
					},
					onSlideAfter: function () {
						var activeCardAmount = $('[data-id="cardControler"] li.active').children('[data-id="simulation"]').data('card-amount');
						$('[data-id="cardAmount"]').text(activeCardAmount);
					},
					onSlideBefore: function ($slideElement, oldIndex, newIndex) {
						$el.children().removeClass('active');
						var index = $slideElement.data('index');
						$('[data-index=' + index + ']').addClass('active');
						funcs.simulattion();
					}
				};
				slider = $el.bxSlider(option);
			},
			$listContainer: $('[data-id="cardContainer"]'),
			$items: $('[data-id="cardContainer"]').children().clone(),
			simulattion: function () {
				//����filter
				if (suspension) {
					return false;
				}
				funcs.$listContainer.empty();
				var items = random(funcs.$items);
				for (x in items) {
					$(items[x]).appendTo(funcs.$listContainer).hide().stop(true, false).fadeIn();
				}

				for (x in items) {
					$(items[x]).appendTo(funcs.$listContainer).hide().stop(true, false).fadeIn();
				}

				function random(array) {
					var r = Math.floor(Math.random() * funcs.$items.length),
						pitcher = new Array(),
						catcher = new Array();
					r++;
					for (i = 0; i < array.length; i++) {
						pitcher.push(array[i]);
					}
					pitcher = shuffle(pitcher);
					for (i = 0; i < r; i++) {
						catcher.push(pitcher.pop());
					}
					return catcher;
				}

				function shuffle(array) {
					var currentIndex = array.length, temporaryValue, randomIndex;

					// While there remain elements to shuffle...
					while (0 !== currentIndex) {

						// Pick a remaining element...
						randomIndex = Math.floor(Math.random() * currentIndex);
						currentIndex -= 1;

						// And swap it with the current element.
						temporaryValue = array[currentIndex];
						array[currentIndex] = array[randomIndex];
						array[randomIndex] = temporaryValue;
					}

					return array;
				}
			}
		}

		funcs.init();
		return this
	};

})(jQuery);
; (function ($) {
	$.fn.tabs = function (options) {

		var defaults = {
		}

		if (this.length == 0) return this;

		// support mutltiple elements
		if (this.length > 1) {
			this.each(function () { $(this).tabs(options) });
			return this;
		}

		var el = this;

		var tabs = {};

		var init = function () {
			tabs.settings = $.extend({}, defaults, options);
			if ($(el).children('[data-id="js-tab"]').hasClass('active')) {
				var active = $(el).children('.active').find('a').attr('href');
				$(active).fadeIn(300).siblings().hide();
			} else {
				$(el).children('[data-id="js-tab"]').eq(0).addClass('active');
				var active = $(el).children('[data-id="js-tab"]').eq(0).find('a').attr('href');
				$(active).fadeIn(300).siblings().hide();
			}
		};

		var start = function () {
			init();
			$(el).children('[data-id="js-tab"]').on('click', function (e) {
				e.preventDefault();
				$(this).addClass('active').siblings().removeClass('active');
				var active = $(el).children('.active').find('a').attr('href');
				$(active).fadeIn(300).siblings().hide();
			});
		};

		start();
		return this
	};
})(jQuery);

