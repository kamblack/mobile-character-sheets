$(function(){

    // Dice roller
    function roll(die, quantity){
        quantity = (quantity ? quantity : 1);
        var results = [];
        for (i=1;i<=quantity;i++) {
            results.push(Math.floor(Math.random() * Math.floor(die))+1);
        }
        return results;
    }

    // Accordions - toggle 'closed' class on and off
    $('.accordion').on('click', function(){ $(this).toggleClass('closed'); });

    // Roll it
    $('.roll button').on('click', function(){
        var mod = Number($(this).parents('tr').children('.mod').text());
        var die = Number(roll(20));
        var total = die+mod;
        $(this).html('<span class="die-roll">'+die+'</span>&nbsp;+ '+mod+' =&nbsp;<span class="roll-result">'+total+'</span>');
    });

});