const assert = require('assert');

//A function which is exported.
exports.insertDocument = (db, document, collection, callback) =>{
    const coll = db.collection(collection);
    coll.insert(document, (err, result)=>{
        assert.equal(err, null);
        console.log("[OPERATIONS] Inserted successfuly "  + result.result.n + //how manch docs
                    + " documents in collection "+ collection);
        callback(result); //pass the result back to callback function
    });
};
    
exports.findDocuments = (db, document, collection, callback) =>{
    const coll = db.collection(collection);
    coll.find({}).toArray((err, docs)=>{        //Convert result  to array docs[]
        assert.equal(err, null);
        console.log("[OPERATIONS] Found some docs:", docs);
        callback(docs);
    });
};

exports.removeDocument = (db, document, collection, callback) =>{
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) =>{
        assert.equal(err, null);
        console.log("[OPERATIONS] Removed the document", document);
        callback(result);
    })    
};

exports.updateDocument = (db, document, updatedDoc, collection, callback) =>{
    const coll = db.collection(collection);
    coll.updateOne(document, {$set: updatedDoc}, null, (err, result) =>{
        assert.equal(err, null);
        console.log("[OPERATIONS] Update the documenbt", document, " to" , updatedDoc);
        callback(result);
    })
};
