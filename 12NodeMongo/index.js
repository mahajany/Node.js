const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const URL='mongodb://localhost:27017/ognom';
console.log("Connecting...");
mongoClient.connect(URL, (err, db) =>{
    assert.equal(err, null);            //Check that error is NOT null
    console.log('Connected to the MongoServer', URL);

    const collection = db.collection('dishes');
    collection.insertOne({"name":"Pizza", "description":"Tasty"}, 
    (err, result)=>{
        assert.equal(err, null);
        console.log("After Insert:\n");
        console.log(result.ops);         //Operation which was conducted sucessuflly.

        collection.find({}).toArray((err, docs)=>{
            assert.equal(err, null);
            console.log("Found some Data...");
            
            console.log(docs);

            db.dropCollection("dishes", (err, result)=>{
                assert.equal(err, null);
                console.log("...so, dropped the collection dishes!");
                db.close()
            });
        });
    });
});