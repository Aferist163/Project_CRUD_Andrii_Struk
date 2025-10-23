CREATE TABLE IF NOT EXISTS weather (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  city TEXT,
  data_recorded TEXT,
  weather_description TEXT,
  temperature INTEGER,
  humidity TEXT
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  user_role TEXT DEFAULT 'USER',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);