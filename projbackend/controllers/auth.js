const User = require("../models/user");

exports.signup = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save the user in the DB",
      });
    }
    res.send(user);
  });
};

exports.signout = (req, res) => {
  res.json({ message: "user signout success" });
};