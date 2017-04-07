$(function () {
    var clickdirection = false;
    var activImg = 'url("./img/left_activ.png")';
    var desactivImg = 'url("./img/left.png")';
    var sequence = new Array('.bl', '.bt', '.br', '.bb');
    var curentsequence = new Array();
    var curentBat = '';
    var muvearray = new Array({
        top: 210
        , left: 425
        , pos: 'c'
        , mov: [3]
    }, {
        top: 130
        , left: 420
        , pos: 'ct'
        , mov: [1]
    }, {
        top: 130
        , left: 250
        , pos: 'lt'
        , mov: [0, 1]
    }, {
        top: 190
        , left: 250
        , pos: 'lc'
        , mov: [0]
    }, {
        top: 250
        , left: 250
        , pos: 'lb'
        , mov: [0, 3]
    }, {
        top: 250
        , left: 570
        , pos: 'rb'
        , mov: [2, 3]
    }, {
        top: 190
        , left: 570
        , pos: 'rc'
        , mov: [2]
    }, {
        top: 130
        , left: 570
        , pos: 'rt'
        , mov: [1, 2]
    });

    function randomInteger(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    };

    function chengImg() {
        if (curentsequence.length > 2) {
            curentsequence.splice(0, 1);
        };
        if (curentsequence.length == 2 && curentsequence[0] == curentsequence[1] || curentsequence.length == 2 && Math.abs(curentsequence[0] - curentsequence[1]) == 2) {
            curentsequence.splice(0, 1);
        };
        for (i = 0; i < sequence.length; i++) {
            elem = $(sequence[i]);
            elem.css('background-image', desactivImg);
        };
        for (i = 0; i < curentsequence.length; i++) {
            elem = $(sequence[curentsequence[i]]);
            if (elem.css('background-image') == activImg) {
                elem.css('background-image', desactivImg);
            }
            else {
                elem.css('background-image', activImg);
            };
        };
    };

    function findpos() {
        curentsequence.sort();
        for (i = 0; i < muvearray.length; i++) {
            if (muvearray[i].mov.join(';') == curentsequence.join(';')) {
                return i;
            };
        };
    };

    function jampciper(ciperind) {
        var ciperind = ciperind;
        var ciperpos = muvearray[ciperind];
        var ciper = $('.ciper');
        ciper.addClass('ciper_' + ciperpos.pos);
        ciper.removeClass('ciper');
    };

    function kick() {
        var ciperind = randomInteger(0, muvearray.length - 1);
        var bolind = findpos();
        var ciperpos = muvearray[ciperind];
        var bolpos = muvearray[bolind];
        jampciper(ciperind);
        $('.nav').animate({
            top: bolpos.top
            , left: bolpos.left
        }, {
            duration: 500
            , progress: function (par1, par2, par3) {
                $('.nav').css('transform', 'rotate(' + (45 + par2 * 100) + 'deg) scale(' + (0.8 - 0.5 * par2) + ')');
            }
            , complete: function () {
                if (bolind == ciperind) {
                    alert('Чудовий сейв вашого суперника!');
                }
                else {
                    alert('Чудовий удар. Суперника не очікував такого!');
                };
                window.location.reload();
            }
        });
    };
    $('.nav').click(function () {
        if (!clickdirection) {
            kick();
            curentsequence = new Array();
            chengImg();
        }
        else {
            clickdirection = !clickdirection
        };
    });
    $('.bl').click(function () {
        clickdirection = true;
        if (curentBat != '.bl') {
            curentsequence.push(0);
            chengImg();
        };
    });
    $('.bt').click(function () {
        clickdirection = true;
        curentsequence.push(1);
        chengImg();
    });
    $('.br').click(function () {
        clickdirection = true;
        curentsequence.push(2);
        chengImg();
    });
    $('.bb').click(function () {
        clickdirection = true;
        curentsequence.push(3);
        chengImg();
    });
    $('.plase').keydown(function () {
        
        if (event.keyCode == 37) {
            clickdirection = true;
            curentsequence.push(0);
            chengImg();
        }
        else if (event.keyCode == 38) {
            clickdirection = true;
            curentsequence.push(1);
            chengImg();
        }
        else if (event.keyCode == 39) {
            clickdirection = true;
            curentsequence.push(2);
            chengImg();
        }
        else if (event.keyCode == 40) {
            clickdirection = true;
            curentsequence.push(3);
            chengImg();
        }
        else if (event.keyCode == 13) {
            if (!clickdirection) {
                kick();
                curentsequence = new Array();
                chengImg();
            }
            else {
                clickdirection = !clickdirection
            };
        };
    });
    $('.plase').focus();
    
});