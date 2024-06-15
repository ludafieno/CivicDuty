const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
app.use(cors());

const getFileData = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file at ${filePath}:`, err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

app.get('/local-files', async (req, res) => {
  try {
    const file1 = path.join(__dirname, 'src', 'CongressMembers1.html');
    console.log(`Attempting to read file at: ${file1}`);
    const file2 = path.join(__dirname, 'src', 'CongressMembers2.html');
    console.log(`Attempting to read file at: ${file2}`);
    const file3 = path.join(__dirname, 'src', 'CongressMembers3.html');
    console.log(`Attempting to read file at: ${file3}`);

    const data1 = await getFileData(file1);
    const data2 = await getFileData(file2);
    const data3 = await getFileData(file3);

    res.json({ data1, data2, data3 });
  } catch (err) {
    console.error('Error reading files:', err);
    res.status(500).send('Error reading files');
  }
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
