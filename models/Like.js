const connection = require("../config/database");
const mongoose = require("mongoose");

const LikeSchema = mongoose.Schema({
  no_of_likes: { type: Number, required: true },
  // points to the post and the respective user who liked the post
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const LikeModel = connection.model("Like", LikeSchema);

module.exports = LikeModel;
