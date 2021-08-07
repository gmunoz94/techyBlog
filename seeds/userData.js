const { user } = require('../models');

const userData = [
    {
        username: 'firstUser',
        email: 'user@email.com',
        password: 'password',
        first_name: 'First',
        last_name: 'User'
    },
    {
        username: 'samtheman',
        email: 'sam@email.net',
        password: 'password1',
        first_name: 'Sam',
        last_name: 'Aydelotte'
    },
    {
        username: 'guesswho',
        email: 'someone@email.gov',
        password: 'somepassword',
        first_name: 'Some',
        last_name: 'Guy',
    },
    {
        username: 'lastOneGuys',
        email: 'last@email.com',
        password: 'finalpw!',
        first_name: 'Last',
        last_name: 'User'
    }
]

const seedUser = () => user.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = seedUser;