const Post = require("../models/Post");
const Comment = require("../models/Comment");
const async = require("async");
const { body, validationResult } = require("express-validator");

exports.myposts_get = (req, res, next) => {
  Post.find({ user: res.locals.user.sub })
    .select("-like")
    .populate("user", "username")
    .exec((err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json(result);
      }
    });
};

exports.myposts_post = [
  body("content").trim().escape(),
  body("image").escape(),
  body("like.*").escape(),
  body("user").escape(),

  (req, res, next) => {
    console.log("hello");
    if (
      req.body.content == (null || undefined || "") &&
      req.body.image == (null || undefined || "")
    ) {
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
        like: [],
        user: res.locals.user.sub,
      });

      console.log(post);
      const comment = new Comment({
        comment_list: [],
        post: post._id,
        user: res.locals.user.sub,
      });

      console.log(comment);
      async.parallel(
        {
          save_post: (cb) => post.save(cb),
          save_comment: (cb) => comment.save(cb),
        },
        (err, result) => {
          if (err) return res.status(500).json({ msg: err.message });
          else {
            return res.status(200).json({
              new_post: result.save_post._id,
              new_comment_model: result.save_comment._id,
            });
          }
        }
      );
    }
  },
];

exports.mypost_put = [
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
      const post = {
        content: req.body.content,
        image: req.body.image,
      };

      //it is returning the old result because we are having a new schema above
      Post.findByIdAndUpdate(req.params.postid, post, (err, result) => {
        if (err) return res.status(500).json({ msg: err.message });
        else {
          return res.status(200).json({ updated_post: result._id });
        }
      });
    }
  },
];

exports.mypost_delete = (req, res, next) => {
  async.parallel(
    {
      comment_remove: (cb) =>
        Comment.deleteMany({ post: req.params.postid }).exec(cb),
      post_remove: (cb) => Post.findByIdAndRemove(req.params.postid).exec(cb),
    },
    (err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json({
          removed_post: result.post_remove,
          removed_comments: result.comment_remove,
        });
      }
    }
  );
};
