module.exports = function(connection, Sequelize) {
    const Trip= connection.define('Trip', {
      destination_city: {
          type:Sequelize.STRING,
      },
      destination_airport: {
          type:Sequelize.STRING,
          isIn:[['ATL','LAX','ORD','DFW','DEN','JFK','SFO','LAS','SEA','CLT','EWR','MCO','PHX','MIA','IAH','BOS','MSP','DTW','FLL','PHL','LGA','BWI','SLC','DCA','IAD','SAN','MDW','TPA','HNL','PDX']]
      },
      date_leaving:{
        type:Sequelize.DATEONLY
      },
      date_returning:{
          type:Sequelize.DATEONLY
      },
      flight_number:{
          type:Sequelize.INTEGER
      },
      has_expired:{
          type:Sequelize.BOOLEAN,
          default:false
      }
    });
    Trip.associate=function(models){
        Trip.belongsTo(models.User,{
            foreignKey:{
                allowNull:false
            },
            onDelete:'cascade'
        })
    }
  
    return Trip;
  }