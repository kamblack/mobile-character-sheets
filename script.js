$('.closed').next().slideUp(0);
$('.hp-edit, .attacks ul, .saves ul, .skills ul').slideUp(0);

const sheet = new Vue({
    el: '#sheet',
    data: characters[0],
    computed: {
        strMod: function(){ return Math.floor((this.stats[0].value-10)/2); },
        dexMod: function(){ return Math.floor((this.stats[1].value-10)/2); },
        conMod: function(){ return Math.floor((this.stats[2].value-10)/2); },
        intMod: function(){ return Math.floor((this.stats[3].value-10)/2); },
        wisMod: function(){ return Math.floor((this.stats[4].value-10)/2); },
        chaMod: function(){ return Math.floor((this.stats[5].value-10)/2); },
        maxHp: function(){ return this.overrideHitPoints ? this.overrideHitPoints : this.baseHitPoints+(this.conMod*this.totalLevels); },
        classList: function(){
            let classlist = '';
            for (i=0;i<this.classes.length;i++){
                classlist += (i < this.classes.length-1) ? this.classes[i].definition.name+' '+this.classes[i].level+'/' : this.classes[i].definition.name+' '+this.classes[i].level;
            }
            return classlist;
        },
        totalLevels: function(){
            let levels = 0;
            for (i=0;i<this.classes.length;i++){
                levels += this.classes[i].level;
            }
            return levels;
        }
    },
    methods: {
        accordion: function(e){
            $(e.currentTarget).next().slideToggle();
        }
    }
});


// function getMod(attr){ return (attr - 10)/2; }

// characters.forEach(function(character){
//     var perceptionProf = (character.prof.perception) ? character.profBonus : 0;
//     character.passivePerception = 10 + perceptionProf + getMod(character.attr.wis);

//     character.initiative = getMod(character.attr.dex);
//     character.attr.strMod = getMod(character.attr.str);
//     character.attr.dexMod = getMod(character.attr.dex);
//     character.attr.conMod = getMod(character.attr.con);
//     character.attr.intMod = getMod(character.attr.int);
//     character.attr.wisMod = getMod(character.attr.wis);
//     character.attr.chaMod = getMod(character.attr.cha);

//     character.attacks.forEach(function(attack){
//         var attr = getMod(character.attr[attack.attr]);
//         var attackProf = (attack.prof) ? character.profBonus : 0;
//         attack.toHit = attr + attackProf + attack.toHitAddition;
//         var allDmgAddition;
//         attack.dmgAddition.forEach(function(addition){
//             allDmgAddition += addition.mod;
//         });
//         attack.dmgMod = (attack.useAttrForDmg) ? '+'+(attr+allDmgAddition) : '+'+allDmgAddition;
//     });
// });

// Handlebars.registerHelper('select', function(value, options) {
//     var select = document.createElement('select');
//     $(select).html(options.fn(this));
//     select.value = value;
//     if (select.children[select.selectedIndex]) {
//         select.children[select.selectedIndex].setAttribute('selected', 'selected');
//     } else {
//         if (select.children[0]) {
//             select.children[0].setAttribute('selected', 'selected');
//         }
//     }
//     return select.innerHTML;
// });

// $(function(){

//     $('.closed').next().slideUp(0);
//     $('.hp-edit, .attacks ul, .saves ul, .skills ul').slideUp(0);

//     // HP Manager
//     var startingHpStringArray = $('.hp-value').text().split(' ');
//     var hp = {
//         current: Number(startingHpStringArray[0]),
//         temp: (startingHpStringArray[2] ? Number(startingHpStringArray[2]) : 0),
//         max: Number($('.hp-max').text().slice(3))
//     }
//     function adjustHp(mod, temp){
//         if (temp) {
//             if (hp.temp + mod >= 0) { hp.temp += mod; }
//             else { hp.temp = 0; }
//         }
//         else {
//             if (mod > 0) {
//                 if (hp.current + mod <= hp.max) { hp.current += mod; }
//                 else { hp.current = hp.max; }
//             }
//             if (mod < 0) {
//                 if (hp.temp) {
//                     if (hp.temp + mod >= 0) { hp.temp += mod; }
//                     else {
//                         var carryOver = hp.temp += mod;
//                         hp.temp = 0;
//                         adjustHp(carryOver);
//                     }
//                 }
//                 else {
//                     if (hp.current + mod >= 0) { hp.current += mod; }
//                     else { hp.current = 0; }
//                 }
//             }
//         }
//         var buttonHtml = (hp.temp ? hp.current+' + '+hp.temp+' / '+hp.max+'<small>Hit Points</small>' : hp.current+' / '+hp.max+'<small>Hit Points</small>');
//         var editHtml = (hp.temp ? 'Current HP:<br/><span class="hp-value">'+hp.current+' + '+hp.temp+' Temp</span><span class="hp-max"> / '+hp.max+'</span>' : 'Current HP:<br/><span class="hp-value">'+hp.current+'</span><span class="hp-max"> / '+hp.max+'</span>');
//         $('button.hp').html(buttonHtml);
//         $('.hp-ticker > span:nth-child(2)').html(editHtml);
//     }

//     // Dice roller
//     function roll(die, quantity){
//         quantity = (quantity ? quantity : 1);
//         var results = [];
//         for (i=1;i<=quantity;i++) {
//             results.push(Math.floor(Math.random() * Math.floor(die))+1);
//         }
//         return results;
//     }
//     // Roll button animation timer
//     var resetTimer;
//     function resetRoll(button){
//         resetTimer = window.setTimeout(function(){
//             if ($(button).hasClass('to-hit')) {
//                 $(button).removeClass('roll--active').html('To Hit');
//             } else if ($(button).hasClass('for-dmg')) {
//                 $(button).removeClass('roll--active').html('Damage');
//             } else {
//                 $(button).removeClass('roll--active').html('Roll');
//             }
//         }, 10000);
//     }
//     // Close all accordions
//     function closeAllAccordionsBut(element){
//         if ($(element).is('h1')) {
//             $('.closed').next().slideUp('fast');
//         } else {
//             $('.hp-edit').slideUp('fast');
//             $('.closed').not(element).next().slideUp('fast');
//         }
//     }

//     // Accordions
//     $('.sheet').on('click', '.accordion', function(){
//         closeAllAccordionsBut($(this));
//         $(this).next().slideToggle({ duration: 'fast', start: function(){
//             if ($(this).is(':visible'))
//                 $(this).css('display', 'grid');
//         }});
//     });

//     // All buttons
//     $('.sheet').on('click', 'button', function(e){
//         if (!$(this).hasClass('hp')) {
//             e.stopPropagation();
//             if ($(this).hasClass('up')) { adjustHp(1); }
//             if ($(this).hasClass('temp')) { adjustHp(1, true); }
//             if ($(this).hasClass('down')) { adjustHp(-1); }
//             if ($(this).hasClass('roll')) {
//                 if ($(this).hasClass('init')) {
//                     var mod = Number($(this).siblings('.mod').text());
//                     var die = Number(roll(20));
//                     var total = die+mod;
//                     $(this).html('<span class="die-roll">'+die+'</span>&nbsp;+ '+mod+' =&nbsp;<span class="roll-result">'+total+'</span>');
//                 } else {
//                     var mod = ($(this).hasClass('for-dmg')) ? Number($(this).siblings('.dmg').text().split(/[\+\-]+/)[1]) : Number($(this).siblings('.mod').text());
//                     var die = ($(this).hasClass('for-dmg')) ? Number(roll($(this).siblings('.dmg').text().split(/[\+\-]+/)[0].split('d')[1])) : Number(roll(20));
//                     var total = die+mod;
//                     $(this)
//                         .addClass('roll--active')
//                         .html('<span class="die-roll">'+die+'</span>&nbsp;+ '+mod+' =&nbsp;<span class="roll-result">'+total+'</span>');
//                     resetRoll($(this));
//                 }
//             }
//         }
//     });

// });