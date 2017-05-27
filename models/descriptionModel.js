var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var descriptionSchema = new Schema({
    longDescription: String,
    titles: [String],
    birthday: String,
    others: String
});

var Descriptions = mongoose.model('Descriptions', descriptionSchema);

module.exports = Descriptions;