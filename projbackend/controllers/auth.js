//import statements
const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

//signup
exports.signup = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res
        .status(400)
        .json({ err: "Please try after sometime or try with new details" });
    }
    res.json({ name: user.name, email: user.email, id: user._id });
  });
};

exports.signin = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(422).json({ error: errors.array()[0].msg });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "USER EMAIL DOESNT EXISTS ",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({ err: "EMAIL AND PASSWORD DIDNOT MATCH" });
    }

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end application
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

//signout
exports.signout = (req, res) => {
  res.json({ message: "user signout success" });
};
