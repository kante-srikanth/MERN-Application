//import statements
const User = require("../models/user");
const { validationResult } = require("express-validator");

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
    res.json({ name: user.name, email: user.email });
  });
};

//signout
exports.signout = (req, res) => {
  res.json({ message: "user signout success" });
};
