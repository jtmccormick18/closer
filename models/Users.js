const bcrypt = require('bcryptjs');

const hashPassword = function (user) {
    user.password = bcrypt.hashSync(user.password, 12);
};
module.exports = function(connection, Sequelize) {
    const User= connection.define('User', {
      username: {
          type:Sequelize.STRING,
          unique:true,
          len:[2,20],
          allowNull:false
      },
      password: {
          type:Sequelize.STRING
      },
      email:{
          type:Sequelize.STRING,
          isEmail:true
      },
      nickname:{
          type:Sequelize.STRING,
          allowNull:true
      },
      airport: {
          type:Sequelize.STRING,
          isIn:[['ATL','LAX','ORD','DFW','DEN','JFK','SFO','LAS','SEA','CLT','EWR','MCO','PHX','MIA','IAH','BOS','MSP','DTW','FLL','PHL','LGA','BWI','SLC','DCA','IAD','SAN','MDW','TPA','HNL','PDX']]
      },
      budget:{
        type:Sequelize.INTEGER,
        allowNull:true
      }
    });
    User.associate = function (models) {
        User.hasOne(models.Partner);
        User.hasMany(models.Trip);
    }

    User.beforeCreate(hashPassword);

    User.prototype.validatePw = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
  
    return User;
  }