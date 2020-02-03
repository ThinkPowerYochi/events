$.extend({
    isEmpty: function (a_str) {
        return ($.trim(a_str) == "");
    },
    isEmail: function (a_str) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(a_str);
    },
    isChecked: function (a_elm) {
        return a_elm.prop("checked")
    },
    toggleDisable: function (a_elm, a_boolean) {
        if (a_boolean) {
            a_elm.prop("disabled", true);
            a_elm.addClass("disabled");
        } else {
            a_elm.prop("disabled", false);
            a_elm.removeClass("disabled");
        }
    },
    toggleError: function (a_elm, a_boolean) {
        var objName = "";
        objName = a_elm[0].name;
        if (a_boolean) {
            $("." + objName + "").show();
        } else {
            $("." + objName + "").hide();
        }
    }
});


this.CreditPrecalculationMobile = function () {
    //mobile form1
    var $form = $("#formHouseReturn");
    var errorMsg = "系統忙碌中，請稍後再試!";

    //發送簡訊認證碼
    var formSubmitBtn = $("#FormSubmit");

    //重新發出簡訊
    var restartBtn = $("#resendOTP");

    //確定試算
    var precalculation_define = $("#precalculation_define");

    //手機
    //var Mobile = $('input[name="Mobile"]', $form);
    var PhoneNumber = $('input[name="PhoneNumber"]');
    //年齡
    //var Age = $('select[name="Age"]', $form);
    var AgeYear = $('select[name="AgeYear"]');
    //職業
    //var Job = $('select[name="Job"]', $form);
    var Industry = $('select[name="Industry"]');
    //職業title
    //var JobTitle = $('select[name="JobTitle"]', $form);
    var JobTitle = $('select[name="JobTitle"]');
    //現職年收入
    //var AnnualIcome = $('select[name="AnnualIcome"]', $form);
    var income = $('select[name="income"]');
    //近三個月是否有使用循環信用或預借現金
    //var IsCashCredit = $('select[name="IsCashCredit"]', $form);
    var credit3M = $('select[name="credit3M"]');
    //近一個月信用卡循環、信用卡分期、信用卡預借現金總金額
    //var isCashCreditTotal = $('select[name="isCashCreditTotal"]', $form);
    var credit1M = $('select[name="credit1M"]');
    //目前信用貸款及現金卡總餘額
    //var CurrentlyCashCredit = $('select[name="CurrentlyCashCredit"]', $form);
    var loanBalance = $('select[name="loanBalance"]');

    //參數陣列化
    var checkEmpty = [PhoneNumber, AgeYear, Industry, JobTitle, income, credit3M, credit1M, loanBalance];

    //區塊隱藏
    $(".showOTPInputBlock").hide();

    $(function () {
        //刷新驗證碼
        refreshCaptcha($('#imgFormCaptcha'));
        $(".refresh").bind("click", function () {
            refreshCaptcha($('#imgFormCaptcha'));
        })
    });

    $(function () {
        //初始化
        $('.progressBar').progressBar({
            steps: ['填寫問卷', '取得驗証碼', '完成貸款'],
            active: 0
        });
        $('[data-fancyform-id="selectType"]').on('change', function () {
            var selectValue = $(this).find('option:selected').data('datas-value');
            var html = '<div class="divCol divCol--full tac mb15" data-id="amount">\
							第<input type="text" name="startInput&&" class="width--s" />個月 - 第<input type="text" name="endInput&&" class="width--s" />個月 <input type="text" name="rateInput&&" class="width--s" />%\
						</div>';
            var append = '';
            for (i = 0; i < selectValue; i++) {
                append += html.replace(/&&/g, i);
            }
            $('[data-id="selectContainer"]').html(append);
        }).trigger('change');
    });


    //刷新驗證碼
    function refreshCaptcha(obj) {
        var c_currentTime = new Date();
        var c_miliseconds = c_currentTime.getTime();

        obj.attr('src', '/CathayBK/Web/service/Captcha.ashx?r=' + c_miliseconds);
    }


    //按下發送簡訊驗證按鈕Form
    formSubmitBtn.on("click", function () {
        validateForm();
    })


    //驗證表單
    var validateForm = function () {

        var hasError = false;

        for (var i in checkEmpty) {
            if ($.isEmpty(checkEmpty[i].val())) {
                hasError = true;
                $.toggleError(checkEmpty[i], true);
            } else {
                $.toggleError(checkEmpty[i], false);
            }
        }
        //沒有失敗發送檢查驗證碼
        if (!hasError) {
            formSubmit();
        }
        return false;
    }
    $("#FormSubmit2").click(function(e){ 
        var phoneNumber = $('input[name="phoneNumber"]').val();
        if( phoneNumber != ""){
            $(".phoneNumber").removeClass("formError_input");
            $(".phoneNumber").children(".Mobile").hide();
        }else{
            $(".phoneNumber").addClass("formError_input");
            $(".phoneNumber").children(".Mobile").show();
        }

        var AgeYear = $('select[name="AgeYear"]').val();
        if( AgeYear != ""){
            $(".AgeYear").removeClass("formError_input");
            $(".AgeYear").children(".Age").hide();
        }else{
            $(".AgeYear").addClass("formError_input");
            $(".AgeYear").children(".Age").show();
        }

        var Industry = $('select[name="Industry"]').val();
        if( Industry != ""){
            $(".Industry").removeClass("formError_input");
            $(".Industry").children(".Industry").hide();
        }else{
            $(".Industry").addClass("formError_input");
            $(".Industry").children(".Industry").show();
        }

        var JobTitle = $('select[name="JobTitle"]').val();
        if( JobTitle != ""){
            $(".JobTitle").removeClass("formError_input");
            $(".JobTitle").children(".JobTitle").hide();
        }else{
            $(".JobTitle").addClass("formError_input");
            $(".JobTitle").children(".JobTitle").show();
        }

        var income = $('select[name="income"]').val();
        if( income != ""){
            $(".income").removeClass("formError_input");
            $(".income").children(".income").hide();
        }else{
            $(".income").addClass("formError_input");
            $(".income").children(".income").show();
        }

        var credit3M = $('select[name="credit3M"]').val();
        if( credit3M != ""){
            $(".credit3M").removeClass("formError_input");
            $(".credit3M").children(".credit3M").hide();
        }else{
            $(".credit3M").addClass("formError_input");
            $(".credit3M").children(".credit3M").show();
        }

        var credit1M = $('select[name="credit1M"]').val();
        if( credit1M != ""){
            $(".credit1M").removeClass("formError_input");
            $(".credit1M").children(".credit1M").hide();
        }else{
            $(".credit1M").addClass("formError_input");
            $(".credit1M").children(".credit1M").show();
        }

        var loanBalance = $('select[name="loanBalance"]').val();
        if( loanBalance != ""){
            $(".loanBalance").removeClass("formError_input");
            $(".loanBalance").children(".loanBalance").hide();
        }else{
            $(".loanBalance").addClass("formError_input");
            $(".loanBalance").children(".loanBalance").show();
        }
    })

    
  

    //Ajax 後端驗證碼+簡訊
    var formSubmit = function () {
        var data = {
            FormCaptcha: $("#FormCaptcha").val(),
            Mobile: $('input[name="Mobile"]').val()
        };

        var jsonData = "{data:" + JSON.stringify(data) + "}";
        $.ajax({
            type: "POST",
            url: "/CathayBK/Service/Loan/PrecalculationService.aspx/ValidateLoanCode",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            cache: false,
            data: jsonData,
            success: function (response) {
                var resp = json_parse(response.d);
                switch (resp.Code) {
                    case "0":
                        //$("select").parents(".select_style").removeClass("error");
                        //$("select").parents(".select_style").removeClass("error");
                        showDivBlock();
                        return true;
                        break;
                    case "900":
                        alert(resp.HtmlMsg);
                        return false;
                        break;
                    default:
                        alert(errorMsg + "(" + resp.Code + resp.HtmlMsg + ")");
                        return false;
                        break;
                }
            },
            error: function (err) {
                //alert(err.status + " - " + err.statusText);
            },
            complete: function () {
            }
        });
    }

    //簡訊發送成功隱藏區塊 鎖住欄位視窗
    var showDivBlock = function () {


        //第二步按下驗證碼
        $('.progressBar').progressBar({
            steps: ['填寫問卷', '取得驗証碼', '完成貸款'],
            active: 1
        });


        //選取disabled
        $(".select").addClass('disabled');
        //手機block
        $(".inputAttr").addClass('disabled');
        //發送簡訊驗證隱藏
        $(".SendOTPBlock").hide();
        //簡訊驗證show
        $(".showOTPInputBlock").show();

        //計秒數
        $(function () {
            var countDown = function () {
                var $el = $('#countDown'),
                    time = 600;
                var interval = setInterval(function () {
                    time--;
                    var min = parseInt(time / 60),
                        sec = time % 60;
                    min = min < 10 ? '0' + min.toString() : min.toString();
                    sec = sec < 10 ? '0' + sec.toString() : sec.toString();
                    $el.text(min + ':' + sec);
                    if (time <= 0) {
                        clearInterval(interval);
                    }
                }, 1000)
            };
            countDown();
        });
    }


    //重發簡訊
    restartBtn.on("click", function () {
        var data = {
         
            PhoneNumber: $("#phoneNumber").val(),
         
        };
        var jsonData = "{data:" + JSON.stringify(data) + "}";
        $.ajax({
            type: "POST",
            url: "/CathayBK/Service/Loan/PrecalculationService.aspx/ResendOTP",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            cache: false,
            data: jsonData,
            success: function (response) {
                var resp = json_parse(response.d);
                switch (resp.Code) {
                    case "0":
                        $("#PAC").text(resp.PAC);
                        time = resp.Time;
                        break;
                    case "1001"://opt上限                        
                    case "2001"://不秀訊息
                        $("#errLimit").show();
                        break
                    default:
                        alert(errorMsg + "(" + resp.Code + resp.HtmlMsg + ")");
                        return false;
                        break;
                }
            },
            error: function (err) {
            },
            complete: function () {
            }
        });
    })

    //確定試算
    precalculation_define.on("click", function () {
        var data = {
            PAC: $("#PAC").val(),
            OTPCode: $("#Code").val(),
            PhoneNumber: $("#phoneNumber").val(),
            AgeYear: $('select[name="AgeYear"]').val(),
            Industry: $('select[name="Industry"]').val(),
            Job: $('select[name="JobTitle"]').val(),
            Income: $('select[name="income"]').val(),
            Credit3M: $('select[name="credit3M"]').val(),
            Credit1M: $('select[name="credit1M"]').val(),
            TotalCash: $('select[name="loanBalance"]').val()
        };
        var jsonData = "{data:" + JSON.stringify(data) + "}";
        $.ajax({
            type: "POST",
            url: "/CathayBK/Service/Loan/PrecalculationService.aspx/ValidateOTP",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            async: false,
            cache: false,
            data: jsonData,
            success: function (response) {
                var resp = json_parse(response.d);
                switch (resp.RtnCode) {
                    case "0000":
                    case "E002":
                        window.location.href = resp.Url;
                        break;
                    default:
                        alert(errorMsg + "(" + resp.RtnCode + resp.RtnMsg + ")");
                        break;
                }
            },
            error: function (err) {
            },
            complete: function () {
            }
        });
    })


};

var CreditPrecalculationMobile = new CreditPrecalculationMobile();





         

