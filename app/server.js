// src/server.js
const app = require('./src/app');
const config = require('./src/config/config');

const port = config.PORT_APP || 3000;

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});