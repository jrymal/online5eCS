'use strict';

let currentTab = 0; // Current tab is set to be the first tab (0)
let callbackFunction = null;

function showWizardTab(n) {

    // This function will display the specified tab of the form ...
    let x = document.getElementsByClassName("wizardScreen");
    x[n].style.display = "block";

    selectFirstInput(x[n]);

    // ... and fix the Previous/Next buttons:
    document.getElementById("prevBtn").disabled = n == 0;
    document.getElementById("nextBtn").innerHTML = n == (x.length - 1) ? "Submit" : "Next";
    
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)

    prepopulateValues(x[n]);
}

function addClass() {
    
    var selectedEle = $("createCharacter.character.class.type");
    var levelEle = $("createCharacter.character.level");
    var tableEle = $("createCharacter.character.class.tbody");
    var className = selectedEle.value;
    var selIdx = selectedEle.selectedIndex;

    tableEle.innerHTML += '<tr id="createCharacter.character.class.tableele.'+className+'">'
        +"<th>"+className+'<input type="hidden" name="character.class[].class" value="'+className+'"/></th>'
        +"<td>"+levelEle.value+'<input type="hidden" name="character.class[].level" value="'+levelEle.value+'"/></td>'
        +'<td><button type="button" onClick="removeClass(\''+className+'\')">remove</button></td>'
        +"</tr>";              

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

function toggleMultiClass(){
    var multiNodes = document.getElementsByClassName("multiclass");
    [].reduce.call(multiNodes, (data, node) => {
        toggle(node);
        return data;
    },{});
    
    $("multiClassEnable").innerHTML = isVisible(multiNodes[0])
    ? "Disable Multiclass"
    : "Enable Multiclass";
}

function postProcessStep(form){
    switch(form.id) {
        case 'createCharacter.class':
            if ($('createCharacter.character.class.tbody').childElementCount == 0){
                addClass();
            }
            break;
    }
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
            chooseCheckbox("createCharacter.languages.legend", "languages.", "languages", race, backstory);
        }
            break;
         case 'createCharacter.class':
            let table = $('createCharacter.character.class.tbody');
            if (table.childElementCount == 1 
                && !isVisible(document.getElementsByClassName("multiclass")[0])){
                table.innerHTML = "";
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
        postProcessStep(currentForm);
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


 
