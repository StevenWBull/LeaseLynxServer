const { User } = require('../../model/userSchema');

// Middleware to find and return the user
const retrieveUserInfo = async (req, res, next) => {
    let userId = req?.body?.userId;

    if (!userId) {
        userId = req?.params?.userId;
    }

    if (!userId) {
        return res.status(400).json({
            error: 'userId field is required.',
        });
    }
    try {
        // Check if user exists
        const user = await User.findById(userId);

        if (!user) {
            // 404 Not Found
            return res.status(404).json({
                error: 'No user with the given credentials exists.',
            });
        }

        // If user exists store info in the req
        req.user = user;
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
    next();
};

module.exports = retrieveUserInfo;
