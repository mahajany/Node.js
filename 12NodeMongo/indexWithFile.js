const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const dboperations=require('./operations');

const URL='mongodb://localhost:27017/ognom';

console.log("Connecting...");
mongoClient.connect(URL, (err, db) =>{
    assert.equal(err, null);            //Check that error is NOT null
    console.log('Connected to the MongoServer', URL);
    newDoc = {"name":"Pizza", "description":"Tasty"};
    dboperations.insertDocument(db, newDoc, "dishes", (result) =>{
        console.log("1. Inserted Document:\n", result.ops);  //No. of docs inserted
        dboperations.findDocuments(db,newDoc,"dishes", (result)=>{
            console.log("2. Found Document:\n", result.ops);  //No. of docs inserted
            updatedDoc={"name":"Pizza", "description":"Yummy!!"};
            dboperations.updateDocument(db, newDoc, updatedDoc, "dishes", (result)=>{
                console.log("3. Updated document", result.result);
                dboperations.removeDocument(db, updatedDoc, "dishes", (result)=>{
                    console.log("4. Duh....deleted as well:", result.ops);
                    db.dropCollection("dishes", (err, result)=>{
                        console.log("5. Let it go, James...drop it!")
                        db.close();
                    });
                });
            });
        });
    }) ;
});