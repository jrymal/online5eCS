var currentTab = 0; // Current tab is set to be the first tab (0)
var callbackFunction = null;

function showWizardTab(n) {

    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("wizardScreen");
    x[n].style.display = "block";

    selectFirstInput(x[n]);

    // ... and fix the Previous/Next buttons:
    document.getElementById("prevBtn").style.display = n == 0 ? "none" : "inline";
    document.getElementById("nextBtn").innerHTML = n == (x.length - 1) ? "Submit" : "Next";
    
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("wizardScreen");
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
    var x = document.getElementsByClassName("wizardScreen");
    var currentForm = x[currentTab];
    var valid = currentForm.checkValidity(); 
    
    // could use the validity object to add top level error messages....

    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}

function initWizard(callback) {
    currentTab = 0;

    callbackFunction = callback;
    
    // set up selects
    populateSelect($('class', 'createCharacter.character'), CLASSES);
    populateSelect($('race', 'createCharacter.character'), RACES);
    populateSelect($('backstory.type', 'createCharacter'), BACKSTORIES);
    populateCheckboxes($('skills_container', 'createCharacter'), SKILLS);
 
    showWizardTab(0);
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
        var idValue = "skills."+value;

        var lbl = document.createElement('label');
        lbl.innerHTML = obj.name;
        lbl.htmlFor=idValue;
        lbl.className="skills_item";

        var opt = document.createElement('input');
        opt.value = value;
        opt.type = "checkbox";
        opt.name = "character.skills";
        opt.id =idValue;
//        opt.setAttribute("onChange", "updateRace()");

        fragment.appendChild(lbl);
        fragment.appendChild(opt);
    }

    divEle.appendChild(fragment);
}

function generateDataToJSON() {
    var dataholders = document.getElementsByClassName("wizardScreen");

    // Retrieves input data from a form and returns it as a JSON object.
    return  [].reduce.call(dataholders, (data, dataholder) => {
        for (var i = 0; i < dataholder.elements.length; i++) {
            var element = dataholder.elements[i];
            var name = element.name;

            if (name === "") {
                continue;
            }
            if (isValidElement(element) && isValidValue(element)) {
                var dataObj; 
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

function findNode(jsonPath, searchObj) {
    var pathItems = jsonPath.split('.');
    var objItem = searchObj;
    for(var i = 0; i < pathItems.length; i++) {
        if (!objItem[pathItems[i]]) {
            return null;
        }
        objItem = objItem[pathItems[i]];
    }
    return objItem;
}

function insertAtNode(jsonPath, searchObj, insertObj) {
    var pathItems = jsonPath.split('.');
    var objItem = searchObj;
    for(var i = 0; i < pathItems.length; i++) {
        var lastNode = i == (pathItems.length - 1);
        if (!objItem[pathItems[i]]) {
            objItem[pathItems[i]] = lastNode ? insertObj : {};
        }else if (lastNode){
            objItem[pathItems[i]] = insertObj;
        }
        objItem = objItem[pathItems[i]];
    }
}
 
