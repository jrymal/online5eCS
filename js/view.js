const NAV_BUTTON_XPATH = "/html/body/div/div/nav/";

function generateNameHash(idName){
    var playerName = $("player").value;
    var charName = $("name").value;
    var resp = "index.html";
    if (playerName && charName) {
        resp += '?' + playerName + '_' + charName;
    }
    resp += '#'+stripFirst('#',idName);
    return resp;
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
    openTab({currentTarget: tabElement}, tabId, false);
    
    updatePhoneNumber();
    updateEmail();
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
function openTab(evt, idName, replaceState = true) {
    // Declare all variables
    var i, tabcontent, tablinks;
                                  
    // Take the data object and put it in the history page
    // No title, not used per MDN
    // Set hash location in url
    if (replaceState) {
        window.history.replaceState(generateDataToJSON(), "", generateNameHash(idName));
    }

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        show(tabcontent[i], false);
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementById("nav").childNodes;
    for (i = 0; i < tablinks.length; i++) {
        if (tablinks[i].classList){
            tablinks[i].classList.remove("active");
        }
        tablinks[i]['aria-selected'] = false;
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    var activePanel = document.getElementById(idName);
    show(activePanel, true);
    evt.currentTarget.classList.add("active");
    evt.currentTarget['aria-sellected'] = true;
    
    show($('mobile-nav-menu'), false);
}
 
