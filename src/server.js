const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://supriyo2026:40QOAFktKXHtoM64@cluster0.ag4efw4.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ------------------ Contact Form Schema & API ------------------
const contactSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  subject: String,
  message: String,
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

// POST /api/contact - Save contact form submission
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    const saved = await contact.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ------------------ Resume Schema & API ------------------
const resumeSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  qualification: String,
  profile: String,
  designation: String,
  resumeUrl: String, // optional: to be used if integrating file uploads
}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);

// POST /api/resumes - Save resume data
app.post('/api/resumes', async (req, res) => {
  try {
    const newResume = new Resume(req.body);
    const savedResume = await newResume.save();
    res.status(201).json(savedResume);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/resumes - Optional: List all resumes
app.get('/api/resumes', async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------ Start Server ------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});