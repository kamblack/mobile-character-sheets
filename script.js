$(function(){

    $('.closed').next().slideUp(0);
    $('.character-edit, .hp-edit').slideUp(0);

    // HP Manager
    var startingHpStringArray = $('.hp-value').text().split(' ');
    var hp = {
        current: Number(startingHpStringArray[0]),
        temp: (startingHpStringArray[2] ? Number(startingHpStringArray[2]) : 0),
        max: Number($('.hp-max').text().slice(3))
    }
    function refreshHp(){
        var buttonHtml = (hp.temp ? hp.current+' + '+hp.temp+' / '+hp.max+'<small>Hit Points</small>' : hp.current+' / '+hp.max+'<small>Hit Points</small>');
        var editHtml = (hp.temp ? 'Current HP:<br/><span class="hp-value">'+hp.current+' + '+hp.temp+' Temp</span><span class="hp-max"> / '+hp.max+'</span>' : 'Current HP:<br/><span class="hp-value">'+hp.current+'</span><span class="hp-max"> / '+hp.max+'</span>');
        $('button.hp').html(buttonHtml);
        $('.hp-ticker > span:nth-child(2)').html(editHtml);
    }
    function hpUp(){
        if (hp.current < hp.max) {
            hp.current++;
            refreshHp();
        }
    }
    function tempHpUp(){
        if (hp.temp > 0) {
            hp.temp++;
        } else {
            hp.temp = 1;
        }
        refreshHp();
    }
    function hpDown(){
        if (hp.temp) {
            hp.temp--;
        } else {
            hp.current--;
        }
        refreshHp();
    }
    $('.button.up').on('click', hpUp);
    $('.button.temp').on('click', tempHpUp);
    $('.button.down').on('click', hpDown);

    // Dice roller
    function roll(die, quantity){
        quantity = (quantity ? quantity : 1);
        var results = [];
        for (i=1;i<=quantity;i++) {
            results.push(Math.floor(Math.random() * Math.floor(die))+1);
        }
        return results;
    }
    // Roll button animation timer
    var resetTimer;
    function resetRoll(button){
        resetTimer = window.setTimeout(function(){
        $(button)
            .removeClass('roll--active')
            .html('Roll');
        }, 10000);
    }
    // Close all accordions
    function closeAllAccordionsBut(element){
        /*if ($(element).is('h1')) {
            $('.hp-edit').slideUp('fast');
            $('.closed').next().slideUp('fast');
        } else*/ if ($(element).is('button.hp')) {
            $('.character-edit').slideUp('fast');
            $('.closed').next().slideUp('fast');
        } else {
            $('.character-edit, .hp-edit').slideUp('fast');
            $('.closed').not(element).next().slideUp('fast');
        }
    }

    // Accordions
    $('.accordion').on('click', function(){
        closeAllAccordionsBut($(this));
        $(this).next().slideToggle('fast');
    });
    // $('h1').on('click', function(){
    //     closeAllAccordionsBut($(this));
    //     $('.character-edit').slideToggle('fast');
    // });
    $('button.hp').on('click', function(e){
        e.stopPropagation();
        closeAllAccordionsBut($(this));
        $('.hp-edit').slideToggle('fast');
    });

    // Roll it
    $('section:not(.initiative) button.roll').on('click', function(e){
        e.stopPropagation();
        var mod = Number($(this).siblings('.mod').text());
        var die = Number(roll(20));
        var total = die+mod;
        $(this)
            .addClass('roll--active')
            .html('<span class="die-roll">'+die+'</span>&nbsp;+ '+mod+' =&nbsp;<span class="roll-result">'+total+'</span>');
        resetRoll($(this));
    });
    $('section.initiative button.roll').on('click', function(e){
        e.stopPropagation();
        var mod = Number($(this).siblings('.mod').text());
        var die = Number(roll(20));
        var total = die+mod;
        $(this).html('<span class="die-roll">'+die+'</span>&nbsp;+ '+mod+' =&nbsp;<span class="roll-result">'+total+'</span>');
    });

});