// Setup empty JS object to act as endpoint for all routes
const projectData = {
    temp: null,
    date: null,
    userResponse: null,
};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware */
// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Weather journal routes
app.get('/api/journals', (req, res) => {
    // Return a list of recent searched journals, as JSON array
    res.send(projectData);
});

const requiredFields = ['temp', 'date', 'userResponse'];
app.post('/api/journals', (req, res) => {
    for (const field of requiredFields) {
        if (!req.body || !req.body[field]) {
            res.status(400).send(`Missing required field: "${field}"`);
            return;
        }
    }
    const { temp, date, userResponse } = req.body;
    projectData.temp = temp;
    projectData.date = date;
    projectData.userResponse = userResponse;
    res.status('201').end();
});

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});
