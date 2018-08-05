'use strict';

const ATTRIBUTE_ID_LIST = ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"];

function findNode(jsonPath, searchObj) {
    let pathItems = jsonPath.split('.');
    let objItem = searchObj;
    for(let i = 0; i < pathItems.length; i++) {
        if (!objItem[pathItems[i]]) {
            return null;
        }
        objItem = objItem[pathItems[i]];
    }
    return objItem;
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

function getElementByXpath(path) {
  return document.evaluate(path, document, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function stripFirst(matchChar, string){
    let index = string.indexOf(matchChar);
    if (index>=0){
        return string.split(matchChar)[1];
    }
    return string;
}

function isValidElement(element){
  return element.id && element.value && !(element.readOnly);
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
  let dataholders = document.getElementsByClassName("stack");

  // Retrieves input data from a form and returns it as a JSON object.
  return  [].reduce.call(dataholders, (data, dataholder) => {
      if (!dataholder.elements) {
          return data;
      }
      for (let i = 0; i < dataholder.elements.length; i++) {
          let element = dataholder.elements[i];
          let name = element.name;

          if (isValidElement(element) && isValidValue(element)) {
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

let currentCharacter;
function setCurrentCharacter(character){
    clearAllFields();
    
    currentCharacter = character;
    
    let dataholders = document.getElementsByClassName("stack");

    
    window.history.pushState(cleanseForSave(currentCharacter), "",
        generateNameHash(window.location.hash));
    updateEmail();
    updatePhoneNumber();
    
    let race = RACES[currentCharacter.character.race];
    
    Object.defineProperty(currentCharacter, "RACE",  {writable: true, configurable: true, enumerable: true, value:race});

    let calc = {
        attribute:{
            strength: getAttributeObject(currentCharacter.character.attribute.strength,
                race.attribute.strength, getSkillsForAttr('strength', character.skills)),
            dexterity: getAttributeObject(currentCharacter.character.attribute.dexterity,
                race.attribute.dexterity, getSkillsForAttr('dexterity', character.skills)),
            constitution: getAttributeObject(currentCharacter.character.attribute.constitution,
                race.attribute.constitution, getSkillsForAttr('constitution', character.skills)),
            intelligence: getAttributeObject(currentCharacter.character.attribute.intelligence,
                race.attribute.intelligence, getSkillsForAttr('intelligence', character.skills)),
            wisdom: getAttributeObject(currentCharacter.character.attribute.wisdom,
                race.attribute.intelligence, getSkillsForAttr('wisdom', character.skills)),
            charisma: getAttributeObject(currentCharacter.character.attribute.charisma,
                race.attribute.charisma, getSkillsForAttr('charisma', character.skills))
        }
    };

    Object.defineProperty(currentCharacter, "CALC",  {writable: true, configurable: true, enumerable: true, value:calc});
    
    [].reduce.call(dataholders, (data, dataholder) => {
        if (dataholder && dataholder.childNodes) {
            processDataHolder(dataholder);
        }
        return data;
    }, {}); 
     
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
        total: total,
        savingThrow: saveBonus,
        passiveSavingThrow: 10 + +saveBonus + +skillsForAttr 
    };
}

function processDataHolder(dataholder){
    for (let i = 0; i < dataholder.childNodes.length; i++) {
        let element = dataholder.childNodes[i];
      
        if (element.id){
            let node = findNode(element.id, currentCharacter);
            if (Array.isArray(node)){
                let value = "";
                for(let i = 0; i < node.length; i++){
                    value += node[i]+(i<node.length+1?"<br>":"");
                }
                node = value;
            }
            element.innerHTML = node ? node : "";
        }
        if (element.childNodes && element.childNodes.length > 0) {
            processDataHolder(element);
        }
    } 
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
    }

    if (link.import){
        loadModal(link.import, initFunc);
    } else {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                loadModal(xhttp.response, initFunc);
            }
        };
        xhttp.responseType = 'document';
        xhttp.open("GET", link.href, true);
        xhttp.send();
    }
}

function loadModal(importDom, initFunc){
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

    initFunc();

    show(modalDiv);
}

function cancelModal() {
    show($('modalOverlay'), false);
}

const SELECTABLE_TAGS = ['INPUT', 'SELECT','TEXTAREA'];
function selectFirstInput(divEle) {
    for(let i = 0; i < divEle.childNodes.length; i++) {
        let node = divEle.childNodes[i];
        if(node.tagName && SELECTABLE_TAGS.includes(node.tagName.toUpperCase())){
            divEle.childNodes[i].focus();
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
