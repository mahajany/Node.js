const mongoose = require('mongoose');
mongoose.Promise = require('bluebird'); //To support the promises, bluebirt 3rd party lib is being used

const Dishes = require('./Model/dishes');

const URL = 'mongodb://localhost:27017/ognom';
const dbConnection = mongoose.connect(URL, {
    useMongoClient: true
});
dbConnection.then((db) => {
    console.log('1.Connected to MongoDB Server');
    Dishes.create({
        name: 'Pizza',
        description: 'Yummy Yuymmy, fat Tymmy'
    })
        .then((dish) => {
            console.log("2.Added dish sucessfully ");
            //return Dishes.find({}).exec();
            return Dishes.findByIdAndUpdate(dish._id, {$set: {description: 'Updated...for testing'}
        }, { new: true}).exec();
        })
        .then((dishes) => {
            console.log("3. Complete dishes collection - after update:" + dishes);
            dishes.comments.push({rating:5, comment: " I liked it", author:"YM"});
            return dishes.save();
        }). then((dishes) =>{
            console.log("4. Pushed a comment in dishes collection:" + dishes);
            return db.collection('dishes').drop();
        }).
        then(() => {
            console.log("5. Collection 'dishes' got dropped successfully");
            return db.close();
        })
        .then(() => {
            console.log("6. Last step of my journey...db.close");
        })
        .catch((err) => {
            console.log("ERROR:" + err);
            return;
        });
    console.log("---this may get printed BEFORE 5-----");
})
    .catch((err) => {
        console.log("DB CONNECTION ERROR: " + err);
        return;
    });
;