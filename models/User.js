const connection = require("../config/database");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },

  username: { type: String, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },

  // !for now keeping it aside and using friend model
  // let's say xyz(user) , has friends stored in this array
  // //*array of friends of the user

  //!maybe I will use this.
  //for no of friends , just get the length of array
  friend: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const UserModel = connection.model("User", UserSchema);

module.exports = UserModel;
