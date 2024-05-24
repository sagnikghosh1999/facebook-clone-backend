const express = require("express");
const {
  createPost,
  getAllPosts,
  comment,
  savePost,
  deletePost,
} = require("../controllers/postController");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createpost", authUser, createPost);
router.get("/getallposts", authUser, getAllPosts);
router.put("/comment", authUser, comment);
router.put("/savepost/:id", authUser, savePost);
router.delete("/deletepost/:id", authUser, deletePost);

module.exports = router;
