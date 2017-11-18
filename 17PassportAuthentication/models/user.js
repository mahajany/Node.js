var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    //Comment - now it is provided by passport
    // username : {type: String, required: true, unique: true},
    // password : {type: String, required: true},
    admin    : {type: Boolean, default: false}
});

UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);
