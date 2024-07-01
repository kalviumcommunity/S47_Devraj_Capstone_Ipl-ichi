// // controllers/usersController.js
// const Users = require('../models/users/users');

// const registerUsersController = async (req, res) => {
//     try {
//         // Use the create method to insert a new tutor document
//         const users = await Users.create(req.body);
//         res.status(201).send(users);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// };
// module.exports = registerUsersController

// controllers/usersController.js
const Users = require('../models/users/users');

const registerUsersController = async (req, res) => {
    try {
        // Use the create method to insert a new tutor document
        const users = await Users.create(req.body);
        res.status(201).send(users);
    } catch (error) {
        res.status(400).send(error);
    }
};
module.exports = registerUsersController