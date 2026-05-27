/*

    Database Handler file, takes in info/data and saves it to teh database, along with handling all the database-related things

*/

//database related stuff
let request = indexedDB.open("DB",1);

request.onupgradeneeded = function() {
    // if it cant find the database/it doesnt exist, then create it
    let db = request.result;

}

request.onerror = function() {
    console.log("DB decided to not work, Error: " + request.error);
}

request.onsuccess = function() {
    let db = request.result
}

////database functions
//creating the database
function createDB() {

}




