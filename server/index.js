require('dotenv').config();
const app = require('./src/app');
const { connectDatabase } = require('./src/config/database');
const PORT = process.env.PORT || 5000;

connectDatabase()
  .then(() => {
    console.log('Successfully connected to MongoDB Atlass');
    if (!process.env.VERCEL) {
      app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

module.exports = app;
