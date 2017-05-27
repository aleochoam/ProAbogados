var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var caseSchema = new Schema({
    title: String,
    description: String,
    type: String,
    idUser: String,
    idAbogado: String
});

var Cases = mongoose.model('Cases', caseSchema);

module.exports = Cases;