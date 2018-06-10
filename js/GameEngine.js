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
    $("maxHitPoints").innerHTML = ENGINE.getMaxHitPoints(classes);
    $("ability").innerHTML = classes.primaryAbility.join("<br>");
    $("savingThrows").innerHTML = classes.savingThrowProficiencies.join("<br>");
    $("class.proficiencies").innerHTML = classes.proficiencies.join("<br>");
    
}

function updateBackstory(evt) {
    var backstory = BACKSTORIES[$('backstory.type').value];

    addSkills(backstory.skills);
    $("backstory.languages").value = backstory.languages.join('\n');
    $("backstory.equipment").value = backstory.tools.join('\n');
}

function addSkills(skillsArray) {
    for(var i = 0; i < skillsArray.length; i++) {
        var skillName = skillsArray[i];
        $("skills."+skillName).checked = true;
    }
    // need to update attributes
    updateRace();
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
    for(var i = 0; i < minMaxArray.length; i++) {
        var valueRow = minMaxArray[i];
        if (value >= valueRow.min
            && value <= valueRow.max) {
                return valueRow.modifier;
            }
    }
    return 0;
}
