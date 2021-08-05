const { user } = require('../models');

const userData = [
    {
        email: 'user@email.com',
        password: 'password',
    },
    {
        email: 'sam@email.net',
        password: 'password1',
    },
    {
        email: 'someone@email.gov',
        password: 'somepassword',
    },
    {
        email: 'last@email.com',
        password: 'finalpw!',
    }
]

const seedUser = () => user.bulkCreate(userData);

module.exports = seedUser;