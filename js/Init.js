const DICE = {
    d4 : {
        min: 1,
        max: 4
    },
    d6 : {
        min: 1,
        max: 6
    },
    d8 : {
        min: 1,
        max: 8
    },
    d10 : {
        min: 1,
        max: 10
    },
    d12 : {
        min: 1,
        max: 12
    },
    d20 : {
        min: 1,
        max: 20
    }
};

function $(id, prefix = '') {
    return document.getElementById(isBlank(prefix) ? id : prefix+'.'+id);
}

function rollDie(die, count = 1) {
    result = [];
    for(var i = 0; i < count; i++) {
        result.push(randomNumber(die.min, die.max));
    }
    return result;
}

function randomNumber(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function chooseFromList(list){
    return list && list.length > 0 ? list[randomNumber(0,list.length)] : null;
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
    var index = string.indexOf(matchChar);
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
  var dataholders = document.getElementsByClassName("dataholder");

  // Retrieves input data from a form and returns it as a JSON object.
  return  [].reduce.call(dataholders, (data, dataholder) => {
      for (var i = 0; i < dataholder.elements.length; i++) {
          var element = dataholder.elements[i];
          var name = element.name;

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

    show($('install-app'), false);

    // Check for a previous state in the history on load
    if (window.history.state){
        // apply the data found in the previous state
        // need to evaluate how this works after the new design
        // parseDataFromJSON(window.history.state);
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


//
// Loading Functionality
//
function loadFromJSON() {
    if (confirm("Loading will clear out all values. Continue?")) {
        var reader = new FileReader();
        reader.onload = function(evt) {
            clearAllFields();
            parseDataFromJSON(JSON.parse(evt.target.result));
            window.history.pushState(generateDataToJSON(), "", generateNameHash(window.location.hash));
        };
        reader.onerror = function(evt) {
            console.log("Error:"+evt.target.result);
        };
        reader.readAsText($('importFile').files[0]);
    }
}

var currentCharacter;

function startWizard() {
    showModal('createCharacter');
    initWizard(function(result) {
        currentCharacter = result;
        console.log('Result: '+currentCharacter);
        show($('modalOverlay'), false);
    });
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

function showModal(modelId, title, desc){
    var modalDiv = $('modalOverlay');
    var modalTitleDiv = $('modal.title');
    var modalDescDiv = $('modal.description');
    var modalBodyDiv = $('modal.body');
    
    // Bring in the import content.
    var link = document.querySelector('link[rel="import"][id="'+modelId+'"]');
    
    if (!link) {
        console.log("Link Mismatch: "+modelId);
    }

    // Clone the <template> in the import.
    var importDom = link.import;
    var titleEle = importDom.querySelector('title');
    var descEle = importDom.querySelector('description');

    // need to clear out before adding the new elements
    modalBodyDiv.innerHTML="";

    modalTitleDiv.innerHTML = title ? title : titleEle ? titleEle.innerHTML : "";
    modalDescDiv.innerHTML = desc ? desc : descEle ? descEle.innerHTML : "";
    modalBodyDiv.appendChild(document.importNode(importDom.querySelector('template').content, true));

    show(modalDiv);
}

function cancelModal() {
    show($('modalOverlay'), false);
}

var SELECTABLE_TAGS = ['INPUT', 'SELECT','TEXTAREA'];
function selectFirstInput(divEle) {
    for(var i = 0; i < divEle.childNodes.length; i++) {
        if(SELECTABLE_TAGS.includes(divEle.childNodes[i].tagName)){
            divEle.childNodes[i].focus();
            return;
        }
    }
}
