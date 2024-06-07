const Story = require("../models/storyModel");
const User = require("../models/userModel");

exports.createStory = async (req, res) => {
  try {
    const story = await new Story(req.body).save();
    await story.populate("user", "first_name last_name cover picture username");
    res.json(story);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllStories = async (req, res) => {
  try {
    const followingTemp = await User.findById(req.user.id).select("following");
    const following = followingTemp.following;
    const promises = following.map((user) => {
      return Story.find({ user: user })
        .populate("user", "first_name last_name picture username")
        .sort({ createdAt: -1 });
    });
    const followingStories = await (await Promise.all(promises)).flat();
    const userStories = await Story.find({ user: req.user.id })
      .populate("user", "first_name last_name picture username")
      .sort({ createdAt: -1 });
    followingStories.push(...[...userStories]);
    followingStories.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    res.json(followingStories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
