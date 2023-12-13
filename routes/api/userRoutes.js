const express = require('express');
const router = express.Router();
const userController = require('../../controller/userController');
const verifyUserPatch = require('../../middleware/retrieveInfo/retrieveUserInfo');

router
    .route('/')
    .get(userController.getUser)
    .patch(verifyUserPatch, userController.patchUser);

module.exports = router;
