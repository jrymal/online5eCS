function init() {
    // set up selects
    populateSelect($('class'), CLASSES);
    populateSelect($('race'), RACES);
    populateSelect($('backstory.type'), BACKSTORIES);
    populateCheckboxes($('skills_container'), SKILLS);
 
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
 
