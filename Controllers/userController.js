const Profile = require("../models/Profile");
const User = require("../models/User");
const Comment = require("../models/Comment");
const async = require("async");
const Post = require("../models/Post");
const utils = require("../lib/utils");

const { body, validationResult } = require("express-validator");

//signup page
exports.user_post = [
  body("username")
    .trim()
    .isLength({ min: 4 })
    .withMessage("username is too small")
    .isLength({ max: 20 })
    .withMessage("username is too large")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("password is too short")
    .isLength({ max: 30 })
    .withMessage("password is too large")
    .escape(),

  utils.hashPassword,

  (req, res, next) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      friend: [],
    });

    const errors = validationResult(req);

    let profileSaved;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), user: user });
    } else {
      user.save((err, theuser) => {
        if (err) return res.status(500).json({ msg: err.message });
        else {
          //*creating a empty profile
          const profile = new Profile({
            fname: "",
            lname: "",
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
            user: theresult._id,
          });
          profile.save((err_theprofile, theprofile) => {
            if (err_theprofile)
              return res.status(500).json({ msg: err.message });
            else {
              profileSaved = theprofile;
            }
          });
          return res.status(200).json({ user: theuser, profile: profileSaved });
        }
      });
    }
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
