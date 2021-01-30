const express = require("express");
const router = express.Router();
const postsController = require("../Controllers/postsController");

// posts
//*home page, newsfeed, post list
//* show only friends posts , not all posts from the database
router.get("/posts", postsController.posts_list_get);

//* post-detail/ also show comments
router.get("/post/:postid", postsController.post_detail_get);

//comment
//*Get comment
//*do the get comments in the above /:postid

//* POST comment
router.post("/post/:postid/comment", (req, res, next) => {});

//* PUT comment
router.put("/post/:postid/comment/:commentid", (req, res, next) => {});

//* DELETE comment
//* no need to have postid while deleteing comment.
router.delete("/comment/:commentid", (req, res, next) => {});

//like
//* post like
router.post("/post/:postid/like", (req, res, next) => {});

//* delete like
// router.delete("/post/:postid/like/:likeid", (req, res, next) => {});

//my-posts
//* GET my-posts (my-post list)
router.get("/myposts", (req, res, next) => {});

//*for mypost-detail use the 'post-detail' route aove

//* POST my-post
router.post("/myposts", (req, res, next) => {});

//* PUT my-post
router.put("/mypost/:postid", (req, res, next) => {});

//* DELETE my-post
//*also delete all the comments and likes in the post
router.delete("/mypost/:postid", (req, res, next) => {});

// my-profile
//* GET my-profile
//* logged-in users profile page e.g set profile photo, set banner image, contact info etc;
router.get("/myprofile", (req, res, next) => {});

//*maybe don't create a post route just a put route for profile, beacuse there is only one profile to update, and also since you are not posting or creating anything new, you are onyl updating the profile, so I guess PUT route is enough
router.put("/myprofile", (req, res, next) => {});

// profile
//* should also have friends list
router.get("/profile/:userid", (req, res, next) => {});

//friend
//* updating friends list, update only if the user accepts the friend request, accepting request will take place on the client side.
//*here the userid is of the person who we are going to unfriend
//* since we can retrive our's username from the login credentials, hence no need to pass our's username in the url
//*jisko request bhej rahe hain uska userid attach karna hain
//* we will be creating an empty friend model while creating a user, so now we will be just updating the friend model
router.put("/friend/:userid", (req, res, next) => {});

//*getting the friend list
router.get("/friend", (req, res, next) => {});

//*unfriend
//doing unfriend in friend put request
// router.delete("/friend/:userid", (req, res, next) => {});

//user
//*creating a new user
router.post("/user", (req, res, next) => {});

//*no need to create a new route to update the user details, since you are alreay doing it in the profile PUT route above

//*deleting the account
router.delete("/user/:userid", (req, res, next) => {});

//login
router.post("/login", (req, res, next) => {});
