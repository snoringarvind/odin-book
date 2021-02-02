const connection = require("../config/database");
const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  content_text: { type: String },
  content_image: { data: Buffer, contentType: String },

  //array of user who liked the respective post
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],

  created_at: { type: Date, default: Date.now },

  //save the user using the login credentials
  //*user who made the post
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const PostModel = connection.model("Post", PostSchema);

module.exports = PostModel;
