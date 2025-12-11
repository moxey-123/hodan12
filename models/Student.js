const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  feePaid: { type: Number, required: true }
});

module.exports = mongoose.models.Student || mongoose.model("Student", studentSchema);
