const Customer = require('../models/customer');

module.exports = (router, io) => {


  router.get('/customers', (req, res, next) => {
    Customer.find({}, (err, customers) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        res.json(customers)
      }
    }).sort({ '_id': -1 });
  });

  router.get('/customers/:id', (req, res, next) => {
    Customer.findById({ _id: req.params.id }, (err, customer) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        res.json(customer);
      }
    });
  });

  router.post('/customers', (req, res, next) => {
    if (!req.body.dni) {
      res.json({ success: false, message: 'Debes escribir un DNI' });
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
        res.json({ success: false, message: err });
      } else {
        res.json(customer)
      }
    });
  });


  router.put('/customers/:id', (req, res, next) => {
    if (!req.body.dni) {
      res.json({ success: false, message: 'Debes escribir un DNI' });
      next();
    }
    Customer.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, (err, data) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        io.sockets.emit('customerPut', {message: 'SIIIII'});
        res.json({ success: true, message: 'Client Saved!' });
      }
    })
  });

  router.delete('/customers/:id', (req, res, next) => {
    Customer.deleteOne({ _id: req.params.id }, (err, data) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        res.json({ success: true, message: 'Client Deleted!' });
      }
    });
  });

  return router;
}