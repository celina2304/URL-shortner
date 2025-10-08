// const { nanoid } = require("nanoid");
const URL = require("../models/url");
const validator = require("validator");

const isValidUrl = (url) => {
  validator.isURL(url, {require_protocol: true});
}

async function handleGenerateNewShortURL(req, res) {
  try {
    
    const originalUrl = req.body?.url || null;
    if (!originalUrl) {
      req.flash("toast", { type: "error", message: "URL required!" });
      return res.redirect("/");
    }
    
    if(!isValidUrl(originalUrl)){
      req.flash("toast", { type: "error", message: "Please enter a valid URL!" });
      return res.redirect("/");
    }

    const existing = await URL.findOne({
      redirectUrl: body.url,
      createdBy: req?.user._id,
    });

    if (existing) {
      req.flash("toast", {
        type: "info",
        message: "URL already exists!",
        shortId: existing.shortId,
      });
      return res.redirect(`/generate?shortId=${existing.shortId}`);
    }
    // generate new
    const { nanoid } = await import("nanoid");
    const shortId = nanoid(6);
    const shortUrl = new URL({
      shortId,
      redirectUrl: body.url,
      visitHistory: [],
      createdBy: req.user._id,
    });
    await shortUrl.save();

    req.flash("toast", {
      type: "success",
      message: "URL generated successfully!!",
      shortId: shortId,
    });
    return res.redirect("/");
    // return res.redirect(`/?shortId=${shortId}`);
  } catch (err) {
    req.flash("toast", { type: "error", message: "Internal server error!" });
    return res.redirect("/generate");
  }
}

async function handleRedirectToNewShortURL(req, res) {
  try {
    const shortId = req.params.shortId;
    if (!shortId) {
      req.flash("toast", { type: "error", message: "URL required!" });
      return res.redirect("/", { error: "Please provide the short id" });
    }

    const shortUrl = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    return res.redirect(shortUrl.redirectUrl);
  } catch (err) {
    req.flash("toast", { type: "error", message: "Internal server error!" });
    return res.redirect("/home");
  }
}

async function handleGetAnalytics(req, res) {
  try {
    const shortId = req.params.shortId;
    if (!shortId) {
      req.flash("toast", {
        type: "error",
        message: "ShortID required!",
      });
      return res.redirect("/");
    }

    const shortUrl = await URL.findOne({ shortId });
    return res.status(200).json({
      totalClicks: shortUrl.visitHistory.length,
      visitHistory: shortUrl.visitHistory,
    });
  } catch (error) {
    req.flash("toast", { type: "error", message: "Internal server error!" });
    return res.redirect("/home");
  }
}

async function handleDeleteShortURL(req, res) {
  try {
    const shortId = req.params.shortId;
    if (!shortId) {
      req.flash("toast", { type: "error", message: "URL required!" });
      return res.redirect("/");
    }

    await URL.findOneAndDelete({ shortId, createdBy: req?.user._id });

    req.flash("toast", {
      type: "success",
      message: "Deleted URL succesfully!",
    });
    return res.redirect("/");
  } catch (error) {
    req.flash("toast", { type: "error", message: "Internal server error!" });
    return res.redirect("/home");
  }
}

async function handleDeleteManyShortURL(req, res) {
  try {
    const shortIds = req.body.deleteIds;
    if (!shortIds || shortIds.length === 0) {
      req.flash("toast", { type: "error", message: "Short IDs required!" });
      return res.redirect("/");
    }

    // make sure shortIds is an array
    const idsArray = Array.isArray(shortIds) ? shortIds : [shortIds];

    await URL.deleteMany({
      shortId: { $in: idsArray },
      createdBy: req?.user._id,
    });

    req.flash("toast", {
      type: "success",
      message: "Deleted URLs successfully!",
    });
    return res.redirect("/");
  } catch (error) {
    req.flash("toast", { type: "error", message: "Internal server error!" });
    return res.redirect("/home");
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleRedirectToNewShortURL,
  handleGetAnalytics,
  handleDeleteShortURL,
  handleDeleteManyShortURL,
};
