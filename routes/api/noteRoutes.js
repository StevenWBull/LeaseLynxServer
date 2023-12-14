const express = require('express');
const router = express.Router();
const retrieveUserInfo = require('../../middleware/retrieveInfo/retrieveUserInfo');
const noteController = require('../../controller/noteController');

router
    .route('/')
    .post(retrieveUserInfo, noteController.addNewNote);

module.exports = router;