const Profile = require("../models/Profile");
const { body, validationResult } = require("express-validator");

exports.myProfile_get = (req, res, next) => {
  Profile.findOne({ user: res.locals.user.sub }, (err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    else {
      return res.status(200).json(result);
    }
  });
};

exports.myProfile_post = [
  body("fname").escape(),
  body("lname").escape(),
  body("profilePhoto").escape(),
  body("bannerPhoto").escape(),
  body("bio").escape(),
  body("nickname").escape(),
  body("school").escape(),
  body("college").escape(),
  body("working").escape(),
  body("relationshipStatus").escape(),
  body("books").escape(),
  body("food").escape(),
  body("contact").escape(),
  body("gender").escape(),
  //*toDate to cast date string to proper Javascript type.
  //*checkFaly:true accepts date or null string
  //*is08601 is the date format
  body("dob")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("you have entered an invalid date.")
    .toDate(),

  (req, res, next) => {
    const errors = validationResult(req);

    // console.log(req.body);
    const profile = {
      fname: req.body.fname,
      lname: req.body.lname,
      profilePhoto: req.body.profilePhoto,
      bannerPhoto: req.body.bannerPhoto,
      bio: req.body.bio,
      nickName: req.body.nickName,
      school: req.body.school,
      college: req.body.college,
      working: req.body.working,
      relationshipStatus: req.body.relationshipStatus,
      book: req.body.book,
      food: req.body.food,
      contact: req.body.contact,
      gender: req.body.gender,
      dob: req.body.dob,

      user: res.locals.user.sub,
    };

    console.log(res.locals.user.sub);
    console.log(profile);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), profile: profile });
    } else {
      Profile.findOneAndUpdate(
        { user: res.locals.user.sub },
        profile,
        (err, theresult) => {
          // console.log(theresult);
          if (err) res.status(500).json({ msg: err.message });
          else {
            // it will return the old result
            res.status(200).json({ updated_profile: theresult._id });
          }
        }
      );
    }
  },
];
