const Vet = require('../models/vet');

module.exports = (router) => {

  router.get('/vets', function (req, res, next) {
    Vet.find({}, (err, vets) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        res.json(vets);
      }
    }).sort({ '_id': -1 });
  });

  router.get('/vets/:id', (req, res, next) => {
    Vet.findById({_id: req.params.id}, (err, vets) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        res.json(vets);
      }
    });
  });

  router.post('/vets', (req, res, next) => {
    if (!req.body.name) {
      res.json({ success: false, message: 'Debes escribir un nombre para el Veterinario' });
      return;
    }
    const vet = new Vet({
      name: req.body.name,
    });
    vet.save((err) => {
      if (err) {
        res.json({ success: false, message: 'Error!!!' });
      } else {
        res.json(vet);
      }
    });
  });

  router.put('/vets/:id', (req, res, next) => {
    if (!req.body.name) {
      console.log('No name');
      res.json({ success: false, message: 'Debes escribir un nombre para el Veterinario' });
      return;
    }
    Vet.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, (err, data) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, message: 'Client Saved!' });
      }
    })
  });

  router.delete('/vets/:id', (req, res, next) => {
    Vet.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, message: 'Client Deleted!' });
      }
    });
  });

  return router;
}