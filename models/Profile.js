const connection = require("../config/database");
const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema({
  fname: { type: String },
  lname: { type: String },
  profilePhoto: { data: Buffer, contentType: "image/jpg" },
  bannerPhoto: { data: Buffer, contentType: "image/jpg" },
  bio: { type: String },
  nickName: { type: String },
  school: { type: String },
  college: { type: String },
  working: { type: String },
  relationshipStatus: { type: String },
  book: { type: String },
  food: { type: String },
  contact: { type: String },
  gender: { type: String },
  dob: { type: Date },

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const ProfileModel = connection.ProfileSchema("Profile", ProfileSchema);

module.exports = ProfileModel;
