// const Friend = require("../models/Friend");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

exports.friend_list_get = (req, res, next) => {
  User.findById(req.params.userid, "friend")
    .populate("friend", "-password")
    .exec((err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json(result.friend);
      }
    });
};

exports.friend_post = [
  body("friend.*").escape(),
  body("user").escape(),
  async (req, res, next) => {
    console.log("helllllllllloooooooooo");
    console.log(req.params.userid);
    console.log(res.locals.user.sub);
    let msg;
    try {
      if (res.locals.user.sub === req.params.userid) {
        return res
          .status(400)
          .json({ msg: "you cannot add yourself as friend" });
      }

      let query = await User.findById(res.locals.user.sub, "friend");
      console.log(query);
      query = query.friend;

      const isContain = query.includes(req.params.userid);
      if (!isContain) {
        query.push(req.params.userid);
        msg = "friend added to your friend-list";
        User.findByIdAndUpdate(
          res.locals.user.sub,
          { friend: query },
          (err) => {
            if (err) return res.status(500).json({ msg: err.message });
            else {
              return res.status(200).json({ msg });
            }
          }
        );
      } else {
        for (let i = 0; i < query.length; i++) {
          try {
            if (query[i] == req.params.userid) {
              query.splice(i, 1);
              msg = "friend removed";
              User.findByIdAndUpdate(
                res.locals.user.sub,
                { friend: query },
                (err) => {
                  if (err) return res.status(500).json({ msg: err.message });
                  else {
                    return res.status(200).json({ msg });
                  }
                }
              );
            }
          } catch (err) {
            return res.status(500).json({ msg: err.message });
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
