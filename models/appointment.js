const mongoose = require('mongoose');
const Pet = mongoose.model('Pet');
const Vet = mongoose.model('Vet');
const state = {cancel: -1, pendiente:0, enCurso:1, terminado:2}

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    initDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    pet: {type: Schema.ObjectId, ref: "Pet", required: true},
    vet: {type: Schema.ObjectId, ref: "Vet"},
    state: {type: Number, default: 0},
    note: {type: String}
});

module.exports = mongoose.model('Appointment', appointmentSchema);