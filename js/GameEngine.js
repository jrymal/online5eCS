 var Skills = {
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

var Classes = {
    Barbarian:{},
    Bard:{},
    Cleric:{},
    Druid:{},
    Fighter:{},
    Monk:{},
    Paladin:{},
    Ranger:{},
    Rogue:{},
    Sorcerer:{},
    Warlock:{},
    Wizard:{}
};

var Races = {
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

var Backstories = {
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

var Engine = {
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

function updateAttribute(evt) {
    var targetId = evt.target.id;
    var raceMod = getValue(Races[$('race').value].attribute, targetId, 0);
    var totalValue =  Number(evt.target.value) + raceMod;

    $("RaceModifier."+targetId).value = raceMod;
    $("Total."+targetId).value = totalValue;
    $("SavingThrows."+targetId).value = Engine.savingthrow(totalValue);
    $("Passive."+targetId).value = 10 + Engine.savingthrow(totalValue); // plus skill adds
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
