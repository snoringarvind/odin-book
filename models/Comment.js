const connection = require("../config/database");
const mongoose = require("mongoose");
require("dotenv").config();

const CommentSchema = mongoose.Schema({
  comment_list: [
    {
      //comment and the user who commented
      comment: { type: String },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      created_at: { type: Date },
    },
  ],
  //points to the post and the user who created the post
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const CommentModel = connection.model("Comment", CommentSchema);

module.exports = CommentModel;
