'use strict';

let currentTab = 0; // Current tab is set to be the first tab (0)
let callbackFunction = null;

function showWizardTab(n) {

    // This function will display the specified tab of the form ...
    let x = document.getElementsByClassName("wizardScreen");
    x[n].style.display = "block";

    selectFirstInput(x[n]);

    // ... and fix the Previous/Next buttons:
    document.getElementById("prevBtn").style.display = n == 0 ? "none" : "inline";
    document.getElementById("nextBtn").innerHTML = n == (x.length - 1) ? "Submit" : "Next";
    
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)

    prepopulateValues(x[n]);
}

function prepopulateValues(form){
    switch(form.id) {
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
            setIfExistsAndEmpty('createCharacter.details.age', chooseAge(race));
            setIfExistsAndEmpty('createCharacter.details.height', chooseHeight(race));
            setIfExistsAndEmpty('createCharacter.details.weight', chooseWeight(race));
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
            chooseCheckbox("createCharacter.language.legend", "languages.", "languages", race, backstory);
        }
            break; 
    }    
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
    
    element.min=height.min;
    element.max=height.max;
    
    return chooseWeightedRange(BELL, height.min, height.max);
}

function chooseWeight(race) {
    let weight = race.size.weight;
    return chooseWeightedRange(BELL, weight);
}

function chooseCheckbox(legendId, idPrefix, attribute, race, backstory){
    let unusedSlots = 0;
    unusedSlots += checkCheckboxes(idPrefix, race[attribute]);
    unusedSlots += checkCheckboxes(idPrefix, backstory[attribute]);
    
    let legend = $(legendId);
    legend.innerHTML = "choose "+unusedSlots+" more";
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

function nextPrev(n) {
    // This function will figure out which tab to display
    let x = document.getElementsByClassName("wizardScreen");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()){
        return false;
    }
    
    // Hide the current tab:
    x[currentTab].style.display = "none";
    
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        // .. generate the json object
        callbackFunction(generateDataToJSON());
    } else {
        // Otherwise, display the correct tab:
        showWizardTab(currentTab);
    }
}

function validateForm() {
    let x = document.getElementsByClassName("wizardScreen");
    let currentForm = x[currentTab];
    let valid = currentForm.checkValidity(); 

    // could use the validity object to add top level error messages....

    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    let i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}

function initWizard(callback) {
    currentTab = 0;

    callbackFunction = callback;
    
    populateLookups();
    
    showWizardTab(0);
}

function populateLookups(){
    let i,nodes = document.querySelectorAll("select[data-lookup]");
    for (i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        populateSelect(node, eval(getDataAttribute(node, "lookup")))
    }
    nodes = document.querySelectorAll("fieldset > div[data-lookup]");
    for (i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        let typeName = getDataAttribute(node, "lookup");
        populateCheckboxes(node, eval(typeName), typeName.toLowerCase());
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
    for(let i = 0; i < ATTRIBUTE_ID_LIST.length; i++) {
        $('createCharacter.character.attribute.'+ATTRIBUTE_ID_LIST[i]).value = 
            generateMethod(); 
    }
}

function populateSelect(selectEle, sourceObj) {
    let fragment = document.createDocumentFragment();
    let sourceArray = Object.keys(sourceObj).sort();

    for (let i = 0; i < sourceArray.length; i++  ) {
        let value = sourceArray[i];
        let obj = sourceObj[value];

        // create base class
        let opt = document.createElement('option');
        opt.innerHTML = obj.name ? obj.name : value;
        opt.value = value;

        fragment.appendChild(opt);
    }

    selectEle.appendChild(fragment);
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
            }
            if (isValidElement(element) && isValidValue(element)) {
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


 
