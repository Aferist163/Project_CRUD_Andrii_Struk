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

  const handleEdit = (item) => {
    const token = localStorage.getItem("token");
    if (!token) {
      notifyError("You must be logged in to edit data");
      return;
    }
    editWeather(item);
  };

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
     const token = localStorage.getItem("token");
     
    try {
      const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };

      if (editing) {
        // === Editing
        const res = await fetch(`${API_URL}/weather/${editing.id}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(item),
        });

        const updated = await res.json();
        if (updated.updated) {
          fetchWeather();
          setEditing(null);
          notifySuccess("Changes saved to database");
        } else {
          notifyError(updated.error || "Failed to update data");
        }

      } else {
        // === Add
        const res = await fetch(`${API_URL}/weather`, {
          method: "POST",
          headers,
          body: JSON.stringify(item),
        });

        const newItem = await res.json();
        if (newItem.id) {
          fetchWeather();
          notifySuccess("Data saved to database");
        } else {
          notifyError(newItem.error || "Failed to save data");
        }
      }
    } catch (err) {
      console.error(err);
      notifyError("An error occurred while saving data");
    }
  };


  // === Delete
  const deleteWeather = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      notifyError("You must be logged in to delete data");
      return;
    }

    if (!window.confirm("Are you sure you want to delete weather data?")) return;

    try {
      const res = await fetch(`${API_URL}/weather/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });

      const result = await res.json();
      if (result.deleted) {
        fetchWeather();
        notifySuccess("Data deleted");
      } else {
        notifyError(result.error || "Failed to delete data");
      }

      if (editing && editing.id === id) setEditing(null);
    } catch (err) {
      console.error(err);
      notifyError("An error occurred while deleting data");
    }
  };


  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Info />} />
          <Route path="edit" element={<Edit weather={weather} onSave={addWeather} editing={editing} onEdit={handleEdit} notifyError={notifyError} onDelete={deleteWeather} />} />
          <Route path="inspect" element={<Inspect weather={weather} />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;