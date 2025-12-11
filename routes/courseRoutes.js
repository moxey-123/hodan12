const express = require("express");
const Course = require("../models/Course");
const router = express.Router();

// GET all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE a new course
router.post("/", async (req, res) => {
  try {
    const { name, fee } = req.body;
    if (!name || fee == null) return res.status(400).json({ error: "Name and fee are required" });

    const course = new Course({ name, fee });
    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE a course by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, fee } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { name, fee },
      { new: true }
    );
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a course by ID
router.delete("/:id", async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
