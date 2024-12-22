const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = './data.json';

// Helper functions to read/write JSON data
const readData = () => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading file:', err);
    return [];
  }
};

const hospitals = readData();
console.log(hospitals);

//write the data
const writeData = (data) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing file:', err);
  }
};


// const newData = [
//     { name: 'new Hospital', patientCount: 150, location: 'kollam' },
//     { name: 'new Hospital', patientCount: 150, location: 'idukky' }
   
//   ];
//   writeData(newData);
//   console.log('Data written successfully!');
// GET: Fetch all hospitals
router.get('/', (req, res) => {
  const data = readData();
  res.send(data);
});

// POST: Add a new hospital
router.post('/add', (req, res) => {
  const data = readData();
  const newHospital = req.body;

  if (!newHospital.name || !newHospital.patientCount || !newHospital.location) {
    return res.status(400).send({ message: 'Invalid input data' });
  }

  data.push(newHospital);
  writeData(data);
  res.send(data);
});

// PUT: Update a hospital by index
router.put('/edit/:index', (req, res) => {
  const data = readData();
  const index = parseInt(req.params.index, 10);

  if (index < 0 || index >= data.length) {
    return res.status(404).send({ message: 'Hospital not found' });
  }

  const updatedHospital = req.body;

  if (!updatedHospital.name || !updatedHospital.patientCount || !updatedHospital.location) {
    return res.status(400).send({ message: 'Invalid input data' });
  }

  data[index] = { ...data[index], ...updatedHospital };
  writeData(data);
  res.send(data);
});

// DELETE: Remove a hospital by index
router.delete('/delete/:index', (req, res) => {
  const data = readData();
  const index = parseInt(req.params.index, 10);

  if (index < 0 || index >= data.length) {
    return res.status(404).send({ message: 'Hospital not found' });
  }

  data.splice(index, 1);
  writeData(data);
  res.send(data);
});

module.exports = router;
