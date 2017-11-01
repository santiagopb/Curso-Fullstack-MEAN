const Pet = require('../models/pet');
const Customer = require('../models/customer');
const multer = require('multer');

module.exports = (router, io) => {


    router.get('/pets', function (req, res, next) {
        Pet.find({}, (err, pets) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                res.json(pets);
            }
        }).populate({
            path: 'owner',
            model: 'Customer'
        }).sort({ '_id': -1 });
    });

    router.get('/pets/:id', function (req, res, next) {
        Pet.findById({ _id: req.params.id }, (err, pets) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                res.json(pets);
            }
        }).populate({
            path: 'owner',
            model: 'Customer'
        }).sort({ '_id': -1 });
    });

    //router.get('/pets/:id/owner', function (req, res, next) {
    router.get('/customers/:id/pets', function (req, res, next) {
        Pet.find({ owner: req.params.id }, (err, pets) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                res.json(pets);
            }
        }).populate({
            path: 'owner',
            model: 'Customer'
        }).sort({ '_id': -1 });
    });

    router.post('/pets', (req, res, next) => {

        const pet = new Pet({
            photoUrl: '',
            name: req.body.name,
            birthday: req.body.birthday,
            specie: req.body.specie,
            race: req.body.race,
            chipNumber: req.body.chipNumber,
            description: req.body.description,
            owner: req.body.owner
        });
        pet.save((err) => {
            if (err) {
                res.json({ success: false, message: 'Error!!!' });
            } else {
                pet.populate({
                    path: 'owner',
                    model: 'Customer'
                }, (err, petPopulate) => {
                    if (err) {
                        res.status(404).json(err);
                    } else {
                        io.sockets.emit('petPost', petPopulate);
                        res.json(petPopulate);
                    }
                });
            }
        })
    });

    router.post('/pets/:id', (req, res, next) => {
        const fileName = Date.now();
        const storage = multer.diskStorage({
            destination: './public/uploads/',
            filename: function (req, file, cb) {
                cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
            }
        });
        const upload = multer({ storage: storage }).single('photoUrl');
        upload(req, res, (err) => {
            if (err) {
                res.json({ success: false, message: err });
                return
            } else {
                console.log(req.file);
            }
        })
        console.log(req.file, req.params.id);
        res.json(req.params.id);
    })

    router.put('/pets/:id', (req, res, next) => {
        if (!req.body.name) {
            res.status(404).json({ success: false, message: 'Debes escribir un nombre para el Veterinario' });
            return;
        }

        var version = req.body.__v;
        req.body.__v++;

        Pet.findOneAndUpdate({ _id: req.params.id, __v: version }, req.body, { new: true }, (err, pet) => {
            if (err) {
                res.status(404).json(err);
            } else {
                pet.populate({
                    path: 'owner',
                    model: 'Customer'
                }, (err, petPopulate) => {
                    if (err) {
                        res.json({ success: false, message: 'Error!!!' });
                    } else {
                        io.sockets.emit('petPut', petPopulate);
                        res.json(petPopulate);
                    }
                });
            }
        })
    });

    router.delete('/pets/:id', (req, res, next) => {
        Pet.deleteOne({ _id: req.params.id }, (err, data) => {
            if (err) {
                res.status(404).json(err);
            } else {
                io.sockets.emit('petDelete', req.params.id);
                res.json(data);
            }
        });
    });

    return router;
}