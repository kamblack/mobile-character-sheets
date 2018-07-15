var characters = [
  {
    name: 'Kriq',
    class: 'Ranger 4/Monk 1',
    stats: [ 12, 18, 13, 8, 16, 10 ],
    armorClass: 17,
    profBonus: 3,
    hp: {
      max: 38,
      temp: 0,
      missingHp: 0
    },
    speed: 25,
    deathSaves: {
      successes: 2,
      failures: 1
    },
    conditions: [],
    proficiencies: {
      skills: {
        acrobatics: false,
        animalHandling: false,
        arcana: false,
        athletics: true,
        deception: false,
        history: false,
        insight: false,
        intimidation: false,
        investigation: true,
        medicine: false,
        nature: true,
        perception: true,
        performance: false,
        persuasion: false,
        religion: false,
        sleightOfHand: false,
        stealth: false,
        survival: true
      },
      saves: {
        str: true,
        dex: true,
        con: false,
        int: false,
        wis: false,
        cha: false
      },
      others: [ 'Light Armor', 'Medium Armor', 'Shields', 'Martial Weapons', 'Simple Weapons', 'Dulcimer', 'Aarakocra', 'Auran', 'Celestial', 'Common', 'Draconic' ]
    },
    attacks: [
      {
        name: 'Longbow',
        range: '150 / 600',
        toHit: 7,
        damage: '1d8+4'
      },
      {
        name: 'Whip',
        range: '10',
        toHit: 7,
        damage: '1d4+6'
      },
      {
        name: 'Unarmed - Talons',
        range: '5',
        toHit: 7,
        damage: '1d4+4'
      }
    ],
    spellSlots: {
      level1: 3,
      level2: 0,
      level3: 0,
      level4: 0,
      level5: 0,
      level6: 0,
      level7: 0,
      level8: 0,
      level9: 0
    }
  }
];