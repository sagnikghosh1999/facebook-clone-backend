const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const storySchema = new mongoose.Schema({
  text: {
    type: String,
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  background: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // TTL in seconds, 86400 seconds = 1day
  },
});

// Ensure the TTL index is created
storySchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

module.exports = mongoose.model("Story", storySchema);
