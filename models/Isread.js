const connection = require("../config/database");
const mongoose = require("mongoose");

const IsreadSchema = mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  users: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      isread: [{ type: Boolean }],
    },
  ],
});

const IsreadModel = connection.model("Isread", IsreadSchema);

module.exports = IsreadModel;
