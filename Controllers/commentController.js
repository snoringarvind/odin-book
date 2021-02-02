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
              return res.status(200).json({ new_comment: result._id });
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
        for (let i = 0; i < query.length; i++) {
          if (query[i]._id == req.params.commentid) {
            query[i].comment = req.body.comment;
            Comment.findOneAndUpdate(
              { post: req.params.postid },
              { comment_list: query },
              (err) => {
                if (err) return res.status(500).json({ msg: err.message });
                else {
                  return res
                    .status(200)
                    .json({ msg: "comment has been updated" });
                }
              }
            );
          } else {
            return res.status(500).json({ msg: "something is wrong" });
          }
        }
      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    }
  },
];

exports.comment_delete = async (req, res, next) => {
  try {
    let query = await Comment.findOne(
      { post: req.params.postid },
      "comment_list"
    );
    query = query.comment_list;
    for (let i = 0; i < query.length; i++) {
      if (query[i]._id == req.params.commentid) {
        query.splice(i, 1);
        Comment.findOneAndUpdate(
          { post: req.params.postid },
          { comment_list: query },
          (err) => {
            if (err) return res.status(500).json({ msg: err.message });
            else {
              return res.status(200).json({ msg: "comment deleted" });
            }
          }
        );
      } else {
        return res.status(500).json({ msg: "something is wrong" });
      }
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
