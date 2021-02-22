const ChatList = require("../models/ChatList");

//to display the list of conversation with users
exports.put_mychat_list = async (req, res, next) => {
  try {
    if (req.params.senderid != res.locals.user.sub) {
      let query = await ChatList.findOne({ sender: req.params.senderid });

      const check = query.received.find((x) => {
        // console.log(x, req.params.userid, 10);

        return x.user.toString() === req.params.userid.toString();
      });

      // console.log(check);
      if (check == undefined) {
        console.log(check, 17);
        query.received.push({
          user: req.params.userid,
          last_msg: req.body.last_msg,
        });

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
        return res.status(200).json({ msg: "no need to update received" });
      }
    } else {
      let query = await ChatList.findOne({ sender: req.params.senderid });
      //delete the user once we get their reply.

      console.log(query, 41);

      const check = query.received.findIndex(
        (x) => x.user.toString() === req.params.userid.toString()
      );

      const sent_index = query.sent.findIndex(
        (x) => x.user.toString() === req.params.userid.toString()
      );

      if (check == -1) {
        if (sent_index == -1) {
          query.sent.push({
            user: req.params.userid,
            last_msg: req.body.last_msg,
          });
        }
      } else {
        if (sent_index != -1) {
          query.sent.splice(check, 1);
        }
      }
      ChatList.findOneAndUpdate(
        { sender: req.params.senderid },
        { sent: query.sent },
        { new: true },
        (err, result) => {
          if (err) return res.status(500).json({ msg: err.message });
          else {
            console.log(result, 70);
            return res.status(200).json(result);
          }
        }
      );
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
