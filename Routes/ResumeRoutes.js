const express = require("express");
const multer = require("multer");
const { storage } = require("../Utils/cloudinary");
const Resume = require("../Models/Resume");
const verifyToken = require("../Middleware/Auth");

const upload = multer({ storage });
const router = express.Router();

router.post("/submit", upload.single("resume"), async (req, res) => {
  const data = req.body;
  const resume = new Resume({ ...data, resumeUrl: req.file.path });
  await resume.save();
  res.status(201).json({ success: true });
});

router.get("/", verifyToken, async (req, res) => {
  const resumes = await Resume.find().sort({ createdAt: -1 });
  res.json(resumes);
});

module.exports = router;
