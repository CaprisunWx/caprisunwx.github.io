/*

    this file is meant for interacting with the page, and handing off data to the database handler

    NOTES*
        - since we are using IndexedDb, it SHOULD be supported on all modern browsers (unless the user is using some albanian knock-off)
        - 


*/

// global values, variables, and other nonsense that needs a home
let DBLastId;
const form = document.getElementById("form");

import * as db from "./databaseHandler.js"; //imports everything from the file, that we specify should be exported



////listeners
//things that should be done at startup
document.addEventListener("DOMContentLoaded", function() {
    lsSize();
})

//when the user submits the input form
document.getElementById("submit").addEventListener("click", userSubmit);

function userSubmit() {
    
    //gonna need to save to the database, later problem
    //gonna mess around with localstorage for now

    //storing the data, probably can store it in one array/object probably, def object what am i saying
    let date = form.date.value;
    let notes = form.textInput.value;

    //saving to local storage (TESTING PURPOSES)
    localStorage.setItem("dateSaved", date);
    localStorage.setItem("Notes", notes);
    console.log(date);
    console.log(notes);
    lsSize();
}



////Functions
//database-related functions
function inputDatabase() {
    //will make later
}





////debug/other stuff
//localstorage size (just for seeing how big everything takes up on the user's storage device)
function lsSize() {
    //one version
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          // Key length + Value length, multiplied by 2 for UTF-16
          total += (key.length + localStorage[key].length) * 2;
        }
    }
    // Convert to Kilobytes
    document.getElementById("size1").innerHTML = "Localstorage space used: " + (total / 1024).toFixed(2) + ' KB';

}

document.getElementById("clear").addEventListener("click", clear);
//clear localstorage/cookies
function clear() {
    console.log("cleared");
    localStorage.clear();
    lsSize();
}
