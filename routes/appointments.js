const Appointment = require('../models/appointment');
const Pet = require('../models/pet');
const Customer = require('../models/customer');
const Vet = require('../models/vet');
const moment = require('moment');
moment.updateLocale('es', null);

module.exports = (router, io) => {

    router.get('/appointments', (req, res, next) => {
        Appointment.find({}, (err, appointments) => {
            if (err) {
                res.status(404).json({ success: false, message: err });
            } else {
            	res.json(appointments);
            }
        }).populate({
        	 path: 'pet',
             model: 'Pet',
             select: 'name specie',
             populate: {
                 path: 'owner',
                 model: 'Customer',
                 select: 'firstName lastName'
             }
        }).sort({ '_id': -1 });
    });

    router.get('/appointments/:id', (req, res, next) => {
    	if (req.params.id) {
            Appointment.findById({ _id: req.params.id }, (err, appointment) => {
                if (err) {
                    res.status(400).json({ success: false, message: err });
                } else {
                    res.json(appointment);
                }
            });
    	}
    });

    router.get('/pets/:id/appointments', (req, res, next) => {
        Appointment.find({pet: req.params.id}, (err, appointment) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.json(appointment);
            }
        }).populate({
            path: 'pet',
            model: 'Pet',
            select: 'name specie',
            populate: {
                path: 'owner',
                model: 'Customer',
                select: 'firstName lastName'
            }
        }).sort({ 'initDate': 1 });
    })

    router.get('/appointments/:initDate/:endDate', (req, res, next) => {
    	if (req.params.initDate && req.params.endDate){
            const initdate = moment(req.params.initDate, 'YYYYMMDD').toDate();
            const enddate = moment(req.params.endDate, 'YYYMMDD').toDate();
            
            Appointment.find({
                initDate: {
                    $gte: initdate,
                    $lte: enddate
                }
            }, (err, appointments) => {
                if (err) {
                    res.status(404).json({ success: false, message: err });
                } else {
                	res.json(appointments);
                }
            }).populate({
                path: 'pet',
                model: 'Pet',
                select: 'name specie',
                populate: {
                    path: 'owner',
                    model: 'Customer',
                    select: 'firstName lastName'
                }
            }).sort({ 'initDate': 1 });

            
    	}
    });

    router.post('/appointments', (req, res, next) => {
        if (!req.body.initDate) {
            res.status(404).json({ success: false, message: 'Debes escribir una fecha de inicio para esta cita' });
            return;
        }
        if (!req.body.endDate) {
            res.status(404).json({ success: false, message: 'Debes escribir una fecha de fin para esta cita' });
            return;
        }
        if (!req.body.pet) {
            res.status(404).json({ success: false, message: 'Debes especificar una mascota' });
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
            if (err) {
                res.status(404).json({ success: false, message: 'Error!!!' });
            } else {
                appointment.populate({
                    path: 'pet',
                    model: 'Pet',
                    select: 'name specie',
                    populate: {
                        path: 'owner',
                        model: 'Customer',
                        select: 'firstName lastName'
                    }
                }, (err, appointmentPopulate)=> {
                    if (err) {
                        res.status(404).json(err);
                    } else {
                        io.sockets.emit('appointmentPost', appointmentPopulate);
                        res.json(appointmentPopulate);
                    }
                });
                
            }
        })
    });
    
    router.put('/appointments/:id', (req, res, next) => {

        var version = req.body.__v;
        req.body.__v++;

    	Appointment.findOneAndUpdate({ _id: req.params.id, __v: version }, req.body, {new : true}, (err, appointment) => {
          if (err) {
            res.status(404).json(err);
          } else {
            appointment.populate({
                path: 'pet',
                model: 'Pet',
                select: 'name specie',
                populate: {
                    path: 'owner',
                    model: 'Customer',
                    select: 'firstName lastName'
                }
            }, (err, appointmentPopulate)=> {
                if (err) {
                    res.status(404).json(err);
                } else {
                    io.sockets.emit('appointmentPut', appointmentPopulate);
                    res.json(appointmentPopulate);
                }
            });
          }
        })
      });

    return router;
}