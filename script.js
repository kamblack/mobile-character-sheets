$('.closed').next().slideUp(0);
$('.hp-edit').slideUp(0);

// if (typeof(Storage) !== "undefined") {
//     if (localStorage.characterData) {
//         characters = JSON.parse(localStorage.characterData);
//     }
// }

const sheet = new Vue({
    el: '#sheet',
    data: {
        allCharacters: characters,
        currentCharacter: 0
    },
    computed: {
        strMod: function(){ return Math.floor((this.allCharacters[this.currentCharacter].stats[0]-10)/2); },
        dexMod: function(){ return Math.floor((this.allCharacters[this.currentCharacter].stats[1]-10)/2); },
        conMod: function(){ return Math.floor((this.allCharacters[this.currentCharacter].stats[2]-10)/2); },
        intMod: function(){ return Math.floor((this.allCharacters[this.currentCharacter].stats[3]-10)/2); },
        wisMod: function(){ return Math.floor((this.allCharacters[this.currentCharacter].stats[4]-10)/2); },
        chaMod: function(){ return Math.floor((this.allCharacters[this.currentCharacter].stats[5]-10)/2); }
    },
    methods: {
        noscroll: function(e){ e.currentTarget.scrollTo(0,0); },
        accordion: function(e){ $(e.currentTarget).next().slideToggle(); },
        hpDown: function(){
            if (this.allCharacters[this.currentCharacter].hp.temp) { this.allCharacters[this.currentCharacter].hp.temp--; }
            else if (this.allCharacters[this.currentCharacter].hp.missingHp < this.allCharacters[this.currentCharacter].hp.max) {
                this.allCharacters[this.currentCharacter].hp.missingHp++;
            }
        },
        hpUp: function(){ if (this.allCharacters[this.currentCharacter].hp.missingHp > 0) { this.allCharacters[this.currentCharacter].hp.missingHp--; } },
        tempHpUp: function(){ this.allCharacters[this.currentCharacter].hp.temp++; },
        updateDeathSaves: function(){
            let successes = 0;
            let failures = 0;
            $('.successes input[type="checkbox"]').each(function(){
                if (this.checked){ successes++; }
            });
            $('.failures input[type="checkbox"]').each(function(){
                if (this.checked){ failures++; }
            });
            this.allCharacters[this.currentCharacter].deathSaves.successes = successes;
            this.allCharacters[this.currentCharacter].deathSaves.failures = failures;
        },
        getMod: function(stat, addProficiency){
            switch (stat.toLowerCase()) {
                case 'strength': return (addProficiency ? this.strMod + this.allCharacters[this.currentCharacter].profBonus : this.strMod); break;
                case 'dexterity': return (addProficiency ? this.dexMod + this.allCharacters[this.currentCharacter].profBonus : this.dexMod); break;
                case 'constitution': return (addProficiency ? this.conMod + this.allCharacters[this.currentCharacter].profBonus : this.conMod); break;
                case 'intelligence': return (addProficiency ? this.intMod + this.allCharacters[this.currentCharacter].profBonus : this.intMod); break;
                case 'wisdom': return (addProficiency ? this.wisMod + this.allCharacters[this.currentCharacter].profBonus : this.wisMod); break;
                case 'charisma': return (addProficiency ? this.chaMod + this.allCharacters[this.currentCharacter].profBonus : this.chaMod); break;

                case 'acrobatics': return (addProficiency ? this.dexMod + this.allCharacters[this.currentCharacter].profBonus : this.dexMod); break;
                case 'animalhandling': return (addProficiency ? this.wisMod + this.allCharacters[this.currentCharacter].profBonus : this.wisMod); break;
                case 'arcana': return (addProficiency ? this.intMod + this.allCharacters[this.currentCharacter].profBonus : this.intMod); break;
                case 'athletics': return (addProficiency ? this.strMod + this.allCharacters[this.currentCharacter].profBonus : this.strMod); break;
                case 'deception': return (addProficiency ? this.chaMod + this.allCharacters[this.currentCharacter].profBonus : this.chaMod); break;
                case 'history': return (addProficiency ? this.intMod + this.allCharacters[this.currentCharacter].profBonus : this.intMod); break;
                case 'insight': return (addProficiency ? this.wisMod + this.allCharacters[this.currentCharacter].profBonus : this.wisMod); break;
                case 'intimidation': return (addProficiency ? this.chaMod + this.allCharacters[this.currentCharacter].profBonus : this.chaMod); break;
                case 'investigation': return (addProficiency ? this.intMod + this.allCharacters[this.currentCharacter].profBonus : this.intMod); break;
                case 'medicine': return (addProficiency ? this.wisMod + this.allCharacters[this.currentCharacter].profBonus : this.wisMod); break;
                case 'nature': return (addProficiency ? this.intMod + this.allCharacters[this.currentCharacter].profBonus : this.intMod); break;
                case 'perception': return (addProficiency ? this.wisMod + this.allCharacters[this.currentCharacter].profBonus : this.wisMod); break;
                case 'performance': return (addProficiency ? this.chaMod + this.allCharacters[this.currentCharacter].profBonus : this.chaMod); break;
                case 'persuasion': return (addProficiency ? this.chaMod + this.allCharacters[this.currentCharacter].profBonus : this.chaMod); break;
                case 'religion': return (addProficiency ? this.intMod + this.allCharacters[this.currentCharacter].profBonus : this.intMod); break;
                case 'sleightofhand': return (addProficiency ? this.dexMod + this.allCharacters[this.currentCharacter].profBonus : this.dexMod); break;
                case 'stealth': return (addProficiency ? this.dexMod + this.allCharacters[this.currentCharacter].profBonus : this.dexMod); break;
                case 'survival': return (addProficiency ? this.wisMod + this.allCharacters[this.currentCharacter].profBonus : this.wisMod); break;
            }
        },
        isProficient: function(x){
            switch (x.toLowerCase()) {
                case 'strength': return this.allCharacters[this.currentCharacter].proficiencies.saves.str; break;
                case 'dexterity': return this.allCharacters[this.currentCharacter].proficiencies.saves.dex; break;
                case 'constitution': return this.allCharacters[this.currentCharacter].proficiencies.saves.con; break;
                case 'intelligence': return this.allCharacters[this.currentCharacter].proficiencies.saves.int; break;
                case 'wisdom': return this.allCharacters[this.currentCharacter].proficiencies.saves.wis; break;
                case 'charisma': return this.allCharacters[this.currentCharacter].proficiencies.saves.cha; break;

                case 'acrobatics': return this.allCharacters[this.currentCharacter].proficiencies.skills.acrobatics; break;
                case 'animalhandling': return this.allCharacters[this.currentCharacter].proficiencies.skills.animalHandling; break;
                case 'arcana': return this.allCharacters[this.currentCharacter].proficiencies.skills.arcana; break;
                case 'athletics': return this.allCharacters[this.currentCharacter].proficiencies.skills.athletics; break;
                case 'deception': return this.allCharacters[this.currentCharacter].proficiencies.skills.deception; break;
                case 'history': return this.allCharacters[this.currentCharacter].proficiencies.skills.history; break;
                case 'insight': return this.allCharacters[this.currentCharacter].proficiencies.skills.insight; break;
                case 'intimidation': return this.allCharacters[this.currentCharacter].proficiencies.skills.intimidation; break;
                case 'investigation': return this.allCharacters[this.currentCharacter].proficiencies.skills.investigation; break;
                case 'medicine': return this.allCharacters[this.currentCharacter].proficiencies.skills.medicine; break;
                case 'nature': return this.allCharacters[this.currentCharacter].proficiencies.skills.nature; break;
                case 'perception': return this.allCharacters[this.currentCharacter].proficiencies.skills.perception; break;
                case 'performance': return this.allCharacters[this.currentCharacter].proficiencies.skills.performance; break;
                case 'persuasion': return this.allCharacters[this.currentCharacter].proficiencies.skills.persuasion; break;
                case 'religion': return this.allCharacters[this.currentCharacter].proficiencies.skills.religion; break;
                case 'sleightofhand': return this.allCharacters[this.currentCharacter].proficiencies.skills.sleightOfHand; break;
                case 'stealth': return this.allCharacters[this.currentCharacter].proficiencies.skills.stealth; break;
                case 'survival': return this.allCharacters[this.currentCharacter].proficiencies.skills.survival; break;
            }
        }
    }//,
    // watch: {
    //     allCharacters: {
    //         handler: function(){
    //             if (typeof(Storage) !== "undefined") {
    //                 localStorage.setItem('characterData', JSON.stringify(this.allCharacters));
    //             }
    //         },
    //         deep: true
    //     }
    // }
});