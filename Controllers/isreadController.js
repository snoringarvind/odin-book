const Isread = require("../models/Isread");

exports.put_isread_true = async (req, res, next) => {
  try {
    const query = await Isread.findOne({ sender: res.locals.user.sub });

    let notInclude = true;
    for (let i = 0; i < query.users.length; i++) {
      if (query.users[i].user.toString() == req.params.userid.toString()) {
        notInclude = false;
        query.users[i].isread = [];
        query.users[i].isread.push(true);

        Isread.findOneAndUpdate(
          { sender: res.locals.user.sub },
          { users: query.users },
          { new: true },
          (err, result) => {
            if (err) return res.status(500).json({ msg: err.message });
            else {
              return res.status(200).json(result);
            }
          }
        );
        break;
      }
    }

    if (notInclude) {
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

    let notInclude = true;
    for (let i = 0; i < query.users.length; i++) {
      if (query.users[i].user.toString() == res.locals.user.sub.toString()) {
        notInclude = false;

        query.users[i].isread.push(false);

        break;
      }
    }

    if (notInclude) {
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
