const connection = require("../config/database");
const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  content: { type: String },
  image: { data: Buffer, contentType: String },
  like: {
    no_of_likes: { type: Number },
    //array of users who liked the respective post
    people_who_liked_the_post: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
  },
  //save the user using the login credentials
  //*user who made the post
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const PostModel = connection.model("Post", PostSchema);

module.exports = PostModel;
