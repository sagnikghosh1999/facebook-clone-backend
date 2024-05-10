const express = require("express");
const { uploadImages, listImages } = require("../controllers/uploadController");
const { authUser } = require("../middlewares/auth");
const imageUpload = require("../middlewares/imageUpload");

const router = express.Router();

router.post("/uploadimages", authUser, imageUpload, uploadImages);
router.post("/listimages", listImages);

module.exports = router;
