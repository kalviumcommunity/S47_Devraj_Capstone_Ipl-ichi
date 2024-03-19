const express = require('express');
const router = express.Router();
const registerUsersController = require('../../controllers/usercontroller');

router.post('/register', registerUsersController);

module.exports = router;