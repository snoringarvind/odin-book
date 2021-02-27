const Profile = require("../models/Profile");
const User = require("../models/User");
const Comment = require("../models/Comment");
const async = require("async");
const Post = require("../models/Post");
const utils = require("../lib/utils");
const Chat = require("../models/Chat");
const ChatList = require("../models/ChatList");
const Isread = require("../models/Isread");

const { body, validationResult } = require("express-validator");

//signup page
exports.user_signup = [
  body("fname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name cannot be empty"),
  body("lname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last name cannot be empty"),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("username cannot be empty")
    .isLength({ min: 4 })
    .withMessage("username is too small")
    .isLength({ max: 20 })
    .withMessage("username is too large"),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("password is too short")
    .isLength({ max: 30 })
    .withMessage("password is too large"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    } else {
      return next();
    }
  },

  utils.hashPassword,

  (req, res, next) => {
    const user = new User({
      fname: req.body.fname.toString(),
      lname: req.body.lname.toString(),
      username: "@" + req.body.username.toString(),
      password: res.locals.hashPassword.toString(),
      friend: [],
    });

    User.findOne({ username: "@" + req.body.username }, (err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        if (result != null) {
          return res.status(403).json({ msg: "username taken" });
        } else {
          const profile = new Profile({
            // fname: req.body.fname.toString(),
            // lname: req.body.lname.toString(),
            profilePhoto: "",
            bannerPhoto: "",
            bio: "",
            nickName: "",
            school: "",
            college: "",
            working: "",
            relationshipStatus: "",
            book: "",
            food: "",
            contact: "",
            gender: "",
            dob: "",
            user: user._id,
          });

          const chat = new Chat({
            sender: user._id,
            messages: [],
          });

          const chatList = new ChatList({
            sender: user._id,
            received: [],
            sent: [],
          });

          const isread = new Isread({
            sender: user._id,
            users: [],
          });
          async.parallel(
            {
              saved_user: (cb) => user.save(cb),
              saved_profile: (cb) => profile.save(cb),
              saved_chat: (cb) => chat.save(cb),
              saved_chat_list: (cb) => chatList.save(cb),
              saved_isread: (cb) => isread.save(cb),
            },
            (err, result) => {
              if (err) return res.status(500).json({ msg: err.message });
              else {
                const jwtData = utils.issueJwt(user);
                return res.status(200).json({
                  new_user: result.saved_user._id,
                  new_profile_model: result.saved_profile._id,
                  new_chat_model: result.saved_chat._id,
                  new_chat_list_model: result.saved_chat_list,
                  new_isread_model: result.saved_isread,
                  jwtData: jwtData,
                });
              }
            }
          );
        }
      }
    });
  },
];

//delete user
exports.user_delete = (req, res, next) => {
  async.parallel(
    {
      comment_remove: (cb) =>
        Comment.deleteMany({ user: req.params.userid }).exec(cb),
      post_remove: (cb) =>
        Post.deleteMany({ user: req.params.userid }).exec(cb),
      profile_remove: (cb) =>
        Profile.findOneAndRemove({ user: req.param.userid }).exec(cb),
      user_remove: (cb) => User.findByIdAndRemove(req.params.userid).exec(cb),
    },
    (err, results) => {
      if (err) return res.status(500).json({ err: err.message });
      else {
        res.status(200).json(results);
      }
    }
  );
};

exports.user_get_search_list = (req, res, next) => {
  const x = req.params.name;
  const y = x.split(" ");
  let fname;
  let lname;
  if (y.length >= 2) {
    fname = y[0];
    lname = y[1];

    User.find({ fname: fname, lname: lname })
      .select("-password")
      .exec((err, result) => {
        if (err) return res.status(500).json({ msg: err.message });
        else {
          if (result.length == 0) {
            return res.status(200).json([]);
          } else {
            return res.status(200).json(result);
            // let arr = [];
            // User.findById(res.locals.user.sub, (err2, result2) => {
            //   if (err2) return res.status(500).json({ msg: err2.message });
            //   else {
            //     for (let i = 0; i < result.length; i++) {
            //       const check = result2.friend.includes(result[i]._id);
            //       if (check) {
            //         arr.push({ user: result, isfriend: true });
            //       } else {
            //         arr.push({ user: result, isfriend: false });
            //       }
            //     }
            //     return res.status(200).json(arr);
            //   }
            // });
          }
        }
      });
  } else if (y.length == 1) {
    let fname = y[0];

    const u = [...fname];

    if (u[0] === "@") {
      User.find({ username: fname })
        .select("-password")
        .exec((err, result) => {
          if (err) return res.status(500).json({ msg: err.message });
          else {
            if (result == null) {
              return res.status(200).json([]);
            } else {
              return res.status(200).json(result);
              // User.findById(res.locals.user.sub, (err2, result2) => {
              //   if (err2) return res.status(500).json({ msg: err2.message });
              //   else {
              //     const i = result2.friend.includes(result._id);
              //     if (i) {
              //       return res
              //         .status(200)
              //         .json({ user: result, isfriend: true });
              //     } else {
              //       return res
              //         .status(200)
              //         .json({ user: result, isfriend: false });
              //     }
              //   }
              // });
            }
          }
        });
    } else {
      User.find({ fname: fname })
        .select("-password")
        .exec((err, result) => {
          if (err) return res.status(500).json({ msg: err.message });
          else {
            if (result.length == 0) {
              return res.status(200).json([]);
            } else {
              return res.status(200).json(result);
              // let arr = [];
              // User.findById(res.locals.user.sub, (err2, result2) => {
              //   if (err2) return res.status(500).json({ msg: err2.message });
              //   else {
              //     for (let i = 0; i < result.length; i++) {
              //       const check = result2.friend.includes(result[i]._id);
              //       if (check) {
              //         arr.push({ user: result, isfriend: true });
              //       } else {
              //         arr.push({ user: result, isfriend: false });
              //       }
              //     }
              //     return res.status(200).json(arr);
              //   }
              // });
            }
          }
        });
    }
  }
};

exports.users_list = (req, res, next) => {
  try {
    User.find({}).exec((err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json(result);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.isUserAuth = (req, res, next) => {
  return res.status(200).json({ msg: "user is authenticated" });
};
