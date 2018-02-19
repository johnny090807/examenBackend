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

// schema.statics.getById = function(_id){
//
//     return new Promise((resolve, reject) => {
//         // Find the lecture
//         this.findOne({_id: _id})
//         // On succesful
//             .then((user) => {
//                 // Warning lecture could be null!
//                 resolve(user)})
//             // On failure
//             .catch((err) => reject(err.errors[Object.keys(err.errors)[0]]));
//
//     });
// }
//
// schema.methods.createIdentifier = function(properties){
//     return new Promise((resolve, reject) => {
//         // Paragraph object
//         let identifiers = new Identifier({
//             nfcId: properties.nfcId,
//             user: this
//         })
//         // Save paragraph
//         identifiers.save()
//             .then((out) => {
//                 // Add paragraph to lecture
//                 return this.constructor.update(
//                     // Target
//                     {_id: this._id},
//                     // Update body
//                     { $addToSet: { identifiers: Identifier._id  }})
//             })
//             // succesful
//             .then((out) => resolve(identifiers) )
//             // On failure
//             .catch((err) => {
//                 let error = err.errors && err.errors.length > 0
//                     ? err.errors[Object.keys(err.errors)[0]]
//                     : err;
//                 reject(error)
//             });
//     })
// }

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);