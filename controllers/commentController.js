var Abogados = require('../models/abogadoModel');
var Comments = require('../models/commentModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.get('/api/comments', function(req, res) {
        Comments.find({}, function(err, comms) {
            if (err)
                throw err
            res.send(comms)
        })
    })

    app.get('/api/comments/:id', function(req, res) {
        Abogados.findOne({ _id: req.params.id }, function(err, lawyer) {
            if (err)
                throw err;
            if(!lawyer){
                res.send('Lawyer not found');
            }else{
                Comments.find({id_abogado: lawyer._id}, function(err, comms) {
                    if (err)
                        throw err
                    res.send(comms);
                });
            }
        });
    });
    
    app.post('/api/comments/create_comment', function(req, res){
        var newComment = Comments({
            id_abogado: req.body.id_abogado,
            poster: req.body.poster,
            comment: req.body.comment
        })
        newComment.save(function(err, newCom) {
            if (err)
                throw err
            res.send("Comment saved")
        })
    });
}