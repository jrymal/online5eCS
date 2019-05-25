'use strict';

let callbackFunction = null;

function addClass() {
    
    var selectedEle = $("createCharacter_character_class_type");
    var levelEle = $("createCharacter_character_level");
    var tableEle = $("createCharacter_character_class_tbody");
    var className = selectedEle.value;
    var selIdx = selectedEle.selectedIndex;

    tableEle.innerHTML += `<tr id="createCharacter_character_class_tableele.${className}">
        <th>${className}<input type="hidden" name="character.class[].class" value="${className}"/></th>
        <td>${levelEle.value}<input type="hidden" name="character.class[].level" value="${levelEle.value}"/></td>
        <td><button type="button" onClick="removeCharacterClass('${className}')">Remove</button></td>
    </tr>`;              

    selectedEle.remove(selIdx);
}

function removeCharacterClass(className) {
    var tableEle = $("createCharacter_character_class_tableele_"+className);
    var selectedEle = $("createCharacter_character_class_type");
    
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

function cleanUpCreateWizard(){
    $("createCharacter_character_class_tbody").innerHTML = "";
    $('createCharacter_equipment_equipment').innerHTML = "";
}

function postProcessStep(form){
    if (form.checkValidity()){ 
        switch(form.id) {
            case 'createCharacter_class_form':
                if ($('createCharacter_character_class_tbody').childElementCount == 0){
                    addClass();
                }
                break;
        }
    }
    return form.checkValidity();
}

function prepopulateValues(formName){
    switch(formName) {
        case 'createCharacter_player':
            if (currentCharacter) {
                setIfExistsAndEmpty('createCharacter_player_name', currentCharacter.player.name);
                setIfExistsAndEmpty('createCharacter_player_phone', currentCharacter.player.phone);
                setIfExistsAndEmpty('createCharacter_player_email', currentCharacter.player.email);
            }
            break;
        case 'createCharacter_race':
            setIfExistsAndEmpty('createCharacter_character_race', chooseFromList(Object.keys(RACES)));
            setIfExistsAndEmpty('createCharacter_character_pronoun', chooseFromList(Object.keys(PRONOUNS)));
            setIfExistsAndEmpty('createCharacter_character_alignment_society', chooseFromList(ALIGNMENT_SOCIETY));
            setIfExistsAndEmpty('createCharacter_character_alignment_morality', chooseFromList(ALIGNMENT_MORALITY));
            
            break;
 
        case 'createCharacter_name':
            let nameObj = RACES[$('createCharacter_character_race').value].names;
            setIfExistsAndEmpty('createCharacter_character_name_first', chooseFirstName(nameObj));
            setIfExistsAndEmpty('createCharacter_character_name_family', chooseFamilyName(nameObj));
            setIfExistsAndEmpty('createCharacter_character_name_nickname', chooseNickName(nameObj));
            setIfExistsAndEmpty('createCharacter_character_name_child', chooseChildName(nameObj));
            break;
        case 'createCharacter_attr':
            generateAttributes();
            break; 
        case 'createCharacter_age': {
            let race = RACES[$('createCharacter_character_race').value];
            let heightObj = chooseHeight(race);
            setIfExistsAndEmpty('createCharacter_details_age', chooseAge(race));
            setIfExistsAndEmpty('createCharacter_details_height', heightObj.total);
            setIfExistsAndEmpty('createCharacter_details_weight', chooseWeight(race, heightObj.mod));
        }
            break; 
        case 'createCharacter_skills': {
            let race = RACES[$('createCharacter_character_race').value];
            let backstory = BACKSTORIES[$('createCharacter_backstory_type').value];
            chooseCheckbox("createCharacter_skills_legend", "skills.", "skills", race, backstory);
        }
            break; 
        case 'createCharacter_language': {
            let race = RACES[$('createCharacter_character_race').value];
            let backstory = BACKSTORIES[$('createCharacter_backstory_type').value];
            chooseCheckbox("createCharacter_languages_legend", "languages.", "languages", race, backstory);
        }
            break;
        case 'createCharacter_class':
            let table = $('createCharacter_character_class_tbody');
            let chooser = $('createCharacter_character_class_type');
            if (table.childElementCount == 1 
                && !isVisible(document.getElementsByClassName("multiclass")[0])){
                let curValue = table.rows[0].cells[0].innerText;
                removeCharacterClass(curValue);
                chooser.value = curValue;
            }
            break;
        case 'createCharacter_equipment':
            let cnt = 0;
            let equipmentEle = $('createCharacter_equipment_equipment');
            EQUIP_COUNT = 0;
            if (equipmentEle.childElementCount == 0 ){ 
                [].slice.call(document
                    .querySelectorAll("input[name='character.class[].class']"))
                    .map((classEle) => classEle.value)
                    .sort()
                    .forEach(function(className){
                        let curClass = CLASSES[className];
                        curClass.equipment
                            .forEach(function(itemSel){
                                cnt++;
                                let inputId = "createCharacter_equipment."+cnt;
                                if (Array.isArray(itemSel)){
                                   equipmentEle.innerHTML += 
                                   `<label for="${inputId}">Choose an item</label>
                                    <select id="${inputId}" >
                                        ${itemSel.map(optionifyItem)}
                                    </select><hr>`;
                                } else {
                                   equipmentEle.innerHTML += buildEquipmentRow('createCharacter_equipment_equipment',itemSel);
                                }
                            });
                    });
            }
            break;
        case 'equipment':{
                let equipEle = $('equipment_list');
                equipEle.innerHTML = '';
                EQUIP_COUNT = 0;

                currentCharacter.character.equipment.forEach((equipItem) =>
                    equipEle.innerHTML += buildEquipmentRow('equipment_list', equipItem));
            }
            break;
           
        case 'importFile':
            let tableBody = $('DB_character');
            tableBody.innerHTML = "";
            let currentEncKey = encodeURIComponent(generateName());
            getAllCharacters(function(event){

                let cursor = event.target.result;
                if (cursor) {
                    let key = cursor.primaryKey;
                    let encKey = encodeURIComponent(cursor.primaryKey);
                    let character = cursor.value;
                    if (encKey !== currentEncKey){
                        tableBody.innerHTML += 
                        `<tr id="importFile.DBLoad.${encKey}">
                            <td>${character.player.name}</td>
                            <td>${generateCharacterName(character)}</td>
                            <td>${RACES[character.character.race].name}</td>
                            <td>${joinClassName(character.character.class)}</td>
                            <td>
                                <button type="button" onClick="loadByKey('${key}')">Load</button>
                                <button type="button" onClick="deleteCharacterLoad('${encKey}','${key}')">Delete</button>
                            </td>
                        </tr>`;
                    }
                    cursor.continue();
                } else {
                    selectFirstInput(currentDialogDiv);
                }
            });
            break;
        case 'levelUp_oldClass':{
            let levelUpEle = $(formName);

            // need to decide what to show
            levelUpEle.classList.remove("feature");
            levelUpEle.classList.remove("special");
            levelUpEle.classList.remove("abilityScore");
            levelUpEle.classList.remove("spells");
            
            let upgradeClass = $('levelUp_class').value;

            if (!exists(upgradeClass)){
                console.error("Upgrade class is not set.");
                return;
            }

            let currentLevel = getClass(currentCharacter.character.class, upgradeClass).level;
           
            let nextLevel = +currentLevel + 1;
            let classObj = CLASSES[upgradeClass];
            let nextLevelObj = classObj.level[nextLevel];
       
            if (exists(nextLevelObj.features)){
                levelUpEle.classList.add("feature");
                $('levelUp_feature').innerHTML = renderUlArray(nextLevelObj.features);
            }
            if (exists(nextLevelObj.special)){
                levelUpEle.classList.add("special");
                $('levelUp_special').innerHTML = renderUlArray(Object.keys(nextLevelObj.special).map(function(key){
                    return key+": "+nextLevelObj.special[key]; 
                }));
            }
            if (exists(nextLevelObj.abilityScore)){
                levelUpEle.classList.add("abilityScore");
            }
            if (exists(nextLevelObj.spells)){
                levelUpEle.classList.add("spells");
                $('levelUp_spell').innerHTML = 
                    (nextLevelObj.spells.total ? "Total spells increased by "+nextLevelObj.spells.total+"<br>" : "");
                Object.getOwnPropertyNames(nextLevelObj.spells).forEach(function(objName){
                    if (objName !== "total"){
                        $('levelUp_spell').innerHTML += nextLevelObj.spells[objName]+ " new level "+objName+" spells available";
                    }
                });
            }
            
        }
            break;
        case 'levelUp':
            populateSelect($('levelUp_class'));
            // remove any classes
            Object.keys(CLASSES).forEach(function(className){
                $('levelUp_newClass').classList.remove(className);
            });

            currentCharacter.character.class.forEach(function(className){
                $('levelUp_newClass').classList.add(className.class);
            });
        
            break;
    }
}

function addEquipmentRow(id){
    $(id).innerHTML += buildEquipmentRow(id);
}

let EQUIP_COUNT = 0;
function buildEquipmentRow(id, item){
    let itemName = "";
    let itemCount = 1;
    let itemDesc = "";
    let itemCost= "0";

    if (exists(item)){
        itemName = item;
        if (exists(item["name"])){
            itemName = item["name"];
        }
        if (exists(item["count"])){
            itemCount = item["count"];
        }
        if (exists(item["description"])){
            itemDesc = item["description"];
        }
    }
    
    let inputId = id+"_"+EQUIP_COUNT;

    let element =`<div id="${inputId}">
                <label for="${inputId}_name">Name</label>
                <input type="text" id="${inputId}_name" value="${itemName}"/>
                <label for="${inputId}_count">Count</label>
                <input type="number" pattern="[0-9]*" id="${inputId}_count" value="${itemCount}"/>`;
    if (!exists(item)){
        element += `<label for="${inputId}_cost">Cost per item</label>
                    <input type="number" pattern="[0-9]*" class="short tagAlong" id="${inputId}_cost" value="${itemCost}" min="0" />
                    <select class="tagAlong" id="${inputId}_costtype" aria-label="Coin type for cost">
                        <option value="COPPER">Copper</option>
                        <option value="SILVER">Silver</option>
                        <option value="ELECTRUM">Electrum</option>
                        <option value="GOLD">Gold</option>
                        <option value="PLATINUM">Platinum</option>
                    </select>
                </fieldset>`;
    }
    element += `<label for="${inputId}_desc">Description</label>
                <textarea id="${inputId}_desc" value="${itemDesc}"></textarea>
                <button id="${inputId}_delete">Remove</button>
                <hr>
            </div>
        `;

    return element;
}

function optionifyItem(item){
    
    let itemStr = item;
    let itemData = item;
    
    if (Array.isArray(item)){
        itemStr = item.map((i) => stringifyNameCountObj(i));
        itemData = JSON.stringify(item);
    } else if (exists(item["name"])){
        itemStr = stringifyNameCountObj(item);
        itemData = JSON.stringify(item);
    }

    return `<option value="${itemStr}" data-jsonvalue="${itemData}">${itemStr}</option>`;
}

function updateEquipment(equipId, data){
    let equipEle = $(equipId);
    let name = "character.equipment[]";

    // clear equipment array
    if (exists(findNode("character.equipment", data))) {
        data.character.equipment = [];
    }

    for (let i = 0; i < equipEle.childNodes.length; i++) {
        let child = equipEle.childNodes[i];
        switch (child.nodeName){
            case "SELECT": {
                let dataObj = getDataAttribute(getSelectValues(child.options), "jsonvalue");
                if (Array.isArray(dataObj)){
                    dataObj.forEach((obj) => insertAtNode(name, data, obj));
                } else {
                    insertAtNode(name, data, dataObj);
                }
            }
                break;
            case 'DIV':{
                let divEle = child;
                let subChild;
                let equipName;
                let equipCount = 1;
                let equipDesc;
                let equipCost;
                let equipCostType;
                for (let j = 0; j < child.childNodes.length; j++) {
                    let subChild = child.childNodes[j];
                    switch (subChild.nodeName){
                        case "INPUT": 
                        case "SELECT": 
                        case "TEXTAREA": {
                            let id = subChild.id;
                            let value = id.substring(id.lastIndexOf("_")+1);
                            switch(value){
                                case "name":
                                    equipName = subChild.value;
                                    break;
                                case "desc":
                                    equipDesc = subChild.value;
                                    break;
                                case "count":
                                    equipCount = subChild.value;
                                    break;
                                case "cost":
                                    equipCost = subChild.value;
                                    break;
                                case "costtype":
                                    equipCostType = getSelectValues(subChild).value;
                                    break;
                            }
                        }
                        default:
                    }
                }

                if (equipCost){
                    data.character.purse -= (equipCount * getAsCoin(equipCost, equipCostType));
                }

                insertAtNode(name, data, {name: equipName, count: equipCount, description: equipDesc});
                            

            }
                break;

            default:
                //don't care
        }
    }

    return data;
}

function getClass(classList, className){
    for(let i = 0; i <= classList.length; i++){
        if (classList[i].class === className){
            return classList[i];
        }
    }
    return null;
}

function deleteCharacterLoad(key, value){
    deleteCharacter(value, function(){
        // delete the value from the UI
        let tableEle = $('importFile.DBLoad.'+key);
        tableEle.parentNode.removeChild(tableEle);
    });
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
    switch($('createCharacter_character_pronoun').value) {
        case 'he':
        case 'she':
            nameList = nameList.concat(nameObj[$('createCharacter_character_pronoun').value]);
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
    let element = $('createCharacter_details_age');
    let age = race.age;
    
    element.min=age.min;
    element.max=age.max;
    
    return chooseWeightedRange(FRONT_HEAVY, age.min, age.max);
}

function chooseHeight(race) {
    let element = $('createCharacter_details_height');
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
    let element = $('createCharacter_details_weight');
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
    document
        .querySelectorAll("select[data-lookup]")
        .forEach(function(node){
            if (!hasClass(node, 'reveal-if-checked')){
                populateSelect(node);
            }
        });
    
    document
        .querySelectorAll("fieldset > div[data-lookup]")
        .forEach(function(node){
            let typeName = getDataAttribute(node, "lookup");
            populateCheckboxes(node, eval(typeName), typeName.toLowerCase());
        });
}

function randomizeDataRNG(){
    document.querySelectorAll("select[data-lookup]").forEach(function(element){
        randomValue(element);
    });
    
    document.querySelectorAll("select[data-rng]").forEach(function(element){
        let rng = eval(getDataAttribute(element, "rng", "false"));
        if (rng) {
            randomValue(element);
        }
    });;
    return true;
}

function generateAttributes() {
    let generateMethod;
    switch($('createCharacter_attr_chooser').value) {
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
        $('createCharacter_character_attribute_'+attr).value = 
            generateMethod(); 
    }
}

function changeColor(event) {
    let eleId = event.target.id;
    let swatchId = event.target.id+"_color";

    let colorSet = eval(getDataAttribute(event.target, "lookup")); 
    
    $(swatchId).style.backgroundColor = colorSet[event.target.value].color;
}

function populateSelect(selectEle) {
    
    let sourceObj = eval(getDataAttribute(selectEle, "lookup")); 
    let sort =  eval(getDataAttribute(selectEle, "sort", true));
    let type =  getDataAttribute(selectEle, "type", "String");

    if (!exists(sourceObj)){
        return;
    }


    let fragment = document.createDocumentFragment();
    let sourceArray = Array.isArray(sourceObj) ? sourceObj : Object.keys(sourceObj);

    if (sort) {
        sourceArray = sourceArray.sort();
    }

    for (let i = 0; i < sourceArray.length; i++  ) {
        let value = sourceArray[i];
        let obj = sourceObj[value];
        let name = (exists(obj) && exists(obj['name'])) ? obj.name : value;

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

    let opt;
    for ( opt in selectEle.options){
        selectEle.options.remove(opt);
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
        opt.name = "character."+typeName+"[]";
        opt.id =idValue;
        opt.onclick = function(evt) {
            let legendEle = $("createCharacter_"+typeName+"_legend");
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
    let dataholders = document.getElementsByClassName("data-createCharacter");

    // Retrieves input data from a form and returns it as a JSON object.
    let response = [].reduce.call(dataholders, (data, dataholder) => {
        for (let i = 0; i < length(dataholder.elements); i++) {
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
                    dataObj = getDataAttribute(element, "jsonvalue", element.value);
                }
                if (Array.isArray(dataObj)){
                    dataObj.forEach((obj) => insertAtNode(name, data, obj));
                } else {
                    insertAtNode(name, data, dataObj);
                }
            }
        }
        return data;
    }, {});
    
    return updateEquipment('createCharacter_equipment_equipment', response);
}


 
