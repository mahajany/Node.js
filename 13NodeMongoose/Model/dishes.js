const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    name:           { type: String, required: true, unique: true},
    description:    { type: String, required: true, unique: true}
},
                    { timetamps:true} //Automatically add cratedAt and updateAt

);
var Dishes = mongoose.model('Dish', dishSchema); //This will pick up collection "dishes" automagically
module.exports = Dishes;