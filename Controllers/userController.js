const Profile = require("../models/Profile");
const User = require("../models/User");
const Friend = require("../models/Friend");
const async = require("async");

const { body, validationResult } = require("express-validator");

//signup page
export const user_post = [
  body("username")
    .trim()
    .isLength({ min: 4 })
    .withMessage("username is too small")
    .isLength({ max: 20 })
    .withMessage("username is too large")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("password is too shot")
    .isLength({ max: 30 })
    .withMessage("password is too large")
    .escape(),
  (req, res, next) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      friend: [],
    });

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), user: user });
    } else {
      user.save((err, theresult) => {
        if (err) return res.status(500).json({ msg: err.message });
        else {
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
              res.status(200).json(theprofile);
            }
          });
          return res.status(200).json(theresult);
        }
      });
    }
  },
];

//delete user
export const user_delete = (req, res, next) => {
  async.parallel(
    {
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
