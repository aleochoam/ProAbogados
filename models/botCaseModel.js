var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BotCaseSchema = new Schema({
    idUserBot: String,
    idAbogado: String,
    question: String,
    dateOfContact: String,
    context: String,
    state: String
});

var BotCases = mongoose.model('BotCases', BotCaseSchema);

module.exports = BotCases;
