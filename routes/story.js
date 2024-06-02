const express = require("express");

const { authUser } = require("../middlewares/auth");
const {
  createStory,
  getAllStories,
} = require("../controllers/storyController");

const router = express.Router();

router.post("/createstory", authUser, createStory);
router.post("/getallstories", authUser, getAllStories);

module.exports = router;
