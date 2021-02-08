// const Friend = require("../models/Friend");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

exports.friend_list_get = (req, res, next) => {
  User.findById(req.params.userid, "friend")
    .populate("friend")
    .exec((err, result) => {
      console.log(result);
      if (err) return res.status(500).json({ msg: err.message });
      else {
        res.status(200).json(result);
      }
    });
};

exports.friend_post = [
  body("friend.*").escape(),
  body("user").escape(),
  async (req, res, next) => {
    let msg;
    try {
      if (res.locals.user.sub === req.params.userid) {
        return res
          .status(400)
          .json({ msg: "you cannot add yourself as friend" });
      }

      let query = await User.findById(req.params.userid, "friend");
      query = query.friend;

      const isContain = query.includes(res.locals.user.sub);
      if (!isContain) {
        query.push(res.locals.user.sub);
        msg = "friend added";
        User.findByIdAndUpdate(req.params.userid, { friend: query }, (err) => {
          if (err) return res.status(500).json({ msg: err.message });
          else {
            return res.status(200).json({ msg });
          }
        });
      } else {
        for (let i = 0; i < query.length; i++) {
          if (query[i] == res.locals.user.sub) {
            query.splice(i, 1);
            msg = "friend removed";
            User.findByIdAndUpdate(
              req.params.userid,
              { friend: query },
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

// export const friend_delete = (req, res, next) => {
//   res.send("unfriend DELETE page not implemented");
// };
