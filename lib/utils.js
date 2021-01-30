const jsonWebToken = require("jsonwebtoken");
require("dotenv/config");
const bcrypt = require("bcrypt");

const saltrounds = 10;

export const issueJwt = (user) => {
  const payload = {
    sub: user.id,
    iat: Date.now(),
    name: user.username,
  };

  const options = {
    algorithm: "HS256",
    expiresIn: "1d",
  };

  //you only only need to give the payload as data which will be signed by jwt, and you will get the same payload after verification

  const token = jsonWebToken.sign(payload, process.env.SECRET, options);

  return { token, sub, iat, expiresIn };
};

export const verifyJwt = (req, res, next) => {
  const headers = req.headers;
  const token = headers.split(" ")[1];

  try {
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

export const hashPassword = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, saltrounds);
    res.locals.hashPassword = hash;
    return next();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const decodeHash = async (req, res, next) => {
  try {
    isPassword = await bcrypt.compare(
      req.body.password,
      res.locals.hashPassword
    );
    res.locals.isPassword = isPassword;
    return next();
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
