const express = require("express");
const router = express.Router();
const commentController = require("../Controllers/commentController");
const friendController = require("../Controllers/friendController");
const likeController = require("../Controllers/likeController");
const loginController = require("../Controllers/loginController");
const myPostsController = require("../Controllers/myPostsContoller");
const myProfileController = require("../Controllers/myProfileController");
const postsController = require("../Controllers/postsController");
const profileController = require("../Controllers/profileController");
const userController = require("../Controllers/userController");

const utils = require("../lib/utils");

// posts
//*home page, newsfeed, post list
//* show only friends posts , not all posts from the database
router.get("/posts", utils.verifyJwt, postsController.posts_list_get);

//* post-detail/ also show comments
router.get("/post/:postid", utils.verifyJwt, postsController.post_detail_get);

//comment
//*Get comment
router.get(
  "/post/:postid/comment",
  utils.verifyJwt,
  commentController.comment_get
);
//*also check if logged-in user ka hi post hain na.
//* POST comment
router.post(
  "/post/:postid/comment",
  utils.verifyJwt,
  commentController.comment_post
);

//* PUT comment
router.put(
  "/post/:postid/comment/:commentid",
  utils.verifyJwt,
  commentController.comment_put
);

//* DELETE comment
//* no need to have postid while deleteing comment.
router.delete(
  "/post/:postid/comment/:commentid",
  utils.verifyJwt,
  commentController.comment_delete
);

//like
//*get like
router.get("/post/:postid/like", utils.verifyJwt, likeController.like_get);

//* post like
router.post("/post/:postid/like", utils.verifyJwt, likeController.like_post);

//* delete like
// router.delete("/post/:postid/like/:likeid", (req, res, next) => {});

//my-posts
//* GET my-posts (my-post list)
router.get("/myposts", utils.verifyJwt, myPostsController.myposts_get);

//*for mypost-detail use the 'post-detail' route aove

//* POST my-post
router.post("/myposts", utils.verifyJwt, myPostsController.myposts_post);

//* PUT my-post
router.put("/mypost/:postid", utils.verifyJwt, myPostsController.mypost_put);

//* DELETE my-post
//*also delete all the comments and likes in the post
router.delete(
  "/mypost/:postid",
  utils.verifyJwt,
  myPostsController.mypost_delete
);

// my-profile
//* GET my-profile
//* logged-in users profile page e.g set profile photo, set banner image, contact info etc;
router.get("/myprofile", utils.verifyJwt, myProfileController.myProfile_get);

//*maybe don't create a post route just a put route for profile, beacuse there is only one profile to update, and also since you are not posting or creating anything new, you are onyl updating the profile, so I guess PUT route is enough
//*!can also use for update
router.post("/myprofile", utils.verifyJwt, myProfileController.myProfile_post);

// profile
//* should also have friends list on client side
router.get("/profile/:userid", utils.verifyJwt, profileController.profile_get);

//friend
//* updating friends list, update only if the user accepts the friend request, accepting request will take place on the client side.
//*here the userid is of the person who we are going to unfriend
//* since we can retrive our's username from the login credentials, hence no need to pass our's username in the url
//*jisko request bhej rahe hain uska userid attach karna hain
//* we will be creating an empty friend model while creating a user, so now we will be just updating the friend model
router.post("/friend/:userid", utils.verifyJwt, friendController.friend_post);

//*getting the friend list
router.get(
  "/friend/:userid",
  utils.verifyJwt,
  friendController.friend_list_get
);

//*unfriend
//doing unfriend in friend put request
// router.delete("/friend/:userid", (req, res, next) => {});

//user
//*creating a new user
router.post("/user", userController.user_post);

//*no need to create a new route to update the user details, since you are alreay doing it in the profile PUT route above

//*deleting the account
router.delete("/user/:userid", utils.verifyJwt, userController.user_delete);

//login
router.post("/login", loginController.login_post);

module.exports = router;
