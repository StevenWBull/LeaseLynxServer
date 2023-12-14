# LeaseLynx Server

## Description
This is a server built using Node.js and Express.js. It provides API endpoints for managing user data, lease data, and notes. The server uses MongoDB as the database for storing data.

## Client

The client repo for this project can be found [HERE](https://github.com/StevenWBull/LeaseLynxClient)

## Deployments

The **LeaseLynx** server was deployed using Heroku.

The MongoDB Database is hosted on MongoDB's Cloud. (https://www.mongodb.com/atlas/database)

## Getting Started

To run the server locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the dependencies by running `npm install` in the project directory.
3. Create a `.env` file in the project root directory and add the necessary environment variables. Refer to the `.env.example` file for the required variables.
4. Start the server by running `npm start`.

## API Endpoints

### User Routes
- `GET /v1/user`: Get user information. Requires a valid userID in the request body.
- `PATCH /v1/user`: Update user information. Requires a valid userID in the request body. Supports updating first_name, last_name, email, and pword.

### Lease Data Routes
- `POST /v1/lease`: Add new lease data. Requires newLeaseData in the request body. Allows for adding multiple lease data at once.
- `DELETE /v1/lease/:leaseID`: Delete lease data by lease ID.

### Note Routes
- `POST /v1/note`: Add a new note. Requires userID and note in the request body.

### Auth Routes
- `POST /v1/auth/register`: Register a new user. Requires first_name, last_name, email, and pword in the request body.
- `POST /v1/auth/login`: Login with existing user credentials. Requires email and pword in the request body.
- `GET /v1/auth/logout`: Logout the currently logged-in user.

### Support Routes
- `POST /v1/support/contact`: Send a support contact message. Requires name, email, and message in the request body.

## Middleware

- `verifyToken`: Verifies the JWT token sent in the request headers. Protects authenticated routes.
- `retrieveUserInfo`: Retrieves user information based on the userID in the request body.
- `isRegisteredUser`: Checks if a user with the provided email exists in the database.
- `errorHandler`: Handles errors during request processing.
- `send404`: Sends a 404 Not Found response for undefined routes.
- `logger`: Logs incoming requests to a log file.
- `logEvents`: Utility function for logger middleware to write log entries.

## Database Connection

The server connects to a MongoDB database using the mongoose library. Connection details are in `config/dbConn.js`.

## Error Handling

Handled using the `errorHandler` middleware. Sends appropriate error responses to the client.

## Logging

Requests are logged using the `logger` middleware. Log entries are in `logs/requestLog.txt`.

## CORS Configuration

Configured using the `cors` library and `config/corsOptions.js`. Allows requests from specified origins.

## Environment Variables

Required variables are in the `.env.example` file. Create a `.env` file in the project root and add the necessary variables.

## Dependencies

- `express`: Web framework for Node.js
- `mongoose`: MongoDB object modeling library
- `jsonwebtoken`: JSON Web Token implementation
- `cors`: CORS middleware
- `date-fns`: Date utility library

## Development Dependencies

- `nodemon`: Automatically restarts the server on file changes

## License

This server application is open source and available under the MIT License.
