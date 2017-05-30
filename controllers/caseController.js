var Cases = require('../models/caseModel');
var bodyParser = require('body-parser');

// Todos.findByIdAndUpdate(req.body.id, { todo: req.body.todo, isDone: req.body.isDone, hasAttachment: req.body.hasAttachment }, function(err, todo) {
//     if (err) throw err;

    // res.send('Success');
// });

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // app.get('/cases/', function(req, res) {

    //     Cases.find({}, function(err, cases_data) {
    //         if (err)
    //             throw err;
    //         if(cases_data){
    //             res.send(cases_data);
    //         }else{
    //             res.send('Can not find any cases')
    //         }

    //     });

    // });

    app.get('/cases/', function(req, res) {
        if (!req.user) {
            res.send('not logged in')
        }else{
            Cases.find({ idUser: req.user.username }, function(err, case_data) {
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

    app.post('/Cases/create_case', function(req, res){
        var newUser = Cases({
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            idUser: req.body.idUser,
            idAbogado: req.body.idAbogado
        });
        newUser.save(function(err, document) {
            if (err) throw err;
            res.send('Case: '+ document.id + ' created');
        });
    });

    //Se necesita id y role
    app.put('/Cases/add_role', function(req, res) {
        if(req.body.role && req.body.id){
            Cases.findById(req.body.id, function(err, user) {
                if (err) throw err;
                var roles = user.role;
                if(user){
                    if(roles.indexOf(req.body.role) != -1){
                        res.send('User already has role ' + req.body.role + '. Changes were not made.')
                    }else{
                        console.log(roles);
                        roles.push(req.body.role);
                        console.log(roles);
                        Cases.findByIdAndUpdate(req.body.id, { role: roles }, function(err, up_user) {
                            if (err) throw err;
                            res.send('Description added to '+ up_user.username);
                        });
                    }
                }else{
                    res.send('User not found')
                }
            });
        }else{
            res.send('Id and role needed');
        }

    });

    app.delete('/Cases/delete_user', function(req, res) {

        Cases.findByIdAndRemove(req.body.id, function(err, document) {
            if (err) throw err;
            res.send('User ' + document.username + ' deletion success.');
        })
        res.send('Invalid user id');

    });
    // app.delete('/todo', function(req, res) {

    //     Todos.findByIdAndRemove(req.body.id, function(err) {
    //         if (err) throw err;
    //         res.send('Success');
    //     })

    // });

}