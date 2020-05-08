//import statements
var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");

//routers
router.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("NAME SHOULD BE GREATER THAN 3 CHARS"),
    check("email").isEmail().withMessage("INVALID EMAIL"),
    check("password", "password should be at least 3 char").isLength({
      min: 3,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email").isEmail().withMessage("INVALID EMAIL"),
    check("password")
      .isLength({ min: 1 })
      .withMessage("PASSWORD FIELD IS EMPTY"),
  ],
  signin
);

router.get("/signout", signout);

router.get("/testroute", isSignedIn, (req, res) => {
  return res.send("A Protected route");
});

//export statement
module.exports = router;
