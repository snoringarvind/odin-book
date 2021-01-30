const { body, validationResult } = require("express-validator");
const utils = require("../lib/utils");
const User = require("../models/User");

export const login_post = [
  body("username").trim().escape(),
  body("password").trim().escape(),

  (req, res, next) => {
    User.findOne({ username: req.body.username }, async (err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      if (result == null) {
        return res.status(401).json({ msg: "no such user with this username" });
      } else {
        res.locals.hashPassword = result.password;
      }
    });
  },
  utils.decodeHash,
  (req, res, next) => {
    if (res.locals.isPassword) {
      const jwtData = utils.issueJwt(result);
      return res.status(200).json({ user: result, jwtData: jwtData });
    } else {
      return res.status(403).json({ msg: "wrong password" });
    }
  },
];
