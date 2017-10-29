const Vet = require('../models/vet');

module.exports = (router, io) => {

  router.get('/vets', function (req, res, next) {
    Vet.find({}, (err, vets) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.json(vets);
      }
    }).sort({ '_id': -1 });
  });

  router.get('/vets/:id', (req, res, next) => {
    Vet.findById({_id: req.params.id}, (err, vet) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.json(vet);
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
        res.status(404).json(err);
      } else {
        io.sockets.emit('vetPost', vet);
        res.json(vet);
      }
    });
  });

  router.put('/vets/:id', (req, res, next) => {
    if (!req.body.name) {
      console.log('No name');
      res.status(404).json(err);
      return;
    }

    var version = req.body.__v;
    req.body.__v++;
    Vet.findOneAndUpdate({ _id: req.params.id, __v: version}, req.body, {new : true}, (err, data) => {
      if (err) {
        res.status(404).json(err);
      } else {
        io.sockets.emit('vetPut', data);
        res.json(data);
      }
    })
  });

  router.delete('/vets/:id', (req, res, next) => {
    Vet.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(404).json(err);
      } else {
        io.sockets.emit('vetDelete', data);
        res.json(data);
      }
    });
  });

  return router;
}