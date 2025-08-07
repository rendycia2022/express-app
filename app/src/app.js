const express = require('express');
const app = express();

const config = require('./config/config');
const hostname = config.HOSTNAME;

// Middleware global
app.use(express.json()); // Untuk parse body request JSON
app.use(express.urlencoded({ extended: true })); // Untuk parse body request URL-encoded

app.get('/', (req, res) => {
    res.send("Hello world from Express running in "+hostname+"! Devel Now...");
});

// Routes
const routes = require('./routers');
app.use('/api', routes);

module.exports = app;