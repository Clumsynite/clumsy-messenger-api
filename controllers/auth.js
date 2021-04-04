const passport = require("passport");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const io = require("../index").io;

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err || !user) {
      return res.json({
        error: "Something is not right\ntry a different username or password",
        success: false,
      });
    }
    req.login(user, async (error) => {
      if (error) {
        return res.json({ error, success: false });
      }
      await User.findByIdAndUpdate({ _id: user._id }, { connected: true });
      const { _doc } = user;
      const token = jwt.sign({ ..._doc, photo: "" }, process.env.SECRET);
      res.cookie("auth", token, {
        path: "/",
        secure: true,
        httpOnly: true,
        sameSite: "none",
      });
      io.emit("refreshUsers");
      res.json({
        user,
        success: true,
        token: token,
        msg: "Login Successful",
      });
    });
  })(req, res);
};

exports.logout = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(
      { _id },
      { connected: false, lastOnline: new Date() }
    );
    req.logout();
    res.clearCookie("auth", {
      path: "/",
      secure: true,
      httpOnly: true,
      sameSite: "none",
    });
    io.emit("refreshUsers");
    return res.json({ msg: "Logged out successfully", success: true });
  } catch (error) {
    return res.json({ error: "Logout Failed\n" + error, success: false });
  }
};
