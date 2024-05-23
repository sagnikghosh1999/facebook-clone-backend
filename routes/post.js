const express = require("express");
const {
  createPost,
  getAllPosts,
  comment,
} = require("../controllers/postController");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createpost", authUser, createPost);
router.get("/getallposts", authUser, getAllPosts);
router.put("/comment", authUser, comment);

module.exports = router;
