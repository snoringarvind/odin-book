// const Like = require("../models/Like");
const Post = require("../models/Post");

const { body } = require("express-validator");

exports.like_get = (req, res, next) => {
  Post.findById(req.params.postid, "like")
    .populate("like", "username")
    .exec((err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json(result);
      }
    });
};

exports.like_post = [
  body("like").escape(),
  async (req, res, next) => {
    let msg;
    try {
      let query = await Post.findById(req.params.postid, "like");
      query = query.like;

      const isContain = query.includes(res.locals.user.sub);

      if (!isContain) {
        query.push(res.locals.user.sub);
        msg = "like added";
        Post.findByIdAndUpdate(req.params.postid, { like: query }, (err) => {
          if (err) return res.status(500).json({ msg: err.message });
          else {
            return res.status(200).json({ msg });
          }
        });
      } else {
        for (let i = 0; i < query.length; i++) {
          if (query[i] == res.locals.user.sub) {
            query.splice(i, 1);
            msg = "like removed";
            Post.findByIdAndUpdate(
              req.params.postid,
              { like: query },
              (err) => {
                if (err) return res.status(500).json({ msg: err.message });
                else {
                  return res.status(200).json({ msg });
                }
              }
            );
          } else {
            //just a backup if something goes wrong idk.
            return res.status(500).json({ msg: "something is wrong" });
          }
        }
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
];

// export const like_delete = (req, res, next) => {
//   return res.send("like DELETE not implemented");
// };
