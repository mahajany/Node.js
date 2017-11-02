const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboperations=require('./operationsWithPromises');

const URL='mongodb://localhost:27017/ognom';

console.log("Connecting...");
mongoClient.connect(URL).then((db) =>{

    console.log('Connected to the MongoServer', URL);
    newDoc = {"name":"Pizza", "description":"Tasty"};

    dboperations.insertDocument(db, newDoc, "dishes")
    .then((result) =>{
        console.log("1. Inserted Document:\n", result.ops);  //No. of docs inserted
        return dboperations.findDocuments(db,newDoc,"dishes");
    }) 
    .then((docsList)=>{
        console.log("2. Found Document:\n", docsList);  //No. of docs inserted
        updatedDoc={"name":"Pizza", "description":"Yummy!!"};
        return dboperations.updateDocument(db, newDoc, updatedDoc, "dishes");
    })
    .then((result)=>{
        console.log("3. Updated document", result.result);
        return dboperations.removeDocument(db, updatedDoc, "dishes");
    })
    .then((result)=>{
        console.log("4. Duh....deleted as well:", result.result.n);
        return db.dropCollection("dishes");
    })
    .then((result)=>{
          console.log("5. Let it go, James...drop it!")
          return db.close();
    })
    .catch((err) => console.log(err));

}, (err) => console.log("ERROR in connect:", err))
.catch((err) => console.log(err));