/*

    Database Handler file, takes in info/data and saves it to teh database, along with handling all the database-related things

*/

////database functions
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
////Stores 'data' to a specific place in indexedDB. the 'data' should be an object store
export function storeToDB(dbName, objectStore, data) {
    checkDB(dbName, objectStore);
    const request = indexedDB.open(dbName);
    let db;

    //if we error out, we'll know why
    request.onerror = function(event) {
        console.error("Database Failed to Load, reason: " + event.target.error);
    }

    //if it works, itll do this
    request.onsuccess = function(event) {
        db = event.target.result;

        //creates a transaction with the object store
        const transaction = db.transaction([objectStore], 'readwrite');
        const store = transaction.objectStore(objectStore);
        //and then funally we add the request to the database
        const addRequest = store.add(data);

        //then lets deal with the success's and failures
        addRequest.onerror = function(event) {
            console.error("Function storeToDB; data could not be added, reason: " + event.target.error);
        }

        addRequest.onsuccess = function(event) {
            console.log("data successfully added to " + dbName);
        }
    }
}

//saves to a new object store
export function storeToNewobjectStore(dbname, objectStoreName, data) {
    
}






