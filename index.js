const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// Define a sample user
const user = {
  full_name: 'John Doe',
  dob: '17091999',
  email: 'john@xyz.com',
  roll_number: 'ABCD123',
};

const isNumber = (char) => {
    return /^\d+$/.test(char);
}

// POST endpoint
app.post('/bfhl', (req, res) => {
  const requestData = req.body.data;
  const numbers = [];
  const alphabets = [];
  for(let i=0; i<requestData.length; i++) {
    if(isNumber(requestData[i])) {
        numbers.push(requestData[i]);
    }else{
        alphabets.push(requestData[i]);
    }
  }
  const sortedAlphabets = alphabets.slice().sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  const highest_alphabet = sortedAlphabets[sortedAlphabets.length - 1];
  const response = {
    is_success: true,
    user_id: `${user.full_name}_${user.dob}`,
    email: user.email,
    roll_number: user.roll_number,
    numbers: numbers,
    alphabets: alphabets,
    highest_alphabet: [highest_alphabet] || [],
  };

  res.json(response);
});

// GET endpoint
app.get('/bfhl', (req, res) => {
  const response = {
    operation_code: 1,
  };

  res.status(200).json(response);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
