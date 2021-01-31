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
    .withMessage("Comment cannot be empty")
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const comment = new Comment({
      comment: req.body.comment,
      user: res.locals.user._id,
      post: req.params.postid,
    });

    if (!errors.isEmpty()) {
      return res
        .status(4000)
        .json({ errors: errors.array(), comment: comment });
    } else {
      comment.save((err, theresult) => {
        if (err) return res.status(500).json({ msg: err.message });
        else {
          return res.status(200).json(theresult);
        }
      });
    }
  },
];

exports.comment_put = [
  body("comment")
    .trim()
    .isLength({ min: 1 })
    .withMessage("comment cannot be empty")
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    const comment = new Comment({
      comment: req.body.comment,
      user: req.locals.user._id,
      post: req.params.postid,
      _id: req.params.commentid,
    });

    if (!errors.isEmpty()) {
      return res.status(500).json({ errors: errors.array(), comment: comment });
    } else {
      Comment.findByIdAndUpdate(
        req.params.commentid,
        comment,
        {},
        (err, theresult) => {
          if (err) return res.status(500).json({ msg: err.mesaage });
          else {
            return res.status(200).json(theresult);
          }
        }
      );
    }
  },
];

exports.comment_delete = (req, res, next) => {
  Comment.findByIdAndRemove(req.params.commentid, (err, theresult) => {
    if (err) return res.status(500).json({ msg: err.message });
    else {
      return res.status(200).json(theresult);
    }
  });
};
