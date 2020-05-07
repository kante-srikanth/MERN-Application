//import statements
var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { signout, signup } = require("../controllers/auth");

//routers
router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("NAME SHOULD BE GREATER THAN 3 CHARS"),
    check("email").isEmail().withMessage("INVALID EMAIL"),
  ],
  signup
);
router.get("/signout", signout);

//export statement
module.exports = router;
