var Cases = require('../models/caseModel');
var bodyParser = require('body-parser');

// Todos.findByIdAndUpdate(req.body.id, { todo: req.body.todo, isDone: req.body.isDone, hasAttachment: req.body.hasAttachment }, function(err, todo) {
//     if (err) throw err;
    
    // res.send('Success');
// });

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.get('/api/cases/', function(req, res) {
        
        Cases.find({}, function(err, cases_data) {
            if (err)
                throw err;
            if(cases_data){
                res.send(cases_data);
            }else{
                res.send('Can not find any cases')
            }
            
        });
        
    });

    app.get('/api/cases/:uname', function(req, res) {
        
        Cases.find({ idUser: req.params.uname }, function(err, case_data) {
            if (err) throw err;
            if(case_data){
                res.send(case_data);
            }else{
                res.send('Case not found')
            }
            
        });
        
    });
    
    app.post('/api/Cases/create_case', function(req, res){
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
    app.put('/api/Cases/add_role', function(req, res) {
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

    app.delete('/api/Cases/delete_user', function(req, res) {
        
        Cases.findByIdAndRemove(req.body.id, function(err, document) {
            if (err) throw err;
            res.send('User ' + document.username + ' deletion success.');
        })
        res.send('Invalid user id');
        
    });
    // app.delete('/api/todo', function(req, res) {
        
    //     Todos.findByIdAndRemove(req.body.id, function(err) {
    //         if (err) throw err;
    //         res.send('Success');
    //     })
        
    // });
    
}