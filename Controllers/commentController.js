const Comment = require("../models/Comment");
const { body, validationResult } = require("express-validator");

exports.comment_get = (req, res, next) => {
  Comment.find({ post: req.params.postid }, (err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    else {
      res.status(200).json(result);
    }
  });
};

exports.comment_post = [
  body("comment")
    .trim()
    .isLength({ min: 1 })
    .withMessage("comment cannot be empty")
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    } else {
      try {
        let query = await Comment.findOne(
          { post: req.params.postid },
          "comment_list"
        );
        query = query.comment_list;
        const comment_detail = {
          comment: req.body.comment,
          user: res.locals.user.sub,
        };
        query.push(comment_detail);
        Comment.findOneAndUpdate(
          { post: req.params.postid },
          {
            comment_list: query,
          },
          (err, result) => {
            if (err) return res.status(500).json({ msg: err.message });
            else {
              return res.status(200).json({ updated_comment: result._id });
            }
          }
        );
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    }
  },
];

exports.comment_put = [
  body("comment")
    .trim()
    .isLength({ min: 1 })
    .withMessage("comment cannot be empty")
    .escape(),
  async (req, res, next) => {
    console.log("hello");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    } else {
      try {
        let query = Comment.find({ post: req.params.postid }, "comment_list");
        query = query.comment_list;
        console.log(query);
        res.end();
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    }
  },
];

exports.comment_delete = (req, res, next) => {
  Comment.findByIdAndRemove(req.params.commentid, (err, theresult) => {
    if (err) return res.status(500).json({ msg: err.message });
    else {
      return res.status(200).json({ deleted_comment: theresult._id });
    }
  });
};
