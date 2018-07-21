 var currentTab = 0; // Current tab is set to be the first tab (0)

function showWizardTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("wizardScreen");
    x[n].style.display = "block";

    selectFirstInput(x[n]);

    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("wizardScreen");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showWizardTab(currentTab);
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

function initWizard() {
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
