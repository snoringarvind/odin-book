const { body, validationResult, query } = require("express-validator");
const { Mongoose } = require("mongoose");
const Chat = require("../models/Chat");

exports.chat_get = (req, res, next) => {
  //this way by 'req.params.senderid' we can get ours and the other person's chat
  Chat.findOne({ sender: req.params.senderid }).exec((err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    else {
      // console.log(result);
      // console.log(res.locals.user.sub);
      // console.log(req.params.userid);
      // console.log(result, 13);

      //since we are only saving the messages we sent , we make a if block to catch an error, if userid == sub
      if (req.params.userid === req.params.senderid) {
        return res
          .status(500)
          .json(
            "wrong request , you can only see the messages you send to your friends, you can't see your own messages"
          );
      }

      if (result.messages.length === 0) {
        console.log("true, 24");
        return res.status(200).json([]);
      }

      let notInclude = true;
      // here's a case if in the for loop there's no match it means the other person haven't send any messages to this guy till now ..
      //in such case we send an empty array meaning no messages have beeen sent from other person to this guy.
      for (let i = 0; i < result.messages.length; i++) {
        if (result.messages[i].user == req.params.userid) {
          console.log("29", result);
          console.log(req.params.userid, result.messages[i].user);
          notInclude = false;
          return res.status(200).json(result.messages[i]);
        }
      }

      if (notInclude) {
        return res.status(200).json([]);
      }
    }
  });
};

//we will only update chat since we have alread created and saved the model on user controller
exports.chat_put = [
  body("messages.*").trim(),
  async (req, res, next) => {
    console.log(req.params.userid);

    console.log(req.body);
    try {
      let query = await Chat.findOne({ sender: res.locals.user.sub });

      const message = req.body.message;
      const createdAt = req.body.createdAt;

      console.log(query);

      //if not include then create one
      let notInclude = true;

      // return;
      //for now I can't figure out mongoose filters so I am using for loops to manually filter.
      for (let i = 0; i < query.messages.length; i++) {
        console.log(req.params.userid, query.messages[i].user);
        if (query.messages[i].user == req.params.userid) {
          console.log(i);
          query.messages[i].message_container.push({
            message: message,
            createdAt: createdAt,
          });
          notInclude = false;
          break;
        }
      }

      if (notInclude) {
        query.messages.push({
          message_container: [{ message: message, createdAt: createdAt }],
          user: req.params.userid,
        });
      }

      // console.log(query.messages[1].message_container);
      // return;
      Chat.findOneAndUpdate(
        { sender: res.locals.user.sub },
        { messages: query.messages },
        { new: true },
        (err2, result2) => {
          if (err2) return res.status(500).json({ msg: err2.message });
          else {
            return res.status(200).json(result2);
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
];

//to display the list of conversation with users
exports.get_mychat_list = (req, res, next) => {
  Chat.findOne({ sender: res.locals.user.sub })
    .populate("messages.user", "fname lname username")
    .exec((err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json(result);
      }
    });
};
