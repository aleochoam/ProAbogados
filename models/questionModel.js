var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var questionSchema = new Schema({
    question: String,
    username: String,
    answer: String,
    id_watson: String
});

var Questions = mongoose.model('Questions', questionSchema);

module.exports = Questions;