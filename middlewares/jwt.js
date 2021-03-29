require("dotenv").config();
const jwt = require("jsonwebtoken");
// models
const User = require("../models/User.js");

const SECRET_KEY = process.env.SECRET;

// exports.encode = async (req, res, next) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username, password });

//     console.log("User ", user)
//     const payload = {
//       userId: user._id,
//       fullname: `${user.firstname} ${user.lastname}`,
//       ...user,
//       password: "*****",
//     };
//     const authToken = jwt.sign(payload, SECRET_KEY);
//     req.authToken = authToken;
//     console.log("Auth token: ", authToken)
//     next();
//   } catch (error) {
//     return res.status(400).json({ success: false, error });
//   }
// };

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
