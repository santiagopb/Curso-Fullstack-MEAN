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

    router.get('/appointments/:initDate/:endDate', (req, res, next) => {
    	if (req.params.initDate && req.params.endDate){
            const initdate = moment(req.params.initDate, 'YYYYMMDD').toDate();
            const enddate = moment(req.params.endDate, 'YYYMMDD').toDate();
            
            /*
            Appointment.aggregate([
                {
                	"$match": {
                		initDate: {
                			$gte: new Date(initdate),
                			$lte: new Date(enddate)
                		}
                	}
                },
                { 
                    "$lookup": { 
                        from: "Pet", 
                        localField: "pet", 
                        foreignField: "_id", 
                        as: 'pet' 
                    } 
                },
                {
                    "$group": {
                        _id: {$dayOfYear: "$initDate"},
                        date: {"$first":"$initDate"},
                        values: {
                        	"$push": {
                        		initHour: { "$concat":[
                        			{"$substr":[{$hour: "$initDate"},0,2]},
                        			{"$substr":[{$minute: "$initDate"},0,2]}
                        			]
                        		},
                        		endHour: {$hour: "$endDate"},
                        		pet: "$pet",
                        		vet: "$vet"
                        			
                        	}
                        },
                        total: { $sum: 1 }
                    }
                },
                {
                	"$project": {
                		_id: 0,
                		date: 1,
                		values: 1,
                		pet: 1
                	}
                },
                { 
            		"$sort":{
            			date: 1
            		} 
            	}
            ],
            function(err,results) {
                if (err) console.log('ERROR------------------');
                else{
                	res.json(results);

                    
                }
                
            })
            */
           

            Appointment.find({
                initDate: {
                    $gte: initdate,
                    $lte: enddate
                }
            }, (err, appointments) => {
                if (err) {
                    res.status(404).json({ success: false, message: err });
                } else {
                	appointments = appointments.reduce(function(mapa, item){
                		date = moment(item.initDate).format('YYYY-MM-DD');
                		time = moment(item.initDate).format('HH:mm');
                		if (!mapa) var mapa={};
                		if (!mapa[date]) mapa[date] = {}
                		if (!mapa[date][time]) mapa[date][time] = item
                		
                		return mapa;
                	},{})
                    
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
    
    router.put('/appointments/:id', (req, res, next) => {
    	Appointment.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, (err, data) => {
          if (err) {
        	  console.log(err);
            res.json({ success: false, message: err });
          } else {
        	  console.log('Ok')
            res.json({ success: true, message: 'Saved!' });
          }
        })
      });

    return router;
}