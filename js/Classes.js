'use strict';

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
 
