const passport = require("passport");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err || !user) {
      return res.json({
        error: "Something is not right",
      });
    }
    req.login(user, async (error) => {
      if (error) {
        res.json({ error, success: false });
      }
      await User.findByIdAndUpdate({ _id: user._id }, { connected: true });
      const token = jwt.sign({ user }, process.env.SECRET);
      res.cookie("auth", token, {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "none",
      });
      res.json({
        user,
        success: true,
        token: token,
        msg: "Login Successful",
      });
    });
  })(req, res);
};

exports.logout = (req, res) => {
  req.logout();
  res.clearCookie("auth");
  res.json({ msg: "Logged out successfully", success: true });
};
