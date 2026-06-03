/*

    this file is meant for interacting with the page, and handing off data to the database handler

    NOTES*
        - since we are using IndexedDb, it SHOULD be supported on all modern browsers (unless the user is using some albanian knock-off)
        - 


*/

// global values, variables, and other nonsense that needs a home
let DBLastId; //the number of individual ID's in the database
const form = document.getElementById("form");

let dbName = "main";
let objectStoreName = "store";

import * as db from "./databaseHandler.js"; //imports everything from the file, that we specify should be exported



////listeners
//things that should be done at startup
document.addEventListener("DOMContentLoaded", function() {
    lsSize();

    //testung out our database functions
  let data = {
    "id":1,
    "name": "yonald"
  }
  db.storeToDB(dbName, objectStoreName, data);
  let data2 = {
    "id":4,
    "name": "hotdog"
  }
  db.storeToDB(dbName, objectStoreName, data2);
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
    log(date);
    log(notes);
    lsSize();
}



////Functions
//database-related functions
function inputDatabase() {
    //will make later
}



////ANYTHING AFTER THIS IS JUST DEBUG
//localstorage size (just for seeing how big everything takes up on the user's storage device)
function lsSize() {
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

//function to calculate the storage size of indexedDB
async function estimateStoreSize(dbName, storeName) {
    const db = await openDatabase(dbName);
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const getAllRequest = store.getAll(); // Fetch all entries
   
    return new Promise((resolve, reject) => {
      getAllRequest.onsuccess = () => {
        const entries = getAllRequest.result;
        let totalSize = 0;
   
        entries.forEach(entry => {
          // Serialize to JSON and calculate byte length
          const jsonString = JSON.stringify(entry);
          const entrySize = new Blob([jsonString]).size; // Bytes
          totalSize += entrySize;
        });
        
        document.getElementById("size2").innerHTML = "IndexedDB size: " + totalSize;
        resolve(totalSize); // Total size in bytes
      };
   
      getAllRequest.onerror = () => reject(getAllRequest.error);
      transaction.oncomplete = () => db.close();
    });
  }
  /*
  estimateStoreSize('myAppDB', 'notes').then(bytes => 
    console.log(`Estimated store size: ${(bytes / (1024 * 1024)).toFixed(2)} MB`)
  );
  */

document.getElementById("clear").addEventListener("click", clear);
//clear localstorage/cookies
function clear() {
    console.log("cleared");
    localStorage.clear();
    lsSize();
}


//gonna make a function to save logs to some place, probably jst to indexedDB, gonna use localstorage for now since its much simpler to do

localStorage.setItem("log","");

function log(string) {
  console.log(string);
  let pastLog = localStorage.getItem("log");
  localStorage.setItem("log", pastLog + " " + string);
  
}



