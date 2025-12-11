const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// GET all students
router.get("/", async (req, res) => {
  try {
    const { month, year } = req.query;
    let filter = {};
    if(month) filter["regDate.month"] = Number(month);
    if(year) filter["regDate.year"] = Number(year);

    const students = await Student.find(filter).populate("course");
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST register student
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, idNumber, phone, course, feePaid, regDate } = req.body;
    if(!firstName || !lastName || !idNumber || !phone || !course || !regDate?.day || !regDate?.month || !regDate?.year) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const student = new Student({
      firstName,
      lastName,
      idNumber,
      phone,
      course,
      feePaid: feePaid || 0,
      regDate
    });

    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update student
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
