var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Auth = require('../models/auth');

router.post('/signin', function (req, res, next){
    Auth.findOne({userName: req.body.userName}, function(err, user){
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user){
            return res.status(401).json({
                title: 'Login failed',
                error: {message: "Email or Password don't match"}
            });
        }
        bcrypt.compare(req.body.password, user.password, (err, result)=>{
            if (err){
                return res.status(401).json({
                    title: 'Login failed',
                    error: err
                });
            }
            else if (result === false){
                return res.status(401).json({
                    title: 'Login failed',
                    error: {message: "Email or Password don't match"}
                });
            }
            var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
            res.status(200).json({
                title: 'Successfully logged in',
                token: token,
                userId: user._id
            });


            })

    });
});

router.use('/', function(req, res, next){
    jwt.verify(req.query.token, 'secret', function(err, decoded){
        if(err){
            return res.status(401).json({
                title:'Not Authenticated',
                error: err
            })
        }
        next();
    });
});

router.post('/', function(req, res, next){
    var user = new Auth({
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    user.save(function(err, result){
        if (err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            user:'Saved User',
            obj: result
        });
    });
});



module.exports = router;