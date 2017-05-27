// Se pasa el id de un userbot y de un abogado, se verifican ambos y se crea el
// caso en bot cases y se responde con true/false y el nombre de abogado

var Abogados = require('../models/abogadoModel')
var BotUsers = require('../models/botUserModel')
var BotCases = require('../models/botCaseModel');
var bodyParser = require('body-parser');

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.post('/api/bot_cases/verify', function(req, res) {
        BotUsers.find({_id: req.body.idUserBot}, function(err, userBot) { //Se busca al usuario bot en la db
          if (err)
            throw err
          if (userBot.length != 0) {
            Abogados.find({_id: req.body.idAbogado}, function(err, abogado) { //Se busca al abogado en la tabla de abogados
              if (err)
                throw err
              if (abogado.length != 0) {
                BotUsers.find({idAbogado: abogado[0]._id}, function(err, abogadoBot){ // Se busca al abogado en el bot
                  if (err)
                    throw(err)
                  var newCase = BotCases({
                    idUserBot: userBot[0]._id,
                    idAbogado: abogado[0]._id,
                    dateOfContact: new Date().valueOf(),
                    question: userBot[0].context.question, // sacar del contexto del botuser
                    state: "creado"
                  });
                  //console.log(abogadoBot)
                  newCase.save(function(err, document) {
                    if (err)
                      throw err
                    res.send({
                      "verify": true,
                      "userBot": document.idUserBot,
                      "abogado": abogado,
                      "idAbogadoBot": abogadoBot[0]._id, //mes...
                      "case": document
                    })
                  })
                  
                })
              }else{
                res.send({
                  "verify": false
                })
              }
            })
          }else{
            res.send({
              "verify": false
            })
          }
        })
    });

  app.post('/api/bot_cases/update/', function(req, res) {
    BotCases.findByIdAndUpdate(req.body.id, {status: req.body.status}, (err, up_case) =>{
      if (err)
        throw err;
      res.send(up_case);
    });
  });
}