const mongoose = require("mongoose");
require("dotenv/config");

const connection = mongoose.createConnection(process.env.DB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = connection;
