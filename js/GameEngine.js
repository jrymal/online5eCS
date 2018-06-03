 const SKILLS = {
    acrobatics: {
        name: "Acrobatics",
        attribute: "dexterity",
    },
    animalhandling: {
        name: "Animal Handling",
        attribute: "wisdom",
    },
    arcana: {
        name: "Arcana",
        attribute: "intelligence",
    },
    athletics: {
        name: "Athletics",
        attribute: "strength",
    },
    deception: {
        name: "Deception",
        attribute: "charisma",
    },
    history: {
        name: "History",
        attribute: "intelligence",
    },
    insight: {
        name: "Insight",
        attribute: "wisdom",
    },
    intimidation: {
        name: "Intimidation",
        attribute: "charisma",
    },
    investigation: {
        name: "Investigation",
        attribute: "intelligence",
    },
    medicine: {
        name: "Medicine",
        attribute: "wisdom",
    },
    nature: {
        name: "Nature",
        attribute: "intelligence",
    },
    perception: {
        name: "Perception",
        attribute: "wisdom",
    },
    performance: {
        name: "Performance",
        attribute: "charisma",
    },
    persuasion: {
        name: "Persuasion",
        attribute: "charisma",
    },
    religion: {
        name: "Religion",
        attribute: "intelligence",
    },
    slightofhand: {
        name: "Slight of Hand",
        attribute: "dexterity",
    },
    stealth: {
        name: "Stealth",
        attribute: "dexterity",
    },
    survival: {
        name: "Survival",
        attribute: "wisdom",
    }
};

const CLASSES = {
    Barbarian:{
        hitDie: "d12",
        primaryAbility: ["strength"],
        savingThrowProficiencies: ["strength", "constitution"],
        proficiencies: ["Light Armor", "Medium Armor", "Shields", "Simple Weapons", "Martial Weapons"],
        levelBonus: {
            1: {
            }
        }
    },
    Bard:{
        hitDie: "d8",
        primaryAbility: ["charisma"],
        savingThrowProficiencies: ["dexterity", "charisma"],
        proficiencies: ["Light Armor", "Simple Weapons", "Hand Crossbows", "Longswords", "Rapiers", "Shortswords"],
        levelBonus: {
            1: {
            }
        }
    },
    Cleric:{
        hitDie: "d8",
        primaryAbility: ["wisdom"],
        savingThrowProficiencies: ["wisdom", "charisma"],
        proficiencies: ["Light Armor", "Medium Armor", "Shields", "Simple Weapons"],
        levelBonus: {
            1: {
            }
        } 
    },
    Druid:{
        hitDie: "d8",
        primaryAbility: ["wisdom"],
        savingThrowProficiencies: ["wisdom", "intelligence"],
        proficiencies: ["Light Armor (Non-metal)", "Medium Armor (Non-metal)", "Shields (Non-metal)", "Clubs", "Daggers", "Darts", "Javelins", "Maces", "Quarterstaffs", "Scimitars","Sickles", "Slings", "Spears"],
        levelBonus: {
            1: {
            }
        }
    },
    Fighter:{
        hitDie: "d10",
        primaryAbilityJoin: "or",
        primaryAbility: ["strength", "dexterity"],
        savingThrowProficiencies: ["strength", "constitution"],
        proficiencies: ["Light Armor", "Medium Armor", "Heavy Armor", "Shields", "Simple Weapons", "Martial Weapons"],
        levelBonus: {
            1: {
            }
        }
    },
    Monk:{
        hitDie: "d8",
        primaryAbilityJoin: "and",
        primaryAbility: ["dexterity", "wisdom"],
        savingThrowProficiencies: ["dexterity", "strength"],
        proficiencies: ["Simple Weapons", "Shortswords"],
        levelBonus: {
            1: {
            }
        }
    },
    Paladin:{
        hitDie: "d10",
        primaryAbilityJoin: "and",
        primaryAbility: ["strength","charisma"],
        savingThrowProficiencies: ["wisdom", "charisma"],
        proficiencies: ["Light Armor", "Medium Armor", "Heavy Armor", "Shields", "Simple Weapons", "Martial Weapons"],
        levelBonus: {
            1: {
            }
        }
    },
    Ranger:{
        hitDie: "d10",
        primaryAbilityJoin: "and",
        primaryAbility: ["dexterity", "wisdom"],
        savingThrowProficiencies: ["dexterity", "strength"],
        proficiencies: ["Light Armor", "Medium Armor", "Shields", "Simple Weapons", "Martial Weapons"],
        levelBonus: {
            1: {
            }
        }
    },
    Rogue:{
        hitDie: "d8",
        primaryAbility: ["dexterity"],
        savingThrowProficiencies: ["dexterity", "intelligence"],
        proficiencies: ["Light Armor", "Simple Weapons", "Hand Crossbows", "Longswords", "Rapiers", "Shortswords"],
        levelBonus: {
            1: {
            }
        }
    },
    Sorcerer:{
        hitDie: "d6",
        primaryAbility: ["charisma"],
        savingThrowProficiencies: ["constitution", "charisma"],
        proficiencies: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"],
        levelBonus: {
            1: {
            }
        }
    },
    Warlock:{
        hitDie: "d8",
        primaryAbility: ["charisma"],
        savingThrowProficiencies: ["wisdom", "charisma"],
        proficiencies: ["Light Armor", "Simple Weapons"],
        levelBonus: {
            1: {
            }
        }
    },
    Wizard:{
        hitDie: "d6",
        primaryAbility: ["intelligence"],
        savingThrowProficiencies: ["wisdom", "intelligence"],
        proficiencies: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"],
        levelBonus: {
            1: {
            }
        }
    }
};

const RACES = {
    Dwarf:{
        name: "Dwarf",
        family: "Dwarf",
        attribute:{
            constitution: 2
        }
    },
    MountainDwarf:{
        name: "Mountain Dwarf",
        family: "Dwarf",
        attribute:{
           strength: 2,
           constitution: 2
        }
    },
    HillDwarf:{
        name: "Hill Dwarf",
        family: "Dwarf",
        attribute:{
           wisdom: 1,
           constitution: 2
        }
    },
    Elf:{
        name: "Elf",
        family: "Elf",
        attribute:{
            dexterity: 2,
        }
    },
    HighElf:{
        name: "High Elf",
        family: "Elf",
        attribute:{
            dexterity: 2,
            intelligence: 1
        }
    },
    WoodElf:{
        name: "Wood Elf",
        family: "Elf",
        attribute:{
            dexterity: 2,
            wisdom: 1
        }
    },
    Drow:{
        name: "Drow",
        family: "Elf",
        attribute:{
            dexterity: 2,
            charisma: 1
        }
    },
    Halfling:{
        name: "Halfling",
        family: "Halfling",
        attribute:{
            dexterity: 2,
        }
    },
    LightfootHalfling:{
        name: "Lightfoot Halfling",
        family: "Halfling",
        attribute:{
            dexterity: 2,
            charisma: 1
        }
    },
    StoutHalfling:{
        name: "Stout Halfling",
        family: "Halfling",
        attribute:{
            dexterity: 2,
            constitution: 1
        }
    },
    Human:{
        name: "Human",
        attribute:{
            strength: 1,
            dexterity: 1,
            constitution: 1,
            intelligence: 1,
            wisdom: 1,
            charisma: 1
        }
    },
    Dragonborn:{
        name: "Dragonborn",
        attribute:{
            strength: 2,
            charisma: 1
        }
    },
    Gnome:{
        name: "Gnome",
        family: "Gnome",
        attribute:{
            intelligence: 2
        }
    },
    ForestGnome:{
        name: "Forest Gnome",
        family: "Gnome",
        attribute:{
            dexterity: 1,
            intelligence: 2
        }
    },
    RockGnome:{
        name: "Rock Gnome",
        family: "Gnome",
        attribute:{
            constitution: 1,
            intelligence: 2
        }
    },
    HalfElf:{
        name: "Half Elf",
        attribute:{
            charisma: 2
        }
    },
    HalfOrc:{
        name: "Half Orc",
        attribute:{
            strength: 2,
            constitution: 1
        }
    },
    Tiefling:{
        name: "Tiefling",
        attribute:{
            intelligence: 1,
            charisma: 2
        }
    }
};

const BACKSTORIES= {
    Acolyte:{},
    Charlatan:{},
    Criminal:{},
    Entertainer:{},
    FolkHero:{},
    GuildArtisan:{},
    Hermit:{},
    Noble:{},
    Outlander:{},
    Sage:{},
    Sailor:{},
    Soldier:{},
    Urchin:{}
};

const ENGINE = {
    savingthrow: function(value) {
        return Math.floor((value-10)/2);
    }
};

const ATTRIBUTE_ID_LIST = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];

function updateRace(evt) {

    for(var i = 0; i < ATTRIBUTE_ID_LIST.length; i++) {
        var evt = {
            target: {
                id: ATTRIBUTE_ID_LIST[i],
                value: $(ATTRIBUTE_ID_LIST[i]).value
            }
        };
        updateAttribute(evt);
    }
}

function updateClass(evt) {
    var classes = CLASSES[$('class').value];

    $("hitDie").innerHTML = classes.hitDie;
    $("maxHitPoints").innerHTML = Number(stripFirst("d", classes.hitDie))*$("level").value;
    $("ability").innerHTML = classes.primaryAbility.join("<br>");
    $("savingThrows").innerHTML = classes.savingThrowProficiencies.join("<br>");
    $("class.proficiencies").innerHTML = classes.proficiencies.join("<br>");
    
}

function updateAttribute(evt) {
    var targetId = evt.target.id;
    var raceMod = getValue(RACES[$('race').value].attribute, targetId, 0);
    var totalValue = Number(evt.target.value) + raceMod;
    var savingThrow = ENGINE.savingthrow(totalValue);

    var skillMod = getCheckedSkillCount(targetId)

    $("RaceModifier."+targetId).value = raceMod;
    $("Total."+targetId).value = totalValue;
    $("SavingThrows."+targetId).value = savingThrow;
    $("Passive."+targetId).value = 10 + savingThrow + skillMod;
}

function getCheckedSkillCount(attributeId) {
    var skillsArray = Object.keys(SKILLS);
    var cnt = 0;
    for(var i = 0; i < skillsArray.length; i++) {
        var skillName = skillsArray[i];
        var skill = SKILLS[skillName];
        var skillEle = $("skills."+skillName);
        if (attributeId === skill.attribute && $("skills."+skill.name).checked) {
            cnt++;
        }
    }
    return cnt;
}

function getValue(obj, key, defaultValue) {
    return (key in obj) ? obj[key] : defaultValue;
}

function findInMinMaxArray(minMaxArray, value) {
    for(var i = 0; i < minMaxArray.length; i++) {
        var valueRow = minMaxArray[i];
        if (value >= valueRow.min
            && value <= valueRow.max) {
                return valueRow.modifier;
            }
    }
    return 0;
}
