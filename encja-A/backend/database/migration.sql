CREATE TABLE IF NOT EXISTS planets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nazwa TEXT,
  system_planet TEXT,
  klimat TEXT,
  populacja INTEGER,
  typ_powierzchni TEXT
);

ALTER TABLE planets ADD COLUMN srednica REAL;
ALTER TABLE planets ADD COLUMN masa REAL;