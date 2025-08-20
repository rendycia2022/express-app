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

// error log handling
const { createLogger, transports, format } = require("winston");
const logger = createLogger({
  level: "error",
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.File({ filename: "logs/error.log" })]
});
app.use((err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({ message: err.message });
});

module.exports = app;