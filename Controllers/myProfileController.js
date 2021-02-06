const Profile = require("../models/Profile");
const { body, validationResult } = require("express-validator");
const fs = require("fs");
const multer = require("multer");
const async = require("async");

exports.myProfile_get = (req, res, next) => {
  Profile.findOne({ user: res.locals.user.sub }, (err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    else {
      return res.status(200).json(result);
    }
  });
};

exports.myProfile_post = [
  body("fname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("First name cannot be empty")
    .escape(),
  body("lname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last message cannot be empty")
    .escape(),
  // body("profilePhoto").escape(),
  // body("bannerPhoto").escape(),
  body("bio").trim().escape(),
  body("nickname").trim().escape(),
  body("school").trim().escape(),
  body("college").trim().escape(),
  body("working").trim().escape(),
  body("relationshipStatus").trim().escape(),
  body("books").escape(),
  body("food").escape(),
  body("phone").trim().escape(),
  body("email").trim().escape(),
  body("gender").trim().escape(),
  //*toDate to cast date string to proper Javascript type.
  //*checkFaly:true accepts date or null string
  //*is08601 is the date format
  body("dob")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("you have entered an invalid date.")
    .toDate(),
  //! commenting out unitl s3bucket is figured out.
  // (req, res, next) => {
  //   const errors = validationResult(req);

  //   //since we are not validating if the user has read the file, we can put errors message here
  //   if (!errors.isEmpty()) {
  //     return res.status(500).json({ msg: err.message });
  //   }

  //   const upload = multer({ dest: "upload-images/" }).fields([
  //     { name: "bannerPhoto" },
  //     { name: "profilePhoto" },
  //   ]);

  //   upload(req, res, (err) => {
  //     if (err instanceof multer.MulterError) {
  //       return res.status(500).json({ msg: err });
  //     } else if (err) {
  //       return res.status(500).json({ msg: err });
  //     } else {
  //       console.log("1", req.files);
  //       return next();
  //     }
  //   });
  // },

  //!
  //we are doing this in a separate middle-ware cause async.parallel is an ascynchronous event
  // (req, res, next) => {
  //   if (req.files) {
  //     async.parallel(
  //       {
  //         profile_photo_data: (cb) => {
  //           if (req.files.profilePhoto) {
  //             fs.readFile(req.files.profilePhoto[0].path, cb);
  //           }
  //         },
  //         banner_photo_data: (cb) => {
  //           if (req.files.bannerPhoto) {
  //             fs.readFile(req.files.bannerPhoto[0].path, cb);
  //           }
  //         },
  //       },
  //       (err, result) => {
  //         if (err) return res.status(500).json({ msg: err.message });
  //         else {
  //           console.log(result);
  //           if (req.files.profilePhoto) {
  //             res.locals.profile_photo_data = result.profile_photo_data;
  //             res.locals.profile_photo_mimetype =
  //               req.files.profilePhoto[0].mimetype;
  //           }
  //           if (req.files.bannerPhoto) {
  //             res.locals.banner_photo_data = result.banner_photo_data;
  //             res.locals.banner_photo_mimetype =
  //               req.files.bannerPhoto[0].mimetype;
  //           }
  //           return next();
  //         }
  //       }
  //     );
  //   } else {
  //     return next();
  //   }
  // },

  (req, res, next) => {
    //delete the files from the system once after reading.
    // if (req.files) {
    //   async.parallel(
    //     {
    //       empty_profile_disk: (cb) => {
    //         if (req.files.profilePhoto) {
    //           fs.unlink(req.files.profilePhoto[0].path, cb);
    //         }
    //       },

    //       empty_banner_disk: (cb) => {
    //         if (req.files.bannerPhoto) {
    //           fs.unlink(req.files.bannerPhoto[0].path, cb);
    //         }
    //       },
    //     },
    //     (err) => {
    //       if (err) {
    //         return res.status(500).json({ msg: err.message });
    //       }
    //     }
    //   );
    // }

    const profile = {
      fname: req.body.fname,
      lname: req.body.lname,
      // profilePhoto: {
      //   data: res.locals.profile_photo_data,
      //   contentType: res.locals.profile_photo_mimetype,
      // },
      // bannerPhoto: {
      //   data: res.locals.banner_photo_data,
      //   contentType: res.locals.banner_photo_mimetype,
      // },
      bio: req.body.bio,
      nickName: req.body.nickName,
      school: req.body.school,
      college: req.body.college,
      working: req.body.working,
      relationshipStatus: req.body.relationshipStatus,
      book: req.body.book,
      food: req.body.food,
      phone: req.body.phone,
      email: req.body.email,
      gender: req.body.gender,
      dob: req.body.dob,

      user: res.locals.user.sub,
    };

    console.log(profile);
    Profile.findOneAndUpdate(
      { user: res.locals.user.sub },
      profile,
      (err, theresult) => {
        if (err) return res.status(500).json({ msg: err.message });
        else {
          // it will return the old result
          return res.status(200).json({ updated_profile: theresult._id });
        }
      }
    );
  },
];
