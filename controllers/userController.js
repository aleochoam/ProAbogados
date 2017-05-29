var Users = require('../models/userModel');
var Descriptions = require('../models/descriptionModel');
var bodyParser = require('body-parser');

// Todos.findByIdAndUpdate(req.body.id, { todo: req.body.todo, isDone: req.body.isDone, hasAttachment: req.body.hasAttachment }, function(err, todo) {
//     if (err) throw err;

    // res.send('Success');
// });

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/users/', function(req, res) {

        Users.find({}, function(err, users_data) {

            if (err) {throw err}

            if(users_data){
                res.send(users_data);
            }else{
                res.send('Did not find any user')
            }

        });

    });


    app.get('/users/:uname', function(req, res) {

        Users.find({ username: req.params.uname }, function(err, user_data) {
            if (err) throw err;
            if(user_data){
                res.send(user_data);
            }else{
                res.send('User not found')
            }

        });

    });

    app.post('/users/create_user', function(req, res){
        Users.findOne({username: req.body.username }, function(err,user) {
            if(user){
                res.send('Username already exists');
            }else{
                var newUser = Users({
                    username: req.body.username,
                    name: req.body.name,
                    lastname: req.body.lastname,
                    role: ['user'],
                    description_id: ''
                });
                newUser.save(function(err, document) {
                    if (err) throw err;
                    res.send('User '+ document.username + ' creation success');
                });
            }
        });
    });

    //Se necesita id y role
    app.put('/users/add_role', function(req, res) {
        if(req.body.role && req.body.id){
            Users.findById(req.body.id, function(err, user) {
                if (err) throw err;
                var roles = user.role;
                if(user){
                    if(roles.indexOf(req.body.role) != -1){
                        res.send('User already has role ' + req.body.role + '. Changes were not made.')
                    }else{
                        console.log(roles);
                        roles.push(req.body.role);
                        console.log(roles);
                        Users.findByIdAndUpdate(req.body.id, { role: roles }, function(err, up_user) {
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

    app.delete('/users/delete_user', function(req, res) {

        Users.findByIdAndRemove(req.body.id, function(err, document) {
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