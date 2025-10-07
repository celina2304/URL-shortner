const express = require("express");
const { handleUserSignup, handleUserLogin, handleLogout } = require("../controllers/user");

const router = express.Router();

router.get("/logout", handleLogout);

router.post("/signup", handleUserSignup);

router.post("/login", handleUserLogin);

module.exports = router;