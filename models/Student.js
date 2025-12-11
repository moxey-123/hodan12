const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  feePaid: { type: Number, required: true },
  registrationDate: { type: Date, default: Date.now } // Added for month/year filtering
});

// Export model (avoid overwrite errors)
module.exports = mongoose.models.Student || mongoose.model("Student", studentSchema);
