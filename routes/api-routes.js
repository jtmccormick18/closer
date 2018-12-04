const db = require('../models')
module.exports = function (app) {
    app.get('/api/users', function (req, res) {
        db.User.findAll({}).then(function (users) {
            res.json(users);
        })
    })
    app.get('/api/users/:id', function (req, res) {
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
    app.post('api/partners/:id',function(req,res){
        db.Partner.update(req.body)
        .then(success=>{
            res.json(success)
        }).catch(err=>{
            res.json(err)
        })
    })
    //Git Relay
}