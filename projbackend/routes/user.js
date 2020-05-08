const express = require("express");
const router = express.Router();

const { getUser, getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
router.param("userId", getUserById);
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);

module.exports = router;
