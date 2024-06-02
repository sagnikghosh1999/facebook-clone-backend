const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const storySchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    image: {
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Story", storySchema);
