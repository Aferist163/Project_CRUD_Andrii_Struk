const express = require("express");
const cors = require("cors");
const db = require("./db"); 

const app = express();
const PORT = process.env.PORT || 5000;

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
app.post("/weather", (req, res) => {
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
app.put("/weather/:id", (req, res) => {
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
app.delete("/weather/:id", (req, res) => {
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