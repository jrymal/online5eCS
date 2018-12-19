'use strict';

const ATTRIBUTES = deepFreeze({
    strength : {
        name: "Strength"
    },
    dexterity : {
        name: "Dexterity"
    },
    intelligence : {
        name: "Intelligence"
    },
    wisdom : {
        name : "Wisdom"
    },
    charisma : {
        name: "Charisma"
    },
    constitution : {
        name : "Constitution"
    }
});

const LEVEL = deepFreeze({
    1: {
        xp: 0,
        proficiencyBonus: 2
    },
    2: {
        xp: 300,
        proficiencyBonus: 2
    },
    3: {
        xp: 900,
        proficiencyBonus: 2
    },
    4: {
        xp: 2700,
        proficiencyBonus: 2
    },
    5: {
        xp: 6500,
        proficiencyBonus: 3
    },
    6: {
        xp: 14000,
        proficiencyBonus: 3
    },
    7: {
        xp: 23000,
        proficiencyBonus: 3
    },
    8: {
        xp: 34000,
        proficiencyBonus: 3
    },
    9: {
        xp: 48000,
        proficiencyBonus: 4
    },
    10: {
        xp: 64000,
        proficiencyBonus: 4
    },
    11: {
        xp: 85000,
        proficiencyBonus: 4
    },
    12: {
        xp: 100000,
        proficiencyBonus: 4
    },
    13: {
        xp: 120000,
        proficiencyBonus: 5
    },
    14: {
        xp: 140000,
        proficiencyBonus: 5
    },
    15: {
        xp: 165000,
        proficiencyBonus: 5
    },
    16: {
        xp: 195000,
        proficiencyBonus: 5
    },
    17: {
        xp: 225000,
        proficiencyBonus: 6
    },
    18: {
        xp: 265000,
        proficiencyBonus: 6
    },
    19: {
        xp: 305000,
        proficiencyBonus: 6
    },
    20: {
        xp: 355000,
        proficiencyBonus: 6
    },
});

const CLASSES = deepFreeze({
    Barbarian:{
        hitDie: "d12",
        primaryAbility: ["strength"],
        savingThrowProficiency: ["strength", "constitution"],
        proficiency: ["Light Armor", "Medium Armor", "Shields", "Simple Weapons", "Martial Weapons"],
        skills:{
            choose: 2,
            from: ["animalhandling","athletics","intimidation","nature","perception","survival"]
        },
        equipment: [
            ["great axe", "martial melee weapon"],
            [ { name : "hand axe", count: 2}, "simple melee weapon"],
            "explorer's pack",
            { name : "javelin", count: 4}
        ],
        level: {
            1: {
                features: ["Rage", "Unarmored Defence"],
                special: {
                    "Rages" : 2,
                    "Rage Damage" : 2
                }
            }, 
            2: {
                features: ["Reckless Attack", "Danger Sense"],
            },
            3: {
                features: ["Primal Path"],
                special: {
                    "Rages" : 1
                }
            },
            4: {
                abilityScore: 1 
            }, 
            5: {
                features: ["Extra Attack", "Fast Movement"],
            },
            6: {
                features: ["Path Feature"],
                special: {
                    "Rages" : 1
                }
            }, 
            7: {
                features: ["Feral Instinct"],
            }, 
            8: {
                abilityScore: 1 
            }, 
            9: {
                features: ["Brutal Critical(1 Die)"],
                special: {
                    "Rage Damage" : 1
                }
            }, 
            10: {
                features: ["Path Feature"],
            }, 
            11: {
                features: ["Relentless"],
            }, 
            12: {
                abilityScore: 1, 
                special: {
                    "Rages" : 1
                }
            }, 
            13: {
                features: ["Brutal Critical(2 Dice)"],
            }, 
            14: {
                features: ["Path Feature"],
            }, 
            15: {
                features: ["Persistent Rage"],
            }, 
            16: {
                abilityScore: 1, 
                special: {
                    "Rage Damage" : 1
                }
            }, 
            17: {
                features: ["Brutal Critical(3 Dice)"],
                special: {
                    "Rages" : 1
                }
            }, 
            18: {
                features: ["Indominable Might"],
            }, 
            19: {
                abilityScore: 1 
            },   
            20: {
                features: ["Primal Champion"],
                special: {
                    "Rages" : "unlimited"
                }
            }
        }
    },
    Bard:{
        hitDie: "d8",
        primaryAbility: ["charisma"],
        savingThrowProficiency: ["dexterity", "charisma"],
        proficiency: ["Light Armor", "Simple Weapons", "Hand Crossbows", "Longswords", "Rapiers", "Shortswords"],
        skills:{
            choose: 3,
        },
        equipment: [
            ["rapier", "long sword", "simple weapon"],
            ["diplomat's pack","entertainer's pack"],
            ["lute", "musical instrument"],
            "leather armor",
            "dagger"
        ],
        specialName: "Rage",
        level: {
            1: {
                features: ["Inspiration (d6)"],
                spells: {
                    type: "bard",
                    total : 4,
                    0 : 2,
                    1 : 2
                }
            }, 
            2: {
                features: ["Jack of All Trades", "Song of Rest (d6)"],
                spells: {
                    total : 1,
                    1 : 1
                }
            },
            3: {
                features: ["Bard College", "Expertise"],
                spells: {
                    total : 1,
                    1 : 1,
                    2 : 2
                }
            },
            4: {
                abilityScore: 1, 
                spells: {
                    total : 1, 
                    0 : 1,
                    2 : 1
                }
            }, 
            5: {
                features: ["Bardic Inspiration (d8)","Font of Inspiration" ],
                spells: {
                    total : 1, 
                    3 : 2
                }
            },
            6: {
                features: ["Countercharm", "Bard CollegeFeature"],
                spells: {
                    total : 1, 
                    3 : 1
                }
            }, 
            7: {
                spells: {
                    total : 1, 
                    4 : 1
                }
            }, 
            8: {
                abilityScore: 1, 
                spells: {
                    total : 1, 
                    4 : 1
                }
            }, 
            9: {
                features: ["Song of rest (d8)"],
                spells: {
                    total : 1, 
                    4 : 1,
                    5 : 1
                }
            }, 
            10: {
                features: ["Bardic inspiration (d10)", "iExpertiese", "Magical Secrets"],
                spells: {
                    total : 2, 
                    0 : 1,
                    5 : 1
                }
            }, 
            11: {
                spells: {
                    total : 1, 
                    6 : 1
                }
            }, 
            12: {
                abilityScore: 1, 
            }, 
            13: {
                features: ["Song of Rest (d10)"],
                spells: {
                    total : 1, 
                    7 : 1
                }
            }, 
            14: {
                features: ["Magical Secrets","Bard College Feature"],
                spells: {
                    total : 2, 
                    7 : 1
                }
            }, 
            15: {
                features: ["Bardic Inspiration (d12)"],
                spells: {
                    total : 1, 
                    8 : 1
                }
            }, 
            16: {
                abilityScore: 1 
            }, 
            17: {
                features: ["Song od Rest (d12)"],
                spells: {
                    total : 1, 
                    9 : 1
                }
            }, 
            18: {
                features: ["Magical Secrets"],
                spells: {
                    total : 2, 
                    5 : 1
                }
            }, 
            19: {
                abilityScore: 1, 
                spells: {
                    6 : 1
                }
            },   
            20: {
                features: ["Superior Inspiration"],
                spells: {
                    7 : 1
                }
            }
        }
    },
    Cleric:{
        hitDie: "d8",
        primaryAbility: ["wisdom"],
        savingThrowProficiency: ["wisdom", "charisma"],
        proficiency: ["Light Armor", "Medium Armor", "Shields", "Simple Weapons"],
        skills:{
            choose: 2,
            from:["history", "insight", "medicine", "persuasion", "religion"]
        },
        equipment:[
            ["mace", "warhammer"], 
            ["scale mail", "leather armor", "chain mail"], 
            ["light crossbow", "simple melee weapon"],
            ["priest's pack", "explorer's pack"],
            "shield",
            "holy symbol"
        ],
        level: {
            1: {
                features:["Divine Domain"],
                spells:{
                    type: "cleric",
                    total: 5,
                    0: 3,
                    1: 2
                }
            },
            2: {
                features:["Channel Divinity (1/rest)", "Divine Domain feature"],
                spells:{
                    total: 1,
                    1: 1
                }
            },
            3: {
                features:["Channel Divinity (1/rest)", "Divine Domain feature"],
                spells:{
                    total: 1,
                    1: 1,
                    2: 2
                }
            },
            4: {
                abilityScore: 1, 
                spells:{
                    total: 1,
                    0: 1,
                    2: 1
                }
            }, 
            5: {
                features: ["Destroy Undead (CR 1/2)"],
                spells: {
                    total : 1, 
                    3 : 2
                }
            },
            6: {
                features: ["Channel Divinity (2/rest)", "Divine Domain feature"],
                spells: {
                    total : 1, 
                    3 : 1
                }
            }, 
            7: {
                spells: {
                    total : 1, 
                    4 : 1
                }
            }, 
            8: {
                abilityScore: 1, 
                features:["Destroy Undead (CR 1)", "Divine Domain feature"],
                spells: {
                    total : 1, 
                    4 : 1
                }
            }, 
            9: {
                features: ["Song of rest (d8)"],
                spells: {
                    total : 1, 
                    4 : 1,
                    5 : 1
                }
            }, 
            10: {
                features: ["Divine Intervention"],
                spells: {
                    total : 2, 
                    0 : 1,
                    5 : 1
                }
            }, 
            11: {
                features: ["Destroy Undead (CR 2)"],
                spells: {
                    total : 1, 
                    6 : 1
                }
            }, 
            12: {
                abilityScore: 1, 
            }, 
            13: {
                features: ["Song of Rest (d10)"],
                spells: {
                    total : 1, 
                    7 : 1
                }
            }, 
            14: {
                features: ["Destroy Undead (CR 3)"],
                spells: {
                    total : 2, 
                    7 : 1
                }
            }, 
            15: {
                spells: {
                    total : 1, 
                    8 : 1
                }
            }, 
            16: {
                abilityScore: 1 
            }, 
            17: {
                features: ["Destroy Undead (CR 4)", "Divine Domain feature"],
                spells: {
                    total : 1, 
                    9 : 1
                }
            }, 
            18: {
                features: ["Channel Divinity (3/rest)"],
                spells: {
                    total : 2, 
                    5 : 1
                }
            }, 
            19: {
                abilityScore: 1, 
                spells: {
                    6 : 1
                }
            },   
            20: {
                features: ["Divine Intervention Improvement"],
                spells: {
                    7 : 1
                }
 
            }
        } 
    },
    Druid:{
        hitDie: "d8",
        primaryAbility: ["wisdom"],
        savingThrowProficiency: ["wisdom", "intelligence"],
        proficiency: ["Light Armor (Non-metal)", "Medium Armor (Non-metal)", "Shields (Non-metal)", "Clubs", "Daggers", "Darts", "Javelins", "Maces", "Quarterstaffs", "Scimitars","Sickles", "Slings", "Spears"],
        level: {
            1: {
                features: ["Druidic", "Spellcasting"],
                spells:{
                    type: "druid",
                    total: 4,
                    0: 2,
                    1: 2
                }
            },
            2: {
                features:["Wild Shape", "Druid Circle"],
                spells:{
                    total:1,
                    1: 1
                }
            },
            3: {
                spells:{
                    total: 1,
                    1: 1,
                    2: 2
                }
            },
            4: {
                abilityScore: 1, 
                features:["Wild Shape Improvement"],
                spells:{
                    total: 1,
                    0: 1,
                    2: 1
                }
            },
            5: {
                spells: {
                    total : 1, 
                    3 : 2
                }
            },
            6: {
                features: ["Druid Circle feature"],
                spells: {
                    total : 1, 
                    3 : 1
                }
            }, 
            7: {
                spells: {
                    total : 1, 
                    4 : 1
                }
            }, 
            8: {
                abilityScore: 1, 
                features:["Wild Shape Improvement"],
                spells: {
                    total : 1, 
                    4 : 1
                }
            }, 
            9: {
                spells: {
                    total : 1, 
                    4 : 1,
                    5 : 1
                }
            }, 
            10: {
                features: ["Druid Circle feature"],
                spells: {
                    total : 2, 
                    0 : 1,
                    5 : 1
                }
            }, 
            11: {
                spells: {
                    total : 1, 
                    6 : 1
                }
            }, 
            12: {
                abilityScore: 1, 
            }, 
            13: {
                spells: {
                    total : 1, 
                    7 : 1
                }
            }, 
            14: {
                features: ["Druid Circle feature"],
                spells: {
                    total : 2, 
                    7 : 1
                }
            }, 
            15: {
                spells: {
                    total : 1, 
                    8 : 1
                }
            }, 
            16: {
                abilityScore: 1 
            }, 
            17: {
                spells: {
                    total : 1, 
                    9 : 1
                }
            }, 
            18: {
                features: ["Timeless Body", "Beast Spells"],
                spells: {
                    total : 2, 
                    5 : 1
                }
            }, 
            19: {
                abilityScore: 1, 
                spells: {
                    6 : 1
                }
            },   
            20: {
                features: ["Archdruid"],
                spells: {
                    7 : 1
                }
 
            }
        }
    },
    Fighter:{
        hitDie: "d10",
        primaryAbilityJoin: "or",
        primaryAbility: ["strength", "dexterity"],
        savingThrowProficiency: ["strength", "constitution"],
        proficiency: ["Light Armor", "Medium Armor", "Heavy Armor", "Shields", "Simple Weapons", "Martial Weapons"],
        level: {
            1: {
                features: ["Fighting Style", "Second Wind"],
            },
            2: {
                features: ["Action Surge (1x)"]
            },
            3: {
                features: ["Martial Archetype"]
            },
            4: {
                abilityScore: 1, 
            },
            5: {
                features: ["Extra Attack (x1)"]
            },
            6: {
                abilityScore: 1, 
            }, 
            7: {
                features: ["Martial Archetype Feature"]
            }, 
            8: {
                abilityScore: 1, 
            }, 
            9: {
                features: ["Indomitable (x1)"],
            }, 
            10: {
                features: ["Martial Archetype Feature"],
            }, 
            11: {
                features: ["Extra Attack (x2)"],
            }, 
            12: {
                abilityScore: 1, 
            }, 
            13: {
                features: ["Indomitable (x2)"]
            }, 
            14: {
                abilityScore: 1 
            }, 
            15: {
                features: ["Martial Archetype Feature"],
            }, 
            16: {
                abilityScore: 1 
            }, 
            17: {
                features: ["Action Surge (x2)","Indominable (x3)"],
            }, 
            18: {
                features: ["Martial Archetype Improvement"],
            }, 
            19: {
                abilityScore: 1, 
            },   
            20: {
                features: ["Extra Attack (x3)"],
            }
        }
    },
    Monk:{
        hitDie: "d8",
        primaryAbilityJoin: "and",
        primaryAbility: ["dexterity", "wisdom"],
        savingThrowProficiency: ["dexterity", "strength"],
        proficiency: ["Simple Weapons", "Shortswords"],
        level: {
            1: {
                features: ["Unarmored Defense", "Martial Arts"],
                special : {
                    "Martial Arts": "1d4"
                }
            },
            2: {
                features: ["Ki", "Unarmored Movement"],
                special : {
                    "Ki Points": "2",
                    "Unarmored Movement": "+10 ft."
                }
            },
            3: {
                features: ["Monastic Tradition", "Deflect Missiles"],
                special : {
                    "Ki Points": "3",
                }
            },
            4: {
                abilityScore: 1, 
                features: ["Slow Fall"],
                special : {
                    "Ki Points": "4",
                }
            },
            5: {
                features: ["Extra Attack", "Stunning Strike"],
                special : {
                    "Ki Points": "5",
                    "Martial Arts": "1d6"
                }
            },
            6: {
                features: ["Ki-Empowered Strikes", "Monastic Tradition feature"],
                special : {
                    "Ki Points": "6",
                    "Unarmored Movement": "+15 ft."
                }
            }, 
            7: {
                features: ["Evasion", "Stillness of Mind"],
                special : {
                    "Ki Points": "7",
                }
            }, 
            8: {
                abilityScore: 1, 
                special : {
                    "Ki Points": "8",
                }
            }, 
            9: {
                features: ["Unarmored Movement improvement"],
                special : {
                    "Ki Points": "9",
                }
            }, 
            10: {
                features: ["Purity of Body"],
                special : {
                    "Ki Points": "10",
                    "Unarmored Movement": "+20 ft."
                }
            }, 
            11: {
                features: ["Monastic Tradition feature"],
                special : {
                    "Ki Points": "11",
                    "Martial Arts": "1d8"
                }
            }, 
            12: {
                abilityScore: 1, 
                special : {
                    "Ki Points": "12",
                }
            }, 
            13: {
                features: ["Tongue of the Sun and Moon"],
                special : {
                    "Ki Points": "13",
                }
            }, 
            14: {
                features: ["Diamond Soul"],
                special : {
                    "Ki Points": "14",
                    "Unarmored Movement": "+25 ft."
                }
            }, 
            15: {
                features: ["Timeless Body"],
                special : {
                    "Ki Points": "15",
                }
            }, 
            16: {
                special : {
                    "Ki Points": "16",
                },
                abilityScore: 1 
            }, 
            17: {
                special : {
                    "Ki Points": "17",
                    "Martial Arts": "1d10"
                },
                features: ["Monastic Tradition feature"],
            }, 
            18: {
                special : {
                    "Ki Points": "18",
                    "Unarmored Movement": "+30 ft."
                },
                features: ["Empty Body"],
            }, 
            19: {
                special : {
                    "Ki Points": "19",
                },
                abilityScore: 1, 
            },   
            20: {
                special : {
                    "Ki Points": "20",
                },
                features: ["Perfect Self"],
            }
        }
    },
    Paladin:{
        hitDie: "d10",
        primaryAbilityJoin: "and",
        primaryAbility: ["strength","charisma"],
        savingThrowProficiency: ["wisdom", "charisma"],
        proficiency: ["Light Armor", "Medium Armor", "Heavy Armor", "Shields", "Simple Weapons", "Martial Weapons"],
        level: {
            1: {
                features: ["Divine Sense", "Lay on Hands"],
            },
            2: {
                features:["Fighting Style", "Divine Smite"],
                spells:{
                    type: "paladin",
                    1: 2
                }
            },
            3: {
                features:["Divine Health", "Sacred Oath"],
                spells:{
                    total: 1,
                    1: 1,
                }
            },
            4: {
                abilityScore: 1, 
                spells:{
                    total: 1,
                }
            },
            5: {
                features:["Extra Attack"],
                spells: {
                    total : 1, 
                    1 : 1,
                    2 : 2,
                }
            },
            6: {
                features: ["Aura of Protection"],
                spells: {
                    total : 1, 
                }
            }, 
            7: {
                features: ["Sacred Oath feature"],
                spells: {
                    total : 1, 
                    2 : 1
                }
            }, 
            8: {
                abilityScore: 1, 
            }, 
            9: {
                spells: {
                    total : 1, 
                    3 : 2,
                }
            }, 
            10: {
                features: ["Aura of Courage"],
                spells: {
                    total : 1, 
                }
            }, 
            11: {
                features: ["Improved Divine Smite"],
                spells: {
                    total : 1, 
                    3 : 1
                }
            }, 
            12: {
                abilityScore: 1, 
            }, 
            13: {
                spells: {
                    total : 1, 
                    4 : 1
                }
            }, 
            14: {
                features: ["Cleansing Touch"],
                spells: {
                    total : 1, 
                }
            }, 
            15: {
                features: ["Sacred Oath feature"],
                spells: {
                    total : 1, 
                    4 : 1
                }
            }, 
            16: {
                abilityScore: 1 
            }, 
            17: {
                spells: {
                    total : 1, 
                    5 : 1
                }
            }, 
            18: {
                features: ["Aura improvements"],
                spells: {
                    total : 1, 
                }
            }, 
            19: {
                abilityScore: 1, 
                spells: {
                    5 : 1
                }
            },   
            20: {
                features: ["Sacred Oath feature"],
            }
        }
    },
    Ranger:{
        hitDie: "d10",
        primaryAbilityJoin: "and",
        primaryAbility: ["dexterity", "wisdom"],
        savingThrowProficiency: ["dexterity", "strength"],
        proficiency: ["Light Armor", "Medium Armor", "Shields", "Simple Weapons", "Martial Weapons"],
        level: {
            1:{
                features: ["Favored Enemy", "Natural Explorer"],
            },
            2:{
                features: ["Fighting Style"],
                spells:{
                    type: "ranger",
                    total: 2,
                    1: 2
                }
            },
            3:{
                features: ["Ranger Archetype", "Primeval Awareness"],
                spells:{
                    total: 1,
                    1: 1
                }
            },
            4:{
                abilityScore: 1,
            },
            5:{
                features: ["Extra Attack"],
                spells:{
                    total: 1,
                    1: 1,
                    2: 2,
                }
            },
            6:{
                features: ["Favored Enemy Improvements", "Natural Explorer Improvements"],
            },
            7:{
                features: ["Ranger Archetype feature"],
                spells:{
                    total: 1,
                    1: 1,
                    2: 2,
                }
            },
            8:{
                abilityScore: 1,
                features: ["Land's Stride"],
            },
            9:{
                spells:{
                    total: 1,
                    3: 2,
                }
            },
            10:{
                features: ["Natural Explorer improvement", "Hide in Plain Sight"],
            },
            11:{
                features: ["Ranger Archetype feature"],
                spells:{
                    total: 1,
                    3: 1,
                }
            },
            12:{
                abilityScore: 1,
            },
            13:{
                spells:{
                    total: 1,
                    4: 1,
                }
            },
            14:{
                features: ["Favored enemy improvement", "Vanish"],
            },
            15:{
                features: ["Ranger Archetype feature"],
                spells:{
                    total: 1,
                    4: 1,
                }
            },
            16:{
                abilityScore: 1,
            },
            17:{
                spells:{
                    total: 1,
                    4: 1,
                    5: 1,
                }
            },
            18:{
                features: ["Feral Senses"],
            },
            19:{
                abilityScore: 1,
                spells:{
                    total: 1,
                    5: 1,
                }
            },
            20:{
                features: ["Foe Slayer"],
            }
        }
    },
    Rogue:{
        hitDie: "d8",
        primaryAbility: ["dexterity"],
        savingThrowProficiency: ["dexterity", "intelligence"],
        proficiency: ["Light Armor", "Simple Weapons", "Hand Crossbows", "Longswords", "Rapiers", "Shortswords"],
        level: {
            1:{
                features: ["Expertise", "Sneak Attack", "Thieves' Cant"],
                special:{
                    "Sneak Attack": "1d6"
                }
            },
            2:{
                features: ["Cunning Action"],
            },
            3:{
                features: ["Roguish Archetype"],
                special:{
                    "Sneak Attack": "2d6"
                }
            },
            4:{
                abilityScore: 1, 
            },
            5:{
                features: ["Uncanny Dodge"],
                special:{
                    "Sneak Attack": "3d6"
                }
            },
            6:{
                features: ["Expertise"],
            },
            7:{
                features: ["Evasion"],
                special:{
                    "Sneak Attack": "4d6"
                }
            },
            8:{
                abilityScore: 1, 
            },
            9:{
                features: ["Roguish Archetype Feature"],
                special:{
                    "Sneak Attack": "5d6"
                }
            },
            10:{
                abilityScore: 1, 
            },
            11:{
                features: ["Reliable Talent"],
                special:{
                    "Sneak Attack": "6d6"
                }
            },
            12:{
                abilityScore: 1, 
            },
            13:{
                features: ["Roguish Archetype Feature"],
                special:{
                    "Sneak Attack": "7d6"
                }
            },
            14:{
                features: ["Blindsense"],
            },
            15:{
                features: ["Slippery Mind"],
                special:{
                    "Sneak Attack": "8d6"
                }
            },
            16:{
                abilityScore: 1, 
            },
            17:{
                features: ["Roguish Archetype Feature"],
                special:{
                    "Sneak Attack": "9d6"
                }
            },
            18:{
                features: ["Elusive"],
            },
            19:{
                abilityScore: 1, 
                special:{
                    "Sneak Attack": "10d6"
                }
            },
            20:{
                features: ["Stroke of Luck"],
            }
        }
    },
    Sorcerer:{
        hitDie: "d6",
        primaryAbility: ["charisma"],
        savingThrowProficiency: ["constitution", "charisma"],
        proficiency: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"],
        level: {
            1:{
                features: ["Sorcerous Origin"],
                spells:{
                    type: "sourcerer",
                    total: 2,
                    0: 4,
                    1: 2
                }
            },
            2:{
                features: ["Font of Magic"],
                spells:{
                    total: 1,
                    1: 1
                },
                special:{
                    "Sorcery Points" : 2
                }
            },
            3:{
                features: ["Metamagic"],
                spells:{
                    total: 1,
                    1: 1,
                    2: 2
                },
                special:{
                    "Sorcery Points" : 3
                }
            },
            4:{
                abilityScore: 1, 
                spells:{
                    total: 1,
                    0: 1,
                    2: 1
                },
                special:{
                    "Sorcery Points" : 4
                }
            },
            5:{
                spells:{
                    total: 1,
                    3: 2
                },
                special:{
                    "Sorcery Points" : 5
                }
            },
            6:{
                features: ["Sorcerous Origin feature"],
                spells:{
                    total: 1,
                    3: 1
                },
                special:{
                    "Sorcery Points" : 6
                }
            },
            7:{
                spells:{
                    total: 1,
                    4: 1
                },
                special:{
                    "Sorcery Points" : 7
                }
            },
            8:{
                abilityScore: 1,
                spells:{
                    total: 1,
                    4: 1
                },
                special:{
                    "Sorcery Points" : 8
                }
            },
            9:{
                spells:{
                    total: 1,
                    4: 1,
                    5: 1
                },
                special:{
                    "Sorcery Points" : 9
                }
            },
            10:{
                features: ["Metamagic"],
                spells:{
                    total: 1,
                    0: 1,
                    5: 1
                },
                special:{
                    "Sorcery Points" : 10
                }
            },
            11:{
                spells:{
                    total: 1,
                    6: 1
                },
                special:{
                    "Sorcery Points" : 11
                }
            },
            12:{
                abilityScore: 1, 
                special:{
                    "Sorcery Points" : 12
                }
            },
            13:{
                spells:{
                    total: 1,
                    7: 1
                },
                special:{
                    "Sorcery Points" : 13
                }
            },
            14:{
                features: ["Sorcerous Origin feature"],
                special:{
                    "Sorcery Points" : 14
                }
            },
            15:{
                spells:{
                    total: 1,
                    8: 1
                },
                special:{
                    "Sorcery Points" : 15
                }
            },
            16:{
                abilityScore: 1, 
                special:{
                    "Sorcery Points" : 16
                }
            },
            17:{
                spells:{
                    total: 1,
                    9: 1
                },
                features: ["Metamagic"],
                special:{
                    "Sorcery Points" : 17
                }
            },
            18:{
                features: ["Sorcerous Origin feature"],
                special:{
                    "Sorcery Points" : 18
                }
            },
            19:{
                abilityScore: 1, 
                special:{
                    "Sorcery Points" : 19
                }
            },
            20:{
                features: ["Sorcerous Restoration"],
                special:{
                    "Sorcery Points" : 20
                }
            }
        }
    },
    Warlock:{
        hitDie: "d8",
        primaryAbility: ["charisma"],
        savingThrowProficiency: ["wisdom", "charisma"],
        proficiency: ["Light Armor", "Simple Weapons"],
        level: {
            1:{
                features: ["Otherworldly Patron", "Pact Magic"],
                spells:{
                    type: "warlock",
                    total: 2,
                    0: 2,
                    1: 1
                }
            },
            2:{
                features: ["Eldritch Invocations"],
                spells:{
                    total: 1,
                    1: 1
                },
                special:{
                    "Eldritch Invocations" : 2
                }
            },
            3:{
                features: ["Pact Boon"],
                spells:{
                    total: 1,
                    1: -2,
                    2: 2
                },
            },
            4:{
                abilityScore: 1, 
                spells:{
                    total: 1,
                    0: 1,
                },
            },
            5:{
                spells:{
                    total: 1,
                    2: -2,
                    3: 2
                },
                special:{
                    "Eldritch Invocations" : 3
                }
            },
            6:{
                features: ["Otherworldly Patron feature"],
                spells:{
                    total: 1,
                },
            },
            7:{
                spells:{
                    total: 1,
                    3: -2,
                    4: 2
                },
                special:{
                    "Eldritch Invocations" : 4
                }
            },
            8:{
                abilityScore: 1,
                spells:{
                    total: 1,
                },
            },
            9:{
                spells:{
                    total: 1,
                    4: -2,
                    5: 2
                },
                special:{
                    "Eldritch Invocations" : 5
                }
            },
            10:{
                features: ["Otherworldly Patron feature"],
                spells:{
                    0: 1,
                },
            },
            11:{
                features: ["Mystic Arcanum (6th level)"],
                spells:{
                    total: 1,
                    5: 1
                },
            },
            12:{
                abilityScore: 1, 
                special:{
                    "Eldritch Invocations" : 6
                }
            },
            13:{
                features: ["Mystic Arcanum (7th level)"],
                spells:{
                    total: 1,
                },
            },
            14:{
                features: ["Otherworldly Patron feature"],
            },
            15:{
              features: ["Mystic Arcanum (8th level)"],
                spells:{
                    total: 1,
                },
                special:{
                    "Eldritch Invocations" : 7
                }
            },
            16:{
                abilityScore: 1, 
            },
            17:{
              features: ["Mystic Arcanum (9th level)"],
                spells:{
                    total: 1,
                    5: 1
                },
            },
            18:{
                special:{
                    "Eldritch Invocations" : 8
                }
            },
            19:{
                abilityScore: 1, 
            },
            20:{
                features: ["Eldritch Master"],
            }
        }
    },
    Wizard:{
        hitDie: "d6",
        primaryAbility: ["intelligence"],
        savingThrowProficiency: ["wisdom", "intelligence"],
        proficiency: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"],
        level: {
            1:{
                features: ["Arcane Recovery"],
                spells:{
                    type: "wizard",
                    0: 3,
                    1: 2
                }
            },
            2:{
                features: ["Arcane Tradition"],
                spells:{
                    1: 1
                },
            },
            3:{
                features: ["Metamagic"],
                spells:{
                    1: 1,
                    2: 2
                },
            },
            4:{
                abilityScore: 1, 
                spells:{
                    0: 1,
                    2: 1
                },
            },
            5:{
                spells:{
                    3: 2
                },
            },
            6:{
                features: ["Arcane Tradition feature"],
                spells:{
                    3: 1
                },
            },
            7:{
                spells:{
                    4: 1
                },
            },
            8:{
                abilityScore: 1,
                spells:{
                    4: 1
                },
            },
            9:{
                spells:{
                    4: 1,
                    5: 1
                },
            },
            10:{
                features: ["Arcane Tradition feature"],
                spells:{
                    0: 1,
                    5: 1
                },
            },
            11:{
                spells:{
                    6: 1
                },
            },
            12:{
                abilityScore: 1, 
            },
            13:{
                spells:{
                    7: 1
                },
            },
            14:{
                features: ["Arcane Tradition feature"],
            },
            15:{
                spells:{
                    8: 1
                },
            },
            16:{
                abilityScore: 1, 
            },
            17:{
                spells:{
                    9: 1
                },
            },
            18:{
                spells:{
                    5: 1
                },
                features: ["Spell Mastery"],
            },
            19:{
                spells:{
                    6: 1
                },
                abilityScore: 1, 
            },
            20:{
                spells:{
                    7: 1
                },
                features: ["Signature Spells"],
            }
        
        }
    }
});
 
