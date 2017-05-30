var Abogados = require('../models/abogadoModel');
var Comments = require('../models/commentModel');
var Descriptions = require('../models/descriptionModel');
var bodyParser = require('body-parser');

// Todos.findByIdAndUpdate(req.body.id, { todo: req.body.todo, isDone: req.body.isDone, hasAttachment: req.body.hasAttachment }, function(err, todo) {
//     if (err) throw err;

    // res.send('Success');
// });

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/abogados/', function(req, res) {
        Abogados.find({}, function(err, abogados_data) {
            if (err)
                throw err
            res.render("lawyers", {abogados: abogados_data})

        });

    });

    app.get('/abogados/:id', function(req, res) {

        Abogados.findOne({ _id: req.params.id }, function(err, abogado_data) {
            if (err)
                throw err;
            if(abogado_data){
                Descriptions.findById({ _id: abogado_data.description_id }, function(err, desc) {
                    if (err)
                        throw err;
                    Comments.find({id_abogado: abogado_data._id}, function(err, comms) {
                        if (err)
                            throw err
                        res.render("lawyer", {
                            "resumen": abogado_data,
                            "descripcion": desc,
                            "comentarios": comms
                        });
                    });
                });
            }else{
                res.send('Abogado not found');
            }
        });
    });

    app.get('/abogados/topic/:uname', function(req, res) {

        Abogados.find({ roles: {"$in" : [req.params.uname]} }, function(err, abogado_data) {
            console.log(abogado_data)
            if (err)
                throw err;
            if(abogado_data){
                res.send(abogado_data.slice(0,10));
            }else{
                res.send('Cant find lawyers with that topic')
            }

        });

    });

    app.post('/abogados/create_abogado', function(req, res){
        Abogados.findOne({username: req.body.username }, function(err,abogado) {
            if(abogado){
                res.send('Username already exists');
            }else{
                var newAbogado = Abogados({
                    username: req.body.username,
                    name: req.body.name,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    roles: req.body.roles,
                    city: req.body.city,
                    description_id: ''
                });
                newAbogado.save(function(err, document) {
                    if (err)
                        throw err;
                    res.send('Abogado '+ document.username + ' creation success');
                });
            }
        });
    });

    //Se necesita id y role
    app.put('/abogados/add_role', function(req, res) {
        if(req.body.role && req.body.id){
            Abogados.findById(req.body.id, function(err, abogado) {
                if (err)
                    throw err;
                var roles = abogado.role;
                if(aobgado){
                    if(roles.indexOf(req.body.role) != -1){
                        res.send('Lawyer already has role ' + req.body.role + '. Changes were not made.')
                    }else{
                        console.log(roles);
                        roles.push(req.body.role);
                        console.log(roles);
                        Abogados.findByIdAndUpdate(req.body.id, { roles: roles }, function(err, up_abogado) {
                            if (err)
                                throw err;
                            res.send('Description added to '+ up_abogado.username);
                        });
                    }
                }else{
                    res.send('Lawyer not found')
                }
            });
        }else{
            res.send('Id and role needed');
        }

    });

    app.delete('/abogados/delete_abogado', function(req, res) {

        Abogados.findByIdAndRemove(req.body.id, function(err, document) {
            if (err)
                throw err;
            res.send('Lawyer ' + document.username + ' deletion success.');
        })
        // res.send('Invalid lawyer id');

    });

    app.put('/abogados/', function(req, res) {
        Abogados.findByIdAndUpdate(req.body._id, {
            username: req.body.username,
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city,
            rating: req.body.rating,
            shortDesc: req.body.shortDesc
        }, function(err, document) {
            if (err)
                throw err
            res.send("Description changed to: " + document.username)
        });
    });

}