'use strict';

function deepFreeze(object) {

  // Retrieve the property names defined on object
  var propNames = Object.getOwnPropertyNames(object);

  // Freeze properties before freezing self
  
  for (let name of propNames) {
    let value = object[name];

    object[name] = value && typeof value === "object" ? 
      deepFreeze(value) : value;
  }

  return Object.freeze(object);
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function exists(obj){
    return obj && typeof obj !== "undefined";
}

function getDataAttribute(element, dataName, defaultValue){
     let value = element.dataset ? element.dataset[dataName] : element.getAttribute("data-"+dataName);                                            
    return (value === null || typeof value === undefined) ? defaultValue : value;
}

function setDataAttribute(element, dataName, value){
     if (element.dataset){
         element.dataset[dataName] = value;
     } else {
         element.setAttribute("data-"+dataName, value);
     }
}
 
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
        
        } else if ((typeof objItem[pathItem] === "undefined") ||  (objItem[pathItem] === NaN)){
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
                value:lastNode ? insertObj : ( isArray ? [] : {} )
            });
        }else if (lastNode && !Array.isArray(objItem)){
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

function addAll(priList, listToAdd){
    listToAdd.forEach(function(item){
        priList.push(item);
    });
}
