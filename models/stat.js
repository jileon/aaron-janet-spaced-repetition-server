const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
  correct: { type: Number, required: true },
  incorrect: { type: Number, required: true },
  questions: [
    {
    _id: mongoose.Schema.Types.ObjectId,
    question: String,
    answer: String,
    memoryStrength: Number,
    next: Number
    }
  ],
  head: {
    type: Number,
    default: 0
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  }
});

statSchema.set("timestamps", true);

statSchema.set("toObject", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model("Stat", statSchema);
