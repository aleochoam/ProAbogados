var BotUsers = require('../models/botUserModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.get('/bot_user/', function(req, res) {
        BotUsers.find({}, function(err, botUser_data) {
            if (err)
                throw err
            if(botUser_data){
                res.send(botUser_data);
            }else{
                res.send('Did not find any bot user')
            }
            
        });
        
    });

    app.put('/bot_user/:uname', function(req, res) {
        BotUsers.findByIdAndUpdate(req.params.uname, { idAbogado: req.body.idAbogado }, function(err, up_user) {
            if (err) throw err;
                res.send('Description added to '+ up_user);
            });
    });

    app.get('/bot_user/:uname', function(req, res) {
        
        BotUsers.find({ _id: req.params.uname }, function(err, user_data) {
            if (err) throw err;
            if(user_data.length != 0){
                res.send(user_data);
            }else{
                res.send('bot User not found')
            }
            
        });
        
    });
}