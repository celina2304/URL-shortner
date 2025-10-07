const express = require("express");
const { handleFileUpload,handleProfileUpdate } = require("../controllers/profile");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post("/update", handleProfileUpdate);
router.post("/upload-avatar", upload.single("avatar"), handleFileUpload);

module.exports = router;
