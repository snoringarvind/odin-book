const connection = require("../config/database");
const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  comment: { type: String, required: true },
  //points to the post and the respective user who commented
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const CommentModel = connection.model("Comment", CommentSchema);

module.exports = CommentModel;
