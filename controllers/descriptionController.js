var Users = require('../models/userModel');
var Abogados = require('../models/abogadoModel');
var Descriptions = require('../models/descriptionModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.get('/api/users/description/:uname', function(req, res) {
        user = null;
        console.log(req.params);
        Abogados.findOne({ username: req.params.uname }, function(err, lawyer) {
            if (err) throw err;
            console.log(lawyer);
            if(!lawyer){
                res.send('User not found');
            }else{
                if(lawyer.description.match(/^[0-9a-fA-F]{24}$/)){
                    Descriptions.findById({ _id: lawyer.description_id }, function(err, user_desc) {
                        if (err) throw err;
                        if(!user_desc){
                            res.send('Description not found')
                        }else{
                            res.send(user_desc)
                        }
                    });
                }else{
                    res.send('Invalid description id');
                }
            }
        });
    });
    
    app.post('/api/abogados/description/create_desc', function(req, res){
        Abogados.findOne({username: req.body.username }, function(err,lawyer) {
            if (err)
                throw err
            if(lawyer && (lawyer.description_id == '' || lawyer.description_id == null)){
                var newDescription = Descriptions({
                    longDescription: req.body.longDescription,
                    titles: req.body.titles,
                    birthday: req.body.birthday,
                    others: req.body.others
                });
                console.log(newDescription)
                newDescription.save(function(err, new_desc) {
                    if (err)
                        throw err;
                    Abogados.findByIdAndUpdate(lawyer._id, { description_id: new_desc._id }, function(err, up_user) {
                        if (err) throw err;
                        res.send('Description added to '+ up_user.username);
                     });
                });
            }else{
                res.send('Lawyer not found or already has a description');
            }
        });
    });
}