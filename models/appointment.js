const mongoose = require('mongoose');
const Pet = mongoose.model('Pet');
const Vet = mongoose.model('Vet');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    date: {type: Date, required: true},
    pet: {type: Schema.ObjectId, ref: "Pet", required: true},
    vet: {type: Schema.ObjectId, ref: "Vet", required: true},
    note: {type: String}
});

module.exports = mongoose.model('Appointment', appointmentSchema);