exports.signup = (req, res) => {
  console.log("REQ BODY", req.body);
  res.json({ message: "user signup success" });
};

exports.signout = (req, res) => {
  res.json({ message: "user signout success" });
};
