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
        specialName: "Rage",
        level: {
            1: {
                proficiencyBonus : 2,
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
                proficiencyBonus : 1,
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
                proficiencyBonus : 1,
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
                proficiencyBonus : 1,
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
                proficiencyBonus : 1,
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
                proficiencyBonus : 2,
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
                proficiencyBonus : 1,
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
                proficiencyBonus : 1,
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
                proficiencyBonus : 1,
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
                proficiencyBonus : 1,
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
        level: {
            1: {
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
            1: {
            }
        }
    },
    Rogue:{
        hitDie: "d8",
        primaryAbility: ["dexterity"],
        savingThrowProficiency: ["dexterity", "intelligence"],
        proficiency: ["Light Armor", "Simple Weapons", "Hand Crossbows", "Longswords", "Rapiers", "Shortswords"],
        level: {
            1: {
            }
        }
    },
    Sorcerer:{
        hitDie: "d6",
        primaryAbility: ["charisma"],
        savingThrowProficiency: ["constitution", "charisma"],
        proficiency: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"],
        level: {
            1: {
            }
        }
    },
    Warlock:{
        hitDie: "d8",
        primaryAbility: ["charisma"],
        savingThrowProficiency: ["wisdom", "charisma"],
        proficiency: ["Light Armor", "Simple Weapons"],
        level: {
            1: {
            }
        }
    },
    Wizard:{
        hitDie: "d6",
        primaryAbility: ["intelligence"],
        savingThrowProficiency: ["wisdom", "intelligence"],
        proficiency: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"],
        level: {
            1: {
            }
        }
    }
});
 
