const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
    q1: { type: Object, required: true },
    q2: { type: Object, required: true },
    q3: { type: Object, required: true },
    q4: { type: Object, required: true },
    q5: { type: Object, required: true },
    q6: { type: Object, required: true },
    q7: { type: Object, required: true },
    q8: { type: Object, required: true },
    q9: { type: Object, required: true },
    q10: { type:Object, required: true }
});

questionSchema.set("timestamps", true);

questionSchema.set("toObject", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model("Question", questionSchema);