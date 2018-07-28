'use strict';

const ENGINE = {
    savingthrow: function(value) {
        return Math.floor((value-10)/2);
    },
    getMaxHitPoints: function(classes) {
        return (Number(stripFirst("d", classes.hitDie))+$("SavingThrows.constitution"))*$("level").value;
    }
};

const ATTRIBUTE_ID_LIST = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];

function updateRace(evt) {

    for(let i = 0; i < ATTRIBUTE_ID_LIST.length; i++) {
        let evt = {
            target: {
                id: ATTRIBUTE_ID_LIST[i],
                value: $(ATTRIBUTE_ID_LIST[i]).value
            }
        };
        updateAttribute(evt);
    }
}

function updateClass(evt) {
    let classes = CLASSES[$('class').value];

    $("hitDie").innerHTML = classes.hitDie;
    $("maxHitPoints").innerHTML = ENGINE.getMaxHitPoints(classes);
    $("ability").innerHTML = classes.primaryAbility.join("<br>");
    $("savingThrows").innerHTML = classes.savingThrowProficiencies.join("<br>");
    $("class.proficiencies").innerHTML = classes.proficiencies.join("<br>");
    
}

function updateBackstory(evt) {
    let backstory = BACKSTORIES[$('backstory.type').value];

    addSkills(backstory.skills);
    $("backstory.languages").value = backstory.languages.join('\n');
    $("backstory.equipment").value = backstory.tools.join('\n');
}

function addSkills(skillsArray) {
    for(let i = 0; i < skillsArray.length; i++) {
        let skillName = skillsArray[i];
        $("skills."+skillName).checked = true;
    }
    // need to update attributes
    updateRace();
}

function updateAttribute(evt) {
    let targetId = evt.target.id;
    let raceMod = getValue(RACES[$('race').value].attribute, targetId, 0);
    let totalValue = Number(evt.target.value) + raceMod;
    let savingThrow = ENGINE.savingthrow(totalValue);

    let skillMod = getCheckedSkillCount(targetId)

    $("RaceModifier."+targetId).innerHTML = raceMod;
    $("Total."+targetId).innerHTML = totalValue;
    $("SavingThrows."+targetId).innerHTML = savingThrow;
    $("Passive."+targetId).innerHTML = 10 + savingThrow + skillMod;
}

function getCheckedSkillCount(attributeId) {
    let skillsArray = Object.keys(SKILLS);
    let cnt = 0;
    for(let i = 0; i < skillsArray.length; i++) {
        let skillName = skillsArray[i];
        let skill = SKILLS[skillName];
        let skillEle = $("skills."+skillName);
        if (attributeId === skill.attribute && $("skills."+skillName).checked) {
            cnt++;
        }
    }
    return cnt;
}

function getValue(obj, key, defaultValue) {
    return (key in obj) ? obj[key] : defaultValue;
}

function findInMinMaxArray(minMaxArray, value) {
    for(let i = 0; i < minMaxArray.length; i++) {
        let valueRow = minMaxArray[i];
        if (value >= valueRow.min
            && value <= valueRow.max) {
                return valueRow.modifier;
            }
    }
    return 0;
}
