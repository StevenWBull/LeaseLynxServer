// Middleware to verify if the lease to be deleted exists
const verifyLeaseDataToDelete = async (req, res, next) => {
    const user = req.user;
    const leaseDataId = req.params.leaseId;

    if (!leaseDataId) {
        return res.status(400).json({
            message: 'leaseId field is required.',
        });
    }

    try {
        // If lease ID does not exist, return error
        if (!user.leaseData.id(leaseDataId)) {
            return res.status(400).json({
                message: `Lease Data ID ${leaseDataId} does not exist for user.`,
            });
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot delete Lease Data.',
            error: err.message,
        });
    }
    next();
};
module.exports = verifyLeaseDataToDelete;
