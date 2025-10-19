const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//===GET===
app.get("/planets", (req, res) => {
    db.all("SELECT * FROM planets", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

//===POST===
app.post("/planets", (req, res) => {
    const {
        nazwa,
        system_planet,
        klimat,
        populacja,
        typ_powierzchni,
        srednica, // new
        masa, // new
    } = req.body;

    if (!nazwa || !system_planet || !klimat || !populacja || !typ_powierzchni) {
        return res.status(400).json({ error: "All fields are required" });
    }
    if (isNaN(populacja)) {
        return res.status(400).json({ error: "Populacja must be a number" });
    }
    if (srednica !== undefined && srednica !== "" && isNaN(srednica)) {
        return res.status(400).json({ error: "Srednica must be a number" });
    }
    if (masa !== undefined && masa !== "" && isNaN(masa)) {
        return res.status(400).json({ error: "Masa must be a number" });
    }

    db.run(
        `INSERT INTO planets (nazwa, system_planet, klimat, populacja, typ_powierzchni, srednica, masa)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            nazwa,
            system_planet,
            klimat,
            populacja,
            typ_powierzchni,
            srednica || null,
            masa || null,
        ],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: this.lastID });
        }
    );
});

//===Edit===
app.put("/planets/:id", (req, res) => {
    const { id } = req.params;
    const {
        nazwa,
        system_planet,
        klimat,
        populacja,
        typ_powierzchni,
        srednica, // new
        masa, // new
    } = req.body;

    if (!nazwa || !system_planet || !klimat || !populacja || !typ_powierzchni) {
        return res.status(400).json({ error: "All fields are required" });
    }
    if (isNaN(populacja)) {
        return res.status(400).json({ error: "Populacja must be a number" });
    }
    if (srednica !== undefined && srednica !== "" && isNaN(srednica)) {
        return res.status(400).json({ error: "Srednica must be a number" });
    }
    if (masa !== undefined && masa !== "" && isNaN(masa)) {
        return res.status(400).json({ error: "Masa must be a number" });
    }

    db.run(
        `UPDATE planets
     SET nazwa=?, system_planet=?, klimat=?, populacja=?, typ_powierzchni=?, srednica=?, masa=?
     WHERE id=?`,
        [
            nazwa,
            system_planet,
            klimat,
            populacja,
            typ_powierzchni,
            srednica || null,
            masa || null,
            id,
        ],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0)
                return res.status(404).json({ error: "Planet not found" });
            res.json({ updated: this.changes });
        }
    );
});

//===DELETE===
app.delete("/planets/:id", (req, res) => {
    const { id } = req.params;
    db.run(`DELETE FROM planets WHERE id=?`, id, function (err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0)
            return res.status(404).json({ error: "Planet not found" });
        res.json({ deleted: this.changes });
    });
});

app.listen(port, () =>
    console.log(`✅ Server start on http://localhost:${port}`)
);
