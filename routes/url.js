const express = require("express");
const router = express.Router();

const { handleGenerateNewShortURL, handleRedirectToNewShortURL, handleGetAnalytics, handleDeleteShortURL, handleDeleteManyShortURL } = require("../controllers/url")

router.get("/:shortId", handleRedirectToNewShortURL)

router.get("/analytics/:shortId", handleGetAnalytics)

router.post("/", handleGenerateNewShortURL)

router.post("/delete/:shortId", handleDeleteShortURL)

router.post("/delete-many", handleDeleteManyShortURL)

module.exports = router;