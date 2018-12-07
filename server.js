const express= require ('express');
const app=express();
const path=require('path');
const PORT=process.env.PORT||8080;
require('dotenv').config();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

const db = require('./models');

require('./routes/api-routes')(app);


// Start the API server
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log(`App listening on PORT ${PORT}`);
    });
  });