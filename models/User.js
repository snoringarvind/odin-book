const connection = require("../config/database");
const mongoose = require("mongoose");
require("dotenv").config();

const UserSchema = mongoose.Schema({
  //!do this in the profile not here
  //but now I don't want to make any more changes instead we will tweak something in the usercontroller instead
  //for now let it be, for now the user won't be able to change the name from the screen bcoz we did stupid in frontend
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
