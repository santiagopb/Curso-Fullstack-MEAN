const Customer = require('../models/customer');

module.exports = (router, io) => {


  router.get('/customers', (req, res, next) => {
    Customer.find({}, (err, customers) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.json(customers)
      }
    }).sort({ '_id': -1 });
  });

  router.get('/customers/:id', (req, res, next) => {
    Customer.findById({ _id: req.params.id }, (err, customer) => {
      if (err) {
        res.status(404).json(err);
      } else {
        res.json(customer);
      }
    });
  });

  router.post('/customers', (req, res, next) => {
    if (!req.body.dni) {
      res.status(404).json({ success: false, message: 'Debes escribir un DNI' });
      next();
    }
    // Create new Client
    const customer = new Customer({
      dni: req.body.dni,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      email: req.body.email,
      note: req.body.note
    });
    customer.save((err) => {
      if (err) {
        res.status(404).json(err);
      } else {
        io.sockets.emit('customerPost', customer);
        res.json(customer)
      }
    });
  });


  router.put('/customers/:id', (req, res, next) => {
    if (!req.body.dni) {
      res.status(404).json({ success: false, message: 'Debes escribir un DNI' });
      next();
    }

    var version = req.body.__v;
    req.body.__v++;

    Customer.findOneAndUpdate({ _id: req.params.id, __v: version }, req.body, {new : true}, (err, data) => {
      if (err) {
        res.status(404).json(err);
      } else {
        io.sockets.emit('customerPut', data);
        res.json(data);
      }
    })
  });

  router.delete('/customers/:id', (req, res, next) => {
    Customer.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.status(404).json(err);
      } else {
        io.sockets.emit('customerDelete', req.params.id);
        res.json(data);
      }
    });
  });

  return router;
}