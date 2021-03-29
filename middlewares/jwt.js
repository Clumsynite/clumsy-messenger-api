require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.decode = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  const token = req.cookies.auth;
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.SECRET, (err, data) => {
      if (err) {
        return res.json({ success: false, error: "Token doen't match" });
      }
      req.user = data;
      next();
    });
  } else if (token) {
    jwt.verify(token, process.env.SECRET, (err, data) => {
      if (err) {
        return res.json({ success: false, error: "Token doen't match" });
      }
      req.user = data;
      next();
    });
  } else {
    return res.json({ success: false, error: "Token not Found" });
  }
};
