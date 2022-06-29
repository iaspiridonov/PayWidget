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
            
            // Save bank name to session
            sessionStorage['bankName']  = bankName;
            sessionStorage['bankImage'] = bankImage;
            
            $bankImage.attr('src', sessionStorage['bankImage']);
            if ($bankImage.attr('src')) {
                $bankImage.show();
            }
            
            // Show next block
            $('.js-after-select-bank').show('fast');
            
            $('#js-display-two-bank-name').text('"'+ sessionStorage['bankName'] + '".');
        }
        
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
            sessionStorage['payAmount'] = 0;
        } else if (amount > 1500) {
            $('.js-error').html('Максимальная сумма пополнения — $1500<br>Пожалуйста, введите другую сумму');
            $('.js-display-two-submit').prop('disabled', true);
            sessionStorage['payAmount'] = 0;
        } else {
            $('.js-error').html('');
            $('.js-display-two-submit').prop('disabled', false);
            
            sessionStorage['payAmount'] = amount;
        }
        
        $('.js-pay-amount').text(sessionStorage['payAmount']);
    }
    
    $('.js-display-two-submit').click(function (e) { 
        e.preventDefault();
        
        $('.js-diplay-two-second-block').show('fast');
    });
    
    $('#go-to-three-display').click(function (e) {
        $bankImage.attr('src', sessionStorage['bankImage']);
        if ($bankImage.attr('src')) {
            $bankImage.show();
        } 
        
        timerDecrement();
    });
    
    
    $('#image-file').change(function(e) {
        file = $('#image-file')[0].files[0];
        if (file){
            $('.js-display-three-submit').prop('disabled', false);
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
});