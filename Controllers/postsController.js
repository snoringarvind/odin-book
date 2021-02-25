const Post = require("../models/Post");
const User = require("../models/User");

//!this is for newsfeed
exports.newsfeed = async (req, res, next) => {
  //only show post from friends

  try {
    let friend_list = await User.findById(res.locals.user.sub, "friend");
    // console.log(friend_list);
    friend_list = friend_list.friend;

    const posts = await Post.find({ user: friend_list }).populate(
      "user",
      "-password -friend"
    );

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

//!no need for this
exports.post_detail_get = (req, res, next) => {
  //populating user so we can show the name of user who posted the post.

  Post.findById(req.params.postid)
    .populate("user", "username")
    .exec((err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json(result);
      }
    });
};

//this is for user list posts
exports.post_list_get = (req, res, next) => {
  Post.find({ user: req.params.userid })
    .sort({ created_at: -1 })
    .populate("user")
    .exec((err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json(result);
      }
    });
};
