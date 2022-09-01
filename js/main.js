$(document).ready(function () {
    $bankImage = $('.js-bank-name-img');
    
    $('.card--select').click(function (e) { 
        e.preventDefault();
        
        icoClass   = 'bi-check-circle';
        
        $('.card--select').find("."+icoClass).remove();
        $('.card--select').removeClass('js-active-bank');
        
        if (!$(this).hasClass('js-active-bank')) {
            bankName = $(this).attr('data-bank-name');
            bankImage = $(this).find('img').attr('src');
            
            $(this).addClass('js-active-bank');
            $(this).append("<i class='bi " + icoClass + "'></i>");
            $(this).parents('form').find('input[name=bank]').val(bankName);
            $(this).parents('form').find('#selected-bank').text(bankName);
            
            // Save bank name to cookie
            
            // Пример использования:
            setCookie('bankName', bankName);
            setCookie('bankImage', bankImage);
            
            $bankImage.attr('src', getCookie('bankImage'));
            if ($bankImage.attr('src')) {
                $bankImage.show();
            }
            
            // Show next block
            $('.js-after-select-bank').show('fast');
            
            $('#js-step-1 .js-disable').prop('disabled', false);
            $('#js-step-1 .js-disable').removeClass('js-disable');
            
            $('#js-display-two-bank-name').text('"'+ getCookie('bankName') + '".');
        }
        
    });
    
    $('.js-select-pay-amount').find('input').change(function (e) { 
        $('#js-rate-filed').val($(this).val());
    });
    
    $('#js-rate-filed').change(function(e) {
        disableSubmitOnDisplayTwo($(this).val());
    });
    
    $('#js-rate-filed').keyup(function (e) {
        disableSubmitOnDisplayTwo($(this).val());
    });
    
    $('input[name=rate]').change(function(e) {
        disableSubmitOnDisplayTwo($(this).val(), true);
    });
    
    
    function disableSubmitOnDisplayTwo(amount, isRadio) {
        if (!isRadio) {
            $('input[name=rate]').prop('checked', false);
        }
       
        if (amount < 90) {
            $('.js-error').html('Минимальная сумма пополнения — $90<br>Пожалуйста, введите другую сумму');
            $('.js-display-two-submit').prop('disabled', true);
            setCookie('payAmount', 0);
        } else if (amount > 1500) {
            $('.js-error').html('Максимальная сумма пополнения — $1500<br>Пожалуйста, введите другую сумму');
            $('.js-display-two-submit').prop('disabled', true);
            setCookie('payAmount', 0);
        } else {
            $('.js-error').html('');
            $('.js-display-two-submit').prop('disabled', false);
            
            setCookie('payAmount', amount);
        }
        
        $('.js-pay-amount').text(getCookie('payAmount'));
    }
    
    $('.js-display-two-submit').click(function (e) { 
        e.preventDefault();
        $(this).addClass('disable');
        $('.js-disable').addClass('disable');
        
        setTimeout(() => {
            $(this).text('Изменить сумму');
            $('.js-disable').removeClass('disable');
            $(this).removeClass('disable');
            $('.js-diplay-two-second-block').show('fast');
        }, 3000);
    });
    
    $('#go-to-three-display').click(function (e) {
        $bankImage.attr('src', getCookie('bankImage'));
        if ($bankImage.attr('src')) {
            $bankImage.show();
        } 
        
        timerDecrement();
    });
    
    
    $('#image-file').change(function(e) {
        file = $('#image-file')[0].files[0];
        if (file){
            console.log(file);
            
            $('.js-display-three-submit').prop('disabled', false);
            setCookie('receiptUrl', file);
        }  
    });
    
    $('.js-display-three-submit').click(function(e) {
        timerDecrement2();
    });
    
    
    const time       = $('#js-time');
    const $seconds   = $('#js-seconds-for-pay');
    const $minutes   = $('#js-minutes-for-pay');
    const secondsForPay = 300;
    
    time.text(secondsForPay);
    
    function timerDecrement() {
        setTimeout(function() {
            const newTime = time.text() - 1;
            
            if (newTime > 60) {
                minutes = Math.trunc(newTime / 60);
                seconds = newTime - minutes * 60;
            } else {
                minutes = 0;
                seconds = newTime;
            }
            
            time.text(newTime);
            setCookie('timer1', newTime);
            
            $seconds.text(seconds);
            $minutes.text(minutes);
            
            if(newTime > 0) timerDecrement();
            
        }, 1000);
    }
    
    // @TODO fix me
    const time2       = $('#js-time2');
    const $seconds2   = $('#js-seconds-for-pay2');
    const $minutes2   = $('#js-minutes-for-pay2');
    const secondsForPay2 = 600;
    
    time2.text(secondsForPay2);
    
    function timerDecrement2() {
        setTimeout(function() {
            const newTime2 = time2.text() - 1;
            
            if (newTime2 > 60) {
                minutes2 = Math.trunc(newTime2 / 60);
                seconds2 = newTime2 - minutes2 * 60;
            } else {
                minutes2 = 0;
                seconds2 = newTime2;
            }
            
            time2.text(newTime2);
            
            $seconds2.text(seconds2);
            $minutes2.text(minutes2);
            
            if(newTime2 > 0) timerDecrement2();
            
        }, 1000);
    }
    
    $('.js-read-message-from-admin').click(function(e) {
        e.preventDefault();
        
        if ($(this).hasClass('js-active')) {
            $(this).removeClass('js-active');
            $(this).parent().siblings('.js-message-from-admin').hide('fast');
            $(this).html('<i class="bi bi-search"></i> Читать');
        } else {
            $(this).addClass('js-active');
            $(this).parent().siblings('.js-message-from-admin').show('fast');
            $(this).html('<i class="bi bi-x-lg"></i> Скрыть');
        }
    });
    
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    
    function setCookie(name, value, options = {}) {

        options = {
            path: '/',
            ...options
        };
      
        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }
      
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      
        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
      
        document.cookie = updatedCookie;
    }
    
    function deleteCookie(name) {
        setCookie(name, "", {
          'max-age': -1
        })
    }
    
    function deleteAllCookies() {
        deleteCookie('bankImage');
        deleteCookie('bankbankNameImage');
        deleteCookie('payAmount');
        deleteCookie('timer1');
        deleteCookie('timer2');
        deleteCookie('receiptUrl');
        deleteCookie('step');
    }
    
    // Next functions need for cookie. You should delete All cookies after end work "pay widget"
    if (getCookie('bankImage')) {
        $bankImage.attr('src', getCookie('bankImage'));
        $bankImage.show();
        $('#js-display-two-bank-name').text('"'+ getCookie('bankName') + '".');
    }
    
    if (getCookie('bankName')) {
        $bankImage.attr('src', getCookie('bankImage'));
        $bankImage.show();
    }
    
    if (getCookie('payAmount')) {
        $('.js-pay-amount').text(getCookie('payAmount'));
        $('.js-display-two-submit').text('Изменить сумму');
        $('.js-diplay-two-second-block').show('fast');
        $('#js-rate-filed').val(getCookie('payAmount'));
        $('.js-display-two-submit').prop('disabled', false);
    }
    
    if (getCookie('timer1')) {
        time.text(getCookie('timer1'));
        if(getCookie('timer1') > 0) timerDecrement();
    }
    
    if (getCookie('timer2')) {
        time2.text(getCookie('timer2'));
        if(getCookie('timer2') > 0) timerDecrement2();
    }
    
    if (getCookie('receiptUrl')) {
        time2.text(getCookie('timer2'));
        file = $('#image-file')[0].files[0];
        
        if (file){
            $('.js-display-three-submit').prop('disabled', false);
            setCookie('receiptUrl', file);
            $('#image-file').val(file);
        }  
    }
    
    if (getCookie('step') && getCookie('step') != 1) {
        var myModal = new bootstrap.Modal(document.getElementById('js-step-' + getCookie('step')));
          
        myModal.show();
    }
});

var swiper = new Swiper(".mySwiper", {
    slidesPerView: "auto",
    freeMode: true,
    spaceBetween: 5,
    grabCursor: true
  });