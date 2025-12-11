const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Course = require("../models/Course");

// -------- CREATE STUDENT --------
router.post("/", async (req, res) => {
  try {
    const { name, course, feePaid } = req.body;
    if (!name || !course) return res.status(400).json({ message: "Name and course required" });

    const student = await Student.create({ name, course, feePaid });
    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------- GET ALL STUDENTS --------
router.get("/", async (req, res) => {
  try {
    const { month, year } = req.query; // Optional query params

    let filter = {};
    if (month && year) {
      // Filter by month/year
      const start = new Date(year, month - 1, 1); // month is 1-12
      const end = new Date(year, month, 0, 23, 59, 59); // last day of month
      filter.registrationDate = { $gte: start, $lte: end };
    }

    const students = await Student.find(filter).populate("course");
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------- GET STUDENT BY ID --------
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate("course");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------- UPDATE STUDENT --------
router.put("/:id", async (req, res) => {
  try {
    const { name, course, feePaid } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, course, feePaid },
      { new: true }
    );
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -------- DELETE STUDENT --------
router.delete("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
