const User = require("../models/user");

const { check, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const users = new User(req.body);
  users.save((errr, user) => {
    if (errr) {
      return res.status(400).json({
        // error: errr.errmsg,
        error: "Something Went Wrong!",
      });
    }
    return res.status(200).json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }

  User.findOne({ email }, function (err, user) {
    if (err || !user) {
      return res.status(400).json({
        error: "User email Does not exists.",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password do not match.",
      });
    }

    //create cookie token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

exports.isSignedin = expressjwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "ok",
  });
};

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED.",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role == 0) {
    return res.status(403).json({
      error: "You are not ADMIN, ACCESS DENIED.",
    });
  }
  next();
};
