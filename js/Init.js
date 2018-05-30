function $(id) {
    return document.getElementById(id);
}

function init() {
    // Enable navigation prompt
    window.onbeforeunload = function() {
          return "Discard changes?";
    };

    // set up export Functionality
    $('exportFileLink').onclick = function() {
        var curData = generateDataToJSON();
        this.href = 'data:text/javascript;charset=utf-8,' + encodeURIComponent(JSON.stringify(curData));
        this.download = encodeURIComponent(curData.name) + '_'+curData.level+'.json'
    }

    // set up selects
    populateSelect($('class'), Classes);
    // TODO: group by familty
    populateSelect($('race'), Races);
    populateSelect($('backstory.type'), Backstories);
    populateCheckboxes($('skills_container'), Skills);

    // configure initial tab
    var initEvent = {};
    initEvent.currentTarget = $('firsttab');
    openTab(initEvent, 'PlayerInfo');
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
    };

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
        lbl.for="skills."+obj.name;

        var opt = document.createElement('input');
        opt.value = value;
        opt.type = "checkbox";
        opt.name = "skills";
        opt.id ="skills."+obj.name;
        
        lbl.appendChild(opt);
        fragment.appendChild(lbl);
    };

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
          console.log("Element: "+element.name+":"+element.values);
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

//
// Loading Functionality
//
function loadFromJSON() {
    var reader = new FileReader();
    reader.onload = function(evt) {
        parseDataFromJSON(JSON.parse(evt.target.result));
    };
    reader.onerror = function(evt) {
        console.log("Error:"+evt.target.result);
    };
    reader.readAsText($('importFile').files[0]);
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
}
