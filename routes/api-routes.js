const db=require('../models')
module.exports=function(app){
    app.get('/api/users',function(req,res){
        db.User.findAll({}).then(function(users){
            res.json(users);
        })
    })
}