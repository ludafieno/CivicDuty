const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
app.use(cors());

app.get('/local-file', (req, res) => {
  const filePath = path.join(__dirname, 'src', "CongressMembers.html");
  console.log(`Attempting to read file at: ${filePath}`);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading file');
      return;
    }
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


// ES MODULE VERSION; rename to .js; no cors

// import express from 'express';
// import fs from 'fs';
// import path from 'path';
// import cors from 'cors';

// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();
// const PORT = 3000;

// app.get('/local-file', (req, res) => {
//   const filePath = path.join(__dirname, 'src', 'CongressMembers.html');
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       res.status(500).send('Error reading file');
//       return;
//     }
//     res.send(data);
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
