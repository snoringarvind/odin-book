const Post = require("../models/Post");
const Comment = require("../models/Comment");
const async = require("async");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const fs = require("fs");

const User = require("../models/User");

//!no need for this
exports.myposts_get = (req, res, next) => {
  Post.find({ user: res.locals.user.sub }).exec((err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    else {
      return res.status(200).json(result);
    }
  });
};

exports.myposts_post = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("title cannot be empty"),
  body("content_text")
    .isLength({ min: 1 })
    .withMessage("content cannot be empty")
    .trim(),
  // body("content_image").escape(),
  body("like.*").escape(),
  body("user").escape(),

  //! uploading images keeping aside untill I figure out aws s3 bucket
  // (req, res, next) => {
  //   const upload = multer({ dest: "upload-images/" }).single("content_image");
  //   upload(req, res, (err) => {
  //     if (err instanceof multer.MulterError) {
  //       return res.status(500).json({ msg: err });
  //     } else if (err) {
  //       return res.status(500).json({ msg: err });
  //     } else {
  //       return next();
  //     }
  //   });
  // }
  (req, res, next) => {
    // console.log(req.file);
    // console.log(req.body);
    // if (req.body.content_text == "" && req.file == undefined) {
    //   return res
    //     .status(400)
    //     .json({ msg: "content_text and content_image both cannot be empty" });
    // }

    // let content_image = "";
    // let mimeType = "";
    // if (req.file) {
    //   try {
    //     content_image = fs.readFileSync(req.file.path);

    //     mimeType = req.file.mimetype;
    //   } catch (err) {
    //     return res.status(500).json({ msg: err.message });
    //   }
    // }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const post = new Post({
      title: req.body.title.toString(),
      content_text: req.body.content_text.toString(),
      // content_image: {
      //   data: content_image,
      //   contentType: mimeType,
      // },
      like: [],
      user: res.locals.user.sub.toString(),
    });

    const comment = new Comment({
      comment_list: [],
      post: post._id.toString(),
      user: res.locals.user.sub.toString(),
    });

    async.parallel(
      {
        save_post: (cb) => post.save(cb),
        save_comment: (cb) => comment.save(cb),
      },
      (err, result) => {
        if (err) return res.status(500).json({ msg: err.message });
        else {
          User.populate(
            result.save_post,
            { path: "user", model: "User" },
            (err2, result2) => {
              if (err2) return res.status(500).json({ msg: err.message });
              else {
                return res.status(200).json(result.save_post);
              }
            }
          );
        }

        // console.log(result);
        // if (err) return res.status(500).json({ msg: err.message });
        // else {
        //!
        //delete image file from the disk since it has been already saved on the server
        // if (req.file) {
        //   try {
        //     fs.unlinkSync(req.file.path);
        //   } catch (err) {
        //     if (err) {
        //       return res.status(500).json({ msg: err.message });
        //     }
        //   }
        // }
        // return res.status(200).json(result);
        // }
      }
    );
  },
];

exports.mypost_put = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("title cannot be empty"),
  body("content_text")
    .trim()
    .isLength({ min: 1 })
    .withMessage("content cannot be empty"),
  // body("content_image").escape(),
  body("like.*").escape(),
  body("user").escape(),

  // (req, res, next) => {
  //   const upload = multer({ dest: "upload-images/" }).single("content_image");
  //   upload(req, res, (err) => {
  //     if (err instanceof multer.MulterError) {
  //       return res.status(500).json({ msg: err });
  //     } else if (err) {
  //       return res.status(500).json({ msg: err });
  //     } else {
  //       return next();
  //     }
  //   });
  // },
  (req, res, next) => {
    // if (req.body.content_text == "" && req.file == undefined) {
    //   return res
    //     .status(400)
    //     .json({ msg: "content_text and content_image both cannot be empty" });
    // }

    // let content_image = "";
    // let mimeType = "";
    // if (req.file) {
    //   try {
    //     content_image = fs.readFileSync(req.file.path);
    //     mimeType = req.file.mimetype;
    //   } catch (err) {
    //     return res.status(500).json({ msg: err.message });
    //   }
    // }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const post = {
      title: req.body.title.toString(),
      content_text: req.body.content_text.toString(),
      // content_image: { data: content_image, contentType: mimeType },
    };
    // console.log(post);

    //it is returning the old result because we are having a new schema above
    Post.findByIdAndUpdate(req.params.postid, post, { new: true })
      .populate("user")
      .exec((err, result) => {
        if (err) return res.status(500).json({ msg: err.message });
        else {
          //!
          // if (req.file) {
          //   try {
          //     fs.unlinkSync(req.file.path);
          //   } catch (err) {
          //     if (err) {
          //       return res.status(500).json({ msg: err.message });
          //     }
          //   }
          // }
          return res.status(200).json(result);
        }
      });
  },
];

exports.mypost_delete = (req, res, next) => {
  async.parallel(
    {
      comment_remove: (cb) =>
        Comment.findOneAndRemove({ post: req.params.postid }).exec(cb),
      post_remove: (cb) => Post.findByIdAndRemove(req.params.postid).exec(cb),
    },
    (err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json({
          removed_post: result.post_remove,
          removed_comment: result.comment_remove,
        });
      }
    }
  );
};
