const { LeaseData } = require('../model/userSchema');

// Get lease data from the userID provided in the req.body
const getLeaseData = async (req, res) => {
    const { leaseId } = req?.params;
    const user = req.user;

    try {
        // Find the category subdocument within the user document by its ID
        const leaseData = user.leaseData.id(leaseId);

        if (leaseData) {
            return res.status(200).json({
                message: 'Lease found.',
                userId: user._id,
                leaseData: leaseData,
            });
        } else {
            return res.status(404).json({
                message: 'Lease Data not found.',
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot get Lease Data.',
            error: err.message,
        });
    }
};

// Get all leaseData from the userID provided in the req.body
const getAllLeaseData = async (req, res) => {
    const user = req.user;

    try {
        // If length of leaseData array is 0, then no leaseData exist
        if (user.leaseData.length === 0) {
            return res.status(200).json({
                message: 'No Lease Data found for user.',
            });
        } else {
            return res.status(200).json({
                message: 'Lease Data found.',
                userId: user._id,
                leaseData: user.leaseData,
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot get Lease Data.',
            error: err.message,
        });
    }
};

// Add new leaseData to a userID. Allows for multiple leaseData to be added at once.
const addNewLeaseData = async (req, res) => {
    const { newLeaseData } = req?.body;
    const user = req.user;

    try {
        // Loop through the object array and generate a new lease for each
        for (lease in newLeaseData) {
            const leaseData = await LeaseData.create({
                leaseeName: newLeaseData[lease].leaseeName,
                leaseeEmail: newLeaseData[lease].leaseeEmail,
                leaseePhone: newLeaseData[lease].leaseePhone,
                leaseAddress: newLeaseData[lease].leaseAddress,
                leaseCity: newLeaseData[lease].leaseCity,
                leaseState: newLeaseData[lease].leaseState,
                leaseZip: newLeaseData[lease].leaseZip,
                leaseStart: newLeaseData[lease].leaseStart,
                leaseEnd: newLeaseData[lease].leaseEnd,
            });
            user.leaseData.push(leaseData);
        }

        await user.save();

        return res.status(201).json({
            message: `Lease Data added.`,
            userId: user._id,
            leaseData: user.leaseData,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot add Lease Data',
            error: err.message,
        });
    }
};

// Remove leaseData from a userID using a lease ID.
const deleteLeaseData = async (req, res) => {
    const leaseId = req.params.leaseId;
    const user = req.user;

    try {
        user.leaseData.id(leaseId).deleteOne();
        await user.save();

        return res.status(204).json({
            message: 'Lease Data deleted.',
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot delete Lease Data.',
            error: err.message,
        });
    }
};

module.exports = {
    getLeaseData,
    getAllLeaseData,
    addNewLeaseData,
    deleteLeaseData,
};
