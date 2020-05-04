// const express = require("express");
// const app = express();
// const port = 8000;
// app.listen(port, () => console.log("server is up and running"));
// app.get("/", (req, res) => res.send("Hello there"));
// app.get("/login", (req, res) => res.send("welcome"));

const express = require("express");
const app = express();

app.listen(3000, () => console.log("Port listening . . . ... "));

app.get("/", (req, res) => res.send("welcome"));

const isAdminRole = true;
const isAdmin = (req, res, next) => {
  if (isAdminRole) {
    console.log("isAdminRole", isAdminRole);
    next();
  } else {
    console.log("You dont have access to Admin dashboard");
  }
};
const adminRoute = (req, res) => {
  return res.send("Welcome to Admin dashboard");
};
app.get("/admin", isAdmin, adminRoute);
