const User = require("../models/user");
// const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../services/auth");

async function handleUserSignup(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname | !lastname | !email | !password) {
      req.flash("toast", {
        type: "error",
        message: "Please provide full details!",
      });
      return res.redirect("/signup");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash("toast", { type: "error", message: "User already exists!" });
      return res.redirect("/signup");
    }

    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
      role: "user",
    });

    await newUser.save();

    req.flash("toast", { type: "success", message: "Signup successful!" });
    return res.redirect("/login");
  } catch (error) {
    req.flash("toast", { type: "error", message: "Internal server error!" });
    return res.redirect("/signup");
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    
    if (!email | !password) {
      req.flash("toast", {
        type: "error",
        message: "Please provide full details!",
      });
      return res.redirect("/login");
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      req.flash("toast", { type: "error", message: "Invalid credentials!" });
      return res.redirect("/login");
    }
    const sessionId = setUser(existingUser); // returns token

    res.cookie("token", sessionId, { httpOnly: true });

    req.flash("toast", { type: "success", message: "Login successful!" });
    return res.redirect("/");
  } catch (error) {
    req.flash("toast", { type: "error", message: "Internal server error!" });
    return res.redirect("/login");
  }
}

function handleLogout(req, res) {
  try {
    // res.clearCookie("uid");
    res.clearCookie("token");

    req.flash("toast", {
      type: "success",
      message: "Logged out successfully!",
    });
    return res.redirect("/login");
  } catch (error) {
    req.flash("toast", { type: "error", message: "Internal server error!" });
    return res.redirect("/login");
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleLogout,
};
