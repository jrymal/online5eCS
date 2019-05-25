'use strict';

function clearAllFields(dataholders) {
    // Retrieves input data from a form and returns it as a JSON object.
    [].reduce.call(dataholders, (data, dataholder) => {
        if (!dataholder.elements) {
            return data;
        }
        for (let i = 0; i < dataholder.elements.length; i++) {
            let element = dataholder.elements[i];
            let name = element.name;

            if (element.id && isValidValue(element)) {
                if (isCheckbox(element)) {
                    element.checked = false;
                } else if (isMultiSelect(element)) {
                    console.error("Identified a MultiSelect elment to clear: "+name);
                    element.value = null;
                } else {
                    element.value = null;
                }
            }
        }
        return data;
    }, {});

    cleanUpCreateWizard();

    return true;
}
 
let installPromptEvent;

function init() {

    initDb();

    window.addEventListener('beforeinstallprompt', (event) => {
        // Prevent Chrome <= 67 from automatically showing the prompt
        event.preventDefault();
        // Stash the event so it can be triggered later.
        installPromptEvent = event;

        show($('install-app'), true);
    });

    var urlNameValue = getQueryVariable("name");
    if (urlNameValue){
        getCharacter(urlNameValue, function(event){
            setCurrentCharacter(event.target.result);
        });
    }

    populateLookups();
}

function levelUp(upgradeClass){
    // add to the selected level
    let classObj = getClass(currentCharacter.character.class, upgradeClass);
    classObj.level = +classObj.level + 1;
    currentCharacter.character.hitPoints.current = +currentCharacter.character.hitPoints.current + getMax(CLASSES[upgradeClass].hitDie);
   
    // add tp he select ability score
    if ($('levelUp_newClass').classList.contains("abilityScore")){
        let attr = $('levelUp_attribute').value;
        currentCharacter.character.attribute[attr] = +currentCharacter.character.attribute[attr] + +1;
    }
    
    return currentCharacter;
}

function levelUpMultiClass(){
    let newClass = $('multiClass_class').value;
    
    currentCharacter.character.class.push({
        class : newClass,
        level : 1
    });
    currentCharacter.character.hitPoints.current = +currentCharacter.character.hitPoints.current + getMax(CLASSES[newClass].hitDie);
   
    return currentCharacter;
}

function saveCharacter() {
    putCharacter(
        generateName(), cleanseForSave(currentCharacter), function(){});
    
    window.history.pushState(null, "",
        generateNameHash(window.location.hash));

}

let isMidFocusChange = false;
let lastFocus;
let trapFocus = function (event) {
    if (currentDialog && !isMidFocusChange) {
        isMidFocusChange = true;
        if (currentDialogDiv.contains(event.target)) {
            lastFocus = event.target;
        } else {
            selectFirstInput(currentDialogDiv);
            if(lastFocus === document.activeElement){
                selectLastInput(currentDialogDiv);
            }
            lastFocus = document.activeElement;
        }
        isMidFocusChange = false;
    }
    return true;
};

const SELECTABLE_TAGS = ['INPUT', 'SELECT','TEXTAREA','A','BUTTON'];
function selectFirstInput(divEle) {
    if (divEle && length(divEle.childNodes) > 0){
        for(let i = 0; i <= divEle.childNodes.length-1; i++) {
            let node = divEle.childNodes[i];
            if(node.tagName && SELECTABLE_TAGS.includes(node.tagName.toUpperCase())){
                node.focus();
                return document.activeElement === node;
            }
            // need to decend into elements to see if they have focusable elements
            // as well
            if(node.childNodes && node.childNodes.length > 0 && selectFirstInput(node)){
                return true;
            }
        }
    }
    return false;
}

function selectLastInput(divEle) {
    if (divEle && length(divEle.childNodes) > 0){
        for(let i = divEle.childNodes.length-1; i >= 0; i--) {
            let node = divEle.childNodes[i];
            if(node.tagName && SELECTABLE_TAGS.includes(node.tagName.toUpperCase())){
                node.focus();
                return document.activeElement === node;
            }
            // need to decend into elements to see if they have focusable elements
            // as well
            if(node.childNodes && node.childNodes.length > 0 && selectLastInput(node)){
                return true;
            }
        }
    }
    return false;
}
let closeCurrentDialog = function () {
    if (currentDialog) {
        cleanUpDialog();
        window.location.href = '#'
        return true;
    }
    return false;
  };

const ESC = 27
let handleEscape = function (event) {
    var key = event.which || event.keyCode;

    if (key === ESC && closeCurrentDialog()) {
      event.stopPropagation();
    }
  };

// Find all editable content and apply some standard events.
[].forEach.call(document.querySelectorAll("[contenteditable=true]"), function (content) {
    // When you click on item, record into `data-initialtext` content of this item.
    content.addEventListener("focus", function () {
        setDataAttribute(content,"initialtext", content.innerHTML);
        
    });

    // Exit the editing and revert
    content.addEventListener("keyup", function(event){
        var key = event.which || event.keyCode;
        if (key === ESC) {
            event.stopPropagation();
            let initialtext = getDataAttribute(content, "initialtext")
            if (initialtext  !== content.innerHTML) {
                content.innerHTML = initialtext; 
            }
        }
    });

    // When you leave an item...
    content.addEventListener("blur", function () {
        // ...if content is different...
        if (getDataAttribute(content, "initialtext") !== content.innerHTML) {

            let contentId = getDataAttribute(content, "from");
            if (!exists(contentId)){
                contentId = content.id;
            }

            insertAtNode(contentId, currentCharacter, content.innerHTML);
           
            // data is "correct" just save and update the changable parts
            saveCharacter();
            updateEmail();
            updatePhoneNumber();
        }
    });
});

let currentDialog;
let currentDialogDiv;
let preNode;
let postNode;
function hashChange(){
    var locationId = stripFirst("#",location.hash);
    cleanUpDialog();
    if(!isBlank(locationId)){
        prepopulateValues(locationId);

        currentDialog = $(locationId);
        // TODO ew...fix me better
        currentDialogDiv = currentDialog.childNodes[1];

        var preDiv = document.createElement('div');
        preNode = currentDialog.insertBefore(preDiv, currentDialog.firstChild);
        preNode.tabIndex = 0;
        var postDiv = document.createElement('div');
        postNode = currentDialog.insertBefore(postDiv, currentDialog.lastChild);
        postNode.tabIndex = 0;
        
        document.addEventListener('focus', trapFocus, true);
        document.addEventListener('keyup', handleEscape);   
        
        selectFirstInput(currentDialogDiv);
    }
}

function cleanUpDialog(){
    if (currentDialog){
        currentDialog.removeChild(preNode);
        currentDialog.removeChild(postNode);
        document.removeEventListener('focus', trapFocus);
        document.removeEventListener('keyup', handleEscape);   
        currentDialog = null;
        currentDialogDiv = null;
    }
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

function installApp() {

    show($('install-app'), false);
  
    // Show the modal add to home screen dialog
    installPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    installPromptEvent.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
          console.debug('User accepted the A2HS prompt');
        } else {
          console.debug('User dismissed the A2HS prompt');
        }
        // Clear the saved prompt since it can't be used again
        installPromptEvent = null;
    });
}

function generateCharacterName(character){
    var charName = character.character.name.first;
    if (character.character.name.family){
        charName += ' '+character.character.name.family;
    }
    return charName;
}

function generateNameHash(hash){
    var resp = "index.html";
    var generatedName = generateName();
    if (generatedName) {
        resp += '?name=' + encodeURIComponent(generatedName);
    }
    return resp;
}

function generateName() {
    
    if (currentCharacter && currentCharacter.player) {
        var playerName = currentCharacter.player.name;
        var charName = generateCharacterName(currentCharacter);
        if (playerName && charName) {
            return playerName + '-' + charName;
        }
    }

    return null;
}

//
// Loading Functionality
//
function loadByKey(keyToLoad){
    // : load from db
    getCharacter(keyToLoad, function(event){
        setCurrentCharacter(event.target.result);
        closeCurrentDialog();
    });

}

function loadFromJSON() {
    // load from file
    let reader = new FileReader();
    reader.onload = function(evt) {
        setCurrentCharacter(JSON.parse(evt.target.result));
        closeCurrentDialog();
    };
    reader.onerror = function(evt) {
        console.error("Error:"+evt.target.result);
    };
    reader.readAsText($('importFile_importFile').files[0]);
}

function getMaxHitPoints(classList) {
    let val = classList.reduce( (hits, curClass) => {
        return +hits + (+curClass.level * getMax(CLASSES[curClass.class].hitDie));
    }, 0);
    return val;
}

function getCurrentLevel(classList) {
    let val = classList.reduce( ( count, curClass) => {
        return +count + +curClass.level;
}, 0);
    return val;
} 

function setHref(linkId, href){
    $(linkId).href = href;
}

let currentCharacter;
function setCurrentCharacter(character){
    clearAllFields(document.getElementsByClassName("stack"));
    
    let race = clone(RACES[character.character.race]);
    // remove fluff
    delete race.names;
    
    let totalLevel = getCurrentLevel(character.character.class);
    let backstory = BACKSTORIES[character.character.backstory.type];
    
    insertAtNode("character.experience", character, "0", false);
    insertAtNode("character.inspiration", character, false, false);
    
    let maxHitPoints = getMaxHitPoints(character.character.class);
    insertAtNode("character.hitPoints.max", character, maxHitPoints, true);
    insertAtNode("character.hitPoints.current", character, maxHitPoints, false);
    
    currentCharacter = character;
    
    applyLevelBasedRaceFeatures(character, race, totalLevel);

    saveCharacter();
    
    Object.defineProperty(currentCharacter, "RACE",  {writable: true, configurable: true, enumerable: true, value:race});

    let summedClass = {};
    character.character.class.forEach(function(classItem){
        let className = classItem.class;
        let classLevel = classItem.level;
        let charClass = CLASSES[className];
        getCumulativeClassForLevel(charClass, classLevel, summedClass);
    });

    let attr = {};

    Object.getOwnPropertyNames(ATTRIBUTES).forEach(function(attrName){
        Object.defineProperty(attr, attrName,  
            {
                writable: true, 
                configurable: true, 
                enumerable: true, 
                value:getAttributeObject(
                    currentCharacter.character.attribute[attrName],
                    race.attribute[attrName], 
                    getSkillsForAttr(attrName, character.character.skills),
                    getClassProfForAttr(attrName, character.character.class, totalLevel)
                ),
            });
    });

    let calc = {
        attribute:attr,
        proficiency: getProficiencies(character, race, backstory, character.character.class),
        savingThrows: getSavingThrows(character.character.class, totalLevel),
        class: summedClass,
        classes: character.character.class.map((classItem) => classItem.class)
    };

    Object.defineProperty(currentCharacter, "CALC",  {writable: true, configurable: true, enumerable: true, value:calc});
    
    let dataholders = document.getElementsByClassName("stack");

    // handles evaluation so make sure all data handling is done at this point
    [].reduce.call(dataholders, (data, dataholder) => {
        if (dataholder && dataholder.childNodes) {
            processDataHolder(dataholder);
        }
        return data;
    }, {}); 
    
    if (currentCharacter){
        $('rootNode').classList.remove("nocharacter");
    }

    updateEmail();
    updatePhoneNumber();
    
    return true;
}

function applyLevelBasedRaceFeatures(character, race, totalLevel){
    let levelObj = race.level;
    if (levelObj){
    
        for (let level = 0; level <= totalLevel; level++){
            if (levelObj[level]){
                for (let type in levelObj[level]){
                    switch(type){
                        case 'spells':
                            addSpell(race, levelObj[level].spells);
                            break;
                        case 'feature':
                            race.features = race.features.concat(levelObj[level].feature);
                            break;
                        default:
                            console.error("Unhandled type: "+type);

                    }
                }
            }
        }
    }
}

function addSpell( typeObj, spellNames ) {
    $('rootNode').classList.add("spellcaster");
    
    // ensures that the path exists
    if (!exists(typeObj.spells)){
        insertAtNode("spells", typeObj, new Array());
    }

    appendForSet(typeObj.spells, spellNames);
}

function getSavingThrows(classList, totalLevel){
    let resp = {};
    let profBonus = LEVEL[totalLevel].proficiencyBonus;

    classList.forEach(function(classItem){
        let classN = classItem.class;
        CLASSES[classN].savingThrowProficiency.forEach(function(attrItem){
            appendForSet(resp, performNameLookup("ATTRIBUTES",attrItem) + " (+"+profBonus+")");
        });
    });

    return Object.keys(resp).sort();
}                        

function getHitDie(classList){
    let maxDie = 0;
    for (let i = 0; i < classList.length; i++){
        let classN = classList[i].class;
        let charClass = CLASSES[classN];
        maxDie = Math.max(maxDie, getMax(charClass.hitDie));
    }
    return 'd'+maxDie;
}        

function getCumulativeClassForLevel(curClass, level, modClass = {}){
    
    for(var i = 1; i <= level; i++){
        // use the working data....again frozen!
        var specs = curClass.level[i];
  
        Object.getOwnPropertyNames(specs).forEach(function(name) {
            let dataValue = specs[name];

            if (modClass[name]){
                switch(typeof dataValue){
                    case "Array":
                    case "array":
                        addAll(modClass[name],dataValue);
                        break;
                    case "Number":
                    case "number":
                        modClass[name] += dataValue;
                        break;
                    case "Object":
                    case "object":
                        if (Array.isArray(dataValue)){
                            addAll(modClass[name], dataValue);
                        } else {
                            Object.getOwnPropertyNames(dataValue).forEach(function(objName){
                                insertAtNode(objName, modClass[name], clone(dataValue[objName]), true);
                            });
                        }
                        break;
                    case "String":
                    case "string":
                    default:
                        console.error("Unhandled type: "+typeof dataValue+" name:"+name+" value:"+dataValue);
                }
            } else {
                insertAtNode(name, modClass, clone(dataValue));
            }
        });
    }
    
    // removed useless level information
    delete modClass.level;
    
    return modClass;
}
 
function getProficiencies(character, race, backstory, classList){
    let resp = {};
    appendForSet(resp, character.character.proficiency);
    appendForSet(resp, race.proficiency);
    appendForSet(resp, backstory.proficiency);
    
    for (let i = 0; i < classList.length; i++){
        let classN = classList[i].class;
        let charClass = CLASSES[classN];
        appendForSet(resp, charClass.proficiency);
    }

    return Object.keys(resp).sort();
}

function appendForSet(object, dataset) {
    if (dataset) {
        // break strings into an array then handle the array
        if ((typeof dataset) === "string"){
            dataset = dataset.split("\n");
        }
        
        if (Array.isArray(dataset)){
            dataset.forEach( (ele) =>  addObject(object, ele));
        }else if ((typeof dataset) === "object"){
            // single object
            addObject(object, dataset);
        } else {
            // ew...what to do!!!!
            console.error("Unhandled type: "+(typeof dataset));
        }
    }
}

function addObject(object, ele){
    if (Array.isArray(object)){
        if (!object.includes(ele)){
            object.push(ele);
        }
    } else {
        /// BAD????
        Object.defineProperty(object, ele,  {writable: true, configurable: true, enumerable: true, value:true});
    }
}


function getSkillsForAttr(attributeId, skillsArray) {
    let cnt = 0;

    skillsArray.forEach(function(skillName){
        let skill = SKILLS[skillName];
        if (attributeId === skill.attribute) {
            cnt++;
        }
    });

    return cnt;
}

function getClassProfForAttr(attrName, classList, totalLevel){

    let value = 0;;
    let profBonus = LEVEL[totalLevel].proficiencyBonus;

    classList.forEach(function(classItem){
        let classN = classItem.class;
        if (CLASSES[classN].savingThrowProficiency.includes(attrName)){
            value = profBonus;
        }
    });

    return value;;
}
                               
function cleanseForSave(obj) {
    let cln = clone(obj);
    delete cln.CALC;
    delete cln.RACE;
    downloadToFile($('downloadCharacter'), cln);
    return cln;
}

function getAttributeObject(characterAttribute, raceAttribute, skillsForAttr, proficiencyST) {
    let raceAttr = exists(raceAttribute) ? raceAttribute : 0;
    let total = +characterAttribute + +raceAttr;
    let saveBonus = Math.floor((total-10)/2);
    return {
        raceModifier: raceAttr,
        total: total,
        savingThrow: saveBonus,
        passiveSavingThrow: 10 + +saveBonus + +skillsForAttr + +proficiencyST, 
        proficiencySavingThrow: proficiencyST
    };
}

function stringifyNameCountObj(value)
{
    let name = value["name"] ? value["name"] : value;
    let count = value["count"] ? value["count"] : "";
    if (isBlank(count)){
        return name;
    }
    return name + " (" + count + ")";
}

function renderUlArray(values) {
    return  `<ul>
        ${values
            .map(stringifyNameCountObj)
            .sort()
            .map((ele) => `<li>${ele}</li>`).join("")}
    </ul>`;
}

function processDataHolder(dataholder){
    for (let i = 0; i < dataholder.childNodes.length; i++) {
        let element = dataholder.childNodes[i];
        
        let loadValueFrom = getDataAttribute(element, 'from', element.name);

        // only follow elements with ids that are not anchors
        if (loadValueFrom && element.tagName != "A"){
            let node = findNode(loadValueFrom, currentCharacter);
            if (!specialHandler(loadValueFrom, element, node)){
                let lookup = getDataAttribute(element, "lookup");

                // alter to handle the values
                if (Array.isArray(node)){
                    node = renderUlArray(lookup ? performNameLookups(lookup, node) : node);
                } else if (node && typeof node === 'object') {
                    node = renderUlArray(Object.keys(node).map(function(key){
                       return key+": "+node[key]; 
                    }));
                } else if (lookup && node) {
                    let nodeValue =  performNameLookup(lookup, node);
                    node = nodeValue ? nodeValue : node;
                }
                
                // process values into understood units
                if (isCheckbox(element)) {
                    element.checked = node;
                } else if (element.tagName == "INPUT"){
                    element.value = node;
                } else if (isContentEditable(element)){
                    console.log(node);
                    element.innerHTML = isBlank(node) ? "" : node;
                } else {
                    element.innerHTML = ((typeof node === "undefined") ||  (node === NaN)) ? "" : node;
                 
                    // prevent showing a literal value of 0 in some circumstances
                    let showEle = (getDataAttribute(element, "show-always", "false") == "true") 
                        || (!((getDataAttribute(element, 'show-0', "true") == "false")  
                            && (element.innerHTML == "0")) 
                            && (element.innerHTML != ""));
                    
                    show(element, showEle);
                }
            }
        }

        if (element.childNodes && element.childNodes.length > 0) {
            processDataHolder(element);
        }
    } 
}

function renderTrForClass(classInfo){
    let classObj = CLASSES[classInfo.class];
    return `<tr>
        <th scope="row"> ${classInfo.class}</th>
        <td>${classInfo.level}</td>
        <td>${classObj.hitDie}</td>
    </tr>`
}

function renderTrForSkill(node){
    let skill = SKILLS[node];
    return `<tr>
        <th scope="row">${skill.name}</th>
        <td>${calculateSkillBonus(skill.attribute)}</td>
    </tr>`; 
}

function usePurse( addDec ) {
    insertAtNode("purse", currentCharacter.character, 0, false);
    let newValueInCp = getAsCoin($("purse_value").value, getSelectValues($("purse_type")).value);

    if (addDec === '+'){
        currentCharacter.character.purse += newValueInCp;
    } else {
        currentCharacter.character.purse -= newValueInCp;
    }
    
    setCurrentCharacter(currentCharacter);
}

function specialHandler(id, element, node){
    switch(id){
        case 'character.class':
            element.innerHTML = node ? node.map(renderTrForClass).join("") : "";
            return true;
        case "character.details.eyecolor":
        case "character.details.hair":
        case "character.details.skin":
            let colorObj = performObjectLookup(getDataAttribute(element, "lookup"), node); 
            if (colorObj){
                element.innerHTML = colorObj.name;
                let nid = id.replace(/[.]/g,'_')+'_color';
                $(nid).style.backgroundColor = colorObj.color;
            }
            return true;
        case 'character.details.height':
            element.innerHTML = Math.floor(node/12)+'\' '+ Math.floor(node%12) +'"';
            return true;
        case 'character.skills':
            element.innerHTML = node ? node.map(renderTrForSkill).join("") : "";
            return true;
        case 'character.purse':
            element.innerHTML = renderCoin(node);
            return true;
    }
    return false;
}

function calculateSkillBonus(attr) {
    return eval('currentCharacter.CALC.attribute.'+attr+'.savingThrow')+classBonus(attr);
}

function classBonus(attr){
    return 0;
}

function performObjectLookup(lookup, node){
    return eval(lookup+'["'+node+'"]')
}

function performNameLookups(lookup, node){
    return node.map(function(item){
        return performNameLookup(lookup,item);
    });
}

function performNameLookup(lookup, node){
    let objLookup = performObjectLookup(lookup, node);
    if(objLookup){
        return objLookup.name;
    }
    return "";
}

function downloadToFile(link, character) {
    link.href = 'data:text/javascript;charset=utf-8,'
        + encodeURIComponent(JSON.stringify(character));
    link.download = encodeURIComponent(character.character.name.first)
        + '_'+character.character.class[0].level+'.json' 
}

function beforeUnload(){
    // set last settings into history
    if (currentCharacter){
        saveCharacter();
        
        // Ask if there are changes they's like to save
        return "Discard changes?";
    }
}

function updatePhoneNumber() {
    updateLink(currentCharacter.player.phone, 'player.phone.link', 'tel:+', 'Call', "player.phone.display");
}

function updateEmail() {
    updateLink(currentCharacter.player.email, 'player.email.link', 'mailto:', 'Email', "player.email.display");
}

function updateLink(value, linkId, hrefPrefix, linkText, spanId) {
    let valueLink = $(linkId);
    let valueSpan = $(spanId);
    let isblank = isBlank(value);
    show(valueLink, !isblank);

    if (!isblank) {
        valueLink.href = hrefPrefix+value;
        valueLink.innerHTML = linkText;
        valueSpan.innerHTML = value;
    } else {
        valueLink.href = "";
    }
}
