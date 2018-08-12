'use strict';

const CLASSES = {
    Barbarian:{
        hitDie: "d12",
        primaryAbility: ["strength"],
        savingThrowProficiency: ["strength", "constitution"],
        proficiency: ["Light Armor", "Medium Armor", "Shields", "Simple Weapons", "Martial Weapons"],
        levelBonus: {
            1: {
            }
        }
    },
    Bard:{
        hitDie: "d8",
        primaryAbility: ["charisma"],
        savingThrowProficiency: ["dexterity", "charisma"],
        proficiency: ["Light Armor", "Simple Weapons", "Hand Crossbows", "Longswords", "Rapiers", "Shortswords"],
        levelBonus: {
            1: {
            }
        }
    },
    Cleric:{
        hitDie: "d8",
        primaryAbility: ["wisdom"],
        savingThrowProficiency: ["wisdom", "charisma"],
        proficiency: ["Light Armor", "Medium Armor", "Shields", "Simple Weapons"],
        levelBonus: {
            1: {
            }
        } 
    },
    Druid:{
        hitDie: "d8",
        primaryAbility: ["wisdom"],
        savingThrowProficiency: ["wisdom", "intelligence"],
        proficiency: ["Light Armor (Non-metal)", "Medium Armor (Non-metal)", "Shields (Non-metal)", "Clubs", "Daggers", "Darts", "Javelins", "Maces", "Quarterstaffs", "Scimitars","Sickles", "Slings", "Spears"],
        levelBonus: {
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
        levelBonus: {
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
        levelBonus: {
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
        levelBonus: {
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
        levelBonus: {
            1: {
            }
        }
    },
    Rogue:{
        hitDie: "d8",
        primaryAbility: ["dexterity"],
        savingThrowProficiency: ["dexterity", "intelligence"],
        proficiency: ["Light Armor", "Simple Weapons", "Hand Crossbows", "Longswords", "Rapiers", "Shortswords"],
        levelBonus: {
            1: {
            }
        }
    },
    Sorcerer:{
        hitDie: "d6",
        primaryAbility: ["charisma"],
        savingThrowProficiency: ["constitution", "charisma"],
        proficiency: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"],
        levelBonus: {
            1: {
            }
        }
    },
    Warlock:{
        hitDie: "d8",
        primaryAbility: ["charisma"],
        savingThrowProficiency: ["wisdom", "charisma"],
        proficiency: ["Light Armor", "Simple Weapons"],
        levelBonus: {
            1: {
            }
        }
    },
    Wizard:{
        hitDie: "d6",
        primaryAbility: ["intelligence"],
        savingThrowProficiency: ["wisdom", "intelligence"],
        proficiency: ["Daggers", "Darts", "Slings", "Quarterstaffs", "Light Crossbows"],
        levelBonus: {
            1: {
            }
        }
    }
};
 
