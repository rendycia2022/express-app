require('dotenv').config(); // Muat variabel dari .env

const hostname = "http://192.168.0.170:"+process.env.PORT_APP;

module.exports = {
  PORT_APP: process.env.PORT_APP,
  HOSTNAME: hostname,
};