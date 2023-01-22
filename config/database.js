const mongoose = require('mongoose');
const config = require('./config');

/**
 * -------------- DATABASE ----------------
 */

const connectDB = (cb) => {
  mongoose.connect(
    config.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.error(err);
      } else {
        cb();
      }
    }
  );
};

// Expose the connection
module.exports = connectDB;
