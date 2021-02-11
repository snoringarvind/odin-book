const Comment = require("../models/Comment");
const { body, validationResult } = require("express-validator");

exports.comment_get = (req, res, next) => {
  Comment.findOne({ post: req.params.postid })
    .populate("comment_list.user", "-comment_list.user.password")
    .exec((err, result) => {
      // console.log(err);
      if (err) return res.status(500).json({ msg: err.message });
      else {
        // console.log(result);
        res.status(200).json(result);
      }
    });
};

//!tooks kind of stupid to do this
// exports.comment_length_get = (req, res, next) => {
//   Comment.findOne({ post: req.params.postid }).exec((err, result) => {
//     if (err) return res.status(500).json({ msg: err.message });
//     else {
//       console.log(result);
//       // return res.status(200).json(result);
//     }
//   });
// };

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
          { new: true }
        )
          .populate("comment_list.user")
          .exec((err, result) => {
            console.log(result);
            if (err) return res.status(500).json({ msg: err.message });
            else {
              return res.status(200).json(result);
            }
          });
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
