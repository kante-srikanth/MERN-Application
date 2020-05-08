const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err && !user) {
      return res.status(400).json({ error: "USER ID DID NOT FOUND" });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  //TODO: For password
  req.profile.salt = req.profile.encry_password = req.profile.createdAt = req.profile.updatedAt = undefined;
  return res.json(req.profile);
};
