require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const { logger, logEvents } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const send404 = require('./middleware/send404');
const verifyToken = require('./middleware/verifyToken');

const PORT = process.env.PORT || 5050;

connectDB();

// Activate middleware logEvents
app.use(logger);

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Support Route
app.use('/v1/support', require('./routes/api/supportRoutes'));

// Auth Routes
app.use('/v1/auth', require('./routes/api/authRoutes'));

// Middleware to verify JWT, routes after this point are protected
app.use(verifyToken);

// Protected Routes
app.use('/v1/user', require('./routes/api/userRoutes'));
app.use('/v1/lease', require('./routes/api/LeaseDataRoutes'));

app.all('*', (req, res) => send404(req, res));

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('MongoDB connected!');
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
