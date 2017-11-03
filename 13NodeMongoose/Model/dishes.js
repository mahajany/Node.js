const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating:     { type: Number, min:1, max:5, requied: true },
    comment:    { type: String, required:true } ,
    author:     { type: String, required: true }
},
                { timestamps: true }
);
const dishSchema = new Schema({
    name:           { type: String, required: true, unique: true},
    description:    { type: String, required: true, unique: true},
    comments:       [commentSchema]
},
                    { timestamps: true} //Automatically add cratedAt and updateAt

);
var Dishes = mongoose.model('Dish', dishSchema); //This will pick up collection "dishes" automagically
module.exports = Dishes;