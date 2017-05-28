var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var abogadoSchema = new Schema({
    username: String,
    password: String,
    name: String,
    lastname: String,
    email: String,
    phone: String,
    description_id: String,
    roles: [String], //especialidades del abogado
    cases: [String],
    city: String,
    rating: Number,
    shortDesc: String

});

var Abogados = mongoose.model('Abogados', abogadoSchema);

module.exports = Abogados;