const User = require("../models/user");

async function handleFileUpload(req, res) {
  try {
    const userId = req.user._id;

    // req.file.path is the Cloudinary URL
    await User.findByIdAndUpdate(
      userId,
      { avatar: req.file.path },
      { new: true }
    );
    // console.log("Updated user:", updatedUser);

    req.flash("toast", {
      type: "success",
      message: "Avatar updated successfully.",
    });

    res.redirect("/profile");
  } catch (err) {
    req.flash("toast", { type: "error", message: "Internal server error!" });
    return res.redirect("/profile");
  }
}

async function handleProfileUpdate(req, res) {
  try {
    const userId = req.user._id;
    const updatedBody = { ...req.body };

    // fetch current data
    const currentUser = await User.findById(userId);
    if (!currentUser) {
      req.flash("toast", {
        type: "error",
        message: "User not found!",
      });
      return res.redirect("/profile");
    }

    // check existing email excluding the current one
    if (updatedBody.email && updatedBody.email !== currentUser.email) {
      const existingEmail = await User.findOne({
        email: updatedBody.email,
        _id: { $ne: userId },
      });
      if (existingEmail) {
        req.flash("toast", {
          type: "error",
          message: "This email is already registered!",
        });
        return res.redirect("/profile");
      }
    }

    // req.file.path is the Cloudinary URL
    const fieldsToUpdate = {};
    for (const key in updatedBody) {
      if (updatedBody[key] !== currentUser[key]) {
        fieldsToUpdate[key] = updatedBody[key];
      }
    }

    // If nothing changed, just redirect
    if (Object.keys(fieldsToUpdate).length === 0) {
      req.flash("toast", {
        type: "info",
        message: "No changes detected.",
      });
      return res.redirect("/profile");
    }

    // Update only changed fields
    await User.findByIdAndUpdate(userId, fieldsToUpdate, {
      new: true,
    });

    // console.log("Updated user:", updatedUser);
    req.flash("toast", {
      type: "success",
      message: "Profile updated successfully.",
    });
    res.redirect("/profile");
  } catch (err) {
    req.flash("toast", { type: "error", message: "Internal server error!" });
    return res.redirect("/profile");
  }
}

module.exports = {
  handleFileUpload,
  handleProfileUpdate,
};
