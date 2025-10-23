const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./db"); 

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

//===GET===
app.get("/weather", (req, res) => {
  db.all("SELECT * FROM weather", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

//===POST===
app.post("/weather", auth, (req, res) => {
  const { city, data_recorded, weather_description, temperature, humidity } = req.body;

  if (!city || !data_recorded || !weather_description || !temperature || !humidity) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (isNaN(temperature)) {
    return res.status(400).json({ error: "Temperature must be a number" });
  }

  db.run(
    `INSERT INTO weather (city, data_recorded, weather_description, temperature, humidity)
     VALUES (?, ?, ?, ?, ?)`,
    [city, data_recorded, weather_description, temperature, humidity],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

//===PUT / Edit===
app.put("/weather/:id", auth, (req, res) => {
  const { id } = req.params;
  const { city, data_recorded, weather_description, temperature, humidity } = req.body;

  if (!city || !data_recorded || !weather_description || !temperature || !humidity) {
    return res.status(400).json({ error: "All fields are required" });
  }
  if (isNaN(temperature)) {
    return res.status(400).json({ error: "Temperature must be a number" });
  }

  db.run(
    `UPDATE weather
     SET city=?, data_recorded=?, weather_description=?, temperature=?, humidity=?
     WHERE id=?`,
    [city, data_recorded, weather_description, temperature, humidity, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: "Record not found" });
      res.json({ updated: this.changes });
    }
  );
});

//===DELETE===
app.delete("/weather/:id", auth, (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM weather WHERE id=?`, id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Record not found" });
    res.json({ deleted: this.changes });
  });
});

app.listen(PORT, () =>
  console.log(`✅ Server started on port ${PORT}`)
);




app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password || password.length < 8) {
    return res.status(400).json({ error: "Invalid username or password" });
  }

  db.get("SELECT * FROM users WHERE username=?", [username], async (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (row) return res.status(409).json({ error: "Username already exists" });

    const hash = await bcrypt.hash(password, 10);

    db.run(
      "INSERT INTO users (username, password_hash) VALUES (?, ?)",
      [username, hash],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, message: "User registered" });
      }
    );
  });
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username=?", [username], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: "Invalid username or password" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: "Invalid username or password" });

    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username }, 
      JWT_SECRET, 
    { expiresIn: "1h" }
);

    res.json({ token });
  });
});


function auth(req, res, next) {
  const header = req.headers["authorization"];
  if (!header) return res.status(401).json({ error: "No token provided" });

  const token = header.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}