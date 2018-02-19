var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('./user');

var schema = new Schema({
    nfcId: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref:'User'},
});

schema.post('remove', function (identifier) {
    User.findById(identifier.user, function (err, user) {
        user.identifiers.pull(identifier);
        user.save();
    });
});

module.exports = mongoose.model('Identifier', schema);