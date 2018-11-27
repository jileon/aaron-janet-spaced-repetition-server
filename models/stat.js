const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
  questions: { type: Number, required: true },
  correct: { type: Number, required: true },
  incorrect: { type: Number, required: true },
  q1: { type: Number, required: true },
  q2: { type: Number, required: true },
  q3: { type: Number, required: true },
  q4: { type: Number, required: true },
  q5: { type: Number, required: true },
  q6: { type: Number, required: true },
  q7: { type: Number, required: true },
  q8: { type: Number, required: true },
  q9: { type: Number, required: true },
  q10: { type: Number, required: true },
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
