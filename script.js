$(function(){

    $('.closed').next().slideUp(0);
    $('.experience, .hp-edit').slideUp(0);

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
        if ($(element).is('h1')) {
            $('.hp-edit').slideUp('fast');
            $('.closed').next().slideUp('fast');
        } else if ($(element).is('button.hp')) {
            $('.experience').slideUp('fast');
            $('.closed').next().slideUp('fast');
        } else {
            $('.experience, .hp-edit').slideUp('fast');
            $('.closed').not(element).next().slideUp('fast');
        }
    }

    // Accordions
    $('.accordion').on('click', function(){
        closeAllAccordionsBut($(this));
        $(this).next().slideToggle('fast');
    });
    $('h1').on('click', function(){
        closeAllAccordionsBut($(this));
        $('.experience').slideToggle('fast');
    });
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