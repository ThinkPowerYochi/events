//isTouch
var isTouch = function () {
	return 'ontouchstart' in window        // works on most browsers 
		|| navigator.maxTouchPoints;       // works on IE10/11 and Surface
};


$(function () {
	
	//  $('.input-cart-number').keypress(function(e){
	// 	  var op="";
	// 		var tmp = $(this).val().replace(/\D/g, "");
	// 		for (var i=0;i<tmp.length;i++)
	// 		{
	// 				if (i%4===0 && i>0)
	// 				{
	// 						op += "-" + tmp.charAt(i);
	// 				} else {
	// 						op += tmp.charAt(i);
	// 				}
	// 		}
	// 		$(this).val(op);
		
	// });

	$('.input-cart-number').on('keyup change', function(){
		var card_number = '';
		$('.input-cart-number').each(function(){
			card_number += $(this).val() + ' ';
			 
		})
	$('.card-front .number').html(card_number);
	$('span.input_num3').text(card_number);
});


	 $('.card-expiration-month, .card-expiration-year').change(function(){
		m = $('.card-expiration-month option').index($('.card-expiration-month option:selected'));
		m = (m < 10) ? '0' + m : m;
		y = $('.card-expiration-year :selected').val().substr(2,2);
		y2 = $('.card-expiration-year').val();
		$('.card-expiration-date div').html(m + '/' + y);
    $('span.input_num4').text(m + '/' + y2);
	  })
	 $('.input-cart-number').on('focus', function(){
		$('.index_banner_card').removeClass('flipped');
	 })
	 $('.card-expiration-month, .card-expiration-year').change(function(){
		$('.index_banner_card').removeClass('flipped');
	 })

	 $('.card-ccv').on('focus', function(){
		$('.index_banner_card').addClass('flipped');
		}).on('keyup change', function(){
		$('.card-back .ccv div').html($(this).val());
	});
   
	//fancyform
	$('select:not([multiple])').transformSelect({
		addDropdownToBody: true
	});
	$('select[multiple]').transformSelect({
		addDropdownToBody: true,
		showFirstItemInDrop: false
	});
		
	$('#calculation_btn').bind("click", function () {
	
		var isSelfMoney = $('input[name="Money"]:checked').val() * 1 === 0;
		var DeMoney = isSelfMoney ? $('#Self_money').val() : $('input[name="Money"]:checked').val();
		var Term = $('input[name="Period"]:checked').val();


			if(DeMoney<=0 || DeMoney>=14001 || Term<=0){
				 
			}
			else{
				console.log(isSelfMoney);
				console.log(Term);
				showDetail(DeMoney,Term);
			}
			// console.log(`DeMoney:${DeMoney}`);
	});

	function showDetail(BalMoney, Term) {
		var isSelfMoney = $('input[name="Money"]:checked').val() * 1 === 0;
		var DeMoney = isSelfMoney ? $('#Self_money').val() : $('input[name="Money"]:checked').val();
		var CurPaidTemp = 0;
		var MRate = 1.4;
		var totalPaid = 0;
		var totalInt = 0;
		var BalMoney;
		var tbody = $('#equation-table tbody');
		$('.add__result').show();
			for (i = 1; i <= Term; i++) {
				BalMoney = BalMoney - CurPaidTemp;
				if (i == 1) {
						CurPaidTemp = DeMoney - Math.floor(DeMoney / Term * 10000 / 10000) * (Term - 1);
				} else {
						CurPaidTemp = Math.floor(DeMoney / Term * 10000 / 10000);
				}
				var Interest = Math.round(BalMoney * (MRate / 100) * 10000 / 10000);
				var CurPaid = CurPaidTemp + Interest
				totalPaid = totalPaid + CurPaidTemp;
				totalInt = totalInt + Interest;
	
				var strCurPaidTemp = (CurPaidTemp.toString());
				var strBalMoney = (BalMoney.toString());
				var strInterest = (Interest.toString());
				var strCurPaid = (CurPaid.toString());
	
				tbody.append(
				'<tr><td class="green">' + i + '</td><td>' + strCurPaidTemp + '</td><td>' + strBalMoney + '</td><td>' + strInterest + '</td><td>' + strCurPaid + '</td></tr>'
				 )
	
			}


		
	
		var strTotalPaid = (totalPaid.toString());
		var strtotalInt = (totalInt.toString());
		$('#totalpaidLoan').html(strTotalPaid)
		$('#totalintLoan').html(strtotalInt)
		
	}
	
	// $('input[name="Period"]').change(function () {
	// 		var isSelfPeriod = $('input[name="Period"]:checked').val() * 1 === 0;
	// 		console.log(isSelfPeriod);
	// 		showDetail(reset); 
	// });

	function reset(){
		var tbody = $('#equation-table tbody');
		tbody.append(
			' '
		)
	}
		
  function evenRound(num, decimalPlaces) {

    var d = decimalPlaces || 0;
    var m = Math.pow(10, d);
    var n = +(d ? num * m : num).toFixed(8);
    var i = Math.floor(n), f = n - i;
    var e = 1e-8; 
    var r = (f > 0.5 - e && f < 0.5 + e) ?
                ((i % 2 == 0) ? i : i + 1) : Math.round(n);
    return d ? r / m : r;
}
	$('select[multiple]').change(function () {
		var val = $(this).val();
		val = val ? val.toString() : $(this).children('option:first').text();
		var $container = $(this).next('.transformSelect').children('li').children('span');
		if ($container.length > 0) {
			$container.text(val);
		} else {
			$(this).prev('span').text(val);
		}
	});
	$('input.transCheckbox').transformCheckbox({
		base: 'class',
		trigger: 'parent'
	});
	$('[data-id="telLink"]').click(function () {
		if (isTouch()) {
			location.href = $(this).data('href');
		} else {
			return false;
		}
	});

	$('[data-id="js-collapse"]').on('click', function () {
		var $this = $(this);
		var $container = $(this).closest('.collapse');
		$this.toggleClass('on');
		$this.next('[data-content="collapse"]').slideToggle(300).toggleClass('open');
		// $container.siblings('.collapse').children('[data-content="collapse"]').slideUp(300).removeClass('open');
		// $container.siblings('.collapse').children('[data-id="js-collapse"]').removeClass('on');
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
	//fancyradio
	var fancyradio = {
		init: function () {
			$('.fancyRadio').each(function () {
				var el = $(this);
				var id = el.find('.fancyRadio__input:checked').attr('id');
				var $content = $('[data-for="' + id + '"]');
				if ($content.length) {
					$('[data-for="' + id + '"]').show();
					$(this).closest('.fancyRadio').addClass('open');
				}
			})
		},
		binding: function () {
			$('.fancyRadio__label').click(function () {
				var $container = $(this).closest('.fancyRadio');
				var $target = $('[data-for="' + $(this).attr('for') + '"]');
				var ISchecked = $(this).prev().prop('checked');
				if (ISchecked) {
					return false;
				}
				$container.siblings('.fancyRadio__content').slideUp(300);
				$target.slideDown(300);
				if ($target.length) {
					$(this).closest('.fancyRadio').addClass('open');
				} else {
					$(this).closest('.fancyRadio').removeClass('open');
				}
			});
		}
	};
	fancyradio.init();
	fancyradio.binding();

	if (!isTouch()) {
		$('input[type="date"]').each(function () {
			$(this).attr('type', 'text');
			$(this).parent().append('<span class="input-group-addon"></span>').datepicker({
				format: "twy-mm-dd",
				autoclose: true,
				language: "zh-TW"
			});
		})
	}
	//form submit
	$('[data-id="submit"]').click(function () {
		$(this).siblings('input[type="submit"]').trigger('click');
	});

	//add
	$('.icon_delete').click(function () {
		console.log(111);
	});


	function fileUpload() {
		//Get count of selected files
		var imgPath = $(this)[0].value;
		var extn = imgPath.substring(imgPath.lastIndexOf('.') + 1).toLowerCase();
		var id = $(this).attr('id');
		var image_holder = $('label[for="' + id + '"] .image-holder');
		if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
			if (typeof (FileReader) != "undefined") {
				//loop for each file selected for uploaded.
				image_holder.empty();
				$(this).closest('.upload__item').removeClass('checked');
				image_holder.siblings().andSelf().hide();
				var reader = new FileReader();
				reader.onload = function (e) {
					$("<img />", {
						"src": e.target.result,
						"class": "thumb-image"
					}).appendTo(image_holder);
				}
				image_holder.fadeIn();
				reader.readAsDataURL($(this)[0].files[0]);
			} else {
				image_holder.prev('span').text(imgPath.split('\\').pop())
			}
		} else {
			alert("Pls select only images");
		}
	};

	$("body").on('change', '.fileUpload', fileUpload);

	//gotop
	$(window).scroll(function () {
		var scrollTop = $(this).scrollTop();
		if (scrollTop > 100) {
			$('.gotop').fadeIn();
		} else {
			$('.gotop').fadeOut();
		}
	}).trigger('scroll');

	$('.gotop').click(function () {
		$('body,html').animate({ 'scrollTop': 0 })
	});

	//ie hack
	function msieversion() {

		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		var ie11 = ua.indexOf("Trident");


		if (msie > 0 || ie11 > 0) {
			$('.fancyRadio').css('border-radius', '0');
			$('.btn').css('filter', 0);
			$('.loadingBall').hide();
			$('body').addClass('ie');
		}
		return false;
	}
	msieversion();

	//mobile/pc images resize event
	$(window).resize(function () {
		$('[data-img-mobile]').each(function () {
			var el = $(this),
				mobileSrc = $(this).data('img-mobile'),
				PCSrc = $(this).data('img-pc');
			if (Modernizr.mq('(min-width: 768px)')) {
				el.attr('src', PCSrc);
			} else {
				el.attr('src', mobileSrc);
			}
		})
	}).trigger('resize');

	//patchZero
	$('[data-id="patchZero"]').blur(function () {
		var val = $(this).val();
		if (val.length == 6) {
			$(this).val('0' + val);
		}
	});
});