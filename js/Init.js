const NAV_BUTTON_XPATH = "/html/body/nav/";                                                        
const MOBILE_BREAKPOINT = 550;                                                        

function $(id) {
    return document.getElementById(id);
}

function isBlank(stringValue) {
    return stringValue == null || stringValue === "" || !stringValue;
}

function hasClass(element, className){
    for (var classIdx = 0; classIdx < element.classList.length; classIdx++) {
        var eleClassName = element.classList[classId];
        if (className == eleClassName) {
            return true;
        }
    }
    return false;
}
 
function show(element, isVis){
    element.style.display = isVis ? 'block' : 'none';
    element['aria-hidden'] = isVis;
}

function isVisible(element) {
    return element.style.display != 'none';
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

function generateNameHash(idName){
    return "index.html?"+$("player").value
        +"_"+$("name").value
        +"#"+stripFirst("#",idName);
}

function openMobileMenu() {
    show($('mobile-nav-menu'), !isVisible($('mobile-nav-menu')));
}

function init() {
    // Enable navigation prompt
    window.onbeforeunload = function() {
        // set last settings into history
        window.history.pushState(generateDataToJSON(), "", 
            generateNameHash(window.location.hash));
        
        // Ask if there are changes they's like to save
        return "Discard changes?";
    };
    
    // set up export Functionality
    $('exportFileLink').onclick = function() {
        var curData = generateDataToJSON();
        this.href = 'data:text/javascript;charset=utf-8,' 
            + encodeURIComponent(JSON.stringify(curData));
        this.download = encodeURIComponent(curData.name) 
            + '_'+curData.level+'.json'
    }

    // set up selects
    populateSelect($('class'), CLASSES);
    populateSelect($('race'), RACES);
    populateSelect($('backstory.type'), BACKSTORIES);
    populateCheckboxes($('skills_container'), SKILLS);
    
    show($('mobile-nav-menu'), false);

    // Check for a previous state in the history on load
    if (window.history.state){
        // apply the data found in the previous state
        parseDataFromJSON(window.history.state);
    }

    // configure initial tab
    var tabId = window.location.hash ? window.location.hash.split('#')[1]: 'PlayerInfo';
    var tabElement = getElementByXpath(NAV_BUTTON_XPATH + "button[@for='"+tabId+"']");
    if (!tabElement){
        // ZOMG things went bad....let's get to a safe place
        tabId = 'PlayerInfo';
        tabElement = getElementByXpath(NAV_BUTTON_XPATH + "button[@for='"+tabId+"']");
    }
    openTab({currentTarget: tabElement}, tabId);
    resizeScreen();
}

function resizeScreen() {
    var sw = document.documentElement.clientWidth;
    var mobile = sw <= MOBILE_BREAKPOINT;

    show($('mobile-nav'), mobile);
    show($('nav'), !mobile);
}

function updatePhoneNumber() {
    updateLink('phone', 'playerinfo.phone.link', 'tel:+', 'Call ');
}

function updateEmail() {                                        
    updateLink('email', 'playerinfo.email.link', 'mailto:', 'Send email to ');
}

function updateLink(valueId, linkId, hrefPrefix, innerHtmlPrefix) {
    var value = $(valueId).value;
    var valueLink = $(linkId);
    var isblank = isBlank(value);
    show(valueLink, !isblank);

    if (!isblank) {
        $(linkId).href = hrefPrefix+value;
        $(linkId).innerHTML = innerHtmlPrefix+value;
    }
} 

function populateSelect(selectEle, sourceObj) {
    var fragment = document.createDocumentFragment();
    var sourceArray = Object.keys(sourceObj).sort();

    for (var i = 0; i < sourceArray.length; i++  ) {
        var value = sourceArray[i];
        var obj = sourceObj[value];

        // create base class
        var opt = document.createElement('option');
        opt.innerHTML = obj.name ? obj.name : value;
        opt.value = value;

        fragment.appendChild(opt);
    }

    selectEle.appendChild(fragment);
}

function populateCheckboxes(divEle, sourceObj) {
    var fragment = document.createDocumentFragment();
    var sourceArray = Object.keys(sourceObj).sort();

    for (var i = 0; i < sourceArray.length; i++  ) {
        var value = sourceArray[i];
        var obj = sourceObj[value];

        var lbl = document.createElement('label');
        lbl.innerHTML = obj.name;
        lbl.htmlFor="skills."+value;
        lbl.className="skills_item";

        var opt = document.createElement('input');
        opt.value = value;
        opt.type = "checkbox";
        opt.name = "skills";
        opt.id ="skills."+value;
        opt.setAttribute("onChange", "updateRace()");

        fragment.appendChild(lbl);
        fragment.appendChild(opt);
    }

    divEle.appendChild(fragment);
}

//
// Generation Functionality
//
function generateDataToJSON() {
  var dataholders = document.getElementsByClassName("dataholder");

  // Retrieves input data from a form and returns it as a JSON object.
  return  [].reduce.call(dataholders, (data, dataholder) => {
      for (var i = 0; i < dataholder.elements.length; i++) {
          var element = dataholder.elements[i];
          var name = element.name;

          if (isValidElement(element) && isValidValue(element)) {
              if (isCheckbox(element)) {
                  data[name] = (data[name] || []).concat(element.value);
              } else if (isMultiSelect(element)) {
                  data[name] = getSelectValues(element);
              } else {
                  data[name] = element.value;
              }
          }
      }
      return data;
  }, {});
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

function parseDataFromJSON(myData) {
  var form = $('data_form');
  var propertyArray = Object.keys(myData);

  for (var i = 0; i < propertyArray.length; i++  ) {
    var property = propertyArray[i];
    var ele = $(property);
    var values = myData[property];
    
    if (ele) {
        ele.value = values;
    } else {
        // find by id failed....probably checkboxes. Use name
        var eles = document.getElementsByName(property);
        if (eles) {
            for (var chkEleIt = 0; chkEleIt < eles.length; chkEleIt++  ) {
                ele = eles[chkEleIt];
                if (isCheckbox(ele)){
                    ele.checked = values.includes(ele.value);
                } else {
                    ele.value = values;
                    if (eles.length > 1) {
                        console.log("Multiple names identified for property: "+property+":"+values);
                    }
                }
            }
        } else {
            console.log("Unknown property: "+property+":"+values);
        }
    }
  }
   
    updateRace({});
    updateClass({});
    updateBackstory({});
    updateEmail();
    updatePhoneNumber();
}

//
// Tabbing Functionality
//
function openTab(evt, idName) {
    // Declare all variables
    var i, tabcontent, tablinks;
                                  
    // Take the data object and put it in the history page
    // No title, not used per MDN
    // Set hash location in url
    window.history.replaceState(generateDataToJSON(), "", generateNameHash(idName));

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(idName).style.display = "block";
    evt.currentTarget.className += " active";
    
    show($('mobile-nav-menu'), false);
} 
