// const Like = require("../models/Like");
const Post = require("../models/Post");

const { body } = require("express-validator");

export const like_post = [
  body("like").escape(),
  (req, res, next) => {
    Post.findById(req.params.postid, "like", (err_likeObject, likeObject) => {
      if (err_likeObject)
        return res.status(500).json({ msg: err_likeObject.message });
      else {
        likeObject.people_who_liked_the_post.findById(
          res.locals.user._id,
          (err_people_who_liked_the_post, isUser) => {
            if (err_people_who_liked_the_post)
              return res
                .status(500)
                .json({ msg: err_people_who_liked_the_post.message });
            else {
              if (isUser != null) {
                likeObject.no_of_likes += 1;
                //*you can also do the findbyidandupdate() here,
                likeObject.people_who_liked_the_post.push(res.locals.user._id);
              } else {
                likeObject.no_of_likes -= 1;
                likeObject.people_who_liked_the_post.findByIdAndRemove(
                  res.local.user._id,
                  (err3) => res.status(500).json({ msg: err3.message })
                );
              }
            }
          }
        );
      }
    });

    Post.save((err, theresult) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json(theresult);
      }
    });
  },
];

// export const like_delete = (req, res, next) => {
//   return res.send("like DELETE not implemented");
// };
