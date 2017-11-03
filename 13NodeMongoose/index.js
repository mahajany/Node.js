const mongoose = require('mongoose');
mongoose.Promise = require('bluebird'); //To support the promises, bluebirt 3rd party lib is being used

const Dishes = require('./Model/dishes');

const URL = 'mongodb://localhost:27017/ognom';
const dbConnection = mongoose.connect(URL, {
                        useMongoClient: true
                    });
dbConnection.then( (db) => {
    console.log('1.Connected to MongoDB Server');
    var newDish =  Dishes({
                    name: 'Pizza',
                    description: 'Yummy Yuymmy, fat Tymmy'
    });
    newDish.save()
        .then( (dish) => {
            console.log("2.Added dish sucessfully ");
            return Dishes.find({}).exec();
        })
        .then( (dishes) =>{
            console.log("3. Complete dishes collection:" + dishes);
            return db.collection('dishes').drop();
        }).
        then (()=>{
            console.log("4. Collection 'dishes' got dropped successfully");
            return db.close();
        })
        .then(()=>{
            console.log("5. Last step of my journey...db.close");
        })
        .catch((err)=>{
            console.log("ERROR:" + err);
        });
        console.log("---this may get printed BEFORE 5-----");
})        
.catch((err)=>{
    console.log("DB CONNECTION ERROR: " + err);
});
;