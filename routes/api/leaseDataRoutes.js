const express = require('express');
const router = express.Router();
const retrieveUserInfo = require('../../middleware/retrieveInfo/retrieveUserInfo');
const verifyLeaseDataToAdd = require('../../middleware/leaseDataMiddleware/verifyLeaseDataToAdd');
const verifyLeaseDataToDelete = require('../../middleware/leaseDataMiddleware/verifyLeaseDataToDelete');
const leaseDataController = require('../../controller/leaseDataController');

// Get all leaseData or post more leaseData to a user via their ID
router;
router
    .route('/:userId/all')
    .get(retrieveUserInfo, leaseDataController.getAllLeaseData);

router
    .route('/')
    .post(
        retrieveUserInfo,
        verifyLeaseDataToAdd,
        leaseDataController.addNewLeaseData
    )

router
    .route('/:userId/:leaseId')
    .delete(
        retrieveUserInfo,
        verifyLeaseDataToDelete,
        leaseDataController.deleteLeaseData
    );

module.exports = router;
