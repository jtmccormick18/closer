const db = require('../models');
const jwt=require('jsonwebtoken');
const authentication = require('../middleware/authentication');

module.exports = function (app) {
    // Retrieving All Users
    app.get('/api/users', function (req, res) {
        db.User.findAll({}).then(function (users) {
            res.json(users);
        })
    })
    // Getting the user's home page after login
    app.get('/api/users/:id', authentication, function (req, res) {
        db.User.find({
            where: {
                id:req.params.id
            },
            include:[
                {
                model:db.Partner
            },
            {
                model:db.Trip
            }]
        }).then(resp=>{
            res.json(resp)
        }).catch(err=>{
            res.json(err);
        })
    })
    // Allowing Partner Adding
    app.post('/api/partners/:id', authentication, function(req,res){
        db.Partner.create(req.body)
        .then(success=>{
            res.json(success)
        }).catch(err=>{
            res.json(err)
        })
    })

    //Allowing account creation
    app.post('/api/users',function(req,res){
        db.User.create({
            username: req.body.username,
            password: req.body.password,
            nickname: req.body.nickname,
            budget: req.body.budget,
            email: req.body.email,
            airport: req.body.airport
        })
        .then(success=>{
            res.json(success)
        }).catch(err=>{
            res.status(500).json(err);
        })
    })
    //Parsing user input to hash through encrypted passwords
    app.post('/login', function(req,res){
        db.User.findOne({
            where: {
                username: req.body.username,
            }
        }).then(function (user) {
            if (!user || !user.validatePw(req.body.password)) {
                return res.status(401).json({
                    message: "Incorrect username or password."
                })
            } else {

                console.log(user)

                jwt.sign({
                    username: user.username,
                    id: user.id
                }, process.env.SK, { expiresIn: '30m' }, (err, token) => {
                    res.json({
                        token: token,
                        id: user.id,
                    }).catch(err => {
                        res.json({ err });
                    });
                });
            }

        }).catch(function (err) {
            console.log(`error: ${err}`);
            res.json({ error: err });
        });
    });
    // Creating a trip
    app.post('/api/trips', authentication, function(req,res){
        db.Trip.create(req.body)
        .then(success=>{
            res.json(success)
        }).catch(err=>{
            res.json(err);
        })
    });
}