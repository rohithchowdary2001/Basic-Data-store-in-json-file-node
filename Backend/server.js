const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "login-data.json";

// Save registration data
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const newUser = { username, password };

  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    const currentData = err ? [] : JSON.parse(data || "[]");
    currentData.push(newUser);

    fs.writeFile(DATA_FILE, JSON.stringify(currentData, null, 2), (err) => {
      if (err) {
        console.error("Error saving data:", err);
        return res.status(500).json({ message: "Failed to save data" });
      }
      res.status(200).json({ message: "Registration successful" });
    });
  });
});

// Fetch all registered users
app.get("/users", (req, res) => {
  fs.readFile(DATA_FILE, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ message: "Error reading data" });
    }
    res.status(200).json(JSON.parse(data || "[]"));
  });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
