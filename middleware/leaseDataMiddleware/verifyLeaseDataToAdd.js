// Middleware to verify is a user already has given Lease Data
const verifyLeaseDataToAdd = async (req, res, next) => {
    const user = req.user;
    const { newLease } = req?.body;

    try {
        for (c in newLease) {
            if (
                user.leaseData.some(
                    (lease) =>
                        lease.leaseAddress.toLowerCase() ===
                        newLease[c].leaseAddress.toLowerCase()
                )
            ) {
                return res.status(400).json({
                    error: `Lease Data Address ${newLease[c].leaseAddress} already exists for user.`,
                });
            }
        }
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot verify Lease Data',
            error: err.message,
        });
    }
    next();
};

module.exports = verifyLeaseDataToAdd;
