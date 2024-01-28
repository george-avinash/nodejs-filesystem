const express = require("express");
const fs = require("fs-extra");
const path = require("path");
const app = express();
const port = 3000;
const filesDir = path.join("F:/Ms Visual/REAL/REACT/time", "files");

// Create 'files' directory if it doesn't exist
if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir);
}

// Create a new text file with the current timestamp
app.get("/create-file", (req, res) => {
  const CurrentDateTime = new Date().toISOString().replace(/:/g, '-');
  const fileName = `${CurrentDateTime}.txt`;
  const filePath = path.join(filesDir, fileName);

  fs.writeFile(filePath, CurrentDateTime, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error creating file");
    } else {
      res.status(200).send(`File created: ${fileName}`);
    }
  });
});

// Retrieve all text files in the 'files' directory
app.get("/get-files", (req, res) => {
  fs.readdir(path.join(filesDir), (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving files");
    } else {
      res
        .status(200)
        .send(files.filter((file) => path.extname(file) === ".txt"));
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
