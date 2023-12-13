const { User } = require('../model/userSchema');
const jwt = require('jsonwebtoken');

const _generateJWTToken = (user) => {
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    const payload = {
        id: user._id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' }); // Token expires in 1 week
    return token;
};

const getUser = async (req, res) => {
    const { userID } = req?.body;
    if (!userID) {
        // 400 Bad Request
        return res.status(400).json({
            error: 'userID request variable is required',
        });
    }
    try {
        // Find user via built in schema function
        const user = await User.findById(userID);

        if (user) {
            // 200 OK
            return res.status(200).json({
                message: 'User found.',
                user: user,
            });
        } else {
            // 404 Not Found
            return res.status(404).json({
                error: 'User not found.',
            });
        }
    } catch (err) {
        // 500 Internal Server Error
        return res.status(500).json({ error: err.message });
    }
};

// Update User info from the req.user and req.filter variables. These are passed from the verifyUserPatch middleware.
const patchUser = async (req, res) => {
    const { userID, first_name, last_name, email, pword } =
        req?.body;

    // User data to update if included
    let filter = {};
    if (first_name) filter.first_name = first_name;
    if (last_name) filter.last_name = last_name;
    if (email) filter.email = email;
    if (pword) filter.pword = pword;

    // Don't send a DB request if there are no values to update
    if (Object.keys(filter).length === 0) {
        return res.status(400).json({
            message: 'No user values provided to update.',
        });
    }

    try {
        let user = await User.findOneAndUpdate({ _id: userID }, filter, {
            new: true,
        });

        delete user.pword;
        return res.status(200).json({
            message: `User values ${Object.keys(filter)} updated.`,
            currentUserInfo: user,
            token: _generateJWTToken(user),
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Error updating User info',
            error: err.message,
        });
    }
};

module.exports = {
    getUser,
    patchUser,
};
