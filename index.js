const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Secret key for JWT
const SECRET_KEY = "37c4c60d35f764e790af2d67f7823ec829fa1518dbca4d9bbce948765233610f45931e134540ae22acb9aaf12daf17f3dd0e613a55bcc82278f1417de1e2fb21ebfb3aa026dc553c50385fdb2225ae34d85cf23b5a051a7c363d2fcd6c66e2e9a9730739cb7fdfb041811015c0a3493e69ab1eb66435f25dc62c2de68a4a4bf8";

// Sample users for authentication
const USERS = {
  validUser: "validPass",
};

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Generate a JWT token
function generateToken(username) {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
}

// Login route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  // Validate credentials
  if (USERS[username] && USERS[username] === password) {
    const token = generateToken(username);
    return res.status(200).json({ message: "Login successful", token });
  } else {
    return res.status(401).json({ error: "Invalid username or password" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
