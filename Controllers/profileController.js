const Profile = require("../models/Profile");

exports.profile_get = (req, res, next) => {
  Profile.findOne({ user: req.params.userid }, (err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    else {
      console.log(req.params.userid);
      console.log(result);
      res.status(200).json(result);
    }
  });
};
