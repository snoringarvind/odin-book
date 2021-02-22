const ChatList = require("../models/ChatList");

//to display the list of conversation with users
exports.put_mychat_list = async (req, res, next) => {
  try {
    if (req.params.senderid != res.locals.user.sub) {
      let query = await ChatList.findOne({ sender: req.params.senderid });

      const check = query.received.includes(req.params.userid);
      if (!check) {
        query.received.push(req.params.userid);
        ChatList.findOneAndUpdate(
          { sender: req.params.senderid },
          { received: query.received },
          { new: true },
          (err, result) => {
            console.log(err, 138);
            console.log(result, 139);
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
      console.log(req.params.senderid, 147);
      let query = await ChatList.findOne({ sender: req.params.senderid });
      //delete the user once we get their reply.

      console.log(query, 150);
      //alreay agar mere sent mein Komal ka naam hain toh I don't need to update the sent
      const isInclude = query.sent.includes(req.params.userid);

      console.log(query, "38", isInclude);
      // return;
      if (isInclude) {
        for (let i = 0; i < query.received.length; i++) {
          //if i already have Komal in received then I don't need to remove her from sent
          console.log(query.received[i], req.params.userid, "42");
          if (query.received[i].toString() === req.params.userid.toString()) {
            console.log(query.sent[i], req.params.userid, "45");
            for (let i = 0; i < query.sent.length; i++) {
              console.log(query.sent[i], req.params.userid, "47");
              if (query.sent[i] == req.params.userid) {
                console.log(query, 48);
                query.sent.splice(i, 1);
                console.log(query, 49);
                break;
              }
            }
            break;
          }
        }
        //but if she is not in receive then I need don't need to update the sent.
      } else {
        //but if she is not in sent then I need to add her in sent
        query.sent.push(req.params.userid);
        console.log(query);
      }
      ChatList.findOneAndUpdate(
        { sender: req.params.senderid },
        { sent: query.sent },
        { new: true },
        (err, result) => {
          // console.log(err, 174);
          console.log(result, 65);
          if (err) return res.status(500).json({ msg: err.message });
          else {
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
  ChatList.findOne({ sender: res.locals.user.sub }).exec((err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    else {
      return res.status(200).json(result);
    }
  });
};
