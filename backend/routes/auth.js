const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const auth = require("../middleware/auth");

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    let user = await Student.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new Student({
      name,
      email,
      password: hashedPassword,
      course
    });

    await user.save();

    res.json({ msg: "Registered successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Student.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });

    res.json({ token, user });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


// UPDATE PASSWORD
router.put("/update-password", auth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await Student.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Wrong old password" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ msg: "Password updated" });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});


// UPDATE COURSE
router.put("/update-course", auth, async (req, res) => {
  try {
    const { course } = req.body;

    const user = await Student.findById(req.user.id);
    user.course = course;

    await user.save();

    res.json({ msg: "Course updated" });

  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;