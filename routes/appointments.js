const Appointment = require('../models/appointment');
const Pet = require('../models/pet');
const Customer = require('../models/customer');
const Vet = require('../models/vet');
const moment = require('moment');
require('moment/locale/es');

module.exports = (router) => {

    router.get('/appointments', (req, res, next) => {
        Appointment.find({}, (err, appointments) => {
        if (err) {
            res.json({success: false, message: err});
        } else {
            Pet.populate(appointments, {path: "pet"}, (err, pet) => {
                if (err) {
                  res.json({success: false, message: 'Error!!!'});
                  return;
                }
                Customer.populate(pet, {path: "pet.owner"}, (err, customer) => {
                    if (err){
                        res.json({success: false, message: 'Error!!!'});
                        return;
                    }
                    Vet.populate(appointments, {path: "vet"}, (err, vet) => {
                        if (err) {
                            res.json({success: false, message: 'Error!!!'});
                            return;
                        }
                        res.json(appointments);       
                    }); 
                })            
            });
        }
        }).sort({'_id': -1});
    });
    
    router.get('/appointments/:id', (req, res, next) => {
        Appointment.findById({_id: req.params.id}, (err, appointment) => {
          if (err) {
            res.json({ success: false, message: err });
          } else {
            res.json(appointment);
          }
        });
      });
    
    router.get('/appointments/date/:date', (req, res, next) => {
    	const date = moment(req.params.date, 'YYYYMM').calendar();
    	const initdate = date
    	const enddate = moment(date).add(1, 'month').calendar();
    	/*const month = moment(date).format('MM');
    	const year = moment(date).format('YYYY');*/
    	res.json(initdate + ' - ' + enddate);
    	/*
        Appointment.find({}, (err, appointments) => {
        if (err) {
            res.json({success: false, message: err});
        } else {
            Pet.populate(appointments, {path: "pet"}, (err, pet) => {
                if (err) {
                  res.json({success: false, message: 'Error!!!'});
                  return;
                }
                Customer.populate(pet, {path: "pet.owner"}, (err, customer) => {
                    if (err){
                        res.json({success: false, message: 'Error!!!'});
                        return;
                    }
                    Vet.populate(appointments, {path: "vet"}, (err, vet) => {
                        if (err) {
                            res.json({success: false, message: 'Error!!!'});
                            return;
                        }
                        res.json(appointments);       
                      }); 
                })            
            });
        }
        }).where(initDate < date).sort({'_id': -1});
        */
    });
    
    router.post('/appointments', (req, res, next) => {
        if (!req.body.initDate) {
            res.json({success: false, message: 'Debes escribir una fecha de inicio para esta cita'});
            return;
        }
        if (!req.body.endDate) {
            res.json({success: false, message: 'Debes escribir una fecha de fin para esta cita'});
            return;
        }
        if (!req.body.pet) {
            res.json({success: false, message: 'Debes especificar una mascota'});
            return;
        }
        const appointment = new Appointment({
          initDate: req.body.initDate,
          endDate: req.body.endDate,
          pet: req.body.pet,
          vet: req.body.vet,
          state: req.body.state,
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
                    res.json(appointment);       
                  });        
              });
          }
        })
      });

  return router;
}