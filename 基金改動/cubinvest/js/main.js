// 燈箱
function openPopup(name) {
    var id = '#cubinvest-l-' + name;
    var startWindowScroll = 0;
    $.magnificPopup.open({
        items: {
            src: id
        },
        fixedContentPos: true,
        fixedBgPos: true,
        overflowY: 'auto',
        showCloseBtn: false,
        callbacks: {
            beforeOpen: function() {
                startWindowScroll = $(window).scrollTop();
            },
            open: function() {
                if ($('.mfp-content').height() < $(window).height()) {
                    $('body').on('touchmove', function(e) {
                        e.preventDefault();
                    });
                }
            },
            close: function() {
                $(window).scrollTop(startWindowScroll);
                $('body').off('touchmove');
            }
        }
    });
}

$('[data-popup-btn]').on('click', function(e) {
    e.preventDefault(e);
    var target = $(this).data('popupBtn'),
        name = target + 'Popup';
    openPopup(name);
})

var searchOffsetTop,
    menuHeight;
if (Modernizr.mq('(max-width: 959px)')) {
    menuHeight = 50;
} else {
    menuHeight = 44;
}
var searchSummary = $('[data-searchSummary]'),
    searchSummaryIsExist = searchSummary.length > 0;
if (searchSummaryIsExist) {
    searchOffsetTop = $('[data-searchSummary]').offset().top - menuHeight;
}
var searchPosition = function() {
    var winTop = $(document).scrollTop();
    if (winTop > searchOffsetTop && !searchSummary.hasClass('is-fixed')) {
        $('[data-searchSummary]').addClass('is-fixed');
        $(".search_gap").remove();
        $('[data-searchSummary]').after("<div class='search_gap' style='padding-top:60px;'></div>");
    } else if (winTop < searchOffsetTop && searchSummary.hasClass('is-fixed')) {
        $('[data-searchSummary]').removeClass('is-fixed');
        $(".search_gap").remove();
    }
}
// 搜尋結果卷軸滑動效果
function scrollPosition() {
    var $target = $('[data-scroll-target]'),
        isExists = $target.length > 0,
        targetTop;
    if (!isExists) {
        return
    }
    targetTop = $target.offset().top - 101
    $('html,body').animate({
        scrollTop: targetTop
    }, 300);
}

function shareBox() {
    $('[data-share-copy]').on('click', function(e) {
        e.preventDefault();
        $('[data-share-popup-text]').text('已複製');
        $('[data-share-popup]').fadeIn().fadeOut();
    })
}
$(function() {
    //loading
    $(window).on('load', function() {
        $('body').removeClass('is-loading');
    })

    // select 
    //下拉選單
    // repaint 重繪 DOM
    // $('select').transformSelect('repaint');

    // mobileChange 切換 option
    // $('select').transformSelect('mobileChange');

    $('[data-dropdown]').each(function(i, el) {
        var clsName = $(el).data('dropdown');
        $(el).transformSelect({
            dropDownClass: clsName
        });
    });

    $('[data-accordion-target]').on('click', function(e) {
        e.preventDefault();
        var id = $(this).data('accordion-target'),
            $main = $('[data-accordion-id="' + id + '"]');
        $main.toggleClass('is-open');
        $(this).toggleClass('cubinvest-o-iconLink--open cubinvest-o-iconLink--close');
        $(this).find('span').text($main.hasClass('is-open') ? '收合' : '展開');
    });

    $('.nav-tabs').scrollingTabs({
        enableSwiping: true,
        scrollToTabEdge: true,
        disableScrollArrowsOnFullyScrolled: true,
        leftArrowContent: '<div class="cubinvest-c-tab__control cubinvest-c-tab__control--left">' +
            '<a class="cubinvest-o-tabSlider cubinvest-o-tabSlider--left"></a>' +
            '</div>',
        rightArrowContent: '<div class="cubinvest-c-tab__control cubinvest-c-tab__control--right">' +
            '<a class="cubinvest-o-tabSlider cubinvest-o-tabSlider--right"></a>' +
            '</div>'
    });
    $('[data-tab-target]').on('click', function(e) {
        e.preventDefault();
        var id = $(this).data('tab-target'),
            $li = $(this).closest('li');
        $li.addClass('is-active').siblings().removeClass('is-active');
        $('[data-tab-id="' + id + '"]').addClass('is-active').siblings().removeClass('is-active');
    });

    // share
    $('[data-action="share"]').on('click', function(e) {
        e.preventDefault();
        $(this).closest('.cubinvest-c-shareBox').toggleClass('is-active');
    });

    // 投資須知及風險預告
    $('[data-switch-target="riskProvisions"]').on('click', function(e) {
        e.preventDefault();
        $('[ data-switch-content="riskProvisions"]').slideToggle();
        $(this).toggleClass('is-open');
        var text = $(this).children('span').text();
        $(this).children('span').text(
            text === "打開全文" ? "收合" : "打開全文");
    });

    $('[data-collapse-card]').on('click', function() {
        $(this).closest('.cubinvest-l-collapseCard').toggleClass('is-cardOpen').find($('[data-collapse-body]')).slideToggle();
    });
    // 預設打開第一個
    $('[data-collapse-card]').eq(0).trigger('click');
    $('[data-tableTh]').on('click', function() {
        var isActive = $(this).hasClass("is-active") || $(this).hasClass("is-reverseActive");
        if (isActive) {
            $(this).toggleClass('is-active is-reverseActive');
        } else {
            $(this).closest('.cubinvest-l-table__thead').find('[data-tableTh]').removeClass('is-active is-reverseActive');
            $(this).addClass('is-active');
        }
    })
    // 圖表tab
    $('[data-chartTab-target]').on('click', function(e) {
        e.preventDefault();
        var id = $(this).data('charttab-target'),
            $li = $(this).closest('li');
        $li.addClass('is-active').siblings().removeClass('is-active');
        $('[data-charttab-id="' + id + '"]').addClass('is-active').siblings().removeClass('is-active');
    });

    $(window).on('resize', function() {
        breadWidth();
    })
    // 麵包屑
    function breadWidth() {
        if (Modernizr.mq('(max-width: 959px)')) {
            var target = $('[data-breadBlock]');
            var totalWidth = 15;
            target.children('li').each(function() {
                totalWidth = totalWidth + $(this).width();
            });
            target.width(totalWidth);
        } else {
            $('[data-breadBlock]').width('auto');
        }
    }
    // 燈箱-關閉按鈕
    $('[data-popup-close]').on('click', function(e) {
        e.preventDefault();
        $.magnificPopup.close();
    })

    // 移除部分全局綁定的 uniform 套件
    $.uniform.restore('.cubinvest-l-main input[type="checkbox"]');
});