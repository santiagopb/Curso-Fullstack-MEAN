const Appointment = require('../models/appointment');
const Pet = require('../models/pet');
const Customer = require('../models/customer');
const Vet = require('../models/vet');
const moment = require('moment');
moment.updateLocale('es', null);

module.exports = (router) => {

    router.get('/appointment', (req, res, next) => {
        const StartAtHour = 9;
        const EndAtHout = 18;
        const IntervalInMinutes = 30; 

        const StartAtHourInMinutes = ( 60 / IntervalInMinutes ) * StartAtHour;
        const EndAtHourInMinutes = ( 60 / IntervalInMinutes ) * EndAtHout;

        var date = new Date();
        var initDate = moment(new Date(date.getFullYear(), date.getMonth(), 1))
                        .hour(StartAtHour)
                        .minute(0);
        var endDate =  moment(new Date(date.getFullYear(), date.getMonth() + 1, 0));
        
        var initDay = moment(initdate).date();
        var endDay = moment(endDate).month();
        /*
        for (days = initDay; days <= endDay; days++){
            for( hours = StartAtHourInMinutes; hours < EndAtHourInMinutes; hours+IntervalInMinutes){

            }
        }
        */


        console.log(initdate, enddate);
/*
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
                res.json({ success: false, message: 'Error!!!' });
            } else {
                res.json(appointment);
            }
        })
        */
    });



    router.post('/appointments', (req, res, next) => {
        if (!req.body.initDate) {
            res.json({ success: false, message: 'Debes escribir una fecha de inicio para esta cita' });
            return;
        }
        if (!req.body.endDate) {
            res.json({ success: false, message: 'Debes escribir una fecha de fin para esta cita' });
            return;
        }
        if (!req.body.pet) {
            res.json({ success: false, message: 'Debes especificar una mascota' });
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
                res.json({ success: false, message: 'Error!!!' });
            } else {
                Pet.populate(appointment, { path: "pet" }, (err, pet) => {
                    if (err) {
                        res.json({ success: false, message: 'Error!!!' });
                        return;
                    }
                    Vet.populate(appointment, { path: "vet" }, (err, vet) => {
                        if (err) {
                            res.json({ success: false, message: 'Error!!!' });
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