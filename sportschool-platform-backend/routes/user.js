var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Identifier = require('../models/identifier');


router.get('/', function(req, res, next){
    User.find()
        .exec(function(err, user){
            if (err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                title: 'Success',
                obj: user
            });
        });
});
router.get('/:userId/identifiers', function(req, res, next){
    const { userId } = req.params;
    User.findOne({_id: userId})
        .select('identifiers')
        .populate({
            'path': 'identifiers'
        })
        .then((user)=> {
            if (!user) throw new Error('User not found');
            return res.status(200).json(user.identifiers);
        })
        .catch((error) => {
            return res.status(500).json({
                title: 'An error occurred',
                error: error
            });
        });

});

router.use('/', function(req, res, next){
    jwt.verify(req.query.token, 'secret', function(err, docoded){
        if(err){
            return res.status(401).json({
                title:'Not Authenticated',
                error: err
            })
        }
        next();
    });
});


router.post('/', function(req, res, next) {
        var user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });

        user.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                user: 'Saved user',
                obj: result
            });
        });
});

router.patch('/:id', function(req, res, next){
    var decoded = jwt.decode(req.query.token);
    User.findById(req.params.id, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!user){
            return res.status(500).json({
                title: 'No message found!',
                error: {message: 'Message not found'}
            });
        }

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.credit = req.body.credit;
        user.save(function(err, result){
            if (err){
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                title:'Updated user',
                obj: result
            });
        });
    });
});



router.delete('/:id', function (req,res,next) {
    var decoded = jwt.decode(req.query.token);
	User.findById(req.params.id, function (err,user) {
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!user) {
            return res.status(500).json({
                title: 'No user found!',
                error: {user: 'User not found!'}
            });
        }
        let identifierRemovePromises = user.identifiers.map((identifierId) => {
            return Identifier.remove({_id: identifierId})
        });
        Promise.all(identifierRemovePromises)
            .then((result) => {
                user.remove(function(err, result){
                    if (err){
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                    res.status(201).json({
                        title:'Deleted user',
                        obj: result
                    });
                });
            })
            .catch((error) => console.error(error))
        });
    });
        // Identifier.find({user: req.params.id}, function (err,identifier) {
        //     console.log(identifier);
        //     if(err){
        //         return res.status(500).json({
        //             title: 'An error occurred',
        //             error: err
        //         });
        //     }
        //     if(!identifier) {
        //         return res.status(500).json({
        //             title: 'No identifier found!',
        //             error: {identifier: 'Identifier not found!'}
        //         });
        //     }
        //     identifier.delete({user: req.params.id},function(err, result){
        //         res.status(200).json({
        //             title: 'Removed identifier(s)',
        //             obj: result
        //         })
        //     });
        // user.remove(function(err, result){
        //     if (err){
        //         return res.status(500).json({
        //             title: 'An error occurred',
        //             error: err
        //         });
        //     }
        //     res.status(201).json({
        //         title:'Deleted user',
        //         obj: result
        //     });
        //     });
        // });
//     });
//

//
// Identifier.findByIdAndRemove(req.params.id, function(err, identifier){
//     if(err){
//         return res.status(500).json({
//             title: 'An error occurred',
//             error: err
//         });
//     }
//     if(!identifier) {
//         return res.status(500).json({
//             title: 'No identifier found!',
//             error: {identifier: 'Identifier not found!'}
//         });
//     }
// });



module.exports = router;