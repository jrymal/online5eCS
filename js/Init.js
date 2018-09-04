'use strict';

const ATTRIBUTE_ID_LIST = deepFreeze(["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"]);


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
    let val = classList.reduce( (hits, curClass) => {
        return +hits + (+curClass.level * getMax(DICE[CLASSES[curClass.class].hitDie]));
    }, 0);
    return val;
}

function getCurrentLevel(classList) {
    let val = classList.reduce( ( count, curClass) => {
        return count += +curClass.level;
}, 0);
    return val;
} 

let currentCharacter;
function setCurrentCharacter(character){
    clearAllFields();
    
    let race = clone(RACES[character.character.race]);
    let backstory = BACKSTORIES[character.character.backstory.type];
    
    insertAtNode("character.experience", character, "0", false);
    insertAtNode("character.inspiration", character, false, false);
    
    let maxHitPoints = getMaxHitPoints(character.character.class);
    insertAtNode("character.hitPoints.max", character, maxHitPoints, false);
    insertAtNode("character.hitPoints.current", character, maxHitPoints, false);
    
    currentCharacter = character;
    
    applyLevelBasedRaceFeatures(character, race);

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
    
    if (currentCharacter){
        $('rootNode').classList.remove("nocharacter");
    }
}

function applyLevelBasedRaceFeatures(character, race){
    let levelObj = race.level;
    if (levelObj){
        let curLevel = getCurrentLevel(character.character.class);
    
        for (let level in levelObj){
            if (level <= curLevel){
                for (let type in levelObj[level]){
                    switch(type){
                        case 'spells':
                            addSpell(character, levelObj[level].spells);
                            break;
                        case 'feature':
                            race.features = race.features.concat(levelObj[level].feature);
                            break;
                    }
                }
            }
        }
    }
}

function addSpell( character, spellNames ) {
    $('rootNode').classList.add("spellcaster");
    
    // ensures that the path exists
    insertAtNode("character.spells", character, []);
    
    if (Array.isArray(spellNames)){
        for(let spell in spellNames){
            character.character.spells.push(spellNames[spell]);
        }
    } else {
        character.character.spells.push(spellNames);
    }
    
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

function processDataHolder(dataholder){
    for (let i = 0; i < dataholder.childNodes.length; i++) {
        let element = dataholder.childNodes[i];
        
        if (element.id){
            let node = findNode(element.id, currentCharacter);
            if (!specialHandler(element.id, element, node)){
                let lookup = getDataAttribute(element, "lookup");

                // alter to handle the values
                if (Array.isArray(node)){
                    let value = "<ul>";
                    for(let i = 0; i < node.length; i++){
                        value += "<li>";
        
                        if (lookup) {
                            value += performNameLookup(lookup, node[i]);
                        } else {
                            value += node[i];
                        }
                        value += "</li>";
                    }
                    value += "</ul>";
                    node = value;
                } else if (lookup && node) {
                    let nodeValue =  performNameLookup(lookup, node);
                    node = nodeValue ? nodeValue : node;
                }
                
                // process values into understood units
                if (isCheckbox(element)) {
                    element.checked = node;
                } else if (element.tagName == "INPUT"){
                    element.value = node;
                } else {
                    element.innerHTML =  ((typeof node === "undefined") ||  (node === NaN)) ? "" : node;
                    
                    show(element, 
                        !(getDataAttribute(element, 'show-0', "true") == "false"  
                            && element.innerHTML == "0") 
                        && element.innerHTML != "");
                }
            }
        }

        if (element.childNodes && element.childNodes.length > 0) {
            processDataHolder(element);
        }
    } 
}

function specialHandler(id, element, node){
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
        case "character.details.eyecolor":
        case "character.details.hair":
        case "character.details.skin":
            let colorObj = performObjectLookup(getDataAttribute(element, "lookup"), node); 
            if (colorObj){
                element.innerHTML = colorObj.name;
                $(id+'.color').style.backgroundColor = colorObj.color;
            }
            return true;
        case "character.details.eyecolor.color":
        case "character.details.hair.color":
        case "character.details.skin.color":
            // we want these to show even through there is no value
            return true;
        case 'character.details.height':
            element.innerHTML = Math.floor(node/12)+'\' '+ Math.floor(node%12) +'"';
            return true;
        case 'character.skills':
            for( let i = 0; i < node.length; i++){
                let skill = SKILLS[node[i]];
                element.innerHTML += '<tr>'
                    +'<th scope="row">'+skill.name+'</th>'
                    +'<td>'+calculateSkillBonus(skill.attribute)+'</td>'
                    +'</tr>'; 
            }
            return true;
            break;
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

function performNameLookup(lookup, node){
    return performObjectLookup(lookup, node).name;
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

var IMPORTS = new Map();
function showModal(modelId, initFunc){
    // Bring in the import content.
    let link = document.querySelector('link[rel="import"][id="'+modelId+'"]');
    
    if (!link) {
        console.log("Link Mismatch: "+modelId);
        return;
    }

    if (link.import){
        // import works...awesome no more work....
        loadModal(modelId, link.import, initFunc);
    } else {
        // crap....
        var dom = IMPORTS.get(modelId);
        if (dom){
            loadModal(modelId, dom, initFunc);
        } else {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    //IMPORTS.set(modelId, xhttp.response);
                    loadModal(modelId, xhttp.response, initFunc);
                }
            };
            xhttp.responseType = 'document';
            xhttp.open("GET", link.href, true);
            xhttp.send();
        }
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
