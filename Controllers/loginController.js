const { body, validationResult } = require("express-validator");
const utils = require("../lib/utils");
const User = require("../models/User");

exports.login_post = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("username cannot be empty")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 1 })
    .withMessage("password cannot be empty")
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    } else {
      User.findOne({ username: req.body.username }, async (err, result) => {
        if (err) return res.status(500).json({ msg: err.message });
        if (result == null) {
          return res
            .status(401)
            .json({ msg: "no such user with this username" });
        } else {
          res.locals.hashPassword = result.password;
          res.locals.user = result;
          next();
        }
      });
    }
  },
  utils.decodeHash,
  (req, res, next) => {
    if (res.locals.isPassword) {
      const jwtData = utils.issueJwt(res.locals.user);
      return res.status(200).json({ jwtData: jwtData });
    } else {
      return res.status(403).json({ msg: "wrong password" });
    }
  },
];
