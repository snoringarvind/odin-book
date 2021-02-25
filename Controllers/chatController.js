const { body, validationResult, query } = require("express-validator");
const { Mongoose } = require("mongoose");
const Chat = require("../models/Chat");
const ChatList = require("../models/ChatList");

exports.chat_get = (req, res, next) => {
  //this way by 'req.params.senderid' we can get ours and the other person's chat
  Chat.findOne({ sender: req.params.senderid }).exec((err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    else {
      //since we are only saving the messages we sent , we make a if block to catch an error, if userid == sub
      if (req.params.userid === req.params.senderid) {
        return res
          .status(500)
          .json(
            "wrong request , only your friends can see your messages, you can't see your own messages"
          );
      }

      if (result.messages.length === 0) {
        return res.status(200).json([]);
      }

      let notInclude = true;
      // here's a case if in the for loop there's no match it means the other person haven't send any messages to this guy till now ..
      //in such case we send an empty array meaning no messages have beeen sent from other person to this guy.
      for (let i = 0; i < result.messages.length; i++) {
        if (result.messages[i].user == req.params.userid) {
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
    try {
      let query = await Chat.findOne({ sender: res.locals.user.sub });

      const message = req.body.message;
      const createdAt = req.body.createdAt;

      //if not include then create one
      let notInclude = true;

      // return;
      //for now I can't figure out mongoose filters so I am using for loops to manually filter.
      for (let i = 0; i < query.messages.length; i++) {
        if (query.messages[i].user == req.params.userid) {
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
      return res.status(500).json({ msg: err.message });
    }
  },
];
