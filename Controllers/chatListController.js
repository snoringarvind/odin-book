const ChatList = require("../models/ChatList");

//to display the list of conversation with users
exports.put_mychat_list = async (req, res, next) => {
  try {
    if (req.params.senderid != res.locals.user.sub) {
      let query = await ChatList.findOne({ sender: req.params.senderid });

      const check = query.received.findIndex(
        (x) => x.user.toString() === req.params.userid.toString()
      );

      if (check == -1) {
        query.received.push({
          user: req.params.userid,
          last_msg: req.body.last_msg,
        });
      } else {
        query.received[check].last_msg = req.body.last_msg;
      }

      ChatList.findOneAndUpdate(
        { sender: req.params.senderid },
        { received: query.received },
        { new: true },
        (err, result) => {
          if (err) return res.status(500).json({ msg: err.message });
          else {
            return res.status(200).json(result);
          }
        }
      );
    } else {
      let query = await ChatList.findOne({ sender: req.params.senderid });
      //delete the user once we get their reply.

      const check = query.received.findIndex(
        (x) => x.user.toString() === req.params.userid.toString()
      );

      const sent_index = query.sent.findIndex(
        (x) => x.user.toString() === req.params.userid.toString()
      );

      const update_query_sent = () => {
        // console.log(req.body.last_msg, 50);
        // console.log(check);
        if (check != -1) {
          query.received[check].last_msg = req.body.last_msg;
        } else if (sent_index != -1 && check == -1) {
          query.sent[sent_index].last_msg = req.body.last_msg;
        }
        ChatList.findOneAndUpdate(
          { sender: req.params.senderid },
          { sent: query.sent, received: query.received },
          { new: true },
          (err, result) => {
            // console.log(result, 60);
            if (err) return res.status(500).json({ msg: err.message });
            else {
              // console.log(result, 70);
              return res.status(200).json(result);
            }
          }
        );
      };

      if (check == -1) {
        if (sent_index == -1) {
          query.sent.push({
            user: req.params.userid,
            last_msg: req.body.last_msg,
          });
          // console.log(query, 77);
        }
      } else {
        //sent has that user so we will remove him/her
        if (sent_index != -1) {
          query.sent.splice(sent_index, 1);
        }
      }

      update_query_sent();
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.get_mychat_list = (req, res, next) => {
  ChatList.findOne({ sender: res.locals.user.sub })
    .populate("sent.user received.user", "-friend -password")
    .exec((err, result) => {
      if (err) return res.status(500).json({ msg: err.message });
      else {
        return res.status(200).json(result);
      }
    });
};
