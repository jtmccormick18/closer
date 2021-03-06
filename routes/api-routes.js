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
    app.get('/api/partners/:id',function(req,res){
        db.Partner.find({
            where:{
                userid:req.params.id
            }
        }).then(resp=>{
            res.json(resp)
        }).catch(err=>{
            res.json(err)
        })
    })
    // Allowing Partner Adding
    app.post('/api/partners/:id', function(req,res){
        db.Partner.create({
            UserId: req.params.id,
            name: req.body.name,
            partner_airport: req.body.partner_airport
        })
        .then(success=>{
            res.json(success)
        }).catch(err=>{
            res.json(err)
        })
    })
    //Allow midpoint send and closest airport retrieval
    app.post('/api/midpoint',function(req,res){
        db.sequelize.query(`SELECT id, ita,lattitude,longitude,airport, ( 3959 * acos( cos( radians(${req.body.lat}) ) * cos( radians( lattitude ) ) 
        * cos( radians( longitude ) - radians(${req.body.long}) ) + sin( radians(${req.body.lat}) ) * sin(radians(lattitude)) ) ) AS distance 
        FROM airports 
        ORDER BY distance 
        LIMIT 0 , 5;
        `).then(resp=>{
            res.json(resp)
        }).catch(err=>{
            res.json(err)
        })
    })
    //Allowing Partner Updating
    app.put("/api/partners/:id", function(req, res) {
        db.Partner.update(
          { name: req.body.name, 
            partner_airport: req.body.partner_airport },
          { where: { UserId: req.params.id } }
        )
          .then(success => {
            res.json();
          })
          .catch(err => {
            res.json(err);
          });
      });
    

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
    //Finding airport GEO-Coordinates
    app.get('/airports/:id',function(req,res){
        db.sequelize.query(`select * from airportdb where userid=${req.params.id}`)
        .then(resp=>{
            res.json(resp)
        })
        .catch(err=>{
            res.json(err)
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
                        username: user.username,
                        airport: user.airport
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

    //creating a Authentication route
    app.get('/check', authentication, function(req,res){
        res.status(200).end();
    })
}