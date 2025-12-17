const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  admissionNumber: {
    type: String,
    required: true,
    unique: true
  },

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  idNumber: { type: String, required: true },
  phone: { type: String, required: true },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },

  feePaid: { type: Number, default: 0 },

  regDate: {
    day: Number,
    month: Number,
    year: Number
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
