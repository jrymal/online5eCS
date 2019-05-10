'use strict';

const DIALOG_TEXT = deepFreeze({
    'character.treasure':{
        title:"Treasure",
    },
    'character.backstory.story':{
        title:"Backstory",
    },
    'character.details.appearance':{
        title:"Appearance",
    },
    'character.personalitytraits':{
        title:"Traits",
    },
    'character.ideals':{
        title:"Ideals",
    },
    'character.bonds':{
        title:"Bonds",
    },
    'character.flaws':{
        title:"Flaws",
    },
    'character.allies':{
        title:"Allies",
    },
});


let CURRENT_EDITOR_ID;
function showEditor( infoId ) {
    let dialog = $( "editor" );
    CURRENT_EDITOR_ID = infoId;
    let curValue = findNode( infoId, currentCharacter );

    let dialogText = DIALOG_TEXT[infoId];
    let title = dialogText.title;
    let description = "Edit the character's "+dialogText.title;
    let field = dialogText.title;
    
    $("editor.title").innerText = title; 
    $("editor.description").innerText = description; 
    $("editor.field").innerText = field;

    $("editor.textarea").value = exists( curValue ) ? curValue : ""; 

    if ( typeof dialog.showModal === "function" ) {
        dialog.showModal();
    } else {
        alert( "The dialog API is not supported by this browser" );
    }
}

function updateFromEditor( character) {
    insertAtNode(CURRENT_EDITOR_ID, character, $("editor.textarea").value);

    return character;

}

