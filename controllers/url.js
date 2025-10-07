// const { nanoid } = require("nanoid");
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  try {
    // console.log(req.user);
    const body = req.body;
    if (!body.url) {
      req.flash("toast", { type: "error", message: "URL required!" });
      return res.redirect("/");
    }

    const existing = await URL.findOne({
      redirectUrl: body.url,
      createdBy: req?.user._id,
    });

    if (existing) {
      req.flash("toast", { type: "info", message: "URL already exists!", shortId: existing.shortId });
      return res.redirect(`/generate?shortId=${existing.shortId}`);
    }
    // generate new
    const { nanoid } = await import('nanoid');
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
    return res
      .status(500)
      .json({ error: "Internal Server Error", message: err });
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
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleGetAnalytics(req, res) {
  try {
    const shortId = req.params.shortId;
    if (!shortId){
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
    return res.status(500).json({ error: "Internal Server Error" });
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
    return res.status(500).json({ error: "Internal Server Error" });
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
    
    req.flash("toast", { type: "success", message: "Deleted URLs successfully!" });
    return res.redirect("/");

  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  handleGenerateNewShortURL,
  handleRedirectToNewShortURL,
  handleGetAnalytics,
  handleDeleteShortURL,
  handleDeleteManyShortURL,
};
