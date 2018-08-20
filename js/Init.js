'use strict';

const ATTRIBUTE_ID_LIST = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];

function length(array){
    return array ? array.length : 0;
}

function findNode(jsonPath, searchObj) {
    let pathItems = jsonPath.split('.');
    let objItem = searchObj;
    for(let i = 0; i < pathItems.length; i++) {
        let pathItem = pathItems[i];
        let brakIdx = pathItem.indexOf("[");
        let isArray = brakIdx > -1;
        pathItem = isArray ? pathItems[i].substr(0,brakIdx) : pathItems[i];
        
        if (isArray) {
            // does not support arrays currently
            return null;
        } else if (!objItem[pathItem]){
            // does not exist
            return null;
        }
        objItem = objItem[pathItem];
    }
    return objItem;
}

function insertAtNode(jsonPath, searchObj, insertObj, overwrite = true) {
    if (findNode(jsonPath, searchObj) && !overwrite) {
        return;
    }
    let pathItems = jsonPath.split('.');
    let objItem = searchObj;
    for(let i = 0; i < pathItems.length; i++) {
        let pathItem = pathItems[i];
        let brakIdx = pathItem.indexOf("[]");
        let isArray = brakIdx > -1;
        let lastNode = i == (pathItems.length - 1);
        pathItem = isArray ? pathItems[i].substr(0,brakIdx) : pathItems[i];

        if (!Object.keys(objItem).includes(pathItem)) {
            Object.defineProperty(objItem, pathItem,  {
                writable: true, 
                configurable: true, 
                enumerable: true, 
                value:lastNode ? insertObj : isArray ? [] : {}
            });
        }else if (lastNode){
            Object.defineProperty(objItem, pathItem, {
                writable: true, 
                configurable: true,
                value:insertObj
            });
        }
        
        objItem = objItem[pathItem];
        if (isArray){
            let foundMissingIdx = false;
            let j = 0;
            if (!lastNode){
                let nextPathItem = pathItems[i+1];
                for(j = 0; j < objItem.length; j++) {
                    if (!objItem[j][nextPathItem]){
                        foundMissingIdx = true;
                        break;
                    }
                }
            }
            if (!foundMissingIdx){
                // returns length
                j = objItem.push({}) - 1;
            }

            objItem = objItem[j];
        }
    }
}

function $(id, prefix = '') {
    return document.getElementById(isBlank(prefix) ? id : prefix+'.'+id);
}

function isBlank(stringValue) {
    return stringValue === null || stringValue === "" || !stringValue;
}

function hasClass(element, className){
    return element.classList.contains(className);
}
 
function toggle(element) {
    show(element, !isVisible(element));
}

function show(element, vis = true){
    // unclear why this doesn't work in chrome
    // element.classList.toggle("hidden", !vis);
    vis ? element.classList.remove("hidden") : element.classList.add("hidden");
}

function isVisible(element) {
    return !hasClass(element, "hidden");
}

function stripFirst(matchChar, string){
    let index = string.indexOf(matchChar);
    if (index>=0){
        return string.split(matchChar)[1];
    }
    return string;
}

function isValidElement(element){
  return element.value && isVisible(element);
};

function isValidValue(element){
  return (!['checkbox', 'radio'].includes(element.type) || element.checked);
};

function isCheckbox(element){
    return element.type === 'checkbox';
}

function isMultiSelect(element) {
    return element.options && element.multiple;
}

function getSelectValues(options) {
    return [].reduce.call(options, (values, option) => {
        return option.selected ? values.concat(option.value) : values;
    }, []);
}

function clearAllFields() {
    // unclear if this is doing what it needs to
  let dataholders = document.getElementsByClassName("stack");

  // Retrieves input data from a form and returns it as a JSON object.
  return  [].reduce.call(dataholders, (data, dataholder) => {
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
                  console.log("Identified a MultiSelect elment to clear: "+name);
              } else {
                  element.value = null;
              }
          }
      }
      return data;
  }, {});
}
 
let installPromptEvent;

function init() {
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent Chrome <= 67 from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later.
      installPromptEvent = event;

      show($('install-app'), true);
    });

    // Check for a previous state in the history on load
    if (window.history.state){
        // apply the data found in the previous state
        setCurrentCharacter(window.history.state);
    }
}

function installApp() {

    show($('install-app'), false);
  
    // Show the modal add to home screen dialog
    installPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    installPromptEvent.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        // Clear the saved prompt since it can't be used again
        installPromptEvent = null;
    });
}

function generateNameHash(hash){
    if (!currentCharacter || !currentCharacter.player) {
        return null;
    }

    var playerName = currentCharacter.player.name;
    var charName = currentCharacter.character.name.first;
    var resp = "index.html";
    if (playerName && charName) {
        resp += '?' + playerName + '_' + charName;
    }
    return resp;
}

//
// Loading Functionality
//
function loadFromJSON() {
    if (confirm("Loading will clear out all values. Continue?")) {
        let reader = new FileReader();
        reader.onload = function(evt) {
            setCurrentCharacter(JSON.parse(evt.target.result));
        };
        reader.onerror = function(evt) {
            console.log("Error:"+evt.target.result);
        };
        reader.readAsText($('importFile').files[0]);
    }
}

function startWizard() {
    showModal('createCharacter', function() {
        initWizard(function(result) {
            setCurrentCharacter(result);
            show($('modalOverlay'), false);
        });
    });
}

function getMaxHitPoints(classList) {
    let hits=0;
    for (let i = 0; i < classList.length; i++){
        let charClass = CLASSES[classList[i].class];
        hits += classList[i].level * getMax(DICE[charClass.hitDie]);
    }
    return hits;
}

let currentCharacter;
function setCurrentCharacter(character){
    clearAllFields();
    
    let race = RACES[character.character.race];
    let backstory = BACKSTORIES[character.character.backstory.type];
    
    insertAtNode("character.experience", character, "0", false);
    insertAtNode("character.inspiration", character, false, false);
    
    let maxHitPoints = getMaxHitPoints(character.character.class);
    insertAtNode("character.hitPoints.max", character, maxHitPoints, false);
    insertAtNode("character.hitPoints.current", character, maxHitPoints, false);
    
    currentCharacter = character;

    window.history.pushState(cleanseForSave(currentCharacter), "",
        generateNameHash(window.location.hash));
    updateEmail();
    updatePhoneNumber();
    
    Object.defineProperty(currentCharacter, "RACE",  {writable: true, configurable: true, enumerable: true, value:race});

    let calc = {
        attribute:{
            strength: getAttributeObject(currentCharacter.character.attribute.strength,
                race.attribute.strength, getSkillsForAttr('strength', character.character.skills)),
            dexterity: getAttributeObject(currentCharacter.character.attribute.dexterity,
                race.attribute.dexterity, getSkillsForAttr('dexterity', character.character.skills)),
            constitution: getAttributeObject(currentCharacter.character.attribute.constitution,
                race.attribute.constitution, getSkillsForAttr('constitution', character.character.skills)),
            intelligence: getAttributeObject(currentCharacter.character.attribute.intelligence,
                race.attribute.intelligence, getSkillsForAttr('intelligence', character.character.skills)),
            wisdom: getAttributeObject(currentCharacter.character.attribute.wisdom,
                race.attribute.intelligence, getSkillsForAttr('wisdom', character.character.skills)),
            charisma: getAttributeObject(currentCharacter.character.attribute.charisma,
                race.attribute.charisma, getSkillsForAttr('charisma', character.character.skills))
        },
        proficiency: getProficiencies(character, race, backstory, character.character.class),
        savingThrows: getSavingThrows(character.character.class),
        features: getClassFeatures(character.character.class)
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
     
}

function getSavingThrows(classList){
    let resp = {};

    for (let i = 0; i < classList.length; i++){
        let classN = classList[i].class;
        let charClass = CLASSES[classN];
        appendForSet(resp, charClass.savingThrowProficiency);
    }
    
    return Object.keys(resp).sort();
}                        

function getHitDie(classList){
    let maxDie = 0;
    for (let i = 0; i < classList.length; i++){
        let classN = classList[i].class;
        let charClass = CLASSES[classN];
        maxDie = Math.max(maxDie, getMax(DICE[charClass.hitDie]));
    }
    return 'd'+maxDie;
}        

function getClassFeatures(classList){
    let resp = {};
    for (let i = 0; i < classList.length; i++){
        let classN = classList[i].class;
        let charClass = CLASSES[classN];
        appendForSet(resp, charClass.features);
    }

    return Object.keys(resp).sort(); 
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
        switch(typeof dataset){
            case "object":
            case "array":
            case "Array":
                dataset.forEach( function(ele){
                    Object.defineProperty(object, ele,  {writable: true, configurable: true, enumerable: true, value:true});

                });
                break;
            case "String":
            case "string":
                dataset.split("\n").forEach(function(ele){
                    Object.defineProperty(object, ele,  {writable: true, configurable: true, enumerable: true, value:true});

                });              
                break;
            default:
                // ew...what to do!!!!
                console.log("Unhandled type: "+typeof dataset);

        }
    }
}

function getSkillsForAttr(attributeId, skillsArray) {
    let cnt = 0;
    for(let i = 0; skillsArray && i < skillsArray.length; i++) {
        let skillName = skillsArray[i];
        let skill = SKILLS[skillName];
        if (attributeId === skill.attribute) {
            cnt++;
        }
    }

    return cnt;
}
                               
function cleanseForSave(obj) {
    let cln = clone(obj);
    delete cln.CALC;
    delete cln.RACE;
    return cln;
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function exists(obj){
    return obj && typeof obj !== "undefined";
}

function getAttributeObject(characterAttribute, raceAttribute, skillsForAttr) {
    let raceAttr = exists(raceAttribute) ? raceAttribute : 0;
    let total = +characterAttribute + +raceAttr;
    let saveBonus = Math.floor((total-10)/2);
    return {
        raceModifier: raceAttr,
        total: total,
        savingThrow: saveBonus,
        passiveSavingThrow: 10 + +saveBonus + +skillsForAttr 
    };
}

function getDataAttribute(element, dataName){
     return element.dataset ? element.dataset[dataName] : element.getAttribute("data-"+dataName);                                             
}

function setDataAttribute(element, dataName, value){
     if (element.dataset){
         element.dataset[dataName] = value;
     } else {
         element.setAttribute("data-"+dataName, value);
     }
}
 
function processDataHolder(dataholder){
    for (let i = 0; i < dataholder.childNodes.length; i++) {
        let element = dataholder.childNodes[i];
        
        if (element.id){
            let lookup = getDataAttribute(element, "lookup");

            let node = findNode(element.id, currentCharacter);
            if (!secialHandler(element.id, element, node)){
                // alter to handle the values
                if (Array.isArray(node)){
                    let value = "<ul>";
                    for(let i = 0; i < node.length; i++){
                        value += "<li>";
        
                        if (lookup) {
                            value += performLookup(lookup, node[i]);
                        } else {
                            value += node[i];
                        }
                        value += "</li>";
                    }
                    value += "</ul>";
                    node = value;
                } else if (lookup && node) {
                    let nodeValue =  performLookup(lookup, node);
                    node = nodeValue ? nodeValue : node;
                }
                
                // process values into understood units
                if (isCheckbox(element)) {
                    element.checked = node;
                } else if (element.tagName == "INPUT"){
                    element.value = node;
                } else {
                    element.innerHTML =  typeof node === "undefined" ||  node === null ? "" : node;
                
                    if (element.tagName != "TD"){ 
                        show(element, element.innerHTML != "");
                    }
                }
            }
        }

        if (element.childNodes && element.childNodes.length > 0) {
            processDataHolder(element);
        }
    } 
}

function secialHandler(id, element, node){
    switch(id){
        case 'character.class':
            element.innerHTML = '';
            for( let i = 0; i < node.length; i++){
                let classObj = CLASSES[node[i].class];
                element.innerHTML += '<tr>'
                    +'<th scope="row">'+node[i].class+'</th>'
                    +'<td>'+node[i].level+'</td>'
                    +'<td>'+classObj.hitDie+'</td>'
                    +'</tr>';
            }
            return true;
            break;
    }
    return false;
}

function performLookup(lookup, node){
    return eval(lookup+'["'+node+'"].name')
}

function openCharacter() {
    showModal('importFromFile');
}

function viewCurrentCharacter() {
    showModal('createCharacter');
}

function viewPurse() {
    showModal('purseUpdate');
}

function showModal(modelId, initFunc){
    // Bring in the import content.
    let link = document.querySelector('link[rel="import"][id="'+modelId+'"]');
    
    if (!link) {
        console.log("Link Mismatch: "+modelId);
        return;
    }

    if (link.import){
        loadModal(modelId, link.import, initFunc);
    } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                loadModal(modelId, xhttp.response, initFunc);
            }
        };
        xhttp.responseType = 'document';
        xhttp.open("GET", link.href, true);
        xhttp.send();
    }
}

function loadModal(modelId, importDom, initFunc){
    let modalDiv = $('modalOverlay');
    let modalTitleDiv = $('modal.title');
    let modalDescDiv = $('modal.description');
    let modalBodyDiv = $('modal.body');
    
    // Clone the <template> in the import.
    let titleEle = importDom.querySelector('title');
    let descEle = importDom.querySelector('description');

    // need to clear out before adding the new elements
    modalBodyDiv.innerHTML="";

    modalTitleDiv.innerHTML = titleEle ? titleEle.innerHTML : "";
    modalDescDiv.innerHTML = descEle ? descEle.innerHTML : "";
    
    let templateEle = importDom.querySelector('template');
    
    modalBodyDiv.appendChild(document.importNode(templateEle.content ? templateEle.content : templateEle.innerHTML, true));

    //focus will not work if the panel is not displaying...
    show(modalDiv);
    initFunc();
}

function cancelModal() {
    show($('modalOverlay'), false);
}

const SELECTABLE_TAGS = ['INPUT', 'SELECT','TEXTAREA'];
function selectFirstInput(divEle) {
    for(let i = 0; i < divEle.childNodes.length; i++) {
        let node = divEle.childNodes[i];
        if(node.tagName && SELECTABLE_TAGS.includes(node.tagName.toUpperCase())){
            node.focus();
            return true;
        }
        // need to decend into elements to see if they have focusable elements
        // as well
        if(node.childNodes && node.childNodes.length > 0 && selectFirstInput(node)){
            return true;
        }
    }
    return false;
}

function downloadToFile(link) {
    link.href = 'data:text/javascript;charset=utf-8,'
        + encodeURIComponent(JSON.stringify(currentCharacter));
    link.download = encodeURIComponent(currentCharacter.name)
        + '_'+currentCharacter.level+'.json' 
}

function beforeUnload(){
    // set last settings into history
    window.history.pushState(cleanseForSave(currentCharacter), "",
        generateNameHash(window.location.hash));
    
    // Ask if there are changes they's like to save
    return "Discard changes?"; 
}

function updatePhoneNumber() {
    updateLink(currentCharacter.player.phone, 'player.phone', 'tel:+', 'Call ');
}

function updateEmail() {
    updateLink(currentCharacter.player.email, 'player.email', 'mailto:', 'Send email to ');
}

function updateLink(value, linkId, hrefPrefix, innerHtmlPrefix) {
    let valueLink = $(linkId);
    let isblank = isBlank(value);
    show(valueLink, !isblank);

    if (!isblank) {
        $(linkId).href = hrefPrefix+value;
        $(linkId).innerHTML = innerHtmlPrefix+value;
    }
}
