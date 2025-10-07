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
    res.status(500).json({ message: "Internal server error", error });
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

    // session based auth
    // const sessionId = uuidv4();
    // setUser(sessionId, existingUser);

    const sessionId = setUser(existingUser); // returns token

    // return res.json({ message: "Login successful", token: sessionId });
    res.cookie("token", sessionId, { httpOnly: true });

    req.flash("toast", { type: "success", message: "Login successful!" });
    return res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

function handleLogout(req, res) {
  try {
    // res.clearCookie("uid");
    res.clearCookie("token");

    req.flash("toast", { type: "success", message: "Logged out successfully!" });
    return res.redirect("/login");
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleLogout,
};
