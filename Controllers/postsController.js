const Post = require("../models/Post");
const User = require("../models/User");

exports.posts_list_get = async (req, res, next) => {
  //only show post from friends

  try {
    const friend_list = User.findById(res.locals.user.sub, "friend");
    const posts = Post.find({ user: friend_list }, { sort: { created: 1 } });

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

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
