import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { notifyError, notifySuccess } from "./utils/toastNotifications";
import { Toaster } from "react-hot-toast";
import Edit from "./components/Edit";
import Info from "./components/Info";
import Inspect from "./components/Inspect";
import Layout from "./components/Layout";
import Login from "./components/Login";
import "./css/App.css";
import "./css/cards.css";
import "./css/login.css";

function App() {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [weather, setWeather] = useState([]);
  const [editing, setEditing] = useState(null);
  const editWeather = (item) => setEditing(item);

  const fetchWeather = async () => {
    try {
      const res = await fetch(`${API_URL}/weather`);
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const addWeather = async (item) => {
    try {
      if (editing) {
        // === Editing
        const res = await fetch(`${API_URL}/weather/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        const updated = await res.json();
        if (updated.updated) {
          fetchWeather();
          setEditing(null);
          notifySuccess("Changes saved to database");
        }
      } else {
        // === Add
        const res = await fetch(`${API_URL}/weather`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        const newItem = await res.json();
        if (newItem.id) {
          fetchWeather();
          notifySuccess("Data saved to database");
        }
      }
    } catch (err) {
      console.error(err);
      notifyError("An error occurred while saving data");
    }
  };

  // === Delete
  const deleteWeather = async (id) => {
    if (!window.confirm("Are you sure you want to delete weather data?")) return;
    try {
      const res = await fetch(`${API_URL}/weather/${id}`, { method: "DELETE" });
      const result = await res.json();
      if (result.deleted) {
        fetchWeather();
        notifySuccess("Data deleted");
      }
      if (editing && editing.id === id) setEditing(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Info />} />
          <Route path="edit" element={<Edit weather={weather} onSave={addWeather} editing={editing} onEdit={editWeather} notifyError={notifyError} onDelete={deleteWeather} />} />
          <Route path="inspect" element={<Inspect weather={weather} />} />
          <Route path="login" element={<Login/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;