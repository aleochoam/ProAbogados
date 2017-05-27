var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    id_abogado: String,
    poster: String,
    comment: String

});

var Comments = mongoose.model('Comments', CommentSchema);

module.exports = Comments;