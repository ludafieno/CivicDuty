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
    const file2 = path.join(__dirname, 'src', 'CongressMembers2.html');
    const file3 = path.join(__dirname, 'src', 'CongressMembers3.html');

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

