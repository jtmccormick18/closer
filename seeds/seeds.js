const db = require('../models');

// Syncing our sequelize models 
// =============================================================
db.sequelize.sync({ force: true }).then(function () {
    db.User.bulkCreate([{
        username: 'JT',
        password: '123',
        email: 'josh.mccormick81@gmail.com',
        airport: 'ATL',
        budget: 2000
    }, {
        username: 'Neel',
        password: '123',
        email: 'neel@gmail.com',
        airport: 'ATL',
        budget: 5000
    }, {
        username: 'Anmarie',
        password: '123',
        email: 'anmarie@gmail.com',
        airport: 'BOS',
        budget: 6500
    }, {
        username: 'Wayne',
        password: '123',
        email: 'Wayne@gmail.com',
        airport: 'LAS'
    }, {
        username: 'Alex',
        password: '123',
        email: 'Alex@gmail.com',
        airport: 'SFO'
    }], { individualHooks: true }).then(function (response) {
        db.Partner.bulkCreate([{
            UserId: 1,
            name: 'SidePiece',
            partner_airport: 'PHL'
        },
        {
            UserId: 2,
            name: 'SidePiece2',
            partner_airport: 'LAX'
        },
        {
            UserId: 3,
            name: 'SidePiece3',
            partner_airport: 'MSP'
        }, {
            UserId: 4,
            name: 'SidePiece4',
            partner_airport: 'DFW'
        },
        {
            UserId: 5,
            name: 'SidePiece5',
            partner_airport: 'CLT'
        }
        ]).then(function (response) {
            db.Trip.bulkCreate([{
                destination_city: 'Los Angeles',
                destination_airport: 'LAX',
                date_leaving: '09/15/2019',
                date_returning: '09/19/2019',
                flight_number: 5

            }])
        })
    })
}).then(function (data) {
    console.log('Data successfully added!');
}).catch(function (error) {
    console.log('Error', error)
})
