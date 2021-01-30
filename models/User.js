const connection = require("../config/database");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },

  // !for now keeping it aside and using friend model
  // let's say xyz(user) , has friends stored in this array
  // //*array of friends of the user

  //!maybe I will use this.
  friend: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const UserModel = connection.model("User", UserSchema);

module.exports = UserModel;
