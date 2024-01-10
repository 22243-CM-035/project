// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/studentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: String,
  branch: String,
  attendance: Number,
  profilePicture: String,
  rank: Number,
});

const Student = mongoose.model('Student', studentSchema);

app.use(express.static('public'));

app.get('/details', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/details.html'));
});

app.post('/submit', upload.single('img'), async (req, res) => {
  const { name, rollNumber, branch, attendance, rank } = req.body;
  const profilePicture = req.file ? req.file.filename : null;

  try {
    const student = new Student({ name, rollNumber, branch, attendance, profilePicture, rank });
    await student.save();
    res.send('Student data submitted successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/login.html'));
});

app.post('/login', (req, res) => {
  res.redirect('/details');
});

app.get('/branchData', async (req, res) => {
  const branch = req.query.branch;

  try {
    const branchData = await Student.find({ branch });
    res.json(branchData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
// app.js

// Existing code...

// Function to fetch data based on branch using AJAX (in the browser)
async function fetchBranchData(branch) {
  try {
    const response = await fetch(`/branchData?branch=${branch}`);
    const data = await response.json();

    // Handle the response data (for example, display it on the page)
    console.log(data); // You can modify this part based on your requirement

    // Assuming you want to display the data in the mainContent div
    document.getElementById('mainContent').innerHTML = JSON.stringify(data);
  } catch (error) {
    console.error(error);
  }
}

// app.js

// Existing code...

// Function to fetch data based on branch using AJAX (in the browser)
async function fetchBranchData(branch, callback) {
  try {
    const response = await fetch(`/branchData?branch=${branch}`);
    const data = await response.json();

    // Call the callback function and pass the data
    callback(data);
  } catch (error) {
    console.error(error);
  }
}

// Call fetchBranchData with a callback to update the content
fetchBranchData('DCME', function(data) {
  // Assuming you want to display the data in the mainContent div
  document.getElementById('mainContent').innerHTML = JSON.stringify(data);
});

// app.js

// Existing code...

// Function to fetch data based on branch using AJAX (in the browser)
