const assert = require('assert');

//A function which is exported.
exports.insertDocument = (db, document, collection, callback) =>{
    const coll = db.collection(collection);
    return coll.insert(document);
};
    
exports.findDocuments = (db, document, collection, callback) =>{
    const coll = db.collection(collection);
    return coll.find({}).toArray();
};

exports.removeDocument = (db, document, collection, callback) =>{
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocument = (db, document, updatedDoc, collection, callback) =>{
    const coll = db.collection(collection);
    return coll.updateOne(document, {$set: updatedDoc}, null);
};
