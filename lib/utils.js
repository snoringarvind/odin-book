const jsonWebToken = require("jsonwebtoken");
require("dotenv/config");
const bcrypt = require("bcrypt");

const saltrounds = 10;

exports.issueJwt = (user) => {
  const payload = {
    sub: user._id,
    iat: Date.now(),
    name: user.username,
  };

  const options = {
    algorithm: "HS256",
    expiresIn: "3d",
  };

  //you only only need to give the payload as data which will be signed by jwt, and you will get the same payload after verification

  const token = jsonWebToken.sign(payload, process.env.SECRET, options);

  return {
    token: token,
    iat: payload.iat,
    user: payload.name,
    fname: user.fname,
    lname: user.lname,
    created_at: user.created_at,
    expiresIn: options.expiresIn,
    sub: payload.sub,
  };
};

exports.verifyJwt = (req, res, next) => {
  try {
    const headers = req.headers.authorization;
    const token = headers.split(" ")[1];
    const decoded = jsonWebToken.verify(token, process.env.SECRET);
    //you will get the payload after decoding
    res.locals.user = decoded;
    res.locals.isAuthenticated = true;
    return next();
  } catch (err) {
    return res
      .status(403)
      .json({ isAuthenticated: false, msg: "you are not authenticated" });
  }
};

exports.hashPassword = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, saltrounds);
    res.locals.hashPassword = hash;
    return next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.decodeHash = async (req, res, next) => {
  try {
    isPassword = await bcrypt.compare(
      req.body.password,
      res.locals.hashPassword
    );
    res.locals.isPassword = isPassword;
    return next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
