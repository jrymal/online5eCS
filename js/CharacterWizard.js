'use strict';

let callbackFunction = null;

function addClass() {
    
    var selectedEle = $("createCharacter.character.class.type");
    var levelEle = $("createCharacter.character.level");
    var tableEle = $("createCharacter.character.class.tbody");
    var className = selectedEle.value;
    var selIdx = selectedEle.selectedIndex;

    tableEle.innerHTML += `<tr id="createCharacter.character.class.tableele.${className}">
        <th>${className}<input type="hidden" name="character.class[].class" value="${className}"/></th>
        <td>${levelEle.value}<input type="hidden" name="character.class[].level" value="${levelEle.value}"/></td>
        <td><button type="button" onClick="removeClass("${className}")">Remove</button></td>
    </tr>`;              

    selectedEle.remove(selIdx);
}

function removeClass(className) {
    var tableEle = $("createCharacter.character.class.tableele."+className);
    var selectedEle = $("createCharacter.character.class.type");
    var selIdx = selectedEle.selectedIndex;
    
    var i;
    for(i = 0; i < selectedEle.options.length; i++){
        var compVal = className.localeCompare( selectedEle.options[i].innerHTML);
        if (compVal < 0) {
            break;
        }
    }
        
    let opt = document.createElement('option');
    opt.innerHTML = className;
    opt.value = className;
         
    selectedEle.add(opt, i);
    tableEle.parentNode.removeChild(tableEle);
}

function postProcessStep(form){
    if (form.checkValidity()){ 
        switch(form.id) {
            case 'createCharacter.class.form':
                if ($('createCharacter.character.class.tbody').childElementCount == 0){
                    addClass();
                }
                break;
        }
    }
    return form.checkValidity();
}

function prepopulateValues(formName){
    switch(formName) {
        case 'createCharacter.player':
            if (currentCharacter) {
                setIfExistsAndEmpty('createCharacter.player.name', currentCharacter.player.name);
                setIfExistsAndEmpty('createCharacter.player.phone', currentCharacter.player.phone);
                setIfExistsAndEmpty('createCharacter.player.email', currentCharacter.player.email);
            }
            break;
        case 'createCharacter.name':
            let nameObj = RACES[$('createCharacter.character.race').value].names;
            setIfExistsAndEmpty('createCharacter.character.name.first', chooseFirstName(nameObj));
            setIfExistsAndEmpty('createCharacter.character.name.family', chooseFamilyName(nameObj));
            setIfExistsAndEmpty('createCharacter.character.name.nickname', chooseNickName(nameObj));
            setIfExistsAndEmpty('createCharacter.character.name.child', chooseChildName(nameObj));
            break;
        case 'createCharacter.attr':
            generateAttributes();
            break; 
        case 'createCharacter.age': {
            let race = RACES[$('createCharacter.character.race').value];
            let heightObj = chooseHeight(race);
            setIfExistsAndEmpty('createCharacter.details.age', chooseAge(race));
            setIfExistsAndEmpty('createCharacter.details.height', heightObj.total);
            setIfExistsAndEmpty('createCharacter.details.weight', chooseWeight(race, heightObj.mod));
        }
            break; 
        case 'createCharacter.skills': {
            let race = RACES[$('createCharacter.character.race').value];
            let backstory = BACKSTORIES[$('createCharacter.backstory.type').value];
            chooseCheckbox("createCharacter.skills.legend", "skills.", "skills", race, backstory);
        }
            break; 
        case 'createCharacter.language': {
            let race = RACES[$('createCharacter.character.race').value];
            let backstory = BACKSTORIES[$('createCharacter.backstory.type').value];
            chooseCheckbox("createCharacter.languages.legend", "languages.", "languages", race, backstory);
        }
            break;
        case 'createCharacter.class':
            let table = $('createCharacter.character.class.tbody');
            let chooser = $('createCharacter.character.class.type');
            if (table.childElementCount == 1 
                && !isVisible(document.getElementsByClassName("multiclass")[0])){
                let curValue = table.rows[0].cells[0].innerText;
                removeClass(curValue);
                chooser.value = curValue;
            }
            break;
        case 'importFile':
            let tableBody = $('DB.character');
            tableBody.innerHTML = "";
            let currentKey = encodeURIComponent(generateName());
            getAllCharacters(function(event){

                let cursor = event.target.result;
                if (cursor) {
                    let value = cursor.primaryKey;
                    let key = encodeURIComponent(cursor.primaryKey);
                    let character = cursor.value;
                    if (key !== currentKey){
                        tableBody.innerHTML += `<tr id="importFile.DBLoad.${key}">
                    <td><input type="radio" name="importType" id="importFile.DBLoad.select.${key}" value="${value}"/></td>
                    <td><label class="multiline-cell" for="importFile.DBLoad.select.${key}">
                            ${generateDbLabel(character)}</label></td>
                    <td><button type="button" onClick="deleteCharacterLoad('${key}','${value}')">Remove</button></td>
                    </tr>`;
                    }
                    cursor.continue();
                }
            });
            break;
    }    
}

function deleteCharacterLoad(key, value){
    deleteCharacter(value, function(){
        // delete the value from the UI
        let tableEle = $('importFile.DBLoad.'+key);
        tableEle.parentNode.removeChild(tableEle);
    });
}

function generateDbLabel(character){
    return `<b>Player:</b> ${character.player.name}<br>
        <b>Character:</b> ${character.character.name.first} ${character.character.name.family}<br>
        <b>Class:</b> ${joinClassName(character.character.class)}`;
}

function joinClassName(classList){
    let resp = "";
    for (let i = 0; i < classList.length; i++){
        let classN = classList[i].class;
        if (resp != ""){
            resp += ", ";
        }
        resp += classN + "(level "+classList[i].level+")";
    }
    return resp;
}

function setIfExists(id, value){
    if (value){
        $(id).value = value; 
    }
}

function setIfExistsAndEmpty(id, value){
    if (value && !$(id).value){
        $(id).value = value; 
    }
}

function chooseFamilyName(nameObj){
    return chooseFromList(nameObj.family);
}

function chooseNickName(nameObj){
    return chooseFromList(nameObj.nickname);
}

function chooseChildName(nameObj){
    return chooseFromList(nameObj.child);
}

function chooseFirstName(nameObj){
    let nameList = [];
    switch($('createCharacter.character.pronoun').value) {
        case 'he':
        case 'she':
            nameList = nameList.concat(nameObj[$('createCharacter.character.pronoun').value]);
            break;
        case 'they':
        case 'ze':
            nameList = nameList.concat(nameObj.he);
            nameList = nameList.concat(nameObj.she);
            break;
    }
    
    return chooseFromList(nameList);
}

function chooseAge(race){
    let element = $('createCharacter.details.age');
    let age = race.age;
    
    element.min=age.min;
    element.max=age.max;
    
    return chooseWeightedRange(FRONT_HEAVY, age.min, age.max);
}

function chooseHeight(race) {
    let element = $('createCharacter.details.height');
    let height = race.size.height;
    element.min=height.base;
    element.max=height.max;
    
    let roll = rollDieFromString(height.modifier);
    return {
    "mod": roll,
    "total": height.base + roll
    };
}

function chooseWeight(race, heightMod) {
    let element = $('createCharacter.details.weight');
    let weight = race.size.weight;
    
    return weight.base + (heightMod * rollDieFromString(weight.modifier));    

}

function chooseCheckbox(legendId, idPrefix, attribute, race, backstory){
    let unusedSlots = 0;
    unusedSlots += checkCheckboxes(idPrefix, race[attribute]);
    unusedSlots += checkCheckboxes(idPrefix, backstory[attribute]);
    
    var legend = $(legendId);
    legend.innerHTML = unusedSlots;
    setDataAttribute(legend, "rulemax", unusedSlots);
}

function checkCheckboxes(idPrefix, list){
    let i;
    let unusedSlots = 0;
    for(i=0; i<length(list);i++){
        let checkName = list[i];
        if (checkName == "ANY"){
            unusedSlots++; 
        } else {
            $(idPrefix+checkName).checked = true;
        }
    }
    return unusedSlots;
}

function populateLookups(){
    let i;
    
    let nodes = document.querySelectorAll("select[data-lookup]");
    for (i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        populateSelect(node, 
            eval(getDataAttribute(node, "lookup")), 
            eval(getDataAttribute(node, "sort", true)), 
            getDataAttribute(node, "type", "String"))
    }
    
    nodes = document.querySelectorAll("fieldset > div[data-lookup]");
    for (i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        let typeName = getDataAttribute(node, "lookup");
        populateCheckboxes(node, eval(typeName), typeName.toLowerCase());
    }

    nodes = document.querySelectorAll("select[data-rng]");
    for (i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        let rng = eval(getDataAttribute(node, "rng", "false"));
        if (rng) {
            randomValue(node);
        }
    }
}

function generateAttributes() {
    let generateMethod;
    switch($('createCharacter.attr.chooser').value) {
        case 'Manual':
            generateMethod = function() {
                return 10;
            };
            break;
        case 'Straight':
            generateMethod = function() {
                return rollDie(DICE.d6,3).reduce((a,b) => a+b,0);
            };
            break;
        case 'Throwaway':
            generateMethod = function() {
                return rollDie(DICE.d6,4).sort().reverse()
                    .slice(0,3).reduce((a,b) => a+b,0);
            };
            break;
    }
    
    for(let attr in ATTRIBUTES) {
        $('createCharacter.character.attribute.'+attr).value = 
            generateMethod(); 
    }
}

function changeColor(event) {
    let eleId = event.target.id;
    let swatchId = event.target.id+".color";

    let colorSet = eval(getDataAttribute(event.target, "lookup")); 
    
    $(swatchId).style.backgroundColor = colorSet[event.target.value].color;
}

function populateSelect(selectEle, sourceObj, sort, type) {
    let fragment = document.createDocumentFragment();
    let sourceArray = Object.keys(sourceObj);

    if (sort) {
        sourceArray = sourceObj.sort();
    }

    for (let i = 0; i < sourceArray.length; i++  ) {
        let value = sourceArray[i];
        let obj = sourceObj[value];
        let name = obj.name ? obj.name : value;

        // create base class
        let opt = document.createElement('option');
        switch(type) {
            default:
                opt.innerHTML = name;
                break;
        }
        opt.value = value;

        fragment.appendChild(opt);
    }

    selectEle.appendChild(fragment);

    randomValue(selectEle);

    if (selectEle.onchange){
        selectEle.onchange({"target":selectEle});
    }
}

function populateCheckboxes(divEle, sourceObj, typeName) {
    let fragment = document.createDocumentFragment();
    let sourceArray = Object.keys(sourceObj).sort();

    for (let i = 0; i < sourceArray.length; i++  ) {
        let value = sourceArray[i];
        let obj = sourceObj[value];
        let idValue = typeName+"."+value;

        let lbl = document.createElement('label');
        lbl.innerHTML = obj.name;
        lbl.htmlFor=idValue;

        let opt = document.createElement('input');
        opt.value = value;
        opt.type = "checkbox";
        opt.name = "character."+typeName;
        opt.id =idValue;
        opt.onclick = function(evt) {
            let legendEle = $("createCharacter."+typeName+".legend");
            let curCount = getDataAttribute(legendEle, "rulemax");
            if (evt.currentTarget.checked){
                curCount--;
            } else {
                curCount++;
            }
            legendEle.innerHTML = curCount;
            setDataAttribute(legendEle, "rulemax", curCount);
        };

        fragment.appendChild(lbl);
        fragment.appendChild(opt);
    }

    divEle.appendChild(fragment);
}

function generateDataToJSON() {
    let dataholders = document.getElementsByClassName("wizardScreen");

    // Retrieves input data from a form and returns it as a JSON object.
    return  [].reduce.call(dataholders, (data, dataholder) => {
        for (let i = 0; i < dataholder.elements.length; i++) {
            let element = dataholder.elements[i];
            let name = element.name;

            if (name === "") {
                continue;
            } else if (isValidElement(element) && isValidValue(element)) {
                let dataObj; 
                if (isCheckbox(element)) {
                    dataObj = (findNode(name, data) || []).concat(element.value);
                } else if (isMultiSelect(element)) {
                    dataObj = getSelectValues(element);
                } else {
                    dataObj = element.value;
                }
                insertAtNode(name, data, dataObj);
            }
        }
        return data;
    }, {});
}


 
