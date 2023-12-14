const express = require('express');
var nodemailer = require('nodemailer');
require('dotenv').config();
const { logEvents } = require('../../middleware/logEvents');

const supportRouter = express.Router();

supportRouter.route('/').post((req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'yahoo',
            auth: {
                user: process.env.FROM_GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.FROM_GMAIL_USER,
            to: process.env.TO_GMAIL_USER,
            subject: 'LeaseLynx Support Request',
            text: JSON.stringify(req.body, null, 4),
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                logEvents(error, 'errorLog.txt');
                return res.status(400).json({ message: error.message });
            } else {
                logEvents(
                    `Support Email sent: ${info.response}`,
                    'emailLog.txt'
                );
                return res.status(201).json({ message: 'success' });
            }
        });
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
});

module.exports = supportRouter;
