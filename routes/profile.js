const express = require("express");
const upload = require("../middlewares/upload");

const { handleFileUpload,handleProfileUpdate } = require("../controllers/profile");
const router = express.Router();

router.post("/update", handleProfileUpdate);
router.post("/upload-avatar", upload.single("avatar"), handleFileUpload);

module.exports = router;
