const connection = require("../config/database");
const mongoose = require("mongoose");

const FriendSchema = mongoose.Schema({
  //let's say xyz(user) , has friends stored in this array
  friend: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const FriendModel = connection.model("Friend", FriendSchema);

module.exports = FriendModel;
