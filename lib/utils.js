const jsonWebToken = require("jsonwebtoken");
require("dotenv/config");

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
