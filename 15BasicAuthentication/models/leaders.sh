const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promotionSchema = new Schema({
    name:           { type: String, required: true, unique: true},
    image:          {type: String, required: true},
    designation:    {type: String, required: true},
    abbrv:          {type: String, required: true},
    description:    {type: String, required: true},
},
                    { timestamps: true} //Automatically add cratedAt and updateAt

);
var Leaders = mongoose.model('Leaders', promotionsSchema); 
module.exports = Leaders;