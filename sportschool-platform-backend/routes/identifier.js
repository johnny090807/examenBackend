var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Identifier = require('../models/identifier');
var User = require('../models/user');

var identifiersIds = [];

router.get('/:id', function(req, res, next){


    // console.log(req.params.id);
    // User.find()
    //     .exec(function(err, user){
    //         console.log(user);
    //         if (err) {
    //             return res.status(500).json({
    //                 title: 'An error occurred',
    //                 error: err
    //             });
    //         }
    //         Identifier.findById(user.identifiers, function (err, identifier) {
    //
    //             console.log(identifier);
    //             if (err) {
    //                 return res.status(500).json({
    //                     title: 'An error occurred',
    //                     error: err
    //                 });
    //             }
    //             res.status(201).json({
    //                 title: 'Success',
    //                 obj: identifier
    //             });
    //     });
    //
    // });
});

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});




router.post('/:id', function (req, res, next) {
    User.findById(req.body.userId, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        let identifier = new Identifier({
            nfcId: req.body.nfcId,
            user: req.body.userId
        });

        identifier.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.identifiers.push(result);
            user.save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
            });
            res.status(201).json({
                message: 'Saved identifier',
                obj: result
            });
        });
     });
 });

router.delete('/:id', function (req,res,next) {
    var decoded = jwt.decode(req.query.token);
    Identifier.removeAndFindById(req.params.id, function (err,identifier) {
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!identifier) {
            return res.status(500).json({
                title: 'No identifier found!',
                error: {identifier: 'Identifier not found!'}
            });
        }

    });
});


module.exports = router;