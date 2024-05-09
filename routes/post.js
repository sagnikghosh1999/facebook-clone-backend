const express = require("express");
const { createPost } = require("../controllers/postController");
const { authUser } = require("../middlewares/auth");

const router = express.Router();

router.post("/createpost", authUser, createPost);

module.exports = router;
