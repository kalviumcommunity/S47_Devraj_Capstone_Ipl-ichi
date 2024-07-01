// const express = require('express');
// const router = express.Router();
// const registerUsersController = require('../../controllers/usercontroller');
// const piccontrol = require('../../controllers/piccontroller');

// router.post('/register', registerUsersController);

// //multer file upload and download
// router.post('/picupload', piccontrol.uploadpic);
// router.get('/getpic', piccontrol.getpic);

// module.exports = router;

const express = require('express');
const router = express.Router();
const registerUsersController = require('../../controllers/usercontroller');
const piccontrol = require('../../controllers/piccontroller');

router.post('/register', registerUsersController);

//multer file upload and download
router.post('/picupload', piccontrol.uploadpic);
router.get('/getpic', piccontrol.getpic);

module.exports = router;