// const Friend = require("../models/Friend");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

exports.friend_list_get = (req, res, next) => {
  User.findById(req.params.userid, "friend", (err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    else {
      res.status(200).json(result);
    }
  });
};

exports.friend_put = [
  body("friend.*").escape(),
  body("user").escape(),
  async (req, res, next) => {
    let friend_list;
    //checking if the user already exists in the friend list or not.
    let isFriend;
    let msg;

    try {
      friend_list = await User.findById(req.params.userid, "friend");
      isFriend = await friend_list.findById(res.locals.user._id);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }

    //if null then add friend
    if (isFriend != null) {
      // const friend = {
      //   friend: [...friend_list, res.locals.user._id],
      // };
      friend_list.push(res.locals.user._id);
      msg = "friend added";
    }
    //else unfriend
    else {
      friend_list.findByIdAndRemove(req.params.userid, (err, theresult) => {
        if (err) return res.status(500).json({ msg: err.message });
        else {
          msg = "friend removed";
          res.status(200).json(theresult);
        }
      });
    }

    User.save((err) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json({ msg });
      }
    });
  },
];

// export const friend_delete = (req, res, next) => {
//   res.send("unfriend DELETE page not implemented");
// };
