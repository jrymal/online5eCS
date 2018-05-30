//
// Tabbing Functionality
//
function openTab(evt, idName) {
    // Declare all variables
    var i, tabcontent, tablinks;
                                  
    // Take the data object and put it in the history page
    // No title, not used per MDN
    // Set hash location in url
    window.history.replaceState(generateDataToJSON(), "", "#"+idName);

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
}
