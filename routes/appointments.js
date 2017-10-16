const Appointment = require('../models/appointment');
const Pet = require('../models/pet');
const Client = require('../models/client');
const Vet = require('../models/vet');

module.exports = (router) => {

    router.get('/appointments', function(req, res, next){
        Appointment.find({}, (err, appointments) => {
        if (err) {
            res.json({success: false, message: err});
        } else {
            Pet.populate(appointments, {path: "pet"}, (err, pet) => {
                if (err) {
                  res.json({success: false, message: 'Error!!!'});
                  return;
                }
                Client.populate(pet, {path: "pet.owner"}, (err, client) => {
                    if (err){
                        res.json({success: false, message: 'Error!!!'});
                        return;
                    }
                    Vet.populate(appointments, {path: "vet"}, (err, vet) => {
                        if (err) {
                            res.json({success: false, message: 'Error!!!'});
                            return;
                        }
                        res.json({success: true, appointments: appointments});       
                      }); 
                })            
            });
        }
        }).sort({'_id': -1});
    });

    router.post('/appointments', (req, res, next) => {
        if (!req.body.date) {
            res.json({success: false, message: 'Debes escribir una fecha para esta cita'});
            return;
        }
        if (!req.body.pet) {
            res.json({success: false, message: 'Debes especificar una mascota para esta cita'});
            return;
        }
        if (!req.body.vet) {
            res.json({success: false, message: 'Debes especificar un veterinario para esta cita'});
            return;
         }
        const appointment = new Appointment({
          date: req.body.date,
          pet: req.body.pet,
          vet: req.body.vet,
          note: req.body.note
        });
        appointment.save((err) => {
          if (err){
            res.json({success: false, message: 'Error!!!'});
          }else {
              Pet.populate(appointment, {path: "pet"}, (err, pet) => {
                  if (err) {
                    res.json({success: false, message: 'Error!!!'});
                    return;
                  }      
                  Vet.populate(appointment, {path: "vet"}, (err, vet) => {
                    if (err) {
                        res.json({success: false, message: 'Error!!!'});
                        return;
                    }
                    res.json({success: true, message: 'La cita fue guardada exitosamente', appointment: appointment});       
                  });        
              });
          }
        })
      });

  return router;
}