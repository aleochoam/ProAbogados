var Cases = require('../models/caseModel');
var Abogados = require('../models/abogadoModel')
var bodyParser = require('body-parser');

// Todos.findByIdAndUpdate(req.body.id, { todo: req.body.todo, isDone: req.body.isDone, hasAttachment: req.body.hasAttachment }, function(err, todo) {
//     if (err) throw err;

    // res.send('Success');
// });

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/cases/', function(req, res) {
        if (!req.user) {
            res.send('not logged in')
        }else{
            Cases.find({ idUser: req.user.id }, function(err, case_data) {
                if (err) throw err;
                res.render('mycases', {cases: case_data})
            });
        }

    });

    app.get('/cases/create_case', function(req, res){
        Abogados.find({}, function(err, abogados_data) {
            if (err)
                throw err
            res.render("create_case", {abogados: abogados_data})

        });
    })

    app.get('/cases/:id', function(req, res) {
        Cases.findOne({_id : req.params.id}, function(err, case_data) {
            if (err) throw err
            Abogados.findOne({_id: case_data.idAbogado}, function(err, abogado_data){
                if (err) throw err
                res.render('case', {caso: case_data, abogado: abogado_data})
            })
        });

    });


    app.post('/cases/create_case', function(req, res){
        var newCase = Cases({
            title: req.body.title,
            description: req.body.descripcion,
            type: "",
            idUser: req.user.id,
            idAbogado: req.body.abogado
        });
        newCase.save(function(err, document) {
            if (err) throw err;
            res.redirect("/cases");
        });
    });

    app.get('/cases/:id/edit', function(req, res){
        Cases.findOne({_id : req.params.id}, function(err, case_data) {
            if (err) throw err
            Abogados.findOne({_id: case_data.idAbogado}, function(err, abogado_data){
                if (err) throw err
                res.render('edit_case', {caso: case_data, abogado: abogado_data})
            })
        });
    })
    //Se necesita id y role
    app.post('/cases/:id/edit', function(req, res) {
        Cases.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.descripcion
        }, function(err, newCase){
            if (err)
                throw err
            res.redirect('/cases')
        })
    });

    app.get('/cases/:id/delete', function(req, res) {
        Cases.findByIdAndRemove(req.params.id, function(err, document) {
            if (err) throw err;
            res.redirect('/cases');
        })

    });
}