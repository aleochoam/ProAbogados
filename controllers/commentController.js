var Abogados = require('../models/abogadoModel');
var Comments = require('../models/commentModel');
var bodyParser = require('body-parser');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/comments', function(req, res) {
        Comments.find({}, function(err, comms) {
            if (err)
                throw err
            res.send(comms)
        })
    })

    app.get('/comments/:id', function(req, res) {
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

    app.get('/comments/create_comment/:id', function(req, res){
        Abogados.findOne({ _id: req.params.id }, function(err, lawyer) {
            res.render("create_comment", {abogado: lawyer})
        });
    })

    app.post('/comments/:id', function(req, res){
        var username = req.user.username ? req.user.username : "anonimo"
        var newComment = Comments({
            id_abogado: req.params.id,
            poster: username,
            comment: req.body.comentario
        })
        newComment.save(function(err, newCom) {
            if (err)
                throw err
            res.send("Comment saved")
        })
    });
}