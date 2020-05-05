//import statements
var express = require("express");
var router = express.Router();
const { signout, signup } = require("../controllers/auth");

//routers
router.post("/signup", signup);
router.get("/signout", signout);

//export statement
module.exports = router;
