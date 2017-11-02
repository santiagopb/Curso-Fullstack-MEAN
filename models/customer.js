const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    dni: {type: String},
    firstName: {type: String, required: true},
    lastName: {type: String},
    phone: {type: String},
    email: {type: String},
    note: {type: String}
});

module.exports = mongoose.model('Customer', customerSchema);