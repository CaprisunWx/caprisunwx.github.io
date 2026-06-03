/*

    Database Handler file, takes in info/data and saves it to teh database, along with handling all the database-related things

*/

////database functions
//creating the database
function createDB(dbName,objectStore) {

}

// checks if the specified db and objectstore exists, and if it doesnt, create it
export function checkDB(dbName, objectStoreName) {
    let request = indexedDB.open(dbName);

    //if its errors (for some ungodly reason), we'll know
    request.onerror = function(event) {
        console.error("database error: " + event.target.error);
    };

    //if we need to add objects stores or something idk boss
    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        const store = db.createObjectStore(objectStoreName,{ keyPath: "id", autoIncrement: true });

    }

    request.onsuccess = function(event) {
        console.log("database opened succesfully");
    }
}

//saves to a specific object store
export function storeToDB(dbName, objectStore, data) {

}

//saves to a new object store
export function storeToNewobjectStore(dbname, objectStoreName, data) {
    
}

checkDB("yep", "it works");




