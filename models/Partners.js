module.exports = function(connection, Sequelize) {
    const Partner= connection.define('Partner', {
      name: {
          type:Sequelize.STRING,
      },
      partner_airport: {
          type:Sequelize.STRING,
          isIn:[['ATL','LAX','ORD','DFW','DEN','JFK','SFO','LAS','SEA','CLT','EWR','MCO','PHX','MIA','IAH','BOS','MSP','DTW','FLL','PHL','LGA','BWI','SLC','DCA','IAD','SAN','MDW','TPA','HNL','PDX']]
      }
    });
    Partner.associate=function(models){
        Partner.belongsTo(models.User,{
            foreignKey:{
                allowNull:false
            },
            onDelete:'cascade'
        });
    }
    return Partner;
  }