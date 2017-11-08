const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    rating:     { type: Number, min:1, max:5, requied: true },
    comment:    { type: String, required:true } ,
    author:     { type: String, required: true }
},
                { timestamps: true }
);
const dishSchema = new Schema({
    name:           { type: String, required: true, unique: true},
    description:    { type: String, required: true, unique: false},
    comments:       [commentSchema],
    image:          {type: String, required: true},
    category:       {type: String, required: true},
    label:          {type: String, default:''},
    price:          {type: Currency, required: true, min:0},
    featured:       {type: Boolean, required: false}
},
                    { timestamps: true} //Automatically add cratedAt and updateAt

);
var Dishes = mongoose.model('Dish', dishSchema); //This will pick up collection "dishes" automagically
module.exports = Dishes;