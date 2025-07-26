const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// === MIDDLEWARE ===
app.use(cors({
  origin: ['https://ah-cv2-0-zw6n.vercel.app','https://ah-cv2-0-qqu3.vercel.app','https://ahc-admin-three.vercel.app','https://adminahc.vercel.app/','http://localhost:5173', 'http://localhost:3000'], // replace with actual domains
  methods: ['GET', 'POST'],
}));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // optional for form-encoded support

// === DATABASE CONNECTION ===
mongoose.connect('mongodb+srv://supriyo2026:40QOAFktKXHtoM64@cluster0.ag4efw4.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// === SCHEMAS & MODELS ===

// Resume schema
const resumeSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  qualification: String,
  profile: String,
  designation: String,
  resumeUrl: String, // optional: if using Cloudinary or file uploads
}, { timestamps: true });

const Resume = mongoose.model('Resume', resumeSchema);

// Contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  subject: String,
  message: String,
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

// === ROUTES ===

// Submit resume
app.post('/api/resumes', async (req, res) => {
  try {
    console.log('📥 Resume submission received:', req.body);
    const newResume = new Resume(req.body);
    const savedResume = await newResume.save();
    res.status(201).json({ message: 'Resume submitted successfully', data: savedResume });
  } catch (err) {
    console.error('❌ Error saving resume:', err);
    res.status(400).json({ error: err.message });
  }
});

// Submit contact message
app.post('/api/contact', async (req, res) => {
  try {
    console.log('📩 Contact form received:', req.body);
    const contact = new Contact(req.body);
    const savedContact = await contact.save();
    res.status(201).json({ message: 'Message sent successfully', data: savedContact });
  } catch (err) {
    console.error('❌ Error saving contact:', err);
    res.status(400).json({ error: err.message });
  }
});

// === OPTIONAL GET ROUTES ===
app.get('/api/resumes', async (req, res) => {
  const resumes = await Resume.find().sort({ createdAt: -1 });
  res.json(resumes);
});

app.get('/api/contact', async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

// === START SERVER ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});