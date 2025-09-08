// src/server.js
import app from './src/app.js';
import { PORT_APP } from './src/config/config.js';

const port = PORT_APP || 3000;

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});