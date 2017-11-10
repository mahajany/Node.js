var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({
    usename: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin : {type: Boolean, default: false}
});

module.export = mongoosel.model('User', User);