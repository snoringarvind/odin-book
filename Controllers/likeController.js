// const Like = require("../models/Like");
const Post = require("../models/Post");

const { body } = require("express-validator");

exports.like_put = [
  body("like").escape(),
  (req, res, next) => {
    let msg;

    Post.findById(req.params.postid, "like", (err1, likeObject) => {
      if (err1) return res.status(500).json({ msg: err1 });
      else {
        likeObject.people_who_liked_the_post.findById(
          res.locals.user._id,
          (err2, isUser) => {
            if (err2) return res.status(500).json({ msg: err2.message });
            else {
              if (isUser != null) {
                msg = "like added";
                likeObject.no_of_likes += 1;
                //*you can also do the findbyidandupdate() here,
                likeObject.people_who_liked_the_post.push(res.locals.user._id);
              } else {
                msg = "like removed";
                likeObject.no_of_likes -= 1;
                likeObject.people_who_liked_the_post.findByIdAndRemove(
                  res.local.user._id,
                  (err3) => {
                    return res.status(500).json({ msg: err3.message });
                  }
                );
              }
            }
          }
        );
      }
    });

    Post.save((err) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json({ msg });
      }
    });
  },
];

// export const like_delete = (req, res, next) => {
//   return res.send("like DELETE not implemented");
// };
