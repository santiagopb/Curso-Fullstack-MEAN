const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const petSchema = new Schema({
    photoUrl: {type: String},
    name: {type: String, required: true},
    birthday: {type: Date, required: true},
    specie: {type: String, required: true},
    race: {type: String, required: true},
    chipNumber: {type: String, required: true},
    description: {type: String},
    owner: {type: Schema.ObjectId, ref: "Customer", required: true}
});

module.exports = mongoose.model('Pet', petSchema);

