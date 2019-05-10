'use strict';

/**
 * The point of this file is to have a util with methods used by any global variables that must be loaded before 
 * other files load to allow for all js files to be loaded async.
 */

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
