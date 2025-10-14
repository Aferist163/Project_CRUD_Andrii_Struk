const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/planets.db", (err) => {
  if (err) console.error("❌ database error:", err.message);
  else console.log("✅ connect to SQLite");
});

const initSQL = fs.readFileSync("./database/migration.sql", "utf8");
db.exec(initSQL);

module.exports = db;
