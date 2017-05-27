var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var legalAppSchema = new Schema({
    id: String,
    pregunta: String,
    tema: String,
    subtitulo: String,
    ejemplo: String,
    descripcion: String,
    que_hacer: String,
    necesita_abogado: Boolean

});

var LegalApp = mongoose.model('LegalApp', legalAppSchema);

module.exports = LegalApp;