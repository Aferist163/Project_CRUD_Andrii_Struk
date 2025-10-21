CREATE TABLE IF NOT EXISTS weather (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  city TEXT,
  data_recorded TEXT,
  weather_description TEXT,
  temperature INTEGER,
  humidity TEXT
);
