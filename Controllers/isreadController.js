const Isread = require("../models/Isread");

exports.put_isread_true = async (req, res, next) => {
  try {
    const query = await Isread.findOne({ sender: res.locals.user.sub });

    // console.log(query, 7);
    // if (query.users.length == 0) {
    //   return res.status(200).json({ msg: "no msgs to set to isread true" });
    // }
    const in_users_index = query.users.findIndex(
      (x) => x.user.toString() === req.params.userid.toString()
    );

    // console.log(in_users_index);
    if (in_users_index != -1) {
      query.users[in_users_index].isread = [];
      query.users[in_users_index].isread.push(true);
      Isread.findOneAndUpdate(
        { sender: res.locals.user.sub },
        { users: query.users },
        { new: true },
        (err, result) => {
          // console.log(result);
          if (err) return res.status(500).json({ msg: err.message });
          else {
            return res.status(200).json(result);
          }
        }
      );
    } else {
      return res
        .status(200)
        .json({ msg: "no msgs sent by this user to set to read true" });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.put_isread_false = async (req, res, next) => {
  try {
    const query = await Isread.findOne({ sender: req.params.senderid });
    // console.log(query, 38);
    const in_users_index = query.users.findIndex((x) => {
      // console.log(x, 40);
      return x.user.toString() === res.locals.user.sub.toString();
    });

    // console.log(in_users_index, 43);

    if (in_users_index !== -1) {
      if (query.users[in_users_index].isread[0] === true) {
        query.users[in_users_index].isread.splice(0, 1);
      }
      query.users[in_users_index].isread.push(false);
    } else {
      query.users.push({ user: res.locals.user.sub, isread: false });
    }

    Isread.findOneAndUpdate(
      { sender: req.params.senderid },
      { users: query.users },
      { new: true },
      (err, result) => {
        if (err) return res.status(500).json({ msg: err.message });
        else {
          return res.status(200).json(result);
        }
      }
    );
  } catch (err) {
    // console.log(err, 64);
    return res.status(500).json({ msg: err.message });
  }
};

exports.get_isread = (req, res, next) => {
  Isread.findOne({ sender: res.locals.user.sub }, (err, result) => {
    if (err) return res.status(500).json({ msg: err.message });
    else {
      return res.status(200).json(result);
    }
  });
};
