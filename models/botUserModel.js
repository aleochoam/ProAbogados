var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var botUserSchema = new Schema({
    _id: String,
    idAbogado: String, //Si esta vacio es porque no es un abogado
    name: String,
    context: Object,
});

var BotUsers = mongoose.model('BotUsers', botUserSchema);

module.exports = BotUsers;