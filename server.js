const express= require ('express');
const app=express();
const path=require('path');
const PORT=process.env.PORT||8080


app.use(express.urlencoded({ extended: true }));
app.use(express.json());




const db = require('./models');

require('./routes/api-routes')(app);


// Start the API server
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log(`App listening on PORT ${PORT}`);
    });
  });