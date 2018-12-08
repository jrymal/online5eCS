'use strict';

const DB_NAME = "online5eCS";
const DB_VERSION = 1;

const STORE_CHARACTER = "Characters";

const MODE_RW = "readwrite";
const MODE_RO = "readonly";

var __DB__;

function initDb(callbackFunc){
    if (!('indexedDB' in window)) {
        console.log("IndexDB is not supported");
        return false;
    } else if (__DB__){
        if (callbackFunc){
            callbackFunc(__DB__);
        }
        return true;
    }

    // could be that thereare legacy variants. This is an elegant solution if needed
    //https://github.com/mdn/to-do-notifications/blob/gh-pages/scripts/todo.js

    var request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = function(event) {
        console.log('[onsuccess]', request.result);
        __DB__ = event.target.result; // === request.result
        if (callbackFunc){
            callbackFunc(__DB__);
        }
    };
    request.onerror = function(event) {
        console.log('[onerror]', request.error);
    };
    request.onupgradeneeded = function(event) {
        console.log('[onupgrade]', request.result);
        // create object store from __DB__ or event.target.result
        var DB = event.target.result;
        var store = DB.createObjectStore(STORE_CHARACTER);
    };

    return true;
}

function getObjectStore(db, table, mode){
    var transaction = db.transaction(table, mode);

    // add success event handleer for transaction
    // you should also add onerror, onabort event handlers
    transaction.onsuccess = function(event) {
        console.log('[Transaction] ALL DONE!');
    };
    
    transaction.onerror = function(event) {
        console.log('[Transaction] ERROR!');
    };
    transaction.onabort = function(event) {
        console.log('[Transaction] ABORTED!');
    };

    return transaction.objectStore(table);
}

function getCharacter(characterName, callbackFunc){
    initDb(function(db){
        getObjectStore(db, STORE_CHARACTER, MODE_RO).get(characterName).onsuccess = function(event){
            if (event.target.result) {
                callbackFunc(event);
            }
        };
    });
}

function putCharacter(characterName, character, callbackFunc){
    initDb(function(db){
        getObjectStore(db, STORE_CHARACTER, MODE_RW).put(character, characterName).onsuccess = function(event){
            if (event.target.result) {
                callbackFunc(event);
            }
        };
    });
}

function deleteCharacter(characterKey, callbackFunc){
    initDb(function(db){
        getObjectStore(db, STORE_CHARACTER, MODE_RW).delete(characterKey).onsuccess = function(event){
            if (event.target.result) {
                callbackFunc(event);
            }
        };
    });
}

function getAllCharacters(callbackFunc){
    initDb(function(db){
        getObjectStore(db, STORE_CHARACTER, MODE_RO).openCursor().onsuccess = callbackFunc;
    });
}

