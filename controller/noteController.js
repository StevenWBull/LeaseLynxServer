const { LeaseNotes } = require('../model/userSchema');

// Add new note to a leaseID
const addNewNote = async (req, res) => {
    const { newNote, leaseId } = req?.body;
    const user = req.user;
    const leaseData = user.leaseData.id(leaseId);

    try {
        // Add new note to leaseData
        const note = await LeaseNotes.create({ note: newNote });
        leaseData.leaseNotes.push(note);

        await user.save();

        return res.status(201).json({
            message: `New note added.`,
            userId: user._id,
            notes: leaseData.leaseNotes,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Cannot add note',
            error: err.message,
        });
    }
};

module.exports = {
    addNewNote,
};
