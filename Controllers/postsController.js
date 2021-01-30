const Post = require("../models/Post");

export const posts_list_get = (req, res, next) => {
  Post.find({}, (err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    else {
      return res.status(200).json(result);
    }
  });

  return res.send("posts-list GET page not implemented");
};

export const post_detail_get = (req, res, next) => {
  Post.findById(req.params.postid)
    .populate("user")
    .exec((err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json(result);
      }
    });
  return res.send("post-detail GET page not implememented");
};
