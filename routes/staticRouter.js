const express = require("express");
const URL = require("../models/url");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  const allUrls = await URL.find({ createdBy: req.user._id });
  return res.render("home", { urls: allUrls });
});

router.get("/generate", async (req, res) => {
  if (!req.user) return res.redirect("/login");
  return res.render("generate", { shortId: req.query.shortId || null });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  if (req.user) return res.redirect("/");
  return res.render("login");
});

router.get("/profile", async (req, res) => {
  try {
    if (!req.user) return res.redirect("/login");
    const userId = req.user._id;
    const user = await User.findById(userId);
    res.render("profile", {
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
