var LegalApp = require('../models/legalAppModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.get('/legalapp/', function(req, res) {
        LegalApp.find({}, function(err, info) {
            if (err)
                throw err
            if(info){
                res.send(info);
            }else{
                res.send('Did not find any info')
            }
            
        });
        
    });

    app.get('/legalapp/:id', function(req, res) {
        LegalApp.findOne({id: req.params.id}, function(err, info) {
            if (err)
                throw err
            if(info){
                res.send(info);
            }else{
                res.send('Did not find any info with id: '+ req.params.id)
            }
            
        });
        
    });

    app.post('/legalapp', function(req, res) {
        LegalApp.findOne({id: req.body.id}, function(err, info) {
            if (info) {
                res.send("That info already exist")
            }else{
                var newTopic = LegalApp({
                    id: req.body.id,
                    pregunta: req.body.pregunta,
                    tema: req.body.tema,
                    subtitulo: req.body.subtitulo,
                    ejemplo: req.body.ejemplo,
                    descripcion: req.body.descripcion,
                    que_hacer: req.body.que_hacer,
                    necesita_abogado: req.body.necesita_abogado
                });

                newTopic.save(function(err, document) {
                    if (err) throw err
                    res.send("Topic " + document.id + " creado")
                });
            }
        });
    });
}

