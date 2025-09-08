import express, { json, urlencoded } from 'express';
const app = express();

import { HOSTNAME } from './config/config.js';
const hostname = HOSTNAME;

// Middleware global
app.use(json()); // Untuk parse body request JSON
app.use(urlencoded({ extended: true })); // Untuk parse body request URL-encoded

app.get('/', (req, res) => {
    res.send("Hello world from Express running in "+hostname+"! Devel Now...");
});

// Routes
import routes from './routers.js';
app.use('/api', routes);

// error log handling
import { createLogger, transports, format } from "winston";
const logger = createLogger({
  level: "error",
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.File({ filename: "logs/error.log" })]
});
app.use((err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });
  res.status(500).json({ message: err.message });
});

export default app;