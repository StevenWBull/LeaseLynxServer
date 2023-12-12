const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaseNotesSchema = new Schema({
    note: {
        type: String,
        required: true,
    },
    added_date: {
        type: Date,
        default: Date.now,
    },
});

const leaseDataSchema = new Schema({
    leaseeName: {
        type: String,
        required: true,
    },
    leaseeEmail: {
        type: String,
        required: true,
    },
    leaseePhone: {
        type: String,
        required: true,
    },
    leaseAddress: {
        type: String,
        required: true,
    },
    leaseCity: {
        type: String,
        required: true,
    },
    leaseState: {
        type: String,
        required: true,
    },
    leaseZip: {
        type: String,
        required: true,
    },
    leasePicture: {
        type: String,
        required: false,
    },
    leaseStart: {
        type: Date,
        required: true,
    },
    leaseEnd: {
        type: Date,
        required: true,
    },
    leaseMonthlyRent: {
        type: Number,
        required: false,
    },
    rentDueDate: {
        type: Number,
        required: true,
    },
    leaseNotes: [leaseNotesSchema],
});

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    pword: {
        type: String,
        required: true,
    },
    leaseData: {
        type: [leaseDataSchema],
        default: [],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

User = mongoose.model('User', userSchema);
LeaseDataSchema = mongoose.model('leaseDataSchema', leaseDataSchema);
LeaseNotesSchema = mongoose.model('leaseNotesSchema', leaseNotesSchema);

module.exports = {
    User,
    LeaseDataSchema,
    LeaseNotesSchema,
};
