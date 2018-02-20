var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

const Identifier = require('../models/identifier');

var schema = new Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required: true },
    email: {type: String, unique: true, required: true},
    credit: {type:Number, default: 0},
    identifiers: [{type: Schema.Types.ObjectId, ref: 'Identifier'}],
    subscriptionPlan: {type: Schema.Types.ObjectId, ref: 'subscriptionPlan'}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);