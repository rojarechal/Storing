const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize the app
const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://mounika:Mounika2002@cluster0.5rwqj.mongodb.net/Task1', { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));
// Define a data schema and model

    const empDataSchema = new mongoose.Schema({
        empId: String,
        firstName: String,
        lastName: String,
        dob: Date,
        gender: String,
        aadhar: String,
        mail: String,
        designation: String,
        dateJoin: Date,
        department: String,
        qualification: String
    });



const employee_data = mongoose.model('employee_data', empDataSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'));
});

// Handle form submission
app.post('/submit', (req, res) => {
    console.log(req.body); // Log the received data

    const newemployee_data = new employee_data({
        empId: req.body.empId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: new Date(req.body.dob),
        gender: req.body.gender,
        aadhar: req.body.aadhar,
        mail: req.body.mail,
        designation: req.body.designation,
        dateJoin: new Date(req.body.dateJoin),
        department: req.body.department,
        qualification: req.body.qualification
    });

    newemployee_data.save()
        .then(() => {
            res.send('Data saved successfully!');
        })
        .catch(err => {
            res.status(400).send('Error saving data: ' + err.message);
        });
});

//server startr
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});