const Post = require("../models/Post");
const Comment = require("../models/Comment");
const async = require("async");

export const myposts_get = (req, res, next) => {
  Post.find({ user: res.locals.user._id }, (err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    else {
      return res.status(200).json(result);
    }
  });
};

export const myposts_post = (req, res, next) => [
  body("content").trim().escape(),
  body("image").escape(),
  body("like.*").escape(),
  body("user").escape(),

  (req, res, next) => {
    if (req.body.content == null && req.body.image == null) {
      return res
        .status(400)
        .json({ msg: "content and image both cannot be empty" });
    } else {
      const post = new Post({
        content: req.body.content,
        image: {
          data: req.body.image,
          contentType: "image/jpg",
        },
        like: {
          no_of_likes: 0,
          people_who_liked_the_post: [],
        },
        user: res.locals.user._id,
      });

      post.save((err, theresult) => {
        if (err) return res.status(500).json({ msg: err.message });
        else {
          res.status(200).json(theresult);
        }
      });
    }
  },
];

export const mypost_put = [
  body("content").trim().escape(),
  body("image").escape(),
  body("like.*").escape(),
  body("user").escape(),
  (req, res, next) => {
    if (req.body.content == null && req.body.image === null) {
      return res
        .status(400)
        .json({ msg: "content and image both cannot be empty" });
    } else {
      const post = new Post({
        content: req.body.content,
        image: req.body.image,
        _id: req.params.postid,
      });

      Post.findByIdAndUpdate(req.params.postid, post, {}, (err, theresult) => {
        if (err) return res.status(500).json({ msg: err.message });
        else {
          return res.status(200).json(theresult);
        }
      });
    }
  },
];

export const mypost_delete = (req, res, next) => {
  async.parallel(
    {
      comment_find: (cb) => Comment.find({ post: req.params.postid }).exec(cb),
      post_remove: (cb) => Post.findByIdAndRemove(req.params.postid).exec(cb),
    },
    (err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        Comment.findByIdAndRemove(
          result.comment_find._id,
          (err, comment_remove) => {
            if (err) return res.status(500).json({ msg: err.message });
            return res.status(200).json({
              removed_post: result.post_remove,
              removed_comments: comment_remove,
            });
          }
        );
      }
    }
  );
};
