var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    name: String,
    lastname: String,
    description_id: String
});

var Users = mongoose.model('Users', userSchema);

module.exports = Users;