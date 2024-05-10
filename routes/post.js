const express = require("express");
const { createPost, getAllPosts } = require("../controllers/postController");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createpost", authUser, createPost);
router.get("/getallposts", authUser, getAllPosts);

module.exports = router;
