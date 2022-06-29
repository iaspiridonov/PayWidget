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
        } else if (amount > 1500) {
            $('.js-error').html('Максимальная сумма пополнения — $1500<br>Пожалуйста, введите другую сумму');
            $('.js-display-two-submit').prop('disabled', true);
        } else {
            $('.js-error').html('');
            $('.js-display-two-submit').prop('disabled', false);
        }
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
    });
    
    
    $('#image-file').change(function(e) {
        file = $('#image-file')[0].files[0];
        if (file){
            $('.js-display-three-submit').prop('disabled', false);
        }  
    });
    
    //  js-diplay-two-second-block
});