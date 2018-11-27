const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
  questions: { type: Number, required: true },
  correct: { type: Number, required: true },
  incorrect: { type: Number, required: true },
  q1: { type: Object, required: true },
  q2: { type: Object, required: true },
  q3: { type: Object, required: true },
  q4: { type: Object, required: true },
  q5: { type: Object, required: true },
  q6: { type: Object, required: true },
  q7: { type: Object, required: true },
  q8: { type: Object, required: true },
  q9: { type: Object, required: true },
  q10: { type:Object, required: true },
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
