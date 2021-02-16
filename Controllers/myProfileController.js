const Profile = require("../models/Profile");
const { body, validationResult } = require("express-validator");
const fs = require("fs");
const multer = require("multer");
const async = require("async");
const User = require("../models/User");

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
    .withMessage("First name cannot be empty"),
  body("lname")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Last message cannot be empty"),
  // body("profilePhoto").escape(),
  // body("bannerPhoto").escape(),
  body("bio").trim(),
  body("nickname").trim(),
  body("school").trim(),
  body("college").trim(),
  body("working").trim(),
  body("relationshipStatus").trim(),
  body("books").escape(),
  body("food").escape(),
  body("phone").trim(),
  body("email").trim(),
  body("gender").trim(),
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

    console.log(req.body);

    const profile = {
      // fname: req.body.fname ? req.body.fname.toString() : "",
      // lname: req.body.lname ? req.body.lname.toString() : "",
      // profilePhoto: {
      //   data: res.locals.profile_photo_data,
      //   contentType: res.locals.profile_photo_mimetype,
      // },
      // bannerPhoto: {
      //   data: res.locals.banner_photo_data,
      //   contentType: res.locals.banner_photo_mimetype,
      // },
      bio: req.body.bio ? req.body.bio.toString() : "",
      nickName: req.body.nickName ? req.body.nickName.toString() : "",
      school: req.body.school ? req.body.school.toString() : "",
      college: req.body.college ? req.body.college.toString() : "",
      working: req.body.working ? req.body.working.toString() : "",
      relationshipStatus: req.body.relationshipStatus
        ? req.body.relationshipStatus.toString()
        : "",
      book: req.body.book ? req.body.book.toString() : "",
      food: req.body.book ? req.body.food.toString() : "",
      phone: req.body.phone ? req.body.phone.toString() : "",
      email: req.body.email ? req.body.email.toString() : "",
      gender: req.body.gender ? req.body.gender.toString() : "",
      dob: req.body.dob,

      user: res.locals.user.sub.toString(),
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

//we will use this to update since we are sending only one valu at once we don't need to update everything
//!also we have already created a profile a in user so i dont think we need the above post route

exports.myProfile_put = (req, res, next) => {
  console.log(req.body);
  let key = Object.keys(req.body);
  // console.log(req.body);
  // console.log(key);
  key = key[0];
  console.log(key);
  console.log(req.body[key]);
  if (key == "fname" || key == "lname") {
    console.log("hello");
    if ([...req.body[key]].length == 0) {
      return res.status(400).json({ msg: key + " " + "cannot be empty" });
    }
  }

  // console.log(req.body);
  Profile.findOneAndUpdate(
    { user: res.locals.user.sub },
    { [key]: req.body[key] ? req.body[key].trim().toString() : "" },
    (err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json({ msg: "profile updated" });
      }
    }
  );

  // async.parallel(
  //   {
  //     save_user: (cb) => {
  //       Profile.findOneAndUpdate(
  //         { user: res.locals.user.sub },
  //         { [key]: req.body[key] ? req.body[key].trim().toString() : "" }
  //       ).exec(cb);
  //     },
  //     save_profile: (cb) => {
  //       User.findOneAndUpdate(
  //         { user: res.localss.user.sub },
  //         { [key]: req.body[key] ? req.body[key].trim().toString() : "" }
  //       ).exec(cb);
  //     },
  //   },
  //   (err, result) => {
  //     if (err) return res.status(500).json({ msg: err.message });
  //     else {
  //       return res.status(200).json({ msg: "profile updated" });
  //     }
  //   }
  // );
};
