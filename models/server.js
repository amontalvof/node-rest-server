const express = require('express');
const cors = require('cors');
const colors = require('colors/safe');
const { dbConnection } = require('../database/config');
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // DB connection
        this.connectDB();

        // middlewares
        this.middlewares();

        //routes of my app
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // reading and parsing the body
        this.app.use(express.json());

        // public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/users'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(colors.cyan('Server running on port', this.port));
        });
    }
}

module.exports = Server;
