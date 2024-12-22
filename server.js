const express = require('express');
const app = express();
const hospitalRoutes = require('./hospitalRoutes');

app.use(express.json()); // Middleware to parse JSON bodies

// Use the hospital routes
app.use('/hospitals', hospitalRoutes);

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


//GET http://localhost:4000/hospitals
//POST http://localhost:4000/hospitals/add
//PUT http://localhost:4000/hospitals/edit/1
//DELETE http://localhost:4000/hospitals/delete/2
