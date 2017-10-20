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
        const IdPet = '59ddf017d76a8317b83f7277';

        const StartAtHourInMinutes = 60 * StartAtHour;
        const EndAtHourInMinutes =  60  * EndAtHout;

        var date = new Date();
        var initDate = moment(new Date(date.getFullYear(), date.getMonth(), 1))
                        .hour(0)
                        .minute(0);
        var endDate =  moment(new Date(date.getFullYear(), date.getMonth() + 1, 0));
        
        var initDay = moment(initDate).date();
        var endDay = moment(endDate).date();
        
 
        var appointment;
        for (days = initDay; days <= endDay; days++){
        	
        	// Start de date with default hour
        	initDate = moment(initDate).hour(StartAtHour);
            for( hours = StartAtHourInMinutes; hours < EndAtHourInMinutes; hours+=IntervalInMinutes){
            	
            	// Define endDate
            	endDate = moment(initDate).add(IntervalInMinutes-1, 'minutes');
            	
            	// Validate if not weekend
            	//if (moment(initDate).isoWeekday() < 6){
            		
            		// Create New Appointment with values
                    appointment = new Appointment({
                        initDate: initDate,
                        endDate: endDate,
                        pet: IdPet
                    });
                    
                    // Save Appointment
                    appointment.save((err) => {
                        if (err) {
                            res.json({ success: false, message: 'Error!!!' });
                        } else {
                            console.log(appointment);
                        }
                    });
                	
            		
            	//}

            	// Increment Interval in Minutes
            	initDate = moment(initDate).add(IntervalInMinutes, 'minutes');
            }
            
            // Increment 1 day
            initDate = moment(initDate).add(1, 'days').hour(StartAtHour);
        }
        
        res.json({ok: '****'})

    });
    
    router.get('/appointment/reset', (req, res, next) => {
    	Appointment.remove({}, (err, date) => {
    		//
    	})
    });


    return router;
}