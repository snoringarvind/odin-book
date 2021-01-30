const Profile = require("../models/Profile");

export const profile_get = (req, res, next) => {
  Profile.findOne({ user: req.params.userid }, (err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    else {
      res.status(200).json(result);
    }
  });
};
